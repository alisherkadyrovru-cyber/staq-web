'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { QuestStep, LatLng } from '@/lib/types';

// ─── Icon factories ───────────────────────────────────────────────────────────

function makeIcon(color: string, size: number, pulse = false) {
  const ring = pulse
    ? `<div style="
        position:absolute;inset:-6px;border-radius:50%;
        border:3px solid ${color};opacity:0.4;
        animation:aq-pulse 1.6s ease-out infinite;
      "></div>`
    : '';
  return L.divIcon({
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;">
        ${ring}
        <div style="
          width:${size}px;height:${size}px;border-radius:50%;
          background:${color};border:2.5px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,0.30);
        "></div>
      </div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const USER_ICON = L.divIcon({
  html: `<div style="
    width:16px;height:16px;border-radius:50%;
    background:#3b82f6;border:3px solid #fff;
    box-shadow:0 1px 4px rgba(0,0,0,0.4);
  "></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// ─── CSS animation injected once ─────────────────────────────────────────────
if (typeof document !== 'undefined') {
  const id = 'aq-pulse-style';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `@keyframes aq-pulse{0%{transform:scale(1);opacity:0.5}100%{transform:scale(2.2);opacity:0}}`;
    document.head.appendChild(s);
  }
}

// ─── FlyTo controller ─────────────────────────────────────────────────────────

function FlyTo({ target, zoom }: { target: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(target, zoom, { duration: 1.0 });
  }, [target[0], target[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  steps: QuestStep[];
  currentStepIndex: number;
  userLocation: LatLng | null;
}

export default function ActiveQuestMap({ steps, currentStepIndex, userLocation }: Props) {
  const current = steps[currentStepIndex];
  if (!current) return null;

  const center: [number, number] = [current.location.latitude, current.location.longitude];
  const polyline: [number, number][] = steps.map((s) => [s.location.latitude, s.location.longitude]);

  return (
    <MapContainer
      center={center}
      zoom={16}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FlyTo target={center} zoom={16} />

      {/* Route polyline */}
      <Polyline positions={polyline} color="#4f46e5" weight={3} opacity={0.5} dashArray="8 6" />

      {/* Step markers */}
      {steps.map((step, i) => {
        const isCurrent   = i === currentStepIndex;
        const isCompleted = i < currentStepIndex;
        const icon = isCurrent
          ? makeIcon('#4f46e5', 34, true)
          : isCompleted
          ? makeIcon('#22c55e', 24)
          : makeIcon('#94a3b8', 22);

        return (
          <Marker
            key={step.id}
            position={[step.location.latitude, step.location.longitude]}
            icon={icon}
          />
        );
      })}

      {/* User location */}
      {userLocation && (
        <Marker
          position={[userLocation.latitude, userLocation.longitude]}
          icon={USER_ICON}
        />
      )}
    </MapContainer>
  );
}
