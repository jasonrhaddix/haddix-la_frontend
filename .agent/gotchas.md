# Gotchas

Behavioral surprises worth remembering. Append-only.

## Routing / auth

- **`requireAuthGuard` only gates `'roles'`.** All authoritative-looking routes (`projects`, `project-details`, `role-details`, `workflows`, `about`, `contact`, `labs`) carry `beforeEnter: [requireAuthGuard]` in `src/router/index.js`, but the guard contains `const authRoutes = ['roles']` and only blocks names in that list. Other routes are reachable by URL even when unauthenticated. See [[routes/auth]].
- **`sitenav.js` `needsAuth` is for menu visibility, not route security.** The two systems must be kept in sync by hand. Today only `roles` has `needsAuth: true`.
- **`router.beforeEach` resets header title on every navigation.** If you set a title in a `beforeEnter` you'll see a brief blank before the new title appears. Set it in the store action that loads the record (e.g. `fetchProjectById`), not in the route definition.
- **`/projects/project-details` and `/roles/role-details` without an id redirect to `home`** — the empty-id redirects sit before the `:_id` routes.
- **About route has a double `component:` declaration.** `src/router/index.js` defines `component: () => import(...)` then immediately `component: About` for the `/about` route. The literal-import (`About`) wins. Harmless today; surprising if you tree-shake.

## Stores

- **Pinia store ids don't always match folder names.** The roles store is registered as `'role'` (singular), not `'roles'`. The upload manager is `'uploadManage'` (truncated). When debugging with Pinia devtools, search by id, not folder.
- **`src/stores/modules/projectTree/index.js` is malformed.** It uses the setup-store overload (`defineStore('projectTree', () => { ... })`) but the body is an object literal expression with a `state:` label — not a function returning state. The store works as long as nothing reads from it. Don't extend it without rewriting the shape.
- **`projects/index.js` has two `catch (err) { throw error }` bugs.** Both `sortProjects` and `deleteProject` reference an undefined `error` in their catch blocks (parameter is named `err`). Real failures throw `ReferenceError` instead of the original axios error. Cold paths today, but plan around it if you wire UI to those errors.
- **`navigation.js`'s `disableNavigation(delay)` references undefined `enableDelay`.** Calling with a truthy `delay` will throw. Stick to the no-arg form until fixed.

## API / data

- **Many store actions bypass `apiWrapper`.** Most use raw `api.get/post/patch/delete`, so axios errors do **not** produce automatic toasts. Only `projectsStore.updateProject` currently goes through `apiPatch`. If you add a new action and want error toasts, use the wrappers in `src/api/apiWrapper.js`.
- **`projects/index.js` `sortProjects` always remaps to `projectBase`.** A side-effect of the patch — if you sort a list that includes detail-only fields in memory, they'll be stripped on the response. Usually harmless because `Projects.vue` only reads base fields.
- **Backend replaces `attachments` wholesale, never merges.** For both projects and the nested `role.projects[i].attachments`. `Project_Create.vue` and `deepDiffRoles` both handle this by force-overriding the diff with the full attachments array. Don't try to "optimize" the form to send just the diff of attachments — the backend will drop everything you didn't send. See [[README.md|README gotcha]].
- **`api/index.js` baseURL is hardcoded, not env-driven.** `import.meta.env.DEV` picks between `http://localhost:8080/api` and `https://api.haddix.la/api`. The README mentions `VITE_API_URL` but that's not actually read here.
- **The backend dev port differs between docs.** README says backend runs at `:5000`; `api/index.js` points local at `:8080`. Confirm with the backend repo before assuming either.

## Auth / tokens

- **`TokenService.clearLocalAccessToken()` clears `refresh_token`, not `access_token`.** Likely a copy-paste bug; the access token is left in localStorage after logout. The interceptor will then try to attach a stale Bearer token to the next request. Logout still works because the BE invalidates the refresh cookie, but the local state is messy.
- **`/auth/tokenrefresh` is in the interceptor's skip-list.** If a refresh response itself is a 401, the user is logged out — no retry loop.
- **`userStore.sessionToken` is NOT auth.** It's a UUID for guest-project ownership filtering. Don't reach for it when you want an auth credential.

## i18n / translations

- **`yarn dev` runs `yarn i18next` first** (extraction). Adding a new translated string and only running `vite` won't refresh the keys file. Use `yarn dev` or run `yarn i18next` after edits.
- **Translation files are loaded over HTTP at runtime** from `public/localization/locales/...`. A missing locale JSON results in a 404 in the network tab and missing strings in the UI; the app does not crash.
- **`i18next-parser.config.js` is what `yarn i18next` reads** for output paths and namespaces, *not* `src/plugins/i18nextParser/index.js` (that file is the runtime init).

## Uploads / S3

- **The active upload path is presigned-PUT via the backend, not direct Cognito-S3.** `src/api/aws.js` builds an `S3Client` from Cognito creds but is only referenced by a commented-out v1 in `s3Upload.js`. Don't be confused by its presence.
- **Direct S3 PUT uses bare `axios`, not the wrapped `api`.** This is intentional — wrapping it would attach `Authorization` headers that break the presigned signature.
- **S3 upload failure shows no toast today.** There's a "TOAST component" TODO in `s3Upload.js → s3UploadRequest`. Failures end up in `filesFailed[]` silently.

## Forms

- **Contact form validation is "any field non-empty".** Real validation is a known TODO. Don't block your work on it; flag it on the PR if relevant.
- **Contact form has a honeypot field `website`.** Backend is expected to drop submissions where it's non-empty. Don't remove the hidden input.

## Misc

- **`__tests__/` is empty; there is no test runner.** Per `AGENT.md`, QA does lint + manual review only. Don't add tests as a TODO checklist item without also adding Vitest config.
- **The repo is JavaScript with `jsconfig.json`.** Do NOT add TypeScript files; it's a hard rule in `AGENT.md`.
- **Package manager is Yarn**, not npm. `yarn.lock` is the lockfile; an `npm install` would diverge it.
