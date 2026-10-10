import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "How It Works" };

const FLOW = [
  { n: 1, title: "DrainGuard hardware", text: "Grate · Debris basket · Water-level sensor · Optional flow, rainfall and fill sensors. The mechanical assembly protects the drain and keeps an emergency water path open at all times." },
  { n: 2, title: "ESP32 controller", text: "Reads sensors on a fixed cycle, checks for sensor faults and out-of-range values, and performs local safety-related logic. It buffers data during network outages where possible." },
  { n: 3, title: "Communication layer", text: "Wi-Fi with HTTPS for the initial prototype; MQTT or cellular connectivity when deployments grow. Every message is authenticated per device." },
  { n: 4, title: "Backend and database", text: "Validates readings and timestamps, stores full history without overwriting, and evaluates configurable alert rules." },
  { n: 5, title: "AI and analytics engine", text: "Detects patterns across sensors, rainfall and history; estimates risk; and produces explainable recommendations with confidence levels." },
  { n: 6, title: "DrainGuard web application", text: "Live dashboard · Alerts · Map · Maintenance · Reports. Operators see priorities; maintenance teams get work orders; history feeds future prediction." },
];

const PATTERNS = [
  ["Rising basket fill with increasing water level", "Possible inlet blockage", "Inspect the guard and debris basket"],
  ["Low estimated debris but persistently high water level", "Possible downstream restriction or back-pressure", "Inspect the drain channel and outlet"],
  ["Rapid water-level rise during heavy rainfall", "Drainage overload or developing blockage", "Issue a high-priority warning and assess the site"],
  ["Water level stays high after rainfall decreases", "Persistent restriction or slow drainage", "Arrange an inspection"],
  ["Missing sensor data or abnormal sensor values", "Sensor, wiring or power fault", "Mark status as uncertain and diagnose the device"],
  ["High level with unusually poor inlet response", "Possible full-surface obstruction", "Raise CRITICAL INLET OBSTRUCTION for urgent verification"],
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">How it works</p>
      <h1 className="mt-3 text-4xl font-extrabold text-forest">
        Mechanical protection, sensing and explainable intelligence
      </h1>
      <p className="mt-4 max-w-3xl text-ink/70">
        DrainGuard answers four questions for every protected drain: Is rainwater entering
        properly? Is debris building up or blocking the inlet? Is there a possible downstream
        blockage, backflow or overload? And who needs to inspect or clean the drain — and how
        urgently?
      </p>

      <h2 className="mt-14 text-2xl font-bold text-forest">Data flow: physical drain to website</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FLOW.map((f) => (
          <div key={f.n} className="rounded-xl border border-neutral-grey bg-white p-6 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tech font-mono text-sm font-bold text-white">{f.n}</div>
            <h3 className="mt-3 font-bold text-forest">{f.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{f.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border-l-4 border-crit bg-crit-bg p-6">
        <h3 className="font-bold text-crit">Safety-first design rule</h3>
        <p className="mt-2 text-sm text-ink/80">
          Local drainage safety and emergency water-flow capacity must <strong>not</strong> depend on
          cloud connectivity. The controller retains local fault-detection behaviour and continues
          buffering data during network outages where possible. The physical system is engineered
          to manage water safely even if the website is unreachable.
        </p>
      </div>

      <h2 className="mt-14 text-2xl font-bold text-forest">How the analysis reasons</h2>
      <p className="mt-3 max-w-3xl text-sm text-ink/70">
        The AI module never reports a bare “blockage detected”. Each assessment states the observed
        evidence, its confidence, and the recommended next action. These patterns are diagnostic
        clues, not proof — they become more reliable when multiple readings, recent trends, local
        rainfall and inspection records agree.
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-grey">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-forest text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Observed pattern</th>
              <th className="px-4 py-3 font-semibold">Possible interpretation</th>
              <th className="px-4 py-3 font-semibold">Suggested response</th>
            </tr>
          </thead>
          <tbody>
            {PATTERNS.map((row, i) => (
              <tr key={i} className={i % 2 ? "bg-mist/60" : "bg-white"}>
                {row.map((c, j) => (
                  <td key={j} className="px-4 py-3 align-top text-ink/80">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link href="/technology" className="rounded-lg bg-forest px-6 py-3 text-sm font-bold text-white hover:bg-forest-700">
          Explore the Technology Stack
        </Link>
        <Link href="/login" className="rounded-lg border border-forest px-6 py-3 text-sm font-bold text-forest hover:bg-mist">
          See it in the Dashboard
        </Link>
      </div>
    </div>
  );
}
