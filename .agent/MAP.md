# MAP — haddix-la_frontend

Foyer page. Read first; navigate from here.

## Identity

Frontend for **Haddix.la**, a personal portfolio site. Vue 3 SPA. Pairs with a separate Node/Express backend repo (`haddix-la_backend`). See [[gotchas]] for cross-repo issues.

Authoritative repo-level conventions: `AGENT.md` at the repo root. Read it before editing anything substantive — it captures the "do not introduce TypeScript, do not use npm, do not add Vuex" rules.

## Stack snapshot

- **Vue 3** with Composition API + `<script setup>`. JavaScript (no TS). `jsconfig.json` only.
- **Vite** build (`vite.config.js`). Alias `@` → `src/`.
- **Vuetify 3** for UI primitives (`v-row`, `v-col`, `v-btn`, etc.).
- **Pinia** for state (`src/stores/`). Stores are organized as a single export object in `src/stores/index.js` — see [[#layer-order]].
- **Vue Router** in `src/router/index.js`.
- **Axios** with a singleton instance in `src/api/index.js` and a thin wrapper in `src/api/apiWrapper.js`.
- **i18next** + `i18next-vue` + http-backend; bootstrapped in `src/plugins/i18nextParser/index.js`; runtime translations from `public/localization/locales/<lng>/{common,views,components}.json`.
- **AWS S3** via `@aws-sdk/client-s3` + Cognito Identity Pool (no static creds). Presigned PUT is the actual upload path; see [[transformations]].
- **No test runner.** `__tests__/` exists but is empty.

## Layer order

For any user-triggered action, data flows top to bottom:

```
view (src/views/*.vue)
  └─ component (src/components/**/*.vue)
       └─ Pinia store action (src/stores/modules/**)
            └─ apiWrapper (src/api/apiWrapper.js) OR raw `api` (src/api/index.js)
                 └─ axios instance (src/api/index.js)
                      └─ request/response interceptors (src/api/config/interceptors.js)
                           ↓
                      backend HTTP
                      ↑
            └─ model transform (src/models/Project.js, Role.js)
            └─ commit to store state
       ↑
  └─ reactive re-render
```

Two important deviations from this idealized flow:

- Many store actions call `api.get/post/patch/delete` **directly** instead of going through `apiWrapper`. The wrapper adds error toasts; bypassing it means errors are silently logged or re-thrown without UI feedback. See [[gotchas]].
- The router's `beforeEnter: [requireAuthGuard]` is applied broadly, but the guard's actual gate-list is `authRoutes = ['roles']` — only the `/roles` route is genuinely auth-gated. See [[routes/auth]] and [[gotchas]].

## Where do I look for X?

| Looking for… | Go to… |
|---|---|
| Routes (endpoints visible in URL bar) | `src/router/index.js` → linked pages in [[routes/index|routes/]] |
| Sidebar/menu items | `src/config/sitenav.js` (controls visibility/labels, separate from router) |
| Auth gate logic | `src/router/navigationGuards/requireAuthGuard.js` — see [[routes/auth]] |
| Project schema (FE shape) | `src/models/Project.js` — see [[entities/project]] |
| Role schema (FE shape) | `src/models/Role.js` — see [[entities/role]] |
| User/session/token logic | `src/stores/modules/user/index.js` — see [[entities/user]] |
| Backend base URL / env | `src/api/index.js` (hardcoded prod/dev split, not env-var driven) |
| Token attach / refresh | `src/api/config/interceptors.js` — see [[transformations]] |
| Local storage | `src/stores/modules/localStorage/index.js` (single keyed object `haddix_la`) |
| Toast/dialog/drawer/overlay UI primitives | `src/stores/modules/ui/*.js` + matching `src/components/Containers/*` |
| Async-loaded heavy components | `src/utils/helpers/asyncComponents.js` (use these refs in `showOverlay`/`showDialog`/toasts) |
| S3 upload queue | `src/stores/modules/uploadManager/index.js` + `s3Upload.js` — see [[transformations]] |
| Translations | `public/localization/locales/<lng>/{common,views,components}.json`; namespaces declared in `src/plugins/i18nextParser/index.js` |
| Vuetify theme tokens | `src/plugins/vuetify.js` |
| Dropdown enum lists (clients, roles, languages, resources) | `src/stores/modules/config/properties.js` (`projectClients`, `projectRoles`, `projectResources`, …) |
| Type/string constants | `src/stores/modules/config/types.js` (`REQUEST_STATUS__*`, `ATTACHMENT_USAGE_TYPE__*`, `UPLOAD_MANAGER_BUCKET__*`, etc.) |

## Catalog

Full page list lives in [[index]].
