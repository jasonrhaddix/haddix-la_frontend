# Playbook: Add a new SPA route / view

A new route in the URL bar is more than just `routes: [...]` — there are 3–4 ancillary files to keep in sync.

## Touch points (in dependency order)

1. **The view component** — `src/views/Your_View.vue`
   - Route-level components conventionally live in `src/views/`, not `src/components/`.
   - Use `<script setup>` and the Composition API. Don't introduce Options API.
   - Wire any data needs to a Pinia store action — don't call axios directly from a view.

2. **Route definition** — `src/router/index.js`
   - Add an entry to the `routes:` array.
   - Use lazy import: `component: () => import('@/views/Your_View.vue')`. The `/about` route is an outlier (uses an eager import + literal override); follow the rest of the file's pattern instead.
   - Decide on `beforeEnter`. If the route should be auth-gated, attach `[requireAuthGuard]` **and** add the route's `name` to `authRoutes` in `src/router/navigationGuards/requireAuthGuard.js`. Attaching the guard alone does nothing — see [[../routes/auth]].
   - If the route loads data, prefer the `meta.beforeEnterCallback` pattern used by `projects`/`role-details`/etc., and put the actual fetch in `routingStore` as a new `enter…Route()` action (`src/stores/modules/routing/index.js`).

3. **Side nav** — `src/config/sitenav.js`
   - Add an entry if the route should appear in the hamburger menu. `needsAuth: true` hides it for unauthenticated users (visibility only, not security).

4. **i18n keys for nav label** — `public/localization/locales/<lng>/common.json`
   - `Navigation.vue` reads the breadcrumb title via `common:SITE_NAV.ROUTES.<NAME>` (uppercased route name). Add the key in every locale.
   - Run `yarn i18next` after editing translated strings in templates.

5. **Header behavior** — `src/stores/modules/routing/index.js → enterRoute(route)`
   - The default behavior is "show header for everything except `'home'`". If the new route needs custom header logic, extend this switch.
   - `exitRouteTeardown(route)` is the place for any cleanup needed when *leaving* the route (currently empty for everything).

## Invariants

- Route `name` must be consistent across `router/index.js`, `sitenav.js`, `authRoutes` (if gated), and `common:SITE_NAV.ROUTES.<NAME>`.
- Don't hardcode `router.push('/your-path')` in components — use named routes (`router.push({ name: 'your-route' })`) via `routingStore.pushRoute(...)`.

## Related

- [[../routes/auth]]
- [[../routes/index]]
- [[add-pinia-store]]
