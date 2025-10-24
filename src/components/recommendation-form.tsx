"use client";

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
import { Spinner } from "@/components/icons";

type RecommendationFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? (
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

export function RecommendationForm({
  formAction,
  isPending,
}: RecommendationFormProps) {
  
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
              defaultValue="Paris, France"
              placeholder="e.g., New York City"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availableTime">Available Time</Label>
            <Input
              id="availableTime"
              name="availableTime"
              defaultValue="1 day"
              placeholder="e.g., 6 hours, half a day"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transportationPreferences">Transportation</Label>
             <Select name="transportationPreferences" defaultValue="Walking">
                <SelectTrigger id="transportationPreferences">
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
              defaultValue="Historic landmarks, art museums, and local cafes"
              placeholder="e.g., art, nature, history, coffee shops..."
              className="resize-none"
              required
              minLength={10}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budgetLimit">Budget</Label>
            <Select name="budgetLimit" defaultValue="moderate">
                <SelectTrigger id="budgetLimit">
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
          <SubmitButton isPending={isPending} />
        </CardFooter>
      </form>
    </Card>
  );
}
