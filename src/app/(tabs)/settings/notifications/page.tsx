'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Bell } from 'lucide-react';

export default function NotificationsPage() {
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
        <span className="font-bold text-[17px]" style={{ color: '#0f172a' }}>Notification Settings</span>
      </div>

      <div className="flex flex-col items-center justify-center px-8 py-24 gap-6">
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 80, height: 80, backgroundColor: '#fffbeb' }}
        >
          <Bell size={40} color="#f59e0b" />
        </div>
        <p className="text-xl font-bold text-center" style={{ color: '#0f172a' }}>Notification Settings</p>
        <p className="text-base text-center leading-relaxed" style={{ color: '#64748b' }}>
          Manage your notification preferences. Coming soon.
        </p>
      </div>
    </div>
  );
}
