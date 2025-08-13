
// This is a server-side file!
'use server';

/**
 * @fileOverview An AI flow to generate product descriptions.
 *
 * - generateDescription - A function that creates a product description from a product name.
 * - GenerateDescriptionInput - The input type for the generateDescription function.
 * - GenerateDescriptionOutput - The return type for the generateDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
});
export type GenerateDescriptionInput = z.infer<typeof GenerateDescriptionInputSchema>;

export const GenerateDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateDescriptionOutput = z.infer<typeof GenerateDescriptionOutputSchema>;

export async function generateDescription(input: GenerateDescriptionInput): Promise<GenerateDescriptionOutput> {
  return generateDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDescriptionPrompt',
  input: {schema: GenerateDescriptionInputSchema},
  output: {schema: GenerateDescriptionOutputSchema},
  prompt: `You are a marketing expert for an online marketplace in Uganda.

  Your task is to write a compelling, concise, and appealing product description for the following product.
  The description should be no more than 2-3 sentences.
  Focus on the key benefits and unique aspects. Use a friendly and professional tone.

  Product Name: {{{productName}}}

  Description:`,
});

const generateDescriptionFlow = ai.defineFlow(
  {
    name: 'generateDescriptionFlow',
    inputSchema: GenerateDescriptionInputSchema,
    outputSchema: GenerateDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
