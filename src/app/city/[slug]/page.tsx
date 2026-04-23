'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Clock, Ruler, Star, Lock, Diamond, Users, Map, Building2 } from 'lucide-react';
import { fetchCityBySlug, fetchQuestsByCity } from '@/lib/repo';
import { MOCK_PARTNERS } from '@/lib/mock/store';
import { Quest } from '@/lib/types';

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const { data: city, isLoading: cityLoading } = useQuery({
    queryKey: ['city', slug],
    queryFn: () => fetchCityBySlug(slug!),
    enabled: !!slug,
  });

  const { data: quests } = useQuery({
    queryKey: ['quests', city?.id],
    queryFn: () => fetchQuestsByCity(city!.id),
    enabled: !!city,
  });

  if (cityLoading || !city) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8fafc' }}>
        <span className="inline-block w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: '#e2e8f0', borderTopColor: '#4f46e5' }} />
      </div>
    );
  }

  const partnerCount = MOCK_PARTNERS.length;
  const questCount   = quests?.length ?? 0;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className="max-w-[430px] mx-auto pb-10">

        {/* Hero image */}
        <div className="relative" style={{ height: 260 }}>
          <img
            src={city.coverImage}
            alt={city.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.20) 50%, rgba(0,0,0,0.65) 100%)' }} />

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

          {/* City name over hero */}
          <div className="absolute bottom-5 left-5">
            <h1 className="text-white text-3xl font-bold">{city.name}</h1>
            <p className="text-white/80 text-base">{city.country}</p>
          </div>

          {!city.isAvailable && (
            <div className="absolute top-12 right-4">
              <span
                className="rounded-full px-3 py-1 text-white text-xs font-semibold"
                style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
              >
                Coming Soon
              </span>
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div className="flex bg-white mx-4 -mt-4 rounded-2xl relative z-10 py-4"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}>
          <StatBadge icon={<Map size={20} color="#4f46e5" />}      label="Quests"   value={String(questCount)} />
          <div style={{ width: 1, backgroundColor: '#f1f5f9', flexShrink: 0 }} />
          <StatBadge icon={<Building2 size={20} color="#f59e0b" />} label="Partners" value={String(partnerCount)} />
          <div style={{ width: 1, backgroundColor: '#f1f5f9', flexShrink: 0 }} />
          <StatBadge icon={<Users size={20} color="#22c55e" />}    label="Explorers" value="1.2k" />
        </div>

        {/* Quest list */}
        <div className="px-4 mt-6">
          <p className="font-bold text-base mb-4" style={{ color: '#0f172a' }}>
            Available Quests
          </p>
          {quests?.length === 0 && (
            <p className="text-sm text-center py-8" style={{ color: '#94a3b8' }}>
              No quests available yet.
            </p>
          )}
          <div className="flex flex-col gap-3">
            {quests?.map((quest, index) => (
              <CityQuestCard key={quest.id} quest={quest} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1 py-1">
      {icon}
      <span className="font-bold text-sm" style={{ color: '#0f172a' }}>{value}</span>
      <span className="text-xs" style={{ color: '#94a3b8' }}>{label}</span>
    </div>
  );
}

const FREE_QUEST_LIMIT = 3;

function CityQuestCard({ quest, index }: { quest: Quest; index: number }) {
  const isFree   = !quest.isPremium || index < FREE_QUEST_LIMIT;
  const isLocked = quest.isPremium && !isFree;

  return (
    <Link
      href={`/quest/${quest.id}`}
      className="block bg-white rounded-2xl overflow-hidden transition-opacity hover:opacity-95"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textDecoration: 'none' }}
    >
      {/* Cover image */}
      <div className="relative" style={{ height: 140 }}>
        <img
          src={quest.coverImage}
          alt={quest.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold capitalize text-white"
          style={{ backgroundColor: 'rgba(10,10,26,0.70)' }}
        >
          {quest.category.replace(/_/g, ' ')}
        </span>
        {!quest.isPremium && (
          <span className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: '#22c55e' }}>FREE</span>
        )}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
            <Lock size={28} color="#94a3b8" />
            <div className="flex items-center gap-1 rounded-full px-4 py-1.5" style={{ backgroundColor: '#f59e0b' }}>
              <Diamond size={12} color="#fff" />
              <span className="text-white font-bold text-sm">
                {quest.coinPrice ?? Math.round(quest.priceUsd * 100)} SC
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="font-bold text-base truncate" style={{ color: '#0f172a' }}>{quest.title}</p>
        <p className="text-sm mt-1 line-clamp-2" style={{ color: '#64748b' }}>{quest.description}</p>
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
          <span className="ml-auto rounded-full px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
            +{quest.route.length * 75} pts
          </span>
        </div>
      </div>
    </Link>
  );
}
