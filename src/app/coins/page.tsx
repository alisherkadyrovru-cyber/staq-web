'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Diamond, Info } from 'lucide-react';

const PACKAGES = [
  { coins: 100,  price: 10.0 },
  { coins: 200,  price: 15.0, popular: true },
  { coins: 500,  price: 35.0 },
  { coins: 1000, price: 65.0 },
  { coins: 2000, price: 100.0 },
  { coins: 5000, price: 200.0, bestValue: true },
];

export default function CoinsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const selectedPkg = selected !== null ? PACKAGES[selected] : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-[430px] mx-auto">

        {/* Header */}
        <div
          className="sticky top-0 z-10 relative flex items-center justify-center px-4"
          style={{ height: 56, backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}
        >
          <button
            onClick={() => router.back()}
            className="absolute left-4 flex items-center gap-1 font-semibold"
            style={{ color: '#4f46e5' }}
          >
            <ChevronLeft size={22} color="#4f46e5" />
            <span style={{ fontSize: 15 }}>Back</span>
          </button>
          <span className="font-bold text-[17px]" style={{ color: '#0f172a' }}>
            STaQ Coins
          </span>
        </div>

        {/* Scrollable content */}
        <div className="px-4 pt-4 pb-32 flex flex-col gap-4">

          {/* Balance card */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center"
            style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <Diamond size={36} color="#f59e0b" style={{ marginBottom: 12 }} />
            <span
              className="font-bold"
              style={{ fontSize: 56, lineHeight: '64px', color: '#f59e0b' }}
            >
              0
            </span>
            <span className="font-semibold mt-1" style={{ fontSize: 15, color: '#0f172a' }}>
              Your STaQ Coins
            </span>
            <span
              className="mt-1.5 text-center"
              style={{ fontSize: 13, color: '#94a3b8' }}
            >
              Use coins to unlock quests and in-app features
            </span>
          </div>

          {/* Packages header */}
          <p className="font-bold px-1" style={{ fontSize: 17, color: '#0f172a' }}>
            Buy STaQ Coins
          </p>

          {/* Package grid */}
          <div className="flex flex-wrap gap-3">
            {PACKAGES.map((pkg, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={pkg.coins}
                  onClick={() => setSelected(i === selected ? null : i)}
                  className="relative text-left rounded-2xl p-4 transition-colors"
                  style={{
                    width: 'calc(50% - 6px)',
                    backgroundColor: isSelected ? '#fffbeb' : '#ffffff',
                    border: `1.5px solid ${isSelected ? '#f59e0b' : '#e2e8f0'}`,
                  }}
                >
                  {pkg.popular && (
                    <span
                      className="absolute font-bold text-white"
                      style={{
                        top: -10,
                        right: 12,
                        backgroundColor: '#f59e0b',
                        borderRadius: 10,
                        padding: '3px 8px',
                        fontSize: 10,
                      }}
                    >
                      POPULAR
                    </span>
                  )}
                  {'bestValue' in pkg && pkg.bestValue && (
                    <span
                      className="absolute font-bold text-white"
                      style={{
                        top: -10,
                        right: 12,
                        background: 'linear-gradient(90deg, #d97706, #f59e0b)',
                        borderRadius: 10,
                        padding: '3px 8px',
                        fontSize: 10,
                        letterSpacing: '0.02em',
                      }}
                    >
                      BEST VALUE
                    </span>
                  )}
                  <span
                    className="block font-bold"
                    style={{ fontSize: 28, color: '#f59e0b' }}
                  >
                    {pkg.coins}
                  </span>
                  <span
                    className="block mt-0.5 mb-3"
                    style={{ fontSize: 12, color: '#94a3b8' }}
                  >
                    STaQ Coins
                  </span>
                  <span
                    className="block font-bold"
                    style={{ fontSize: 16, color: '#0f172a' }}
                  >
                    ${pkg.price.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Info box */}
          <div
            className="flex gap-3 rounded-2xl p-4"
            style={{ backgroundColor: '#eff6ff' }}
          >
            <Info size={20} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 13, color: '#1e40af', lineHeight: '20px' }}>
              STaQ Coins can be used to unlock premium quests and special features.
              Purchases are processed securely through your device&apos;s payment system.
            </p>
          </div>

          {/* Expenses link */}
          <div className="flex justify-center py-2">
            <Link
              href="/expenses"
              className="font-semibold"
              style={{ fontSize: 14, color: '#4f46e5' }}
            >
              View my expenses →
            </Link>
          </div>
        </div>

        {/* Fixed Buy button */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-9 pt-4"
          style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}
        >
          <button
            onClick={() => {
              if (!selectedPkg) return;
              alert('In-app purchase coming soon. This will use your iOS/Android payment system.');
            }}
            className="w-full rounded-2xl py-[18px] font-bold text-base transition-colors"
            style={{
              backgroundColor: selectedPkg ? '#f59e0b' : '#e2e8f0',
              color: selectedPkg ? '#ffffff' : '#94a3b8',
            }}
          >
            {selectedPkg
              ? `Buy ${selectedPkg.coins} coins for $${selectedPkg.price.toFixed(2)}`
              : 'Select a package'}
          </button>
        </div>

      </div>
    </div>
  );
}
