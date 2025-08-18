import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
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
