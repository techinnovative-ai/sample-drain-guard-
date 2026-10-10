"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import type { Drain } from "@/lib/data";
import { SEVERITY_LABEL, statusGroup } from "@/lib/data";

const GROUP_COLOR: Record<string, string> = {
  normal: "#1f8a4c",
  attention: "#b7791f",
  critical: "#c0392b",
  offline: "#5b6b73",
};

function markerIcon(drain: Drain) {
  const g = statusGroup(drain.severity);
  const color = GROUP_COLOR[g];
  const pulse = g === "critical" ? "animation:dgpulse 1.4s infinite;" : "";
  const glyph = g === "offline" ? "?" : g === "critical" ? "!" : g === "attention" ? "▲" : "✓";
  return L.divIcon({
    className: "dg-marker",
    html: `<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;${pulse}"><span style="transform:rotate(45deg);color:#fff;font-size:11px;font-weight:700">${glyph}</span></div><style>@keyframes dgpulse{0%,100%{opacity:1}50%{opacity:.55}}</style>`,
    iconSize: [26, 26],
    iconAnchor: [13, 24],
    popupAnchor: [0, -22],
  });
}

export default function DrainMapInner({ drains, height = 420, zoom = 14 }: {
  drains: Drain[]; height?: number; zoom?: number;
}) {
  const center: [number, number] = drains.length
    ? [
        drains.reduce((a, d) => a + d.lat, 0) / drains.length,
        drains.reduce((a, d) => a + d.lng, 0) / drains.length,
      ]
    : [28.546, 77.191];

  return (
    <MapContainer center={center} zoom={zoom} style={{ height, width: "100%", borderRadius: 12 }} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {drains.map((d) => (
        <Marker key={d.id} position={[d.lat, d.lng]} icon={markerIcon(d)}>
          <Popup>
            <div style={{ minWidth: 190, fontSize: 13 }}>
              <strong>{d.id}</strong> — {SEVERITY_LABEL[d.severity]}
              <br />
              {d.name} · {d.site}, {d.zone}
              <br />
              {d.severity === "offline" ? (
                <em>Condition unknown — last contact {d.lastContact}</em>
              ) : (
                <>Water {d.waterLevelCm} cm · Basket est. {d.basketFillPct}% · {d.lastContact}</>
              )}
              <br />
              <Link href={`/app/drains/${d.id}`}>Open drain record →</Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
