
'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { getProducts, Product } from '@/lib/data';
import { Loader2, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Helper function to convert Google Drive URL to a direct link
const convertGoogleDriveUrl = (url: string): string => {
    const regex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view\?usp=sharing/;
    const match = url.match(regex);
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    // Return the original URL if it doesn't match the expected format
    return url;
}

export default function DashboardPage() {
  const [user, loadingAuthState] = useAuthState(auth);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (loadingAuthState) return;
    if (!user) {
      router.push('/signin?redirect=/dashboard');
      return;
    }

    async function fetchUserProducts() {
      try {
        // This is not the most efficient query, as it fetches all products and filters client-side.
        // For a production app, you would add a where("sellerId", "==", user.uid) clause
        // to the getProducts function and create the necessary Firestore index.
        const allProducts = await getProducts();
        const userProducts = allProducts.filter(p => p.sellerId === user.uid).map(p => ({...p, image: convertGoogleDriveUrl(p.image)}));
        setProducts(userProducts);
      } catch (error) {
        console.error("Error fetching user products:", error);
      } finally {
        setLoadingProducts(false);
      }
    }

    fetchUserProducts();
  }, [user, loadingAuthState, router]);

  if (loadingAuthState || loadingProducts) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>My Products</CardTitle>
          <CardDescription>Manage your product listings.</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead className="hidden md:table-cell">Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                       <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.image}
                        width="64"
                        data-ai-hint={product.imageHint}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">UGX {product.price.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.createdAt?.toLocaleDateString()}</TableCell>
                    <TableCell>
                       <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                         <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                             <span className="sr-only">Delete</span>
                        </Button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No products listed yet.</h2>
              <p className="text-muted-foreground mb-6">
                Start selling by listing your first product.
              </p>
              <Button asChild>
                <a href="/sell">List a Product</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
