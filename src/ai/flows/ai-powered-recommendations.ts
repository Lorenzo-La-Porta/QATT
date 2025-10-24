'use server';

/**
 * @fileOverview An AI-powered recommendation flow that analyzes user preferences and search history to suggest attractions,
 * optimize travel routes, and consider budget limits.
 *
 * - aiPoweredRecommendations - A function that handles the recommendation process.
 * - AiPoweredRecommendationsInput - The input type for the aiPoweredRecommendations function.
 * - AiPoweredRecommendationsOutput - The return type for the aiPoweredRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredRecommendationsInputSchema = z.object({
  location: z.string().describe('The user\'s current location or starting point.'),
  availableTime: z.string().describe('The amount of time the user has available for travel.'),
  transportation: z.string().describe('The user\'s preferred mode of transportation.'),
  preferences: z.string().describe('The user\'s preferences for attractions (e.g., art, nature, history).'),
  searchHistory: z.string().describe('The user\'s past search history related to travel.'),
  budgetLimit: z.number().describe('The user\'s budget limit for the trip.'),
});
export type AiPoweredRecommendationsInput = z.infer<typeof AiPoweredRecommendationsInputSchema>;

const AiPoweredRecommendationsOutputSchema = z.object({
  attractionSuggestions: z.string().describe('A list of suggested attractions based on the user\'s preferences and search history.'),
  optimizedRoute: z.string().describe('An optimized travel route that considers the user\'s available time and budget.'),
  estimatedCost: z.number().describe('The estimated cost of the trip, considering transportation, entrance fees, and other expenses.'),
});
export type AiPoweredRecommendationsOutput = z.infer<typeof AiPoweredRecommendationsOutputSchema>;

export async function aiPoweredRecommendations(input: AiPoweredRecommendationsInput): Promise<AiPoweredRecommendationsOutput> {
  return aiPoweredRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredRecommendationsPrompt',
  input: {schema: AiPoweredRecommendationsInputSchema},
  output: {schema: AiPoweredRecommendationsOutputSchema},
  prompt: `You are an AI travel assistant that analyzes user preferences and search history to suggest attractions,
optimize travel routes, and consider budget limits.

Analyze the following information to provide tailored and efficient travel plans:

Location: {{{location}}}
Available Time: {{{availableTime}}}
Transportation: {{{transportation}}}
Preferences: {{{preferences}}}
Search History: {{{searchHistory}}}
Budget Limit: {{{budgetLimit}}}

Provide a list of attraction suggestions, an optimized travel route, and the estimated cost of the trip.
Attraction Suggestions:
Optimized Route:
Estimated Cost:`, 
});

const aiPoweredRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiPoweredRecommendationsFlow',
    inputSchema: AiPoweredRecommendationsInputSchema,
    outputSchema: AiPoweredRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
