'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { QuestStep } from '@/lib/types';

function makeStepIcon(color: string, size = 28) {
  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};border:2.5px solid #fff;
      box-shadow:0 2px 5px rgba(0,0,0,0.28);
      display:flex;align-items:center;justify-content:center;
    "></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const FIRST_ICON = makeStepIcon('#4f46e5', 30);
const LAST_ICON  = makeStepIcon('#f59e0b', 30);
const MID_ICON   = makeStepIcon('#94a3b8', 22);

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(L.latLngBounds(positions), { padding: [24, 24], maxZoom: 15 });
    } else if (positions.length === 1) {
      map.setView(positions[0], 15);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function QuestRouteMap({ steps }: { steps: QuestStep[] }) {
  const positions: [number, number][] = steps.map((s) => [s.location.latitude, s.location.longitude]);

  if (positions.length === 0) return null;

  return (
    <MapContainer
      center={positions[0]}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitBounds positions={positions} />

      {positions.length > 1 && (
        <Polyline positions={positions} color="#4f46e5" weight={3} opacity={0.8} />
      )}

      {steps.map((step, i) => {
        const icon =
          i === 0 ? FIRST_ICON :
          i === steps.length - 1 ? LAST_ICON :
          MID_ICON;
        return (
          <Marker
            key={step.id}
            position={[step.location.latitude, step.location.longitude]}
            icon={icon}
          />
        );
      })}
    </MapContainer>
  );
}
