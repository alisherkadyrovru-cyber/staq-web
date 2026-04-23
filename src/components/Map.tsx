'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Utensils, Sandwich, Clock, Ticket, DollarSign, Gift, Gamepad2, X, Navigation,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Location {
  id: string;
  name: string;
  category: 'restaurant' | 'street_food' | 'museum' | 'attraction';
  lat: number;
  lng: number;
  cuisine?: string;
  hours?: string;
  avgCheck?: string;
  partner?: boolean;
  offer?: string;
  type?: string;
  price?: string;
  closed?: string;
  hasQuest?: boolean;
}

// ─── Static data (from RN map.tsx) ────────────────────────────────────────────

const LOCATIONS: Location[] = [
  { id: '1', name: 'Tarihi Karaköy Balıkçısı', category: 'restaurant',  lat: 41.0197, lng: 28.9745, cuisine: 'Seafood',   hours: '12:00–23:00', avgCheck: '$15–25', partner: true,  offer: '10% discount for STaQ users' },
  { id: '2', name: 'Çiya Sofrası',              category: 'restaurant',  lat: 40.9912, lng: 29.0239, cuisine: 'Anatolian', hours: '11:00–22:00', avgCheck: '$10–18', partner: true,  offer: 'Free dessert with main course' },
  { id: '3', name: 'Simit Sarayı Eminönü',      category: 'street_food', lat: 41.0170, lng: 28.9742, type: 'Simit & pastries', hours: '07:00–21:00' },
  { id: '4', name: 'Karaköy Güllüoğlu',         category: 'street_food', lat: 41.0194, lng: 28.9741, type: 'Baklava',          hours: '08:00–22:00' },
  { id: '5', name: 'Hagia Sophia',              category: 'museum',      lat: 41.0086, lng: 28.9802, hours: '09:00–17:00', price: 'Free entry',   hasQuest: true  },
  { id: '6', name: 'Topkapı Palace',            category: 'museum',      lat: 41.0115, lng: 28.9833, hours: '09:00–18:00', price: '$15 entrance', closed: 'Tuesday' },
  { id: '7', name: 'Galata Tower',              category: 'attraction',  lat: 41.0256, lng: 28.9742, hours: '09:00–22:00', price: '$10 entrance', hasQuest: true  },
  { id: '8', name: 'Grand Bazaar',              category: 'attraction',  lat: 41.0108, lng: 28.9681, hours: '09:00–19:00', price: 'Free',         closed: 'Sunday' },
];

const PIN_COLORS: Record<string, string> = {
  restaurant: '#ef4444',
  street_food: '#f97316',
  museum: '#8b5cf6',
  attraction: '#3b82f6',
};

const FILTERS = ['all', 'restaurant', 'street_food', 'museum', 'attraction'] as const;
const FILTER_LABELS: Record<string, string> = {
  all: 'All', restaurant: 'Restaurants', street_food: 'Street Food',
  museum: 'Museums', attraction: 'Attractions',
};

// ─── Custom pin icon factory ──────────────────────────────────────────────────

function makeIcon(color: string) {
  const svg = `
    <div style="
      width:36px;height:36px;border-radius:50%;
      background:${color};border:2.5px solid #fff;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 6px rgba(0,0,0,0.30);
    ">
      <div style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.85);"></div>
    </div>`;
  return L.divIcon({ html: svg, className: '', iconSize: [36, 36], iconAnchor: [18, 18] });
}

// ─── "Fly to me" controller ───────────────────────────────────────────────────

