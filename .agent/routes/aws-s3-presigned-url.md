# Routes: S3 Presigned URL upload

The actual file upload to S3 happens in two hops:

1. Ask the backend for a presigned PUT URL.
2. PUT the file directly to S3 (no Authorization header).

Live in `src/stores/modules/uploadManager/s3Upload.js`.

## Backend endpoint

| Method | Path | Action | Wrapper? |
|---|---|---|---|
| `POST` | `/aws/s3/upload/presigned-url` | `s3UploadStore.s3UploadRequest(payload)` | Uses the `api` axios instance — Authorization header IS attached on this call. |

Request body: `{ key }` where `key = \`files/${attachTo.modelId}/${fileId}_${filename}\``.
Response (consumed): `{ data: { presignedUrl, uri } }`. The store reads `presignRes.data.presignedUrl` for the PUT and forwards `presignRes.data` (which contains `uri`) into `requestSuccess`.

## Direct S3 PUT (step 2)

Done with a **bare `axios.put`** (NOT the wrapped `api` instance):

```js
axios.put(presignedUrl, payload.file, { headers: { 'Content-Type': mime }, onUploadProgress })
```

This is intentional — the wrapped instance attaches `Authorization: Bearer …` headers and a baseURL that would interfere with the presigned signature. Don't refactor this call onto `api`.

Progress events are piped into `uploadManagerStore.uploadProgress({ ...progressEvent, hashId })` for UI updates.

## Outcome paths

- Success: `requestSuccess(payload)` flips status to `SUCCESS`, moves the file from `UPLOADING` → `COMPLETE`, stores `uri`.
- Failure: `requestFailure(payload)` flips status to `FAILURE`, moves to `FAILED`. **No toast is shown today** — there's a "TOAST component" TODO in the file.

## Related

- [[../entities/attachment]]
- [[../transformations]]
- [[../gotchas]]
