import PlacesGrid from "@/components/PlacesGrid";
import TravelQuestionnaire from "@/components/TravelQuestionnaire";
import placesData from "@/data/places.json";
import type { Place } from "@/types/place";

const places = placesData as Place[];

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Travel App</h1>
        </header>

        <PlacesGrid places={places} />

        <TravelQuestionnaire />
      </div>
    </main>
  );
}
