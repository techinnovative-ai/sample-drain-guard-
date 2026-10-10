import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

const SECTIONS: [string, string][] = [
  ["What we collect", "Device telemetry (sensor values, timestamps, device identifiers, battery and connectivity status), drain and site records (locations, installation details, maintenance history), and account data for authorised users (name, email, role, organisation). Contact-form enquiries are stored with the details you submit."],
  ["Why we collect it", "Telemetry exists solely to monitor drainage condition, raise warnings and plan maintenance. Account data exists to control access and attribute actions (acknowledgements, work orders, inspection logs) through the audit trail."],
  ["Where it is stored", "Data is stored in the project database (PostgreSQL). Sensor readings are retained as historical time series — previous readings are not overwritten, because trends are required to diagnose recurring drainage problems."],
  ["Who can access it", "Access is role-based. Administrators manage configuration; operators see assigned drains; maintenance workers see assigned jobs; read-only viewers see permitted dashboards. Device credentials and privileged database keys are never exposed in frontend code."],
  ["Location data", "Drain coordinates describe infrastructure, not people. The platform does not track individuals, vehicles or phones."],
  ["Retention and deletion", "Telemetry is retained for trend analysis and planning. Account data is removed when access is revoked, except where audit records must be preserved. Enquiries are deleted on request."],
  ["Demonstration mode", "The current Stage-1 prototype displays simulated data only and stores no real telemetry or personal data beyond what you type into the demo interface, which is not transmitted."],
  ["Contact", "Questions about data handling can be raised through the contact page and will be answered by the project team."],
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold text-forest">Privacy Policy</h1>
      <p className="mt-3 text-sm text-offline">Last updated: October 2026 · Applies to the DrainGuard prototype platform</p>
      <div className="mt-10 space-y-8">
        {SECTIONS.map(([t, d], i) => (
          <section key={t}>
            <h2 className="text-xl font-bold text-forest">{i + 1}. {t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{d}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
