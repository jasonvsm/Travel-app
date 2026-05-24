import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen px-6 pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[calc(100vh-5rem)] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 pb-16 lg:order-1 lg:pb-0">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-terracotta opacity-0 animate-fade-up">
              Travel, Slowly
            </p>
            <h1 className="mb-6 font-serif text-5xl leading-[1.1] tracking-tight text-ink opacity-0 animate-fade-up animation-delay-100 md:text-6xl lg:text-7xl xl:text-[80px]">
              The places worth your time.
            </h1>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-ink/80 opacity-0 animate-fade-up animation-delay-200">
              Vaya is a travel guide trained on real taste, not algorithms. Tell
              us what kind of day you want — we&apos;ll find the places only
              locals know to recommend.
            </p>
            <div className="flex flex-wrap items-center gap-6 opacity-0 animate-fade-up animation-delay-300">
              <Link
                href="#questionnaire"
                className="inline-flex items-center justify-center bg-terracotta px-8 py-3.5 text-sm font-medium text-sand transition-colors hover:bg-terracotta/90"
              >
                Try the demo
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm font-medium text-terracotta transition-colors hover:text-terracotta/80"
              >
                How it works
                <span className="text-lg">↓</span>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-clay/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-sm italic text-ink/40">
                  Image placeholder
                </span>
              </div>
            </div>
            <p className="mt-3 font-serif text-sm italic text-ink/60">
              Amsterdam, golden hour
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
