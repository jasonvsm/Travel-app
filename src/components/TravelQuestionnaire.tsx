"use client";

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

type FormAnswers = {
  travelingWith: string;
  days: string;
  interests: string[];
  idealDay: string;
  dietary: string;
};

const emptyAnswers: FormAnswers = {
  travelingWith: "",
  days: "",
  interests: [],
  idealDay: "",
  dietary: "",
};

export default function TravelQuestionnaire() {
  const [form, setForm] = useState<FormAnswers>(emptyAnswers);
  const [submitted, setSubmitted] = useState<FormAnswers | null>(null);

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
    setSubmitted({ ...form });
  }

  const maxInterestsReached = form.interests.length >= 3;

  return (
    <div className="w-full max-w-xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Travel App</h1>
        <p className="mt-2 text-gray-600">
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

      {submitted && (
        <section className="rounded-md border border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Your answers
          </h2>
          <dl className="mt-3 space-y-2 text-sm text-gray-700">
            <div>
              <dt className="font-medium">Traveling with</dt>
              <dd>{submitted.travelingWith || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium">Days here</dt>
              <dd>{submitted.days || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium">Top interests</dt>
              <dd>
                {submitted.interests.length > 0
                  ? submitted.interests.join(", ")
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="font-medium">Ideal day</dt>
              <dd>{submitted.idealDay || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium">Dietary needs</dt>
              <dd>{submitted.dietary || "None"}</dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
}
