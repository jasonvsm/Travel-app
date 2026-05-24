import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-sand px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" className="font-serif text-xl tracking-wide text-ink">
            Vaya
          </Link>
          <div className="flex items-center gap-8">
            <span className="text-sm text-ink/70">About</span>
            <span className="text-sm text-ink/70">Privacy</span>
            <span className="text-sm text-ink/70">Contact</span>
          </div>
        </div>
        <div className="mt-8 border-t border-clay/50 pt-8">
          <p className="text-center font-serif text-sm italic text-ink/50">
            Made with care in Amsterdam · 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
