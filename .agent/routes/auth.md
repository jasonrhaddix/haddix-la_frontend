# Routes: Auth

There is no `/login` SPA route — the login UI is a Vuetify `v-navigation-drawer` mounted globally from `App.vue` and toggled via the `ui/login` store. The "CMS" pill button in the corner opens it. See `src/components/Login/Login.vue`.

## Backend endpoints called from `userStore`

Defined in `src/stores/modules/user/index.js`. All use **raw `api`** and explicit `withCredentials: true` so the refresh cookie can ride along.

| Method | Path | Action | Notes |
|---|---|---|---|
| `POST` | `/auth/login` | `login(credentials)` | Expects `{ accessToken }` in response. Updates state + localStorage. |
| `POST` | `/auth/logout` | `logout()` | Clears local access token, routes to home. |
| `POST` | `/auth/tokenrefresh` | `rehydrateUserFromToken()` AND the response interceptor's silent-retry path | Sends no body. Refresh cookie is httpOnly and managed by the backend; not visible to JS. |

## requireAuthGuard — the gating reality

File: `src/router/navigationGuards/requireAuthGuard.js`.

Key fact: the guard contains a hard-coded allow-list:

```js
const authRoutes = ['roles']
```

Only routes whose `name` is in that array are actually blocked when unauthenticated. Many other routes (`projects`, `project-details`, `workflows`, `role-details`, `about`, `contact`, `labs`) carry `beforeEnter: [requireAuthGuard]` in `src/router/index.js`, **but the guard does not gate them** — for non-listed routes it just calls `routingStore.navigateToRoute(...)` and `next()`.

If you need a new route to be truly auth-gated, add its `name` to `authRoutes` in the guard (or, better, factor that list into `src/config/`).

The guard also:
- Calls `routingStore.navigateToRoute({ to, from })` — this drives `headerStore`/`navigationStore` UI side effects on every guarded navigation, regardless of whether the route is gated.
- Honors `to.meta.beforeEnterCallback(to, from, next)` if present (this is how the per-route fetches in [[projects]] and [[roles]] are triggered).

## Token refresh interceptor

`src/api/config/interceptors.js`:

- **Request**: attaches `Authorization: Bearer <accessToken>` if a token exists in localStorage.
- **Response**: on `401`, tries `POST /auth/tokenrefresh` once (gated by `originalConfig._retry`). On success, updates state + storage, retries the original. On refresh failure → `userStore.logout()`.
- Skip-list: `/auth/login`, `/auth/tokenrefresh` — these are never auto-retried (avoids loops).

See [[../transformations]] for the broader registry.

## Sidebar `needsAuth` vs route guard

`src/config/sitenav.js` declares `needsAuth: true/false` per nav item. This controls **whether the link is visible in the side drawer**, not whether the route is reachable by URL. Today only `roles` has `needsAuth: true`. This is independent of `requireAuthGuard` — they must be kept in sync by hand.

## Related

- [[../entities/user]]
- [[../transformations]]
- [[../gotchas]]
