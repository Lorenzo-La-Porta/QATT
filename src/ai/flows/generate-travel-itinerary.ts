'use server';

/**
 * @fileOverview A travel itinerary generation AI agent.
 *
 * - generateTravelItinerary - A function that handles the travel itinerary generation process.
 * - GenerateTravelItineraryInput - The input type for the generateTravelItinerary function.
 * - GenerateTravelItineraryOutput - The return type for the generateTravelItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTravelItineraryInputSchema = z.object({
  attractions: z.array(
    z.object({
      name: z.string().describe('The name of the attraction.'),
      description: z.string().describe('A brief description of the attraction.'),
      category: z.string().describe('The category of the attraction (e.g., art, nature, history).'),
      estimatedVisitTime: z.string().describe('The estimated time to visit the attraction.'),
      approximateCost: z.string().optional().describe('The approximate cost to visit the attraction, if any.'),
      location: z.string().describe('The location of the attraction.'),
    })
  ).describe('A list of selected attractions for the itinerary.'),
  availableTime: z.string().describe('The amount of time available for the itinerary.'),
  transportationPreferences: z.string().describe('The preferred mode of transportation.'),
  personalInterests: z.string().describe('The user’s personal interests.'),
  budgetLimit: z.string().optional().describe('The user\u2019s budget limit for the itinerary, if any.'),
});
export type GenerateTravelItineraryInput = z.infer<typeof GenerateTravelItineraryInputSchema>;

const GenerateTravelItineraryOutputSchema = z.object({
  itinerary: z.array(
    z.object({
      attractionName: z.string().describe('The name of the attraction in the itinerary.'),
      arrivalTime: z.string().describe('The estimated arrival time at the attraction.'),
      departureTime: z.string().describe('The estimated departure time from the attraction.'),
      activities: z.array(z.string()).describe('A list of suggested activities at the attraction.'),
    })
  ).describe('A travel itinerary based on the selected attractions, optimized for travel time and distance.'),
  totalEstimatedCost: z.string().optional().describe('The total estimated cost of the itinerary, if any.'),
});
export type GenerateTravelItineraryOutput = z.infer<typeof GenerateTravelItineraryOutputSchema>;

export async function generateTravelItinerary(input: GenerateTravelItineraryInput): Promise<GenerateTravelItineraryOutput> {
  return generateTravelItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTravelItineraryPrompt',
  input: {schema: GenerateTravelItineraryInputSchema},
  output: {schema: GenerateTravelItineraryOutputSchema},
  prompt: `You are an expert travel assistant that generates optimized travel itineraries.

  Based on the user's selected attractions, available time, transportation preferences, and personal interests, create a detailed travel itinerary.

  Attractions: {{{attractions}}}
  Available Time: {{{availableTime}}}
  Transportation Preferences: {{{transportationPreferences}}}
  Personal Interests: {{{personalInterests}}}
  Budget Limit: {{{budgetLimit}}}

  Return a JSON array of itinerary items, with each item including attractionName, arrivalTime, departureTime, and a list of suggested activities.  Make sure the JSON is valid and each field is well populated and formatted. Also include totalEstimatedCost if budgetLimit is provided.
  `,
});

const generateTravelItineraryFlow = ai.defineFlow(
  {
    name: 'generateTravelItineraryFlow',
    inputSchema: GenerateTravelItineraryInputSchema,
    outputSchema: GenerateTravelItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
