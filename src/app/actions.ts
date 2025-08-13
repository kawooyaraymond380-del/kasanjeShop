"use server";

import { productRecommendations, ProductRecommendationsInput, ProductRecommendationsOutput } from '@/ai/flows/product-recommendations';

export async function getAiRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  try {
    const result = await productRecommendations(input);
    return result;
  } catch (error) {
    console.error("Error in getAiRecommendations server action:", error);
    // In a real app, you might want to throw a more specific error
    // or return a structured error object.
    throw new Error("Failed to retrieve AI recommendations.");
  }
}
