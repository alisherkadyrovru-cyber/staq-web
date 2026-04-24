'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

const COUNTRIES = [
  { name: 'Turkey', code: '+90' },
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Germany', code: '+49' },
  { name: 'France', code: '+33' },
  { name: 'Russia', code: '+7' },
  { name: 'Kazakhstan', code: '+7' },
  { name: 'UAE', code: '+971' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Italy', code: '+39' },
  { name: 'Spain', code: '+34' },
  { name: 'Netherlands', code: '+31' },
  { name: 'Poland', code: '+48' },
  { name: 'Ukraine', code: '+380' },
  { name: 'Azerbaijan', code: '+994' },
  { name: 'Georgia', code: '+995' },
  { name: 'Japan', code: '+81' },
  { name: 'China', code: '+86' },
  { name: 'India', code: '+91' },
  { name: 'Brazil', code: '+55' },
];

export default function PersonalDetailsPage() {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);

  const [nickname, setNickname] = useState(profile?.name ?? '');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0].name);
  const [mobile, setMobile] = useState('');
  const [toast, setToast] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.name === country) ?? COUNTRIES[0];

  function showToast() {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  function handleSave() {
    showToast();
  }

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-14 pb-6">
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={22} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">Personal Details</h1>
        </div>

        {/* Form */}
        <div className="flex-1 px-5 flex flex-col gap-5">

          <Field label="Nickname">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Your nickname"
              className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
              style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
            />
          </Field>

          <Field label="Date of Birth">
            <input
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="DD/MM/YYYY"
              maxLength={10}
              className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
              style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              value={profile?.email ?? ''}
              readOnly
              className="w-full rounded-xl px-4 py-3.5 text-base outline-none cursor-not-allowed"
              style={{ backgroundColor: '#0d0d22', border: '1px solid rgba(255,255,255,0.06)', color: '#4a4a6a' }}
            />
          </Field>

          <Field label="Country">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
              style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', appearance: 'none' }}
            >
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name} style={{ backgroundColor: '#12122a' }}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </Field>

          <Field label="Mobile Number">
            <div className="flex gap-2">
              <div
                className="flex items-center justify-center rounded-xl px-3 text-sm font-semibold"
                style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.1)', color: '#f59e0b', minWidth: 64 }}
              >
                {selectedCountry.code}
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="5XX XXX XXXX"
                className="flex-1 rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
                style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
              />
            </div>
          </Field>

          <button
            onClick={handleSave}
            className="w-full rounded-2xl py-4 font-bold text-base mt-2 transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: '#f59e0b', color: '#0a0a1a' }}
          >
            Save Changes
          </button>
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-2xl px-6 py-3 text-sm font-semibold z-50"
          style={{ backgroundColor: '#22c55e', color: '#ffffff', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          Details updated
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</label>
      {children}
    </div>
  );
}
