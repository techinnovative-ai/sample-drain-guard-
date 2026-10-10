import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impact" };

const IMPACTS = [
  { title: "Waterlogging prevention", text: "Blocked inlets are detected while they are still partial blockages. Streets flood less often when capacity loss is caught early — before the storm, not during it." },
  { title: "Condition-based maintenance", text: "Cleaning crews go where the data says debris actually is. Critical drains stop being missed; clean drains stop wasting crew time." },
  { title: "Faster emergency response", text: "During heavy rainfall, operators see which drains are overloading in real time and can pre-position pumps and crews at the highest-risk sites." },
  { title: "Infrastructure memory", text: "Every alert, inspection and cleaning is retained. Recurring problem drains become visible in the data, supporting redesign and budget decisions." },
  { title: "Safer field work", text: "Workers arrive knowing the drain's condition, history and hardware configuration — instead of discovering problems with a crowbar." },
  { title: "Scalable deployment", text: "The same platform serves a single campus prototype or a municipal fleet: multi-site support, role-based access and per-site thresholds." },
];

const BENEFICIARIES = [
  ["Municipalities", "City-scale visibility of drainage health, prioritised maintenance and documented response times for monsoon planning."],
  ["Campuses & institutions", "A low-cost pilot deployment that protects known flooding hotspots and doubles as a living engineering project."],
  ["Maintenance teams", "Clear work orders with evidence, priorities and history — not vague complaints after the flooding has started."],
  ["Residents", "Fewer flooded streets, less property damage, and drains that are maintained before failure instead of after."],
];

export default function ImpactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">Impact</p>
      <h1 className="mt-3 text-4xl font-extrabold text-forest">
        Preventing waterlogging, transforming maintenance
      </h1>
      <p className="mt-4 max-w-3xl text-ink/70">
        Most drainage budgets are spent reacting to failures. DrainGuard shifts the work earlier:
        detect capacity loss while it is cheap to fix, and keep the evidence that makes planning
        possible.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {IMPACTS.map((i) => (
          <div key={i.title} className="rounded-xl border border-neutral-grey bg-white p-6 shadow-sm">
            <h2 className="font-bold text-forest">{i.title}</h2>
            <p className="mt-2 text-sm text-ink/70">{i.text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold text-forest">Who benefits</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {BENEFICIARIES.map(([t, d]) => (
          <div key={t} className="flex gap-4 rounded-xl bg-mist/70 p-6">
            <div className="h-10 w-1 shrink-0 rounded bg-tech" aria-hidden />
            <div>
              <h3 className="font-bold text-forest">{t}</h3>
              <p className="mt-1 text-sm text-ink/70">{d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border-l-4 border-tech bg-mist p-6">
        <h3 className="font-bold text-forest">An honest note on claims</h3>
        <p className="mt-2 text-sm text-ink/80">
          DrainGuard is a student-built prototype. The impact described here is the design goal of
          the system, to be validated through staged field testing — real rain events, sensor
          faults, network outages and cleaning workflows — before any production claim is made.
          The physical assembly is engineered to manage water safely even when monitoring is
          unavailable.
        </p>
      </div>
    </div>
  );
}
