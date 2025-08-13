
"use server";

import { productRecommendations, ProductRecommendationsInput, ProductRecommendationsOutputSchema, ProductRecommendationsInputSchema } from '@/ai/flows/product-recommendations';
import { generateDescription, GenerateDescriptionInput, GenerateDescriptionOutputSchema, GenerateDescriptionInputSchema } from '@/ai/flows/generate-description';
import { z } from 'zod';

export async function getAiRecommendations(input: z.infer<typeof ProductRecommendationsInputSchema>): Promise<z.infer<typeof ProductRecommendationsOutputSchema>> {
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

export async function generateDescriptionAction(input: z.infer<typeof GenerateDescriptionInputSchema>): Promise<z.infer<typeof GenerateDescriptionOutputSchema>> {
  try {
    const result = await generateDescription(input);
    return result;
  } catch (error) {
    console.error("Error in generateDescriptionAction server action:", error);
    throw new Error("Failed to generate product description.");
  }
}
