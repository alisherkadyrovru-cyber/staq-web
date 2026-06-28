# Database

## Current Status

**There is no active database connection.** The project is entirely backed by in-memory mock data defined in [src/lib/mock/store.ts](../src/lib/mock/store.ts).

Supabase has been chosen as the backend and the client is initialized in [src/lib/supabase.ts](../src/lib/supabase.ts), but no tables have been created and no queries are executed against Supabase.

---

## Supabase Client

**File:** [src/lib/supabase.ts](../src/lib/supabase.ts)

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

Required environment variables (not yet set up for production):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Mock Data

**File:** [src/lib/mock/store.ts](../src/lib/mock/store.ts)

Exports the following constants and helpers:

| Export | Type | Count |
|---|---|---|
| `MOCK_CITIES` | `City[]` | 4 (1 available, 3 coming soon) |
| `MOCK_QUESTS` | `Quest[]` | 3 (all for Istanbul) |
| `MOCK_STEPS` | `QuestStep[]` | 15 (5 + 4 + 6 across 3 quests) |
| `MOCK_PARTNERS` | `Partner[]` | 5 (all in Istanbul) |
| `getMockQuestById(id)` | helper | — |
| `getMockStepsForQuest(questId)` | helper | returns sorted by `order` |
| `getMockQuestsForCity(cityId)` | helper | — |

---

## Planned Database Schema

Based on the TypeScript interfaces in [src/lib/types.ts](../src/lib/types.ts), the expected Supabase tables would be:

### `cities`
| Column | Type | Notes |
|---|---|---|
| `id` | text (PK) | e.g. `city-istanbul` |
| `slug` | text | e.g. `istanbul` |
| `name` | text | |
| `country` | text | |
| `cover_image` | text | URL |
| `is_available` | boolean | |

### `quests`
| Column | Type | Notes |
|---|---|---|
| `id` | text (PK) | |
| `city_id` | text (FK → cities) | |
| `title` | text | |
| `description` | text | |
| `category` | text | enum: see QuestCategory |
| `difficulty` | text | `easy` / `medium` / `hard` |
| `duration_minutes` | integer | |
| `distance_km` | numeric | |
| `is_premium` | boolean | |
| `price_usd` | numeric | |
| `coin_price` | integer | nullable |
| `cover_image` | text | URL |
| `rating` | numeric | |
| `completion_count` | integer | |
| `start_location` | jsonb | `{ latitude, longitude }` |
| `route` | jsonb | array of `{ latitude, longitude }` |

### `quest_steps`
| Column | Type | Notes |
|---|---|---|
| `id` | text (PK) | |
| `quest_id` | text (FK → quests) | |
| `order` | integer | step sequence |
| `title` | text | |
| `description` | text | |
| `location` | jsonb | `{ latitude, longitude }` |
| `radius` | integer | proximity trigger in meters |
| `task` | jsonb | `{ type, question?, options?, correctAnswer?, hint? }` |
| `audio_url` | text | nullable |
| `points_reward` | integer | |

### `partners`
| Column | Type | Notes |
|---|---|---|
| `id` | text (PK) | |
| `name` | text | |
| `category` | text | e.g. `Restaurant`, `Café`, `Museum` |
| `location` | jsonb | `{ latitude, longitude }` |
| `address` | text | |
| `description` | text | |
| `cover_image` | text | URL |

### `offers`
| Column | Type | Notes |
|---|---|---|
| `id` | text (PK) | |
| `partner_id` | text (FK → partners) | |
| `title` | text | |
| `description` | text | |
| `type` | text | `discount` / `free_item` / `points_redemption` |
| `value` | integer | percent or points cost |
| `valid_until` | timestamptz | |
| `is_active` | boolean | |

### `users` (via Supabase Auth)
Supabase Auth manages the `auth.users` table automatically. The app would add a `profiles` table:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK, FK → auth.users) | |
| `name` | text | |
| `avatar_url` | text | nullable |
| `total_points` | integer | |
| `level` | integer | |
| `completed_quests` | text[] | array of quest IDs |
| `current_city` | text | nullable |
| `balance` | integer | wallet balance in USD cents |

### `active_quest_states`
| Column | Type | Notes |
|---|---|---|
| `quest_id` | text | |
| `user_id` | uuid | |
| `started_at` | timestamptz | |
| `current_step_index` | integer | |
| `completed_steps` | jsonb | array of CompletedStep |
| `total_points_earned` | integer | |
| `status` | text | `in_progress` / `completed` / `paused` |

---

## Migration Plan

To switch from mock to Supabase, only [src/lib/repo.ts](../src/lib/repo.ts) needs to change. Each function has a comment showing the Supabase equivalent:

```typescript
// Current (mock):
export async function signIn(email, password) {
  return { userId: `mock-user-${Date.now()}` };
}

// Future (Supabase):
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return { userId: data.user.id };
}
```
