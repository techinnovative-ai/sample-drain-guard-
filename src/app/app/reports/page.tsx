"use client";

import { useState } from "react";
import { DRAINS, JOBS } from "@/lib/data";
import { Card, DemoTag, PageHeader } from "@/components/ui";

const REPORTS = [
  { name: "Weekly condition summary", desc: "Status distribution, active alerts and notable trends for all registered drains.", formats: ["PDF", "CSV"] },
  { name: "Maintenance summary", desc: "Work orders raised, completed and overdue, with debris quantities and repair notes.", formats: ["PDF", "CSV"] },
  { name: "Rainfall & response report", desc: "Rain events against drain performance and alert response times.", formats: ["PDF"] },
  { name: "Device health report", desc: "Battery, solar charging, communication uptime and sensor-fault history.", formats: ["CSV"] },
  { name: "Sensor readings export", desc: "Raw time-series export for a chosen drain and date range — timestamps and units preserved.", formats: ["CSV"] },
];

function drainsCsv() {
  const head = "drain_id,name,site,zone,status,water_level_cm,basket_fill_pct_estimate,battery_pct,last_contact";
  const rows = DRAINS.map((d) =>
    [d.id, d.name, d.site, d.zone, d.severity, d.waterLevelCm ?? "unknown", d.basketFillPct ?? "unknown", d.batteryPct ?? "unknown", d.lastContact]
      .map((v) => `"${v}"`).join(",")
  );
  return [`# DrainGuard DEMONSTRATION export — simulated values, not live sensor readings`, head, ...rows].join("\n");
}

function jobsCsv() {
  const head = "order_id,drain_id,task,assignee,priority,due,status";
  const rows = JOBS.map((j) => [j.id, j.drainId, j.title, j.assignee, j.priority, j.due, j.status].map((v) => `"${v}"`).join(","));
  return [`# DrainGuard DEMONSTRATION export — simulated values`, head, ...rows].join("\n");
}

export default function ReportsPage() {
  const [note, setNote] = useState<string | null>(null);

  function download(name: string, content: string) {
    const url = URL.createObjectURL(new Blob([content], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
    setNote(`Downloaded ${name} — clearly marked as demonstration data.`);
  }

  return (
    <div>
      <PageHeader title="Reports" subtitle="Downloadable CSV/PDF reports and maintenance summaries.">
        <DemoTag text="Exports contain simulated data" />
      </PageHeader>

      {note && <div className="mb-4 rounded-lg border border-ok/30 bg-ok-bg px-4 py-2.5 text-sm text-ok">{note}</div>}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Quick exports (working demo)">
          <p className="text-sm text-ink/70">Two real CSV downloads generated from the demo dataset in your browser:</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => download("drainguard-demo-drains.csv", drainsCsv())}
              className="rounded-lg bg-forest px-4 py-2.5 text-sm font-bold text-white hover:bg-forest-700">
              ⬇ Drain status CSV
            </button>
            <button onClick={() => download("drainguard-demo-workorders.csv", jobsCsv())}
              className="rounded-lg border border-forest px-4 py-2.5 text-sm font-bold text-forest hover:bg-mist">
              ⬇ Work orders CSV
            </button>
          </div>
          <p className="mt-3 text-xs text-offline">
            Every export carries a header line stating it is demonstration data. Production exports
            are generated server-side via <code className="font-mono">GET /api/v1/reports</code> with
            permission checks.
          </p>
        </Card>

        <Card title="Report catalogue (production design)">
          <ul className="space-y-3">
            {REPORTS.map((r) => (
              <li key={r.name} className="flex items-start justify-between gap-3 rounded-lg border border-neutral-grey p-3">
                <div>
                  <p className="text-sm font-semibold text-forest">{r.name}</p>
                  <p className="text-xs text-ink/70">{r.desc}</p>
                </div>
                <div className="flex gap-1">
                  {r.formats.map((f) => (
                    <span key={f} className="rounded bg-mist px-2 py-0.5 font-mono text-[11px] font-bold text-forest">{f}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
