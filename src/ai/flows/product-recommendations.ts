
'use server';

/**
 * @fileOverview A product recommendation AI agent.
 *
 * - productRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the productRecommendations function.
 * - ProductRecommendationsOutput - The return type for the productRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z.string().describe('The browsing history of the user.'),
  productCatalog: z.string().describe('A description of the available products in the catalog.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

export const ProductRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('A list of recommended products based on the browsing history.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function productRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a product recommendation expert.

  Based on the user's browsing history and the available product catalog, you will recommend a list of products that the user might be interested in.

  Browsing History: {{{browsingHistory}}}
  Product Catalog: {{{productCatalog}}}

  Recommendations:`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
