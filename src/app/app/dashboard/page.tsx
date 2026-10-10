import Link from "next/link";
import { ALERTS, DRAINS, EVENTS_FEED, FLEET, seriesFor } from "@/lib/data";
import { Card, DemoBanner, DrainLink, StatCard, StatusBadge } from "@/components/ui";
import { LevelRainChart } from "@/components/charts";
import DrainMap from "@/components/DrainMap";

export const metadata = { title: "Dashboard" };

const FEED_DOT: Record<string, string> = {
  critical: "bg-crit", attention: "bg-attn", offline: "bg-offline", ok: "bg-ok", info: "bg-tech",
};

export default function DashboardPage() {
  const priority = ALERTS.filter((a) => a.status === "active").slice(0, 4);
  const series = seriesFor("DG-DEL-001");

  return (
    <div className="space-y-5">
      <DemoBanner />

      <Link href="/app/unit"
        className="flex flex-wrap items-center gap-3 rounded-xl border border-neutral-grey bg-white px-4 py-3 shadow-sm transition-colors hover:border-tech">
        <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-offline-bg text-offline">◉</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-forest">Your physical prototype — DG-UNIT-000</p>
          <p className="text-xs text-offline">
            Not connected yet · basket weight, battery, weather and component health show as Unknown until the ESP32 reports.
          </p>
        </div>
        <span className="text-xs font-bold text-tech">Open control centre →</span>
      </Link>

      {/* Status cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Registered drains" value={String(FLEET.registered)} caption="All registered units" />
        <StatCard label="Normal" value={String(FLEET.normal)} caption="No active warning" tone="ok" />
        <StatCard label="Needs attention" value={String(FLEET.attention)} caption="Inspection may be needed" tone="attention" />
        <StatCard label="Critical" value={String(FLEET.critical)} caption="Urgent assessment" tone="critical" />
        <StatCard label="Offline" value={String(FLEET.offline)} caption="Condition unknown — not safe by default" tone="offline" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Priority alerts */}
        <Card title="Priority alerts" className="xl:col-span-1"
          action={<Link href="/app/alerts" className="text-xs font-semibold text-tech hover:underline">Alert Centre →</Link>}>
          <ul className="space-y-3">
            {priority.map((a) => (
              <li key={a.id} className="rounded-lg border border-neutral-grey p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <DrainLink id={a.drainId} />
                    <p className="text-sm font-semibold text-forest">{a.title}</p>
                  </div>
                  <StatusBadge severity={a.severity} />
                </div>
                <p className="mt-1 text-xs text-ink/70">{a.detail}</p>
                <p className="mt-1 text-[11px] text-offline">{a.time}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Live chart */}
        <Card title="Live condition — DG-DEL-001 (last 24 h, simulated)" className="xl:col-span-2"
          action={<DrainLink id="DG-DEL-001" />}>
          <LevelRainChart data={series} />
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[["Water level", "82 cm", "critical"], ["Basket fill (estimate)", "88%", "critical"], ["Rainfall", "14.2 mm/h", ""], ["Battery", "76%", ""]].map(([l, v, tone]) => (
              <div key={l} className="rounded-lg bg-mist/70 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">{l}</p>
                <p className={`text-lg font-bold ${tone === "critical" ? "text-crit" : "text-forest"}`}>{v}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Map */}
        <Card title="Live drain map" className="xl:col-span-2"
          action={<Link href="/app/map" className="text-xs font-semibold text-tech hover:underline">Full map →</Link>}>
          <DrainMap drains={DRAINS} height={360} zoom={14} />
        </Card>

        {/* Recent events + quick actions */}
        <div className="space-y-5">
          <Card title="Recent events">
            <ul className="space-y-2.5">
              {EVENTS_FEED.map((e, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${FEED_DOT[e.kind]}`} aria-hidden />
                  <div>
                    <span className="font-mono text-[11px] text-offline">{e.time}</span>
                    <p className="text-xs text-ink/80">{e.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Quick actions">
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Open a drain", "/app/drains"],
                ["Assign a job", "/app/maintenance"],
                ["Review alerts", "/app/alerts"],
                ["Export report", "/app/reports"],
              ].map(([l, href]) => (
                <Link key={l} href={href}
                  className="rounded-lg border border-neutral-grey px-3 py-2.5 text-center text-xs font-semibold text-forest transition-colors hover:border-tech hover:text-tech">
                  {l}
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
