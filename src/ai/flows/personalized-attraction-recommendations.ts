'use server';

/**
 * @fileOverview A personalized attraction recommendation AI agent that leverages past travel history.
 *
 * - personalizedAttractionRecommendations - A function that handles the personalized attraction recommendation process.
 * - PersonalizedAttractionRecommendationsInput - The input type for the personalizedAttractionRecommendations function.
 * - PersonalizedAttractionRecommendationsOutput - The return type for the personalizedAttractionRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAttractionRecommendationsInputSchema = z.object({
  location: z.string().describe('The user\u2019s current location.'),
  availableTime: z.string().describe('The amount of time the user has available for activities.'),
  transportationPreferences: z.string().describe('The user\u2019s preferred mode of transportation.'),
  personalInterests: z.string().describe('The user\u2019s personal interests.'),
  pastTravelHistory: z.string().describe('The user\u2019s past travel history.'),
  budgetLimit: z.string().optional().describe('The user\'s budget limit for attractions, if any.'),
});
export type PersonalizedAttractionRecommendationsInput = z.infer<typeof PersonalizedAttractionRecommendationsInputSchema>;

const PersonalizedAttractionRecommendationsOutputSchema = z.object({
  attractionRecommendations: z.array(
    z.object({
      name: z.string().describe('The name of the attraction.'),
      description: z.string().describe('A brief description of the attraction.'),
      category: z.string().describe('The category of the attraction (e.g., art, nature, history).'),
      estimatedVisitTime: z.string().describe('The estimated time to visit the attraction.'),
      approximateCost: z.string().optional().describe('The approximate cost to visit the attraction, if any.'),
    })
  ).describe('A list of recommended attractions based on the user\u2019s preferences and past travel history.'),
});
export type PersonalizedAttractionRecommendationsOutput = z.infer<typeof PersonalizedAttractionRecommendationsOutputSchema>;

export async function personalizedAttractionRecommendations(input: PersonalizedAttractionRecommendationsInput): Promise<PersonalizedAttractionRecommendationsOutput> {
  return personalizedAttractionRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAttractionRecommendationsPrompt',
  input: {schema: PersonalizedAttractionRecommendationsInputSchema},
  output: {schema: PersonalizedAttractionRecommendationsOutputSchema},
  prompt: `You are an expert travel assistant that gives personalized attraction recommendations based on past travel history.

  Based on the user\'s location, available time, transportation preferences, personal interests, and past travel history, provide a list of attraction recommendations.

  Location: {{{location}}}
  Available Time: {{{availableTime}}}
  Transportation Preferences: {{{transportationPreferences}}}
  Personal Interests: {{{personalInterests}}}
  Past Travel History: {{{pastTravelHistory}}}
  Budget Limit: {{{budgetLimit}}}

  Return a JSON array of attractions, with each attraction including name, description, category, estimatedVisitTime, and approximateCost (if applicable).  Make sure the JSON is valid and each field is well populated and formatted.
  `,
});

const personalizedAttractionRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedAttractionRecommendationsFlow',
    inputSchema: PersonalizedAttractionRecommendationsInputSchema,
    outputSchema: PersonalizedAttractionRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
