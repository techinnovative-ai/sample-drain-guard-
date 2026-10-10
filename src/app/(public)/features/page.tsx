import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Features" };

const LEVELS = [
  { level: "Normal", cond: "No defined abnormal pattern", behave: "Green status", chip: "bg-ok-bg text-ok" },
  { level: "Watch", cond: "Debris estimate or water level rising", behave: "Yellow warning and monitoring", chip: "bg-attn-bg text-attn" },
  { level: "Clean Soon", cond: "Basket approaching its configured cleaning threshold", behave: "Maintenance reminder", chip: "bg-attn-bg text-attn" },
  { level: "High", cond: "Severe accumulation or abnormal hydraulic behaviour", behave: "High-priority alert", chip: "bg-attn-bg text-attn" },
  { level: "Critical", cond: "Dangerous water-level trend or severe obstruction indicators", behave: "Immediate notification and urgent inspection", chip: "bg-crit-bg text-crit" },
  { level: "Offline", cond: "Device heartbeat missing", behave: "Mark condition unknown; show last contact time", chip: "bg-offline-bg text-offline" },
];

const GROUPS = [
  { title: "Monitoring", items: ["Fleet dashboard with normal / attention / critical / offline counts", "Live water level, rainfall and debris-basket estimates", "Interactive map with status markers and last-reported readings", "Recent events feed: alerts, acknowledgements, inspections, cleaning"] },
  { title: "Obstruction detection", items: ["Inlet-response analysis against expected drain-down rates", "Downstream-restriction detection via cross-drain comparison", "Rainfall-aware thresholds so storms don't cause false alarms", "Estimates clearly labelled as estimates unless directly measured"] },
  { title: "Alerts and response", items: ["Six configurable alert levels from Normal to Offline", "Evidence attached to every alert — never a bare warning", "Acknowledgement and resolution workflow with audit trail", "Maintenance work orders assigned directly from alerts"] },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">Features</p>
      <h1 className="mt-3 text-4xl font-extrabold text-forest">
        Monitoring, obstruction detection and alerts
      </h1>
      <p className="mt-4 max-w-3xl text-ink/70">
        Every feature follows one design rule: the system must clearly distinguish normal,
        attention, critical and offline — and an offline drain must never automatically appear safe.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {GROUPS.map((g) => (
          <div key={g.title} className="rounded-xl border border-neutral-grey bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-forest">{g.title}</h2>
            <ul className="mt-4 space-y-3">
              {g.items.map((it) => (
                <li key={it} className="flex gap-2 text-sm text-ink/70">
                  <span className="mt-0.5 text-tech">✓</span>{it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold text-forest">Alert levels</h2>
      <p className="mt-3 max-w-3xl text-sm text-ink/70">
        Starting thresholds for a prototype, calibrated later with field observations. Numerical
        thresholds stay configurable — a percentage alone never declares a drain safe or blocked,
        and extreme-flow conditions always prioritise physical emergency drainage capacity.
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-grey">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-forest text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Level</th>
              <th className="px-4 py-3 font-semibold">Example condition</th>
              <th className="px-4 py-3 font-semibold">Platform behaviour</th>
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((l, i) => (
              <tr key={l.level} className={i % 2 ? "bg-mist/60" : "bg-white"}>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${l.chip}`}>{l.level}</span>
                </td>
                <td className="px-4 py-3 text-ink/80">{l.cond}</td>
                <td className="px-4 py-3 text-ink/70">{l.behave}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-14 rounded-xl bg-forest p-8 text-center text-white">
        <h2 className="text-2xl font-bold">See these features with demonstration data</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
          The monitoring application runs in demo mode with clearly-labelled simulated readings
          until real hardware is connected.
        </p>
        <Link href="/login" className="mt-6 inline-block rounded-lg bg-tech px-6 py-3 text-sm font-bold hover:bg-tech-600">
          Open the Dashboard
        </Link>
      </div>
    </div>
  );
}
