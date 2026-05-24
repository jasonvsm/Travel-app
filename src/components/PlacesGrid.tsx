import type { Place } from "@/types/place";

type PlacesGridProps = {
  places: Place[];
};

function formatCategory(category: string) {
  return category.replace(/-/g, " ");
}

export default function PlacesGrid({ places }: PlacesGridProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900">
        Amsterdam places ({places.length})
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <li
            key={place.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900">{place.name}</h3>
            <p className="mt-1 text-sm text-gray-600">{place.neighborhood}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-700 capitalize">
                {formatCategory(place.category)}
              </span>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-700">
                {place.price_level}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-700 line-clamp-4">
              {place.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
