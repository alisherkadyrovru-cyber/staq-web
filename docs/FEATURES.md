# Features

This document describes every feature that exists in the current codebase. Features are marked with their implementation status.

---

## Authentication

**Status: Mock only — any credentials work**

- **Welcome Screen** ([src/app/(auth)/welcome/page.tsx](../src/app/(auth)/welcome/page.tsx)): Full-screen hero image (Istanbul skyline), STaQ logo, tagline, "Start Exploring" and "I already have an account" buttons.
- **Register** ([src/app/(auth)/register/page.tsx](../src/app/(auth)/register/page.tsx)): Form for name, email, password. Calls `repo.signUp()` → returns mock userId → sets auth store → redirects to `/home`.
- **Login** ([src/app/(auth)/login/page.tsx](../src/app/(auth)/login/page.tsx)): Form for email and password. Calls `repo.signIn()` → returns mock userId → sets auth store → redirects to `/quests`.
- **Auth Guard**: All `(tabs)/` routes check `useAuthStore.userId`. If null, redirect to `/welcome`.
- **Sign Out**: Available on Profile page. Shows confirmation modal. Calls `repo.signOut()` + `authStore.logout()` + redirects to `/welcome`.

---

## City Selection

**Status: Functional (Istanbul only)**

- **Home Page** ([src/app/(tabs)/home/page.tsx](../src/app/(tabs)/home/page.tsx)): Grid of cities fetched from `repo.fetchCities()`. Istanbul is selectable. Barcelona, Tokyo, Lisbon show as "Coming Soon" with a lock overlay.
- **City Detail** ([src/app/city/[slug]/page.tsx](../src/app/city/[slug]/page.tsx)): Shows city info fetched by slug.
- **City Store** ([src/lib/store/cityStore.ts](../src/lib/store/cityStore.ts)): Persists selection in memory for the session.
- **Airport Onboarding** ([src/app/airport/onboarding/page.tsx](../src/app/airport/onboarding/page.tsx)): First-time onboarding shown after city selection.

---

## Quest Browsing

**Status: Fully functional with mock data**

Located in [src/app/(tabs)/quests/page.tsx](../src/app/(tabs)/quests/page.tsx).

- **Quest List**: Shows all quests for the selected city as cards with cover image, title, description, stats (duration, distance, rating), category badge, and points estimate.
- **Three Tabs**:
  - **All** — all quests with optional category filter
  - **Active** — shows the in-progress quest (only one can be active at a time)
  - **Finished** — shows quests in `profile.completedQuests`
- **Category Filter**: Bottom sheet with checkboxes for all 7 categories (`historical`, `gastronomy`, `hidden_gems`, `nightlife`, `family`, `practical`, `airport_arrival`). Supports multi-select.
- **Premium Lock**: Quests with `isPremium: true` show a lock overlay and price badge. Tapping opens a premium unlock sheet. The first 3 quests (`FREE_QUEST_LIMIT = 3`) are always accessible regardless of `isPremium` flag.
- **Empty States**: Contextual empty state messages for each tab.

---

## Quest Detail

**Status: Fully functional with mock data**

Located in [src/app/quest/[id]/page.tsx](../src/app/quest/[id]/page.tsx).

- Quest metadata: title, cover image, category, difficulty, duration, distance, rating, completion count.
- Step list: numbered list of all steps with titles and `pointsReward`.
- **Route Preview Map** ([src/components/QuestRouteMap.tsx](../src/components/QuestRouteMap.tsx)): Static Leaflet map showing the route polyline and step markers.
- **Start Quest Button**: Calls `questStore.setActiveQuest()` and navigates to `/quest/active`.

---

## Active Quest

**Status: Functional — geolocation works, task types implemented**

Located in [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx).

### Layout
Three-layer fixed layout (covers full viewport, hides tab bar):
1. **Top bar** (56px): Exit button, quest title, current points total.
2. **Map area** (fills remaining height above panel): Live `ActiveQuestMap`.
3. **Bottom panel** (45vh): Step info, task UI, progress bar.

### Geolocation
- Uses `navigator.geolocation.watchPosition()` with `enableHighAccuracy: true`.
- Proximity checked with `isWithinRadius()` from [src/lib/utils/geo.ts](../src/lib/utils/geo.ts).
- **DEV Simulate button**: Moves the simulated position 50m toward the current step. Tap ~`ceil(radius/50)` times to trigger unlock.

### Task Types
| Type | UI | Completion Trigger |
|---|---|---|
| `arrive` | No UI — auto-completes on arrival | GPS proximity |
| `quiz` | Multiple-choice buttons with correct/wrong feedback | Select correct answer |
| `text_input` | Text input + Submit button | Submit (validated against `correctAnswer` if set) |
| `photo` | File upload with camera capture | Upload or "DEV — Use Test Photo" button |
| `video` | Not yet implemented (falls through to "Complete Task" button) | Button tap |
| `find_person` | Not yet implemented (falls through to "Complete Task" button) | Button tap |

