# Known Issues

This document lists observable bugs, limitations, and rough edges found in the current codebase. No issue tracker exists in the repository.

---

## Critical (Blocks Real Usage)

### 1. Authentication is fully mocked
**File:** [src/lib/repo.ts:64-88](../src/lib/repo.ts)

`signUp()` and `signIn()` accept any input and always return a fake `userId`. No credentials are validated. There is no way to distinguish users.

**Impact:** The app cannot be used by real users.

---

### 2. User profile resets on every page reload
**File:** [src/lib/store/authStore.ts](../src/lib/store/authStore.ts)

`useAuthStore` has no persistence. On reload, `userId` becomes `null`, the auth guard fires, and the user is redirected to `/welcome`. Points, completed quests, and all progress are lost except for the in-progress quest (which is saved in localStorage by `questStore`).

**Impact:** Even in demo mode, logging in is required after every page refresh.

---

### 3. Quest completion does not persist
**File:** [src/app/quest/active/page.tsx:152-165](../src/app/quest/active/page.tsx)

The "Save to Memories" and "Back to Quests" buttons both call `clearActiveQuest()` and redirect. `repo.completeQuest()` is never called (it is a no-op). `profile.completedQuests` is never updated. The "Finished" tab on the quests page will always be empty.

**Impact:** Completing a quest has no lasting effect on the user's profile.

---

## Moderate (Incomplete Features)

### 4. `video` and `find_person` task types fall through to a generic button
**File:** [src/app/quest/active/page.tsx:501-518](../src/app/quest/active/page.tsx)

The `TaskUI` component handles `arrive`, `quiz`, `text_input`, and `photo`. Any other task type (`video`, `find_person`) hits the `default` branch, which renders a plain "Complete Task" button with no actual verification.

---

### 5. Photo upload creates an object URL that is never sent to a server
**File:** [src/app/quest/active/page.tsx:609-671](../src/app/quest/active/page.tsx)

`PhotoTask` uses `URL.createObjectURL(file)` to show a preview and passes the blob URL as `taskResult`. This URL is only valid in the current browser session — it is not uploaded anywhere. `completeStep({ taskResult: blobUrl })` stores a URL that becomes invalid after the page is closed.

---

### 6. Audio playback opens in a new browser tab
**File:** [src/app/quest/active/page.tsx:361-377](../src/app/quest/active/page.tsx)

The audio guide banner uses an `<a href={audioUrl} target="_blank">` link. There is no embedded player. All `audioUrl` values in mock data point to `https://example.com/audio/*.mp3` (non-existent URLs).

---

### 7. Exit quest does not actually save progress
**File:** [src/app/quest/active/page.tsx:418-451](../src/app/quest/active/page.tsx)

The exit modal says "Your progress will be saved." but the Exit button calls `router.replace('/quests')` without calling `repo.saveActiveQuestState()`. Progress remains in `localStorage` via `questStore`, but it is never synced to the server and is cleared on next quest start.

---

### 8. STaQ Coins balance always shows 0
**Files:** [src/app/coins/page.tsx](../src/app/coins/page.tsx), [src/app/(tabs)/profile/page.tsx](../src/app/(tabs)/profile/page.tsx)

The coin balance is read from `profile.balance` (in USD cents) or hardcoded to 0. The mock profile returns `balance: 0`. Purchasing coins shows a "coming soon" alert.

---

### 9. Completed quest date is hardcoded
**File:** [src/app/(tabs)/quests/page.tsx:193-197](../src/app/(tabs)/quests/page.tsx)

In the "Finished" tab, completed quest cards show "Completed on March 24, 2026" — a hardcoded date string. There is no real completion timestamp stored.

---

## Minor (UX / Edge Cases)

### 10. QR tab navigates to `/qr` which does not exist
**File:** [src/app/(tabs)/layout.tsx:52-75](../src/app/(tabs)/layout.tsx)

The QR tab button calls `alert()` and does not navigate. However, if the user somehow reaches `/qr` directly (e.g., bookmark), they will get a 404. No `/qr/page.tsx` exists.

---

### 11. `More` section items on Profile all show alert()
**File:** [src/app/(tabs)/profile/page.tsx:179](../src/app/(tabs)/profile/page.tsx)

Privacy, Language, Help & FAQ, and Feedback all trigger `alert('${label} coming soon')`. Native browser `alert()` is jarring on mobile.

---

### 12. No error UI when city is not found
**File:** [src/app/city/[slug]/page.tsx](../src/app/city/[slug]/page.tsx)

If a user navigates to `/city/unknown-slug`, `fetchCityBySlug()` returns `null`. The page may render incorrectly or crash depending on how null is handled.

---

### 13. `cityStore` is not persisted — city selection lost on reload
**File:** [src/lib/store/cityStore.ts](../src/lib/store/cityStore.ts)

If the user selects Istanbul, then refreshes the page, `selectedCity` becomes `null`. The quests page shows "No city selected" until the user goes back to `/home` and selects again.

---

### 14. `next-pwa` is installed but not configured
**File:** [next.config.js](../next.config.js)

`next-pwa ^5.6.0` is in `package.json` but `next.config.js` is empty (no `withPWA` wrapper). Service worker generation may not be active depending on the `next-pwa` defaults for version 5.6.

---

### 15. Notification bell on Profile page is a no-op
**File:** [src/app/(tabs)/profile/page.tsx:63](../src/app/(tabs)/profile/page.tsx)

The bell icon button in the profile header calls `alert('Notifications coming soon')`.

---

### 16. `FREE_QUEST_LIMIT` logic is index-based, not quest-based
**File:** [src/app/(tabs)/quests/page.tsx:25,63](../src/app/(tabs)/quests/page.tsx)

```typescript
const FREE_QUEST_LIMIT = 3;
const isFree = !quest.isPremium || index < FREE_QUEST_LIMIT;
```

This makes the first 3 quests free by their position in the list, regardless of their `isPremium` flag. If the list order changes or quests are filtered, different quests could become unexpectedly free or locked.
