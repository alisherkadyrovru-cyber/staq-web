'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
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
        <span className="font-bold text-[17px]" style={{ color: '#0f172a' }}>Delete Account</span>
      </div>

      <div className="px-5 pt-5 pb-8 flex flex-col gap-6">

        {/* Warning icon */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 80, height: 80, backgroundColor: '#fef2f2' }}
          >
            <AlertTriangle size={40} color="#ef4444" />
          </div>
          <p className="text-xl font-bold" style={{ color: '#0f172a' }}>Delete Account</p>
        </div>

        {/* Warning box */}
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}
        >
          <p className="text-sm font-semibold mb-3" style={{ color: '#dc2626' }}>
            This action is permanent and cannot be undone. Deleting your account will permanently remove:
          </p>
          <ul className="text-sm flex flex-col gap-1.5" style={{ color: '#7f1d1d' }}>
            <li>• All completed quests and progress</li>
            <li>• All earned points and STaQ Coins</li>
            <li>• All purchased coin packages</li>
            <li>• Your profile and personal information</li>
          </ul>
          <p className="text-sm mt-3 font-medium" style={{ color: '#dc2626' }}>
            Once deleted, this data cannot be recovered.
          </p>
        </div>

        {/* Confirm input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" style={{ color: '#475569' }}>
            Type <span style={{ color: '#dc2626', fontFamily: 'monospace' }}>DELETE</span> to confirm
          </label>
          <input
            type="text"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="DELETE"
            className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-red-400"
            style={{
              backgroundColor: '#ffffff',
              border: `1px solid ${canDelete ? '#ef4444' : '#e2e8f0'}`,
              color: canDelete ? '#ef4444' : '#0f172a',
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
  );
}
