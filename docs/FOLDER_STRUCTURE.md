# Folder Structure

```
staq-web/
│
├── src/
│   ├── app/                              # Next.js App Router — all pages live here
│   │   │
│   │   ├── (auth)/                       # Route group — unauthenticated screens
│   │   │   ├── layout.tsx                # Auth layout (no bottom nav)
│   │   │   ├── welcome/
│   │   │   │   └── page.tsx              # Landing page with hero image + CTA buttons
│   │   │   ├── login/
│   │   │   │   └── page.tsx              # Login form
│   │   │   └── register/
│   │   │       └── page.tsx              # Registration form
│   │   │
│   │   ├── (tabs)/                       # Route group — authenticated screens with bottom nav
│   │   │   ├── layout.tsx                # Bottom tab bar + auth guard
│   │   │   ├── home/
│   │   │   │   └── page.tsx              # City selection grid
│   │   │   ├── quests/
│   │   │   │   └── page.tsx              # Quest list with category filter
│   │   │   ├── map/
│   │   │   │   └── page.tsx              # Interactive city map (Leaflet)
│   │   │   ├── rewards/
│   │   │   │   └── page.tsx              # Partner offers and points balance
│   │   │   ├── profile/
│   │   │   │   └── page.tsx              # User profile + account settings menu
│   │   │   └── settings/                 # Nested settings pages
│   │   │       ├── personal-details/
│   │   │       │   └── page.tsx
│   │   │       ├── saved-cards/
│   │   │       │   └── page.tsx
│   │   │       ├── change-email/
│   │   │       │   └── page.tsx
│   │   │       ├── password-update/
│   │   │       │   └── page.tsx
│   │   │       ├── data-protection/
│   │   │       │   └── page.tsx
│   │   │       ├── notifications/
│   │   │       │   └── page.tsx
│   │   │       ├── login-history/
│   │   │       │   └── page.tsx
│   │   │       ├── levels/
│   │   │       │   └── page.tsx
│   │   │       └── delete-account/
│   │   │           └── page.tsx
│   │   │
│   │   ├── airport/
│   │   │   └── onboarding/
│   │   │       └── page.tsx              # First-time Istanbul arrival onboarding
│   │   │
│   │   ├── city/
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Dynamic city detail page
│   │   │
│   │   ├── quest/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx              # Quest detail: route preview, step list, Start button
│   │   │   └── active/
│   │   │       └── page.tsx              # Active quest: live map + task UI (full-screen)
│   │   │
│   │   ├── coins/
│   │   │   └── page.tsx                  # STaQ Coins shop (6 packages, purchase not wired)
│   │   │
│   │   ├── expenses/
│   │   │   └── page.tsx                  # Purchase history / expense tracker
│   │   │
│   │   ├── layout.tsx                    # Root layout: metadata, PWA icons, Providers wrapper
│   │   ├── page.tsx                      # Root page: immediately redirects to /welcome
│   │   └── globals.css                   # Tailwind import + custom CSS color tokens
│   │
│   ├── components/                       # Shared React components (currently all map-related)
│   │   ├── Map.tsx                       # City exploration map (partners, categories, filter)
│   │   ├── ActiveQuestMap.tsx            # Live quest map (user dot, step markers, polyline)
│   │   └── QuestRouteMap.tsx             # Static route preview (used on quest detail page)
│   │
│   └── lib/                              # All business logic, data, and utilities
│       ├── types.ts                      # TypeScript interfaces for the entire data model
│       ├── repo.ts                       # Data access layer (all DB/API calls go here)
│       ├── supabase.ts                   # Supabase client initialization (not yet used)
│       ├── providers.tsx                 # React Query QueryClientProvider wrapper
│       │
│       ├── store/                        # Zustand state stores
│       │   ├── authStore.ts              # User authentication state
│       │   ├── questStore.ts             # Active quest state (localStorage-persisted)
│       │   └── cityStore.ts              # Selected city + onboarding flag
│       │
│       ├── mock/                         # Mock data (used until Supabase is wired)
│       │   └── store.ts                  # MOCK_CITIES, MOCK_QUESTS, MOCK_STEPS, MOCK_PARTNERS
│       │
│       └── utils/                        # Pure utility functions
│           ├── geo.ts                    # Haversine distance, proximity check, bearing
│           └── audio.ts                  # No-op stub for future audio guide support
│
├── public/                               # Static assets served at root URL
│   ├── manifest.json                     # PWA manifest (display: standalone, icons, colors)
│   ├── logo.png                          # STaQ logo (used on welcome screen, 96×96)
│   ├── apple-touch-icon.png              # iOS home screen icon (180×180)
│   ├── icon-192.png                      # PWA icon (192×192)
│   ├── icon-512.png                      # PWA icon (512×512, maskable)
│   └── favicon.ico                       # Browser tab icon
│
├── docs/                                 # Technical documentation (this folder)
│
├── package.json                          # Dependencies and npm scripts
├── tsconfig.json                         # TypeScript config (strict, bundler resolution, @/* alias)
├── postcss.config.mjs                    # PostCSS config for Tailwind CSS v4
├── eslint.config.mjs                     # ESLint config (next/core-web-vitals + typescript)
├── next.config.js                        # Next.js config (currently empty — all defaults)
├── AGENTS.md                             # Instruction to read Next.js docs before coding
├── CLAUDE.md                             # References AGENTS.md
└── README.md                             # Minimal readme
```

## Key Conventions

- **Path alias**: `@/*` maps to `src/*`. Use `@/lib/repo` not `../../lib/repo`.
- **No `src/pages/` directory** — the project uses the **App Router** exclusively.
- **No `src/app/api/` directory** — there are no API routes. All data comes from the repo layer.
- **No `src/styles/` directory** — all styles are Tailwind utilities inline + `globals.css`.
- **No test files** — no test suite exists in the project at this time.
