import { defineStore } from 'pinia'

export default defineStore('types', {
  state: () => ({
    // request types
    REQUEST_STATUS__READY: 'ready',
    REQUEST_STATUS__PENDING: 'pending',
    REQUEST_STATUS__SUCCESS: 'success',
    REQUEST_STATUS__FAILURE: 'failure',

    // auth
    AUTH__AUTHORIZED: 'authorized',
    AUTH__NOT_AUTHORIZED: 'not_authorized',

    // projects
    PROJECT_TYPE__WORK: 'work',
    PROJECT_TYPE__COLLAB: 'collab',
    PROJECT_TYPE__PERSONAL: 'personal',
    PROJECT_TYPE__EXPERIMENT: 'experiment',
    PROJECT_TYPE__NEW_ROLE: 'new_role',

    // attachment types
    ATTACHMENT_TYPE__PROJECT: 'app_project',
    ATTACHMENT_TYPES__NEW_ROLE: 'new_roll',

    // attachment usage types
    ATTACHMENT_USAGE_TYPE__THUMBNAIL: 'thumbnail',
    ATTACHMENT_USAGE_TYPE__CAROUSEL: 'carousel',
    ATTACHMENT_USAGE_TYPE__BODY: 'body',
    ATTACHMENT_USAGE_TYPE__VIDEO: 'video',

    // s3 settings
    S3__QUEUE_SIZE: 4,

    UPLOAD_MANAGER_BUCKET__QUEUED: 'filesQueued',
    UPLOAD_MANAGER_BUCKET__UPLOADING: 'filesUploading',
    UPLOAD_MANAGER_BUCKET__COMPLETE: 'filesCompleted',
    UPLOAD_MANAGER_BUCKET__FAILED: 'filesFailed'
  }),

  getters: {},

  actions: {}
})
