import Link from "next/link";
import { notFound } from "next/navigation";
import { ALERTS, ASSESSMENTS, DRAINS, JOBS, MAINT_LOGS, seriesFor } from "@/lib/data";
import { DemoTag, StatusBadge } from "@/components/ui";
import DrainTabs from "./tabs";

export function generateStaticParams() {
  return DRAINS.map((d) => ({ id: d.id }));
}

export default async function DrainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const drain = DRAINS.find((d) => d.id === id);
  if (!drain) notFound();

  const series = seriesFor(drain.id);
  const assessment = ASSESSMENTS.find((a) => a.drainId === drain.id) ?? null;
  const alerts = ALERTS.filter((a) => a.drainId === drain.id);
  const jobs = JOBS.filter((j) => j.drainId === drain.id);
  const logs = MAINT_LOGS.filter((l) => l.drainId === drain.id);

  return (
    <div>
      <nav className="mb-4 text-xs text-offline">
        <Link href="/app/drains" className="text-tech hover:underline">Drain Registry</Link> / {drain.id}
      </nav>

      <div className="mb-5 flex flex-wrap items-start justify-between gap-4 rounded-xl border border-neutral-grey bg-white p-5 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-mono text-2xl font-extrabold text-forest">{drain.id}</h1>
            <StatusBadge severity={drain.severity} />
            <DemoTag text="Device status: example only" />
          </div>
          <p className="mt-1 text-sm text-ink/80">{drain.name}</p>
          <p className="text-xs text-offline">Site: {drain.site} · {drain.zone} · Installed {drain.installed} · Responsible: {drain.team}</p>
          <p className="mt-2 max-w-xl text-sm text-ink/70">{drain.note}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-mist/80 p-4 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">Water level</p>
            <p className="text-3xl font-extrabold text-forest">{drain.waterLevelCm === null ? "—" : `${drain.waterLevelCm} cm`}</p>
            <p className="text-[11px] text-offline">{drain.waterLevelCm === null ? "Unknown (offline)" : "Illustrative measurement"}</p>
          </div>
          <div className="rounded-xl bg-mist/80 p-4 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">Basket fill</p>
            <p className="text-3xl font-extrabold text-forest">{drain.basketFillPct === null ? "—" : `${drain.basketFillPct}%`}</p>
            <p className="text-[11px] text-offline">{drain.basketFillPct === null ? "Unknown (offline)" : "Estimated — no direct load sensor"}</p>
          </div>
        </div>
      </div>

      {drain.severity === "offline" && (
        <div className="mb-5 rounded-lg border-l-4 border-offline bg-offline-bg p-4 text-sm text-ink/80">
          <strong className="text-offline">Condition unknown.</strong> This device last reported{" "}
          <strong>{drain.lastContact}</strong>. The last reported status is not proof of current
          safety. Diagnose power and communication before relying on any value on this page.
        </div>
      )}

      <DrainTabs drain={drain} series={series} assessment={assessment} alerts={alerts} jobs={jobs} logs={logs} />
    </div>
  );
}
