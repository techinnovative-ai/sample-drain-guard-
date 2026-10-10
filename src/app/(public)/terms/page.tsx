import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

const SECTIONS: [string, string][] = [
  ["Nature of the service", "DrainGuard is a monitoring and decision-support platform. It observes drainage conditions, raises warnings and organises maintenance. It is not a flood-control device, a guarantee of drainage performance, or a substitute for physical inspection."],
  ["Safety limitations", "Drainage safety must never depend on this software. The physical DrainGuard assembly, including its emergency water-flow path, is designed to manage water without cloud connectivity. Users must not treat dashboard availability, or a green status, as proof that a site is safe — particularly during extreme weather."],
  ["Status accuracy", "Readings can be delayed, estimated or wrong. Basket-fill percentages are model-derived estimates unless a direct sensor measures them. An offline device's last report is not evidence of its current condition. Alert patterns are diagnostic clues, not proof of a specific failure."],
  ["Demonstration data", "Screens labelled 'Demo mode' show simulated placeholder values for design and evaluation. They are not live sensor readings and must not be used for operational decisions."],
  ["Acceptable use", "Accounts are personal and role-bound. Users must not share credentials, probe devices or APIs they are not authorised for, or submit falsified telemetry or maintenance records. All actions on alerts, work orders and configuration are logged in the audit trail."],
  ["Maintenance responsibility", "The platform recommends and organises maintenance; carrying it out safely remains the responsibility of the operating organisation, including confined-space, traffic and weather precautions for field crews."],
  ["Availability", "The prototype is provided as-is, without uptime commitments. Scheduled field testing (Stage 6) includes deliberate failure scenarios — outages, sensor faults and false alerts — as part of validation."],
  ["Changes", "These terms will evolve as the project moves from prototype to field deployment. Material changes will be announced to registered users before they take effect."],
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold text-forest">Terms of Service</h1>
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
