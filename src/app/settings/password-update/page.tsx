'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff, Info } from 'lucide-react';

function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? '••••••••'}
          className="w-full rounded-xl px-4 py-3.5 pr-12 text-base outline-none focus:ring-2 focus:ring-amber-400"
          style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {show ? <EyeOff size={18} color="rgba(255,255,255,0.4)" /> : <Eye size={18} color="rgba(255,255,255,0.4)" />}
        </button>
      </div>
    </div>
  );
}

export default function PasswordUpdatePage() {
  const router = useRouter();

  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState(false);

  function validate() {
    if (!current) return 'Please enter your current password.';
    if (next.length < 10 || next.length > 64) return 'New password must be 10–64 characters.';
    if (!/[A-Z]/.test(next)) return 'New password must contain at least one uppercase letter.';
    if (!/[a-z]/.test(next)) return 'New password must contain at least one lowercase letter.';
    if (!/[0-9]/.test(next)) return 'New password must contain at least one number.';
    if (next !== repeat) return 'Passwords do not match.';
    return null;
  }

  function handleUpdate() {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setToast(true);
    setTimeout(() => {
      setToast(false);
      router.back();
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-14 pb-6">
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={22} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">Password Update</h1>
        </div>

        <div className="flex-1 px-5 flex flex-col gap-5">

          <PasswordInput label="Current Password" value={current} onChange={setCurrent} />
          <PasswordInput label="New Password" value={next} onChange={setNext} />
          <PasswordInput label="Repeat New Password" value={repeat} onChange={setRepeat} />

          {/* Rules */}
          <div
            className="flex gap-3 rounded-2xl p-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Info size={16} color="rgba(255,255,255,0.4)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <p>• 10 to 64 characters</p>
              <p>• At least one uppercase letter</p>
              <p>• At least one lowercase letter</p>
              <p>• At least one number</p>
            </div>
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <button
            onClick={handleUpdate}
            className="w-full rounded-2xl py-4 font-bold text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#f59e0b', color: '#0a0a1a' }}
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-2xl px-6 py-3 text-sm font-semibold z-50"
          style={{ backgroundColor: '#22c55e', color: '#ffffff', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          Password updated
        </div>
      )}
    </div>
  );
}
