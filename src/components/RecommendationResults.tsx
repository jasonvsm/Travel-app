import type { ScoredRecommendation } from "@/lib/recommend";

type RecommendationResultsProps = {
  recommendations: ScoredRecommendation[];
  totalPlaces: number;
  onStartOver: () => void;
};

function formatCategory(category: string) {
  return category.replace(/-/g, " ");
}

export default function RecommendationResults({
  recommendations,
  totalPlaces,
  onStartOver,
}: RecommendationResultsProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          {recommendations.length} of {totalPlaces} places matched your trip.
        </p>
        <button
          type="button"
          onClick={onStartOver}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Start over
        </button>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {recommendations.map((item) => (
          <li
            key={item.place.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {item.place.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {item.place.neighborhood}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-700 capitalize">
                {formatCategory(item.place.category)}
              </span>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-700">
                {item.place.price_level}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-700">{item.place.description}</p>
            <p className="mt-3 text-xs text-gray-400">
              Match score: {item.score}{" "}
              <span className="text-gray-300">
                (companion {item.companionPoints} + interests{" "}
                {item.interestPoints})
              </span>
            </p>
            {item.matchedInterests.length > 0 && (
              <p className="mt-2 text-xs text-gray-500">
                Matched interests: {item.matchedInterests.join(", ")}
                {item.matchedTags.length > 0 && (
                  <> · Tags: {item.matchedTags.join(", ")}</>
                )}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
