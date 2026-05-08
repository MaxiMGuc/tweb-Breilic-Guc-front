# Aviasales Frontend (React + TypeScript + Vite)

Frontend application for an airline tickets product with search, booking flow, profile area, and admin pages.

## Tech Stack

- React 19
- TypeScript 5
- Vite 8
- React Router DOM 7
- ESLint 9

## Project Structure

Main source directory: `src/`

- `components/` - reusable UI blocks (layout, cards, forms, nav, etc.)
- `pages/` - route-level pages (search, booking flow, profile, admin, help)
- `context/` - global app state providers (auth and booking)
- `data/` - local mock data for flights/users/bookings
- `hooks/` - shared hooks
- `utils/` - pure helper functions
- `types/` - shared TypeScript models
- `constants/` - app constants
- `assets/` - static frontend assets

## Routing Map

Router entrypoint is `src/main.tsx`.

Route groups:

- Public:
  - `/` home
  - `/search`, `/results`, `/trip/:id`, `/ticket/:id`
  - `/help`, `/help/support`, `/help/faq`
- Auth:
  - `/auth/login`, `/auth/register`
- User area:
  - `/profile`, `/profile/account`, `/profile/history`, `/profile/settings`
  - `/favorites`, `/my-trips`
- Booking flow:
  - `/booking`, `/booking/passengers`, `/booking/payment`, `/booking/success`
- Admin:
  - `/admin/flights`, `/admin/bookings`, `/admin/users`

## State Management

Global state is managed via React Context:

- `AuthContext` - authentication status and auth actions
- `BookingContext` - selected trip, passengers, and booking data

Page-level state is kept local with React hooks.

## Data and Storage Policy

Current implementation relies on mock/local data (`src/data/*`) and browser storage.

Recommended storage policy for future changes:

- Keep only non-sensitive UI/session metadata in storage.
- Do not persist full payment card data (`card number`, `CVC`, `expiry`).
- Centralize read/write logic via one storage adapter (instead of direct calls in pages).

## Development Commands

```bash
npm install
npm run dev
```

Other scripts:

- `npm run build` - type-check and production build
- `npm run preview` - preview built app
- `npm run lint` - run ESLint

## Engineering Conventions

- Use TypeScript types/interfaces for all shared entities in `types/`.
- Keep route pages thin; move reusable logic to hooks/utils/services.
- Prefer pure helpers in `utils/` for formatting, filtering, and mapping.
- Keep feature behavior deterministic and avoid implicit side effects in render paths.

## Near-Term Architecture Goals

1. Add role-aware route guards for private/admin routes.
2. Introduce a typed API layer (`client + services`) to decouple UI from data source.
3. Add route-level code splitting for better initial load performance.
4. Add automated tests for critical user flows (search, booking, auth guards).
