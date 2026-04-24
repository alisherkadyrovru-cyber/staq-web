'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

export default function DeleteAccountPage() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const [confirm, setConfirm] = useState('');

  const canDelete = confirm === 'DELETE';

  function handleDelete() {
    if (!canDelete) return;
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
          <h1 className="text-xl font-bold text-white">Delete Account</h1>
        </div>

        <div className="flex-1 px-5 flex flex-col gap-6 pb-10">

          {/* Warning icon */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 80, height: 80, backgroundColor: 'rgba(239,68,68,0.12)' }}
            >
              <AlertTriangle size={40} color="#ef4444" />
            </div>
            <p className="text-xl font-bold text-white">Delete Account</p>
          </div>

          {/* Warning box */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}
          >
            <p className="text-sm font-semibold mb-3" style={{ color: '#f87171' }}>
              This action is permanent and cannot be undone. Deleting your account will permanently remove:
            </p>
            <ul className="text-sm flex flex-col gap-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              <li>• All completed quests and progress</li>
              <li>• All earned points and STaQ Coins</li>
              <li>• All purchased coin packages</li>
              <li>• Your profile and personal information</li>
            </ul>
            <p className="text-sm mt-3 font-medium" style={{ color: '#f87171' }}>
              Once deleted, this data cannot be recovered.
            </p>
          </div>

          {/* Confirm input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Type <span style={{ color: '#f87171', fontFamily: 'monospace' }}>DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-red-500"
              style={{
                backgroundColor: '#12122a',
                border: '1px solid rgba(239,68,68,0.3)',
                color: canDelete ? '#ef4444' : '#ffffff',
                letterSpacing: canDelete ? '0.05em' : undefined,
              }}
            />
          </div>

          <button
            onClick={handleDelete}
            disabled={!canDelete}
            className="w-full rounded-2xl py-4 font-bold text-base transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}
