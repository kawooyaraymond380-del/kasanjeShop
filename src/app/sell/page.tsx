
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage, auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { getCategories } from '@/lib/data';

const formSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Please select a category'),
  image: z.instanceof(File).refine(file => file.size > 0, 'Product image is required.'),
});

type SellFormValues = z.infer<typeof formSchema>;

export default function SellPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, loadingAuthState] = useAuthState(auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categories = getCategories();

  const form = useForm<SellFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      image: new File([], ''),
    },
  });

  const onSubmit = async (values: SellFormValues) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to sell products.',
      });
      return router.push('/signin');
    }
    
    setIsSubmitting(true);
    
    try {
      const imageFile = values.image;
      const storageRef = ref(storage, `products/${user.uid}/${Date.now()}-${imageFile.name}`);
      
      const snapshot = await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'products'), {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        image: imageUrl,
        sellerId: user.uid,
        sellerName: user.displayName || 'Anonymous',
        createdAt: new Date(),
        rating: 0,
        reviews: 0,
      });

      toast({
        title: 'Product Listed!',
        description: 'Your product is now live on the marketplace.',
      });

      router.push('/dashboard');

    } catch (error: any) {
      console.error('Error listing product', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'There was a problem listing your product.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingAuthState) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (!user) {
     router.push('/signin?redirect=/sell');
     return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
       <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">List a New Product</CardTitle>
          <CardDescription>
            Fill out the form below to add your product to the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Handwoven Basket" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your product in detail..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price (KSH)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 1500" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {categories.map(category => (
                                    <SelectItem key={category.name} value={category.name}>{category.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                        <FormLabel>Product Image</FormLabel>
                        <FormControl>
                             <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => onChange(e.target.files?.[0])}
                                {...rest} 
                             />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
               />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Listing Product...</> : 'List Product'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
