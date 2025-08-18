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
        title: "Lightning Bolt Rubber Band Bracelet",
        description: "Learn to make this amazing black and yellow zigzag pattern!",
        difficulty: "intermediate",
        duration: "8:45",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "/attached_assets/IMG-20250812-WA0007_1755544805320.jpg",
        steps: [
          "Gather black and yellow rubber bands",
          "Start with a black band as your base",
          "Create the zigzag pattern by alternating colors",
          "Hook each band carefully to form the chevron",
          "Continue pattern until desired length",
          "Secure with C-clip"
        ],
        materials: ["Black rubber bands", "Yellow rubber bands", "Loom", "C-clips", "Hook tool"]
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
        title: "Bright Green Chain Bracelet",
        description: "Make this awesome neon green rubber band chain bracelet!",
        difficulty: "beginner",
        duration: "6:15",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "/attached_assets/IMG-20250812-WA0007_1755544805320.jpg",
        steps: [
          "Get bright green rubber bands",
          "Create your first chain link",
          "Loop each new band through the previous one",
          "Continue making chain links",
          "Secure the end with a C-clip"
        ],
        materials: ["Bright green rubber bands", "C-clips", "Your fingers"]
      }
    ];

    tutorialData.forEach(tutorial => {
      const id = randomUUID();
      this.tutorials.set(id, { ...tutorial, id });
    });

    // Seed gallery items with real bracelet photos
    const galleryData: InsertGalleryItem[] = [
      {
        title: "Lightning Bolt Bracelet",
        description: "Cool black and yellow zigzag pattern - perfect chevron style!",
        imageUrl: "/attached_assets/IMG-20250812-WA0007_1755544805320.jpg",
        creatorName: "Maya",
        creatorAge: 10,
        difficulty: "intermediate"
      },
      {
        title: "Bright Green Chain",
        description: "Awesome neon green rubber band bracelet with chain links",
        imageUrl: "/attached_assets/IMG-20250812-WA0007_1755544805320.jpg",
        creatorName: "Jake",
        creatorAge: 8,
        difficulty: "beginner"
      },
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
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMajA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
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
