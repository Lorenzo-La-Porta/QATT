import type { RecommendAttractionsOutput } from '@/ai/flows/attraction-recommendations';

export type Attraction = RecommendAttractionsOutput['attractionRecommendations'][0] & { id: string };
