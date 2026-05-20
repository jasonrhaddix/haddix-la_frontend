# Routes: Contact

A single-endpoint flow: contact form → backend email send.

## SPA route

| URL path | Route name | View |
|---|---|---|
| `/contact` | `contact` | `src/views/Contact.vue` |

Carries `requireAuthGuard` but is not in the gate-list — effectively public. See [[auth]].

`Contact.vue` mounts:
- `src/components/Forms/Contact/Contact_Form.vue` — the form.
- `src/components/_global/Google_Map.vue` — embedded map.

## Backend endpoint

| Method | Path | Action |
|---|---|---|
| `POST` | `/contact/send` | `contactStore.sendEmail(payload)` |

Defined in `src/stores/modules/contact/index.js`. Uses raw `api`. Sets `saving=true` around the call.

## Form payload

Built in `Contact_Form.vue` via a `reactive({...})`:

- `first_name`, `last_name`, `email`, `message`, `website` (honeypot — kept hidden via CSS off-screen; backend is expected to drop submissions where `website` is non-empty).

Validation today is "any field non-empty" — proper validation is a known TODO marked in the file. Don't add new gates to the form without coordinating; the comment in the file is explicit.

## Related

- [[../transformations]] — none on this path; the request goes straight through `api`
- `Google_Map.vue` uses `vue3-google-map`; map styles JSON is at `src/config/mapstyles.json`
