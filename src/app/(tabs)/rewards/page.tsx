'use client';

import { useQuery } from '@tanstack/react-query';
import { Trophy, MapPin, Tag, Gift, Star } from 'lucide-react';
import { fetchPartners } from '@/lib/repo';
import { useAuthStore } from '@/lib/store/authStore';
import { Partner, Offer } from '@/lib/types';

export default function RewardsPage() {
  const profile = useAuthStore((s) => s.profile);

  const { data: partners } = useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10"
        style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}
      >
        <div className="px-5 py-4">
          <p className="text-xl font-bold" style={{ color: '#0f172a' }}>Rewards</p>
          <p className="text-sm mt-0.5" style={{ color: '#64748b' }}>Earn points, unlock perks</p>
        </div>

        {/* Points balance card — inside sticky header to match RN */}
        <div
          className="mx-5 mb-4 rounded-2xl p-5 flex justify-between items-center"
          style={{ backgroundColor: '#0a0a1a' }}
        >
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Your Balance
            </p>
            <p className="text-3xl font-bold text-white mt-1">
              {profile?.totalPoints ?? 0}
            </p>
            <p className="text-sm font-semibold" style={{ color: '#fbbf24' }}>points</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Trophy size={48} color="#f59e0b" />
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Level {profile?.level ?? 1}
            </p>
          </div>
        </div>
      </div>

      {/* Partner list */}
      <div className="flex flex-col gap-4 p-4">
        <p className="font-bold text-base" style={{ color: '#334155' }}>Partner Offers</p>

        {partners?.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
    >
      {/* Cover image */}
      <img
        src={partner.coverImage}
        alt={partner.name}
        className="w-full object-cover"
        style={{ height: 128 }}
      />

      {/* Body */}
      <div className="p-4">
        {/* Name row */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-bold text-base" style={{ color: '#0f172a' }}>{partner.name}</p>
            <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{partner.category}</p>
          </div>
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: '#f1f5f9' }}
          >
            <MapPin size={11} color="#64748b" />
            <span className="text-xs" style={{ color: '#64748b' }}>Near you</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-sm mt-2 line-clamp-2" style={{ color: '#64748b' }}>
          {partner.description}
        </p>

        {/* Offers */}
        <div className="flex flex-col gap-2 mt-3">
          {partner.activeOffers.map((offer) => (
            <OfferRow key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OfferRow({ offer }: { offer: Offer }) {
  const iconEl =
    offer.type === 'discount'          ? <Tag  size={16} color="#64748b" /> :
    offer.type === 'free_item'         ? <Gift size={16} color="#64748b" /> :
                                         <Star size={16} fill="#f59e0b" color="#f59e0b" />;

  return (
    <div
      className="flex items-center gap-2 rounded-xl px-3 py-2.5"
      style={{ backgroundColor: '#f8fafc' }}
    >
      <span className="flex-shrink-0">{iconEl}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>{offer.title}</p>
        <p className="text-xs truncate" style={{ color: '#64748b' }}>{offer.description}</p>
      </div>
      {offer.type === 'points_redemption' && (
        <span
          className="flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-bold"
          style={{ backgroundColor: '#fef3c7', color: '#d97706' }}
        >
          {offer.value} pts
        </span>
      )}
    </div>
  );
}
