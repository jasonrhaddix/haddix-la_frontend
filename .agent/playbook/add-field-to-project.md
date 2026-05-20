# Playbook: Add or remove a field on Project

Project's wire shape, FE shape, and form are governed by separate files. They all have to agree or a field will be silently dropped.

## Touch points (in dependency order)

1. **Backend schema** — lives in the **`haddix-la_backend`** repo, not here. The backend must declare the new field on its Project model and include it in whatever serializer it uses. Without this, every field below will receive `undefined` from the wire.

2. **FE schema allowlist** — `src/models/Project.js`
   - Add to `projectBase` if the field should appear in the *list* shape (used in `/projects` and inside `attachmentsByUsageType` lookups).
   - Add to `projectDetails` if it's only needed in the single-record view.
   - **Field missing here = silently stripped from the FE store.** Most common bug source on this entity.
   - If the field is an enum stored on the backend as a slug but displayed as a human title, also extend the corresponding lookup in `src/stores/modules/config/properties.js` (`projectClients`, `projectRoles`, etc.) and remap via `propsStore.getPropertyByKey(...)`.

3. **Form (create + edit)** — `src/components/Forms/CreateProject/Project/Project_Create.vue`
   - Add the input control (Vuetify `v-text-field`/`v-select`/etc.) bound to `formModel.<field>`.
   - Add the field to the `reactive({...})` `formModel` declaration up top.
   - Add to the `Object.assign(formModel, { ... })` block inside `initForm()`'s edit-mode branch so the existing value populates when editing.
   - If the field has i18n labels, add keys under `components:CREATE_PROJECT.FORMS.*` in `public/localization/locales/en-US/components.json` (and run `yarn i18next` to extract).

4. **Detail view rendering** — `src/views/Project_Details.vue`
   - Add the rendering block. The view reads from `projectsStore.project` (the `projectDetails` shape).

5. **List card rendering (if applicable)** — `src/components/Projects/Project_Item.vue`
   - Only if the field should appear on the list card.

## Invariants

- Schema (`Project.js`), form (`Project_Create.vue`), and any new lookup table (`properties.js`) must agree on the field name.
- If the field is an enum, the same `value` must appear in the schema, in `properties.js`, and in the form's `v-select :items` binding.
- If the field is an array of objects (like `languages`, `resources`), the edit path needs `JSON.parse(JSON.stringify(...))` in `initForm()` to break Pinia-state reference identity. Look at how `resources` and `languages` are seeded.

## Special case: attachment fields

Adding a new attachment **usage type** (next to `thumbnail`/`header`/`body`/`video`) requires more than this playbook covers. See [[../entities/attachment]] and the `wrapperKeys`/`fileKeys` arrays in `Project_Create.vue → submitForm`. The new type also needs an entry in `src/stores/modules/config/types.js` (`ATTACHMENT_USAGE_TYPE__*`) and a new `<AttachmentUploader>` section in the template.

## Related

- [[../entities/project]]
- [[../routes/projects]]
- [[../transformations]]
- [[../gotchas]] (the "attachments are wholesale-replaced" rule applies if your new field is part of attachments)
