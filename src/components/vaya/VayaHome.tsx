"use client";

import { Cities } from "@/components/vaya/cities";
import { ExampleRecommendation } from "@/components/vaya/example-recommendation";
import { FinalCTA } from "@/components/vaya/final-cta";
import { Footer } from "@/components/vaya/footer";
import { Hero } from "@/components/vaya/hero";
import { HowItWorks } from "@/components/vaya/how-it-works";
import { Manifesto } from "@/components/vaya/manifesto";
import { Navigation } from "@/components/vaya/navigation";
import { Questionnaire } from "@/components/vaya/questionnaire";
import { VayaRecommendations } from "@/components/vaya/VayaRecommendations";
import {
  mapQuestionnaireToTripAnswers,
  type VayaQuestionnaireData,
} from "@/lib/mapQuestionnaire";
import {
  getRecommendations,
  type ScoredRecommendation,
} from "@/lib/recommend";
import type { Place } from "@/types/place";
import { useState } from "react";

type VayaHomeProps = {
  places: Place[];
};

export default function VayaHome({ places }: VayaHomeProps) {
  const [results, setResults] = useState<ScoredRecommendation[] | null>(null);

  function handleSubmit(data: VayaQuestionnaireData) {
    const answers = mapQuestionnaireToTripAnswers(data);
    const recs = getRecommendations(places, answers);
    setResults(recs);
    setTimeout(() => {
      document
        .getElementById("recommendations")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleStartOver() {
    setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (results) {
    return (
      <main className="bg-sand">
        <Navigation />
        <div className="pt-20">
          <VayaRecommendations
            recommendations={results}
            totalPlaces={places.length}
            onStartOver={handleStartOver}
          />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-sand">
      <Navigation />
      <Hero />
      <Manifesto />
      <HowItWorks />
      <ExampleRecommendation />
      <Cities />
      <FinalCTA />
      <Questionnaire onSubmit={handleSubmit} />
      <Footer />
    </main>
  );
}
