import { ASSESSMENTS } from "@/lib/data";
import { Card, DemoTag, DrainLink, PageHeader, StatusBadge } from "@/components/ui";

export const metadata = { title: "AI Insights" };

const PATTERNS = [
  ["Rising basket fill + rising water level", "Possible inlet blockage", "Inspect guard and debris basket"],
  ["Low debris estimate + persistently high level", "Downstream restriction / back-pressure", "Inspect channel and outlet"],
  ["Rapid rise during heavy rainfall", "Overload or developing blockage", "High-priority warning; assess site"],
  ["Level stays high after rain decreases", "Persistent restriction / slow drainage", "Arrange an inspection"],
  ["Missing or abnormal sensor data", "Sensor, wiring or power fault", "Mark uncertain; diagnose device"],
  ["High level + unusually poor inlet response", "Possible full-surface obstruction", "Raise CRITICAL INLET OBSTRUCTION"],
];

export default function AiInsightsPage() {
  return (
    <div>
      <PageHeader title="AI Insights" subtitle="Anomaly detection with probable causes, confidence and suggested actions — always with evidence.">
        <DemoTag text="Simulated assessments" />
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-2">
        {ASSESSMENTS.map((a) => (
          <Card key={a.drainId}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <DrainLink id={a.drainId} />
                <h2 className="text-lg font-bold text-forest">{a.issue}</h2>
              </div>
              <StatusBadge severity={a.severity} />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-mist">
                <div className="h-2 rounded-full bg-tech" style={{ width: `${a.confidence * 100}%` }} />
              </div>
              <span className="text-sm font-bold text-forest">{Math.round(a.confidence * 100)}% confidence</span>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-offline">Evidence</p>
            <ul className="mt-1.5 space-y-1.5">
              {a.evidence.map((e) => (
                <li key={e} className="flex gap-2 text-sm text-ink/75"><span className="text-tech">▪</span>{e}</li>
              ))}
            </ul>
            <div className="mt-3 rounded-lg bg-mist p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-offline">Suggested action</p>
              <p className="mt-0.5 text-sm font-semibold text-forest">{a.action}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card title="The reasoning rules behind these insights" className="mt-6">
        <p className="mb-4 text-sm text-ink/70">
          Stage-5 insights start as transparent sensor-fusion rules — no black box. Patterns are
          diagnostic clues, not proof; they gain reliability when multiple readings, trends,
          rainfall and inspection records agree. Trained models are added only once reliable field
          data exists.
        </p>
        <div className="overflow-x-auto rounded-lg border border-neutral-grey">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-wide text-offline">
              <tr>
                <th className="px-4 py-2.5">Observed pattern</th>
                <th className="px-4 py-2.5">Possible interpretation</th>
                <th className="px-4 py-2.5">Suggested response</th>
              </tr>
            </thead>
            <tbody>
              {PATTERNS.map((r, i) => (
                <tr key={i} className={i % 2 ? "bg-mist/40" : ""}>
                  {r.map((c, j) => <td key={j} className="px-4 py-2.5 align-top text-ink/75">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
