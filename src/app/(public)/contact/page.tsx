"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">Contact</p>
      <h1 className="mt-3 text-4xl font-extrabold text-forest">Talk to the DrainGuard team</h1>
      <p className="mt-4 max-w-2xl text-ink/70">
        Institutions, municipalities and potential partners — tell us about your site and
        drainage challenges. We&apos;ll respond with pilot options and technical details.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          {sent ? (
            <div className="rounded-xl border border-ok/30 bg-ok-bg p-8 text-center">
              <p className="text-2xl">✓</p>
              <h2 className="mt-2 text-xl font-bold text-ok">Enquiry recorded (demo)</h2>
              <p className="mt-2 text-sm text-ink/70">
                This Stage-1 prototype stores nothing — in production this form delivers to the
                project team&apos;s inbox and the enquiry database.
              </p>
            </div>
          ) : (
            <form
              className="space-y-4 rounded-xl border border-neutral-grey bg-white p-6 shadow-sm"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-forest">
                  Name
                  <input required className="mt-1 w-full rounded-lg border border-neutral-grey px-3 py-2 text-sm font-normal outline-none focus:border-tech" placeholder="Your name" />
                </label>
                <label className="block text-sm font-semibold text-forest">
                  Email
                  <input required type="email" className="mt-1 w-full rounded-lg border border-neutral-grey px-3 py-2 text-sm font-normal outline-none focus:border-tech" placeholder="you@organisation.org" />
                </label>
              </div>
              <label className="block text-sm font-semibold text-forest">
                Organisation
                <input className="mt-1 w-full rounded-lg border border-neutral-grey px-3 py-2 text-sm font-normal outline-none focus:border-tech" placeholder="Municipality, campus, company…" />
              </label>
              <label className="block text-sm font-semibold text-forest">
                I&apos;m interested in
                <select className="mt-1 w-full rounded-lg border border-neutral-grey px-3 py-2 text-sm font-normal outline-none focus:border-tech">
                  <option>A pilot deployment</option>
                  <option>Technical collaboration</option>
                  <option>Academic / research partnership</option>
                  <option>General information</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-forest">
                Message
                <textarea required rows={5} className="mt-1 w-full rounded-lg border border-neutral-grey px-3 py-2 text-sm font-normal outline-none focus:border-tech" placeholder="Tell us about your site, flooding hotspots and goals…" />
              </label>
              <button className="rounded-lg bg-forest px-6 py-3 text-sm font-bold text-white hover:bg-forest-700">
                Send enquiry
              </button>
            </form>
          )}
        </div>
        <div className="space-y-4 md:col-span-2">
          {[
            ["Pilot deployments", "Start with one monitored drain at a known hotspot. Expand once the data proves itself."],
            ["For institutions", "DrainGuard doubles as a hands-on engineering platform: hardware, telemetry, data and AI in one project."],
            ["Response time", "Enquiries are typically answered within 2–3 working days."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl bg-mist/70 p-5">
              <h3 className="text-sm font-bold text-forest">{t}</h3>
              <p className="mt-1 text-sm text-ink/70">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
