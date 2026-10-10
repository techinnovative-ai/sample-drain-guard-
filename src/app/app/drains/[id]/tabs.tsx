"use client";

import { useState } from "react";
import type { AlertItem, Assessment, Drain, Job, Point } from "@/lib/data";
import { Card, StatusBadge } from "@/components/ui";
import { BatteryChart, LevelRainChart } from "@/components/charts";

type Log = { date: string; drainId: string; worker: string; action: string; notes: string };

const TABS = ["Live Monitoring", "AI Assessment", "History", "Hardware"] as const;

export default function DrainTabs({ drain, series, assessment, alerts, jobs, logs }: {
  drain: Drain; series: Point[]; assessment: Assessment | null;
  alerts: AlertItem[]; jobs: Job[]; logs: Log[];
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Live Monitoring");
  const offline = drain.severity === "offline";

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t ? "bg-forest text-white" : "border border-neutral-grey bg-white text-forest hover:border-tech"
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Live Monitoring" && (
        <div className="grid gap-5 lg:grid-cols-3">
          <Card title={offline ? "Last buffered readings before contact was lost (simulated)" : "Water level & rainfall — last 24 h (simulated)"} className="lg:col-span-2">
            <LevelRainChart data={series} height={280} />
            <p className="mt-2 text-xs text-offline">
              Last update: {drain.lastContact}. {offline && "No current data — chart shows the final buffered window only."}
            </p>
          </Card>
          <div className="space-y-4">
            {[
              ["Water level", drain.waterLevelCm === null ? "unknown" : `${drain.waterLevelCm} cm`, "Measured — ultrasonic sensor"],
              ["Basket fill", drain.basketFillPct === null ? "unknown" : `${drain.basketFillPct}%`, "Estimate — derived from inlet response"],
              ["Rainfall", drain.rainfallMmHr === null ? "unknown" : `${drain.rainfallMmHr} mm/h`, "Measured — local gauge / nearest station"],
              ["Solar input", drain.solarW === null ? "unknown" : `${drain.solarW} W`, "Measured — charge controller"],
            ].map(([l, v, src]) => (
              <div key={l} className="rounded-xl border border-neutral-grey bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">{l}</p>
                <p className="text-2xl font-bold text-forest">{v}</p>
                <p className="text-[11px] text-offline">{src}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "AI Assessment" && (
        <div className="grid gap-5 lg:grid-cols-2">
          {assessment ? (
            <Card title="Current assessment">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-forest">{assessment.issue}</h3>
                <StatusBadge severity={assessment.severity} />
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-offline">Confidence</p>
                <div className="mt-1 h-2 w-full rounded-full bg-mist">
                  <div className="h-2 rounded-full bg-tech" style={{ width: `${assessment.confidence * 100}%` }} />
                </div>
                <p className="mt-1 text-sm font-bold text-forest">{Math.round(assessment.confidence * 100)}%</p>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-offline">Observed evidence</p>
              <ul className="mt-2 space-y-2">
                {assessment.evidence.map((e) => (
                  <li key={e} className="flex gap-2 text-sm text-ink/80"><span className="text-tech">▪</span>{e}</li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg bg-mist p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-offline">Recommended action</p>
                <p className="mt-1 text-sm font-semibold text-forest">{assessment.action}</p>
              </div>
            </Card>
          ) : (
            <Card title="Current assessment">
              <p className="text-sm text-ink/70">
                No abnormal pattern detected for this drain. The analysis engine continues to watch
                water-level trends, debris estimates, rainfall correlation and sensor health.
              </p>
            </Card>
          )}
          <Card title="How to read this assessment">
            <ul className="space-y-3 text-sm text-ink/70">
              <li><strong className="text-forest">Patterns are clues, not proof.</strong> An interpretation becomes reliable when multiple readings, trends, rainfall and inspection records agree.</li>
              <li><strong className="text-forest">Insufficient data is a valid output.</strong> When sensors disagree or data is missing, status is marked uncertain rather than guessed.</li>
              <li><strong className="text-forest">Estimates stay labelled.</strong> Basket fill is inferred from hydraulic behaviour unless a direct load or level sensor measures it.</li>
              <li><strong className="text-forest">Field verification closes the loop.</strong> Inspection outcomes are logged and used to evaluate assessment accuracy over time.</li>
            </ul>
          </Card>
        </div>
      )}

      {tab === "History" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Past alerts">
            {alerts.length ? (
              <ul className="space-y-3">
                {alerts.map((a) => (
                  <li key={a.id} className="rounded-lg border border-neutral-grey p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-forest">{a.title}</p>
                      <StatusBadge severity={a.severity} />
                    </div>
                    <p className="mt-1 text-xs text-ink/70">{a.detail}</p>
                    <p className="mt-1 text-[11px] text-offline">{a.time} · {a.status}</p>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-offline">No recorded alerts for this drain in the demo window.</p>}
          </Card>
          <Card title="Maintenance & work orders">
            {jobs.length > 0 && (
              <ul className="mb-4 space-y-2">
                {jobs.map((j) => (
                  <li key={j.id} className="flex items-center justify-between rounded-lg bg-mist/70 p-3 text-sm">
                    <span><strong className="font-mono text-xs text-tech">{j.id}</strong> — {j.title}</span>
                    <span className="text-xs text-offline">{j.status}</span>
                  </li>
                ))}
              </ul>
            )}
            {logs.length ? (
              <ul className="space-y-3">
                {logs.map((l, i) => (
                  <li key={i} className="border-l-2 border-tech pl-3">
                    <p className="text-xs text-offline">{l.date} · {l.worker} · {l.action}</p>
                    <p className="text-sm text-ink/80">{l.notes}</p>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-offline">No logged maintenance in the demo window.</p>}
          </Card>
        </div>
      )}

      {tab === "Hardware" && (
        <div className="grid gap-5 lg:grid-cols-3">
          <Card title="Device identity" className="lg:col-span-1">
            <dl className="space-y-3 text-sm">
              {[
                ["Controller", drain.controller],
                ["Firmware", drain.firmware],
                ["Installed", drain.installed],
                ["Coordinates", `${drain.lat.toFixed(4)}, ${drain.lng.toFixed(4)}`],
                ["Last contact", drain.lastContact],
                ["Responsible team", drain.team],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-neutral-grey/60 pb-2">
                  <dt className="text-offline">{k}</dt>
                  <dd className="text-right font-semibold text-forest">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-offline">Connected sensors</p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
              <li>▪ Ultrasonic water-level sensor (primary)</li>
              <li>▪ Rainfall — tipping bucket (optional, fitted)</li>
              <li>▪ Battery voltage + solar charge current</li>
              <li className="text-offline">▫ Flow sensor — not fitted on this unit</li>
            </ul>
          </Card>
          <Card title="Battery condition — last 24 h (simulated)" className="lg:col-span-2">
            <BatteryChart data={series} height={220} />
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                ["Battery", drain.batteryPct === null ? "unknown" : `${drain.batteryPct}%`],
                ["Solar input", drain.solarW === null ? "unknown" : `${drain.solarW} W`],
                ["Heartbeat", offline ? "MISSING" : "Every 5 min"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-mist/70 p-3 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">{l}</p>
                  <p className={`text-lg font-bold ${v === "MISSING" ? "text-crit" : "text-forest"}`}>{v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
