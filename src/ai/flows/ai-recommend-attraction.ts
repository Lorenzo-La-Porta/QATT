'use server';

/**
 * @fileOverview An AI-powered attraction recommendation flow that analyzes user preferences and search history to suggest attractions based on budget limits, search history, and preferences.
 *
 * - aiRecommendAttraction - A function that handles the recommendation process.
 * - AiRecommendAttractionInput - The input type for the aiRecommendAttraction function.
 * - AiRecommendAttractionOutput - The return type for the aiRecommendAttraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiRecommendAttractionInputSchema = z.object({
  location: z.string().describe('The user\u2019s current location.'),
  availableTime: z.string().describe('The amount of time the user has available for travel.'),
  transportationPreferences: z.string().describe('The user\u2019s preferred mode of transportation.'),
  personalInterests: z.string().describe('The user\u2019s personal interests.'),
  searchHistory: z.string().describe('The user\'s past search history related to travel.'),
  budgetLimit: z.number().describe('The user\'s budget limit for the trip.'),
});
export type AiRecommendAttractionInput = z.infer<typeof AiRecommendAttractionInputSchema>;

const AiRecommendAttractionOutputSchema = z.object({
  attractionSuggestions: z.array(
    z.object({
      name: z.string().describe('The name of the attraction.'),
      description: z.string().describe('A brief description of the attraction.'),
      category: z.string().describe('The category of the attraction (e.g., art, nature, history).'),
      estimatedVisitTime: z.string().describe('The estimated time to visit the attraction.'),
      approximateCost: z.number().describe('The approximate cost to visit the attraction.'),
    })
  ).describe('A list of suggested attractions based on the user\u2019s preferences, search history and budget.'),
  optimizedRoute: z.string().describe('An optimized travel route that considers the user\u2019s available time and budget.'),
});
export type AiRecommendAttractionOutput = z.infer<typeof AiRecommendAttractionOutputSchema>;

export async function aiRecommendAttraction(input: AiRecommendAttractionInput): Promise<AiRecommendAttractionOutput> {
  return aiRecommendAttractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRecommendAttractionPrompt',
  input: {schema: AiRecommendAttractionInputSchema},
  output: {schema: AiRecommendAttractionOutputSchema},
  prompt: `You are an AI travel assistant that analyzes user preferences and search history to suggest attractions based on budget limits.

Analyze the following information to provide tailored and efficient travel plans:

Location: {{{location}}}
Available Time: {{{availableTime}}}
Transportation Preferences: {{{transportationPreferences}}}
Personal Interests: {{{personalInterests}}}
Search History: {{{searchHistory}}}
Budget Limit: {{{budgetLimit}}}

Provide a list of attraction suggestions and an optimized travel route.
Attraction Suggestions:
Optimized Route:`,
});

const aiRecommendAttractionFlow = ai.defineFlow(
  {
    name: 'aiRecommendAttractionFlow',
    inputSchema: AiRecommendAttractionInputSchema,
    outputSchema: AiRecommendAttractionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
