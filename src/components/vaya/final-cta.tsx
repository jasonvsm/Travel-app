import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-terracotta px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-serif text-4xl text-sand md:text-5xl lg:text-6xl">
          Travel like you mean it.
        </h2>
        <p className="mb-10 text-lg text-sand/80">
          Start with Amsterdam. Five questions, one minute.
        </p>
        <Link
          href="#questionnaire"
          className="inline-flex items-center justify-center bg-sand px-10 py-4 text-sm font-medium text-ink transition-colors hover:bg-sand/90"
        >
          Try Vaya
        </Link>
      </div>
    </section>
  );
}
