'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { MapPin, SlidersHorizontal, Clock, Ruler, Star, Lock, Diamond, Globe, Check, X } from 'lucide-react';
import { fetchQuestsByCity } from '@/lib/repo';
import { useCityStore } from '@/lib/store/cityStore';
import { useQuestStore } from '@/lib/store/questStore';
import { useAuthStore } from '@/lib/store/authStore';
import { Quest, QuestCategory } from '@/lib/types';

const CATEGORY_LABELS: Record<QuestCategory, string> = {
  historical:      'Historical',
  gastronomy:      'Gastronomy',
  hidden_gems:     'Hidden Gems',
  nightlife:       'Nightlife',
  family:          'Family',
  practical:       'Practical',
  airport_arrival: 'Arrival',
};

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as QuestCategory[];
const FREE_QUEST_LIMIT = 3;

type MainTab = 'all' | 'active' | 'finished';

export default function QuestsPage() {
  const router = useRouter();
  const selectedCity = useCityStore((s) => s.selectedCity);
  const activeState = useQuestStore((s) => s.activeState);
  const profile = useAuthStore((s) => s.profile);

  const [mainTab, setMainTab]                     = useState<MainTab>('all');
  const [selectedCategories, setSelectedCategories] = useState<QuestCategory[]>([]);
  const [filterOpen, setFilterOpen]               = useState(false);
  const [pendingCategories, setPendingCategories] = useState<QuestCategory[]>([]);
  const [premiumQuest, setPremiumQuest]           = useState<Quest | null>(null);

  const { data: quests, isLoading } = useQuery({
    queryKey: ['quests', selectedCity?.id],
    queryFn: () => fetchQuestsByCity(selectedCity!.id),
    enabled: !!selectedCity,
  });

  const allQuests = quests ?? [];

  const displayedQuests = (() => {
    if (mainTab === 'active') {
      if (!activeState || activeState.status !== 'in_progress') return [];
      return allQuests.filter((q) => q.id === activeState.questId);
    }
    if (mainTab === 'finished') {
      const completed = profile?.completedQuests ?? [];
      return allQuests.filter((q) => completed.includes(q.id));
    }
    if (selectedCategories.length === 0) return allQuests;
    return allQuests.filter((q) => selectedCategories.includes(q.category));
  })();

  function handleQuestPress(quest: Quest, index: number) {
    const isFree = !quest.isPremium || index < FREE_QUEST_LIMIT;
    if (isFree) {
      router.push(`/quest/${quest.id}`);
    } else {
      setPremiumQuest(quest);
    }
  }

  function openFilter() {
    setPendingCategories([...selectedCategories]);
    setFilterOpen(true);
  }

  function applyFilter() {
    setSelectedCategories(pendingCategories);
    setFilterOpen(false);
  }

  function clearFilter() {
    setPendingCategories([]);
    setSelectedCategories([]);
    setFilterOpen(false);
  }

  function togglePending(cat: QuestCategory) {
    setPendingCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  // Empty city state
  if (!selectedCity) {
    return (
      <div
        className="flex flex-col items-center justify-center px-8"
        style={{ minHeight: '100%', backgroundColor: '#f8fafc', paddingTop: 120 }}
      >
        <Globe size={48} color="#64748b" />
        <p className="text-lg font-bold text-center mt-4" style={{ color: '#1e293b' }}>
          No city selected
        </p>
        <p className="text-sm text-center mt-2" style={{ color: '#64748b' }}>
          Tap "Choose City" to pick a destination.
        </p>
        <Link
          href="/home"
          className="flex items-center gap-2 rounded-2xl px-6 py-3 text-white font-semibold mt-6"
          style={{ backgroundColor: '#4f46e5' }}
        >
          <MapPin size={16} color="#fff" />
          Choose City
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%' }}>
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10"
        style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}
      >
        {/* City row */}
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <Link
            href="/home"
            className="flex items-center gap-1.5 font-semibold"
            style={{ color: '#4f46e5', fontSize: 15 }}
          >
            <MapPin size={18} color="#4f46e5" />
            Choose City
          </Link>
          <span
            className="rounded-full px-3 py-1 text-white font-semibold text-sm"
            style={{ backgroundColor: '#1e1b4b' }}
          >
            {selectedCity.name}
          </span>
        </div>

        {/* Filter bar */}
        <div className="flex items-center px-4 pb-3 gap-2">
          {(['all', 'active', 'finished'] as MainTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className="rounded-full px-3.5 py-2 text-[13px] font-semibold capitalize transition-colors"
              style={{
                backgroundColor: mainTab === tab ? '#0f172a' : '#ffffff',
                color:           mainTab === tab ? '#ffffff' : '#0f172a',
                border:          `1px solid ${mainTab === tab ? '#0f172a' : '#e2e8f0'}`,
              }}
            >
              {tab === 'all' ? 'All' : tab === 'active' ? 'Active' : 'Finished'}
            </button>
          ))}

          <div className="flex-1" />

          <button
            onClick={openFilter}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors"
            style={{
              backgroundColor: selectedCategories.length > 0 ? '#4f46e5' : '#ffffff',
              color:           selectedCategories.length > 0 ? '#ffffff' : '#0f172a',
              border:          `1px solid ${selectedCategories.length > 0 ? '#4f46e5' : '#e2e8f0'}`,
            }}
          >
            <SlidersHorizontal size={14} />
            {selectedCategories.length > 0 ? `Filter (${selectedCategories.length})` : 'Filter'}
          </button>
        </div>
      </div>

      {/* Quest list */}
      {isLoading ? (
        <div className="flex justify-center mt-16">
          <span
            className="inline-block w-8 h-8 border-2 rounded-full animate-spin"
            style={{ borderColor: '#e2e8f0', borderTopColor: '#4f46e5' }}
          />
        </div>
      ) : displayedQuests.length === 0 ? (
        <EmptyState tab={mainTab} />
      ) : (
        <div className="flex flex-col gap-3 p-4">
          {displayedQuests.map((quest, index) => {
            const isFree = !quest.isPremium || index < FREE_QUEST_LIMIT;
            const completedDate =
              mainTab === 'finished' && profile?.completedQuests?.includes(quest.id)
                ? 'March 24, 2026'
                : null;
            return (
              <QuestCard
                key={quest.id}
                quest={quest}
                isFree={isFree}
                completedDate={completedDate}
                onPress={() => handleQuestPress(quest, index)}
              />
            );
          })}
        </div>
      )}

      {/* Category filter sheet */}
      {filterOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="w-full max-w-[430px] mx-auto rounded-t-3xl"
            style={{ backgroundColor: '#ffffff', paddingBottom: 40 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-2 pb-3">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#e2e8f0' }} />
            </div>

            <div className="flex items-center justify-between px-6 mb-4">
              <p className="text-lg font-bold" style={{ color: '#0f172a' }}>Filter by Category</p>
              <button onClick={() => setFilterOpen(false)}>
                <X size={20} color="#94a3b8" />
              </button>
            </div>

            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => togglePending(cat)}
                className="w-full flex items-center justify-between px-6 py-3.5"
                style={{ borderBottom: '1px solid #f1f5f9' }}
              >
                <span
                  className="text-[15px]"
                  style={{
                    color: '#0f172a',
                    fontWeight: pendingCategories.includes(cat) ? 600 : 400,
                  }}
                >
                  {CATEGORY_LABELS[cat]}
                </span>
                {pendingCategories.includes(cat) && (
                  <Check size={20} color="#4f46e5" />
                )}
              </button>
            ))}

            <div className="flex gap-3 px-6 mt-5">
              <button
                onClick={clearFilter}
                className="flex-1 rounded-2xl py-3.5 font-semibold"
                style={{ border: '1px solid #e2e8f0', color: '#64748b' }}
              >
                Clear
              </button>
              <button
                onClick={applyFilter}
                className="flex-1 rounded-2xl py-3.5 font-semibold text-white"
                style={{ backgroundColor: '#4f46e5' }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium unlock sheet */}
      {premiumQuest && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setPremiumQuest(null)}
        >
          <div
            className="w-full max-w-[430px] mx-auto rounded-t-3xl px-6 pb-10"
            style={{ backgroundColor: '#ffffff' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-2 pb-4">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#e2e8f0' }} />
            </div>

            <p className="text-xl font-bold mb-1" style={{ color: '#0f172a' }}>
              {premiumQuest.title}
            </p>
            <p className="text-sm mb-5 line-clamp-2" style={{ color: '#64748b' }}>
              {premiumQuest.description}
            </p>

            {/* Pricing row */}
            <div
              className="rounded-2xl p-4 flex justify-between items-center mb-5"
              style={{ backgroundColor: '#f8fafc' }}
            >
              <div>
                <p className="text-xs uppercase tracking-wider font-medium" style={{ color: '#94a3b8' }}>
                  One-time unlock
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Diamond size={20} color="#f59e0b" />
                  <span className="text-3xl font-bold" style={{ color: '#f59e0b' }}>
                    {premiumQuest.coinPrice ?? Math.round(premiumQuest.priceUsd * 100)} SC
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <Clock size={12} color="#94a3b8" />
                  <span className="text-xs" style={{ color: '#64748b' }}>{premiumQuest.durationMinutes} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Ruler size={12} color="#94a3b8" />
                  <span className="text-xs" style={{ color: '#64748b' }}>{premiumQuest.distanceKm} km</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  <span className="text-xs" style={{ color: '#64748b' }}>{premiumQuest.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setPremiumQuest(null);
                router.push(`/quest/${premiumQuest.id}`);
              }}
              className="w-full rounded-2xl py-4 font-bold text-white text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#f59e0b' }}
            >
              Unlock for {premiumQuest.coinPrice ?? Math.round(premiumQuest.priceUsd * 100)} SC
            </button>
            <p className="text-xs text-center mt-3" style={{ color: '#94a3b8' }}>
              Payment not implemented in dev mode
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ tab }: { tab: MainTab }) {
  const icons = {
    active:   <span style={{ fontSize: 40 }}>🧭</span>,
    finished: <span style={{ fontSize: 40 }}>🏆</span>,
    all:      <span style={{ fontSize: 40 }}>🔍</span>,
  };
  const titles = {
    active:   'No active quests yet',
    finished: 'No completed quests yet',
    all:      'No quests in this category',
  };
  const subtitles = {
    active:   'Start exploring!',
    finished: 'Complete a quest to see it here.',
    all:      'Try a different filter.',
  };
  return (
    <div className="flex flex-col items-center px-8 pt-16">
      {icons[tab]}
      <p className="font-semibold text-base text-center mt-3" style={{ color: '#475569' }}>
        {titles[tab]}
      </p>
      <p className="text-sm text-center mt-1.5" style={{ color: '#94a3b8' }}>
        {subtitles[tab]}
      </p>
    </div>
  );
}

