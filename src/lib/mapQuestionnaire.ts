import type { TripAnswers } from "@/lib/recommend";

export type VayaQuestionnaireData = {
  travelingWith: string;
  days: number;
  interests: string[];
  idealDay: string;
  notes: string;
};

const TRAVELING_WITH_MAP: Record<string, string> = {
  Solo: "solo",
  Couple: "couple",
  Friends: "friends",
  "Family with kids": "family-with-kids",
};

const INTEREST_MAP: Record<string, string> = {
  Food: "Food",
  "Art & Culture": "Art and culture",
  History: "History",
  Nightlife: "Nightlife",
  Outdoors: "Outdoors and parks",
  Architecture: "Architecture",
  "Hidden gems": "Hidden gems",
  Shopping: "Shopping",
};

export function mapQuestionnaireToTripAnswers(
  data: VayaQuestionnaireData
): TripAnswers {
  return {
    travelingWith: TRAVELING_WITH_MAP[data.travelingWith] ?? "",
    days: String(data.days),
    interests: data.interests.map((interest) => INTEREST_MAP[interest] ?? interest),
    idealDay: data.idealDay,
    dietary: data.notes,
  };
}
