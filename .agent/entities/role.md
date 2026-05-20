# Role

A "Role" is a job/position entry for the resume-style portion of the site. Auth-gated (only the `/roles` route requires login — see [[../routes/auth]]).

Same two-shape pattern as [[project]]:

- **`roleBase`** — list view (table rows in `/roles`).
- **`roleDetails`** — single-record view (`/roles/role-details/:_id`).

## Touch points

- **FE schema source**: `src/models/Role.js`
  - `roleBase(data)` declares: `_id`, `dateCreated`, `roleId`, `role`, `company`, `organization`, `year`, `published`. (Note: `role` is declared twice in the literal — second assignment wins; harmless but worth knowing if grepping.)
  - `roleDetails(data)` adds: `description`, `recruiter`, `projects`.
  - `company` is remapped through `propsStore.getPropertyByKey('roleCompanies', ...)`. The lookup table lives in `src/stores/modules/config/properties.js`. Adding a new company means editing that file.

- **Store**: `src/stores/modules/roles/index.js` (Pinia store id `role` — singular, not plural)
  - State: `roles[]`, `role{}`, `loading`, `saving`.
  - Actions: `fetchRoles`, `fetchRoleById`, `createRole`, `updateRole`, `deleteRole`.
  - Side effects: `fetchRoleById` sets the header title to `"${role.role} at ${role.company}"`. On error it routes home and shows a toast.

- **Routes that expose it**: [[../routes/roles]]
- **Views that consume it**:
  - `src/views/Roles.vue` — `v-data-table` listing.
  - `src/views/Role_Details.vue` — single-record view.
- **Forms that mutate it**: `src/components/Forms/CreateProject/Role/Role_Create.vue` (and its `Role_Create__Project_item.vue`, `Role_Create__Projects.vue` children).

## Nested projects

`role.projects` is an array of project records nested **inside** a role. `objectHelpers.deepDiffRoles` (in `src/utils/helpers/helperObjects.js`) is the role-specific deep-diff and contains a special case that **always replaces** `projects[i].attachments` wholesale instead of diffing it. See [[../gotchas]] and [[../transformations]].

## Auth gating

`/roles` is the **only** route in the SPA that is actually auth-gated. Other routes carry `beforeEnter: [requireAuthGuard]` but the guard's allow-list (`authRoutes`) only contains `'roles'`. See [[../routes/auth]] and [[../gotchas]].

## Related

- [[project]]
- [[user]]
- [[../routes/roles]]
- [[../transformations]]
