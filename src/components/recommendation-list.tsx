"use client";

import { useState, useMemo } from "react";
import { Compass, SearchX } from "lucide-react";
import { AttractionCard } from "./attraction-card";
import type { Attraction } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RecommendationListProps = {
  recommendations?: Attraction[];
  onAddToItinerary: (attraction: Attraction) => void;
  itinerary: Attraction[];
  isPending: boolean;
};

function RecommendationSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[180px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecommendationList({
  recommendations,
  onAddToItinerary,
  itinerary,
  isPending,
}: RecommendationListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!recommendations) return [];
    const allCategories = recommendations.map((rec) => rec.category);
    return [...new Set(allCategories)];
  }, [recommendations]);

  const filteredRecommendations = useMemo(() => {
    if (!recommendations) return [];
    if (!selectedCategory) return recommendations;
    return recommendations.filter(
      (rec) => rec.category === selectedCategory
    );
  }, [recommendations, selectedCategory]);

  if (isPending) {
    return <RecommendationSkeleton />;
  }

  if (!recommendations) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
        <Compass className="w-16 h-16 mb-4 text-primary/50" />
        <h2 className="font-headline text-2xl font-bold text-foreground">
          Your Adventure Awaits
        </h2>
        <p className="max-w-md mt-2">
          Fill out the form to let our AI discover personalized attractions just
          for you.
        </p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
        <SearchX className="w-16 h-16 mb-4 text-destructive/50" />
        <h2 className="font-headline text-2xl font-bold text-foreground">
          No Results Found
        </h2>
        <p className="max-w-md mt-2">
          We couldn't find any attractions matching your criteria. Try being
          more general with your interests or location.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "cursor-pointer",
            !selectedCategory
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}
          variant={!selectedCategory ? "default" : "secondary"}
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "secondary"}
            className="cursor-pointer"
          >
            {category}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecommendations.map((attraction) => (
          <AttractionCard
            key={attraction.id}
            attraction={attraction}
            onAddToItinerary={onAddToItinerary}
            isAdded={itinerary.some((item) => item.id === attraction.id)}
          />
        ))}
      </div>
    </div>
  );
}
