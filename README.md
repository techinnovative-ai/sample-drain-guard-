# DrainGuard — Smart Drainage Intelligence Platform

AI-integrated intelligent storm-drain protection and monitoring system.
This repository contains the **Stage 1 frontend prototype**: the complete public
website plus the monitoring application, running entirely on clearly-labelled
simulated demonstration data.

## What's here

### A. Public website
| Page | Route |
| --- | --- |
| Home (hero, problem, solution, how it works, features) | `/` |
| How It Works (data flow + AI reasoning table) | `/how-it-works` |
| Technology (hardware, stack, database schema, API) | `/technology` |
| Features (monitoring, detection, alert levels) | `/features` |
| Impact | `/impact` |
| Prototype (parts + roadmap) | `/prototype` |
| Contact | `/contact` |
| Sign In (demo auth) | `/login` |
| Privacy / Terms | `/privacy`, `/terms` |

### B. Monitoring application (demo mode)
| Page | Route |
| --- | --- |
| Overview dashboard (status cards, priority alerts, live chart, map, events, quick actions) | `/app/dashboard` |
| Live Drain Map (Leaflet + OpenStreetMap, status markers, filters) | `/app/map` |
| Drain Registry (search + filter) | `/app/drains` |
| Drain detail (Live Monitoring · AI Assessment · History · Hardware tabs) | `/app/drains/DG-DEL-001` |
| Alert Centre (evidence, acknowledge/resolve) | `/app/alerts` |
| AI Insights (confidence + evidence + actions, reasoning rules) | `/app/ai-insights` |
| Maintenance (work orders + logs) | `/app/maintenance` |
| Analytics (seasonal trends, recurring blockages, response times) | `/app/analytics` |
| Device & Sensor Health | `/app/devices` |
| Reports (working demo CSV exports) | `/app/reports` |
| Administration (thresholds, notifications, users, sites) | `/app/settings` |

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000
```

Sign in at `/login` — the Stage-1 prototype uses a simulated session
(any credentials, or the read-only viewer button). Production replaces this
with Supabase Auth and role-based accounts.

## Design rules baked in

- **An offline drain is never shown as safe** — missing heartbeat ⇒ condition
  UNKNOWN, surfaced with last-contact time.
- **Status is never colour-only** — every badge pairs colour with an icon and label.
- **Estimates are labelled** — basket fill is a model-derived estimate until a
  direct sensor measures it.
- **Every demo value is labelled as demo** — banners, tags and CSV headers.
- **Safety never depends on the cloud** — stated across the site; the physical
  assembly keeps an emergency water path open regardless of connectivity.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
Recharts · Leaflet/react-leaflet · simulated data in `src/lib/data.ts`.

## Roadmap (per project plan)

1. **Stage 1 — this repo:** frontend prototype with demonstration data ✅
2. Stage 2 — Supabase PostgreSQL + Auth, drain registry, historical readings
3. Stage 3 — first ESP32 + sensors sending validated telemetry (`POST /api/v1/telemetry`)
4. Stage 4 — alert engine: configurable thresholds, missing-data alerts, notifications
5. Stage 5 — AI insights: sensor-fusion rules, anomaly detection, explanations
6. Stage 6 — field testing, then multi-site expansion
