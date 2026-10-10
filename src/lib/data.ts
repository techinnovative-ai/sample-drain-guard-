// ---------------------------------------------------------------------------
// DrainGuard demonstration dataset
// ---------------------------------------------------------------------------
// Every value in this file is SIMULATED. It exists so the Stage-1 frontend
// prototype can be designed, reviewed and tested before real hardware is
// connected. Replace with database-backed telemetry in Stage 2/3.
// ---------------------------------------------------------------------------

export type Severity =
  | "normal"
  | "watch"
  | "clean-soon"
  | "high"
  | "critical"
  | "offline";

export type StatusGroup = "normal" | "attention" | "critical" | "offline";

export function statusGroup(s: Severity): StatusGroup {
  if (s === "normal") return "normal";
  if (s === "critical") return "critical";
  if (s === "offline") return "offline";
  return "attention";
}

export const SEVERITY_LABEL: Record<Severity, string> = {
  normal: "Normal",
  watch: "Watch",
  "clean-soon": "Clean Soon",
  high: "High",
  critical: "Critical",
  offline: "Offline",
};

export interface Drain {
  id: string;
  name: string;
  site: string;
  zone: string;
  lat: number;
  lng: number;
  severity: Severity;
  waterLevelCm: number | null; // null when offline
  basketFillPct: number | null; // ESTIMATE — no direct load sensor in prototype
  rainfallMmHr: number | null;
  batteryPct: number | null;
  solarW: number | null;
  lastContact: string;
  installed: string;
  firmware: string;
  controller: string;
  team: string;
  note: string;
}

