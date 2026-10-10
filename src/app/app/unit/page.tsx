"use client";

// ---------------------------------------------------------------------------
// DrainGuard Live Unit — control & monitoring centre for the physical prototype
// ---------------------------------------------------------------------------
// Default state is the TRUTH: no hardware connected => every reading is "—",
// every health check is "Not connected / Unknown". A missing reading is never
// displayed as Normal. The telemetry simulator is clearly labelled and exists
// only to preview the designed live experience (including the basket-overload
// alert workflow) before the ESP32 comes online.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import { Card, PageHeader } from "@/components/ui";
import { WeightChart } from "@/components/charts";
import DrainMap from "@/components/DrainMap";
import { DRAINS, type Drain } from "@/lib/data";

type Mode = "disconnected" | "sim";
type Scenario = "normal" | "overload";
type Health = "healthy" | "attention" | "critical" | "unknown";
type Zone = "normal" | "warning" | "overload" | "critical";

const UNIT_ID = "DG-UNIT-000";
const CONFIG_KEY = "dg-unit-config";

interface UnitConfig {
  lat: number | null;
  lng: number | null;
  loadLimitKg: number;
}

interface Telemetry {
  weightKg: number;
  waterCm: number;
  batteryPct: number;
  batteryV: number;
  chargeA: number;
  solarW: number;
  tempC: number;
  humidityPct: number;
  rainMmHr: number;
  lastUpdate: string;
}

interface OverloadAlert {
  at: string;
  weightAtTrigger: number;
  notified: boolean;
  acked: boolean;
  workOrder: boolean;
}

function zoneFor(kg: number, limit: number): Zone {
  const p = (kg / limit) * 100;
  if (p < 70) return "normal";
  if (p < 90) return "warning";
  if (p < 100) return "overload";
  return "critical";
}

const ZONE_META: Record<Zone, { label: string; chip: string; bar: string }> = {
  normal: { label: "Normal — continue monitoring", chip: "bg-ok-bg text-ok", bar: "bg-ok" },
  warning: { label: "Warning — notify operator, schedule inspection", chip: "bg-attn-bg text-attn", bar: "bg-attn" },
  overload: { label: "Overload warning — urgent cleaning per operating policy", chip: "bg-attn-bg text-attn", bar: "bg-attn" },
  critical: { label: "CRITICAL — at/above permitted limit", chip: "bg-crit-bg text-crit", bar: "bg-crit" },
};

const HEALTH_META: Record<Health, { label: string; chip: string; icon: string }> = {
  healthy: { label: "Healthy", chip: "bg-ok-bg text-ok", icon: "✓" },
  attention: { label: "Needs attention", chip: "bg-attn-bg text-attn", icon: "▲" },
  critical: { label: "Critical", chip: "bg-crit-bg text-crit", icon: "⬤" },
  unknown: { label: "Unknown / Not connected", chip: "bg-offline-bg text-offline", icon: "◌" },
};

const COMPONENTS: { key: string; name: string; checks: string }[] = [
  { key: "loadcell", name: "Basket load cell (HX711)", checks: "Valid readings, stability and overload" },
  { key: "water", name: "Water-level sensor", checks: "Plausible reading, sensor faults and rising-water trend" },
  { key: "rain", name: "Rainfall sensor", checks: "Measurement availability and detected rainfall" },
  { key: "esp32", name: "ESP32 controller & wiring", checks: "Last heartbeat, restarts and recorded faults" },
  { key: "battery", name: "Battery", checks: "Charge estimate, voltage and low-power state" },
  { key: "solar", name: "Solar charging", checks: "Charging input and charging-system status" },
  { key: "network", name: "Internet / communication", checks: "Connectivity and last successful upload" },
  { key: "notify", name: "Alert & data services", checks: "Alert creation and delivery result" },
];

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour12: false });
}