function FlyToController({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, 16, { duration: 1.2 });
  }, [target, map]);
  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MapComponent() {
  const [selected, setSelected]     = useState<Location | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [flyTarget, setFlyTarget]   = useState<[number, number] | null>(null);

  const filtered =
    activeFilter === 'all' ? LOCATIONS : LOCATIONS.filter((l) => l.category === activeFilter);

  function handleMarkerClick(loc: Location) {
    setSelected(loc);
    setDrawerOpen(true);
  }

  function handleDismiss() {
    setSelected(null);
    setDrawerOpen(false);
  }

  function handleCenterOnMe() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setFlyTarget([pos.coords.latitude, pos.coords.longitude]),
      () => alert('Location access denied.'),
    );
  }

  const drawerHeight = drawerOpen ? 'calc(55vh)' : '130px';

  return (
    <div style={{ position: 'relative', height: 'calc(100dvh - 64px)', overflow: 'hidden' }}>
      {/* Leaflet map */}
      <MapContainer
        center={[41.0082, 28.9784]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <FlyToController target={flyTarget} />

        {filtered.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={makeIcon(PIN_COLORS[loc.category])}
            eventHandlers={{ click: () => handleMarkerClick(loc) }}
          />
        ))}
      </MapContainer>

      {/* "Center on me" FAB */}
      <button
        onClick={handleCenterOnMe}
        style={{
          position: 'absolute', top: 16, right: 16, zIndex: 1000,
          width: 44, height: 44, borderRadius: 22,
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.20)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer',
        }}
        title="Center on my location"
      >
        <Navigation size={20} color="#4f46e5" />
      </button>

      {/* Bottom drawer */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 999,
          height: drawerHeight,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
          boxShadow: '0 -3px 12px rgba(0,0,0,0.12)',
          transition: 'height 0.3s ease',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Drag handle — click toggles drawer */}
        <button
          onClick={() => setDrawerOpen((v) => !v)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingTop: 10, paddingBottom: 8, background: 'none', border: 'none', cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <div style={{ width: 40, height: 4, backgroundColor: '#cbd5e1', borderRadius: 2 }} />
        </button>

        {/* Filter chips */}
        <div
          style={{
            display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 10px',
            flexShrink: 0, scrollbarWidth: 'none',
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 20,
                backgroundColor: activeFilter === f ? '#0f172a' : '#ffffff',
                border: `1.5px solid ${activeFilter === f ? '#0f172a' : '#e2e8f0'}`,
                cursor: 'pointer',
                fontSize: 13, fontWeight: 500,
                color: activeFilter === f ? '#ffffff' : '#0f172a',
                whiteSpace: 'nowrap',
              }}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: '#f1f5f9', flexShrink: 0 }} />

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {selected ? (
            <LocationDetail loc={selected} onDismiss={handleDismiss} />
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}>
              <span style={{ fontSize: 32 }}>📍</span>
              <p style={{ color: '#94a3b8', marginTop: 8, fontSize: 14 }}>Tap a location to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Location detail panel ────────────────────────────────────────────────────

function LocationDetail({ loc, onDismiss }: { loc: Location; onDismiss: () => void }) {
  return (
    <div style={{ padding: 16 }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>{loc.name}</p>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 2, textTransform: 'capitalize' }}>
            {loc.category.replace('_', ' ')}
          </p>
        </div>
        <button
          onClick={onDismiss}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <X size={22} color="#94a3b8" />
        </button>
      </div>

      {/* Details */}
      {loc.hours && (
        <DetailRow icon={<Clock size={16} color="#64748b" />} text={loc.hours} extra={loc.closed ? `· Closed ${loc.closed}` : undefined} />
      )}
      {loc.cuisine && (
        <DetailRow icon={<Utensils size={16} color="#64748b" />} text={loc.cuisine} />
      )}
      {loc.avgCheck && (
        <DetailRow icon={<DollarSign size={16} color="#64748b" />} text={`Avg. ${loc.avgCheck}`} />
      )}
      {loc.price && (
        <DetailRow icon={<Ticket size={16} color="#64748b" />} text={loc.price} />
      )}
      {loc.type && (
        <DetailRow icon={<Sandwich size={16} color="#64748b" />} text={loc.type} />
      )}

      {/* Partner offer */}
      {loc.partner && loc.offer && (
        <div style={{ backgroundColor: '#fef9c3', borderRadius: 10, padding: 12, marginTop: 8, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Gift size={16} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ margin: 0, fontSize: 13, color: '#92400e' }}>{loc.offer}</p>
        </div>
      )}

      {/* Quest banner */}
      {loc.hasQuest && (
        <div style={{ backgroundColor: '#f0fdf4', borderRadius: 10, padding: 12, marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Gamepad2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: 13, color: '#15803d', fontWeight: 600 }}>Quest available for this location!</p>
        </div>
      )}
    </div>
  );
}

function DetailRow({ icon, text, extra }: { icon: React.ReactNode; text: string; extra?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      {icon}
      <span style={{ fontSize: 14, color: '#374151' }}>{text}</span>
      {extra && <span style={{ fontSize: 12, color: '#ef4444' }}>{extra}</span>}
    </div>
  );
}
