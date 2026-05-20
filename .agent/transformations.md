# Transformations registry

A flat list of places where data shape gets mutated between the wire and the rendered DOM (or vice versa). When a field appears/disappears unexpectedly, this is the list to grep.

## On the way in (response → store)

- **`src/models/Project.js` — `projectBase(data)`** — Allowlist for the list shape. Fields not listed here are stripped from `projectsStore.projects[*]`. Also remaps `client` from enum-value → human title via `propsStore.getPropertyByKey('projectClients', ...)`. See [[entities/project]].
- **`src/models/Project.js` — `projectDetails(data)`** — Allowlist for the detail shape. Spreads `projectBase` and adds `role`, `projectYear`, `excerpt`, `description`, `link`, `resources`, `languages`. Also remaps `role` via `projectRoles`.
- **`src/models/Role.js` — `roleBase(data)`** — Allowlist for the role list shape. Remaps `company` via `roleCompanies`. Note: `role` field is assigned twice in the literal; second assignment wins (raw value, no enum remap).
- **`src/models/Role.js` — `roleDetails(data)`** — Allowlist for the role detail shape. Adds `description`, `recruiter`, `projects`.

## On the way out (form → request body)

- **`src/components/Forms/CreateProject/Project/Project_Create.vue` → `extractAttachmentData(types, wrapperKeys, fileKeys)`** — Builds the keyed `attachments: { thumbnail, header, body, video }` payload from the upload-manager queue + existing model attachments. `wrapperKeys` is the allowlist for per-file fields that get sent to the backend.
- **`src/components/Forms/CreateProject/Project/Project_Create.vue` → `submitForm()` "Clean model before send"** — Iterates `formModel`, deletes any key whose value is `null`, `undefined`, or zero-length. The backend never sees these.
- **`src/utils/helpers/helperObjects.js` — `deepDiff(obj1, obj2)`** — Generic deep diff. Used in `Project_Create.vue` to build the PATCH body for an edit. Caller separately overrides `attachments` and `resources` with full values (because backend replaces wholesale).
- **`src/utils/helpers/helperObjects.js` — `deepDiffRoles(obj1, obj2)`** — Role-specific deep diff. **Always replaces `projects[i].attachments` wholesale** instead of diffing it (see `isAttachmentsPath` helper). This is intentional — see [[gotchas]].

## On every request (axios interceptors)

- **`src/api/config/interceptors.js` (request)** — Injects `Authorization: Bearer <accessToken>` from localStorage on every outgoing call where a token exists.
- **`src/api/config/interceptors.js` (response)** — On 401 with `originalConfig._retry !== true` and not in skip-list (`/auth/login`, `/auth/tokenrefresh`), silently refreshes the token via `POST /auth/tokenrefresh` and retries the original request. On refresh failure → `userStore.logout()`. Adding new auth-style endpoints that shouldn't trigger the retry loop requires extending the skip-list here.

## On every API error (wrapper)

- **`src/api/apiWrapper.js` — `apiRequest`** — Catches axios errors; if status is not 401/403, pushes a toast via `toastStore.addToast(...)`. Only actions that call through the `apiPost`/`apiPatch`/etc. helpers get this — many store actions use raw `api.*` and **bypass** the wrapper. See [[gotchas]].

## Upload queue (manager-side shape mutations)

- **`src/stores/modules/uploadManager/index.js` — `addFiles`** — Computes a `hashId` (object-hash of filename + random int) and stashes the file object in `fileHash[hashId]`. Subsequent state references are by hashId only — actual `File` blob never leaves the manager.
- **`src/stores/modules/uploadManager/index.js` — `moveToBucket`** — The single mutator of bucket arrays. Always use it; never push/splice the bucket arrays directly.
- **`src/stores/modules/uploadManager/s3Upload.js` — `s3UploadRequest`** — Mints the destination key `files/${attachTo.modelId}/${fileId}_${filename}` and assigns it onto the file object before the upload.

## Header / title

- **`src/stores/modules/projects/index.js` → `fetchProjectById`** — Side effect: `headerStore.setTitle(this.project.title)`.
- **`src/stores/modules/roles/index.js` → `fetchRoleById`** — Side effect: `headerStore.setTitle(\`${role.role} at ${role.company}\`)` (built with inline HTML for lowercase styling).
- **`src/router/index.js` global `router.beforeEach`** — Clears nav + header title before every route change.

## i18n

- **`src/plugins/i18nextParser/index.js`** — Initializes i18next with namespaces `common`, `views`, `components`. Backend loads JSON from `/localization/locales/{{lng}}/{{ns}}.json` with a cache-busting query string. Adding a new namespace requires editing both this init and `i18next-parser.config.js` extraction config.
