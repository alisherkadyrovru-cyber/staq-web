'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { List, Map, QrCode, Gift, User } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

const TABS = [
  { href: '/quests',  label: 'Quests',  Icon: List    },
  { href: '/map',     label: 'Map',     Icon: Map     },
  { href: '/qr',      label: 'QR',      Icon: QrCode  },
  { href: '/rewards', label: 'Rewards', Icon: Gift    },
  { href: '/profile', label: 'Profile', Icon: User    },
] as const;

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const userId = useAuthStore((s) => s.userId);

  // Auth guard — redirect to welcome if not logged in
  useEffect(() => {
    if (!userId) {
      router.replace('/welcome');
    }
  }, [userId, router]);

  // Don't render tabs while redirecting
  if (!userId) return null;

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-[430px] relative min-h-screen flex flex-col">
        {/* Page content — padded above tab bar */}
        <main className="flex-1 pb-20">
          {children}
        </main>

        {/* Bottom tab bar — fixed, centred, same max-width */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] flex items-center justify-around z-50"
          style={{
            backgroundColor: '#0f0f2e',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            height: 64,
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {TABS.map(({ href, label, Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            // QR tab — show "coming soon" alert instead of navigating
            if (href === '/qr') {
              return (
                <button
                  key={href}
                  onClick={() => alert('Coming Soon 🚧 — QR scanning will be available in a future update.')}
                  className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
                >
                  {/* Special pill button for QR */}
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: isActive ? '#4f46e5' : '#1e1b4b',
                      boxShadow: '0 2px 8px rgba(79,70,229,0.35)',
                      marginBottom: 2,
                    }}
                  >
                    <Icon size={20} color="#ffffff" />
                  </span>
                </button>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
                style={{ textDecoration: 'none' }}
              >
                <Icon
                  size={22}
                  color={isActive ? '#f59e0b' : '#64748b'}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
                <span
                  className="text-[11px] font-medium"
                  style={{ color: isActive ? '#f59e0b' : '#64748b' }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
