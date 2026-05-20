# Project

The portfolio's primary domain object. Two shapes are produced from a single backend payload:

- **`projectBase`** — list/card view (less fields, used in `/projects` list).
- **`projectDetails`** — single-record view (all fields, used in `/projects/project-details/:_id`).

Both shapes live in `src/models/Project.js`. `projectDetails` spreads `projectBase` and adds detail-only fields.

## Touch points

- **FE schema source** (allowlist): `src/models/Project.js`
  - Two named exports: `projectBase(data)` and `projectDetails(data)`.
  - `projectBase` declares: `_id`, `sortOrder`, `projectId`, `sessionId`, `dateCreated`, `published`, `isGuestProject`, `type`, `title`, `subtitle`, `client`, `attachments`.
  - `projectDetails` adds: `role`, `projectYear`, `excerpt`, `description`, `link`, `resources`, `languages`.
  - `client` and `role` are remapped via `propsStore.getPropertyByKey(...)` — they are stored on the backend as enum *values* (e.g. `"hbo"`) and rendered as their human *titles* (e.g. `"HBO"`). The lookup tables are in `src/stores/modules/config/properties.js` (`projectClients`, `projectRoles`). See [[transformations]].

- **Store**: `src/stores/modules/projects/index.js` (Pinia store id `projects`)
  - State: `projects[]`, `project{}`, `loading`, `saving`.
  - Actions: `fetchProjects`, `fetchProjectById`, `createProject`, `updateProject`, `sortProjects`, `deleteProject`.
  - List fetch maps each item with `Project.projectBase(...)`; single fetch / create / update use `Project.projectDetails(...)`.
  - Side effect: `fetchProjectById` calls `headerStore.setTitle(this.project.title)`.

- **Routes that expose it**: [[../routes/projects]]
- **Views that consume it**:
  - `src/views/Projects.vue` (list — reads `projectsStore.projects` and filters out `PROJECT_TYPE__EXPERIMENT` and other users' guest projects).
  - `src/views/Project_Details.vue` (single — reads `projectsStore.project`; pulls header/video/body off `project.attachments.{header,video,body}`).
- **Forms that mutate it**: `src/components/Forms/CreateProject/Project/Project_Create.vue`
- **List card**: `src/components/Projects/Project_Item.vue` (reads `data.attachments.thumbnail[0].uri`).

## Attachments substructure

`project.attachments` is **keyed by usage type**, not a flat array:

```
attachments: {
  thumbnail: [ { uri, mimetype, fileId, ... } ],
  header:    [ ... ],
  body:      [ ... ],
  video:     [ ... ]
}
```

Usage-type constants live in `src/stores/modules/config/types.js` as `ATTACHMENT_USAGE_TYPE__THUMBNAIL/HEADER/BODY/VIDEO`. Form code consumes them via `typesStore.ATTACHMENT_USAGE_TYPE__*`.

## Enum-backed fields (must match `propsStore`)

| Field | Lookup list in `properties.js` |
|---|---|
| `client` | `projectClients` |
| `role` | `projectRoles` |
| `type` | `projectTypes` (`work`, `personal`, `experiment`, `collaberation` *[sic]*, `new_role`) |
| `languages` (array of values) | `projectLanguages` |
| `resources` (array of values) | `projectResources` |
| `projectYear` | `projectYears` getter (2007 → current year) |

Adding a new enum option requires editing `properties.js`. See [[../playbook/add-field-to-project]].

## Update flow quirk

`Project_Create.vue`'s submit path computes a `deepDiff` of the edited model and original (`objectHelpers.deepDiff` in `src/utils/helpers/helperObjects.js`), then **always overrides** `attachments` and `resources` with the fresh values. This is intentional — the backend replaces the entire `attachments` block, never merges. See [[../gotchas]].

## Related

- [[../routes/projects]]
- [[../routes/aws-s3-presigned-url]]
- [[role]] — similar shape, different domain
- [[../transformations]]
