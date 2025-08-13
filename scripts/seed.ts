
// Use this script to seed your Firestore database with initial data.
// How to run:
// 1. Make sure you have ts-node installed: npm install -g ts-node
// 2. Make sure your FIREBASE_PRIVATE_KEY is set in your environment variables.
// 3. Run the script: ts-node scripts/seed.ts

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, writeBatch, collection, getDocs, doc } from 'firebase-admin/firestore';
import 'dotenv/config';

// Initialize Firebase Admin SDK
// You need to create a service account and download the JSON key file.
// https://firebase.google.com/docs/admin/setup
try {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_PRIVATE_KEY as string
  );
  
  initializeApp({
    credential: cert(serviceAccount)
  });

} catch(e) {
  console.log("Could not parse FIREBASE_PRIVATE_KEY. Make sure it's a valid JSON string in your .env file.", e);
  process.exit(1);
}

const db = getFirestore();

interface Category {
  name: string;
  description: string;
  image: string;
  imageHint: string;
}

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  image: string;
  imageHint: string;
  rating: number;
}

const categories: Category[] = [
    { name: "Handmade Crafts", description: "Unique artisan creations", image: "https://source.unsplash.com/featured/?handmade,crafts", imageHint: "handmade crafts" },
    { name: "Fresh Produce", description: "Farm-fresh fruits and vegetables", image: "https://source.unsplash.com/featured/?fresh,vegetables", imageHint: "fresh vegetables" },
    { name: "Art & Prints", description: "Local artwork and designs", image: "https://source.unsplash.com/featured/?art,prints", imageHint: "art prints" },
    { name: "Clothing & Accessories", description: "Handcrafted wearable items", image: "https://source.unsplash.com/featured/?clothing,accessories", imageHint: "clothing accessories" },
    { name: "Workshops & Services", description: "Local skills and services", image: "https://source.unsplash.com/featured/?people,workshop", imageHint: "people workshop" },
];

const testimonials: Testimonial[] = [
    { name: "Sarah Njeri", title: "Customer", quote: "Kasanje.shop has connected me with amazing local artisans. I love supporting my community while finding unique products that I can't get anywhere else.", image: "https://source.unsplash.com/featured/?woman,smiling", imageHint: "woman smiling", rating: 5 },
    { name: "Mary Wambui", title: "Vendor - Handcrafts", quote: "As a seller, this marketplace has helped me reach customers I never could before. The platform is easy to use and the community support is incredible.", image: "https://source.unsplash.com/featured/?woman,portrait", imageHint: "woman portrait", rating: 5 },
    { name: "John Kamau", title: "Vendor - Fresh Produce", quote: "I've been able to grow my small farm business thanks to Kasanje.shop. Now I can sell my fresh produce directly to customers who appreciate quality local food.", image: "https://source.unsplash.com/featured/?man,smiling", imageHint: "man smiling", rating: 4.5 },
];

async function seedDatabase() {
    console.log("Starting database seed...");

    try {
        const batch = writeBatch(db);

        // Seed Categories
        const categoriesRef = collection(db, "categories");
        const existingCategoriesSnap = await getDocs(categoriesRef);
        if (existingCategoriesSnap.empty) {
            console.log("Seeding categories...");
            categories.forEach(category => {
                const docRef = doc(categoriesRef);
                batch.set(docRef, category);
            });
        } else {
            console.log("Categories collection already contains data. Skipping seed.");
        }

        // Seed Testimonials
        const testimonialsRef = collection(db, "testimonials");
        const existingTestimonialsSnap = await getDocs(testimonialsRef);
        if (existingTestimonialsSnap.empty) {
            console.log("Seeding testimonials...");
            testimonials.forEach(testimonial => {
                const docRef = doc(testimonialsRef);
                batch.set(docRef, testimonial);
            });
        } else {
            console.log("Testimonials collection already contains data. Skipping seed.");
        }

        await batch.commit();
        console.log("Database seeding completed successfully.");

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
