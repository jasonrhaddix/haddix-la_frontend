<template>
  <div class="form--role-create--item">
    <div class="inner">
      <v-row>
        <v-btn icon x-small class="remove-btn" @click="removeProject">
          <v-icon>remove</v-icon>
        </v-btn>

        <v-col class="col-12">
          <div class="section__title">
            <h3>Title</h3>
          </div>
          <div class="title__container">
            <v-text-field
              filled
              hide-details
              label="Project Title"
              v-model="model.title"
            />
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <div class="section__title">
            <h3>Project Summary</h3>
          </div>
          <div class="summary__container">
            <TextEditor v-model="model.summary" />
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-md-8">
          <div class="images-section images__thumbnails">
            <div class="section__title">
              <h3>Project Images</h3>
            </div>
            <div class="images__container">
              <AttachmentUploader
                multiple
                ref="attachmentUploader_Body"
                :attach-to="getAttachTo"
                :file-usage-type="types.ATTACHMENT_USAGE_TYPE__BODY"
              />
              <div :class="['images__dropzone', { 'drag-over': fileDragOver }]">
                <div
                  v-ripple
                  class="dropzone__button"
                  @dragover.prevent
                  @dragenter.prevent.stop="uploadDragOver(true)"
                  @dragleave.prevent.stop="uploadDragOver(false)"
                  @drop.prevent.stop="dropFiles"
                  @click="$refs.attachmentUploader_Body.select()"
                >
                  <div class="button__content">
                    <p class="subheading">Upload Image</p>
                    <v-icon color="grey darken-1">add</v-icon>
                  </div>
                </div>
                <div class="dropzone__scrim" />
              </div>
              <div v-if="fileAttachments.length > 0" class="images__list">
                <AttachmentItem
                  v-for="(file, i) in fileAttachments(types.ATTACHMENT_USAGE_TYPE__BODY)"
                  :key="`attachment-item--body-${i}`"
                  :data="file"
                  @remove-file="removeAttachment"
                />
              </div>
            </div>
          </div>
        </v-col>

        <v-col class="col-12 col-md-4">
          <div class="images-section videos__thumbnails">
            <div class="section__title">
              <h3>Project Video</h3>
            </div>
            <div class="images__container">
              <AttachmentUploader

                ref="attachmentUploader_Video"
                :attach-to="getAttachTo"
                :accepted-file-types="['video/mp4']"
                :file-usage-type="types.ATTACHMENT_USAGE_TYPE__VIDEO"
              />
              <div :class="['images__dropzone', { 'drag-over': fileDragOver }]">
                <div
                  v-ripple
                  class="dropzone__button"
                  @dragover.prevent
                  @dragenter.prevent.stop="uploadDragOver(true)"
                  @dragleave.prevent.stop="uploadDragOver(false)"
                  @drop.prevent.stop="dropFiles"
                  @click="$refs.attachmentUploader_Video.select()"
                >
                  <div class="button__content">
                    <p class="subheading">Upload Video</p>
                    <v-icon color="grey darken-1">add</v-icon>
                  </div>
                </div>
                <div class="dropzone__scrim" />
              </div>
              <div v-if="fileAttachments.length > 0" class="images__list">
                <AttachmentItem
                  v-for="(file, i) in fileAttachments(types.ATTACHMENT_USAGE_TYPE__VIDEO)"
                  :key="`attachment-item--video-${i}`"
                  :data="file"
                  @remove-file="removeAttachment"
                />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="divider" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import shortid from 'shortid'

import stores from '@/stores/index.js'

import TextEditor from '@/components/_global/Text_Editor.vue'
import AttachmentUploader from '@/components/_global/Attachment_Uploader.vue'
import AttachmentItem from '@/components/Forms/CreateProject/Project/Project_Create__Attachment_Item.vue'

// Importing stores
const types = stores.config.typesStore()
const uploadManagerStore = stores.s3.uploadManagerStore()

// Props
const props = defineProps({
  modelValue: Object
})

// Emits
const emit = defineEmits(['update:modelValue', 'remove'])

// Refs
const loadedAttachments = ref({})
const fileDragOver = ref(false)

// Computed
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})


const getAttachTo = computed(() => ({
  modelId: model.value.roleId,
  projectId: model.value.projectId,
  model: types.PROJECT_TYPE__NEW_ROLE
}))

// Methods
const fileAttachments = (usageType, singleReturn) => {  
  let files = !!usageType
    ? loadedAttachments.value?.[usageType]
    : Object.values(loadedAttachments.value || {}).flat()
      || []

  let paramsWithId = {
    attachTo: getAttachTo.value
  }

  files = [...files || []]
    .concat(uploadManagerStore.getCompletedFiles(paramsWithId))
    .concat(uploadManagerStore.getUploadingFiles(paramsWithId))
    .concat(uploadManagerStore.getProcessingFiles(paramsWithId))
    .concat(uploadManagerStore.getQueuedFiles(paramsWithId))

  files.sort(function (a, b) {
    if (a.addedToQueue === b.addedToQueue) return a.fileId - b.fileId
    return a.addedToQueue - b.addedToQueue
  })

  let filteredFiles = !!usageType 
    ? files?.filter(file => file.usageType === usageType)
    : files

  // ✅ Deduplicate by fileId (keep first occurrence)
  const seen = new Set()
    filteredFiles = filteredFiles.filter(file => {
      if (!file.fileId) return false
      if (seen.has(file.fileId)) return false
      seen.add(file.fileId)
      return true
    })

  if (filteredFiles.length === 0) return []
  
  return singleReturn
    ? new Array(filteredFiles[filteredFiles.length - 1])
    : filteredFiles
}

const removeAttachment = (removeFile) => {
  if (removeFile.hashId) {
    // remove from upload manager
    uploadManagerStore.removeFile(removeFile.hashId)
  } else {
    // remove from model
    const modelAttachments = model.value.attachments || {}
  
    // remove file from model
    Object.keys(modelAttachments).forEach(key => {
      modelAttachments[key] = modelAttachments[key].filter(file => file.fileId !== removeFile.fileId)
    })
  }
}

const extractAttachmentData = (types, wrapperKeys, fileKeys) => {
  return Object.fromEntries(
    types.map(type => {
      const files = fileAttachments(type)

      const mapped = files.map(entry => {
        const fileData = Object.fromEntries(
          fileKeys.map(key => [key, entry.file?.[key]])
        )

        const wrapperData = Object.fromEntries(
          wrapperKeys.map(key => [key, entry[key]])
        )

        return {
          ...wrapperData,
          file: fileData
        }
      })

      return [type, mapped]
    })
  )
}

const uploadDragOver = value => {
  fileDragOver.value = value
}

const dropFiles = event => {
  console.error('Drag and Drop not setup |', event)
}

const removeProject = () => {
  emit('remove', model.value.id)
}

// Lifecycle hooks
onMounted(() => {
  loadedAttachments.value = model.value.attachments || {}
})

// Watchers
watch(
  () => uploadManagerStore.fileHash,
  () => {
    const wrapperKeys = ['key', 'uri', 'status', 'file', 'fileId', 'filename', 'attachTo', 'projectId', 'usageType', 'usageSubtype', 'addedToQueue']
    const fileKeys = ['name', 'type']

    const attachments = extractAttachmentData([
      types.ATTACHMENT_USAGE_TYPE__BODY,
      types.ATTACHMENT_USAGE_TYPE__VIDEO
    ], wrapperKeys, fileKeys)

    model.value.attachments = attachments
  }, { deep: true }
)
</script>