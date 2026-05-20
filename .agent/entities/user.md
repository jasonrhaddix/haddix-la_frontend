# User / Session

This SPA does not model a "User" as a domain object beyond the auth token. There is no profile, no roles list, no preferences-on-user. "User" here is essentially **"is there a valid access token?"**.

## Touch points

- **Store**: `src/stores/modules/user/index.js` (Pinia id `user`)
  - State: `accessToken`, `sessionToken`, `isAuthorizing`.
  - Getter: `userIsAuthenticated` — boolean derived from `!!accessToken`. This is the canonical check; do not hand-roll.
  - Actions: `rehydrateUserFromToken`, `login`, `logout`, `updateAccessTokenInState`, `createSessionToken`.

- **Token persistence**: `src/api/auth/TokenService.js`
  - Thin wrapper that reads/writes `access_token` to the centralized localStorage store (see [[#local-storage]]).
  - Note: `clearLocalAccessToken` actually clears the key `'refresh_token'` — likely a bug. See [[../gotchas]].

- **Token attach / refresh**: `src/api/config/interceptors.js`
  - Request interceptor injects `Authorization: Bearer <accessToken>` on every outgoing call when present.
  - Response interceptor catches `401`, hits `POST /auth/tokenrefresh` (with `withCredentials: true` to send the refresh cookie), updates state + storage, retries the original. If refresh itself returns 401/403, calls `userStore.logout()`.
  - The refresh cookie is **httpOnly** and managed by the backend — it is never visible to JS in this repo. See [[../routes/auth]].

- **Session token (guest projects)**: `userStore.sessionToken` is a UUID generated client-side at boot (`routing.init() → userStore.createSessionToken()`). It's attached to `createProject` payloads so guests can later distinguish their own guest projects in the list filter (see `src/views/Projects.vue`). It's **not** an auth credential; do not treat it as one.

## userIsAuthenticated vs route gating

Two things often confused:

1. `userStore.userIsAuthenticated` — used in components to *show/hide* admin UI (edit/delete buttons, "Sort" button, CMS drawer).
2. `requireAuthGuard` — Vue Router guard. Despite being attached to many routes, the actual gate-list inside the guard is `authRoutes = ['roles']`. See [[../routes/auth]] and [[../gotchas]].

## Local storage

- Single storage key: `haddix_la` (in `src/stores/modules/localStorage/index.js`).
- The store is an **object**, not a string. `get(prop)` reads a sub-key; `set({ key: val })` merges.
- Keys actually used in this repo: `access_token`, `lang`. Add new top-level user prefs here, not via raw `window.localStorage`.

## Related

- [[../routes/auth]]
- [[../transformations]]
- [[project]] — `sessionToken` participates in guest-project filtering
