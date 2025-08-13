"use client";

import { useEffect, useState } from 'react';
import { getAiRecommendations } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';

export function AiRecommendations() {
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);
      const mockInput = {
        browsingHistory: 'User has viewed Handcrafted Clay Pot, Beaded Necklace, and Organic Apple Basket.',
        productCatalog: 'Our catalog includes: Handmade Crafts, Fresh Produce, Art & Prints, Clothing & Accessories, Workshops & Services. Specific items are Handcrafted Clay Pot, Organic Apple Basket, Beaded Necklace, African Print Bag.'
      };
      try {
        const result = await getAiRecommendations(mockInput);
        setRecommendations(result.recommendations);
      } catch (error) {
        console.error("Failed to get AI recommendations:", error);
        setRecommendations("Could not load recommendations at this time.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecommendations();
  }, []);

  return (
    <Card className="bg-primary/10 border-primary/20 text-left">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          <span>Recommended For You</span>
        </CardTitle>
        <CardDescription>
          Based on your recent activity, here are some products you might like.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Generating personalized recommendations...</span>
          </div>
        ) : (
          <p className="text-foreground/80">{recommendations}</p>
        )}
      </CardContent>
    </Card>
  );
}
