// ─── Geo ──────────────────────────────────────────────────────────────────────

export interface LatLng {
  latitude: number;
  longitude: number;
}

// ─── City ─────────────────────────────────────────────────────────────────────

export interface City {
  id: string;
  slug: string;
  name: string;
  country: string;
  coverImage: string;
  isAvailable: boolean;
}

// ─── Quest ────────────────────────────────────────────────────────────────────

export type QuestCategory =
  | 'airport_arrival'
  | 'historical'
  | 'gastronomy'
  | 'hidden_gems'
  | 'nightlife'
  | 'practical'
  | 'family';

export interface Quest {
  id: string;
  cityId: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number;
  distanceKm: number;
  isPremium: boolean;
  priceUsd: number;
  coinPrice?: number;
  coverImage: string;
  rating: number;
  completionCount: number;
  startLocation: LatLng;
  route: LatLng[];
}

// ─── Quest Step ───────────────────────────────────────────────────────────────

export interface StepTask {
  type: 'arrive' | 'photo' | 'video' | 'quiz' | 'text_input' | 'find_person';
  question?: string;
  options?: string[];       // for quiz
  correctAnswer?: string;
  hint?: string;
}

export interface QuestStep {
  id: string;
  questId: string;
  order: number;
  title: string;
  description: string;
  location: LatLng;
  radius: number;           // proximity trigger in meters
  task: StepTask;
  audioUrl?: string;
  pointsReward: number;
}

// ─── Active Quest ─────────────────────────────────────────────────────────────

export interface CompletedStep {
  stepId: string;
  completedAt: string;      // ISO string
  taskResult?: string;      // user's answer or photo URL
  pointsEarned: number;
}

export interface ActiveQuestState {
  questId: string;
  userId: string;
  startedAt: string;        // ISO string
  currentStepIndex: number;
  completedSteps: CompletedStep[];
  totalPointsEarned: number;
  status: 'in_progress' | 'completed' | 'paused';
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  totalPoints: number;
  level: number;
  completedQuests: string[];  // quest IDs
  currentCity?: string;
  balance: number;            // wallet balance in USD cents
}

// ─── Partner & Offers ─────────────────────────────────────────────────────────

export interface Offer {
  id: string;
  partnerId: string;
  title: string;
  description: string;
  type: 'discount' | 'free_item' | 'points_redemption';
  value: number;              // percent or points cost
  validUntil: string;         // ISO string
  isActive: boolean;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  location: LatLng;
  address: string;
  description: string;
  coverImage: string;
  activeOffers: Offer[];
}
