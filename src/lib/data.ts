
import { collection, getDocs, query, limit, orderBy, writeBatch, doc, where, QueryConstraint } from "firebase/firestore";
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
  featured?: boolean;
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
  imageHint:string;
  rating: number;
}

interface GetProductsOptions {
    category?: string;
    featured?: boolean;
    limit?: number;
    sellerId?: string;
}

// Generic function to fetch products with different filters
export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
    try {
        const productsRef = collection(db, "products");
        const constraints: QueryConstraint[] = [];

        if (options.category) {
            constraints.push(where("category", "==", options.category));
        }
        if (options.featured) {
            constraints.push(where("featured", "==", true));
        }
        if (options.sellerId) {
            constraints.push(where("sellerId", "==", options.sellerId));
        }
        
        constraints.push(orderBy("createdAt", "desc"));

        if (options.limit) {
            constraints.push(limit(options.limit));
        }
        
        const q = query(productsRef, ...constraints);
        const querySnapshot = await getDocs(q);
        
        const products = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const defaultProduct: Product = {
                id: doc.id,
                name: 'Unnamed Product',
                price: 0,
                image: 'https://source.unsplash.com/featured/?product',
                imageHint: 'product',
                description: 'No description available.',
                rating: 0,
                reviews: 0,
                details: [],
                category: 'Uncategorized',
                thumbnails: [],
                createdAt: new Date(),
            };

            const productData = {
                ...defaultProduct,
                ...data,
                id: doc.id,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                thumbnails: data.thumbnails || [
                    { url: data.image || 'https://source.unsplash.com/featured/?product,thumbnail', hint: 'product' },
                    { url: 'https://source.unsplash.com/featured/?product,thumbnail,2', hint: 'product' },
                    { url: 'https://source.unsplash.com/featured/?product,thumbnail,3', hint: 'product' },
                    { url: 'https://source.unsplash.com/featured/?product,thumbnail,4', hint: 'product' }
                ],
                details: data.details || [
                    'No details provided.',
                    'Contact seller for more information.'
                ]
            };
            return productData as Product;
        });

        return products;
    } catch (error) {
        console.error("Error fetching products: ", error);
        return [];
    }
}


export async function getCategoriesFromDB(): Promise<Category[]> {
    const categoriesRef = collection(db, "categories");
    try {
        const querySnapshot = await getDocs(query(categoriesRef, orderBy("name")));
        
        if (querySnapshot.empty) {
            console.log("Categories collection is empty. Seeding data...");
            await seedCategories();
            const newSnapshot = await getDocs(query(categoriesRef, orderBy("name")));
            return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
        }
        
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function getTestimonialsFromDB(): Promise<Testimonial[]> {
    const testimonialsRef = collection(db, "testimonials");
    try {
        const querySnapshot = await getDocs(testimonialsRef);

        if (querySnapshot.empty) {
            console.log("Testimonials collection is empty. Seeding data...");
            await seedTestimonials();
            const newSnapshot = await getDocs(testimonialsRef);
            return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
        }

        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}

async function seedCategories() {
    const categories: Omit<Category, 'id'>[] = [
        { name: "Handmade Crafts", description: "Unique artisan creations", image: "https://source.unsplash.com/featured/?handmade,crafts", imageHint: "handmade crafts" },
        { name: "Fresh Produce", description: "Farm-fresh fruits and vegetables", image: "https://source.unsplash.com/featured/?fresh,vegetables", imageHint: "fresh vegetables" },
        { name: "Art & Prints", description: "Local artwork and designs", image: "https://source.unsplash.com/featured/?art,prints", imageHint: "art prints" },
        { name: "Clothing & Accessories", description: "Handcrafted wearable items", image: "https://source.unsplash.com/featured/?clothing,accessories", imageHint: "clothing accessories" },
        { name: "Workshops & Services", description: "Local skills and services", image: "https://source.unsplash.com/featured/?people,workshop", imageHint: "people workshop" },
    ];
    try {
        const batch = writeBatch(db);
        const categoriesRef = collection(db, "categories");
        console.log("Seeding categories...");
        categories.forEach(category => {
            const docRef = doc(categoriesRef);
            batch.set(docRef, category);
        });
        await batch.commit();
        console.log("Categories seeded successfully.");
    } catch (error) {
        console.error("Error seeding categories:", error);
    }
}


async function seedTestimonials() {
    const testimonials: Omit<Testimonial, 'id'>[] = [
        { name: "Sarah Njeri", title: "Customer", quote: "Kasanje.shop has connected me with amazing local artisans. I love supporting my community while finding unique products that I can't get anywhere else.", image: "https://source.unsplash.com/featured/?woman,smiling", imageHint: "woman smiling", rating: 5 },
        { name: "Mary Wambui", title: "Vendor - Handcrafts", quote: "As a seller, this marketplace has helped me reach customers I never could before. The platform is easy to use and the community support is incredible.", image: "https://source.unsplash.com/featured/?woman,portrait", imageHint: "woman portrait", rating: 5 },
        { name: "John Kamau", title: "Vendor - Fresh Produce", quote: "I've been able to grow my small farm business thanks to Kasanje.shop. Now, I can sell my fresh produce directly to customers who appreciate quality local food.", image: "https://source.unsplash.com/featured/?man,smiling", imageHint: "man smiling", rating: 4.5 },
    ];
    try {
        const batch = writeBatch(db);
        const testimonialsRef = collection(db, "testimonials");
        console.log("Seeding testimonials...");
        testimonials.forEach(testimonial => {
            const docRef = doc(testimonialsRef);
            batch.set(docRef, testimonial);
        });
        await batch.commit();
        console.log("Testimonials seeded successfully.");
    } catch (error) {
        console.error("Error seeding testimonials:", error);
    }
}


export const getProductById = async (id: string): Promise<Product | undefined> => {
  // This function would need to be updated to fetch a single product from Firestore
  console.log("getProductById needs to be implemented to fetch from Firestore.");
  return undefined;
}

export { getFeaturedProducts } from './data-legacy';
