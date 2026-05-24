"use client";

import RecommendationResults from "@/components/RecommendationResults";
import { getRecommendations, type TripAnswers } from "@/lib/recommend";
import type { Place } from "@/types/place";
import { FormEvent, useState } from "react";

const TRAVELING_WITH_OPTIONS = [
  { value: "solo", label: "Solo" },
  { value: "couple", label: "Couple" },
  { value: "friends", label: "Friends" },
  { value: "family-with-kids", label: "Family with kids" },
] as const;

const INTEREST_OPTIONS = [
  "Food",
  "Art and culture",
  "History",
  "Nightlife",
  "Outdoors and parks",
  "Shopping",
  "Architecture",
  "Hidden gems",
] as const;

const emptyAnswers: TripAnswers = {
  travelingWith: "",
  days: "",
  interests: [],
  idealDay: "",
  dietary: "",
};

type TravelQuestionnaireProps = {
  places: Place[];
};

export default function TravelQuestionnaire({ places }: TravelQuestionnaireProps) {
  const [form, setForm] = useState<TripAnswers>(emptyAnswers);
  const [recommendations, setRecommendations] = useState<
    ReturnType<typeof getRecommendations> | null
  >(null);

  function handleInterestChange(interest: string, checked: boolean) {
    setForm((prev) => {
      if (checked) {
        if (prev.interests.length >= 3) return prev;
        return { ...prev, interests: [...prev.interests, interest] };
      }
      return {
        ...prev,
        interests: prev.interests.filter((item) => item !== interest),
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRecommendations(getRecommendations(places, form));
  }

  function handleStartOver() {
    setForm(emptyAnswers);
    setRecommendations(null);
  }

  const maxInterestsReached = form.interests.length >= 3;

  if (recommendations) {
    return (
      <div className="w-full max-w-3xl space-y-4">
        <header>
          <h2 className="text-lg font-semibold text-gray-900">
            Your recommendations
          </h2>
        </header>
        <RecommendationResults
          recommendations={recommendations}
          totalPlaces={places.length}
          onStartOver={handleStartOver}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl space-y-6">
      <header>
        <h2 className="text-lg font-semibold text-gray-900">Trip questionnaire</h2>
        <p className="mt-1 text-sm text-gray-600">
          Tell us a bit about your trip so we can tailor recommendations.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-gray-900">
            1. Who are you traveling with?
          </legend>
          <div className="space-y-2">
            {TRAVELING_WITH_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="radio"
                  name="travelingWith"
                  value={option.value}
                  checked={form.travelingWith === option.value}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      travelingWith: e.target.value,
                    }))
                  }
                  className="text-gray-900"
                  required
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2">
          <label
            htmlFor="days"
            className="block text-sm font-semibold text-gray-900"
          >
            2. How many days are you here?
          </label>
          <input
            id="days"
            type="number"
            min={1}
            value={form.days}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, days: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-gray-900">
            3. Pick your top 3 interests
          </legend>
          <p className="text-xs text-gray-500">
            Selected: {form.interests.length} / 3
          </p>
          <div className="space-y-2">
            {INTEREST_OPTIONS.map((interest) => {
              const isChecked = form.interests.includes(interest);
              const isDisabled = !isChecked && maxInterestsReached;

              return (
                <label
                  key={interest}
                  className={`flex items-center gap-2 text-sm ${
                    isDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={(e) =>
                      handleInterestChange(interest, e.target.checked)
                    }
                    className="rounded text-gray-900"
                  />
                  {interest}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="space-y-2">
          <label
            htmlFor="idealDay"
            className="block text-sm font-semibold text-gray-900"
          >
            4. Describe your ideal day in one or two sentences
          </label>
          <textarea
            id="idealDay"
            rows={3}
            value={form.idealDay}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, idealDay: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="dietary"
            className="block text-sm font-semibold text-gray-900"
          >
            5. Any dietary needs or constraints?{" "}
            <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="dietary"
            type="text"
            value={form.dietary}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, dietary: e.target.value }))
            }
            placeholder="e.g. vegetarian, nut allergy"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
