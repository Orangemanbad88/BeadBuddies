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
        title: "Your Personal Bracelet Tutorial",
        description: "Watch this amazing custom bracelet tutorial made just for Tied Together!",
        difficulty: "intermediate",
        duration: "Custom Video",
        videoUrl: "/attached_assets/VID-20250812-WA0008(1)_1755799105150.mp4",
        imageUrl: "/attached_assets/IMG-20250820-WA0018_1755797609321.jpg",
        steps: [
          "Follow along with the video tutorial",
          "Gather your materials as shown",
          "Practice the techniques demonstrated",
          "Create your own unique design"
        ],
        materials: ["Various colored bands", "Loom or fingers", "Creativity"]
      },
      {
        title: "Advanced Bracelet Techniques",
        description: "Learn advanced bracelet making techniques in this exclusive tutorial!",
        difficulty: "advanced",
        duration: "Custom Video",
        videoUrl: "/attached_assets/VID-20250821-WA0009_1755806710744.mp4",
        imageUrl: "/attached_assets/IMG-20250820-WA0017_1755797609328.jpg",
        steps: [
          "Master advanced bracelet patterns",
          "Learn complex weaving techniques",
          "Practice intricate color combinations",
          "Create professional-level bracelets"
        ],
        materials: ["Premium rubber bands", "Advanced loom tools", "Pattern guides", "Patience"]
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
        title: "Colorful Friendship Set",
        description: "Amazing collection of different colored bracelets",
        imageUrl: "/attached_assets/IMG-20250820-WA0009_1755797609354.jpg",
        creatorName: "Emma",
        creatorAge: 9,
        difficulty: "beginner"
      },
      {
        title: "Sparkle & Shine",
        description: "Beautiful beaded bracelet with sparkling details",
        imageUrl: "/attached_assets/IMG-20250820-WA0011_1755797609347.jpg",
        creatorName: "Zoe",
        creatorAge: 10,
        difficulty: "intermediate"
      },
      {
        title: "Rainbow Creation",
        description: "Vibrant rainbow pattern bracelet",
        imageUrl: "/attached_assets/IMG-20250820-WA0012_1755797609340.jpg",
        creatorName: "Riley",
        creatorAge: 8,
        difficulty: "beginner"
      },
      {
        title: "Advanced Pattern Mix",
        description: "Complex multi-pattern design bracelet",
        imageUrl: "/attached_assets/IMG-20250820-WA0015_1755797609334.jpg",
        creatorName: "Alex",
        creatorAge: 11,
        difficulty: "advanced"
      },
      {
        title: "Cool Blue Design",
        description: "Stylish blue and white pattern bracelet",
        imageUrl: "/attached_assets/IMG-20250820-WA0017_1755797609328.jpg",
        creatorName: "Sam",
        creatorAge: 9,
        difficulty: "intermediate"
      },
      {
        title: "Sunset Colors",
        description: "Warm orange and pink sunset-inspired bracelet",
        imageUrl: "/attached_assets/IMG-20250820-WA0018_1755797609321.jpg",
        creatorName: "Luna",
        creatorAge: 10,
        difficulty: "intermediate"
      },
      {
        title: "Nature Inspired",
        description: "Green and brown earth-tone bracelet",
        imageUrl: "/attached_assets/IMG-20250820-WA0019_1755797609314.jpg",
        creatorName: "Forest",
        creatorAge: 8,
        difficulty: "beginner"
      },
      {
        title: "Purple Power",
        description: "Bold purple and silver combination bracelet",
        imageUrl: "/attached_assets/IMG-20250820-WA0020_1755797609307.jpg",
        creatorName: "Violet",
        creatorAge: 11,
        difficulty: "advanced"
      },
      {
        title: "Pretty in Pink Segments",
        description: "Elegant pink and white segmented bracelet design",
        imageUrl: "/attached_assets/IMG-20250820-WA0022_1755797609252.jpg",
        creatorName: "Rose",
        creatorAge: 9,
        difficulty: "intermediate"
      },
      {
        title: "Fishtail Lightning",
        description: "Advanced black and yellow fishtail pattern",
        imageUrl: "/attached_assets/IMG-20250820-WA0023_1755797609289.jpg",
        creatorName: "Storm",
        creatorAge: 12,
        difficulty: "advanced"
      },
      {
        title: "Autumn Twist",
        description: "Beautiful orange and cream braided bracelet",
        imageUrl: "/attached_assets/IMG-20250820-WA0021_1755797609301.jpg",
        creatorName: "Autumn",
        creatorAge: 10,
        difficulty: "intermediate"
      },
      {
        title: "GREYS Letter Bracelet",
        description: "Personalized bracelet with colorful letter beads",
        imageUrl: "/attached_assets/IMG-20250820-WA0015_1755797609334.jpg",
        creatorName: "Grey",
        creatorAge: 11,
        difficulty: "beginner"
      },
      {
        title: "Pastel Dreams",
        description: "Soft pastel beaded bracelet with letter charm",
        imageUrl: "/attached_assets/IMG-20250820-WA0012_1755797609340.jpg",
        creatorName: "Grace",
        creatorAge: 8,
        difficulty: "beginner"
      },
      {
        title: "Purple Flower Power",
        description: "Purple chain bracelet with adorable flower charm",
        imageUrl: "/attached_assets/IMG-20250820-WA0009_1755797609354.jpg",
        creatorName: "Daisy",
        creatorAge: 9,
        difficulty: "intermediate"
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
