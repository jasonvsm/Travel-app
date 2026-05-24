const steps = [
  {
    number: "01",
    title: "Tell us your trip",
    description:
      "Five questions. Who you're with, what you love, what you want out of this trip. No accounts. No data we don't need.",
  },
  {
    number: "02",
    title: "We match your taste",
    description:
      "Vaya pairs your answers with hand-curated places, factoring in the time of day, the weather, even your mood. Not a single algorithmic list.",
  },
  {
    number: "03",
    title: "Discover with confidence",
    description:
      "Get recommendations that feel personal — like a tip from a friend who's been ten times. With reasons, not ratings.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="mb-16 text-center text-xs font-medium uppercase tracking-[0.2em] text-terracotta">
          How Vaya Works
        </p>
        <div className="grid gap-16 md:grid-cols-3 md:gap-8 lg:gap-16">
          {steps.map((step) => (
            <div key={step.number} className="text-center md:text-left">
              <span className="mb-4 block font-serif text-5xl tabular-nums text-terracotta lg:text-6xl">
                {step.number}
              </span>
              <h3 className="mb-4 font-serif text-2xl text-ink">{step.title}</h3>
              <p className="leading-relaxed text-ink/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
