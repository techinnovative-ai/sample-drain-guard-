import Link from "next/link";
import type { Severity, StatusGroup } from "@/lib/data";
import { SEVERITY_LABEL, statusGroup } from "@/lib/data";

const GROUP_STYLE: Record<StatusGroup, { dot: string; chip: string; icon: string }> = {
  normal: { dot: "bg-ok", chip: "bg-ok-bg text-ok", icon: "✓" },
  attention: { dot: "bg-attn", chip: "bg-attn-bg text-attn", icon: "▲" },
  critical: { dot: "bg-crit", chip: "bg-crit-bg text-crit", icon: "⬤" },
  offline: { dot: "bg-offline", chip: "bg-offline-bg text-offline", icon: "◌" },
};

/** Colour + icon + text label, so status is never colour-only. */
export function StatusBadge({ severity, className = "" }: { severity: Severity; className?: string }) {
  const g = GROUP_STYLE[statusGroup(severity)];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${g.chip} ${className}`}>
      <span aria-hidden className="text-[9px] leading-none">{g.icon}</span>
      {SEVERITY_LABEL[severity]}
    </span>
  );
}

export function DemoTag({ text = "Demo data" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded border border-attn/40 bg-attn-bg px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-attn">
      {text}
    </span>
  );
}

export function StatCard({ label, value, caption, tone = "default" }: {
  label: string; value: string; caption: string;
  tone?: "default" | "ok" | "attention" | "critical" | "offline";
}) {
  const bar = { default: "bg-tech", ok: "bg-ok", attention: "bg-attn", critical: "bg-crit", offline: "bg-offline" }[tone];
  return (
    <div className="relative overflow-hidden rounded-xl border border-neutral-grey bg-white p-4 shadow-sm">
      <div className={`absolute inset-y-0 left-0 w-1 ${bar}`} aria-hidden />
      <p className="text-xs font-semibold uppercase tracking-wide text-offline">{label}</p>
      <p className="mt-1 text-3xl font-bold text-forest">{value}</p>
      <p className="mt-1 text-xs text-offline">{caption}</p>
    </div>
  );
}

export function PageHeader({ title, subtitle, children }: {
  title: string; subtitle?: string; children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-forest">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-offline">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Card({ title, action, children, className = "" }: {
  title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <section className={`rounded-xl border border-neutral-grey bg-white shadow-sm ${className}`}>
      {(title || action) && (
        <header className="flex items-center justify-between border-b border-neutral-grey/70 px-4 py-3">
          {title && <h2 className="text-sm font-bold text-forest">{title}</h2>}
          {action}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function DemoBanner() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-attn/40 bg-attn-bg px-3 py-2 text-xs text-attn">
      <strong className="font-bold uppercase tracking-wide">Demo mode</strong>
      <span>
        Illustrative dashboard — all readings on this screen are simulated placeholders, not live
        sensor measurements. Production deployments show validated values from registered devices.
      </span>
    </div>
  );
}

export function DrainLink({ id }: { id: string }) {
  return (
    <Link href={`/app/drains/${id}`} className="font-mono text-sm font-semibold text-tech hover:underline">
      {id}
    </Link>
  );
}
