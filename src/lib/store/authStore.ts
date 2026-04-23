import { create } from 'zustand';
import { UserProfile } from '../types';

interface AuthState {
  userId: string | null;
  profile: UserProfile | null;
  isLoading: boolean;

  setUserId: (id: string | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  profile: null,
  isLoading: false,

  setUserId: (id) => set({ userId: id }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ userId: null, profile: null }),
}));
