'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Smartphone } from 'lucide-react';

interface LoginEntry {
  id: string;
  device: string;
  location: string;
  datetime: string;
  status: 'success' | 'failed';
  isCurrent?: boolean;
}

const HISTORY: LoginEntry[] = [
  { id: '1', device: 'iPhone 17 Pro',       location: 'Istanbul, Turkey', datetime: '26 Apr 2026, 09:41', status: 'success', isCurrent: true },
  { id: '2', device: 'MacBook Air',          location: 'Istanbul, Turkey', datetime: '25 Apr 2026, 21:05', status: 'success' },
  { id: '3', device: 'Samsung Galaxy S24',   location: 'Ankara, Turkey',   datetime: '23 Apr 2026, 14:30', status: 'success' },
  { id: '4', device: 'iPhone 17 Pro',        location: 'Istanbul, Turkey', datetime: '21 Apr 2026, 08:17', status: 'failed' },
  { id: '5', device: 'Chrome on Windows',    location: 'Berlin, Germany',  datetime: '17 Apr 2026, 18:52', status: 'failed' },
  { id: '6', device: 'iPad Pro',             location: 'Dubai, UAE',       datetime: '12 Apr 2026, 11:23', status: 'success' },
];

export default function LoginHistoryPage() {
  const router = useRouter();

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
        <span className="font-bold text-[17px]" style={{ color: '#0f172a' }}>Login History</span>
      </div>

      <div className="px-5 pt-5 pb-8 flex flex-col gap-3">
        {HISTORY.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 rounded-2xl px-4 py-4 bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}
          >
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: 44, height: 44, backgroundColor: '#f8fafc' }}
            >
              <Smartphone size={20} color="#64748b" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold truncate" style={{ color: '#0f172a' }}>{entry.device}</p>
                {entry.isCurrent && (
                  <span
                    className="text-[10px] font-bold rounded-full px-2 py-0.5 flex-shrink-0"
                    style={{ backgroundColor: '#fffbeb', color: '#d97706', border: '1px solid #fcd34d' }}
                  >
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{entry.location}</p>
              <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{entry.datetime}</p>
            </div>

            <span
              className="text-[11px] font-semibold rounded-full px-2.5 py-1 flex-shrink-0"
              style={
                entry.status === 'success'
                  ? { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }
                  : { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }
              }
            >
              {entry.status === 'success' ? 'Successful' : 'Failed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
