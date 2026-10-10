import { Card, DemoTag, DrainLink, PageHeader } from "@/components/ui";
import { RainEventsChart, ResponseChart } from "@/components/charts";

export const metadata = { title: "Analytics" };

const RECURRING = [
  { id: "DG-DEL-001", count: 4, cause: "Plastic-bag debris from adjacent market", trend: "worsening" },
  { id: "DG-DEL-011", count: 3, cause: "Underpass sump overload in intense rain", trend: "stable" },
  { id: "DG-DEL-005", count: 2, cause: "Suspected downstream channel restriction", trend: "new" },
];

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" subtitle="Trends, rainfall events, recurring blockages and response times across the monsoon season.">
        <DemoTag text="Simulated seasonal data" />
      </PageHeader>

      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["Rain events (season)", "45", "May – October"],
          ["Blockage alerts", "17", "38% of rain events"],
          ["Avg response time", "38 min", "↓ from 95 min in May"],
          ["Debris removed", "61 kg", "Across logged cleanings"],
        ].map(([l, v, c]) => (
          <div key={l} className="rounded-xl border border-neutral-grey bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-offline">{l}</p>
            <p className="mt-1 text-3xl font-bold text-forest">{v}</p>
            <p className="text-xs text-offline">{c}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Rain events vs blockage alerts (simulated)">
          <RainEventsChart />
          <p className="mt-2 text-xs text-offline">
            The gap between rain events and blockages widens as condition-based cleaning takes effect.
          </p>
        </Card>
        <Card title="Average response time to critical alerts (simulated)">
          <ResponseChart />
          <p className="mt-2 text-xs text-offline">
            Response time improves as alerts carry evidence and work orders are assigned directly from them.
          </p>
        </Card>
      </div>

      <Card title="Recurring problem drains" className="mt-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-offline">
              <tr className="border-b border-neutral-grey">
                <th className="px-3 py-2">Drain</th>
                <th className="px-3 py-2">Blockage alerts (season)</th>
                <th className="px-3 py-2">Probable recurring cause</th>
                <th className="px-3 py-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {RECURRING.map((r, i) => (
                <tr key={r.id} className={i % 2 ? "bg-mist/40" : ""}>
                  <td className="px-3 py-2.5"><DrainLink id={r.id} /></td>
                  <td className="px-3 py-2.5 font-bold text-forest">{r.count}</td>
                  <td className="px-3 py-2.5 text-ink/75">{r.cause}</td>
                  <td className="px-3 py-2.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      r.trend === "worsening" ? "bg-crit-bg text-crit" : r.trend === "new" ? "bg-attn-bg text-attn" : "bg-mist text-forest"
                    }`}>{r.trend}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-offline">
          Recurring-problem data supports redesign and budget decisions — e.g. a larger basket, more
          frequent cleaning, or upstream litter control at the market.
        </p>
      </Card>
    </div>
  );
}
