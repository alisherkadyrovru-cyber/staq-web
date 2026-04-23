/**
 * lib/repo.ts — Data layer
 *
 * ALL database / API calls go through here.
 * Currently backed by mock data. When Supabase is ready, swap implementations
 * in this file only — no component changes needed.
 */

import {
  City,
  Quest,
  QuestStep,
  Partner,
  UserProfile,
  ActiveQuestState,
} from './types';
import {
  MOCK_CITIES,
  MOCK_PARTNERS,
  getMockQuestById,
  getMockQuestsForCity,
  getMockStepsForQuest,
} from './mock/store';

// ─── Cities ───────────────────────────────────────────────────────────────────

export async function fetchCities(): Promise<City[]> {
  return MOCK_CITIES;
}

export async function fetchCityBySlug(slug: string): Promise<City | null> {
  return MOCK_CITIES.find((c) => c.slug === slug) ?? null;
}

// ─── Quests ───────────────────────────────────────────────────────────────────

export async function fetchQuestsByCity(cityId: string): Promise<Quest[]> {
  return getMockQuestsForCity(cityId);
}

export async function fetchQuestById(id: string): Promise<Quest | null> {
  return getMockQuestById(id) ?? null;
}

// ─── Quest Steps ──────────────────────────────────────────────────────────────

export async function fetchStepsForQuest(questId: string): Promise<QuestStep[]> {
  return getMockStepsForQuest(questId);
}

// ─── Partners ─────────────────────────────────────────────────────────────────

export async function fetchPartners(): Promise<Partner[]> {
  return MOCK_PARTNERS;
}

export async function fetchPartnersByCity(_cityId: string): Promise<Partner[]> {
  // In production this would filter by city; mock has Istanbul-only partners.
  return MOCK_PARTNERS;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<{ userId: string }> {
  // Mock: return a fake userId.
  // Replace with: const { data, error } = await supabase.auth.signUp({ email, password })
  console.log('[repo] signUp mock', { email, name });
  return { userId: `mock-user-${Date.now()}` };
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ userId: string }> {
  // Mock: accept any credentials.
  // Replace with: const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  console.log('[repo] signIn mock', { email });
  return { userId: `mock-user-${Date.now()}` };
}

export async function signOut(): Promise<void> {
  // Replace with: await supabase.auth.signOut()
  console.log('[repo] signOut mock');
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export async function fetchUserProfile(userId: string): Promise<UserProfile> {
  // Mock profile
  return {
    id: userId,
    name: 'Explorer',
    email: 'explorer@staq.app',
    avatarUrl: undefined,
    totalPoints: 0,
    level: 1,
    completedQuests: [],
    currentCity: 'city-istanbul',
    balance: 0,
  };
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>,
): Promise<UserProfile> {
  const current = await fetchUserProfile(userId);
  return { ...current, ...updates };
}

// ─── Active Quest ─────────────────────────────────────────────────────────────

export async function saveActiveQuestState(state: ActiveQuestState): Promise<void> {
  // In production: upsert to Supabase table.
  console.log('[repo] saveActiveQuestState mock', state.questId);
}

export async function fetchActiveQuestState(
  userId: string,
  questId: string,
): Promise<ActiveQuestState | null> {
  // In production: fetch from Supabase.
  return null;
}

export async function completeQuest(
  userId: string,
  questId: string,
  totalPoints: number,
): Promise<void> {
  // In production: mark quest complete, credit points.
  console.log('[repo] completeQuest mock', { userId, questId, totalPoints });
}
