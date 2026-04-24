'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell } from 'lucide-react';

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-14 pb-6">
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={22} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">Notification Settings</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6 pb-20">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 80, height: 80, backgroundColor: 'rgba(245,158,11,0.12)' }}
          >
            <Bell size={40} color="#f59e0b" />
          </div>
          <p className="text-xl font-bold text-white text-center">Notification Settings</p>
          <p className="text-base text-center leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Manage your notification preferences. Coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
