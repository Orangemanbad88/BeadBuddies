import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve attached assets
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));
  
  // Serve videos with proper streaming support
  app.get("/video/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const videoPath = path.join(process.cwd(), 'attached_assets', filename);
      
      const fs = require('fs');
      
      if (!fs.existsSync(videoPath)) {
        console.log(`Video not found: ${videoPath}`);
        return res.status(404).send('Video not found');
      }
      
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = req.headers.range;
      
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'no-cache');
      
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Content-Length': chunksize,
        });
        file.pipe(res);
      } else {
        res.writeHead(200, { 'Content-Length': fileSize });
        fs.createReadStream(videoPath).pipe(res);
      }
    } catch (error) {
      console.error('Video streaming error:', error);
      res.status(500).send('Internal server error');
    }
  });
  // Get all tutorials
  app.get("/api/tutorials", async (req, res) => {
    try {
      const tutorials = await storage.getTutorials();
      res.json(tutorials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tutorials" });
    }
  });

  // Get tutorial by ID
  app.get("/api/tutorials/:id", async (req, res) => {
    try {
      const tutorial = await storage.getTutorialById(req.params.id);
      if (!tutorial) {
        res.status(404).json({ message: "Tutorial not found" });
        return;
      }
      res.json(tutorial);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tutorial" });
    }
  });

  // Get all gallery items
  app.get("/api/gallery", async (req, res) => {
    try {
      const items = await storage.getGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  // Get gallery item by ID
  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const item = await storage.getGalleryItemById(req.params.id);
      if (!item) {
        res.status(404).json({ message: "Gallery item not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery item" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
