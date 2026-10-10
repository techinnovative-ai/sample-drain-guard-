import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Prototype" };

const PARTS = [
  ["Stainless steel grate", "Primary debris barrier. Slot geometry sized to pass water freely while rejecting large debris. Removable without tools for inspection."],
  ["Perforated debris basket", "Captures leaves, plastic and silt below the grate. Lift-out handle for fast cleaning; perforation keeps water flowing even when partially full."],
  ["Emergency overflow channel", "A dedicated physical water path that stays open if the grate surface mats over. Flood safety never depends on electronics or connectivity."],
  ["Ultrasonic water-level sensor", "Mounted above the sump, measuring standing-water depth continuously. The core measurement for every hydraulic inference."],
  ["ESP32 controller + enclosure", "Weatherproof IP-rated enclosure housing the microcontroller, which samples sensors, runs local fault checks and transmits authenticated telemetry."],
  ["Solar panel + battery pack", "Keeps the unit autonomous. Charging current and battery voltage are reported as telemetry, so power faults raise alerts before contact is lost."],
];

const STAGES = [
  ["Stage 1", "Frontend prototype", "Homepage, navigation, sign-in, sample dashboard, drain detail page and alerts interface with clearly-labelled demonstration data.", "current"],
  ["Stage 2", "Database and authentication", "Database tables, sign-in, permissions, drain registry and historical readings.", ""],
  ["Stage 3", "Connect real hardware", "One ESP32 and one sensor set. Validated telemetry displayed with timestamps.", ""],
  ["Stage 4", "Alert engine", "Configurable thresholds, missing-data alerts, acknowledgement and notification delivery.", ""],
  ["Stage 5", "AI insights", "Sensor-fusion rules, anomaly detection, explanations and recommendations — evaluated against observed events.", ""],
  ["Stage 6", "Field testing and expansion", "Rain events, sensor faults, outages, false alerts and cleaning workflows. Then multiple drains, maps, analytics and teams.", ""],
];

export default function PrototypePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">Prototype</p>
      <h1 className="mt-3 text-4xl font-extrabold text-forest">Engineering design and parts</h1>
      <p className="mt-4 max-w-3xl text-ink/70">
        The DrainGuard assembly combines a mechanical protection layer with solar-powered sensing.
        Every electronic part can fail without compromising the drain&apos;s physical ability to move
        water.
      </p>

      <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-grey shadow-sm">
        <Image src="/images/prototype-exploded.jpg" alt="Exploded-view concept render of the DrainGuard assembly: solar panel, grate, debris basket, frame with emergency overflow channel, ultrasonic sensor, electronics enclosure with ESP32, battery pack" width={1406} height={765} className="w-full" />
        <p className="bg-mist px-4 py-2 text-center text-xs text-offline">
          Concept visualization (AI-generated render) — the physical prototype replaces this with CAD drawings and photographs.
        </p>
      </div>

      <h2 className="mt-14 text-2xl font-bold text-forest">Parts of the assembly</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PARTS.map(([t, d]) => (
          <div key={t} className="rounded-xl border border-neutral-grey bg-white p-6 shadow-sm">
            <h3 className="font-bold text-forest">{t}</h3>
            <p className="mt-2 text-sm text-ink/70">{d}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold text-forest">Development roadmap</h2>
      <div className="mt-6 space-y-3">
        {STAGES.map(([n, t, d, cur]) => (
          <div key={n} className={`flex flex-wrap items-start gap-4 rounded-xl border p-5 ${cur ? "border-tech bg-tech/5" : "border-neutral-grey bg-white"}`}>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${cur ? "bg-tech text-white" : "bg-mist text-forest"}`}>{n}</span>
            <div className="min-w-[220px] flex-1">
              <h3 className="font-bold text-forest">
                {t} {cur && <span className="ml-2 rounded bg-attn-bg px-1.5 py-0.5 text-[10px] font-bold uppercase text-attn">You are here</span>}
              </h3>
              <p className="mt-1 text-sm text-ink/70">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
