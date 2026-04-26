'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Info } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

export default function ChangeEmailPage() {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const logout = useAuthStore((s) => s.logout);

  const [newEmail, setNewEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSendCode() {
    if (!newEmail.trim() || !newEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCodeSent(true);
    }, 800);
  }

  function handleUpdate() {
    if (!code.trim()) {
      setError('Please enter the confirmation code.');
      return;
    }
    logout();
    router.replace('/welcome');
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
        <span className="font-bold text-[17px]" style={{ color: '#0f172a' }}>Change Email</span>
      </div>

      <div className="px-5 pt-5 pb-8 flex flex-col gap-5">

        {/* Info box */}
        <div
          className="flex gap-3 rounded-2xl p-4"
          style={{ backgroundColor: '#fffbeb', border: '1px solid #fcd34d' }}
        >
          <Info size={18} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
          <p className="text-sm leading-relaxed" style={{ color: '#92400e' }}>
            Changing your email will log you out. You will need to sign in again using your new email address.
          </p>
        </div>

        {error && (
          <div
            className="rounded-xl px-4 py-3 text-sm"
            style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" style={{ color: '#475569' }}>Current Email</label>
          <input
            type="email"
            value={profile?.email ?? ''}
            readOnly
            className="w-full rounded-xl px-4 py-3.5 text-base outline-none cursor-not-allowed"
            style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#94a3b8' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" style={{ color: '#475569' }}>Mobile Number</label>
          <input
            type="tel"
            value="+90 5XX XXX XXXX"
            readOnly
            className="w-full rounded-xl px-4 py-3.5 text-base outline-none cursor-not-allowed"
            style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#94a3b8' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" style={{ color: '#475569' }}>New Email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="new@example.com"
            disabled={codeSent}
            className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }}
          />
        </div>

        {!codeSent ? (
          <button
            onClick={handleSendCode}
            disabled={loading}
            className="w-full rounded-2xl py-4 font-bold text-base transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center"
            style={{ backgroundColor: '#f59e0b', color: '#ffffff' }}
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Send Confirmation Code'
            )}
          </button>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" style={{ color: '#475569' }}>Confirmation Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit code"
                inputMode="numeric"
                className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-indigo-400"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }}
              />
            </div>
            <button
              onClick={handleUpdate}
              className="w-full rounded-2xl py-4 font-bold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#f59e0b', color: '#ffffff' }}
            >
              Update Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
