"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/technology", label: "Technology" },
  { href: "/features", label: "Features" },
  { href: "/impact", label: "Impact" },
  { href: "/prototype", label: "Prototype" },
  { href: "/contact", label: "Contact" },
];

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tech text-white">
        {/* grate glyph */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="2" y="3" width="14" height="2" rx="1" fill="currentColor" />
          <rect x="2" y="8" width="14" height="2" rx="1" fill="currentColor" />
          <rect x="2" y="13" width="14" height="2" rx="1" fill="currentColor" />
        </svg>
      </span>
      <span className={`text-lg font-extrabold tracking-tight ${dark ? "text-white" : "text-forest"}`}>
        Drain<span className="text-tech">Guard</span>
      </span>
    </Link>
  );
}

export default function PublicNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-grey bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-tech ${
                path === l.href ? "text-tech" : "text-ink/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
          >
            Open Dashboard
          </Link>
        </nav>
        <button
          className="rounded-lg border border-neutral-grey p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M3 5h14M3 10h14M3 15h14" stroke="#12342b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-neutral-grey bg-white px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-ink/80">
              {l.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-forest px-4 py-2 text-center text-sm font-semibold text-white">
            Open Dashboard
          </Link>
        </nav>
      )}
    </header>
  );
}
