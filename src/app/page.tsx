"use client";

import { useActionState, useEffect, useState } from "react";
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
  const { toast } = useToast();
  const [itinerary, setItinerary] = useState<Attraction[]>([]);

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
    setItinerary((prev) => [...prev, attraction]);
    toast({
      title: "Added to Plan",
      description: `${attraction.name} has been added to your travel plan.`,
    });
  };

  const handleRemoveFromItinerary = (attractionId: string) => {
    setItinerary((prev) => prev.filter(item => item.id !== attractionId));
  }
  
  const itineraryIds = new Set(itinerary.map(item => item.id));

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
              itineraryIds={itineraryIds}
              isPending={isPending}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
