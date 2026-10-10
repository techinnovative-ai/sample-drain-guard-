import { JOBS, MAINT_LOGS } from "@/lib/data";
import { Card, DemoTag, DrainLink, PageHeader } from "@/components/ui";

export const metadata = { title: "Maintenance" };

const PRIORITY_CHIP: Record<string, string> = {
  Urgent: "bg-crit-bg text-crit",
  High: "bg-attn-bg text-attn",
  Routine: "bg-mist text-forest",
};
const STATUS_CHIP: Record<string, string> = {
  Open: "bg-mist text-forest",
  "In progress": "bg-attn-bg text-attn",
  Done: "bg-ok-bg text-ok",
};

export default function MaintenancePage() {
  const open = JOBS.filter((j) => j.status !== "Done");
  return (
    <div>
      <PageHeader title="Maintenance" subtitle="Inspection schedules, assigned workers, cleaning records and repair history.">
        <DemoTag text="Simulated work orders" />
      </PageHeader>

      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["Open work orders", String(open.length), "Across demo sites"],
          ["Urgent", String(open.filter((j) => j.priority === "Urgent").length), "Due today"],
          ["In progress", String(JOBS.filter((j) => j.status === "In progress").length), "Crew on site"],
          ["Completed (7 days)", "5", "Including 1 repair"],
        ].map(([l, v, c]) => (
          <div key={l} className="rounded-xl border border-neutral-grey bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-offline">{l}</p>
            <p className="mt-1 text-3xl font-bold text-forest">{v}</p>
            <p className="text-xs text-offline">{c}</p>
          </div>
        ))}
      </div>

      <Card title="Work orders"
        action={<button className="rounded-lg bg-forest px-3 py-1.5 text-xs font-bold text-white hover:bg-forest-700">+ New work order (demo)</button>}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-offline">
              <tr className="border-b border-neutral-grey">
                <th className="px-3 py-2">Order</th>
                <th className="px-3 py-2">Drain</th>
                <th className="px-3 py-2">Task</th>
                <th className="px-3 py-2">Assignee</th>
                <th className="px-3 py-2">Priority</th>
                <th className="px-3 py-2">Due</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {JOBS.map((j, i) => (
                <tr key={j.id} className={i % 2 ? "bg-mist/40" : ""}>
                  <td className="px-3 py-2.5 font-mono text-xs font-bold text-forest">{j.id}</td>
                  <td className="px-3 py-2.5"><DrainLink id={j.drainId} /></td>
                  <td className="px-3 py-2.5 text-ink/80">{j.title}</td>
                  <td className="px-3 py-2.5 text-ink/70">{j.assignee}</td>
                  <td className="px-3 py-2.5"><span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${PRIORITY_CHIP[j.priority]}`}>{j.priority}</span></td>
                  <td className="px-3 py-2.5 text-ink/70">{j.due}</td>
                  <td className="px-3 py-2.5"><span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_CHIP[j.status]}`}>{j.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Recent maintenance logs" className="mt-5">
        <ul className="space-y-4">
          {MAINT_LOGS.map((l, i) => (
            <li key={i} className="flex flex-wrap gap-4 border-l-2 border-tech pl-4">
              <div className="w-28 shrink-0">
                <p className="font-mono text-xs font-bold text-forest">{l.date}</p>
                <p className="text-xs text-offline">{l.worker}</p>
              </div>
              <div className="min-w-[220px] flex-1">
                <p className="text-sm font-semibold text-forest">
                  <DrainLink id={l.drainId} /> · {l.action}
                </p>
                <p className="mt-0.5 text-sm text-ink/70">{l.notes}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
