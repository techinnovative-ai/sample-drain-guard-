import type { Metadata } from "next";

export const metadata: Metadata = { title: "Technology" };

const STACK = [
  ["Website and dashboard", "Next.js + React + TypeScript", "Public pages and authenticated application"],
  ["Styling", "Tailwind CSS", "Responsive layouts and reusable components"],
  ["Charts", "Recharts", "Water-level, rainfall and historical trends"],
  ["Map", "Leaflet + OpenStreetMap", "Display registered drains with status markers"],
  ["Authentication", "Supabase Auth", "Sign-in and account management"],
  ["Database", "Supabase PostgreSQL", "Drain registry, telemetry, alerts and maintenance records"],
  ["Device communication", "HTTPS API initially", "ESP32 sends authenticated sensor readings"],
  ["Larger deployments", "MQTT broker + device gateway", "Efficient device messaging at scale"],
  ["AI processing", "Python service when needed", "Anomaly detection and prediction"],
  ["Notifications", "Email first; SMS later", "Alert delivery"],
];

const TABLES = [
  ["users", "ID, name, email, role, organisation"],
  ["sites", "ID, site name, address or description, coordinates"],
  ["drains", "ID, site ID, coordinates, installation details, status"],
  ["devices", "ID, drain ID, controller ID, firmware version, last heartbeat"],
  ["sensor_readings", "Device ID, sensor type, value, unit, timestamp, quality flag"],
  ["alerts", "Drain ID, type, severity, evidence, creation time, status"],
  ["ai_assessments", "Drain ID, estimated issue, confidence, evidence, recommended action"],
  ["maintenance_jobs", "Drain ID, assigned worker, priority, due date, completion details"],
  ["maintenance_logs", "Inspection notes, debris removed, repairs, before/after condition"],
  ["notifications", "Alert ID, recipient, delivery channel, delivery status"],
  ["audit_logs", "User action, affected record, timestamp"],
];

const API = [
  ["POST", "/api/v1/telemetry", "Receive authenticated sensor measurements"],
  ["GET", "/api/v1/dashboard", "Return current summary statistics"],
  ["GET", "/api/v1/drains", "List authorized registered drains"],
  ["GET", "/api/v1/drains/:id", "Retrieve drain details"],
  ["GET", "/api/v1/drains/:id/readings", "Retrieve historical sensor readings"],
  ["GET", "/api/v1/alerts", "Retrieve alerts with filters"],
  ["POST", "/api/v1/alerts/:id/acknowledge", "Record an authorised acknowledgement"],
  ["POST", "/api/v1/maintenance/jobs", "Create a maintenance work order"],
  ["PATCH", "/api/v1/maintenance/jobs/:id", "Update an authorised work order"],
  ["GET", "/api/v1/reports", "Generate or retrieve authorised reports"],
];

const METHOD_COLOR: Record<string, string> = {
  GET: "bg-ok-bg text-ok",
  POST: "bg-attn-bg text-attn",
  PATCH: "bg-mist text-forest",
};

export default function TechnologyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-tech">Technology</p>
      <h1 className="mt-3 text-4xl font-extrabold text-forest">Hardware and software architecture</h1>
      <p className="mt-4 max-w-3xl text-ink/70">
        A student-built prototype with a clear path to expansion: transparent rules and validated
        sensor readings first, trained models once reliable field data exists. An external AI API
        is not required for the first prototype.
      </p>

      <h2 className="mt-14 text-2xl font-bold text-forest">Hardware platform</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["ESP32 controller", "Dual-core microcontroller with Wi-Fi. Reads sensors, runs local fault logic, signs and sends telemetry, and buffers readings during outages."],
          ["Sensor suite", "Ultrasonic water-level sensor as the core measurement. Optional flow, rainfall (tipping bucket) and fill sensing added per site."],
          ["Solar power system", "Compact panel + charge controller + battery. Battery and charging telemetry are monitored like any other sensor — power faults raise alerts."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-neutral-grey bg-white p-6 shadow-sm">
            <h3 className="font-bold text-forest">{t}</h3>
            <p className="mt-2 text-sm text-ink/70">{d}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold text-forest">Recommended technology stack</h2>
      <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-grey">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-forest text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Layer</th>
              <th className="px-4 py-3 font-semibold">Technology</th>
              <th className="px-4 py-3 font-semibold">Role</th>
            </tr>
          </thead>
          <tbody>
            {STACK.map((r, i) => (
              <tr key={i} className={i % 2 ? "bg-mist/60" : "bg-white"}>
                <td className="px-4 py-3 font-semibold text-forest">{r[0]}</td>
                <td className="px-4 py-3 text-ink/80">{r[1]}</td>
                <td className="px-4 py-3 text-ink/70">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14 text-2xl font-bold text-forest">Database structure</h2>
      <p className="mt-3 max-w-3xl text-sm text-ink/70">
        A relational database (PostgreSQL) with time-series practices for sensor readings:
        timestamps preserved, units recorded, incoming data validated, and indexes for fast
        time-range queries. Previous readings are never overwritten — trends are essential for
        diagnosing recurring drainage problems.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TABLES.map(([name, fields]) => (
          <div key={name} className="rounded-lg border border-neutral-grey bg-white p-4">
            <code className="rounded bg-forest px-2 py-0.5 font-mono text-xs font-bold text-white">{name}</code>
            <p className="mt-2 text-xs text-ink/70">{fields}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold text-forest">Backend API structure</h2>
      <p className="mt-3 max-w-3xl text-sm text-ink/70">
        Versioned endpoints give the ESP32 and the website a defined interface. The backend
        verifies device identity, validates measurement ranges and timestamps, and enforces user
        permissions. Privileged database keys and device secrets never appear in frontend
        JavaScript.
      </p>
      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-grey bg-white">
        {API.map(([m, path, desc], i) => (
          <div key={path} className={`flex flex-wrap items-center gap-3 px-4 py-3 ${i % 2 ? "bg-mist/50" : ""}`}>
            <span className={`w-14 rounded px-2 py-0.5 text-center font-mono text-xs font-bold ${METHOD_COLOR[m]}`}>{m}</span>
            <code className="font-mono text-sm text-forest">{path}</code>
            <span className="ml-auto text-sm text-ink/60">{desc}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold text-forest">Roles and permissions</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Administrator", "Manage users, sites, devices and system configuration"],
          ["Drainage operator", "View assigned drains, monitor conditions and acknowledge alerts"],
          ["Maintenance worker", "View assigned jobs, log inspections and record completed work"],
          ["Read-only viewer", "View permitted dashboards and reports"],
        ].map(([r, p]) => (
          <div key={r} className="rounded-xl border border-neutral-grey bg-white p-5">
            <h3 className="text-sm font-bold text-forest">{r}</h3>
            <p className="mt-2 text-xs text-ink/70">{p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
