"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { getAttractionRecommendations } from "@/app/actions";
import type { Attraction } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/icons";

type RecommendationFormProps = {
  setIsLoading: (isLoading: boolean) => void;
  setRecommendations: (recommendations: Attraction[]) => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Spinner className="mr-2 h-4 w-4" />
          Generating...
        </>
      ) : (
        "Find Attractions"
      )}
    </Button>
  );
}

const initialState = {
  data: [],
};

export function RecommendationForm({
  setIsLoading,
  setRecommendations,
}: RecommendationFormProps) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(getAttractionRecommendations, initialState);
  
  const [location, setLocation] = useState("Paris, France");
  const [availableTime, setAvailableTime] = useState("1 day");
  const [transportationPreferences, setTransportationPreferences] = useState("Walking");
  const [personalInterests, setPersonalInterests] = useState("Historic landmarks, art museums, and local cafes");
  const [budgetLimit, setBudgetLimit] = useState("moderate");


  const { pending } = useFormStatus();

  useEffect(() => {
    setIsLoading(pending);
  }, [pending, setIsLoading]);

  useEffect(() => {
    if (state?.data && state.data.length > 0) {
      setRecommendations(state.data);
    }
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.error,
      });
    }
  }, [state, setRecommendations, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Find Your Next Adventure</CardTitle>
        <CardDescription>
          Tell us your preferences, and our AI will craft the perfect plan.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Your Location</Label>
            <Input
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York City"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availableTime">Available Time</Label>
            <Input
              id="availableTime"
              name="availableTime"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              placeholder="e.g., 6 hours, half a day"
            />
          </div>
          <div className="space-y-2">
            <Label>Transportation</Label>
             <Select name="transportationPreferences" onValueChange={setTransportationPreferences} value={transportationPreferences}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a method" />
                </SelectTrigger>
              <SelectContent>
                <SelectItem value="Walking">Walking</SelectItem>
                <SelectItem value="Public Transit">Public Transit</SelectItem>
                <SelectItem value="Driving">Driving</SelectItem>
                <SelectItem value="Cycling">Cycling</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalInterests">Interests</Label>
            <Textarea
              id="personalInterests"
              name="personalInterests"
              value={personalInterests}
              onChange={(e) => setPersonalInterests(e.target.value)}
              placeholder="e.g., art, nature, history, coffee shops..."
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Budget</Label>
            <Select name="budgetLimit" onValueChange={setBudgetLimit} value={budgetLimit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your budget" />
                </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="any">No Limit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
