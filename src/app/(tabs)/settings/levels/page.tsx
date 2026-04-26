'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Footprints, Compass, MapPin, Mountain, Crown } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

const LEVELS = [
  { level: 1, name: 'Wanderer',   range: '0 – 499 pts',       Icon: Footprints, color: '#64748b', bg: '#f8fafc' },
  { level: 2, name: 'Explorer',   range: '500 – 1,499 pts',   Icon: Compass,    color: '#4f46e5', bg: '#ede9fe' },
  { level: 3, name: 'Pathfinder', range: '1,500 – 3,999 pts', Icon: MapPin,     color: '#0284c7', bg: '#e0f2fe' },
  { level: 4, name: 'Trailblazer',range: '4,000 – 9,999 pts', Icon: Mountain,   color: '#d97706', bg: '#fffbeb' },
  { level: 5, name: 'Legend',     range: '10,000+ pts',       Icon: Crown,      color: '#dc2626', bg: '#fef2f2' },
] as const;

export default function LevelsPage() {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const currentLevel = profile?.level ?? 1;

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
        <span className="font-bold text-[17px]" style={{ color: '#0f172a' }}>Levels</span>
      </div>

      <div className="px-5 pt-5 pb-8 flex flex-col gap-3">

        <p className="text-sm px-1 mb-1" style={{ color: '#64748b' }}>
          Complete quests and earn points to advance through levels.
        </p>

        {LEVELS.map(({ level, name, range, Icon, color, bg }) => {
          const isCurrent = level === currentLevel;
          const isLocked = level > currentLevel;

          return (
            <div
              key={level}
              className="flex items-center gap-4 rounded-2xl px-4 py-4"
              style={{
                backgroundColor: isCurrent ? '#fffbeb' : '#ffffff',
                border: isCurrent ? '2px solid #f59e0b' : '1px solid #f1f5f9',
                boxShadow: isCurrent ? '0 2px 12px rgba(245,158,11,0.15)' : '0 2px 8px rgba(0,0,0,0.03)',
                opacity: isLocked ? 0.45 : 1,
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 48, height: 48, backgroundColor: isCurrent ? '#fffbeb' : bg }}
              >
                <Icon size={26} color={isLocked ? '#94a3b8' : color} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold" style={{ color: isLocked ? '#94a3b8' : '#0f172a' }}>
                    Level {level} — {name}
                  </span>
                  {isCurrent && (
                    <span
                      className="text-[10px] font-bold rounded-full px-2 py-0.5"
                      style={{ backgroundColor: '#f59e0b', color: '#ffffff' }}
                    >
                      YOU
                    </span>
                  )}
                </div>
                <p className="text-sm mt-0.5" style={{ color: isLocked ? '#cbd5e1' : '#64748b' }}>{range}</p>
              </div>

              {/* Lock indicator */}
              {isLocked && (
                <span className="text-[11px] font-semibold flex-shrink-0" style={{ color: '#cbd5e1' }}>
                  🔒
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
