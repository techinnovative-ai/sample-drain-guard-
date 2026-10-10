"use client";

import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, Legend, LineChart, Line, ComposedChart, ReferenceLine,
} from "recharts";
import type { Point } from "@/lib/data";
import { RAIN_EVENTS } from "@/lib/data";

const axis = { fontSize: 11, stroke: "#5b6b73" } as const;
const grid = { stroke: "#dce2e7", strokeDasharray: "3 3" } as const;

export function LevelRainChart({ data, height = 240 }: { data: Point[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...grid} />
        <XAxis dataKey="t" tick={axis} interval={7} tickLine={false} />
        <YAxis yAxisId="l" tick={axis} tickLine={false} unit="" />
        <YAxis yAxisId="r" orientation="right" tick={axis} tickLine={false} width={34} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#dce2e7" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar yAxisId="r" dataKey="rain" name="Rainfall (mm/h)" fill="#8fb8c9" radius={[2, 2, 0, 0]} />
        <Area yAxisId="l" type="monotone" dataKey="level" name="Water level (cm)" stroke="#278567" fill="#27856722" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function BatteryChart({ data, height = 180 }: { data: Point[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...grid} />
        <XAxis dataKey="t" tick={axis} interval={7} tickLine={false} />
        <YAxis domain={[0, 100]} tick={axis} tickLine={false} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#dce2e7" }} />
        <Area type="monotone" dataKey="battery" name="Battery (%)" stroke="#12342b" fill="#12342b18" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Sparkline({ data, color = "#278567" }: { data: Point[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="level" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function WeightChart({ data, limit, height = 220 }: {
  data: { t: string; kg: number }[]; limit: number; height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...grid} />
        <XAxis dataKey="t" tick={axis} tickLine={false} minTickGap={40} />
        <YAxis domain={[0, Math.ceil(limit * 1.2)]} tick={axis} tickLine={false} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#dce2e7" }} />
        <ReferenceLine y={limit * 0.7} stroke="#b7791f" strokeDasharray="4 4"
          label={{ value: "Warning 70%", fontSize: 10, fill: "#b7791f", position: "insideTopLeft" }} />
        <ReferenceLine y={limit * 0.9} stroke="#c0392b" strokeDasharray="4 4"
          label={{ value: "Overload 90%", fontSize: 10, fill: "#c0392b", position: "insideTopLeft" }} />
        <ReferenceLine y={limit} stroke="#c0392b" strokeWidth={2}
          label={{ value: `Limit ${limit} kg`, fontSize: 10, fill: "#c0392b", position: "insideTopLeft" }} />
        <Area type="monotone" dataKey="kg" name="Basket weight (kg)" stroke="#278567" fill="#27856722" strokeWidth={2} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RainEventsChart({ height = 260 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={RAIN_EVENTS} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...grid} />
        <XAxis dataKey="month" tick={axis} tickLine={false} />
        <YAxis tick={axis} tickLine={false} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#dce2e7" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="events" name="Rain events" fill="#278567" radius={[3, 3, 0, 0]} />
        <Bar dataKey="blockages" name="Blockage alerts" fill="#b7791f" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ResponseChart({ height = 260 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={RAIN_EVENTS} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...grid} />
        <XAxis dataKey="month" tick={axis} tickLine={false} />
        <YAxis tick={axis} tickLine={false} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#dce2e7" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="avgResponseMin" name="Avg response time (min)" stroke="#c0392b" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
