# GO TOUR

GO TOUR is a travel platform that helps users discover destinations, compare accommodations, and connect with local experiences — primarily focused on Mozambique and the African region.

## Run & Operate

- `pnpm --filter @workspace/go-tour run dev` — run the frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Optional env: `VITE_GEMINI_API_KEY` — Google Gemini API key for AI search

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite (artifact: `go-tour`)
- Routing: react-router-dom v7
- Auth + DB: Supabase (`@supabase/supabase-js`)
- Animations: framer-motion
- AI Search: `@google/generative-ai` (Gemini)
- API: Express 5 (artifact: `api-server`)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/go-tour/src/` — main frontend app (JSX components)
  - `pages/` — all route pages (Welcome, Login, Signup, Home, etc.)
  - `components/` — shared UI components
  - `context/` — React context (AppContext, AuthContext)
  - `services/` — API services (aiSearchService, authValidation)
  - `lib/supabase.js` — Supabase client initialization
  - `hooks/` — custom hooks (useHomeData, useCooldown, useScrollDirection)
  - `data/` — static data (countries, translations)
  - `utils/` — utility functions (cropImage)
- `artifacts/go-tour/public/` — static assets (favicons, images)
- `artifacts/api-server/src/` — backend Express server
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)
- `lib/db/src/schema/` — Drizzle ORM schema

## Architecture decisions

- App uses Supabase directly from the frontend for auth and data — the Express API server is available for additional backend needs but Supabase handles auth/profiles.
- The app is mobile-first with a desktop breakpoint; it has both a bottom nav (mobile) and sidebar (desktop).
- Routing uses react-router-dom with animated transitions via framer-motion.
- The original app was ported from Vercel (already Vite + React, no Next.js conversion needed).

## Product

- Travel discovery platform for Mozambique/Africa region
- Browse destinations by category (Hotels, Apartments, Resorts, Guest Houses, etc.)
- User authentication via Supabase (email/password + OTP)
- Social features: feed, friends, messages, stories
- Utility screens: currency monitor, weather radar, timezone converter, local pulse
- AI-powered search (Gemini API)
- Profile management with photo cropping

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `main.tsx` imports `App.jsx` (not `App.tsx`) — the real app is in JSX, the scaffold placed a placeholder `App.tsx` which was removed.
- Supabase URL and anon key are hardcoded in `src/lib/supabase.js` (public anon key is safe to expose).
- `VITE_GEMINI_API_KEY` env var needed for AI search to work; app has a fallback if missing.
- Do not run `pnpm dev` or `pnpm run dev` at the workspace root — use workflow restart.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