### Progress
- Progress bar shows `currentStepIndex / totalSteps * 100%`.
- `completeStep()` → adds points, appends to `completedSteps`.
- `advanceStep()` → increments `currentStepIndex`; marks `status: 'completed'` on last step.

### Audio Guide
When a step has `audioUrl` and the task is completed, an audio banner appears with a "Play" link (opens the URL in a new tab). No embedded audio player — the browser handles it.

### Quest Completion Screen
Shows: Trophy icon, quest title, total points earned, steps completed, time taken, "Save to Memories" and "Back to Quests" buttons. Both buttons call `clearActiveQuest()` and redirect to `/quests`.

### Exit Quest
Button in top bar shows a confirmation modal ("Your progress will be saved"). "Exit" button clears the quest and redirects. Progress is stored in `questStore` (localStorage) — though `clearActiveQuest()` is currently called on both exit and completion, so no actual resume is implemented.

---

## Interactive City Map

**Status: Functional**

Located in [src/app/(tabs)/map/page.tsx](../src/app/(tabs)/map/page.tsx), component in [src/components/Map.tsx](../src/components/Map.tsx).

- Leaflet map centered on Istanbul.
- Partner pins with category-colored icons.
- Category filter chips above the map.
- Bottom drawer when pin is tapped: partner details, offers list.
- "Center on me" FAB using browser geolocation API.

---

## Rewards

**Status: Display only — redeeming offers is not implemented**

Located in [src/app/(tabs)/rewards/page.tsx](../src/app/(tabs)/rewards/page.tsx).

- Shows user's points balance and level.
- Lists all partners with their active offers.
- Offer types displayed: discount (Tag icon), free item (Gift icon), points redemption (Star icon + points cost badge).
- No "Redeem" button exists yet — UI is display-only.

---

## Profile & Settings

**Status: Profile display is functional; all settings pages are UI shells**

**Profile Page** ([src/app/(tabs)/profile/page.tsx](../src/app/(tabs)/profile/page.tsx)):
- Avatar placeholder (Compass icon in indigo circle).
- Name, email, level badge (clickable → `/settings/levels`).
- Stats: Earned Points, Quests Done.
- STaQ Coins balance with link to `/coins`.
- Account Settings menu (8 items, all navigate to settings pages).
- More menu (4 items: Privacy, Language, Help & FAQ, Feedback — all show "coming soon" alert).
- Sign Out button with confirmation modal.

**Settings Pages** — all are UI shells with back navigation. No form submissions are wired to any data layer:
- [personal-details](../src/app/(tabs)/settings/personal-details/page.tsx)
- [saved-cards](../src/app/(tabs)/settings/saved-cards/page.tsx)
- [change-email](../src/app/(tabs)/settings/change-email/page.tsx)
- [password-update](../src/app/(tabs)/settings/password-update/page.tsx)
- [data-protection](../src/app/(tabs)/settings/data-protection/page.tsx)
- [notifications](../src/app/(tabs)/settings/notifications/page.tsx)
- [login-history](../src/app/(tabs)/settings/login-history/page.tsx)
- [levels](../src/app/(tabs)/settings/levels/page.tsx) — shows level progression (Wanderer → Explorer → Pathfinder → Trailblazer → Legend)
- [delete-account](../src/app/(tabs)/settings/delete-account/page.tsx)

---

## STaQ Coins Shop

**Status: UI complete, purchases not wired**

Located in [src/app/coins/page.tsx](../src/app/coins/page.tsx).

- Shows current coin balance (always 0 — not wired).
- 6 coin packages in a 2-column grid:
  - 100 coins — $10.00
  - 200 coins — $15.00 (POPULAR badge)
  - 500 coins — $35.00
  - 1000 coins — $65.00
  - 2000 coins — $100.00
  - 5000 coins — $200.00 (BEST VALUE badge)
- Tapping a package selects it; the buy button activates.
- "Buy" button shows: "In-app purchase coming soon."
- Link to `/expenses` page.

---

## Expenses

**Status: UI shell**

Located in [src/app/expenses/page.tsx](../src/app/expenses/page.tsx). Shows an empty purchase history page. No data source wired.

---

## QR Scanner

**Status: Placeholder only**

The QR tab in the bottom bar fires `alert('Coming Soon 🚧')`. No QR scanning implementation exists.

---

## Geolocation Utilities

**Status: Fully implemented**

Located in [src/lib/utils/geo.ts](../src/lib/utils/geo.ts).

- `distanceMetres(a, b)` — Haversine formula, accurate spherical distance.
- `isWithinRadius(userLocation, target, radiusMetres)` — proximity trigger check.
- `bearingDegrees(a, b)` — compass bearing for navigation guidance.

---

## PWA

**Status: Configured**

- `manifest.json` in [public/](../public/manifest.json): standalone display mode, themed icons.
- `next-pwa` package installed but configuration in `next.config.js` is empty (defaults only).
- Service worker generation: depends on `next-pwa` defaults.
- No explicit offline caching strategy has been set up.
