
"use server";

import { productRecommendations, type ProductRecommendationsInput, ProductRecommendationsOutputSchema, ProductRecommendationsInputSchema } from '@/ai/flows/product-recommendations';
import { generateDescription, type GenerateDescriptionInput, GenerateDescriptionOutputSchema, GenerateDescriptionInputSchema } from '@/ai/flows/generate-description';
import { z } from 'zod';

export async function getAiRecommendations(input: ProductRecommendationsInput): Promise<z.infer<typeof ProductRecommendationsOutputSchema>> {
  const validatedInput = ProductRecommendationsInputSchema.parse(input);
  const result = await productRecommendations(validatedInput);
  return ProductRecommendationsOutputSchema.parse(result);
}

export async function generateDescriptionAction(input: GenerateDescriptionInput): Promise<z.infer<typeof GenerateDescriptionOutputSchema>> {
  const validatedInput = GenerateDescriptionInputSchema.parse(input);
  const result = await generateDescription(validatedInput);
  return GenerateDescriptionOutputSchema.parse(result);
}
