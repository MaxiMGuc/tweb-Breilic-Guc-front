# Aviasales Frontend (React + TypeScript + Vite)

Frontend application for an airline tickets product with search, booking flow, profile area, and admin pages.

## Backend integration (test-variant)

This copy is wired to the backend in `../tweb-Breilic-Guc-backend`.

### How to run both sides

1. Start the backend first:
   ```bash
   cd ../tweb-Breilic-Guc-backend/eAviaSales.Api
   dotnet run --launch-profile http
   ```
   The API will listen on `http://localhost:5099`. Swagger UI: `http://localhost:5099/swagger`.

2. In a second terminal, start the frontend:
   ```bash
   npm install
   npm run dev
   ```
   App opens at `http://localhost:5173`.

### Environment

`.env.development` controls the API base URL and mock toggle:
```
VITE_API_BASE_URL=http://localhost:5099
VITE_USE_MOCKS=false
```
- Set `VITE_USE_MOCKS=true` to fall back to local mock data (no backend needed).
- After editing `.env.*`, restart `npm run dev`.

### Smoke test scenario

1. Open `/auth/register`, fill the form, submit → backend `POST /api/reg` should return 201.
2. The app auto-logins and redirects to `/profile`.
3. In DevTools → Application → Local Storage you'll see `breilic_auth_session_v1` with a `token` field.
4. Every protected request now carries `Authorization: Bearer <token>` (check Network tab).
5. To test admin pages, manually elevate the user in the DB:
   ```sql
   UPDATE Users SET Role = 'Admin' WHERE Email = 'your@email';
   ```
   Re-login to receive a new token, then `/admin/users` and `/admin/bookings` will work.
6. To test booking flow end-to-end, first create a product (flight) via Swagger as admin, then go through `Search → Ticket → Booking → Passengers → Payment → Pay now`. The order will be created on the backend and the success page will show its real reference (`ORD-<id>`).



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