export default function LiveUnitPage() {
  const [mode, setMode] = useState<Mode>("disconnected");
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [config, setConfig] = useState<UnitConfig>({ lat: null, lng: null, loadLimitKg: 10 });
  const [configLoaded, setConfigLoaded] = useState(false);
  const [latIn, setLatIn] = useState("");
  const [lngIn, setLngIn] = useState("");
  const [showNearby, setShowNearby] = useState(true);
  const [tele, setTele] = useState<Telemetry | null>(null);
  const [history, setHistory] = useState<{ t: string; kg: number }[]>([]);
  const [alert, setAlert] = useState<OverloadAlert | null>(null);
  const [finalWeight, setFinalWeight] = useState("");
  const [closeLog, setCloseLog] = useState<string[]>([]);
  const weightRef = useRef(3.2);

  // ---- config persistence --------------------------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONFIG_KEY);
      if (raw) {
        const c = JSON.parse(raw) as UnitConfig;
        setConfig(c);
        if (c.lat !== null) setLatIn(String(c.lat));
        if (c.lng !== null) setLngIn(String(c.lng));
      }
    } catch { /* ignore */ }
    setConfigLoaded(true);
  }, []);

  const saveConfig = useCallback((c: UnitConfig) => {
    setConfig(c);
    try { localStorage.setItem(CONFIG_KEY, JSON.stringify(c)); } catch { /* ignore */ }
  }, []);

  // ---- simulation tick -----------------------------------------------------
  useEffect(() => {
    if (mode !== "sim") { setTele(null); setHistory([]); setAlert(null); setScenario("normal"); return; }
    weightRef.current = weightRef.current || 3.2;
    const tick = () => {
      const limit = config.loadLimitKg;
      let w = weightRef.current;
      if (scenario === "overload") {
        w = Math.min(limit * 1.06, w + 0.55 + Math.random() * 0.25);
      } else {
        w = Math.max(0.3, Math.min(limit * 0.55, w + (Math.random() - 0.45) * 0.15));
      }
      weightRef.current = w;
      const t = now();
      setTele({
        weightKg: Math.round(w * 100) / 100,
        waterCm: Math.round(14 + Math.random() * 4),
        batteryPct: Math.round(84 + Math.random()),
        batteryV: Math.round((12.5 + Math.random() * 0.2) * 100) / 100,
        chargeA: Math.round((0.38 + Math.random() * 0.1) * 100) / 100,
        solarW: Math.round((3.0 + Math.random() * 0.4) * 10) / 10,
        tempC: Math.round((29 + Math.random()) * 10) / 10,
        humidityPct: Math.round(76 + Math.random() * 4),
        rainMmHr: Math.round((3.2 + Math.random() * 0.6) * 10) / 10,
        lastUpdate: t,
      });
      setHistory((h) => [...h.slice(-59), { t, kg: Math.round(w * 100) / 100 }]);
      setAlert((a) => {
        if (w >= limit && !a) {
          return { at: t, weightAtTrigger: Math.round(w * 100) / 100, notified: false, acked: false, workOrder: false };
        }
        if (a && !a.notified) return { ...a, notified: true };
        return a;
      });
    };
    tick();
    const iv = setInterval(tick, 2000);
    return () => clearInterval(iv);
  }, [mode, scenario, config.loadLimitKg]);

  // ---- derived state ---------------------------------------------------------
  const limit = config.loadLimitKg;
  const zone: Zone | null = tele ? zoneFor(tele.weightKg, limit) : null;
  const pct = tele ? Math.round((tele.weightKg / limit) * 100) : null;

  const health: Record<string, { state: Health; detail: string }> =
    mode === "disconnected"
      ? Object.fromEntries(COMPONENTS.map((c) => [c.key, { state: "unknown" as Health, detail: "Not connected — no diagnostic data received" }]))
      : {
          loadcell: zone === "critical"
            ? { state: "critical", detail: `Overload — ${tele!.weightKg} kg ≥ ${limit} kg limit` }
            : zone === "overload" || zone === "warning"
              ? { state: "attention", detail: `Load at ${pct}% of permitted limit` }
              : { state: "healthy", detail: `Stable readings · ${tele!.weightKg} kg (${pct}% of limit)` },
          water: { state: "healthy", detail: `Plausible reading · ${tele!.waterCm} cm, no fault flags` },
          rain: { state: "healthy", detail: `Reporting · rainfall ${tele!.rainMmHr} mm/h detected` },
          esp32: { state: "healthy", detail: "Heartbeat 2 s ago · 0 restarts in 24 h (simulated)" },
          battery: tele!.batteryPct < 25
            ? { state: "attention", detail: `Low charge ${tele!.batteryPct}%` }
            : { state: "healthy", detail: `${tele!.batteryPct}% · ${tele!.batteryV} V` },
          solar: { state: "healthy", detail: `Charging · ${tele!.solarW} W input` },
          network: { state: "healthy", detail: `Online · last upload ${tele!.lastUpdate}` },
          notify: alert
            ? alert.notified
              ? { state: "healthy", detail: "Critical alert delivered (demo email channel)" }
              : { state: "attention", detail: "Alert created — delivery in progress" }
            : { state: "unknown", detail: "No alert sent this session — delivery path unverified" },
        };

  const states = COMPONENTS.map((c) => health[c.key].state);
  const banner =
    mode === "disconnected"
      ? { label: "System status unknown — awaiting first device contact", sub: "No hardware is connected. Missing readings are shown as Unknown, never as Normal.", cls: "border-offline bg-offline-bg", text: "text-offline", icon: "◌" }
      : states.includes("critical")
        ? { label: "CRITICAL fault present — basket overload", sub: "Immediate intervention required. See the active alert below.", cls: "border-crit bg-crit-bg", text: "text-crit", icon: "⬤" }
        : states.includes("attention")
          ? { label: "Needs attention", sub: "One or more component checks require follow-up.", cls: "border-attn bg-attn-bg", text: "text-attn", icon: "▲" }
          : states.slice(0, 7).every((s) => s === "healthy")
            ? { label: "All systems normal", sub: `All required checks passed within the last update cycle (${tele?.lastUpdate}). Simulated telemetry.`, cls: "border-ok bg-ok-bg", text: "text-ok", icon: "✓" }
            : { label: "Partially verified", sub: "Required checks pass, but at least one check is unverified.", cls: "border-offline bg-offline-bg", text: "text-offline", icon: "◌" };

  const hasCoords = config.lat !== null && config.lng !== null;
  const unitDrain: Drain | null = hasCoords
    ? {
        id: UNIT_ID,
        name: "Prototype unit",
        site: "Installation site",
        zone: "—",
        lat: config.lat!,
        lng: config.lng!,
        severity: mode === "disconnected" ? "offline" : zone === "critical" ? "critical" : zone === "overload" ? "high" : zone === "warning" ? "watch" : "normal",
        waterLevelCm: tele?.waterCm ?? null,
        basketFillPct: pct,
        rainfallMmHr: tele?.rainMmHr ?? null,
        batteryPct: tele?.batteryPct ?? null,
        solarW: tele?.solarW ?? null,
        lastContact: mode === "sim" ? "live (simulated)" : "never",
        installed: "—",
        firmware: "—",
        controller: "ESP32 (to be registered)",
        team: "—",
        note: "",
      }
    : null;

  function closeAlert() {
    const fw = parseFloat(finalWeight);
    const fwTxt = Number.isFinite(fw) ? `${fw} kg` : "not recorded";
    setCloseLog((l) => [
      `${now()} — Cleaning work order closed for ${UNIT_ID}. Final measured basket weight: ${fwTxt}. Alert acknowledged and resolved.`,
      ...l,
    ]);
    weightRef.current = Number.isFinite(fw) ? Math.max(0.2, fw) : 0.5;
    setScenario("normal");
    setAlert(null);
    setFinalWeight("");
  }

  const dash = (v: string | number | null | undefined, unit = "") =>
    mode === "sim" && v !== null && v !== undefined ? `${v}${unit}` : "—";

  return (
    <div className="space-y-5">
      <PageHeader title="Live Unit — Control Centre" subtitle={`Physical prototype ${UNIT_ID} · AI Drainage Monitoring System`}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex overflow-hidden rounded-lg border border-neutral-grey">
            <button onClick={() => setMode("disconnected")}
              className={`px-3 py-2 text-xs font-bold ${mode === "disconnected" ? "bg-forest text-white" : "bg-white text-forest"}`}>
              Real state (no hardware)
            </button>
            <button onClick={() => setMode("sim")}
              className={`px-3 py-2 text-xs font-bold ${mode === "sim" ? "bg-attn text-white" : "bg-white text-forest"}`}>
              Simulate telemetry
            </button>
          </div>
          {mode === "sim" && scenario === "normal" && !alert && (
            <button onClick={() => setScenario("overload")}
              className="rounded-lg border border-crit px-3 py-2 text-xs font-bold text-crit hover:bg-crit-bg">
              ⚠ Run overload test
            </button>
          )}
        </div>
      </PageHeader>

      {mode === "sim" && (
        <div className="rounded-lg border border-attn/40 bg-attn-bg px-3 py-2 text-xs text-attn">
          <strong className="font-bold uppercase">Simulated telemetry</strong> — values below are
          generated in your browser to preview the live experience. They are not readings from the
          physical unit.
        </div>
      )}

      {/* OVERALL SYSTEM HEALTH */}
      <div className={`flex flex-wrap items-center gap-4 rounded-xl border-l-4 p-5 ${banner.cls}`}>
        <span aria-hidden className={`text-2xl ${banner.text}`}>{banner.icon}</span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-offline">Overall system health</p>
          <p className={`text-xl font-extrabold ${banner.text}`}>{banner.label}</p>
          <p className="text-xs text-ink/70">{banner.sub}</p>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="rounded-xl border border-neutral-grey bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-offline">Basket weight</p>
          <p className="mt-1 text-3xl font-extrabold text-forest">{dash(tele?.weightKg, " kg")}</p>
          <p className="text-xs text-offline">Live load-cell reading (HX711)</p>
          <p className="text-[11px] text-offline">{mode === "sim" ? `${pct}% of ${limit} kg configured limit` : `Load limit configured: ${limit} kg (example value)`}</p>
        </div>
        <div className="rounded-xl border border-neutral-grey bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-offline">Battery storage</p>
          <p className="mt-1 text-3xl font-extrabold text-forest">{dash(tele?.batteryPct, "%")}</p>
          <p className="text-xs text-offline">Battery state of charge</p>
          <p className="text-[11px] text-offline">{mode === "sim" ? `Solar input ${tele?.solarW} W · charging` : "Solar charging status unavailable"}</p>
        </div>
        <div className="rounded-xl border border-neutral-grey bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-offline">Weather</p>
          <p className="mt-1 text-3xl font-extrabold text-forest">{mode === "sim" ? `${tele?.tempC}°C` : "Awaiting data"}</p>
          <p className="text-xs text-offline">{mode === "sim" ? `Light rain · ${tele?.rainMmHr} mm/h · ${tele?.humidityPct}% RH` : "Rainfall, forecast and temperature"}</p>
          <p className="text-[11px] text-offline">{mode === "sim" ? "Source: simulated local sensor + simulated forecast" : "No rain sensor or weather API configured"}</p>
        </div>
        <div className="rounded-xl border border-neutral-grey bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-offline">Water level</p>
          <p className="mt-1 text-3xl font-extrabold text-forest">{dash(tele?.waterCm, " cm")}</p>
          <p className="text-xs text-offline">Live sensor measurement</p>
          <p className="text-[11px] text-offline">{mode === "sim" ? `Last update ${tele?.lastUpdate}` : "Ultrasonic sensor not connected"}</p>
        </div>
      </div>

      {/* CRITICAL OVERLOAD ALERT */}
      {alert && (
        <div className="rounded-xl border-2 border-crit bg-white shadow-md">
          <div className="flex flex-wrap items-center gap-3 rounded-t-lg bg-crit px-5 py-3 text-white">
            <span aria-hidden className="animate-pulse text-lg">⬤</span>
            <h2 className="text-sm font-extrabold uppercase tracking-wide">Critical basket overload alert</h2>
            <span className="ml-auto rounded bg-white/20 px-2 py-0.5 text-[11px] font-bold">Simulated test event</span>
          </div>
          <div className="grid gap-5 p-5 lg:grid-cols-2">
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Drain ID", UNIT_ID],
                  ["Time detected", alert.at],
                  ["Measured weight", `${tele?.weightKg ?? alert.weightAtTrigger} kg`],
                  ["Permitted limit", `${limit} kg (configured)`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-mist/70 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">{k}</p>
                    <p className="font-bold text-forest">{v}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-neutral-grey p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">Notification delivery</p>
                <p className={`mt-0.5 text-sm font-bold ${alert.notified ? "text-ok" : "text-attn"}`}>
                  {alert.notified ? "✓ Delivered — demo email channel" : "… Sending notification"}
                </p>
              </div>
              <p className="text-xs text-ink/70">
                Location: {hasCoords ? `${config.lat}, ${config.lng} — shown on the map below` : "installation coordinates not set — add them below to place this alert on the map"}.
                Software must not restrict emergency drainage during overload — the physical
                overflow path stays open regardless of this alert.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setAlert({ ...alert, acked: true })} disabled={alert.acked}
                  className={`rounded-lg px-4 py-2 text-xs font-bold ${alert.acked ? "bg-ok-bg text-ok" : "bg-forest text-white hover:bg-forest-700"}`}>
                  {alert.acked ? "✓ Acknowledged (authorised demo user)" : "Acknowledge alert"}
                </button>
                <button onClick={() => setAlert({ ...alert, workOrder: true })} disabled={alert.workOrder}
                  className={`rounded-lg border px-4 py-2 text-xs font-bold ${alert.workOrder ? "border-ok bg-ok-bg text-ok" : "border-forest text-forest hover:bg-mist"}`}>
                  {alert.workOrder ? "✓ Cleaning work order created" : "Create cleaning work order"}
                </button>
              </div>
              {alert.workOrder && (
                <div className="rounded-lg border border-neutral-grey p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-offline">
                    Close work order — record final measured weight after cleaning
                  </p>
                  <div className="mt-2 flex gap-2">
                    <input value={finalWeight} onChange={(e) => setFinalWeight(e.target.value)}
                      placeholder="e.g. 0.6" inputMode="decimal"
                      className="w-28 rounded-lg border border-neutral-grey px-3 py-2 text-sm outline-none focus:border-tech" />
                    <span className="self-center text-sm text-offline">kg</span>
                    <button onClick={closeAlert}
                      className="rounded-lg bg-tech px-4 py-2 text-xs font-bold text-white hover:bg-tech-600">
                      Record & close alert
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {closeLog.length > 0 && (
        <div className="rounded-lg border border-ok/30 bg-ok-bg p-3 text-xs text-ink/80">
          {closeLog.map((l) => <p key={l} className="py-0.5">✓ {l}</p>)}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Basket weight detail */}
        <Card title={`Basket load — limit ${limit} kg (example, to be verified by engineering test)`}>
          {mode === "sim" ? (
            <>
              <div className="mb-1 flex items-end justify-between">
                <p className="text-2xl font-extrabold text-forest">{tele?.weightKg} kg <span className="text-sm font-semibold text-offline">of {limit} kg</span></p>
                {zone && <span className={`rounded-full px-3 py-1 text-xs font-bold ${ZONE_META[zone].chip}`}>{ZONE_META[zone].label}</span>}
              </div>
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-mist" role="meter" aria-valuenow={pct ?? 0} aria-valuemin={0} aria-valuemax={120} aria-label="Basket load percentage of limit">
                <div className="absolute inset-y-0 left-[70%] w-px bg-attn" aria-hidden />
                <div className="absolute inset-y-0 left-[90%] w-px bg-crit" aria-hidden />
                <div className={`h-4 rounded-full transition-all ${zone ? ZONE_META[zone].bar : "bg-offline"}`}
                  style={{ width: `${Math.min(100, pct ?? 0)}%` }} />
              </div>
              <p className="mt-1 text-right text-xs font-bold text-forest">{pct}% of permitted limit</p>
              <WeightChart data={history} limit={limit} />
            </>
          ) : (
            <div className="rounded-lg bg-mist/70 p-6 text-center">
              <p className="text-3xl font-extrabold text-offline">— kg</p>
              <p className="mt-1 text-sm text-offline">No load-cell data. Connect the load cell + HX711 amplifier to the ESP32 and register the device.</p>
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            {[
              ["Normal", "< 70%", `< ${(limit * 0.7).toFixed(1)} kg`, "bg-ok-bg text-ok"],
              ["Warning", "70–89%", `${(limit * 0.7).toFixed(1)}–${(limit * 0.9 - 0.1).toFixed(1)} kg`, "bg-attn-bg text-attn"],
              ["Overload", "90–99%", `${(limit * 0.9).toFixed(1)}–${(limit - 0.1).toFixed(1)} kg`, "bg-attn-bg text-attn"],
              ["Critical", "≥ 100%", `≥ ${limit.toFixed(1)} kg`, "bg-crit-bg text-crit"],
            ].map(([l, p, kg, cls]) => (
              <div key={l} className={`rounded-lg p-2.5 text-center ${cls}`}>
                <p className="font-bold">{l}</p>
                <p>{p}</p>
                <p className="opacity-80">{kg}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-neutral-grey p-3">
            <label className="text-xs font-semibold text-forest">Configured load limit</label>
            <input type="number" min={1} max={100} step={0.5} value={limit}
              onChange={(e) => saveConfig({ ...config, loadLimitKg: Math.max(1, Number(e.target.value) || 10) })}
              className="w-24 rounded-lg border border-neutral-grey px-3 py-1.5 text-sm outline-none focus:border-tech" />
            <span className="text-xs text-offline">kg · per-basket setting, saved locally</span>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-offline">
            The 10 kg default and percentage bands are illustrative examples — not a verified rating
            for your basket. Set the real threshold after testing the basket, frame, load cell and
            mounting. Software must never restrict emergency drainage when the basket is overloaded.
          </p>
        </Card>

        <div className="space-y-5">
          {/* Battery & solar */}
          <Card title="Battery storage & solar power">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["State of charge", dash(tele?.batteryPct, "%")],
                ["Battery voltage", dash(tele?.batteryV, " V")],
                ["Charging current", dash(tele?.chargeA, " A")],
                ["Solar input", dash(tele?.solarW, " W")],
                ["Est. runtime (no sun)", mode === "sim" ? "≈ 4.5 days" : "—"],
                ["Charging status", mode === "sim" ? "Charging ✓" : "Unavailable"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-mist/70 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">{l}</p>
                  <p className="text-lg font-bold text-forest">{v}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-offline">
              Battery percentage requires a proper battery-monitoring method (coulomb counting or a
              fuel-gauge IC) — voltage alone may not give an accurate state of charge. Hardware:
              battery, solar charge controller, voltage/current monitoring and electrical protection.
            </p>
          </Card>

          {/* Weather */}
          <Card title="Weather monitoring">
            {mode === "sim" ? (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["Condition", "Light rain"],
                    ["Temperature", `${tele?.tempC}°C`],
                    ["Humidity", `${tele?.humidityPct}%`],
                    ["Rainfall (local)", `${tele?.rainMmHr} mm/h`],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-lg bg-mist/70 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">{l}</p>
                      <p className="text-lg font-bold text-forest">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[["Today", "80% rain · 24 mm"], ["Tomorrow", "60% rain · 12 mm"], ["Day 3", "20% rain · 2 mm"]].map(([d, f]) => (
                    <span key={d} className="rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-forest">{d}: {f}</span>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-offline">
                  Rainfall: local sensor at the drain (simulated) · Forecast: regional weather API
                  (simulated) for {hasCoords ? `${config.lat}, ${config.lng}` : "installation location (not yet set)"} ·
                  Last update {tele?.lastUpdate}. Local measurements and distant forecasts are always
                  labelled separately.
                </p>
              </>
            ) : (
              <div className="rounded-lg bg-mist/70 p-6 text-center">
                <p className="text-xl font-extrabold text-offline">Awaiting data</p>
                <p className="mt-1 text-sm text-offline">
                  Connect a local rain sensor for at-the-drain measurement and/or configure a
                  weather API for forecasts. The display will always show the weather&apos;s location,
                  source and last update time, so a distant forecast is never mistaken for a local reading.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* MAP */}
      <Card title="DrainGuard location"
        action={hasCoords ? (
          <label className="flex items-center gap-2 text-xs font-semibold text-forest">
            <input type="checkbox" checked={showNearby} onChange={(e) => setShowNearby(e.target.checked)} className="h-3.5 w-3.5 accent-tech" />
            Show nearby registered demo units
          </label>
        ) : undefined}>
        {!configLoaded ? null : hasCoords && unitDrain ? (
          <>
            <DrainMap drains={showNearby ? [unitDrain, ...DRAINS] : [unitDrain]} height={400} zoom={15} />
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-offline">
              <span><strong className="text-forest">{UNIT_ID}</strong> at {config.lat}, {config.lng} (manually set installation point)</span>
              <span>Status: {mode === "sim" ? (zone === "critical" ? "Critical" : zone === "normal" ? "Normal" : "Attention") : "Offline / never connected"}</span>
              <span>Last communication: {mode === "sim" ? tele?.lastUpdate : "never"}</span>
              <button onClick={() => { saveConfig({ ...config, lat: null, lng: null }); setLatIn(""); setLngIn(""); }}
                className="ml-auto font-semibold text-crit hover:underline">Clear location</button>
            </div>
          </>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-neutral-grey p-6">
            <p className="text-sm font-semibold text-forest">Installation coordinates not set</p>
            <p className="mt-1 max-w-2xl text-sm text-ink/70">
              Your model&apos;s real position cannot be placed on the map accurately yet. For a
              stationary school or demonstration prototype, enter the installation point manually —
              no GPS module is needed to show a fixed position. (GPS becomes useful only if the
              device must determine its own location.)
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <input value={latIn} onChange={(e) => setLatIn(e.target.value)} placeholder="Latitude e.g. 28.5460"
                className="w-44 rounded-lg border border-neutral-grey px-3 py-2 text-sm outline-none focus:border-tech" />
              <input value={lngIn} onChange={(e) => setLngIn(e.target.value)} placeholder="Longitude e.g. 77.1920"
                className="w-44 rounded-lg border border-neutral-grey px-3 py-2 text-sm outline-none focus:border-tech" />
              <button
                onClick={() => {
                  const la = parseFloat(latIn), ln = parseFloat(lngIn);
                  if (Number.isFinite(la) && Number.isFinite(ln) && la >= -90 && la <= 90 && ln >= -180 && ln <= 180) {
                    saveConfig({ ...config, lat: la, lng: ln });
                  }
                }}
                className="rounded-lg bg-forest px-4 py-2 text-xs font-bold text-white hover:bg-forest-700">
                Save installation point
              </button>
              <button onClick={() => { setLatIn("28.5460"); setLngIn("77.1920"); saveConfig({ ...config, lat: 28.546, lng: 77.192 }); }}
                className="rounded-lg border border-neutral-grey px-4 py-2 text-xs font-semibold text-forest hover:bg-mist">
                Use demo campus coordinates
              </button>
            </div>
            <p className="mt-2 text-[11px] text-offline">Saved locally in your browser; in production this is stored against the device record.</p>
          </div>
        )}
      </Card>

      {/* HEALTH CHECKLIST */}
      <Card title="System health checklist — per-component diagnostics">
        <p className="mb-4 text-xs text-offline">
          Each component has an individual health state backed by evidence — never a single green
          light without it. Summary states: Healthy · Needs attention · Critical · Unknown/Offline.
          “All systems normal” is reported only when the required checks have passed recently.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {COMPONENTS.map((c) => {
            const h = health[c.key];
            const m = HEALTH_META[h.state];
            return (
              <div key={c.key} className="flex items-start justify-between gap-3 rounded-lg border border-neutral-grey p-3.5">
                <div>
                  <p className="text-sm font-bold text-forest">{c.name}</p>
                  <p className="text-[11px] text-offline">Checks: {c.checks}</p>
                  <p className="mt-1 text-xs text-ink/75">{h.detail}</p>
                </div>
                <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${m.chip}`}>
                  <span aria-hidden>{m.icon}</span>{m.label}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* HOW TO CONNECT */}
      <Card title="How to connect the real hardware">
        <ol className="grid gap-3 text-sm text-ink/75 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["1. Wire the sensors", "Load cell → HX711 → ESP32; ultrasonic water-level sensor; optional rain gauge. Battery + solar charge controller with current/voltage monitoring."],
            ["2. Register the device", "Create the device record with a unique ID and per-device secret (Settings → Device registration). Set the installation coordinates above."],
            ["3. Send telemetry", "ESP32 posts authenticated readings to POST /api/v1/telemetry every cycle, with a heartbeat. The backend validates ranges and timestamps."],
            ["4. Watch this page", "Dashes become live values with timestamps; the health checklist turns evidence-based green; alerts and notifications go live."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-lg bg-mist/70 p-4">
              <p className="font-bold text-forest">{t}</p>
              <p className="mt-1 text-xs">{d}</p>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
