
"use server";

import { productRecommendations, type ProductRecommendationsInput, ProductRecommendationsOutputSchema, ProductRecommendationsInputSchema } from '@/ai/flows/product-recommendations';
import { generateDescription, type GenerateDescriptionInput, GenerateDescriptionOutputSchema, GenerateDescriptionInputSchema } from '@/ai/flows/generate-description';
import { z } from 'zod';

export async function getAiRecommendations(input: ProductRecommendationsInput): Promise<z.infer<typeof ProductRecommendationsOutputSchema>> {
  try {
    const validatedInput = ProductRecommendationsInputSchema.parse(input);
    const result = await productRecommendations(validatedInput);
    return ProductRecommendationsOutputSchema.parse(result);
  } catch (error) {
    console.error("Error in getAiRecommendations server action:", error);
    // In a real app, you might want to throw a more specific error
    // or return a structured error object.
    throw new Error("Failed to retrieve AI recommendations.");
  }
}

export async function generateDescriptionAction(input: GenerateDescriptionInput): Promise<z.infer<typeof GenerateDescriptionOutputSchema>> {
  try {
    const validatedInput = GenerateDescriptionInputSchema.parse(input);
    const result = await generateDescription(validatedInput);
    return GenerateDescriptionOutputSchema.parse(result);
  } catch (error) {
    console.error("Error in generateDescriptionAction server action:", error);
    throw new Error("Failed to generate product description.");
  }
}
