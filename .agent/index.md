# Index — `.agent/` catalog

Flat list of pages. Start at [[MAP]] for the foyer.

## Foyer

- [[MAP]] — stack, layer order, "where do I look for X?" mini-index

## Entities

- [[entities/project]] — portfolio item; primary domain object; two shapes (`projectBase`, `projectDetails`)
- [[entities/role]] — resume entries; auth-gated section of the SPA
- [[entities/user]] — auth tokens + session UUID; minimal user modeling
- [[entities/attachment]] — file upload pipeline, S3 keys, queue manager

## Routes

- [[routes/index]] — sub-index
- [[routes/projects]] — `/projects/*` SPA + backend
- [[routes/roles]] — `/roles/*` SPA + backend
- [[routes/auth]] — `/auth/*` backend + `requireAuthGuard` reality
- [[routes/contact]] — `POST /contact/send`
- [[routes/aws-s3-presigned-url]] — presigned PUT upload flow

## Cross-cutting

- [[transformations]] — registry of every place data shape is mutated
- [[gotchas]] — flat list of behavioral surprises

## Playbooks

- [[playbook/add-field-to-project]] — schema + form + view sync points
- [[playbook/add-spa-route]] — view + router + nav + i18n + guard
- [[playbook/add-pinia-store]] — module + registry + models
- [[playbook/show-toast-or-dialog]] — toast/dialog/drawer/overlay primitives

## Writeback journal

- [[log]] — append observations during agent runs; compactor folds into structured pages