function QuestCard({
  quest,
  isFree,
  completedDate,
  onPress,
}: {
  quest: Quest;
  isFree: boolean;
  completedDate?: string | null;
  onPress: () => void;
}) {
  const isLocked = quest.isPremium && !isFree;

  return (
    <button
      onClick={onPress}
      className="w-full text-left bg-white rounded-2xl overflow-hidden transition-opacity hover:opacity-95 active:opacity-90"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
    >
      {/* Cover image */}
      <div className="relative" style={{ height: 160 }}>
        <img
          src={quest.coverImage}
          alt={quest.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="rounded-full px-3 py-1 text-white text-xs font-semibold capitalize"
            style={{ backgroundColor: 'rgba(10,10,26,0.70)' }}
          >
            {quest.category.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Free badge */}
        {!quest.isPremium && (
          <div className="absolute top-3 right-3">
            <span className="rounded-full px-3 py-1 text-white text-xs font-bold" style={{ backgroundColor: '#22c55e' }}>
              FREE
            </span>
          </div>
        )}

        {/* Locked overlay */}
        {isLocked && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          >
            <Lock size={32} color="#94a3b8" />
            <div className="flex items-center gap-1 rounded-full px-4 py-1.5" style={{ backgroundColor: '#f59e0b' }}>
              <Diamond size={12} color="#ffffff" />
              <span className="text-white font-bold text-sm">
                {quest.coinPrice ?? Math.round(quest.priceUsd * 100)} SC
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="text-base font-bold truncate" style={{ color: '#0f172a' }}>{quest.title}</p>
        {completedDate && (
          <p className="text-xs mt-0.5" style={{ color: '#4f46e5' }}>Completed on {completedDate}</p>
        )}
        <p className="text-sm mt-1 line-clamp-2" style={{ color: '#64748b' }}>{quest.description}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <Clock size={12} color="#94a3b8" />
            <span className="text-xs font-medium" style={{ color: '#64748b' }}>{quest.durationMinutes}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={12} color="#94a3b8" />
            <span className="text-xs font-medium" style={{ color: '#64748b' }}>{quest.distanceKm}km</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span className="text-xs font-medium" style={{ color: '#64748b' }}>{quest.rating.toFixed(1)}</span>
          </div>
          <div className="ml-auto">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: '#fffbeb', color: '#d97706' }}
            >
              +{quest.route.length * 75} pts
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
