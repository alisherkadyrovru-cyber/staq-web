'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Bell, Compass, Diamond, ChevronRight,
  User, Lock, Languages, HelpCircle, MessageSquare,
  CreditCard, Mail, KeyRound, Shield, History, Trash2,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { signOut } from '@/lib/repo';

const LEVEL_LABELS: Record<number, string> = {
  1: 'Wanderer', 2: 'Explorer', 3: 'Adventurer', 4: 'Pathfinder', 5: 'Legend',
};

const ACCOUNT_SETTINGS = [
  { Icon: User,         label: 'Personal Details',          href: '/settings/personal-details' },
  { Icon: CreditCard,   label: 'Saved Cards',               href: '/settings/saved-cards' },
  { Icon: Mail,         label: 'Change Email',              href: '/settings/change-email' },
  { Icon: KeyRound,     label: 'Password Update',           href: '/settings/password-update' },
  { Icon: Shield,       label: 'Personal Data Protection',  href: '/settings/data-protection' },
  { Icon: Bell,         label: 'Notification Settings',     href: '/settings/notifications' },
  { Icon: History,      label: 'Login History',             href: '/settings/login-history' },
  { Icon: Trash2,       label: 'Delete Account',            href: '/settings/delete-account' },
] as const;

const MORE_ITEMS = [
  { Icon: Lock,          label: 'Privacy'   },
  { Icon: Languages,     label: 'Language'  },
  { Icon: HelpCircle,    label: 'Help & FAQ'},
  { Icon: MessageSquare, label: 'Feedback'  },
] as const;

export default function ProfilePage() {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const logout  = useAuthStore((s) => s.logout);

  const [signOutConfirm, setSignOutConfirm] = useState(false);

  const levelLabel  = LEVEL_LABELS[profile?.level ?? 1] ?? 'Wanderer';
  const totalPoints = profile?.totalPoints ?? 0;
  const questsDone  = profile?.completedQuests?.length ?? 0;

  async function handleLogout() {
    await signOut();
    logout();
    router.replace('/welcome');
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10"
        style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}
      >
        <div className="px-5 py-4 flex items-center justify-between">
          <p className="text-xl font-bold" style={{ color: '#0f172a' }}>Profile</p>
          <button onClick={() => alert('Notifications coming soon')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Bell size={24} color="#0f172a" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col gap-4 p-4">

        {/* ── Profile card ── */}
        <div
          className="flex gap-4 rounded-2xl p-5 bg-white"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <div className="flex flex-col items-center justify-center gap-1.5" style={{ width: '40%' }}>
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 72, height: 72, backgroundColor: '#ede9fe' }}
            >
              <Compass size={36} color="#4f46e5" />
            </div>
            <p className="text-base font-bold text-center" style={{ color: '#0f172a' }}>
              {profile?.name ?? 'Explorer'}
            </p>
            <p className="text-xs text-center truncate w-full" style={{ color: '#94a3b8' }}>
              {profile?.email ?? ''}
            </p>
            <span
              className="text-xs font-semibold rounded-full px-2.5 py-1"
              style={{ backgroundColor: '#ede9fe', color: '#4f46e5' }}
            >
              Level {profile?.level ?? 1} — {levelLabel}
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <MiniStat label="Earned"    value={String(totalPoints)} />
              <MiniStat label="Spent"     value="0" />
            </div>
            <div className="flex gap-2.5">
              <MiniStat label="Remaining" value={String(totalPoints)} />
              <MiniStat label="Quests Done" value={String(questsDone)} />
            </div>
          </div>
        </div>

        {/* ── STaQ Coins card ── */}
        <div
          className="flex items-center justify-between rounded-2xl p-5 bg-white"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center gap-3">
            <Diamond size={28} color="#f59e0b" />
            <div>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>STaQ Coins</p>
              <p className="text-2xl font-bold" style={{ color: '#f59e0b', marginTop: 2 }}>0 coins</p>
            </div>
          </div>
          <Link
            href="/coins"
            className="rounded-full px-4 py-2 text-white font-bold text-sm"
            style={{ backgroundColor: '#4f46e5' }}
          >
            Details →
          </Link>
        </div>

        {/* ── Account Settings ── */}
        <div>
          <p
            className="text-xs font-bold uppercase tracking-wider mb-2 px-1"
            style={{ color: '#94a3b8', letterSpacing: '0.08em' }}
          >
            Account Settings
          </p>
          <div
            className="rounded-2xl overflow-hidden bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            {ACCOUNT_SETTINGS.map(({ Icon, label, href }, i) => (
              <div key={href}>
                <Link
                  href={href}
                  className="w-full flex items-center px-4 py-3.5 transition-colors hover:bg-slate-50"
                  style={{ textDecoration: 'none' }}
                >
                  <Icon size={20} color={label === 'Delete Account' ? '#ef4444' : '#4f46e5'} />
                  <span
                    className="flex-1 text-left ml-3 text-[15px]"
                    style={{ color: label === 'Delete Account' ? '#ef4444' : '#0f172a' }}
                  >
                    {label}
                  </span>
                  <ChevronRight size={18} color="#94a3b8" />
                </Link>
                {i < ACCOUNT_SETTINGS.length - 1 && (
                  <div style={{ height: 1, backgroundColor: '#f1f5f9', marginLeft: 48 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── More ── */}
        <div>
          <p
            className="text-xs font-bold uppercase tracking-wider mb-2 px-1"
            style={{ color: '#94a3b8', letterSpacing: '0.08em' }}
          >
            More
          </p>
          <div
            className="rounded-2xl overflow-hidden bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            {MORE_ITEMS.map(({ Icon, label }, i) => (
              <div key={label}>
                <button
                  onClick={() => alert(`${label} coming soon`)}
                  className="w-full flex items-center px-4 py-3.5 transition-colors hover:bg-slate-50"
                >
                  <Icon size={20} color="#4f46e5" />
                  <span className="flex-1 text-left ml-3 text-[15px]" style={{ color: '#0f172a' }}>
                    {label}
                  </span>
                  <ChevronRight size={18} color="#94a3b8" />
                </button>
                {i < MORE_ITEMS.length - 1 && (
                  <div style={{ height: 1, backgroundColor: '#f1f5f9', marginLeft: 48 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Sign out ── */}
        <button
          onClick={() => setSignOutConfirm(true)}
          className="w-full rounded-xl py-4 font-semibold text-[15px] transition-colors hover:bg-red-50"
          style={{ border: '1px solid #ef4444', color: '#ef4444', backgroundColor: 'transparent' }}
        >
          Sign Out
        </button>

      </div>

      {/* ── Sign-out confirmation modal ── */}
      {signOutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          onClick={() => setSignOutConfirm(false)}
        >
          <div
            className="w-full max-w-[360px] rounded-2xl p-6 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg font-bold mb-2" style={{ color: '#0f172a' }}>Sign out</p>
            <p className="text-sm mb-6" style={{ color: '#64748b' }}>Are you sure?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setSignOutConfirm(false)}
                className="flex-1 rounded-xl py-3 font-semibold"
                style={{ border: '1px solid #e2e8f0', color: '#64748b' }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl py-3 font-semibold text-white"
                style={{ backgroundColor: '#ef4444' }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex-1 flex flex-col items-center rounded-xl p-2.5"
      style={{ backgroundColor: '#f8fafc' }}
    >
      <span className="text-[11px] font-medium mb-0.5" style={{ color: '#94a3b8' }}>{label}</span>
      <span className="text-xl font-bold" style={{ color: '#0f172a' }}>{value}</span>
    </div>
  );
}