export const DRAINS: Drain[] = [
  { id: "DG-DEL-001", name: "Main Gate Culvert", site: "Demo campus", zone: "Zone A", lat: 28.5456, lng: 77.1926, severity: "critical", waterLevelCm: 82, basketFillPct: 88, rainfallMmHr: 14.2, batteryPct: 76, solarW: 2.1, lastContact: "2 min ago", installed: "2025-07-14", firmware: "v0.9.4", controller: "ESP32-WROOM-32E · C4F1", team: "Team Alpha", note: "High water level with abnormal inlet response during active rainfall." },
  { id: "DG-DEL-002", name: "Hostel Road Inlet", site: "Demo campus", zone: "Zone A", lat: 28.5471, lng: 77.1898, severity: "clean-soon", waterLevelCm: 31, basketFillPct: 86, rainfallMmHr: 13.8, batteryPct: 91, solarW: 3.4, lastContact: "1 min ago", installed: "2025-07-14", firmware: "v0.9.4", controller: "ESP32-WROOM-32E · C4F2", team: "Team Alpha", note: "Debris basket approaching configured cleaning threshold." },
  { id: "DG-DEL-003", name: "Sports Field Drain", site: "Demo campus", zone: "Zone B", lat: 28.5433, lng: 77.1951, severity: "offline", waterLevelCm: null, basketFillPct: null, rainfallMmHr: null, batteryPct: null, solarW: null, lastContact: "11 h ago", installed: "2025-07-15", firmware: "v0.9.3", controller: "ESP32-WROOM-32E · C4F3", team: "Team Bravo", note: "Heartbeat missing. Last reported status is NOT proof of current safety." },
  { id: "DG-DEL-004", name: "Library Court Grate", site: "Demo campus", zone: "Zone B", lat: 28.5442, lng: 77.1879, severity: "normal", waterLevelCm: 12, basketFillPct: 22, rainfallMmHr: 12.9, batteryPct: 97, solarW: 4.0, lastContact: "just now", installed: "2025-07-15", firmware: "v0.9.4", controller: "ESP32-WROOM-32E · C4F4", team: "Team Bravo", note: "Draining normally under current rainfall." },
  { id: "DG-DEL-005", name: "Workshop Lane Inlet", site: "Demo campus", zone: "Zone C", lat: 28.5418, lng: 77.1908, severity: "high", waterLevelCm: 64, basketFillPct: 35, rainfallMmHr: 13.1, batteryPct: 83, solarW: 2.8, lastContact: "3 min ago", installed: "2025-07-18", firmware: "v0.9.4", controller: "ESP32-WROOM-32E · C4F5", team: "Team Alpha", note: "Low debris estimate but persistently high water level — possible downstream restriction." },
  { id: "DG-DEL-006", name: "Canteen Corner Drain", site: "Demo campus", zone: "Zone C", lat: 28.5409, lng: 77.1936, severity: "watch", waterLevelCm: 38, basketFillPct: 58, rainfallMmHr: 13.5, batteryPct: 88, solarW: 3.1, lastContact: "2 min ago", installed: "2025-07-18", firmware: "v0.9.4", controller: "ESP32-WROOM-32E · C4F6", team: "Team Bravo", note: "Debris estimate and water level both rising slowly." },
  { id: "DG-DEL-007", name: "North Parking Grate", site: "Demo campus", zone: "Zone A", lat: 28.5487, lng: 77.1931, severity: "normal", waterLevelCm: 9, basketFillPct: 14, rainfallMmHr: 12.6, batteryPct: 95, solarW: 3.9, lastContact: "1 min ago", installed: "2025-08-02", firmware: "v0.9.4", controller: "ESP32-WROOM-32E · C4F7", team: "Team Alpha", note: "No abnormal pattern detected." },
  { id: "DG-DEL-008", name: "Auditorium Side Inlet", site: "Demo campus", zone: "Zone B", lat: 28.5449, lng: 77.1964, severity: "normal", waterLevelCm: 15, basketFillPct: 29, rainfallMmHr: 13.0, batteryPct: 92, solarW: 3.6, lastContact: "just now", installed: "2025-08-02", firmware: "v0.9.4", controller: "ESP32-WROOM-32E · C4F8", team: "Team Bravo", note: "No abnormal pattern detected." },
  { id: "DG-DEL-009", name: "Market Street Culvert", site: "City pilot", zone: "Sector 4", lat: 28.5524, lng: 77.1842, severity: "watch", waterLevelCm: 41, basketFillPct: 49, rainfallMmHr: 15.0, batteryPct: 71, solarW: 1.9, lastContact: "4 min ago", installed: "2025-09-01", firmware: "v0.9.4", controller: "ESP32-S3 · A118", team: "City crew 2", note: "Water level rising with heavy local rainfall; monitoring." },
  { id: "DG-DEL-010", name: "Bus Depot Drain", site: "City pilot", zone: "Sector 4", lat: 28.5538, lng: 77.1889, severity: "normal", waterLevelCm: 18, basketFillPct: 33, rainfallMmHr: 14.4, batteryPct: 89, solarW: 3.2, lastContact: "2 min ago", installed: "2025-09-01", firmware: "v0.9.4", controller: "ESP32-S3 · A119", team: "City crew 2", note: "No abnormal pattern detected." },
  { id: "DG-DEL-011", name: "Underpass Sump Inlet", site: "City pilot", zone: "Sector 5", lat: 28.5502, lng: 77.1973, severity: "critical", waterLevelCm: 77, basketFillPct: 52, rainfallMmHr: 15.3, batteryPct: 64, solarW: 1.2, lastContact: "1 min ago", installed: "2025-09-05", firmware: "v0.9.4", controller: "ESP32-S3 · A120", team: "City crew 1", note: "Rapid water-level rise during heavy rainfall — overload or developing blockage." },
  { id: "DG-DEL-012", name: "Clock Tower Grate", site: "City pilot", zone: "Sector 5", lat: 28.5491, lng: 77.1819, severity: "offline", waterLevelCm: null, basketFillPct: null, rainfallMmHr: null, batteryPct: null, solarW: null, lastContact: "2 d ago", installed: "2025-09-05", firmware: "v0.9.2", controller: "ESP32-S3 · A121", team: "City crew 1", note: "Suspected power fault — battery was at 18% before last contact." },
];

