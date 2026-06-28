# Components

There are currently **3 shared components** in [src/components/](../src/components/). All are Leaflet map components that must be loaded dynamically (no SSR).

All page-level UI (cards, buttons, forms, modals) is written directly inside `page.tsx` files as local React components — not extracted to `src/components/`. This is a deliberate early-stage choice.

---

## `Map.tsx`

**File:** [src/components/Map.tsx](../src/components/Map.tsx)

**Used by:** [src/app/(tabs)/map/page.tsx](../src/app/(tabs)/map/page.tsx)

**Purpose:** The main city exploration map shown on the "Map" tab. Displays partner locations and quest start points as interactive pins.

### Props

```tsx
// No props — fetches its own data internally via React Query
```

### Features

- Leaflet map with OpenStreetMap tiles centered on Istanbul (41.0082, 28.9784)
- Custom colored circular pins by category:
  - Restaurant → orange (`#f97316`)
  - Café → purple (`#8b5cf6`)
  - Museum → teal (`#14b8a6`)
  - Souvenir Shop → pink (`#ec4899`)
  - Default → indigo (`#4f46e5`)
- Category filter chips at the top (shows/hides pins by category)
- Bottom drawer that slides up when a pin is tapped — shows partner name, address, description, and active offers
- FAB button "Center on me" — requests geolocation and flies the map to the user's position
- Quest availability badge on partner cards if the partner is near a quest start point

### Data Sources

- `fetchPartners()` from `repo.ts` — loads all partner locations
- `fetchQuestsByCity(cityId)` from `repo.ts` — used to show quest badges

---

## `ActiveQuestMap.tsx`

**File:** [src/components/ActiveQuestMap.tsx](../src/components/ActiveQuestMap.tsx)

**Used by:** [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx)

**Purpose:** The live map shown during an active quest. Tracks user position and shows step markers along the route.

### Props

```tsx
interface Props {
  steps: QuestStep[];          // All steps for the current quest
  currentStepIndex: number;    // Which step the user is currently on
  userLocation: LatLng | null; // Live GPS position (or null if not available)
}
```

### Features

- Polyline connecting all step locations (indigo, semi-transparent)
- Step markers with color coding:
  - **Blue** (`#3b82f6`) with pulsing ring — current step
  - **Green** (`#22c55e`) — completed steps
  - **Gray** (`#94a3b8`) — upcoming steps
- User position as a **blue dot** with white border
- Auto-flies to the current step marker when `currentStepIndex` changes
- `fitBounds` on initial load to show all steps

---

## `QuestRouteMap.tsx`

**File:** [src/components/QuestRouteMap.tsx](../src/components/QuestRouteMap.tsx)

**Used by:** [src/app/quest/[id]/page.tsx](../src/app/quest/[id]/page.tsx)

**Purpose:** A static, non-interactive route preview shown on the quest detail page before the user starts a quest.

### Props

```tsx
interface Props {
  steps: QuestStep[];   // All steps to display
}
```

### Features

- `fitBounds` to show all steps with padding
- Step markers with color coding:
  - **Indigo** — first step
  - **Amber** — last step
  - **Gray** — all middle steps
- Polyline connecting all steps
- Map interaction disabled (`scrollWheelZoom={false}`, `dragging={false}`)
- Responsive height — fills its container

---

## Page-Level Local Components

These are defined inside `page.tsx` files and are not in `src/components/`. They are not reusable across pages.

| Component | Defined In | Purpose |
|---|---|---|
| `QuestCard` | [src/app/(tabs)/quests/page.tsx](../src/app/(tabs)/quests/page.tsx) | Quest card with cover image, stats, lock overlay |
| `EmptyState` | [src/app/(tabs)/quests/page.tsx](../src/app/(tabs)/quests/page.tsx) | Empty state for quest list tabs |
| `PartnerCard` | [src/app/(tabs)/rewards/page.tsx](../src/app/(tabs)/rewards/page.tsx) | Partner card with cover image and offers |
| `OfferRow` | [src/app/(tabs)/rewards/page.tsx](../src/app/(tabs)/rewards/page.tsx) | Single offer row inside a partner card |
| `MiniStat` | [src/app/(tabs)/profile/page.tsx](../src/app/(tabs)/profile/page.tsx) | Small stat tile (points, quests done) |
| `ProximityPanel` | [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx) | "Walk to marker" panel when not in range |
| `TaskUI` | [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx) | Dispatcher — renders the correct task type |
| `QuizTask` | [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx) | Multiple-choice quiz with correct/wrong feedback |
| `TextTask` | [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx) | Free-text answer input |
| `PhotoTask` | [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx) | File upload / camera capture |
| `TaskDoneBanner` | [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx) | Green success banner after task completion |
| `CompletionRow` | [src/app/quest/active/page.tsx](../src/app/quest/active/page.tsx) | Stat row on the quest completion screen |

## Icon Library

All icons come from [Lucide React](https://lucide.dev/) (`lucide-react ^1.8.0`). No custom SVG icons are used. Lucide icon names used throughout the codebase include: `List`, `Map`, `QrCode`, `Gift`, `User`, `MapPin`, `SlidersHorizontal`, `Clock`, `Ruler`, `Star`, `Lock`, `Diamond`, `Globe`, `Check`, `X`, `Trophy`, `Compass`, `Bell`, `ChevronRight`, `CreditCard`, `Mail`, `KeyRound`, `Shield`, `History`, `Trash2`, `Languages`, `HelpCircle`, `MessageSquare`, `Tag`, `ChevronLeft`, `Info`, `CheckCircle2`, `Mic`.
