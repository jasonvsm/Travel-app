import type { Place } from "@/types/place";

export type TripAnswers = {
  travelingWith: string;
  days: string;
  interests: string[];
  idealDay: string;
  dietary: string;
};

export type ScoredRecommendation = {
  place: Place;
  score: number;
  companionPoints: number;
  interestPoints: number;
  matchedInterests: string[];
  matchedTags: string[];
};

const FOOD_CATEGORIES = new Set([
  "restaurant",
  "cafe",
  "wine-bar",
  "food-hall",
  "bakery",
]);

const ART_CULTURE_CATEGORIES = new Set(["museum", "cultural-venue", "cinema"]);

const NIGHTLIFE_CATEGORIES = new Set(["bar", "wine-bar", "brewery"]);

const HISTORY_TAGS = new Set(["historic", "iconic", "art-nouveau"]);

const ARCHITECTURE_TAGS = new Set([
  "design-led",
  "art-nouveau",
  "industrial",
  "iconic",
]);

const HIDDEN_GEM_TAGS = new Set([
  "hidden-gem",
  "off-the-beaten-path",
  "local-favorite",
]);

/** Companion types that are “good enough” but not perfect → +1 */
const PARTIAL_COMPANION_MATCH: Record<string, Set<string>> = {
  couple: new Set(["friends", "solo"]),
  friends: new Set(["couples", "solo"]),
  solo: new Set(["friends"]),
  "family-with-kids": new Set(["friends"]),
};

function scoreCompanion(
  travelingWith: string,
  place: Place
): { points: number } {
  let points = 0;
  const { best_for: bestFor, tags } = place;

  if (travelingWith === "couple" && bestFor === "couples") {
    points = 3;
  } else if (travelingWith === "family-with-kids" && bestFor === "families") {
    points = 3;
  } else if (travelingWith === "friends" && bestFor === "friends") {
    points = 3;
  } else if (travelingWith === "solo" && bestFor === "solo") {
    points = 3;
  }

  if (travelingWith === "family-with-kids" && tags.includes("kid-friendly")) {
    points += 2;
  }

  const gotFullCompanionMatch = points >= 3;
  if (
    !gotFullCompanionMatch &&
    PARTIAL_COMPANION_MATCH[travelingWith]?.has(bestFor)
  ) {
    points += 1;
  }

  return { points };
}

function scoreInterest(
  interest: string,
  place: Place
): { points: number; matchedTags: string[] } {
  const { category, tags, best_time: bestTime, indoor_outdoor: indoorOutdoor } =
    place;

  switch (interest) {
    case "Food":
      if (FOOD_CATEGORIES.has(category)) {
        return { points: 2, matchedTags: [] };
      }
      return { points: 0, matchedTags: [] };

    case "Art and culture":
      if (ART_CULTURE_CATEGORIES.has(category)) {
        return { points: 2, matchedTags: [] };
      }
      return { points: 0, matchedTags: [] };

    case "History": {
      const matched = tags.filter((tag) => HISTORY_TAGS.has(tag));
      if (matched.length > 0) {
        return { points: 2, matchedTags: matched };
      }
      return { points: 0, matchedTags: [] };
    }

    case "Nightlife":
      if (
        NIGHTLIFE_CATEGORIES.has(category) &&
        (bestTime === "evening" || bestTime === "late-night")
      ) {
        return { points: 2, matchedTags: [] };
      }
      return { points: 0, matchedTags: [] };

    case "Outdoors and parks":
      if (indoorOutdoor === "outdoor" || indoorOutdoor === "both") {
        return { points: 2, matchedTags: [] };
      }
      return { points: 0, matchedTags: [] };

    case "Architecture": {
      const matched = tags.filter((tag) => ARCHITECTURE_TAGS.has(tag));
      if (matched.length > 0) {
        return { points: 2, matchedTags: matched };
      }
      return { points: 0, matchedTags: [] };
    }

    case "Hidden gems": {
      const matched = tags.filter((tag) => HIDDEN_GEM_TAGS.has(tag));
      if (matched.length > 0) {
        return { points: 2, matchedTags: matched };
      }
      return { points: 0, matchedTags: [] };
    }

    case "Shopping":
      if (category === "shop") {
        return { points: 2, matchedTags: [] };
      }
      return { points: 0, matchedTags: [] };

    default:
      return { points: 0, matchedTags: [] };
  }
}

function scorePlace(place: Place, answers: TripAnswers): ScoredRecommendation {
  const companion = scoreCompanion(answers.travelingWith, place);

  let interestPoints = 0;
  const matchedInterests: string[] = [];
  const matchedTags = new Set<string>();

  for (const interest of answers.interests) {
    const result = scoreInterest(interest, place);
    if (result.points > 0) {
      interestPoints += result.points;
      matchedInterests.push(interest);
      result.matchedTags.forEach((tag) => matchedTags.add(tag));
    }
  }

  const score = companion.points + interestPoints;

  return {
    place,
    score,
    companionPoints: companion.points,
    interestPoints,
    matchedInterests,
    matchedTags: Array.from(matchedTags),
  };
}

export function getRecommendations(
  places: Place[],
  answers: TripAnswers,
  limit = 8
): ScoredRecommendation[] {
  const scored = places.map((place) => scorePlace(place, answers));

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return Math.random() - 0.5;
    })
    .slice(0, limit);
}
