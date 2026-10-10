"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/PublicNav";

type PortalKind = "government" | "private";

const PORTAL_COPY: Record<PortalKind, {
  label: string;
  shortName: string;
  tag: string;
  role: string;
  demoEmail: string;
  organisation: string;
  organisationLabel: string;
  location: string;
  intro: string;
  bullets: string[];
  badge: string;
}> = {
  government: {
    label: "Government & municipal",
    shortName: "Civic operations",
    tag: "PUBLIC INFRASTRUCTURE",
    role: "Municipal Operator",
    demoEmail: "operator@gov.demo",
    organisation: "MCD-DEL-OPS-01",
    organisationLabel: "Department / ULB access code",
    location: "Municipal drainage network",
    intro: "Coordinate drainage operations, prioritise public assets and give response teams a shared view of developing conditions.",
    bullets: ["Ward and zone-level asset monitoring", "Evidence-led incident prioritisation", "Clear coordination across response teams"],
    badge: "Government workspace",
  },
  private: {
    label: "Private organisations",
    shortName: "Sites & facilities",
    tag: "SITES & FACILITIES",
    role: "Private Organization Operator",
    demoEmail: "facility@private.demo",
    organisation: "SITE-DEL-001",
    organisationLabel: "Organisation / site access code",
    location: "Facility drainage network",
    intro: "Monitor critical drains across campuses, industrial facilities and commercial properties, with maintenance actions connected to each alert.",
    bullets: ["Multi-site visibility for facility teams", "Condition-led cleaning workflows", "A searchable record of alerts and work"],
    badge: "Organisation workspace",
  },
};

