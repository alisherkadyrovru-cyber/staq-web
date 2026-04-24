'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Info } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-14 pb-6">
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={22} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">Change Email</h1>
        </div>

        <div className="flex-1 px-5 flex flex-col gap-5">

          {/* Info box */}
          <div
            className="flex gap-3 rounded-2xl p-4"
            style={{ backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}
          >
            <Info size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Changing your email will log you out. You will need to sign in again using your new email address.
            </p>
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
              {error}
            </div>
          )}

          {/* Current email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Current Email</label>
            <input
              type="email"
              value={profile?.email ?? ''}
              readOnly
              className="w-full rounded-xl px-4 py-3.5 text-base outline-none cursor-not-allowed"
              style={{ backgroundColor: '#0d0d22', border: '1px solid rgba(255,255,255,0.06)', color: '#4a4a6a' }}
            />
          </div>

          {/* Mobile (read-only placeholder) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Mobile Number</label>
            <input
              type="tel"
              value="+90 5XX XXX XXXX"
              readOnly
              className="w-full rounded-xl px-4 py-3.5 text-base outline-none cursor-not-allowed"
              style={{ backgroundColor: '#0d0d22', border: '1px solid rgba(255,255,255,0.06)', color: '#4a4a6a' }}
            />
          </div>

          {/* New email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>New Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="new@example.com"
              disabled={codeSent}
              className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
              style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
            />
          </div>

          {!codeSent ? (
            <button
              onClick={handleSendCode}
              disabled={loading}
              className="w-full rounded-2xl py-4 font-bold text-base transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center"
              style={{ backgroundColor: '#f59e0b', color: '#0a0a1a' }}
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                'Send Confirmation Code'
              )}
            </button>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Confirmation Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit code"
                  inputMode="numeric"
                  className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-amber-400"
                  style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff' }}
                />
              </div>
              <button
                onClick={handleUpdate}
                className="w-full rounded-2xl py-4 font-bold text-base transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#f59e0b', color: '#0a0a1a' }}
              >
                Update Email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
