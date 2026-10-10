"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DRAINS, statusGroup } from "@/lib/data";
import { DemoTag, PageHeader, StatusBadge } from "@/components/ui";

export default function DrainsPage() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("all");

  const rows = useMemo(
    () => DRAINS.filter((d) => {
      const hay = `${d.id} ${d.name} ${d.site} ${d.zone} ${d.team}`.toLowerCase();
      return hay.includes(q.toLowerCase()) && (group === "all" || statusGroup(d.severity) === group);
    }),
    [q, group]
  );

  return (
    <div>
      <PageHeader title="Drain Registry" subtitle="Searchable inventory of every registered DrainGuard unit.">
        <DemoTag text="12 demo units of 128 registered" />
      </PageHeader>

      <div className="mb-4 flex flex-wrap gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by ID, name, site, zone or team…"
          className="w-full max-w-sm rounded-lg border border-neutral-grey bg-white px-3 py-2 text-sm outline-none focus:border-tech" />
        <select value={group} onChange={(e) => setGroup(e.target.value)}
          className="rounded-lg border border-neutral-grey bg-white px-3 py-2 text-sm outline-none focus:border-tech">
          <option value="all">All statuses</option>
          <option value="normal">Normal</option>
          <option value="attention">Needs attention</option>
          <option value="critical">Critical</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-grey bg-white shadow-sm">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-mist text-xs uppercase tracking-wide text-offline">
            <tr>
              <th className="px-4 py-3">Drain</th>
              <th className="px-4 py-3">Site / Zone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Water level</th>
              <th className="px-4 py-3">Basket (est.)</th>
              <th className="px-4 py-3">Last contact</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((d, i) => (
              <tr key={d.id} className={i % 2 ? "bg-mist/40" : ""}>
                <td className="px-4 py-3">
                  <p className="font-mono text-sm font-bold text-forest">{d.id}</p>
                  <p className="text-xs text-offline">{d.name}</p>
                </td>
                <td className="px-4 py-3 text-ink/80">{d.site}<br /><span className="text-xs text-offline">{d.zone}</span></td>
                <td className="px-4 py-3"><StatusBadge severity={d.severity} /></td>
                <td className="px-4 py-3 font-semibold text-forest">{d.waterLevelCm === null ? <span className="text-offline">unknown</span> : `${d.waterLevelCm} cm`}</td>
                <td className="px-4 py-3 font-semibold text-forest">{d.basketFillPct === null ? <span className="text-offline">unknown</span> : `${d.basketFillPct}%`}</td>
                <td className="px-4 py-3 text-ink/70">{d.lastContact}</td>
                <td className="px-4 py-3 text-ink/70">{d.team}</td>
                <td className="px-4 py-3">
                  <Link href={`/app/drains/${d.id}`} className="text-xs font-bold text-tech hover:underline">Open →</Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-offline">No drains match this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-offline">
        Basket-fill values are model-derived estimates, not direct load-sensor measurements, and are labelled as such throughout the platform.
      </p>
    </div>
  );
}
