'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield } from 'lucide-react';

export default function DataProtectionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-14 pb-6">
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={22} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">Personal Data Protection</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6 pb-20">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 80, height: 80, backgroundColor: 'rgba(79,70,229,0.15)' }}
          >
            <Shield size={40} color="#4f46e5" />
          </div>
          <p className="text-xl font-bold text-white text-center">Personal Data Protection</p>
          <p className="text-base text-center leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            This section will contain information about how we collect, store and protect your personal data in accordance with applicable privacy laws. Coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
