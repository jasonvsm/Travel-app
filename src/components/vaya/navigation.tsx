"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileMenuOpen ? "bg-sand/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-2xl tracking-wide text-ink"
          >
            Vaya
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#how-it-works"
              className="text-sm text-ink transition-colors hover:text-terracotta"
            >
              How it works
            </Link>
            <Link
              href="#cities"
              className="text-sm text-ink transition-colors hover:text-terracotta"
            >
              Cities
            </Link>
            <Link
              href="#questionnaire"
              className="text-sm text-ink transition-colors hover:text-terracotta"
            >
              Try the demo
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="2" y1="2" x2="18" y2="12" />
                  <line x1="2" y1="12" x2="18" y2="2" />
                </>
              ) : (
                <>
                  <line x1="0" y1="1" x2="20" y2="1" />
                  <line x1="0" y1="7" x2="20" y2="7" />
                  <line x1="0" y1="13" x2="20" y2="13" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-clay/30 pb-6 md:hidden">
            <div className="flex flex-col gap-4 pt-6">
              <Link
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-ink transition-colors hover:text-terracotta"
              >
                How it works
              </Link>
              <Link
                href="#cities"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-ink transition-colors hover:text-terracotta"
              >
                Cities
              </Link>
              <Link
                href="#questionnaire"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-ink transition-colors hover:text-terracotta"
              >
                Try the demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
