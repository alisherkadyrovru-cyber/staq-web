# Design System

The project uses **Tailwind CSS v4** with a small set of custom color tokens. There is no external component library (no shadcn/ui, no MUI, no Radix). All UI components are built from scratch using Tailwind utility classes and inline styles.

---

## Color Palette

Defined in [src/app/globals.css](../src/app/globals.css) as Tailwind v4 theme tokens:

```css
@theme inline {
  --color-navy-950: #0a0a1a;   /* Body / page background */
  --color-navy-900: #0f0f2e;   /* Card background (dark screens) */
  --color-gold-400: #fbbf24;   /* Light gold / tagline text */
  --color-gold-500: #f59e0b;   /* Primary CTA background, active tab, logo theme */
  --color-gold-600: #d97706;   /* Darker gold / pressed state */
}
```

Additional colors used throughout the app (as inline hex values, not tokens):

| Color | Hex | Usage |
|---|---|---|
| Background (dark) | `#0a0a1a` | App body, welcome screen, active quest screen |
| Card background (dark) | `#0f0f2e` | Bottom tab bar, dark cards |
| Background (light) | `#f8fafc` | Quest list, profile, rewards (light-themed pages) |
| White | `#ffffff` | Card surfaces on light pages |
| Gold / Primary | `#f59e0b` | CTA buttons, active tab, points badges, coin color |
| Indigo / Secondary | `#4f46e5` | Links, secondary buttons, active step progress, filter chips |
| Dark Indigo | `#1e1b4b` | City name badge, QR tab pill background |
| Slate (secondary text) | `#64748b` | Body text, inactive tabs, hints |
| Light Slate | `#94a3b8` | Captions, timestamps, placeholder text |
| Dark text | `#0f172a` | Page titles, primary text on light backgrounds |
| Medium text | `#334155`, `#475569` | Secondary headings |
| Green | `#22c55e` | "FREE" badge, completed step marker |
| Red | `#ef4444` | Destructive actions (delete, sign out), error text |
| Blue | `#3b82f6` | Info banners, user location dot, audio guide |

---

## Typography

No custom fonts are loaded. The app uses the **browser default system font stack** (San Francisco on iOS/macOS, Roboto on Android, Segoe UI on Windows).

Font sizes used (as Tailwind utilities or inline `fontSize`):

| Size | Usage |
|---|---|
| `text-[11px]` | Tab labels |
| `text-xs` (12px) | Captions, badges, secondary info |
| `text-sm` (14px) | Body text, descriptions |
| `text-[15px]` | Settings list items |
| `text-base` (16px) | Quest card titles, button labels |
| `text-lg` (18px) | Page section headers, step titles |
| `text-xl` (20px) | Page titles (sticky headers) |
| `text-2xl` (24px) | Quest completion title |
| `text-3xl` (30px) | Points balance |

Font weights: `font-medium` (500), `font-semibold` (600), `font-bold` (700).

---

## Spacing & Layout

- **Max width**: `max-w-[430px]` — all screens are constrained to this width and centered.
- **Safe areas**: Bottom tab bar uses `paddingBottom: 'env(safe-area-inset-bottom)'` for notched phones.
- **Bottom tab bar height**: 64px.
- **Sticky headers**: Most `(tabs)/` pages have a sticky header with `top-0 z-10`.
- **Page bottom padding**: `pb-20` on main content to clear the fixed tab bar.

---

## Border Radius

- Buttons: `rounded-2xl` (16px) for primary CTAs, `rounded-full` for chips and pills
- Cards: `rounded-2xl` (16px)
- Form inputs: `rounded-xl` (12px)
- Small badges: `rounded-full`

---

## Shadows

Used sparingly, always as inline styles:

```
0 1px 3px rgba(0,0,0,0.08)   — Quest cards, reward cards
0 2px 8px rgba(0,0,0,0.04)   — Profile cards
0 2px 8px rgba(0,0,0,0.05)   — Coins balance card
0 -4px 16px rgba(0,0,0,0.15) — Active quest bottom panel (upward shadow)
```

---

## Interaction States

- Hover: `hover:opacity-90` or `hover:opacity-80` on buttons
- Active: `active:opacity-80` or `active:opacity-90` on touchable elements
- Disabled: `disabled:opacity-50`
- Transitions: `transition-opacity` or `transition-colors`

---

## Modal / Sheet Pattern

The app uses **bottom sheet** modals (slides up from the bottom) rather than centered dialogs for:
- Category filter sheet (quest list)
- Premium unlock sheet (quest list)
- Sign-out confirmation (profile)
- Exit quest confirmation (uses a centered modal instead)

Bottom sheets use this pattern:
```tsx
<div className="fixed inset-0 z-50 flex flex-col justify-end"
     style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>  {/* backdrop */}
  <div className="w-full max-w-[430px] mx-auto rounded-t-3xl" ...>
    {/* drag handle */}
    <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#e2e8f0' }} />
    {/* content */}
  </div>
</div>
```

---

## PWA / App-Like Features

**Manifest** ([public/manifest.json](../public/manifest.json)):
- `display: "standalone"` — hides browser chrome when added to home screen
- `background_color: "#0a0a1a"` — matches app background
- `theme_color: "#f59e0b"` — matches gold brand color
- Icons: 192×192 and 512×512 (with `purpose: "maskable"`)

**Viewport** (in [src/app/layout.tsx](../src/app/layout.tsx)):
- `maximumScale: 1, userScalable: false` — prevents pinch-zoom (native-app feel)
- `themeColor: '#f59e0b'` — browser chrome color on mobile

---

## Styling Approach

All styling is either:
1. **Tailwind utility classes** — for layout, flex, spacing, text sizes
2. **Inline `style={}` props** — for colors, pixel-exact sizes, and anything that Tailwind v4's new CSS-first API doesn't yet cover

There is no CSS Modules, styled-components, or emotion usage.
