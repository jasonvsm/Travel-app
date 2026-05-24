import VayaHome from "@/components/vaya/VayaHome";
import placesData from "@/data/places.json";
import type { Place } from "@/types/place";

const places = placesData as Place[];

export default function Home() {
  return <VayaHome places={places} />;
}
