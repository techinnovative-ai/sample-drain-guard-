"use client";

import { useMemo, useState } from "react";
import { ALERTS, type AlertItem } from "@/lib/data";
import { DemoTag, DrainLink, PageHeader, StatusBadge } from "@/components/ui";

const FILTERS = ["all", "active", "acknowledged", "resolved"] as const;

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>(ALERTS);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [openId, setOpenId] = useState<string | null>(ALERTS[0]?.id ?? null);

  const rows = useMemo(
    () => alerts.filter((a) => filter === "all" || a.status === filter),
    [alerts, filter]
  );

  function setStatus(id: string, status: AlertItem["status"]) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  return (
    <div>
      <PageHeader title="Alert Centre" subtitle="Warning severity, evidence, timestamps, acknowledgement and resolution.">
        <DemoTag text="Simulated alerts — actions local to this demo" />
      </PageHeader>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
              filter === f ? "bg-forest text-white" : "border border-neutral-grey bg-white text-forest hover:border-tech"
            }`}>
            {f} {f !== "all" && `(${alerts.filter((a) => a.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {rows.map((a) => {
          const open = openId === a.id;
          return (
            <div key={a.id} className="rounded-xl border border-neutral-grey bg-white shadow-sm">
              <button onClick={() => setOpenId(open ? null : a.id)}
                className="flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left">
                <StatusBadge severity={a.severity} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-forest">
                    <span className="font-mono text-tech">{a.drainId}</span> — {a.title}
                  </p>
                  <p className="truncate text-xs text-ink/70">{a.detail}</p>
                </div>
                <span className="text-xs text-offline">{a.time}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${
                  a.status === "active" ? "bg-crit-bg text-crit" : a.status === "acknowledged" ? "bg-attn-bg text-attn" : "bg-ok-bg text-ok"
                }`}>{a.status}</span>
                <span aria-hidden className="text-offline">{open ? "▴" : "▾"}</span>
              </button>
              {open && (
                <div className="border-t border-neutral-grey/70 px-4 py-4">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-offline">Observed evidence</p>
                      <ul className="mt-2 space-y-2">
                        {a.evidence.map((e) => (
                          <li key={e} className="flex gap-2 text-sm text-ink/80"><span className="text-tech">▪</span>{e}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-offline">Actions</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {a.status === "active" && (
                          <button onClick={() => setStatus(a.id, "acknowledged")}
                            className="rounded-lg bg-forest px-4 py-2 text-xs font-bold text-white hover:bg-forest-700">
                            Acknowledge
                          </button>
                        )}
                        {a.status !== "resolved" && (
                          <button onClick={() => setStatus(a.id, "resolved")}
                            className="rounded-lg border border-ok px-4 py-2 text-xs font-bold text-ok hover:bg-ok-bg">
                            Mark resolved
                          </button>
                        )}
                        <DrainLink id={a.drainId} />
                      </div>
                      <p className="mt-3 text-[11px] text-offline">
                        In production, acknowledgements record the user, timestamp and reason in
                        the audit log and stop repeat notifications. Demo actions are local only.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {rows.length === 0 && (
          <p className="rounded-xl border border-neutral-grey bg-white p-8 text-center text-sm text-offline">
            No alerts in this state.
          </p>
        )}
      </div>
    </div>
  );
}
