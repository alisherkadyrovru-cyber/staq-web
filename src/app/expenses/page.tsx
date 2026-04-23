'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Receipt } from 'lucide-react';

export default function ExpensesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-[430px] mx-auto flex flex-col min-h-screen">

        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3.5"
          style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 font-semibold"
            style={{ color: '#4f46e5' }}
          >
            <ChevronLeft size={22} color="#4f46e5" />
            <span style={{ fontSize: 15 }}>Back</span>
          </button>
          <span className="font-bold text-lg" style={{ color: '#0f172a' }}>
            My Expenses
          </span>
        </div>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-4">
          <Receipt size={56} color="#cbd5e1" />
          <p className="font-semibold text-lg" style={{ color: '#475569' }}>
            No expenses yet
          </p>
          <p className="text-sm text-center" style={{ color: '#94a3b8', lineHeight: '20px' }}>
            Your STaQ Coins spending history will appear here
          </p>
        </div>

      </div>
    </div>
  );
}
