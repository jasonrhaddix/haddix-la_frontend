# Routes: Roles (FE + backend calls)

The Roles section is the only **genuinely auth-gated** part of the SPA. See [[auth]].

## SPA routes

| URL path | Route name | View | Auth |
|---|---|---|---|
| `/roles` | `roles` | `src/views/Roles.vue` | **Auth-gated.** `requireAuthGuard` redirects unauthenticated users to `home` with an "Unauthorized" toast. |
| `/roles/role-details/:_id` | `role-details` | `src/views/Role_Details.vue` | Guard attached but the gate-list only includes `'roles'`, not `'role-details'`. See [[../gotchas]]. |
| `/roles/role-details` (no id) | redirect → `home` | n/a | — |

Both routes' `meta.beforeEnterCallback` calls `routingStore.enterRolesRoute()` / `enterRoleDetailsRoute(params)` which dispatch the `rolesStore` fetches.

## Backend endpoints called from `rolesStore`

Defined in `src/stores/modules/roles/index.js`. All use **raw `api`** — none use `apiWrapper`.

| Method | Path | Store action | Transform applied |
|---|---|---|---|
| `GET` | `/roles` | `fetchRoles` | each item → `Role.roleBase` |
| `GET` | `/roles/:id` | `fetchRoleById` | `Role.roleDetails`; on error routes home and toasts |
| `POST` | `/roles` | `createRole` | response → `Role.roleDetails` (creating a role uses the details transform even though the parallel `createProject` does too — consistent) |
| `PATCH` | `/roles/:id` | `updateRole` | response → `Role.roleDetails` (used for both edits and the `togglePublished` quick-action in `Roles.vue`) |
| `DELETE` | `/roles/:id` | `deleteRole` | none |

## Related

- [[../entities/role]]
- [[auth]]
- [[../transformations]] — `objectHelpers.deepDiffRoles` has a special case for `projects[i].attachments`
