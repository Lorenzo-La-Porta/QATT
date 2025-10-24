"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { RecommendationForm } from "@/components/recommendation-form";
import { RecommendationList } from "@/components/recommendation-list";
import { ItineraryPanel } from "@/components/itinerary-panel";
import type { Attraction } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [recommendations, setRecommendations] = useState<Attraction[]>([]);
  const [itinerary, setItinerary] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);
  const { toast } = useToast();

  const handleSetRecommendations = (newRecommendations: Attraction[]) => {
    setRecommendations(newRecommendations);
    setIsInitialState(false);
  };

  const handleAddToItinerary = (attraction: Attraction) => {
    if (!itinerary.find((item) => item.id === attraction.id)) {
      setItinerary([...itinerary, attraction]);
      toast({
        title: "Added to Itinerary",
        description: `${attraction.name} has been added to your plan.`,
      });
    }
  };

  const handleRemoveFromItinerary = (attractionId: string) => {
    const removedAttraction = itinerary.find(item => item.id === attractionId);
    if(removedAttraction) {
      setItinerary(itinerary.filter((item) => item.id !== attractionId));
      toast({
        title: "Removed from Itinerary",
        description: `${removedAttraction.name} has been removed from your plan.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          <aside className="lg:col-span-1 space-y-8">
            <div className="lg:sticky lg:top-8 space-y-8">
              <RecommendationForm
                setIsLoading={setIsLoading}
                setRecommendations={handleSetRecommendations}
              />
              <ItineraryPanel
                itinerary={itinerary}
                onRemoveFromItinerary={handleRemoveFromItinerary}
              />
            </div>
          </aside>
          <section className="lg:col-span-2 mt-8 lg:mt-0">
            <RecommendationList
              isLoading={isLoading}
              isInitialState={isInitialState}
              recommendations={recommendations}
              onAddToItinerary={handleAddToItinerary}
              itinerary={itinerary}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
