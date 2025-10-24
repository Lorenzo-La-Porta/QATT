"use client";

import { useActionState, useState, useEffect } from "react";
import { Header } from "@/components/header";
import { RecommendationForm } from "@/components/recommendation-form";
import { RecommendationList } from "@/components/recommendation-list";
import { ItineraryPanel } from "@/components/itinerary-panel";
import type { Attraction } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { getAttractionRecommendations, type FormState } from "@/app/actions";

const initialState: FormState = {
  data: undefined,
  error: undefined,
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(getAttractionRecommendations, initialState);
  const [itinerary, setItinerary] = useState<Attraction[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.error,
      });
    }
  }, [state.error, toast]);


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
              <RecommendationForm formAction={formAction} isPending={isPending} />
              <ItineraryPanel
                itinerary={itinerary}
                onRemoveFromItinerary={handleRemoveFromItinerary}
              />
            </div>
          </aside>
          <section className="lg:col-span-2 mt-8 lg:mt-0">
            <RecommendationList
              recommendations={state?.data}
              onAddToItinerary={handleAddToItinerary}
              itinerary={itinerary}
              isPending={isPending}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
