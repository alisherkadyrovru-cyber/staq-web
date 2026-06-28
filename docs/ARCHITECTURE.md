# Architecture

## High-Level Overview

```
Browser (PWA)
    │
    ├── Next.js App Router (src/app/)
    │       ├── (auth) group — unauthenticated pages
    │       └── (tabs) group — authenticated pages with bottom nav
    │
    ├── React Components (src/components/)
    │       └── Map components (Leaflet, loaded dynamically)
    │
    ├── State Layer (src/lib/store/)
    │       ├── authStore (Zustand) — user session
    │       ├── questStore (Zustand + localStorage) — active quest
    │       └── cityStore (Zustand) — selected city
    │
    ├── Data Layer (src/lib/repo.ts)
    │       └── Currently: mock data from src/lib/mock/store.ts
    │           Future: Supabase calls via src/lib/supabase.ts
    │
    └── Utilities (src/lib/utils/)
            ├── geo.ts — Haversine distance, proximity check, bearing
            └── audio.ts — no-op stub for future audio guide support
```

## Architectural Decisions

### 1. Repository Pattern (`src/lib/repo.ts`)

All data operations go through a single file. Components never import from `mock/store.ts` or `supabase.ts` directly. This makes the Supabase migration a one-file change.

```
Component → repo.ts → mock/store.ts   (today)
Component → repo.ts → supabase.ts     (tomorrow)
```

### 2. Route Groups

Next.js [route groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) separate authentication flows from authenticated flows without affecting the URL:

- `(auth)/` — Welcome, Login, Register. No bottom nav, no auth guard.
- `(tabs)/` — All main app screens. Has the bottom navigation bar and an auth guard that redirects to `/welcome` if `userId` is null.

### 3. Zustand for State Management

Three lightweight stores handle all runtime state:

| Store | File | Persistence |
|---|---|---|
| `useAuthStore` | [src/lib/store/authStore.ts](../src/lib/store/authStore.ts) | None (session-only) |
| `useQuestStore` | [src/lib/store/questStore.ts](../src/lib/store/questStore.ts) | `localStorage` (key: `staq-quest-store`) |
| `useCityStore` | [src/lib/store/cityStore.ts](../src/lib/store/cityStore.ts) | None (session-only) |

`useQuestStore` persists to `localStorage` so an active quest survives page refresh.

### 4. Dynamic Map Imports

Leaflet does not support server-side rendering. All three map components are loaded using `next/dynamic` with `{ ssr: false }`:

```tsx
// Example from src/app/quest/active/page.tsx
const ActiveQuestMap = dynamic(() => import('@/components/ActiveQuestMap'), { ssr: false });
```

This prevents hydration errors that would occur if Leaflet tried to access `window` during SSR.

### 5. TanStack React Query for Data Fetching

React Query wraps all `repo.ts` calls inside components. This provides:
- Automatic caching (no redundant network calls)
- Loading and error states
- Easy cache invalidation when data changes

The `QueryClientProvider` is set up in [src/lib/providers.tsx](../src/lib/providers.tsx) and injected into the root layout.

### 6. Mobile-First Layout Constraint

The entire app is constrained to `max-w-[430px]` centered on the screen. This mimics the iPhone Pro width and ensures the app looks correct whether opened on a phone or a desktop browser. All fixed/sticky elements use the same `max-w-[430px] left-1/2 -translate-x-1/2` pattern.

## Data Flow: Starting a Quest

```
User taps "Start Quest" on /quest/[id]/page.tsx
    │
    ├── Calls repo.fetchQuestById(id) and repo.fetchStepsForQuest(id)
    │
    ├── Calls useQuestStore.setActiveQuest(quest, steps, userId)
    │       └── Writes to localStorage via Zustand persist middleware
    │
    └── router.push('/quest/active')
            │
            └── /quest/active/page.tsx reads from useQuestStore
                    ├── navigator.geolocation.watchPosition() — tracks user
                    ├── isWithinRadius() from geo.ts — checks proximity
                    └── On arrival: unlocks task UI, user completes task
                            └── completeStep() → advanceStep() → repeat
```

## Data Flow: Authentication (Current Mock)

```
User submits /login or /register form
    │
    └── repo.signIn(email, password)  ← returns mock userId
            │
            └── useAuthStore.setUserId(userId)
                    └── useAuthStore.setProfile(mockProfile)
                            └── (tabs)/layout.tsx sees userId → renders tabs
```

## Supabase Integration (Planned)

[src/lib/supabase.ts](../src/lib/supabase.ts) creates the Supabase client using environment variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

These variables must be set for Supabase to work. Currently the client is initialized but all `repo.ts` functions return mock data and do not call `supabase.*` methods. Migration requires only changing the implementations inside `repo.ts`.
