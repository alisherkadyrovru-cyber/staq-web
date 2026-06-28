# Current Status

**As of 2026-06-28**

## Overall State

The project is in **early MVP / prototype stage**. The core UI and navigation are complete. The quest gameplay loop (browse → start → walk → complete tasks → finish) is functional end-to-end using mock data. No real backend is connected.

---

## What Works

| Feature | Status |
|---|---|
| Welcome / Login / Register screens | UI complete, auth is mocked |
| City selection (Istanbul) | Works with mock data |
| Quest list with filtering | Fully functional |
| Quest detail page with map preview | Fully functional |
| Active quest: GPS tracking | Works (browser geolocation) |
| Active quest: Proximity detection | Works (Haversine formula) |
| Active quest: Quiz tasks | Works |
| Active quest: Text input tasks | Works |
| Active quest: Photo tasks | File upload works; no server upload |
| Active quest: `arrive` tasks | Auto-complete on proximity |
| Active quest: DEV simulation buttons | Works (allows testing without walking) |
| Active quest: Progress persistence | Works (localStorage via Zustand) |
| Quest completion screen | Works |
| Interactive city map | Works (Leaflet + partner pins) |
| Map category filter | Works |
| Map bottom drawer | Works |
| Map "Center on me" | Works |
| Rewards page | Display only (no redemption) |
| Profile page | Display only |
| Settings pages (9 pages) | UI shells — no backend |
| STaQ Coins shop | UI complete, purchases not wired |
| Bottom tab navigation | Works |
| Auth guard | Works |
| PWA manifest | Configured |

---

## What Does NOT Work

| Feature | Reason |
|---|---|
| Real authentication | All auth returns mock IDs |
| Supabase database | Client initialized, no tables, no queries |
| Points persistence across sessions | Profile is mock, resets on reload |
| Completed quests list | `profile.completedQuests` never written |
| Coins balance | Always shows 0 |
| In-app purchases | Shows "coming soon" alert |
| QR scanning | Shows "coming soon" alert |
| Partner offer redemption | UI exists, no redemption logic |
| All settings form submissions | Forms render but submit nothing |
| Audio guides | Stub function only, links open in new tab |
| Video tasks | Falls through to generic "Complete Task" button |
| `find_person` tasks | Falls through to generic "Complete Task" button |
| Push notifications | Not implemented |
| Offline support | `next-pwa` installed but not configured |
| Barcelona, Tokyo, Lisbon quests | No data — cities marked `isAvailable: false` |

---

## Mock Data Summary

All content is hardcoded in [src/lib/mock/store.ts](../src/lib/mock/store.ts):

- **4 cities** (1 available: Istanbul)
- **3 quests** (all Istanbul):
  - Old City Walk — 5 steps, free, historical
  - Street Food Hunt — 4 steps, free, gastronomy
  - Hidden Gems of Beyoğlu — 6 steps, premium (49 SC), hidden_gems
- **15 quest steps** total across 3 quests
- **5 Istanbul partners** with 2 offers each (10 offers total):
  - Karaköy Lokantası (Restaurant)
  - Hamdi Restaurant (Restaurant)
  - Mandabatmaz (Café)
  - Arasta Bazaar (Souvenir Shop)
  - Istanbul Modern (Museum)

---

## Development Experience

- **DEV simulate buttons** exist in the active quest page to bypass real GPS walking.
  - "DEV — Simulate Arrival" moves virtual position 50m toward the target step.
  - "DEV — Use Test Photo" submits a random picsum.photos URL as the photo.
- Payment button shows "In-app purchase coming soon. This will use your iOS/Android payment system."
- Several features show `alert('XYZ coming soon')` placeholders.

---

## Known Gaps

1. **No test suite** — there are no unit, integration, or E2E tests.
2. **No error handling** — `repo.ts` functions do not handle errors; React Query error states exist but error UI is not implemented on most pages.
3. **No loading states** — only the quest list has a spinner; other pages have no loading UI.
4. **Session not persisted** — `authStore` has no localStorage persistence; user must log in every time the page loads.
5. **No environment file** — there is no `.env.example` or `.env.local` in the repository. Supabase vars must be set manually.
