# Routes — index

Sub-index of route pages. SPA routes live in `src/router/index.js`; backend endpoints are called from store modules in `src/stores/modules/**`.

- [[projects]] — `/projects`, `/projects/project-details/:_id`, plus backend `/projects/*` calls
- [[roles]] — `/roles`, `/roles/role-details/:_id`, plus backend `/roles/*` calls (the only genuinely auth-gated section)
- [[auth]] — `/auth/login`, `/auth/logout`, `/auth/tokenrefresh`; also the `requireAuthGuard` gating reality
- [[contact]] — `/contact` SPA route + `POST /contact/send`
- [[aws-s3-presigned-url]] — `POST /aws/s3/upload/presigned-url` + direct-to-S3 PUT

Other SPA routes (no backend calls of their own): `/` (Home), `/workflows`, `/about`, `/labs`. They're listed in `src/router/index.js`; nav links + visibility live in `src/config/sitenav.js`.
