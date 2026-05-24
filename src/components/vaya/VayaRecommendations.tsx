import type { ScoredRecommendation } from "@/lib/recommend";

type VayaRecommendationsProps = {
  recommendations: ScoredRecommendation[];
  totalPlaces: number;
  onStartOver: () => void;
};

function formatCategory(category: string) {
  return category.replace(/-/g, " ");
}

function forWhomLabel(bestFor: string): string {
  switch (bestFor) {
    case "couples":
      return "For couples";
    case "families":
      return "For families with kids";
    case "friends":
      return "For friends";
    case "solo":
      return "For solo travelers";
    default:
      return "For your trip";
  }
}

export function VayaRecommendations({
  recommendations,
  totalPlaces,
  onStartOver,
}: VayaRecommendationsProps) {
  const displayTags = (item: ScoredRecommendation) => {
    const tags = new Set<string>();
    item.matchedInterests.forEach((interest) => tags.add(interest));
    item.matchedTags.forEach((tag) => tags.add(tag));
    return Array.from(tags);
  };

  return (
    <section id="recommendations" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink/70">
            {recommendations.length} of {totalPlaces} places matched your trip.
          </p>
          <button
            type="button"
            onClick={onStartOver}
            className="border border-terracotta/30 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-clay/20"
          >
            Start over
          </button>
        </div>

        <div className="mb-16 h-px w-full bg-terracotta/30" />

        <p className="mb-12 text-xs font-medium uppercase tracking-[0.2em] text-terracotta">
          What Vaya recommends
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((item) => {
            const tags = displayTags(item);

            return (
              <article
                key={item.place.id}
                className="border border-terracotta/20 p-6"
              >
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-ink/50">
                  {forWhomLabel(item.place.best_for)}
                </p>
                <h3 className="mb-2 font-serif text-xl text-ink">
                  {item.place.name}
                </h3>
                <p className="mb-4 text-xs text-ink/60">
                  {item.place.neighborhood} ·{" "}
                  <span className="capitalize">
                    {formatCategory(item.place.category)}
                  </span>{" "}
                  · {item.place.price_level}
                </p>
                <p className="mb-6 text-sm leading-relaxed text-ink/80">
                  {item.place.description}
                </p>
                <p className="mb-4 text-xs text-ink/40">
                  Match score: {item.score}
                </p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-clay/20 px-3 py-1 text-xs text-ink/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
