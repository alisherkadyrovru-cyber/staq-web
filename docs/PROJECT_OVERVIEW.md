# STaQ — Project Overview

## What is STaQ?

**STaQ** stands for **Self Travel & Quest**. It is a gamified city exploration web application that turns tourist destinations into interactive adventures. Users explore cities on foot, complete location-based challenges, earn points, and redeem rewards at partner businesses.

The application is built as a **Progressive Web App (PWA)** with a mobile-first design targeting a max viewport of 430px (standard smartphone width). The UI and UX are designed to closely resemble a native mobile app.

## Core Concept

1. A user arrives in a city (e.g. Istanbul).
2. They browse available **Quests** — curated walking routes with 4–6 stops.
3. At each stop (**Step**), they must physically arrive at the GPS location.
4. Once in range, they unlock a **Task**: answer a quiz question, take a photo, or type a text answer.
5. Completing tasks earns **Points**.
6. Points and completed quests unlock **Partner Offers** — discounts or free items at local restaurants, shops, and museums.
7. Some quests are **Premium** and require **STaQ Coins** (in-app currency) to unlock.

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| State Management | Zustand | ^5.0.12 |
| Data Fetching | TanStack React Query | ^5.100.1 |
| Maps | Leaflet + React Leaflet | 1.9.4 / ^5.0.0 |
| Backend (planned) | Supabase | ^2.104.1 |
| Icons | Lucide React | ^1.8.0 |
| PWA | next-pwa | ^5.6.0 |

## Current State (as of 2026-06-28)

The application is in **early development / MVP stage**:

- All data is currently served from **in-memory mock data** ([src/lib/mock/store.ts](../src/lib/mock/store.ts)).
- Supabase client is initialized but **not connected** to any live database.
- Authentication is mocked — any email/password combination logs in successfully.
- Payment for premium quests shows "Coming soon" alerts.
- QR scanning is a "Coming soon" placeholder.

## Only Available City

**Istanbul, Turkey** is the only city with live content (quests, steps, and partner offers). Three other cities (Barcelona, Tokyo, Lisbon) exist in the mock data but are marked `isAvailable: false` and show as "Coming Soon".

## Key Files for Orientation

| File | Purpose |
|---|---|
| [src/lib/types.ts](../src/lib/types.ts) | All TypeScript interfaces — start here to understand the data model |
| [src/lib/repo.ts](../src/lib/repo.ts) | All data access functions — the single source of truth for data operations |
| [src/lib/mock/store.ts](../src/lib/mock/store.ts) | All mock data — cities, quests, steps, partners |
| [src/app/layout.tsx](../src/app/layout.tsx) | Root layout, metadata, PWA config |
| [src/app/(tabs)/layout.tsx](../src/app/(tabs)/layout.tsx) | Bottom navigation bar and auth guard |

## Running the Project

```bash
npm run dev     # Development server (http://localhost:3000)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint check
```

The root URL `/` immediately redirects to `/welcome` ([src/app/page.tsx](../src/app/page.tsx)).
