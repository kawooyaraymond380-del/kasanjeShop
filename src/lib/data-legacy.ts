
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { Product } from "./data";

// This is a legacy function and should be removed.
// The getProducts function in data.ts is more flexible.
export async function getFeaturedProducts(): Promise<Product[]> {
    console.warn("getFeaturedProducts is deprecated. Use getProducts({ featured: true }) instead.");
    try {
      const productsRef = collection(db, "products");
      // This query might fail if the composite index is not created in Firestore.
      const q = query(productsRef, orderBy("createdAt", "desc"), limit(8));
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
          thumbnails: data.thumbnails || [{ url: data.image || 'https://source.unsplash.com/featured/?product,thumbnail', hint: 'product' }, { url: 'https://source.unsplash.com/featured/?product,thumbnail,2', hint: 'product' }, { url: 'https://source.unsplash.com/featured/?product,thumbnail,3', hint: 'product' }, { url: 'https://source.unsplash.com/featured/?product,thumbnail,4', hint: 'product' }],
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
  