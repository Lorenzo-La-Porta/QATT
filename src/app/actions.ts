'use server';

import { recommendAttractions } from '@/ai/flows/attraction-recommendations';
import { nanoid } from 'nanoid';
import type { Attraction } from '@/lib/types';
import { formSchema } from '@/lib/schema';

export type FormState = {
  data?: Attraction[];
  error?: string;
}

export async function getAttractionRecommendations(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = formSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return { error: 'Invalid input. Please check the form fields.' };
  }

  try {
    const result = await recommendAttractions(validatedFields.data);
    const recommendationsWithIds = result.attractionRecommendations.map((rec) => ({
      ...rec,
      id: nanoid(),
    }));
    return { data: recommendationsWithIds };
  } catch (error) {
    console.error('AI Error:', error);
    return { error: 'Failed to get recommendations. The AI might be busy, please try again.' };
  }
}
