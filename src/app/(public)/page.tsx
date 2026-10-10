import Link from "next/link";
import Image from "next/image";

const PROBLEMS = [
  { title: "Debris accumulation", text: "Leaves, plastic and silt collect on inlets and slowly choke drainage capacity long before anyone notices." },
  { title: "Inlet obstruction", text: "A single storm can mat the grate surface with debris, blocking water entry exactly when capacity is needed most." },
  { title: "Heavy rainfall", text: "Short, intense rain events overwhelm drains that already lost capacity to unnoticed accumulation." },
  { title: "Hidden blockages", text: "Downstream restrictions and back-pressure are invisible from the street — until water starts rising." },
  { title: "Inadequate maintenance", text: "Without data, cleaning is scheduled by calendar, not by condition. Critical drains are missed; clean drains are revisited." },
];

const SOLUTION = [
  { title: "Protective grate", text: "Keeps large debris out while letting water pass freely into the assembly." },
  { title: "Debris basket", text: "Removable perforated basket captures debris for fast, safe cleaning." },
  { title: "Emergency flow path", text: "A physical overflow channel keeps water moving even if the primary surface clogs — safety never depends on software." },
  { title: "Sensors", text: "Water level, with optional flow, rainfall and fill sensing, measured continuously at the drain." },
  { title: "Solar-powered controller", text: "An ESP32 reads sensors, runs local fault checks and transmits authenticated readings." },
  { title: "Web application", text: "Dashboard, alerts, map, AI insights and maintenance workflows for every registered unit." },
];

const STEPS = [
  { n: "01", title: "Water and debris enter", text: "Rainwater and street debris reach the drainage assembly. The grate and basket separate debris from flow." },
  { n: "02", title: "Sensors measure", text: "Water level and other available conditions are measured continuously and timestamped at the device." },
  { n: "03", title: "Software analyses", text: "The backend validates readings and the analysis engine detects abnormal patterns — with evidence and confidence." },
  { n: "04", title: "People act", text: "The dashboard raises warnings and maintenance notifications so the right team inspects the right drain, in time." },
];

const FEATURES = [
  { title: "Live monitoring", text: "Current water level, rainfall and debris-basket estimates for every registered unit in one place." },
  { title: "Predictive maintenance", text: "Clean drains when their condition demands it — not just when the calendar says so." },
  { title: "Offline-device warnings", text: "A silent device is never shown as safe. Lost heartbeats are flagged as condition-unknown immediately." },
  { title: "Event history", text: "Every alert, acknowledgement, inspection and cleaning is retained to diagnose recurring problems." },
  { title: "Explainable AI insights", text: "Not just “blockage detected” — the observed evidence, confidence and recommended next action." },
  { title: "Deployment-ready design", text: "Campuses, municipalities and industrial sites — role-based access and multi-site support from day one." },
];

export default function HomePage() {
  return (
    <>
      {/* SECTION 01 — HERO */}
      <section className="relative overflow-hidden bg-forest text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">
              Smart Drainage Intelligence Platform
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Smarter Drains. Earlier Warnings. Better Monitoring.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              DrainGuard is an integrated storm-drain protection and monitoring system: a physical
              guard that keeps debris out, solar-powered sensors that watch every inlet, and an AI
              layer that explains what is going wrong — before streets flood.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/technology"
                className="rounded-lg bg-tech px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-tech-600">
                Explore Technology
              </Link>
              <Link href="/login"
                className="rounded-lg border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
                Open Dashboard
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-center">
              {[["4", "questions answered per drain"], ["24/7", "condition monitoring"], ["0", "cloud dependence for safety"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-extrabold text-tech">{v}</p>
                  <p className="mt-1 text-xs text-white/60">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Image src="/images/hero-drain.jpg" alt="Concept visual of a DrainGuard smart storm-drain unit with solar-powered sensor module" width={880} height={560} priority
              className="rounded-2xl border border-white/10 shadow-2xl" />
            <p className="mt-2 text-center text-[11px] text-white/40">Concept visualization — AI-generated illustration of the DrainGuard unit</p>
          </div>
        </div>
      </section>

      {/* SECTION 02 — THE PROBLEM */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">Section 02 — The problem</p>
        <h2 className="mt-3 text-3xl font-extrabold text-forest">Why drainage failures happen</h2>
        <p className="mt-3 max-w-2xl text-ink/70">
          Urban waterlogging is rarely caused by rain alone. It is caused by drains that quietly
          lost their capacity — and nobody knew.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <div key={p.title} className="rounded-xl border border-neutral-grey bg-mist/60 p-6">
              <span className="font-mono text-xs font-bold text-tech">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold text-forest">{p.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{p.text}</p>
            </div>
          ))}
          <div className="flex items-center rounded-xl bg-forest p-6 text-white">
            <p className="text-sm leading-relaxed">
              <strong className="text-tech">The pattern is always the same:</strong> capacity is
              lost silently, the failure is discovered during the storm, and the response starts
              after the damage. DrainGuard exists to break this cycle.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 03 — THE SOLUTION */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">Section 03 — The solution</p>
          <h2 className="mt-3 text-3xl font-extrabold text-forest">
            Physical protection + sensing + intelligence
          </h2>
          <p className="mt-3 max-w-2xl text-ink/70">
            Three layers that work together — and degrade safely. The mechanical layer protects the
            drain even if every sensor and server fails.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTION.map((s) => (
              <div key={s.title} className="rounded-xl border border-neutral-grey bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-forest">{s.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04 — HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">Section 04 — How it works</p>
        <h2 className="mt-3 text-3xl font-extrabold text-forest">From rainfall to response</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-xl border border-neutral-grey p-6">
              <span className="font-mono text-3xl font-extrabold text-neutral-grey">{s.n}</span>
              <h3 className="mt-3 font-bold text-forest">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/how-it-works" className="text-sm font-semibold text-tech hover:underline">
            See the full system walkthrough →
          </Link>
        </div>
      </section>

      {/* SECTION 05 — FEATURES AND IMPACT */}
      <section className="bg-forest py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">Section 05 — Features and impact</p>
          <h2 className="mt-3 text-3xl font-extrabold">A monitoring platform, not a brochure</h2>
          <p className="mt-3 max-w-2xl text-white/70">
            The public website explains DrainGuard — but the monitoring application is the core of
            the project. Every registered drain gets a digital record, explainable warnings and a
            maintenance trail.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-tech">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/prototype"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/10">
              View the Prototype
            </Link>
            <Link href="/login"
              className="rounded-lg bg-tech px-6 py-3 text-sm font-bold transition-colors hover:bg-tech-600">
              Open the Monitoring Dashboard
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
