import { create } from 'zustand';
import { City } from '../types';

interface CityStore {
  selectedCity: City | null;
  hasCompletedOnboarding: boolean; // true once airport onboarding was shown

  setSelectedCity: (city: City) => void;
  setOnboardingComplete: () => void;
}

export const useCityStore = create<CityStore>((set) => ({
  selectedCity: null,
  hasCompletedOnboarding: false,

  setSelectedCity: (city) => set({ selectedCity: city }),
  setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
}));
