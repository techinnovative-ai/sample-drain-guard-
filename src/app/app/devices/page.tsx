import { DRAINS } from "@/lib/data";
import { Card, DemoTag, DrainLink, PageHeader } from "@/components/ui";

export const metadata = { title: "Device & Sensor Health" };

function batteryTone(pct: number | null) {
  if (pct === null) return "text-offline";
  if (pct < 30) return "text-crit";
  if (pct < 60) return "text-attn";
  return "text-ok";
}

export default function DevicesPage() {
  const online = DRAINS.filter((d) => d.severity !== "offline");
  const offline = DRAINS.filter((d) => d.severity === "offline");

  return (
    <div>
      <PageHeader title="Device & Sensor Health" subtitle="Battery, solar charging, communication, sensor faults and last contact time.">
        <DemoTag text="Simulated device telemetry" />
      </PageHeader>

      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["Devices online", String(online.length), "Of 12 demo units", "text-ok"],
          ["Offline", String(offline.length), "Condition unknown", "text-offline"],
          ["Low battery (<70%)", String(online.filter((d) => (d.batteryPct ?? 100) < 70).length), "Charging being watched", "text-attn"],
          ["Sensor faults", "1", "Rain gauge suspect on DG-DEL-009", "text-attn"],
        ].map(([l, v, c, tone]) => (
          <div key={l} className="rounded-xl border border-neutral-grey bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-offline">{l}</p>
            <p className={`mt-1 text-3xl font-bold ${tone}`}>{v}</p>
            <p className="text-xs text-offline">{c}</p>
          </div>
        ))}
      </div>

      {offline.length > 0 && (
        <div className="mb-5 rounded-lg border-l-4 border-offline bg-offline-bg p-4 text-sm text-ink/80">
          <strong className="text-offline">{offline.length} device(s) silent.</strong> A missing
          heartbeat marks the drain&apos;s condition as UNKNOWN — never as safe. Offline units stay at
          the top of the attention list until they report again.
        </div>
      )}

      <Card title="Device fleet">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-offline">
              <tr className="border-b border-neutral-grey">
                <th className="px-3 py-2">Drain</th>
                <th className="px-3 py-2">Controller</th>
                <th className="px-3 py-2">Firmware</th>
                <th className="px-3 py-2">Battery</th>
                <th className="px-3 py-2">Solar input</th>
                <th className="px-3 py-2">Comms</th>
                <th className="px-3 py-2">Last contact</th>
              </tr>
            </thead>
            <tbody>
              {[...offline, ...online].map((d, i) => (
                <tr key={d.id} className={i % 2 ? "bg-mist/40" : ""}>
                  <td className="px-3 py-2.5"><DrainLink id={d.id} /></td>
                  <td className="px-3 py-2.5 font-mono text-xs text-ink/75">{d.controller}</td>
                  <td className="px-3 py-2.5 font-mono text-xs text-ink/75">{d.firmware}</td>
                  <td className={`px-3 py-2.5 font-bold ${batteryTone(d.batteryPct)}`}>
                    {d.batteryPct === null ? "unknown" : `${d.batteryPct}%`}
                  </td>
                  <td className="px-3 py-2.5 text-ink/75">{d.solarW === null ? "unknown" : `${d.solarW} W`}</td>
                  <td className="px-3 py-2.5">
                    {d.severity === "offline"
                      ? <span className="rounded-full bg-offline-bg px-2.5 py-0.5 text-[11px] font-bold text-offline">◌ No heartbeat</span>
                      : <span className="rounded-full bg-ok-bg px-2.5 py-0.5 text-[11px] font-bold text-ok">✓ Wi-Fi / HTTPS</span>}
                  </td>
                  <td className="px-3 py-2.5 text-ink/70">{d.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="mt-3 text-xs text-offline">
        Expected heartbeat: every 5 minutes. Devices buffer readings locally during outages and
        upload the backlog on reconnect, so history has no silent gaps.
      </p>
    </div>
  );
}