// Fleet summary — placeholder totals for the demonstration dashboard.
// 128 = detailed demo units above + simulated additional registered units.
export const FLEET = {
  registered: 128,
  normal: 104,
  attention: 17, // includes watch, clean-soon, high
  critical: 7,
  offline: 3, // counted inside "needs attention" group in the cards above
};

export interface AlertItem {
  id: string;
  drainId: string;
  title: string;
  detail: string;
  severity: Severity;
  tag: string;
  time: string;
  status: "active" | "acknowledged" | "resolved";
  evidence: string[];
}

export const ALERTS: AlertItem[] = [
  { id: "AL-1041", drainId: "DG-DEL-001", title: "Critical inlet obstruction", detail: "High water level and abnormal inlet response. Inspect urgently.", severity: "critical", tag: "Critical", time: "Today 09:42", status: "active", evidence: ["Water level 82 cm (threshold 60 cm) and rising 9 cm per 15 min", "Basket fill estimate 88% with rising trend", "Inlet response 0.31× of expected drain-down rate for current rainfall"] },
  { id: "AL-1040", drainId: "DG-DEL-011", title: "Rapid rise during heavy rainfall", detail: "Water level climbing faster than modelled drainage capacity.", severity: "critical", tag: "Critical", time: "Today 09:31", status: "active", evidence: ["Rainfall 15.3 mm/h sustained for 40 min", "Level rose 34 cm in 30 min", "Debris estimate only 52% — overload or developing blockage"] },
  { id: "AL-1039", drainId: "DG-DEL-002", title: "Debris basket nearly full", detail: "Cleaning may be required; verify current sensor readings.", severity: "clean-soon", tag: "High debris", time: "Today 08:57", status: "active", evidence: ["Basket fill estimate 86% (cleaning threshold 85%)", "Estimate derived from inlet response, not a direct load sensor", "Last cleaning logged 21 days ago"] },
  { id: "AL-1038", drainId: "DG-DEL-003", title: "Device offline", detail: "Live condition unavailable. The last reported status is not proof of current safety.", severity: "offline", tag: "Offline", time: "Today 05:12", status: "active", evidence: ["No heartbeat for 11 h (expected every 5 min)", "Last reading: water 14 cm, battery 42%, falling", "Condition marked UNKNOWN until device is diagnosed"] },
  { id: "AL-1037", drainId: "DG-DEL-005", title: "Possible downstream restriction", detail: "Low debris estimate but persistently high water level.", severity: "high", tag: "Hydraulic", time: "Today 04:48", status: "acknowledged", evidence: ["Level has stayed above 55 cm for 6 h", "Basket fill estimate only 35%", "Upstream unit DG-DEL-006 draining normally — restriction likely below inlet"] },
  { id: "AL-1036", drainId: "DG-DEL-006", title: "Debris and level rising", detail: "Early accumulation pattern detected; monitoring.", severity: "watch", tag: "Watch", time: "Yesterday 22:19", status: "acknowledged", evidence: ["Basket estimate rose 14 points in 24 h", "Water level trending up slowly with light rain"] },
  { id: "AL-1035", drainId: "DG-DEL-009", title: "Level rising with heavy rainfall", detail: "Within capacity so far; flagged for monitoring.", severity: "watch", tag: "Watch", time: "Yesterday 21:03", status: "resolved", evidence: ["Rainfall peaked at 16 mm/h", "Level stayed under 45 cm and recovered after rain eased"] },
  { id: "AL-1034", drainId: "DG-DEL-012", title: "Low battery before contact lost", detail: "Battery reached 18% with poor solar charging; device later went offline.", severity: "offline", tag: "Power", time: "2 days ago", status: "acknowledged", evidence: ["Charge current near zero for 3 days (panel possibly shaded or fouled)", "Battery declined 61% → 18% over 48 h"] },
];

