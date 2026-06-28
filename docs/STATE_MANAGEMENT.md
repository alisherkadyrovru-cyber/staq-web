# State Management

The project uses **Zustand v5** for all global state. There are no Redux, Context API stores, or other state libraries. TanStack React Query handles server data caching separately.

## Stores Overview

| Store | File | Persisted | Description |
|---|---|---|---|
| `useAuthStore` | [src/lib/store/authStore.ts](../src/lib/store/authStore.ts) | No | User session (userId + profile) |
| `useQuestStore` | [src/lib/store/questStore.ts](../src/lib/store/questStore.ts) | Yes (localStorage) | Active quest progress |
| `useCityStore` | [src/lib/store/cityStore.ts](../src/lib/store/cityStore.ts) | No | Selected city + onboarding flag |

---

## `useAuthStore`

**File:** [src/lib/store/authStore.ts](../src/lib/store/authStore.ts)

Holds the current user's authentication state. Not persisted — user must log in again on page reload (expected behavior since auth is mocked).

### State Shape

```typescript
interface AuthState {
  userId: string | null;         // null = logged out
  profile: UserProfile | null;   // full profile once loaded
  isLoading: boolean;            // true while fetching profile
}
```

### Actions

| Action | Description |
|---|---|
| `setUserId(id)` | Set after successful login/register |
| `setProfile(profile)` | Set after fetching the user profile |
| `setLoading(loading)` | Toggle loading state during async operations |
| `logout()` | Clears both `userId` and `profile` |

### Who Uses It

- [(tabs)/layout.tsx](../src/app/(tabs)/layout.tsx) — auth guard checks `userId`
- [profile/page.tsx](../src/app/(tabs)/profile/page.tsx) — reads `profile` to display name, level, points
- [quests/page.tsx](../src/app/(tabs)/quests/page.tsx) — reads `profile.completedQuests` for "Finished" tab
- [rewards/page.tsx](../src/app/(tabs)/rewards/page.tsx) — reads `profile.totalPoints` and `profile.level`
- [login/page.tsx](../src/app/(auth)/login/page.tsx), [register/page.tsx](../src/app/(auth)/register/page.tsx) — call `setUserId` and `setProfile`

---

## `useQuestStore`

**File:** [src/lib/store/questStore.ts](../src/lib/store/questStore.ts)

Holds the full state of any quest the user has started. **Persisted to `localStorage`** under the key `staq-quest-store` so progress survives a page refresh.

### State Shape

```typescript
interface QuestStore {
  activeQuest: Quest | null;            // The quest being played
  activeSteps: QuestStep[];             // All steps for that quest
  activeState: ActiveQuestState | null; // Progress: currentStepIndex, completedSteps, points
  _hasHydrated: boolean;                // True once localStorage has been read on mount
}
```

### Actions

| Action | Description |
|---|---|
| `setActiveQuest(quest, steps, userId)` | Initializes a new quest, sets `status: 'in_progress'` |
| `advanceStep()` | Increments `currentStepIndex`; sets `status: 'completed'` if last step |
| `completeStep(completedStep)` | Appends to `completedSteps`, adds `pointsEarned` to total |
| `clearActiveQuest()` | Resets all state (called after quest completion or exit) |
| `setHasHydrated(v)` | Called by Zustand's `onRehydrateStorage` callback |

### Hydration Guard

Because localStorage reads happen asynchronously on the client, components that depend on `useQuestStore` should wait for `_hasHydrated === true` before making decisions based on `activeState`. The [quest/active/page.tsx](../src/app/quest/active/page.tsx) does this to avoid a race condition where the guard fires before stored state is loaded.

### localStorage Key

`staq-quest-store` — JSON-serialized via Zustand's `createJSONStorage(() => localStorage)`.

---

## `useCityStore`

**File:** [src/lib/store/cityStore.ts](../src/lib/store/cityStore.ts)

Holds which city the user has selected and whether the onboarding flow has been shown. Not persisted — resets on page reload.

### State Shape

```typescript
interface CityStore {
  selectedCity: City | null;        // The currently selected city
  hasCompletedOnboarding: boolean;  // True after airport onboarding was shown
}
```

### Actions

| Action | Description |
|---|---|
| `setSelectedCity(city)` | Called when user picks a city from /home |
| `setOnboardingComplete()` | Called after airport/onboarding page is dismissed |

### Who Uses It

- [quests/page.tsx](../src/app/(tabs)/quests/page.tsx) — reads `selectedCity` to load quests for the right city
- [map/page.tsx](../src/app/(tabs)/map/page.tsx) — reads `selectedCity`
- [home/page.tsx](../src/app/(tabs)/home/page.tsx) — calls `setSelectedCity`
- [airport/onboarding/page.tsx](../src/app/airport/onboarding/page.tsx) — calls `setOnboardingComplete`

---

## TanStack React Query

**File:** [src/lib/providers.tsx](../src/lib/providers.tsx)

React Query is used for all `repo.ts` data fetching inside components. It is **not** used for state — only for caching async data.

The `QueryClientProvider` wraps the entire app via the root layout ([src/app/layout.tsx](../src/app/layout.tsx)).

### Query Keys Used

| Query Key | Function Called | Page |
|---|---|---|
| `['quests', selectedCity?.id]` | `fetchQuestsByCity` | quests/page.tsx |
| `['quest', id]` | `fetchQuestById` | quest/[id]/page.tsx |
| `['steps', id]` | `fetchStepsForQuest` | quest/[id]/page.tsx |
| `['partners']` | `fetchPartners` | rewards/page.tsx, map/page.tsx |

### Configuration

Default `QueryClient` configuration is used (no custom stale times or retry settings).
