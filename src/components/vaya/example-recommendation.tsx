const tags = ["hidden gem", "intimate", "wine-lovers", "evening"];

export function ExampleRecommendation() {
  return (
    <section className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-2xl">
        <p className="mb-12 text-center text-xs font-medium uppercase tracking-[0.2em] text-terracotta">
          See It In Action
        </p>
        <div className="border border-terracotta bg-sand p-8 md:p-12">
          <h3 className="mb-2 font-serif text-3xl text-ink md:text-4xl">
            Fiaschetteria Pistoia
          </h3>
          <p className="mb-6 text-sm text-ink/60">Centrum · Italian · €€</p>
          <p className="mb-8 leading-relaxed text-ink/80">
            A tiny Tuscan trattoria most people walk past without noticing. The
            wine list is older than the chef and the cacio e pepe is the kind
            that makes you go quiet for a second. Best on a Tuesday, when
            there&apos;s room to sit at the bar.
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-terracotta/10 px-3 py-1 text-xs font-medium text-terracotta"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
