# Routes: Projects (FE + backend calls)

There are **two layers** of "routes" relevant here:

1. **SPA routes** (Vue Router URLs in the browser bar) — defined in `src/router/index.js`.
2. **Backend endpoints** that the projects store calls via axios — under `/projects` on the API base.

## SPA routes

| URL path | Route name | View | Auth |
|---|---|---|---|
| `/projects` | `projects` | `src/views/Projects.vue` | Carries `requireAuthGuard`, but the guard's allow-list (`['roles']`) does **not** include this — so effectively public. See [[auth]]. |
| `/projects/project-details/:_id` | `project-details` | `src/views/Project_Details.vue` | Same — guard attached but not gating. |
| `/projects/project-details` (no id) | redirect → `home` | n/a | — |

Both routes have a `meta.beforeEnterCallback` that calls into `routingStore.enterProjectsRoute()` / `enterProjectDetailsRoute(params)` (see `src/stores/modules/routing/index.js`). Those callbacks are what trigger `projectsStore.fetchProjects()` / `fetchProjectById(id)` — adding a new projects-touching SPA route means wiring an analogous `enter…Route()` method there.

## Backend endpoints called from `projectsStore`

Defined in `src/stores/modules/projects/index.js`. Base URL comes from `src/api/index.js`.

| Method | Path | Store action | Transform applied |
|---|---|---|---|
| `GET` | `/projects` | `fetchProjects` | each item → `Project.projectBase` |
| `GET` | `/projects/:id` | `fetchProjectById` | `Project.projectDetails` |
| `POST` | `/projects` | `createProject` | request body merges `sessionId` from `userStore`; response → `Project.projectDetails` |
| `PATCH` | `/projects/:id` | `updateProject` | uses `apiPatch` (wrapped); response → `Project.projectDetails` |
| `PATCH` | `/projects/sort` | `sortProjects` | each item → `Project.projectBase` |
| `DELETE` | `/projects/:id` | `deleteProject` | none |

### Wrapper vs direct axios

- `createProject`, `fetchProjects`, `fetchProjectById`, `sortProjects`, `deleteProject` call `api.get/post/patch/delete` **directly** — they bypass `apiWrapper` and therefore **do not surface error toasts automatically**. The action either swallows or re-throws.
- `updateProject` is the only one that goes through `apiPatch` from `apiWrapper`, so it gets auto-toasted on error.
- This is inconsistent and easy to trip on. See [[../gotchas]].

## Response → render chain

```
api.get('/projects')
  → Project.projectBase (lookups via propsStore.getPropertyByKey)
  → projectsStore.projects[]
  → Projects.vue filters by type/sessionId
  → Project_Item.vue renders thumbnail from data.attachments.thumbnail[0].uri
```

## Related

- [[../entities/project]]
- [[../entities/attachment]]
- [[aws-s3-presigned-url]] (image/video uploads happen alongside create/update)
- [[../transformations]]
- [[../playbook/add-field-to-project]]
