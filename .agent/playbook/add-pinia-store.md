# Playbook: Add a new Pinia store module

Stores in this repo are not auto-registered. The central `src/stores/index.js` file is the registry; adding a store means editing it.

## Touch points (in dependency order)

1. **The store module** — `src/stores/modules/<domain>/index.js`
   - Use the options-store form: `defineStore('id', { state, getters, actions })`. The setup-store form is in use in `projectTree/index.js` and is malformed there — don't copy that file as a template.
   - Pinia `id` is **the** identifier for devtools and serialization. Conventionally singular (`'project'`, `'role'`, `'user'`). The folder name doesn't have to match.
   - Inside actions, get other stores at call time, not at module-top — `const otherStore = stores.otherStore()`. Importing stores eagerly at module-top can cause circular-init issues with Pinia.

2. **Registry export** — `src/stores/index.js`
   - Import the module.
   - Add it to the default export. Top-level keys are accessed as `stores.yourStore()` from components; nested under `config/`, `ui/`, `s3/` are accessed as `stores.config.yourStore()` etc.
   - Pick a top-level vs nested location: UI primitives (dialogs, drawers, toasts) live under `ui:`. Config/constants live under `config:`. S3-specific live under `s3:`. Otherwise top-level.

3. **API calls** — `src/stores/modules/<domain>/index.js`
   - If you want automatic error toasts, use `apiGet`/`apiPost`/`apiPatch`/`apiDelete` from `src/api/apiWrapper.js`. Otherwise use the raw `api` from `src/api/index.js`. Be deliberate — most existing stores use raw `api`. See [[../gotchas]].
   - The Authorization header is attached automatically by the request interceptor — don't add it manually.

4. **Models / response transform** — `src/models/<Entity>.js`
   - If the store reads typed records, add an allowlist transform (mirror `Project.js` / `Role.js`). Map response data through it; do not stash raw response bodies in store state.
   - Re-export from `src/models/index.js`.

## Invariants

- Pinia id must be unique across the app. Pin it in the file (`defineStore('myDomain', ...)`).
- A store's action that talks to other stores must call them at action-call time, not at module-eval time.
- Components and other stores call store factories with parens: `stores.myStore()`. Forgetting the parens (using `stores.myStore` as if it were the store instance) is a frequent bug source.

## Related

- [[../entities/project]] (example of a store + model pair)
- [[../routes/auth]] (example of a store doing auth flows)
- [[../transformations]]
