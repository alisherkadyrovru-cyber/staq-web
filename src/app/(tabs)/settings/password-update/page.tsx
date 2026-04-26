'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Eye, EyeOff, Info } from 'lucide-react';

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
      <label className="text-sm font-medium" style={{ color: '#475569' }}>{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? '••••••••'}
          className="w-full rounded-xl px-4 py-3.5 pr-12 text-base outline-none focus:ring-2 focus:ring-indigo-400"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {show
            ? <EyeOff size={18} color="#94a3b8" />
            : <Eye size={18} color="#94a3b8" />}
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
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%' }}>

      {/* Header */}
      <div
        className="sticky top-0 z-10 relative flex items-center justify-center px-4"
        style={{ height: 56, backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}
      >
        <button
          onClick={() => router.back()}
          className="absolute left-4 flex items-center gap-1"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5' }}
        >
          <ChevronLeft size={22} color="#4f46e5" />
          <span className="text-[15px] font-semibold">Back</span>
        </button>
        <span className="font-bold text-[17px]" style={{ color: '#0f172a' }}>Password Update</span>
      </div>

      <div className="px-5 pt-5 pb-8 flex flex-col gap-5">

        <PasswordInput label="Current Password" value={current} onChange={setCurrent} />
        <PasswordInput label="New Password" value={next} onChange={setNext} />
        <PasswordInput label="Repeat New Password" value={repeat} onChange={setRepeat} />

        {/* Rules */}
        <div
          className="flex gap-3 rounded-2xl p-4"
          style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}
        >
          <Info size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
          <div className="text-sm leading-relaxed" style={{ color: '#0c4a6e' }}>
            <p>• 10 to 64 characters</p>
            <p>• At least one uppercase letter</p>
            <p>• At least one lowercase letter</p>
            <p>• At least one number</p>
          </div>
        </div>

        {error && (
          <div
            className="rounded-xl px-4 py-3 text-sm"
            style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleUpdate}
          className="w-full rounded-2xl py-4 font-bold text-base transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#f59e0b', color: '#ffffff' }}
        >
          Update Password
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 rounded-2xl px-6 py-3 text-sm font-semibold z-50"
          style={{ backgroundColor: '#22c55e', color: '#ffffff', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
        >
          Password updated
        </div>
      )}
    </div>
  );
}