export interface Assessment {
  drainId: string;
  issue: string;
  confidence: number;
  evidence: string[];
  action: string;
  severity: Severity;
}

export const ASSESSMENTS: Assessment[] = [
  { drainId: "DG-DEL-001", issue: "Possible full-surface inlet obstruction", confidence: 0.86, severity: "critical", evidence: ["Rising basket-fill estimate together with rising water level", "Inlet response far below expected drain-down rate for current rainfall", "Pattern matches previous obstruction event on 2025-08-23"], action: "Dispatch urgent inspection of the guard surface and debris basket. Verify emergency flow path is clear." },
  { drainId: "DG-DEL-011", issue: "Drainage overload or developing blockage", confidence: 0.74, severity: "critical", evidence: ["Rapid water-level rise during heavy rainfall", "Debris estimate moderate — hydraulic overload cannot be excluded", "Underpass sump is a known high-consequence location"], action: "Issue high-priority warning, assess site, and pre-position pumping capacity if rain continues." },
  { drainId: "DG-DEL-005", issue: "Possible downstream restriction or back-pressure", confidence: 0.68, severity: "high", evidence: ["Persistently high water level with low debris estimate", "Neighbouring upstream unit draining normally", "Level does not recover between rain bursts"], action: "Inspect the drain channel and outlet downstream of the inlet, not just the guard." },
  { drainId: "DG-DEL-002", issue: "Basket approaching cleaning threshold", confidence: 0.81, severity: "clean-soon", evidence: ["Fill estimate 86% vs 85% configured threshold", "21 days since last logged cleaning", "Estimate is model-derived — verify on site"], action: "Schedule cleaning within 48 h and verify sensor readings during the visit." },
  { drainId: "DG-DEL-003", issue: "Sensor, wiring or power fault — condition unknown", confidence: 0.9, severity: "offline", evidence: ["Heartbeat missing for 11 h", "Battery was declining before loss of contact", "No diagnostic data available since 05:12"], action: "Mark status as uncertain. Diagnose power and communication on site. Do not treat last report as current." },
];

export interface Job {
  id: string;
  drainId: string;
  title: string;
  assignee: string;
  priority: "Urgent" | "High" | "Routine";
  due: string;
  status: "Open" | "In progress" | "Done";
}

export const JOBS: Job[] = [
  { id: "WO-311", drainId: "DG-DEL-001", title: "Urgent inlet obstruction inspection", assignee: "R. Sharma (Team Alpha)", priority: "Urgent", due: "Today 12:00", status: "In progress" },
  { id: "WO-310", drainId: "DG-DEL-011", title: "Underpass site assessment during rainfall", assignee: "City crew 1", priority: "Urgent", due: "Today 11:00", status: "Open" },
  { id: "WO-309", drainId: "DG-DEL-002", title: "Debris basket cleaning", assignee: "A. Verma (Team Alpha)", priority: "High", due: "Tomorrow", status: "Open" },
  { id: "WO-308", drainId: "DG-DEL-003", title: "Power and comms diagnosis", assignee: "K. Iyer (Team Bravo)", priority: "High", due: "Today 15:00", status: "Open" },
  { id: "WO-307", drainId: "DG-DEL-005", title: "Downstream channel inspection", assignee: "R. Sharma (Team Alpha)", priority: "High", due: "In 2 days", status: "Open" },
  { id: "WO-306", drainId: "DG-DEL-012", title: "Solar panel check and battery swap", assignee: "City crew 1", priority: "Routine", due: "This week", status: "Open" },
  { id: "WO-305", drainId: "DG-DEL-006", title: "Scheduled 30-day inspection", assignee: "K. Iyer (Team Bravo)", priority: "Routine", due: "In 4 days", status: "Open" },
  { id: "WO-302", drainId: "DG-DEL-004", title: "Debris basket cleaning", assignee: "A. Verma (Team Alpha)", priority: "Routine", due: "Completed yesterday", status: "Done" },
];

