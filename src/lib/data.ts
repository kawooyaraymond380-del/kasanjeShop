
import { collection, getDocs, query, limit, orderBy, writeBatch } from "firebase/firestore";
import { db } from "./firebase";

export interface Product {
  id: string; // Changed to string to support Firestore IDs
  name: string;
  price: number;
  image: string;
  imageHint: string;
  description: string;
  rating: number;
  reviews: number;
  details: string[];
  category: string;
  thumbnails: { url: string, hint: string }[];
  sellerId?: string;
  sellerName?: string;
  createdAt?: Date;
}

export interface Category {
  id?: string;
  name: string;
  description: string;
  image: string;
  imageHint: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  title: string;
  quote: string;
  image: string;
  imageHint: string;
  rating: number;
}

// Fetches featured products from Firestore
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products");
    // Example: fetch 8 most recent products. You can change the query as needed.
    const q = query(productsRef, orderBy("createdAt", "desc"), limit(8));
    const querySnapshot = await getDocs(q);
    
    const products = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // A default product structure to ensure type safety
      const defaultProduct: Product = {
        id: doc.id,
        name: 'Unnamed Product',
        price: 0,
        image: 'https://placehold.co/600x600.png',
        imageHint: 'product',
        description: 'No description available.',
        rating: 0,
        reviews: 0,
        details: [],
        category: 'Uncategorized',
        thumbnails: [],
        createdAt: new Date(),
      };

      // Firestore timestamps need to be converted to JS Date objects
      const productData = {
        ...defaultProduct,
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        // Ensure required fields have defaults
        thumbnails: data.thumbnails || [{ url: data.image || 'https://placehold.co/200x200.png', hint: 'product' }, { url: 'https://placehold.co/200x200.png', hint: 'product' }, { url: 'https://placehold.co/200x200.png', hint: 'product' }, { url: 'https://placehold.co/200x200.png', hint: 'product' }],
        details: data.details || [
            'No details provided.',
            'Contact seller for more information.'
        ]
      };
      
      return productData as Product;
    });

    return products;
  } catch (error) {
    console.error("Error fetching featured products: ", error);
    return []; // Return an empty array on error
  }
}

export async function getCategoriesFromDB(): Promise<Category[]> {
    try {
        const categoriesRef = collection(db, "categories");
        const querySnapshot = await getDocs(query(categoriesRef, orderBy("name")));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function getTestimonialsFromDB(): Promise<Testimonial[]> {
    try {
        const testimonialsRef = collection(db, "testimonials");
        const querySnapshot = await getDocs(testimonialsRef);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}


export const getProductById = async (id: string): Promise<Product | undefined> => {
  // This function would need to be updated to fetch a single product from Firestore
  console.log("getProductById needs to be implemented to fetch from Firestore.");
  return undefined;
}

// THIS IS A ONE-TIME SEEDING FUNCTION.
// After running it once, you can manage data in the Firebase Console.
export async function seedDatabase() {
    console.log("Seeding database...");

    const categories: Omit<Category, 'id'>[] = [
        { name: "Handmade Crafts", description: "Unique artisan creations", image: "https://placehold.co/400x400.png", imageHint: "handmade crafts" },
        { name: "Fresh Produce", description: "Farm-fresh fruits and vegetables", image: "https://placehold.co/400x400.png", imageHint: "fresh vegetables" },
        { name: "Art & Prints", description: "Local artwork and designs", image: "https://placehold.co/400x400.png", imageHint: "art prints" },
        { name: "Clothing & Accessories", description: "Handcrafted wearable items", image: "https://placehold.co/400x400.png", imageHint: "clothing accessories" },
        { name: "Workshops & Services", description: "Local skills and services", image: "https://placehold.co/400x400.png", imageHint: "people workshop" },
    ];
    
    const testimonials: Omit<Testimonial, 'id'>[] = [
        { name: "Sarah Njeri", title: "Customer", quote: "Kasanje.shop has connected me with amazing local artisans. I love supporting my community while finding unique products that I can't get anywhere else.", image: "https://placehold.co/100x100.png", imageHint: "woman smiling", rating: 5 },
        { name: "Mary Wambui", title: "Vendor - Handcrafts", quote: "As a seller, this marketplace has helped me reach customers I never could before. The platform is easy to use and the community support is incredible.", image: "https://placehold.co/100x100.png", imageHint: "woman portrait", rating: 5 },
        { name: "John Kamau", title: "Vendor - Fresh Produce", quote: "I've been able to grow my small farm business thanks to Kasanje.shop. Now I can sell my fresh produce directly to customers who appreciate quality local food.", image: "https://placehold.co/100x100.png", imageHint: "man smiling", rating: 4.5 },
    ];

    try {
        const batch = writeBatch(db);

        const categoriesRef = collection(db, "categories");
        const existingCategoriesSnap = await getDocs(categoriesRef);
        if (existingCategoriesSnap.empty) {
            console.log("Seeding categories...");
            categories.forEach(category => {
                const docRef = doc(categoriesRef);
                batch.set(docRef, category);
            });
        } else {
            console.log("Categories collection already exists. Skipping seeding.");
        }

        const testimonialsRef = collection(db, "testimonials");
        const existingTestimonialsSnap = await getDocs(testimonialsRef);
        if (existingTestimonialsSnap.empty) {
            console.log("Seeding testimonials...");
            testimonials.forEach(testimonial => {
                const docRef = doc(testimonialsRef);
                batch.set(docRef, testimonial);
            });
        } else {
            console.log("Testimonials collection already exists. Skipping seeding.");
        }
        
        await batch.commit();
        console.log("Database seeding completed successfully.");

    } catch (error) {
        console.error("Error seeding database:", error);
    }
}
