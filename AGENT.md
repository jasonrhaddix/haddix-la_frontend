# AGENT.md — haddix-la_frontend

> Read this BEFORE generating, modifying, or reviewing any code in this repo.
> This file captures conventions, gotchas, and tech-stack realities that an LLM
> would otherwise get wrong.

## Identity

Frontend for **Haddix.la**, a personal site / portfolio. Vue 3 SPA built with Vite.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 (Composition API) |
| Build tool | Vite |
| UI lib | Vuetify |
| State | Pinia (in `src/stores/`) |
| Router | Vue Router (in `src/router/`) |
| i18n | i18next + i18next-vue + i18next-http-backend |
| Rich text editor | TipTap (vue-3 binding) |
| Storage | AWS S3 via `@aws-sdk/client-s3` + Cognito identity provider |
| Animation | GSAP |
| Icons | FontAwesome (free brands + free solid) |
| Date | Day.js |
| HTTP client | Axios (in `src/api/`) |
| Language | **JavaScript** (not TypeScript). `jsconfig.json` only. |
| Package manager | Yarn (not npm — `yarn.lock` is the lockfile) |

## Project Structure

Entry: `src/main.js` → mounts `App.vue`.

```
src/
├── App.vue              # root component
├── main.js              # bootstrap (mounts app, registers plugins)
├── api/                 # HTTP clients / endpoint wrappers (axios)
├── assets/              # static assets bundled by Vite
├── components/          # reusable UI components
├── config/              # app config + env
├── directives/          # Vue custom directives
├── js/                  # plain-JS utilities
├── models/              # data shape definitions
├── plugins/             # Vue plugins (Vuetify init, etc.)
├── router/              # Vue Router routes
├── stores/              # Pinia stores
├── styles/              # global SCSS
├── utils/               # helpers
└── views/               # route-level components
```

## Commands

```bash
yarn install         # install deps
yarn dev             # dev server (runs i18next extraction first, then vite)
yarn build           # production build → dist/
yarn preview         # serve dist/ locally
yarn lint            # ESLint --fix on .vue/.js/.jsx/.cjs/.mjs
yarn format          # Prettier --write on src/
yarn i18next         # extract i18n keys from src/**/*.{vue,js}
yarn start           # serve dist on port 5173 (production preview via `serve`)
```

## Conventions

### Vue

- **Composition API only.** Prefer `<script setup>` over Options API.
- Single-file components: `<template>`, `<script setup>`, `<style scoped lang="scss">`.
- Components in `src/components/` are reusable; route-level go in `src/views/`.
- Pinia stores: one store per concern in `src/stores/`. No Vuex.

### Imports

- Use absolute imports from `src/` via Vite's path resolution (configured in `vite.config.js`).
- Group order: external deps → absolute internal (`@/...`) → relative (`./...`).

### i18n

- **All user-facing strings go through i18next.** Use `$t('key.path')` in templates, `t('key.path')` in script.
- After adding new strings, run `yarn i18next` to extract keys into translation files.

### Style

- ESLint + Prettier configs live at repo root. CI/local: `yarn lint && yarn format` before commit.
- No global CSS without scoping — use `<style scoped>` or component-specific files in `src/styles/`.

### AWS S3

- Configured via Cognito Identity Pool (no hardcoded credentials in client code).
- Upload paths and bucket name come from `src/config/`. Don't hardcode bucket names in components.

## Critical Rules

- **Do NOT add TypeScript** — repo is JavaScript with `jsconfig.json`. Adding `.ts` files would require a coordinated stack migration.
- **Do NOT use npm** — `yarn.lock` is the source of truth. `npm install` would create a divergent lockfile.
- **Do NOT replace Vuetify with another UI lib** — much of the design system depends on Vuetify components.
- **Do NOT add Vuex** — Pinia is the state layer. Mixing them would fragment state.
- **Do NOT remove i18next wrapping on user-facing text** — even if a string looks "obvious", wrap it.

## Anti-Patterns to Avoid

- Inline styles in components (use scoped `<style>` blocks)
- Direct `fetch()` calls instead of using `src/api/` wrappers
- Hardcoded route strings in components (import from `src/router/`)
- `localStorage` access scattered across components (centralize in a Pinia store)
- Importing from deep relative paths like `../../../utils/foo` (use absolute `@/utils/foo`)

## Testing

The repo uses **Vitest** with `@vue/test-utils` and `jsdom`. Specs live under `__tests__/`.

### Commands

```bash
yarn test            # run the full suite once
yarn test:watch      # run + watch for changes
yarn test:coverage   # run + emit coverage to ./coverage (HTML + text)
```

### Layout

```
__tests__/
├── *.spec.js                # one snapshot spec per component / view (shallowMount)
├── utils/helpers/*.spec.js  # unit specs for src/utils/helpers/* (concrete I/O assertions)
├── stores/ui/*.spec.js      # unit specs for src/stores/modules/ui/* (Pinia stores)
└── _meta/*.spec.js          # regression gates (runner present, no Jest globals, AGENT.md current)
```

### What is covered

- Every component / view has a `shallowMount` snapshot spec.
- All four `src/utils/helpers/*` modules have non-snapshot input/output tests.
- All seven `src/stores/modules/ui/*` Pinia stores have state-mutation tests.
- Three meta-regression gates protect against rot (runner removed, Jest globals creeping back in, AGENT.md going stale).

### What is explicitly deferred

- **Non-`ui` Pinia stores** (`config`, `contact`, `localStorage`, `localization`, `projectTree`, `projects`, `roles`, `routing`, `uploadManager`, `user`) — they couple to S3 / Cognito / backend API and need richer mocking; out of scope for the runner introduction.
- **Deep tests of view-level components** (`src/views/*.vue`) and large form components — repaired specs only do shallow snapshot rendering.
- **Coverage thresholds** — `yarn test:coverage` reports but does not gate. Add a threshold once a baseline is established.

### Conventions

- `globals: true` in `vitest.config.js`, so specs use bare `describe` / `test` / `expect` (no import from `vitest`). Use `vi` (also global) for mocks; **never** `jest.*`.
- Test file names mirror the source: `src/foo/Bar.vue` → `__tests__/Bar.spec.js`; subdirectories under `__tests__/` mirror `src/` for non-component code.
- Heavy libs that misbehave in jsdom (GSAP, three, vue3-google-map, TipTap, `vuedraggable`, FontAwesome) are stubbed globally in `test-setup.js`. Add deeper sub-path mocks per-spec only when an SFC pulls in something the global mock didn't cover.
- Vuetify primitives are stubbed globally too — snapshots reflect stubs, not real Vuetify markup.

## External Services

- **AWS** — S3 (file storage), Cognito (frontend identity), IAM. Credentials NOT in repo; configured via Cognito identity pool.
- **i18next-http-backend** — translations loaded at runtime from `public/locales/`.
- **Backend API** — separate repo (`haddix-la_backend`); base URL in `src/config/`.

## When Working Here

- Run `yarn install` after pulling.
- `yarn dev` for local; `yarn lint && yarn format` before committing.
- New views go under `src/views/` and need a route in `src/router/`.
- New API calls go in `src/api/`; consume from a Pinia store, not directly from a component.
