import Link from "next/link";
import { Logo } from "@/components/PublicNav";

const PORTALS = [
  {
    href: "/login/government",
    label: "Government & municipal",
    eyebrow: "PUBLIC INFRASTRUCTURE",
    description: "For municipal corporations, public-works departments and drainage authorities managing city-wide networks.",
    action: "Continue to government portal",
    icon: "⌂",
    features: ["Multi-ward operations", "Public asset oversight", "Response coordination"],
    tone: "government",
  },
  {
    href: "/login/private",
    label: "Private organisations",
    eyebrow: "SITES & FACILITIES",
    description: "For campuses, industrial facilities, commercial properties and private infrastructure operators.",
    action: "Continue to organisation portal",
    icon: "▤",
    features: ["Site-level monitoring", "Maintenance planning", "Team coordination"],
    tone: "private",
  },
];

export default function LoginPage() {
  return (
    <div className="bg-mist px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center"><Logo /></div>
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-tech/20 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-tech">
            <span className="h-2 w-2 rounded-full bg-tech" /> Secure workspace access
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">
            Choose your DrainGuard portal
          </h1>
          <p className="mt-3 text-sm leading-6 text-ink/70 sm:text-base">
            Select the workspace that matches your organisation. Each portal opens the same monitoring platform with a tailored demo role.
          </p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {PORTALS.map((portal) => (
            <Link key={portal.href} href={portal.href}
              className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-8 ${
                portal.tone === "government" ? "border-forest/15 hover:border-forest/40" : "border-tech/20 hover:border-tech/50"
              }`}>
              <div className={`absolute right-0 top-0 h-36 w-36 -translate-y-1/3 translate-x-1/3 rounded-full opacity-10 transition-transform group-hover:scale-125 ${portal.tone === "government" ? "bg-forest" : "bg-tech"}`} />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${portal.tone === "government" ? "bg-forest text-white" : "bg-tech text-white"}`} aria-hidden>
                    {portal.icon}
                  </div>
                  <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-offline">{portal.eyebrow}</span>
                </div>
                <h2 className="mt-6 text-xl font-extrabold text-forest sm:text-2xl">{portal.label}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-ink/70">{portal.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {portal.features.map((feature) => (
                    <li key={feature} className="rounded-full border border-neutral-grey px-3 py-1 text-xs font-medium text-ink/70">{feature}</li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center justify-between border-t border-neutral-grey/70 pt-5">
                  <span className="text-sm font-bold text-tech">{portal.action}</span>
                  <span aria-hidden className="text-xl text-tech transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center justify-between gap-3 rounded-xl border border-attn/30 bg-attn-bg px-4 py-3 text-center text-xs text-attn sm:flex-row sm:text-left">
          <p><strong>Preview environment.</strong> These sign-in screens use local demo accounts only — do not enter real passwords.</p>
          <Link href="/contact" className="shrink-0 font-bold underline underline-offset-2">Request access</Link>
        </div>
        <p className="mt-6 text-center text-xs text-offline">
          Access is role-based in production. This preview uses a browser-only demonstration session.
        </p>
      </div>
    </div>
  );
}
