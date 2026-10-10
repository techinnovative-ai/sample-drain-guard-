"use client";

import { useState } from "react";
import { Card, DemoTag, PageHeader } from "@/components/ui";

const USERS = [
  { name: "Demo Administrator", email: "admin@drainguard.demo", role: "Administrator", org: "DrainGuard Project" },
  { name: "Demo Operator", email: "ops@drainguard.demo", role: "Drainage operator", org: "Demo campus" },
  { name: "R. Sharma", email: "r.sharma@drainguard.demo", role: "Maintenance worker", org: "Team Alpha" },
  { name: "Demo Viewer", email: "viewer@drainguard.demo", role: "Read-only viewer", org: "Guest access" },
];

const SITES = [
  { name: "Demo campus", drains: 8, zones: "A, B, C" },
  { name: "City pilot", drains: 4, zones: "Sector 4, Sector 5" },
];

export default function SettingsPage() {
  const [thresholds, setThresholds] = useState({
    watchLevel: 35, highLevel: 55, criticalLevel: 70, cleanSoon: 85, heartbeatMin: 15,
  });
  const [notif, setNotif] = useState({ email: true, sms: false, critImmediate: true, dailyDigest: true });
  const [saved, setSaved] = useState(false);

  function set<K extends keyof typeof thresholds>(k: K, v: number) {
    setThresholds((t) => ({ ...t, [k]: v }));
    setSaved(false);
  }

  return (
    <div>
      <PageHeader title="Administration" subtitle="Users, sites, device registration, alert thresholds and notification preferences.">
        <DemoTag text="Changes are local to this demo" />
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Alert thresholds"
          action={<button onClick={() => setSaved(true)} className="rounded-lg bg-forest px-3 py-1.5 text-xs font-bold text-white hover:bg-forest-700">Save (demo)</button>}>
          {saved && <p className="mb-3 rounded-lg bg-ok-bg px-3 py-2 text-xs font-semibold text-ok">Saved locally. In production this writes to configuration with an audit-log entry.</p>}
          <div className="space-y-4">
            {([
              ["watchLevel", "Watch — water level above (cm)", 10, 60],
              ["highLevel", "High — water level above (cm)", 30, 80],
              ["criticalLevel", "Critical — water level above (cm)", 50, 100],
              ["cleanSoon", "Clean Soon — basket estimate above (%)", 50, 95],
              ["heartbeatMin", "Offline — heartbeat missing for (min)", 5, 120],
            ] as const).map(([k, label, min, max]) => (
              <label key={k} className="block text-sm">
                <span className="flex justify-between font-semibold text-forest">
                  {label} <span className="font-mono text-tech">{thresholds[k]}</span>
                </span>
                <input type="range" min={min} max={max} value={thresholds[k]}
                  onChange={(e) => set(k, Number(e.target.value))}
                  className="mt-1 w-full accent-tech" />
              </label>
            ))}
          </div>
          <p className="mt-4 text-xs text-offline">
            Thresholds stay configurable per site and are calibrated from field observations. A
            percentage alone never declares a drain safe or blocked — extreme-flow conditions
            always prioritise physical emergency drainage capacity.
          </p>
        </Card>

        <div className="space-y-5">
          <Card title="Notification preferences">
            <div className="space-y-3">
              {([
                ["email", "Email alerts (initial channel)"],
                ["sms", "SMS alerts (later expansion)"],
                ["critImmediate", "Immediate notification for Critical and Offline"],
                ["dailyDigest", "Daily condition digest"],
              ] as const).map(([k, label]) => (
                <label key={k} className="flex items-center justify-between rounded-lg border border-neutral-grey px-3 py-2.5 text-sm">
                  <span className="font-medium text-ink/85">{label}</span>
                  <input type="checkbox" checked={notif[k]}
                    onChange={(e) => setNotif((n) => ({ ...n, [k]: e.target.checked }))}
                    className="h-4 w-4 accent-tech" />
                </label>
              ))}
            </div>
          </Card>

          <Card title="Sites">
            <ul className="space-y-2">
              {SITES.map((s) => (
                <li key={s.name} className="flex items-center justify-between rounded-lg bg-mist/70 px-3 py-2.5 text-sm">
                  <span className="font-semibold text-forest">{s.name}</span>
                  <span className="text-xs text-offline">{s.drains} drains · Zones {s.zones}</span>
                </li>
              ))}
            </ul>
            <button className="mt-3 w-full rounded-lg border border-dashed border-neutral-grey py-2 text-xs font-semibold text-offline hover:border-tech hover:text-tech">
              + Register new site (demo)
            </button>
          </Card>
        </div>
      </div>

      <Card title="Users & roles" className="mt-5"
        action={<button className="rounded-lg bg-forest px-3 py-1.5 text-xs font-bold text-white hover:bg-forest-700">+ Invite user (demo)</button>}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-offline">
              <tr className="border-b border-neutral-grey">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Organisation</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u, i) => (
                <tr key={u.email} className={i % 2 ? "bg-mist/40" : ""}>
                  <td className="px-3 py-2.5 font-semibold text-forest">{u.name}</td>
                  <td className="px-3 py-2.5 font-mono text-xs text-ink/75">{u.email}</td>
                  <td className="px-3 py-2.5"><span className="rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-bold text-forest">{u.role}</span></td>
                  <td className="px-3 py-2.5 text-ink/70">{u.org}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-offline">
          Role-based access is designed in from the beginning: Administrator, Drainage operator,
          Maintenance worker and Read-only viewer. Every configuration change and alert action is
          recorded in the audit log.
        </p>
      </Card>

      <Card title="Device registration" className="mt-5">
        <p className="text-sm text-ink/70">
          New ESP32 controllers are registered with a unique device ID and per-device secret used to
          authenticate <code className="font-mono text-xs">POST /api/v1/telemetry</code>. Secrets are
          stored server-side only — never in frontend JavaScript. The backend validates measurement
          ranges and timestamps on every message before it is written to{" "}
          <code className="font-mono text-xs">sensor_readings</code>.
        </p>
      </Card>
    </div>
  );
}
