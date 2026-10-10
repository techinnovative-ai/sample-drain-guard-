"use client";

import { useMemo, useState } from "react";
import { DRAINS, statusGroup } from "@/lib/data";
import { Card, DemoTag, PageHeader, StatusBadge, DrainLink } from "@/components/ui";
import DrainMap from "@/components/DrainMap";

const GROUPS = [
  { id: "all", label: "All" },
  { id: "normal", label: "✓ Normal" },
  { id: "attention", label: "▲ Attention" },
  { id: "critical", label: "⬤ Critical" },
  { id: "offline", label: "◌ Offline" },
] as const;

export default function MapPage() {
  const [site, setSite] = useState("all");
  const [group, setGroup] = useState<string>("all");
  const sites = Array.from(new Set(DRAINS.map((d) => d.site)));

  const filtered = useMemo(
    () => DRAINS.filter((d) =>
      (site === "all" || d.site === site) &&
      (group === "all" || statusGroup(d.severity) === group)
    ),
    [site, group]
  );

  return (
    <div>
      <PageHeader title="Live Drain Map" subtitle="Registered drain locations with status markers and last-reported readings.">
        <DemoTag text="Simulated positions & readings" />
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select value={site} onChange={(e) => setSite(e.target.value)}
          className="rounded-lg border border-neutral-grey bg-white px-3 py-2 text-sm outline-none focus:border-tech">
          <option value="all">All sites</option>
          {sites.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex flex-wrap gap-1.5">
          {GROUPS.map((g) => (
            <button key={g.id} onClick={() => setGroup(g.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                group === g.id ? "bg-forest text-white" : "border border-neutral-grey bg-white text-forest hover:border-tech"
              }`}>
              {g.label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-offline">{filtered.length} of {DRAINS.length} demo units shown</span>
      </div>

      <Card>
        <DrainMap drains={filtered} height={480} zoom={14} />
      </Card>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <div key={d.id} className="rounded-xl border border-neutral-grey bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <DrainLink id={d.id} />
                <p className="text-sm font-semibold text-forest">{d.name}</p>
                <p className="text-xs text-offline">{d.site} · {d.zone}</p>
              </div>
              <StatusBadge severity={d.severity} />
            </div>
            <p className="mt-2 text-xs text-ink/70">
              {d.severity === "offline"
                ? <>Condition unknown · last contact <strong>{d.lastContact}</strong></>
                : <>Water {d.waterLevelCm} cm · Basket est. {d.basketFillPct}% · {d.lastContact}</>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
