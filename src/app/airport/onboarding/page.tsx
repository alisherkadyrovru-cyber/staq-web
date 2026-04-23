'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCityStore } from '@/lib/store/cityStore';

// ─── Static data ──────────────────────────────────────────────────────────────

type Transport = 'taxi' | 'transfer' | 'public';
type Airport   = 'IST' | 'SAW';

const TRANSPORT_STEPS: Record<Transport, { title: string; detail: string }[]> = {
  taxi: [
    { title: 'Exit arrivals',         detail: 'Follow signs to "Taxi / Taksi" outside the terminal.' },
    { title: 'Use official taxis only', detail: 'Yellow taxis with meters. Avoid unlicensed drivers.' },
    { title: 'Confirm meter is running', detail: 'Fare starts at ~₺50. Ask the driver to start the meter.' },
    { title: 'Pay on arrival',         detail: 'Most taxis accept cash only. Keep small bills handy.' },
    { title: 'Arrive & explore!',      detail: "Drop off at your hotel. You're ready for your first quest 🎉" },
  ],
  transfer: [
    { title: 'Find your driver',       detail: 'Look for your name or hotel name on a sign in arrivals.' },
    { title: 'Confirm the destination', detail: 'Double-check the hotel name before getting in.' },
    { title: 'Relax on the way',       detail: 'Transfer takes 40–75 min depending on traffic.' },
    { title: 'Check in',               detail: 'The driver may help with luggage. Tip is appreciated.' },
    { title: 'Arrive & explore!',      detail: 'Freshen up and launch your first Istanbul quest 🎉' },
  ],
  public: [
    { title: 'Buy an Istanbulkart',    detail: 'Get a transit card at machines near the exits. Load ₺50+.' },
    { title: 'Take Havataş bus',       detail: 'Bus stop is outside the terminal. Taksim Square takes ~90 min.' },
    { title: 'Or take metro M11',      detail: 'Direct train to Gayrettepe, then transfer to M2. Faster at peak.' },
    { title: 'Mind your luggage',      detail: 'Buses and metros can be crowded. Keep bags in front of you.' },
    { title: 'Arrive & explore!',      detail: 'Welcome to Istanbul — your quest begins now 🎉' },
  ],
};

