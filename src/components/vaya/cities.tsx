export function Cities() {
  return (
    <section id="cities" className="px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-terracotta">
          Available In
        </p>
        <p className="font-serif text-xl text-ink md:text-2xl">
          Amsterdam <span className="text-ink/40">·</span>{" "}
          <span className="italic text-ink/50">Lisbon coming</span>{" "}
          <span className="text-ink/40">·</span>{" "}
          <span className="italic text-ink/50">Copenhagen coming</span>{" "}
          <span className="text-ink/40">·</span>{" "}
          <span className="italic text-ink/50">Mexico City coming</span>
        </p>
      </div>
    </section>
  );
}
