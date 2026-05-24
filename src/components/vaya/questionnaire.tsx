"use client";

import type { VayaQuestionnaireData } from "@/lib/mapQuestionnaire";
import { useState } from "react";

const travelingWithOptions = ["Solo", "Couple", "Friends", "Family with kids"];
const interestOptions = [
  "Food",
  "Art & Culture",
  "History",
  "Nightlife",
  "Outdoors",
  "Architecture",
  "Hidden gems",
  "Shopping",
];

type QuestionnaireProps = {
  onSubmit: (data: VayaQuestionnaireData) => void;
};

export function Questionnaire({ onSubmit }: QuestionnaireProps) {
  const [travelingWith, setTravelingWith] = useState("");
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState<string[]>([]);
  const [idealDay, setIdealDay] = useState("");
  const [notes, setNotes] = useState("");

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else if (interests.length < 3) {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ travelingWith, days, interests, idealDay, notes });
  };

  const isValid = travelingWith && days > 0 && interests.length > 0;

  return (
    <section id="questionnaire" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-16 h-px w-full bg-terracotta/30" />

        <p className="mb-12 text-xs font-medium uppercase tracking-[0.2em] text-terracotta">
          Tell us about your trip
        </p>

        <form onSubmit={handleSubmit} className="space-y-16">
          <div>
            <label className="mb-6 block font-serif text-xl text-ink">
              Who are you traveling with?
            </label>
            <div className="flex flex-wrap gap-3">
              {travelingWithOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTravelingWith(option)}
                  className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                    travelingWith === option
                      ? "bg-terracotta text-sand"
                      : "bg-clay/20 text-ink hover:bg-clay/30"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="days"
              className="mb-6 block font-serif text-xl text-ink"
            >
              How many days?
            </label>
            <input
              type="number"
              id="days"
              min={1}
              max={30}
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value, 10) || 1)}
              className="w-32 bg-clay/10 px-6 py-4 text-center font-serif text-2xl text-ink outline-none focus:ring-2 focus:ring-terracotta/50"
            />
          </div>

          <div>
            <label className="mb-2 block font-serif text-xl text-ink">
              Pick up to three things you love
            </label>
            <p className="mb-6 text-sm text-ink/60">
              {interests.length}/3 selected
            </p>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleInterest(option)}
                  className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                    interests.includes(option)
                      ? "bg-terracotta text-sand"
                      : "bg-clay/20 text-ink hover:bg-clay/30"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="idealDay"
              className="mb-6 block font-serif text-xl text-ink"
            >
              Describe your ideal day
            </label>
            <textarea
              id="idealDay"
              rows={4}
              value={idealDay}
              onChange={(e) => setIdealDay(e.target.value)}
              placeholder="Slow morning at a café, wandering through a neighborhood market, dinner at a place the locals go..."
              className="w-full bg-clay/10 px-6 py-4 text-ink placeholder:text-ink/40 outline-none focus:ring-2 focus:ring-terracotta/50"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="mb-2 block font-serif text-xl text-ink"
            >
              Anything we should know?
            </label>
            <p className="mb-6 text-sm text-ink/60">
              Dietary needs, accessibility, etc. (optional)
            </p>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Vegetarian, need step-free access, traveling with a toddler..."
              className="w-full bg-clay/10 px-6 py-4 text-ink placeholder:text-ink/40 outline-none focus:ring-2 focus:ring-terracotta/50"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 text-sm font-medium transition-colors ${
              isValid
                ? "bg-terracotta text-sand hover:bg-terracotta/90"
                : "cursor-not-allowed bg-clay/30 text-ink/40"
            }`}
          >
            Show me places
          </button>
        </form>
      </div>
    </section>
  );
}