export default function AuthPortal({ portal }: { portal: PortalKind }) {
  const router = useRouter();
  const copy = PORTAL_COPY[portal];
  const [email, setEmail] = useState(copy.demoEmail);
  const [password, setPassword] = useState("demo-1234");
  const [organisation, setOrganisation] = useState(copy.organisation);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState(copy.demoEmail);
  const [recoverySent, setRecoverySent] = useState(false);

  function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (email.trim().toLowerCase() !== copy.demoEmail || password !== "demo-1234" || organisation.trim() !== copy.organisation) {
      setError("This preview only accepts the demo account shown below. Real account authentication is not connected yet.");
      return;
    }

    const session = JSON.stringify({
      email,
      role: copy.role,
      portal,
      organisation,
      demo: true,
      at: Date.now(),
    });
    localStorage.removeItem("dg-session");
    sessionStorage.removeItem("dg-session");
    (remember ? localStorage : sessionStorage).setItem("dg-session", session);
    router.push("/app/dashboard");
  }

  function handleRecovery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRecoverySent(true);
  }

  return (
    <div className="min-h-[70vh] bg-mist px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-tech">
            <span aria-hidden>←</span> All portals
          </Link>
          <Link href="/contact" className="text-xs font-semibold text-offline hover:text-tech">Need access? Contact us</Link>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-neutral-grey bg-white shadow-lg lg:min-h-[640px] lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative isolate overflow-hidden bg-forest p-7 text-white sm:p-10 lg:p-12">
            <div aria-hidden className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full border-[42px] border-white/5" />
            <div aria-hidden className="absolute -bottom-32 -left-16 -z-10 h-80 w-80 rounded-full bg-tech/20 blur-2xl" />
            <Logo dark />
            <div className="mt-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-[0.17em] text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-[#79d4a5]" /> {copy.tag}
              </span>
              <h1 className="mt-5 max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl">
                A clearer view of what needs attention.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">{copy.intro}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {copy.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tech text-[11px] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Your workspace</p>
                <p className="mt-1 text-sm font-semibold text-white">{copy.shortName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Current environment</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-attn" /> Demonstration
                </p>
              </div>
            </div>
            <p className="mt-8 text-[11px] leading-5 text-white/45">
              DrainGuard is a monitoring and coordination tool. Physical drainage and emergency overflow paths must remain functional independently of this website.
            </p>
          </section>

          <section className="p-6 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-[11px] font-bold text-forest">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-tech" aria-hidden>✓</span>
                  {copy.badge}
                </span>
                <Link href={portal === "government" ? "/login/private" : "/login/government"} className="text-xs font-semibold text-tech hover:underline">
                  Switch portal
                </Link>
              </div>

              <h2 className="mt-8 text-2xl font-extrabold text-forest">Sign in to your workspace</h2>
              <p className="mt-2 text-sm leading-5 text-offline">Use the preview credentials below to explore the monitoring dashboard.</p>

              <div className="mt-5 rounded-lg border border-attn/35 bg-attn-bg px-3.5 py-3 text-xs leading-5 text-attn">
                <strong className="font-bold">Demo sign-in only.</strong> No real authentication service is connected. Do not enter production passwords or sensitive information.
              </div>

              {recoveryOpen ? (
                <div className="mt-6 rounded-xl border border-neutral-grey bg-mist/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-forest">Password assistance</h3>
                      <p className="mt-1 text-xs leading-5 text-offline">Password recovery is not connected in this preview.</p>
                    </div>
                    <button type="button" onClick={() => { setRecoveryOpen(false); setRecoverySent(false); }} className="rounded p-1 text-offline hover:bg-white" aria-label="Close password assistance">✕</button>
                  </div>
                  {recoverySent ? (
                    <p role="status" className="mt-4 rounded-lg bg-white p-3 text-sm text-forest">
                      Preview only: no reset email was sent. Contact your workspace administrator for account support.
                    </p>
                  ) : (
                    <form onSubmit={handleRecovery} className="mt-4 space-y-3">
                      <label className="block text-xs font-semibold text-forest">
                        Work email
                        <input required type="email" value={recoveryEmail} onChange={(event) => setRecoveryEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-neutral-grey bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-tech focus:ring-2 focus:ring-tech/15" />
                      </label>
                      <button className="w-full rounded-lg border border-forest px-4 py-2.5 text-sm font-bold text-forest hover:bg-white">Continue</button>
                    </form>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                  <label className="block text-sm font-semibold text-forest">
                    Work email
                    <input required autoComplete="username" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-lg border border-neutral-grey bg-white px-3.5 py-3 text-sm font-normal outline-none transition focus:border-tech focus:ring-2 focus:ring-tech/15" />
                  </label>

                  <label className="block text-sm font-semibold text-forest">
                    {copy.organisationLabel}
                    <input required autoComplete="organization" value={organisation} onChange={(event) => setOrganisation(event.target.value)} className="mt-1.5 w-full rounded-lg border border-neutral-grey bg-white px-3.5 py-3 text-sm font-normal outline-none transition focus:border-tech focus:ring-2 focus:ring-tech/15" />
                  </label>

                  <label className="block text-sm font-semibold text-forest">
                    Password
                    <span className="relative mt-1.5 block">
                      <input required autoComplete="current-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-neutral-grey bg-white px-3.5 py-3 pr-20 text-sm font-normal outline-none transition focus:border-tech focus:ring-2 focus:ring-tech/15" />
                      <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-3 text-xs font-bold text-tech hover:underline" aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
                    <label className="inline-flex items-center gap-2 text-xs text-ink/70">
                      <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 rounded border-neutral-grey accent-tech" />
                      Remember this device
                    </label>
                    <button type="button" onClick={() => setRecoveryOpen(true)} className="text-xs font-semibold text-tech hover:underline">Forgot password?</button>
                  </div>

                  {error && <p role="alert" className="rounded-lg border border-crit/20 bg-crit-bg px-3 py-2 text-xs leading-5 text-crit">{error}</p>}

                  <button type="submit" className="w-full rounded-lg bg-forest px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-forest-700 focus:outline-none focus:ring-4 focus:ring-tech/20">
                    Continue to {portal === "government" ? "government" : "organisation"} dashboard <span aria-hidden>→</span>
                  </button>
                </form>
              )}

              <div className="mt-5 rounded-xl border border-neutral-grey bg-mist/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-forest">Preview account</p>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-attn">Demo</span>
                </div>
                <dl className="mt-3 grid grid-cols-[92px_1fr] gap-x-3 gap-y-2 text-xs">
                  <dt className="text-offline">Email</dt><dd className="break-all font-mono text-ink">{copy.demoEmail}</dd>
                  <dt className="text-offline">Access code</dt><dd className="font-mono text-ink">{copy.organisation}</dd>
                  <dt className="text-offline">Password</dt><dd className="font-mono text-ink">demo-1234</dd>
                </dl>
              </div>

              <p className="mt-5 text-center text-xs leading-5 text-offline">
                New to DrainGuard? <Link href="/contact" className="font-bold text-tech hover:underline">Request workspace access</Link>
              </p>
              <p className="mt-6 flex items-center justify-center gap-2 border-t border-neutral-grey pt-5 text-[11px] text-offline">
                <span aria-hidden>◇</span> Demo session is stored only in this browser and is not a production security boundary.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