const COLLAGE_WORDS = [
  { text: 'Sultanahmet',   x: '5%',  y: '8%',  size: 18, rot: '-15deg', op: 0.09 },
  { text: 'Galata',        x: '60%', y: '5%',  size: 22, rot: '12deg',  op: 0.07 },
  { text: 'Bosphorus',     x: '30%', y: '12%', size: 14, rot: '-8deg',  op: 0.10 },
  { text: 'Kapalıçarşı',   x: '70%', y: '18%', size: 16, rot: '20deg',  op: 0.08 },
  { text: 'Beyoğlu',       x: '10%', y: '22%', size: 20, rot: '-25deg', op: 0.06 },
  { text: 'Üsküdar',       x: '50%', y: '25%', size: 13, rot: '7deg',   op: 0.11 },
  { text: 'Taksim',        x: '78%', y: '32%', size: 24, rot: '-10deg', op: 0.07 },
  { text: 'Hagia Sophia',  x: '2%',  y: '35%', size: 12, rot: '18deg',  op: 0.09 },
  { text: 'Topkapı',       x: '40%', y: '38%', size: 17, rot: '-22deg', op: 0.08 },
  { text: 'Kadıköy',       x: '65%', y: '44%', size: 21, rot: '14deg',  op: 0.06 },
  { text: 'Boğaziçi',      x: '15%', y: '48%', size: 15, rot: '-5deg',  op: 0.10 },
  { text: 'Eminönü',       x: '82%', y: '52%', size: 13, rot: '28deg',  op: 0.08 },
  { text: 'Balat',         x: '35%', y: '55%', size: 26, rot: '-18deg', op: 0.07 },
  { text: 'Ortaköy',       x: '55%', y: '60%', size: 14, rot: '9deg',   op: 0.11 },
  { text: 'Golden Horn',   x: '5%',  y: '63%', size: 16, rot: '-12deg', op: 0.09 },
  { text: 'Dolmabahçe',    x: '68%', y: '67%', size: 18, rot: '22deg',  op: 0.07 },
  { text: 'Rumelihisarı',  x: '20%', y: '70%', size: 12, rot: '-28deg', op: 0.08 },
  { text: 'Çamlıca',       x: '45%', y: '74%', size: 20, rot: '5deg',   op: 0.06 },
  { text: 'Bebek',         x: '75%', y: '78%', size: 28, rot: '-15deg', op: 0.07 },
  { text: 'Arnavutköy',   x: '8%',  y: '80%', size: 14, rot: '16deg',  op: 0.09 },
  { text: 'Moda',          x: '55%', y: '83%', size: 22, rot: '-8deg',  op: 0.10 },
  { text: 'Karaköy',       x: '30%', y: '87%', size: 16, rot: '24deg',  op: 0.08 },
  { text: 'Cihangir',      x: '70%', y: '90%', size: 13, rot: '-20deg', op: 0.07 },
  { text: 'Nişantaşı',     x: '15%', y: '92%', size: 19, rot: '11deg',  op: 0.09 },
  { text: 'Beşiktaş',      x: '48%', y: '95%', size: 15, rot: '-6deg',  op: 0.10 },
  { text: 'Sarıyer',       x: '80%', y: '97%', size: 17, rot: '18deg',  op: 0.08 },
  { text: 'Princes Islands', x: '25%', y: '17%', size: 12, rot: '30deg', op: 0.06 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Collage() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {COLLAGE_WORDS.map((w) => (
        <span
          key={w.text}
          style={{
            position: 'absolute',
            left: w.x,
            top: w.y,
            fontSize: w.size,
            opacity: w.op,
            color: '#0f172a',
            fontWeight: 700,
            transform: `rotate(${w.rot})`,
            whiteSpace: 'nowrap',
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

function Dots({ current }: { current: number }) {
  return (
    <div className="flex justify-center gap-2 py-3.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            height: 8,
            width: i === current ? 24 : 8,
            borderRadius: 4,
            backgroundColor: i === current ? '#4f46e5' : '#cbd5e1',
            transition: 'width 0.25s ease',
          }}
        />
      ))}
    </div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function AirportOnboardingPage() {
  const router = useRouter();
  const setOnboardingComplete = useCityStore((s) => s.setOnboardingComplete);
  const [step,               setStep]               = useState(0);
  const [selectedAirport,    setSelectedAirport]    = useState<Airport | null>(null);
  const [selectedTransport,  setSelectedTransport]  = useState<Transport | null>(null);

  function finish() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('airport_onboarding_istanbul_done', 'true');
    }
    setOnboardingComplete();
    router.replace('/quests');
  }

  // ── Step 0: Airport selection ──────────────────────────────────────────────
  if (step === 0) {
    return (
      <Screen>
        <div className="flex justify-end px-5 pt-10">
          <button onClick={finish} className="text-sm font-medium" style={{ color: '#94a3b8' }}>Skip</button>
        </div>
        <Dots current={0} />
        <div className="text-center px-6 mb-9 mt-2">
          <h1 className="text-3xl font-bold" style={{ color: '#0f172a' }}>
            You&apos;ve arrived in Istanbul!
          </h1>
          <span
            className="inline-block rounded-full px-3 py-1 text-sm font-bold mt-2"
            style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}
          >
            ISTANBUL, TURKEY
          </span>
          <p className="text-base mt-2" style={{ color: '#64748b' }}>
            Let&apos;s get you to your hotel
          </p>
        </div>

        <div className="px-5 flex flex-col gap-3">
          <AirportCard
            code="IST"
            name="Istanbul Airport"
            sub="IST — European Side"
            onPress={() => { setSelectedAirport('IST'); setStep(1); }}
          />
          <AirportCard
            code="SAW"
            name="Sabiha Gökçen Airport"
            sub="SAW — Asian Side"
            onPress={() => { setSelectedAirport('SAW'); setStep(1); }}
          />
        </div>
      </Screen>
    );
  }

  // ── Step 1: Transport selection ─────────────────────────────────────────────
  if (step === 1) {
    const options: { id: Transport; label: string; desc: string }[] = [
      { id: 'taxi',     label: 'Taxi',             desc: 'Metered taxi • ~45–70 min • ~400–600 TL'                       },
      { id: 'transfer', label: 'Private Transfer',  desc: 'Pre-booked shuttle • Look for your name on a sign'             },
      { id: 'public',   label: 'Public Transport',  desc: 'Metro M11 • ~1.5 hours • Cheapest option'                     },
    ];
    return (
      <Screen>
        <div className="flex items-center justify-between px-5 pt-10">
          <button onClick={() => setStep(0)} className="flex items-center gap-1 font-semibold" style={{ color: '#4f46e5' }}>
            <ChevronLeft size={20} color="#4f46e5" />Back
          </button>
          <button onClick={finish} className="text-sm font-medium" style={{ color: '#94a3b8' }}>Skip</button>
        </div>
        <Dots current={1} />
        <h2 className="text-2xl font-bold px-5 pb-5" style={{ color: '#0f172a' }}>
          How are you getting to your hotel?
        </h2>
        <div className="px-4 flex flex-col gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => { setSelectedTransport(opt.id); setStep(2); }}
              className="w-full text-left rounded-2xl p-5 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
            >
              <p className="font-bold text-lg" style={{ color: '#0f172a' }}>{opt.label}</p>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>{opt.desc}</p>
            </button>
          ))}
        </div>
      </Screen>
    );
  }

  // ── Step 2: Step-by-step guide ──────────────────────────────────────────────
  if (step === 2 && selectedTransport) {
    const guideSteps = TRANSPORT_STEPS[selectedTransport];
    const labels: Record<Transport, string> = {
      taxi: 'Taxi', transfer: 'Private Transfer', public: 'Public Transport',
    };
    return (
      <Screen>
        <div className="flex items-center justify-between px-5 pt-10 pb-0">
          <button
            onClick={() => { setStep(1); setSelectedTransport(null); }}
            className="flex items-center gap-1 font-semibold"
            style={{ color: '#4f46e5' }}
          >
            <ChevronLeft size={20} color="#4f46e5" />Back
          </button>
          <button onClick={finish} className="text-sm font-medium" style={{ color: '#94a3b8' }}>Skip</button>
        </div>
        <Dots current={2} />
        <div className="px-5 pb-3">
          <h2 className="text-xl font-bold" style={{ color: '#0f172a' }}>{labels[selectedTransport]}</h2>
          {selectedAirport && (
            <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
              From {selectedAirport === 'IST' ? 'Istanbul Airport' : 'Sabiha Gökçen Airport'}
            </p>
          )}
        </div>

        {/* Guide steps — scrollable content above fixed CTA */}
        <div className="overflow-y-auto pb-36 px-4 flex flex-col gap-2.5" style={{ flex: 1 }}>
          {guideSteps.map((item, i) => (
            <div
              key={i}
              className="flex gap-3.5 rounded-2xl p-4"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: 28, height: 28, backgroundColor: '#4f46e5' }}
              >
                <span className="text-xs font-bold text-white">{i + 1}</span>
              </div>
              <div>
                <p className="font-semibold text-[15px]" style={{ color: '#0f172a' }}>{item.title}</p>
                <p className="text-sm mt-1 leading-snug" style={{ color: '#64748b' }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed CTA */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-10 pt-4"
          style={{ backgroundColor: 'rgba(248,250,252,0.97)', borderTop: '1px solid #e2e8f0' }}
        >
          <button
            onClick={finish}
            className="w-full rounded-2xl py-4 font-bold text-white text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#f59e0b' }}
          >
            Done — Show me quests! →
          </button>
        </div>
      </Screen>
    );
  }

  return null;
}

// ─── Shared wrapper ───────────────────────────────────────────────────────────

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative flex flex-col" style={{ backgroundColor: '#f8fafc' }}>
      <Collage />
      <div className="relative z-10 w-full max-w-[430px] mx-auto flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}

function AirportCard({
  name, sub, onPress,
}: {
  code: string; name: string; sub: string; onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className="w-full flex items-center gap-4 rounded-2xl p-4.5 text-left transition-opacity hover:opacity-90"
      style={{ backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', padding: 18 }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{ width: 48, height: 48, backgroundColor: '#ede9fe' }}
      >
        <Plane size={22} color="#4f46e5" style={{ transform: 'rotate(-45deg)' }} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-base" style={{ color: '#0f172a' }}>{name}</p>
        <p className="text-sm mt-0.5" style={{ color: '#64748b' }}>{sub}</p>
      </div>
      <ChevronRight size={18} color="#cbd5e1" />
    </button>
  );
}
