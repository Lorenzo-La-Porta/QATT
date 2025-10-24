"use client";

import Image from "next/image";
import { Plus, Check, MapPin, Clock, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Attraction } from "@/lib/types";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

type AttractionCardProps = {
  attraction: Attraction;
  onAddToItinerary: (attraction: Attraction) => void;
  isAdded: boolean;
};

export function AttractionCard({
  attraction,
  onAddToItinerary,
  isAdded,
}: AttractionCardProps) {
  const placeholder = getPlaceholderImage(attraction.category);

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg h-full">
      <CardHeader className="p-0">
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={placeholder.imageUrl}
            alt={placeholder.description}
            fill
            className="object-cover"
            data-ai-hint={placeholder.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">
          {attraction.category}
        </Badge>
        <h3 className="font-headline text-lg font-bold leading-tight">
          {attraction.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {attraction.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
         <div className="text-xs text-muted-foreground space-y-1">
          {attraction.estimatedVisitTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>{attraction.estimatedVisitTime}</span>
            </div>
          )}
          {attraction.approximateCost && (
             <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-primary">{attraction.approximateCost}</span>
            </div>
          )}
        </div>
        <Button
          onClick={() => onAddToItinerary(attraction)}
          disabled={isAdded}
          size="sm"
          className={cn(isAdded && "bg-green-600 hover:bg-green-700")}
        >
          {isAdded ? <Check /> : <Plus />}
          {isAdded ? "Added" : "Add to Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
}