export const MAINT_LOGS = [
  { date: "2025-10-09", drainId: "DG-DEL-004", worker: "A. Verma", action: "Cleaning", notes: "Removed ~2.1 kg leaves and plastic film. Basket and emergency path clear after cleaning. Sensor cross-check OK." },
  { date: "2025-10-06", drainId: "DG-DEL-007", worker: "R. Sharma", action: "Inspection", notes: "Grate intact, no corrosion. Water-level sensor reading matched manual gauge within 1 cm." },
  { date: "2025-09-28", drainId: "DG-DEL-001", worker: "R. Sharma", action: "Repair", notes: "Re-seated loose grate corner; replaced worn basket handle. Noted recurring plastic-bag debris from market side." },
  { date: "2025-09-19", drainId: "DG-DEL-002", worker: "A. Verma", action: "Cleaning", notes: "Basket at ~80% on arrival (estimate had shown 77%). Removed silt and leaves." },
];

// Deterministic pseudo-random series so charts are stable between renders.
function mulberry(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Point {
  t: string;
  level: number;
  rain: number;
  battery: number;
}

/** 24 h of simulated 30-min readings, shaped by the drain's current state. */
export function seriesFor(drainId: string): Point[] {
  const d = DRAINS.find((x) => x.id === drainId);
  const seed = drainId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rnd = mulberry(seed);
  const pts: Point[] = [];
  const targetLevel = d?.waterLevelCm ?? 20;
  const baseBatt = d?.batteryPct ?? 80;
  for (let i = 0; i < 48; i++) {
    const h = (i / 2 + 10) % 24;
    const frac = i / 47;
    // rain builds through the window
    const rain = Math.max(0, (frac > 0.55 ? (frac - 0.55) * 30 : frac * 3) + (rnd() - 0.5) * 2);
    const level = Math.max(2, 8 + (targetLevel - 8) * Math.pow(frac, 1.6) + (rnd() - 0.5) * 4);
    const battery = Math.min(100, Math.max(5, baseBatt + Math.sin((h - 13) / 3.8) * 6 + (rnd() - 0.5) * 2));
    const hh = String(Math.floor(h)).padStart(2, "0");
    const mm = i % 2 === 0 ? "00" : "30";
    pts.push({ t: `${hh}:${mm}`, level: Math.round(level), rain: Math.round(rain * 10) / 10, battery: Math.round(battery) });
  }
  return pts;
}

export const RAIN_EVENTS = [
  { month: "May", events: 3, blockages: 1, avgResponseMin: 95 },
  { month: "Jun", events: 7, blockages: 3, avgResponseMin: 82 },
  { month: "Jul", events: 11, blockages: 5, avgResponseMin: 64 },
  { month: "Aug", events: 12, blockages: 4, avgResponseMin: 51 },
  { month: "Sep", events: 8, blockages: 2, avgResponseMin: 43 },
  { month: "Oct", events: 4, blockages: 2, avgResponseMin: 38 },
];

export const EVENTS_FEED = [
  { time: "09:42", text: "CRITICAL alert raised for DG-DEL-001 (inlet obstruction pattern)", kind: "critical" },
  { time: "09:38", text: "Work order WO-311 set to In progress by R. Sharma", kind: "info" },
  { time: "09:31", text: "CRITICAL alert raised for DG-DEL-011 (rapid rise in heavy rain)", kind: "critical" },
  { time: "08:57", text: "Clean Soon alert for DG-DEL-002 (basket estimate 86%)", kind: "attention" },
  { time: "08:40", text: "Operator demo.ops acknowledged AL-1037 (DG-DEL-005)", kind: "info" },
  { time: "05:12", text: "DG-DEL-003 marked OFFLINE — heartbeat missing", kind: "offline" },
  { time: "Yesterday", text: "Cleaning completed on DG-DEL-004 — 2.1 kg debris removed", kind: "ok" },
];
