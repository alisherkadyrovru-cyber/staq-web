'use client';

import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { Clock, Ruler, Star, Trophy, Mic } from 'lucide-react';
import { fetchQuestById, fetchStepsForQuest } from '@/lib/repo';
import { useQuestStore } from '@/lib/store/questStore';
import { useAuthStore } from '@/lib/store/authStore';

const QuestRouteMap = dynamic(() => import('@/components/QuestRouteMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-200 rounded-2xl">
      <span className="text-slate-400 text-sm">Loading map…</span>
    </div>
  ),
});

const TASK_LABELS: Record<string, string> = {
  arrive:      '📍 Walk to location',
  photo:       '📷 Photo challenge',
  quiz:        '❓ Quiz',
  text_input:  '✍️ Answer a question',
  video:       '🎬 Video challenge',
  find_person: '🤝 Find someone',
};

const DIFFICULTY_STYLE: Record<string, { bg: string; text: string }> = {
  easy:   { bg: '#dcfce7', text: '#15803d' },
  medium: { bg: '#fef3c7', text: '#b45309' },
  hard:   { bg: '#fee2e2', text: '#b91c1c' },
};

export default function QuestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const userId = useAuthStore((s) => s.userId);
  const setActiveQuest = useQuestStore((s) => s.setActiveQuest);

  const { data: quest, isLoading } = useQuery({
    queryKey: ['quest', id],
    queryFn: () => fetchQuestById(id!),
    enabled: !!id,
  });

  const { data: steps } = useQuery({
    queryKey: ['steps', id],
    queryFn: () => fetchStepsForQuest(id!),
    enabled: !!id,
  });

  function handleStartQuest() {
    if (!quest || !steps || !userId) return;
    setActiveQuest(quest, steps, userId);
    router.push('/quest/active');
  }

  if (isLoading || !quest) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8fafc' }}>
        <span className="inline-block w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: '#e2e8f0', borderTopColor: '#4f46e5' }} />
      </div>
    );
  }

  const totalPoints = (steps ?? []).reduce((sum, s) => sum + s.pointsReward, 0);
  const diffStyle = DIFFICULTY_STYLE[quest.difficulty] ?? DIFFICULTY_STYLE.easy;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className="max-w-[430px] mx-auto">

        {/* Scrollable area — padded for fixed bottom bar */}
        <div className="pb-28">

          {/* Hero image */}
          <div className="relative" style={{ height: 224 }}>
            <img
              src={quest.coverImage}
              alt={quest.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }} />
            {/* Back button */}
            <div className="absolute top-12 left-4">
              <button
                onClick={() => router.back()}
                className="rounded-full px-4 py-2 font-semibold text-white text-sm"
                style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pt-5">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold capitalize"
                style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}
              >
                {quest.category.replace(/_/g, ' ')}
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold capitalize"
                style={{ backgroundColor: diffStyle.bg, color: diffStyle.text }}
              >
                {quest.difficulty}
              </span>
              {quest.isPremium && (
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: '#fef3c7', color: '#d97706' }}
                >
                  PREMIUM
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>{quest.title}</h1>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: '#64748b' }}>{quest.description}</p>

            {/* Stats strip */}
            <div className="flex bg-white rounded-2xl mt-5 p-4" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <StatItem icon={<Clock size={22} color="#94a3b8" />}  label="Duration" value={`${quest.durationMinutes}m`} />
              <StatItem icon={<Ruler size={22} color="#94a3b8" />}  label="Distance" value={`${quest.distanceKm}km`} />
              <StatItem icon={<Star  size={22} fill="#f59e0b" color="#f59e0b" />} label="Rating"   value={quest.rating.toFixed(1)} />
              <StatItem icon={<Trophy size={22} color="#f59e0b" />}  label="Points"   value={String(totalPoints)} />
            </div>

            {/* Route map preview */}
            {steps && steps.length > 0 && (
              <div className="mt-5 rounded-2xl overflow-hidden" style={{ height: 192, backgroundColor: '#e2e8f0' }}>
                <QuestRouteMap steps={steps} />
              </div>
            )}

            {/* Step list */}
            {steps && steps.length > 0 && (
              <div className="mt-5">
                <p className="font-bold text-base mb-3" style={{ color: '#0f172a' }}>
                  {steps.length} Steps
                </p>
                <div className="flex flex-col gap-3">
                  {steps.map((step, i) => (
                    <div key={step.id} className="flex gap-3">
                      {/* Number circle */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
                        style={{
                          width: 28, height: 28,
                          backgroundColor: i === 0 ? '#4f46e5' : '#e2e8f0',
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{ color: i === 0 ? '#ffffff' : '#64748b' }}
                        >
                          {i + 1}
                        </span>
                      </div>
                      {/* Step info */}
                      <div className="flex-1 pb-3" style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>{step.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
                          {TASK_LABELS[step.task.type] ?? step.task.type}
                          {' · '}{step.pointsReward} pts
                          {step.audioUrl ? ' · 🎙 audio' : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-6 pt-3 bg-white z-50"
          style={{ borderTop: '1px solid #f1f5f9', boxShadow: '0 -2px 12px rgba(0,0,0,0.06)' }}
        >
          <button
            onClick={handleStartQuest}
            className="w-full rounded-2xl py-4 font-bold text-white text-base transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: quest.isPremium ? '#f59e0b' : '#4f46e5' }}
          >
            {quest.isPremium
              ? `Unlock for ${quest.coinPrice ?? Math.round(quest.priceUsd * 100)} SC`
              : 'Start Quest'}
          </button>
        </div>

      </div>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      {icon}
      <span className="font-bold text-sm" style={{ color: '#0f172a' }}>{value}</span>
      <span className="text-xs" style={{ color: '#94a3b8' }}>{label}</span>
    </div>
  );
}
