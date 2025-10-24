"use client";

import { X, MapPin } from "lucide-react";
import type { Attraction } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type ItineraryPanelProps = {
  itinerary: Attraction[];
  onRemoveFromItinerary: (attractionId: string) => void;
};

export function ItineraryPanel({
  itinerary,
  onRemoveFromItinerary,
}: ItineraryPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">My Travel Plan</CardTitle>
        <CardDescription>
          Your selected attractions will appear here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          {itinerary.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
              <MapPin className="w-10 h-10 mb-4" />
              <p className="font-medium">Your itinerary is empty</p>
              <p className="text-sm">
                Add attractions to start planning your adventure!
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {itinerary.map((attraction) => (
                <li
                  key={attraction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-foreground truncate">
                      {attraction.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {attraction.category}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 ml-2 shrink-0"
                    onClick={() => onRemoveFromItinerary(attraction.id)}
                    aria-label={`Remove ${attraction.name} from itinerary`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
