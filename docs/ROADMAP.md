# Roadmap

This document describes what needs to be built based on the current state of the codebase and the explicit TODOs found in the source code.

**Note:** This is derived from code comments, `console.log('[repo] ... mock')` stubs in [src/lib/repo.ts](../src/lib/repo.ts), `alert('... coming soon')` calls in pages, and the overall gaps visible in the implementation. No external product spec or planning document was available to consult.

---

## Phase 1 — Backend Integration (Blocking)

These items block the app from working for real users.

### 1.1 Set Up Supabase

- Create a Supabase project.
- Create tables: `cities`, `quests`, `quest_steps`, `partners`, `offers`, `profiles`, `active_quest_states` (see [DATABASE.md](./DATABASE.md) for the expected schema).
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables.
- Seed cities, quests, steps, partners, and offers from the mock data.

**Files to change:** [src/lib/repo.ts](../src/lib/repo.ts) only — each function has a comment showing the Supabase replacement call.

### 1.2 Real Authentication

Replace mock auth in [src/lib/repo.ts](../src/lib/repo.ts):

- `signUp` → `supabase.auth.signUp()`
- `signIn` → `supabase.auth.signInWithPassword()`
- `signOut` → `supabase.auth.signOut()`

After login, call `fetchUserProfile(userId)` and store the real profile in `useAuthStore`.

### 1.3 Persist Auth Session

`useAuthStore` ([src/lib/store/authStore.ts](../src/lib/store/authStore.ts)) currently has no persistence. After Supabase auth is wired, listen to `supabase.auth.onAuthStateChange()` to restore the session on page reload without requiring re-login.

### 1.4 Write Quest Completion to Database

In [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx), the "Save to Memories" button calls `clearActiveQuest()` and redirects. Before clearing, it should:
- Call `repo.completeQuest(userId, questId, totalPoints)` — currently a no-op.
- Update `profile.completedQuests` and `profile.totalPoints` in Supabase.
- Update `useAuthStore.profile` with the new values.

---

## Phase 2 — Core Gameplay Features

### 2.1 Active Quest State Sync

Currently quest progress only lives in `localStorage`. Add:
- `repo.saveActiveQuestState(state)` — should upsert to `active_quest_states` table.
- `repo.fetchActiveQuestState(userId, questId)` — should reload progress on re-entry.
- Resume logic in [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx): if active state exists in DB, resume from `currentStepIndex`.

### 2.2 QR Scanning

The QR tab ([src/app/(tabs)/layout.tsx:52-75](../src/app/(tabs)/layout.tsx)) currently shows a "Coming soon" alert. Implement:
- A `/qr` route with a camera-based QR scanner.
- QR codes at physical partner locations that trigger offer redemption or quest step completion.

### 2.3 Partner Offer Redemption

The Rewards page ([src/app/(tabs)/rewards/page.tsx](../src/app/(tabs)/rewards/page.tsx)) shows offers but has no redemption UI. Add:
- A "Redeem" button on each offer.
- Logic to deduct points (`points_redemption` type) or verify quest completion (`discount`, `free_item` types).
- Generate a redemption code or show a QR code to present at the partner.

### 2.4 Premium Quest Unlock with Coins

The premium unlock sheet ([src/app/(tabs)/quests/page.tsx:277-347](../src/app/(tabs)/quests/page.tsx)) shows the coin price but the "Unlock" button navigates directly to the quest without deducting coins. Add:
- Check user coin balance before allowing unlock.
- Deduct coins from user's profile.
- Persist unlocked quests per user.

---

## Phase 3 — Payments

### 3.1 In-App Coin Purchases

The Coins page ([src/app/coins/page.tsx](../src/app/coins/page.tsx)) shows the "Buy" button but it fires a "coming soon" alert. Add:
- A payment provider integration (Stripe, RevenueCat, or native IAP via a mobile wrapper).
- On successful payment, credit the purchased coins to the user's profile.

---

## Phase 4 — Missing Task Types

Two task types are defined in [src/lib/types.ts](../src/lib/types.ts) but fall through to a generic "Complete Task" button in [src/app/quest/active/page.tsx:509-517](../src/app/quest/active/page.tsx):

### 4.1 Video Task
- Camera capture or file upload for video.
- Upload to Supabase Storage or another storage provider.
- Store the video URL as `taskResult` in the completed step.

### 4.2 Find Person Task
- UI to scan a QR code on a "person" (guide, greeter) or enter a code they provide.
- Verification against a code stored in the step's `task` definition.

---

## Phase 5 — Audio Guides

The audio guide feature is partially stubbed:
- [src/lib/utils/audio.ts](../src/lib/utils/audio.ts) contains a no-op `configureAudioSession()` function.
- Steps with `audioUrl` show a "Play" link that opens the URL in a new browser tab.
- This comment in `audio.ts` says: "Real implementation uses expo-av — requires a custom dev build."

For the web version, add:
- An embedded `<audio>` element with play/pause controls.
- Auto-play when the task unlocks (with user permission).

---

## Phase 6 — Settings & Account Management

All 9 settings pages ([src/app/(tabs)/settings/](../src/app/(tabs)/settings/)) are UI shells with no backend wiring. Each needs:
- `personal-details` — read/write name and avatar from `profiles` table.
- `saved-cards` — integrate payment provider's saved payment method API.
- `change-email` — `supabase.auth.updateUser({ email })`.
- `password-update` — `supabase.auth.updateUser({ password })`.
- `data-protection` — GDPR data export/deletion.
- `notifications` — push notification preferences (requires push provider).
- `login-history` — log and display sign-in events.
- `levels` — already has some UI (level names exist in `profile/page.tsx`); add level thresholds logic.
- `delete-account` — `supabase.auth.admin.deleteUser()` (requires service role key, must be server-side).

---

## Phase 7 — Additional Cities

Add quests for Barcelona, Tokyo, and Lisbon (currently `isAvailable: false` in mock data). Each city needs:
- At least 3 quests (mix of free and premium).
- Quest steps with real GPS coordinates.
- Partner data.
- Cover images.

---

## Phase 8 — Quality & Infrastructure

- **Test suite** — no tests exist; add at minimum unit tests for `geo.ts` utilities and integration tests for `repo.ts`.
- **Error handling** — React Query error states are available but no error UI is shown.
- **Loading states** — only quest list has a spinner; add skeleton screens or loading indicators elsewhere.
- **Offline support** — configure `next-pwa` service worker caching for quest data.
- **Push notifications** — quest reminders and achievement unlocks.
- **Analytics** — user behavior tracking.
- **Environment file** — add `.env.example` documenting required variables.
