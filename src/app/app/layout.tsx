"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/PublicNav";

const NAV: { group: string; items: { href: string; label: string; icon: string }[] }[] = [
  {
    group: "Monitoring",
    items: [
      { href: "/app/dashboard", label: "Overview", icon: "▦" },
      { href: "/app/map", label: "Live Drain Map", icon: "⌖" },
      { href: "/app/drains", label: "Drain Registry", icon: "☰" },
      { href: "/app/alerts", label: "Alert Centre", icon: "⚑" },
      { href: "/app/ai-insights", label: "AI Insights", icon: "✦" },
    ],
  },
  {
    group: "Operations",
    items: [
      { href: "/app/maintenance", label: "Maintenance", icon: "🛠" },
      { href: "/app/analytics", label: "Analytics", icon: "↗" },
      { href: "/app/devices", label: "Device Health", icon: "⚡" },
      { href: "/app/reports", label: "Reports", icon: "⎙" },
    ],
  },
  {
    group: "Administration",
    items: [{ href: "/app/settings", label: "Settings", icon: "⚙" }],
  },
];

interface Session { email: string; role: string; demo: boolean }

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("dg-session");
    if (!raw) {
      router.replace("/login");
      return;
    }
    try { setSession(JSON.parse(raw)); } catch { router.replace("/login"); return; }
    setChecked(true);
  }, [router]);

  useEffect(() => { setOpen(false); }, [path]);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist text-sm text-offline">
        Checking session…
      </div>
    );
  }

  const nav = (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      {NAV.map((g) => (
        <div key={g.group} className="mb-5">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{g.group}</p>
          <ul className="mt-2 space-y-0.5">
            {g.items.map((it) => {
              const active = path === it.href || (it.href !== "/app/dashboard" && path.startsWith(it.href));
              return (
                <li key={it.href}>
                  <Link href={it.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active ? "bg-tech text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}>
                    <span aria-hidden className="w-4 text-center text-xs">{it.icon}</span>
                    {it.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-mist">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-forest lg:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-5">
          <Logo dark />
        </div>
        {nav}
        <div className="border-t border-white/10 p-4 text-xs text-white/50">
          <p className="font-semibold text-white/80">{session?.email}</p>
          <p>{session?.role} · Demo session</p>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-forest">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <Logo dark />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-white/70">✕</button>
            </div>
            {nav}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-neutral-grey bg-white/95 px-4 backdrop-blur">
          <button className="rounded-lg border border-neutral-grey p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M3 5h14M3 10h14M3 15h14" stroke="#12342b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-forest">DrainGuard Monitor</p>
            <p className="hidden text-[11px] text-offline sm:block">Illustrative dashboard — demonstration data only</p>
          </div>
          <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-attn-bg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-attn sm:inline-flex">
            ● Demo mode
          </span>
          <Link href="/" className="hidden text-xs font-semibold text-tech hover:underline md:block">
            Public site
          </Link>
          <button
            onClick={() => { localStorage.removeItem("dg-session"); router.push("/login"); }}
            className="rounded-lg border border-neutral-grey px-3 py-1.5 text-xs font-semibold text-forest hover:bg-mist">
            Sign out
          </button>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <footer className="px-6 pb-4 text-center text-[11px] text-offline">
          All values shown are simulated demonstration data. An offline drain is never shown as safe —
          its condition is unknown until the device reports again.
        </footer>
      </div>
    </div>
  );
}
