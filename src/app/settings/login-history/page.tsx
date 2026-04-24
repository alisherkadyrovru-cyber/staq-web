'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Smartphone } from 'lucide-react';

interface LoginEntry {
  id: string;
  device: string;
  location: string;
  datetime: string;
  status: 'success' | 'failed';
  isCurrent?: boolean;
}

const HISTORY: LoginEntry[] = [
  {
    id: '1',
    device: 'iPhone 17 Pro',
    location: 'Istanbul, Turkey',
    datetime: '24 Apr 2026, 09:41',
    status: 'success',
    isCurrent: true,
  },
  {
    id: '2',
    device: 'MacBook Air',
    location: 'Istanbul, Turkey',
    datetime: '23 Apr 2026, 21:05',
    status: 'success',
  },
  {
    id: '3',
    device: 'Samsung Galaxy S24',
    location: 'Ankara, Turkey',
    datetime: '21 Apr 2026, 14:30',
    status: 'success',
  },
  {
    id: '4',
    device: 'iPhone 17 Pro',
    location: 'Istanbul, Turkey',
    datetime: '19 Apr 2026, 08:17',
    status: 'failed',
  },
  {
    id: '5',
    device: 'Chrome on Windows',
    location: 'Berlin, Germany',
    datetime: '15 Apr 2026, 18:52',
    status: 'failed',
  },
  {
    id: '6',
    device: 'iPad Pro',
    location: 'Dubai, UAE',
    datetime: '10 Apr 2026, 11:23',
    status: 'success',
  },
];

export default function LoginHistoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-14 pb-6">
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={22} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">Login History</h1>
        </div>

        <div className="flex-1 px-5 flex flex-col gap-3 pb-8">
          {HISTORY.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-3 rounded-2xl px-4 py-4"
              style={{ backgroundColor: '#12122a', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 44, height: 44, backgroundColor: '#1a1a3a' }}
              >
                <Smartphone size={20} color="rgba(255,255,255,0.5)" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-white truncate">{entry.device}</p>
                  {entry.isCurrent && (
                    <span
                      className="text-[10px] font-bold rounded-full px-2 py-0.5"
                      style={{ backgroundColor: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}
                    >
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{entry.location}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{entry.datetime}</p>
              </div>

              <span
                className="text-[11px] font-semibold rounded-full px-2.5 py-1 flex-shrink-0"
                style={
                  entry.status === 'success'
                    ? { backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }
                    : { backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444' }
                }
              >
                {entry.status === 'success' ? 'Successful' : 'Failed'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
