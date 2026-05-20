# Attachment / Upload

Attachments are file references (S3 URIs + metadata) associated with a Project or Role. They flow through a multi-stage queue store on the FE before reaching the backend.

This page is about the **client-side upload pipeline** — the canonical shape on the wire is whatever the backend stores; the FE shape is described here.

## Touch points

- **Form-side capture**: `src/components/_global/Attachment_Uploader.vue`
  - Wraps a hidden `<input type="file">`. Builds per-file objects, base64-previews files <20MB, then calls `uploadManagerStore.addFiles(...)`.
  - Per-file object fields produced here: `projectId`, `fileId` (uuid), `file` (cloned `File`), `filename` (spaces → underscores), `usageType`, `usageSubtype`, `progress`, `status`, `uploadStatus`, `attachTo`, `preview` (base64 or null).
  - `attachTo` is `{ model, modelId }` — model is one of the `ATTACHMENT_TYPE__*` constants in `src/stores/modules/config/types.js`; `modelId` is the parent record's id (`projectId` for projects).

- **Queue manager**: `src/stores/modules/uploadManager/index.js` (Pinia id `uploadManage`)
  - State buckets: `filesHolding`, `filesQueued`, `filesAttaching`, `filesUploading`, `filesProcessing`, `filesCompleted`, `filesFailed` (each is an array of hashIds; the actual file objects live in `fileHash`).
  - Concurrency: `enqueueUpload` only starts a new upload if `filesUploading.length < typesStore.S3__QUEUE_SIZE` (currently `4`).
  - Bucket names are referenced through `typesStore.UPLOAD_MANAGER_BUCKET__*` constants — don't pass raw strings, use the constants so renames stay coherent.

- **S3 transport**: `src/stores/modules/uploadManager/s3Upload.js` (Pinia id `s3Upload`)
  - `s3UploadRequest`: asks the backend for a presigned PUT URL (`POST /aws/s3/upload/presigned-url`, see [[../routes/aws-s3-presigned-url]]), then PUTs the file to S3 directly with axios (NOT the wrapped `api` instance — bypasses interceptors so no Authorization header gets attached to S3).
  - Object key convention: `files/${attachTo.modelId}/${fileId}_${filename}` — assigned to `fileHash[hashId].key` before the upload starts.
  - There's a commented-out v1 (`@/api/aws.js` direct S3 client) preserved in the file — ignore it; the active code path is the presigned-URL flow.

- **Form-side aggregation on submit**: `Project_Create.vue → submitForm → extractAttachmentData(...)`
  - Walks `[THUMBNAIL, HEADER, BODY, VIDEO]` usage types, gathers each from the queue + existing model attachments, and produces the keyed `attachments: { thumbnail: [...], header: [...], body: [...], video: [...] }` payload.
  - `wrapperKeys` array there determines which per-file fields are sent to the backend. Adding a new attachment-side field requires adding it to that allowlist (and to the FE model spread). See [[../playbook/add-field-to-project]].

## Cognito S3 client (legacy / fallback)

`src/api/aws.js` builds an `S3Client` with Cognito Identity Pool credentials. It is **imported only by the commented-out alternate path** in `s3Upload.js` — not the live one. Env vars `VITE_AWS_BUCKET_REGION` and `VITE_AWS_BUCKET_IDENTITY_POOL_ID` feed it. Treat this file as cold code until/unless the team flips back to direct-PUT-from-browser.

## Related

- [[project]]
- [[role]]
- [[../routes/aws-s3-presigned-url]]
- [[../transformations]]
- [[../gotchas]]
