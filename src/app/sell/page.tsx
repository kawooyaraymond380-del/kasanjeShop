
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import { getCategoriesFromDB, Category } from '@/lib/data';
import { generateDescriptionAction } from '@/app/actions';

const formSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Please select a category'),
  imageUrl: z.string().url('Please enter a valid URL').min(1, 'Image URL is required'),
});

type SellFormValues = z.infer<typeof formSchema>;

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

export default function SellPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, loadingAuthState] = useAuthState(auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategoriesFromDB();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast({
          variant: 'destructive',
          title: 'Could not load categories',
          description: 'There was a problem fetching product categories. Please try again later.'
        })
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, [toast]);


  const form = useForm<SellFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: '',
    },
  });

  const handleGenerateDescription = async () => {
    const productName = form.getValues('name');
    if (!productName) {
      form.setError('name', { type: 'manual', message: 'Please enter a product name first.' });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateDescriptionAction({ productName });
      form.setValue('description', result.description);
      form.clearErrors('description');
    } catch (error) {
      console.error('Error generating description:', error);
      toast({
        variant: 'destructive',
        title: 'Description Generation Failed',
        description: 'Could not generate a description at this time. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
      const imageHint = `${values.category.toLowerCase()} product`;
      const finalImageUrl = convertGoogleDriveUrl(values.imageUrl);

      await addDoc(collection(db, 'products'), {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        image: finalImageUrl,
        imageHint: imageHint,
        sellerId: user.uid,
        sellerName: user.displayName || 'Anonymous',
        createdAt: new Date(),
        featured: false,
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

  if (loadingAuthState || loadingCategories) {
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
                    <div className="flex justify-between items-center">
                      <FormLabel>Product Description</FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleGenerateDescription}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4" />
                        )}
                        Generate with AI
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea placeholder="Describe your product in detail, or let AI help you!" {...field} />
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
                        <FormLabel>Price (UGX)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 50000" {...field} />
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
                                    <SelectItem key={category.id || category.name} value={category.name}>{category.name}</SelectItem>
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
                name="imageUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Image URL</FormLabel>
                        <FormControl>
                             <Input 
                                type="url"
                                placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                                {...field}
                             />
                        </FormControl>
                        <FormDescription>
                            Paste a shareable Google Drive link for your product image.
                        </FormDescription>
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
