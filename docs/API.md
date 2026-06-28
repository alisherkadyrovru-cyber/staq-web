# API

## There Are No API Routes

The project has **no `/api/` directory** and **no server-side API routes**. There is no `src/app/api/` folder.

All data access goes through the repository layer: [src/lib/repo.ts](../src/lib/repo.ts).

---

## Data Access Layer (`repo.ts`)

**File:** [src/lib/repo.ts](../src/lib/repo.ts)

This is the single interface between components and data. Currently all functions return mock data. Each function has a comment showing the Supabase replacement.

### Cities

```typescript
fetchCities(): Promise<City[]>
```
Returns all cities. Currently returns `MOCK_CITIES` (4 cities).

```typescript
fetchCityBySlug(slug: string): Promise<City | null>
```
Returns a city by its URL slug. Returns `null` if not found.

---

### Quests

```typescript
fetchQuestsByCity(cityId: string): Promise<Quest[]>
```
Returns all quests for a given city. Components pass `selectedCity.id`.

```typescript
fetchQuestById(id: string): Promise<Quest | null>
```
Returns a single quest by ID. Used on the quest detail page (`/quest/[id]`).

---

### Quest Steps

```typescript
fetchStepsForQuest(questId: string): Promise<QuestStep[]>
```
Returns all steps for a quest, **sorted by `step.order`**. Used when starting and during a quest.

---

### Partners

```typescript
fetchPartners(): Promise<Partner[]>
```
Returns all partners (with their `activeOffers` embedded). Used on the Rewards and Map pages.

```typescript
fetchPartnersByCity(cityId: string): Promise<Partner[]>
```
Currently returns all partners regardless of `cityId` (mock has Istanbul-only data). In production would filter by city.

---

### Authentication

```typescript
signUp(email: string, password: string, name: string): Promise<{ userId: string }>
```
**Mock:** Returns `{ userId: 'mock-user-<timestamp>' }`. Accepts any input.
**Future:** `supabase.auth.signUp({ email, password })`

```typescript
signIn(email: string, password: string): Promise<{ userId: string }>
```
**Mock:** Returns `{ userId: 'mock-user-<timestamp>' }`. Accepts any credentials.
**Future:** `supabase.auth.signInWithPassword({ email, password })`

```typescript
signOut(): Promise<void>
```
**Mock:** No-op (logs to console).
**Future:** `supabase.auth.signOut()`

---

### User Profile

```typescript
fetchUserProfile(userId: string): Promise<UserProfile>
```
**Mock:** Returns a hardcoded profile (`name: 'Explorer'`, `totalPoints: 0`, `level: 1`).
**Future:** Fetch from `profiles` table by `userId`.

```typescript
updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile>
```
**Mock:** Merges `updates` with the mock profile and returns the result. Does not persist.
**Future:** Upsert to `profiles` table.

---

### Active Quest State

```typescript
saveActiveQuestState(state: ActiveQuestState): Promise<void>
```
**Mock:** Logs to console only.
**Future:** Upsert to `active_quest_states` table.

```typescript
fetchActiveQuestState(userId: string, questId: string): Promise<ActiveQuestState | null>
```
**Mock:** Always returns `null`.
**Future:** Fetch from `active_quest_states` table.

```typescript
completeQuest(userId: string, questId: string, totalPoints: number): Promise<void>
```
**Mock:** Logs to console only.
**Future:** Mark quest complete, credit points to user's profile.

---

## External Services

### Supabase (planned backend)

- Package: `@supabase/supabase-js ^2.104.1`
- Client: [src/lib/supabase.ts](../src/lib/supabase.ts)
- Docs: https://supabase.com/docs
- Requires: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars

### OpenStreetMap (map tiles)

Used by Leaflet for map tile rendering. No API key required. Tile URL pattern:
```
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

### Unsplash (images)

All cover images (`coverImage` fields in mock data) are Unsplash URLs with `?w=800` parameter. These are static references — no Unsplash API key is used.

### Payment (not yet implemented)

The coins purchase page (`/coins`) shows a "Coming soon" alert. No payment provider SDK is integrated yet. The UI mentions "iOS/Android payment system" (likely Apple Pay / Google Pay via the web Payment Request API or a native app bridge).
