
"use server";

import { productRecommendations, ProductRecommendationsInput, ProductRecommendationsOutput } from '@/ai/flows/product-recommendations';
import { generateDescription, GenerateDescriptionInput, GenerateDescriptionOutput } from '@/ai/flows/generate-description';

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

export async function generateDescriptionAction(input: GenerateDescriptionInput): Promise<GenerateDescriptionOutput> {
  try {
    const result = await generateDescription(input);
    return result;
  } catch (error) {
    console.error("Error in generateDescriptionAction server action:", error);
    throw new Error("Failed to generate product description.");
  }
}
