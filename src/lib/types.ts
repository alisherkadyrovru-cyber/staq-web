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

// Per-quest completion screen content. Optional — quests without this get the
// generic completion screen. Quests with this get the extended reward screen.
export interface QuestCompletionContent {
  completionText: string;   // e.g. "You completed the Istanbul Old City Quest."
  journeySummary: string;   // paragraph shown below the stats card
  reward?: {
    sectionTitle: string;   // e.g. "Reward Recommendation"
    intro: string;          // e.g. "You have earned your final reward."
    partnerDescription: string;
    rewardOptions: string[]; // badge labels, e.g. ["STaQ discount", "Complimentary dessert"]
    redemptionNote: string;  // instruction for staff
  };
  secretBonus?: {
    title: string;
    text: string;
  };
}

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
  completionContent?: QuestCompletionContent; // custom completion/reward screen
}

// ─── Quest Step ───────────────────────────────────────────────────────────────

export interface StepTask {
  type: 'arrive' | 'photo' | 'video' | 'quiz' | 'text_input' | 'find_person'
       | 'photo_quiz' | 'video_quiz' | 'qr_photo';
  question?: string;          // quiz question, or single-task prompt for photo/video
  options?: string[];         // quiz answer options
  correctAnswer?: string;     // quiz correct answer
  hint?: string;
  acceptedAnswers?: string[]; // text_input: valid answer variants (normalized, case-insensitive)
  prompt?: string;            // combined types: instruction for the media (photo/video) part
  qrUnlockMessage?: string;   // qr_photo: message revealed after QR confirmation
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
