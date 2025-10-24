'use server';

/**
 * @fileOverview An attraction recommendation AI agent.
 *
 * - recommendAttractions - A function that handles the attraction recommendation process.
 * - RecommendAttractionsInput - The input type for the recommendAttractions function.
 * - RecommendAttractionsOutput - The return type for the recommendAttractions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendAttractionsInputSchema = z.object({
  location: z.string().describe('The user\u2019s current location.'),
  availableTime: z.string().describe('The amount of time the user has available for activities.'),
  transportationPreferences: z.string().describe('The user\u2019s preferred mode of transportation.'),
  personalInterests: z.string().describe('The user\u2019s personal interests.'),
  budgetLimit: z.string().optional().describe('The user\'s budget limit for attractions, if any.'),
});
export type RecommendAttractionsInput = z.infer<typeof RecommendAttractionsInputSchema>;

const RecommendAttractionsOutputSchema = z.object({
  attractionRecommendations: z.array(
    z.object({
      name: z.string().describe('The name of the attraction.'),
      description: z.string().describe('A brief description of the attraction.'),
      category: z.string().describe('The category of the attraction (e.g., art, nature, history).'),
      estimatedVisitTime: z.string().describe('The estimated time to visit the attraction.'),
      approximateCost: z.string().optional().describe('The approximate cost to visit the attraction, if any.'),
    })
  ).describe('A list of recommended attractions based on the user\u2019s preferences.'),
});
export type RecommendAttractionsOutput = z.infer<typeof RecommendAttractionsOutputSchema>;

export async function recommendAttractions(input: RecommendAttractionsInput): Promise<RecommendAttractionsOutput> {
  return recommendAttractionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendAttractionsPrompt',
  input: {schema: RecommendAttractionsInputSchema},
  output: {schema: RecommendAttractionsOutputSchema},
  prompt: `You are an expert travel assistant that gives attraction recommendations.

  Based on the user's location, available time, transportation preferences, and personal interests, provide a list of attraction recommendations.

  Location: {{{location}}}
  Available Time: {{{availableTime}}}
  Transportation Preferences: {{{transportationPreferences}}}
  Personal Interests: {{{personalInterests}}}
  Budget Limit: {{{budgetLimit}}}

  Return a JSON array of attractions, with each attraction including name, description, category, estimatedVisitTime, and approximateCost (if applicable).  Make sure the JSON is valid and each field is well populated and formatted.
  `,
});

const recommendAttractionsFlow = ai.defineFlow(
  {
    name: 'recommendAttractionsFlow',
    inputSchema: RecommendAttractionsInputSchema,
    outputSchema: RecommendAttractionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
