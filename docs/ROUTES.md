# Routes

All routes use the Next.js **App Router**. There are no API routes — the `/api/` directory does not exist.

## Route Map

| URL | File | Auth Required | Description |
|---|---|---|---|
| `/` | [src/app/page.tsx](../src/app/page.tsx) | No | Immediately redirects to `/welcome` |
| `/welcome` | [src/app/(auth)/welcome/page.tsx](../src/app/(auth)/welcome/page.tsx) | No | Landing page |
| `/login` | [src/app/(auth)/login/page.tsx](../src/app/(auth)/login/page.tsx) | No | Login form |
| `/register` | [src/app/(auth)/register/page.tsx](../src/app/(auth)/register/page.tsx) | No | Registration form |
| `/home` | [src/app/(tabs)/home/page.tsx](../src/app/(tabs)/home/page.tsx) | Yes | City selection |
| `/quests` | [src/app/(tabs)/quests/page.tsx](../src/app/(tabs)/quests/page.tsx) | Yes | Quest list |
| `/map` | [src/app/(tabs)/map/page.tsx](../src/app/(tabs)/map/page.tsx) | Yes | Interactive city map |
| `/qr` | — (no file) | Yes | Tab button shows "Coming Soon" alert |
| `/rewards` | [src/app/(tabs)/rewards/page.tsx](../src/app/(tabs)/rewards/page.tsx) | Yes | Partner rewards |
| `/profile` | [src/app/(tabs)/profile/page.tsx](../src/app/(tabs)/profile/page.tsx) | Yes | User profile |
| `/settings/personal-details` | [src/app/(tabs)/settings/personal-details/page.tsx](../src/app/(tabs)/settings/personal-details/page.tsx) | Yes | Personal details form |
| `/settings/saved-cards` | [src/app/(tabs)/settings/saved-cards/page.tsx](../src/app/(tabs)/settings/saved-cards/page.tsx) | Yes | Payment cards |
| `/settings/change-email` | [src/app/(tabs)/settings/change-email/page.tsx](../src/app/(tabs)/settings/change-email/page.tsx) | Yes | Change email |
| `/settings/password-update` | [src/app/(tabs)/settings/password-update/page.tsx](../src/app/(tabs)/settings/password-update/page.tsx) | Yes | Change password |
| `/settings/data-protection` | [src/app/(tabs)/settings/data-protection/page.tsx](../src/app/(tabs)/settings/data-protection/page.tsx) | Yes | Privacy / data |
| `/settings/notifications` | [src/app/(tabs)/settings/notifications/page.tsx](../src/app/(tabs)/settings/notifications/page.tsx) | Yes | Notification prefs |
| `/settings/login-history` | [src/app/(tabs)/settings/login-history/page.tsx](../src/app/(tabs)/settings/login-history/page.tsx) | Yes | Login activity log |
| `/settings/levels` | [src/app/(tabs)/settings/levels/page.tsx](../src/app/(tabs)/settings/levels/page.tsx) | Yes | Level progression info |
| `/settings/delete-account` | [src/app/(tabs)/settings/delete-account/page.tsx](../src/app/(tabs)/settings/delete-account/page.tsx) | Yes | Delete account |
| `/airport/onboarding` | [src/app/airport/onboarding/page.tsx](../src/app/airport/onboarding/page.tsx) | No | First-time Istanbul onboarding |
| `/city/[slug]` | [src/app/city/[slug]/page.tsx](../src/app/city/[slug]/page.tsx) | No | Dynamic city detail page |
| `/quest/[id]` | [src/app/quest/[id]/page.tsx](../src/app/quest/[id]/page.tsx) | No | Quest detail and start |
| `/quest/active` | [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx) | No | Active quest UI |
| `/coins` | [src/app/coins/page.tsx](../src/app/coins/page.tsx) | No | STaQ Coins shop |
| `/expenses` | [src/app/expenses/page.tsx](../src/app/expenses/page.tsx) | No | Purchase history |

## Route Groups

### `(auth)` group — [src/app/(auth)/layout.tsx](../src/app/(auth)/layout.tsx)
No bottom navigation. No auth guard. Used for unauthenticated entry points. The group name `(auth)` does not appear in the URL.

### `(tabs)` group — [src/app/(tabs)/layout.tsx](../src/app/(tabs)/layout.tsx)
Renders the bottom navigation bar with 5 tabs. Contains an **auth guard**: if `useAuthStore.userId` is null, redirects to `/welcome`. The group name `(tabs)` does not appear in the URL.

## Auth Guard Details

The auth guard is in [src/app/(tabs)/layout.tsx:22-30](../src/app/(tabs)/layout.tsx):

```tsx
useEffect(() => {
  if (!userId) {
    router.replace('/welcome');
  }
}, [userId, router]);

if (!userId) return null;
```

This is a **client-side** redirect only. There is no middleware-level protection.

## Bottom Tab Navigation

Defined in [src/app/(tabs)/layout.tsx](../src/app/(tabs)/layout.tsx):

```
Tab 1: Quests  → /quests   (List icon)
Tab 2: Map     → /map      (Map icon)
Tab 3: QR      → alert()   (QrCode icon — no route, shows "Coming Soon")
Tab 4: Rewards → /rewards  (Gift icon)
Tab 5: Profile → /profile  (User icon)
```

Active tab is highlighted in gold (`#f59e0b`). Inactive tabs are slate (`#64748b`).

## Dynamic Route Parameters

### `/city/[slug]`
- Parameter: `slug` (string) — matches `City.slug` in the data model
- Example: `/city/istanbul`
- Data: loaded via `repo.fetchCityBySlug(slug)`

### `/quest/[id]`
- Parameter: `id` (string) — matches `Quest.id` in the data model
- Example: `/quest/quest-old-city-walk`
- Data: loaded via `repo.fetchQuestById(id)` and `repo.fetchStepsForQuest(id)`

## Typical User Flow

```
/welcome
    ├── /register → login mock → /quests
    └── /login    → login mock → /quests

/quests (city must be selected via /home first)
    └── tap quest card → /quest/[id]
            └── "Start Quest" button → /quest/active
                    └── complete all steps → completion screen → /quests
```
