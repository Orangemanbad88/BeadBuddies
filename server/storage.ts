import { type Tutorial, type InsertTutorial, type GalleryItem, type InsertGalleryItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getTutorials(): Promise<Tutorial[]>;
  getTutorialById(id: string): Promise<Tutorial | undefined>;
  createTutorial(tutorial: InsertTutorial): Promise<Tutorial>;
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemById(id: string): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
}

export class MemStorage implements IStorage {
  private tutorials: Map<string, Tutorial>;
  private galleryItems: Map<string, GalleryItem>;

  constructor() {
    this.tutorials = new Map();
    this.galleryItems = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed tutorials
    const tutorialData: InsertTutorial[] = [
      {
        title: "Rainbow Rubber Band Bracelet",
        description: "Learn to make a colorful rubber band bracelet in just 5 minutes!",
        difficulty: "beginner",
        duration: "5:32",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        steps: [
          "Gather your colorful rubber bands",
          "Place bands on your loom in a pattern",
          "Hook and loop the bands carefully",
          "Remove from loom and secure ends"
        ],
        materials: ["Colorful rubber bands", "Loom or fingers", "C-clips", "Hook tool"]
      },
      {
        title: "Friendship Bracelet Basics",
        description: "Master the classic chevron pattern with colorful embroidery thread!",
        difficulty: "intermediate",
        duration: "8:15",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        steps: [
          "Cut 6 strands of embroidery thread, 24 inches each",
          "Tie a knot at the top and tape down",
          "Create forward knots in chevron pattern",
          "Continue pattern until desired length"
        ],
        materials: ["Embroidery thread (6 colors)", "Scissors", "Tape", "Clipboard or surface"]
      },
      {
        title: "Beaded Dream Bracelet",
        description: "Create stunning patterns with colorful beads and elastic cord!",
        difficulty: "beginner",
        duration: "6:42",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        steps: [
          "Measure elastic cord to fit wrist plus 2 inches",
          "Plan your bead pattern on a flat surface",
          "String beads carefully in your chosen pattern",
          "Tie secure knots and trim excess cord"
        ],
        materials: ["Elastic cord", "Colorful beads", "Scissors", "Bead tray"]
      }
    ];

    tutorialData.forEach(tutorial => {
      const id = randomUUID();
      this.tutorials.set(id, { ...tutorial, id });
    });

    // Seed gallery items
    const galleryData: InsertGalleryItem[] = [
      {
        title: "Rainbow Collection",
        description: "A beautiful set of colorful bracelets",
        imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
        creatorName: "Emma",
        creatorAge: 8,
        difficulty: "beginner"
      },
      {
        title: "Beaded Beauty",
        description: "Intricate beaded pattern bracelet",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
        creatorName: "Lucas",
        creatorAge: 10,
        difficulty: "intermediate"
      },
      {
        title: "Chevron Dreams",
        description: "Perfect chevron pattern friendship bracelet",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
        creatorName: "Sophia",
        creatorAge: 9,
        difficulty: "intermediate"
      },
      {
        title: "Charm Magic",
        description: "Bracelet with beautiful charms and decorations",
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
        creatorName: "Alex",
        creatorAge: 11,
        difficulty: "advanced"
      }
    ];

    galleryData.forEach(item => {
      const id = randomUUID();
      this.galleryItems.set(id, { ...item, id });
    });
  }

  async getTutorials(): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values());
  }

  async getTutorialById(id: string): Promise<Tutorial | undefined> {
    return this.tutorials.get(id);
  }

  async createTutorial(insertTutorial: InsertTutorial): Promise<Tutorial> {
    const id = randomUUID();
    const tutorial: Tutorial = { ...insertTutorial, id };
    this.tutorials.set(id, tutorial);
    return tutorial;
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async getGalleryItemById(id: string): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = randomUUID();
    const item: GalleryItem = { ...insertItem, id };
    this.galleryItems.set(id, item);
    return item;
  }
}

export const storage = new MemStorage();
