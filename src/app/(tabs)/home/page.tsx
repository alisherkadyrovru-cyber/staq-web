'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { fetchCities } from '@/lib/repo';
import { useAuthStore } from '@/lib/store/authStore';
import { useCityStore } from '@/lib/store/cityStore';
import { City } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const profile = useAuthStore((s) => s.profile);
  const { selectedCity, setSelectedCity, hasCompletedOnboarding } = useCityStore();

  const { data: cities, isLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  function handleCityPress(city: City) {
    if (!city.isAvailable) return;
    setSelectedCity(city);
    if (city.slug === 'istanbul' && !hasCompletedOnboarding) {
      router.push('/airport/onboarding');
    } else {
      router.push('/quests');
    }
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100%' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10"
        style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}
      >
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <img src="/logo.png" alt="STaQ" className="w-8 h-8 rounded-lg" />
            <p className="text-sm" style={{ color: '#64748b' }}>
              Hello, {profile?.name ?? 'Explorer'} 👋
            </p>
          </div>
          <div
            className="flex items-center gap-1 rounded-full px-3 py-1.5"
            style={{ backgroundColor: '#eff6ff' }}
          >
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span className="font-bold text-sm" style={{ color: '#3730a3' }}>
              {profile?.totalPoints ?? 0} pts
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div>
        {/* Hero banner */}
        <div
          className="mx-4 mt-4 rounded-3xl overflow-hidden relative"
          style={{ height: 208 }}
        >
          <img
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200"
            alt="Istanbul"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-6"
            style={{ backgroundColor: 'rgba(10,10,26,0.60)' }}
          >
            <p className="text-white text-xl font-bold">Ready for a quest?</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Pick a city and start exploring
            </p>
          </div>
        </div>

        {/* Section header */}
        <div className="px-5 mt-6 mb-3">
          <p className="text-lg font-bold" style={{ color: '#0f172a' }}>Destinations</p>
          <p className="text-sm mt-0.5" style={{ color: '#64748b' }}>More cities coming soon</p>
        </div>

        {/* City cards */}
        {isLoading ? (
          <div className="flex justify-center mt-10">
            <span
              className="inline-block w-8 h-8 border-2 rounded-full animate-spin"
              style={{ borderColor: '#e2e8f0', borderTopColor: '#4f46e5' }}
            />
          </div>
        ) : (
          <div className="px-4 flex flex-col gap-3 pb-6">
            {cities?.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                isSelected={selectedCity?.id === city.id}
                onPress={() => handleCityPress(city)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CityCard({
  city,
  isSelected,
  onPress,
}: {
  city: City;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      disabled={!city.isAvailable}
      className="w-full text-left rounded-2xl overflow-hidden transition-opacity"
      style={{ opacity: city.isAvailable ? 1 : 0.5 }}
    >
      <div className="relative" style={{ height: 176 }}>
        <img
          src={city.coverImage}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col justify-between p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.40)' }}
        >
          {/* Top badge */}
          <div className="flex justify-start">
            {!city.isAvailable && (
              <span
                className="rounded-full px-3 py-1 text-white text-xs font-semibold"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                Coming Soon
              </span>
            )}
            {city.isAvailable && isSelected && (
              <span
                className="rounded-full px-3 py-1 text-white text-xs font-semibold"
                style={{ backgroundColor: '#f59e0b' }}
              >
                Selected
              </span>
            )}
          </div>
          {/* City name */}
          <div>
            <p className="text-white text-2xl font-bold">{city.name}</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{city.country}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
