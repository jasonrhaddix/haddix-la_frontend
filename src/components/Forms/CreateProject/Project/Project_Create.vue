<template>
  <v-container class="form--project-create">
    <div class="form-section create__form">
      <v-row>
        <v-col class="col-12 order-md-12 offset-md-4 col-md-4">
          <div class="project__pending-id">
            <p>{{ formModel.projectId }}</p>
          </div>
        </v-col>
        <v-col class="col-12 col-md-4">
          <v-select
            :key="projectTypesKey"
            dense
            :label="$t('components:CREATE_PROJECT.FORMS.TYPE')"
            :error="/* $v.model.type.$invalid &&  */ submitted"
            :items="propsStore.projectTypes"
            v-model="formModel.type"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field
            :label="$t('components:CREATE_PROJECT.FORMS.TITLE')"
            :error="/* $v.model.title.$invalid &&  */ submitted"
            v-model="formModel.title"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field :label="$t('components:CREATE_PROJECT.FORMS.SUBTITLE')" v-model="formModel.subtitle" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-md-4">
          <v-select
            dense
            :label="$t('components:CREATE_PROJECT.FORMS.CLIENT')"
            :items="propsStore.projectClients"
            v-model="formModel.client"
          />
        </v-col>
        <v-col class="col-12 col-md-4">
          <v-select
            dense
            :label="$t('components:CREATE_PROJECT.FORMS.ROLE')"
            :items="propsStore.projectRoles"
            v-model="formModel.role"
          />
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-select
            dense
            :label="$t('components:CREATE_PROJECT.FORMS.YEAR')"
            :items="propsStore.projectYears"
            v-model="formModel.projectYear"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field :label="$t('components:CREATE_PROJECT.FORMS.EXCERPT')" v-model="formModel.excerpt" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-textarea :label="$t('components:CREATE_PROJECT.FORMS.DESCRIPTION')" v-model="formModel.description" />
        </v-col>
      </v-row>

      <v-row>
        <v-col clasa="col-12">
          <v-text-field
            :label="$t('components:CREATE_PROJECT.FORMS.LINK')"
            hint="Requires link format (Example: http://www.my-link.com)"
            :error="/* $v.model.link.$invalid &&  */ submitted"
            v-model="formModel.link"
          />
        </v-col>
      </v-row>
    </div>

    <div class="form-section create__images">
      <h2>{{ $t('components:CREATE_PROJECT.FORMS.IMAGE_SECTION.TITLE') }}</h2>

      <div class="inner__divider" />

      <v-row>
        <v-col class="col-12 col-md-4">
          <div class="images-section images__thumbnails">
            <div class="section__title">
              <h3>{{ $t('components:CREATE_PROJECT.FORMS.IMAGE_SECTION.THUMBNAIL.TITLE') }}</h3>
              <p>{{ $t('components:CREATE_PROJECT.FORMS.IMAGE_SECTION.THUMBNAIL.SUBTITLE') }}</p>
            </div>
            <div class="images__container">
              <AttachmentUploader
                disabled
                ref="attachmentUploader_Thumbnail"
                :attach-to="getAttachTo"
                file-usage-type="thumbnail"
                accept="image/jpg, image/jpeg"
              />
              <div :class="['images__dropzone', { 'drag-over': fileDragOver }]">
                <div
                  v-ripple
                  :class="[
                    'dropzone__button',
                    {'disabled': fileAttachments(typesStore.ATTACHMENT_USAGE_TYPE__THUMBNAIL, true).length === 1}
                  ]"
                  @dragover.prevent
                  @dragenter.prevent.stop="uploadDragOver(true)"
                  @dragleave.prevent.stop="uploadDragOver(false)"
                  @drop.prevent.stop="dropFiles"
                  @click="attachmentUploader_Thumbnail.select()"
                >
                  <div class="button__content">
                    <p class="subheading">{{ $t('components:CREATE_PROJECT.FORMS.BUTTONS.UPLOAD_IMAGE') }}</p>
                    <v-icon color="grey darken-1">add</v-icon>
                  </div>
                </div>
                <div class="dropzone__scrim" />
              </div>
              <div class="images__list">
                <AttachmentItem
                  v-for="(file, i) in fileAttachments(typesStore.ATTACHMENT_USAGE_TYPE__THUMBNAIL, true)"
                  :key="`attachment-item--thumbnail-${i}-${$uuid.v4()}`"
                  :data="file"
                  @remove-file="removeAttachment"
                />
              </div>
            </div>
          </div>
        </v-col>

        <!-- CAROUSEL IMAGES -->
        <v-col class="col-12 col-md-4">
          <div class="images-section images__carousel">
            <div class="section__title">
              <h3>{{ $t('components:CREATE_PROJECT.FORMS.IMAGE_SECTION.CAROUSEL.TITLE') }}</h3>
              <p>{{ $t('components:CREATE_PROJECT.FORMS.IMAGE_SECTION.CAROUSEL.SUBTITLE') }}</p>
            </div>
            <div class="images__container">
              <AttachmentUploader
                multiple
                ref="attachmentUploader_Header"
                :attach-to="getAttachTo"
                file-usage-type="header"
              />
              <div :class="['images__dropzone', { 'drag-over': fileDragOver }]">
                <div
                  v-ripple
                  class="dropzone__button"
                  @dragover.prevent
                  @dragenter.prevent.stop="uploadDragOver(true)"
                  @dragleave.prevent.stop="uploadDragOver(false)"
                  @drop.prevent.stop="dropFiles"
                  @click="attachmentUploader_Header.select()"
                >
                  <div class="button__content">
                    <p class="subheading">{{ $t('components:CREATE_PROJECT.FORMS.BUTTONS.UPLOAD_IMAGE') }}</p>
                    <v-icon color="grey darken-1">add</v-icon>
                  </div>
                </div>
                <div class="dropzone__scrim" />
              </div>
              <div class="images__list">
                <AttachmentItem
                  v-for="(file, i) in fileAttachments(typesStore.ATTACHMENT_USAGE_TYPE__HEADER)"
                  :key="`attachment-item--carousel-${i}-${$uuid.v4()}`"
                  :data="file"
                  @remove-file="removeAttachment"
                />
              </div>
            </div>
          </div>
        </v-col>

        <!-- BODY IMAGES -->
        <v-col class="col-12 col-md-4">
          <div class="images-section images__body">
            <div class="section__title">
              <h3>Body Images <span class="caption">(Optional)</span></h3>
              <p>Project images</p>
            </div>

            <div class="images__container">
              <AttachmentUploader
                multiple
                ref="attachmentUploader_Body"
                :attach-to="getAttachTo"
                file-usage-type="body"
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
                    <p class="subheading">Upload Images</p>
                    <v-icon color="grey darken-1">add</v-icon>
                  </div>
                </div>
                <div class="dropzone__scrim" />
              </div>
              <div class="images__list">
                <AttachmentItem
                  v-for="(file, i) in fileAttachments(typesStore.ATTACHMENT_USAGE_TYPE__BODY)"
                  :key="`attachment-item--body-${i}-${$uuid.v4()}`"
                  :data="file"
                  @remove-file="removeAttachment"
                />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- VIDEOS -->
    <div class="form-section create__images">
      <h2>Videos</h2>

      <div class="inner__divider" />

      <div class="images-section images__thumbnails">
        <div class="section__title">
          <h3>Body Videos <span class="caption">(Optional)</span></h3>
          <p>Project videos.</p>
        </div>
        <div class="images__container">
          <AttachmentUploader
            multiple
            ref="attachmentUploader_Video"
            :attach-to="getAttachTo"
            :accepted-file-types="['video/mp4']"
            file-usage-type="video"
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
          <div class="images__list">
            <AttachmentItem
              v-for="(file, i) in fileAttachments(typesStore.ATTACHMENT_USAGE_TYPE__VIDEO)"
              :key="`attachment-item--video-${i}-${$uuid.v4()}`"
              :data="file"
              @remove-file="removeAttachment"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- META -->
    <div class="form-section create__meta">
      <h2>Meta</h2>

      <div class="inner__divider" />

      <!-- Languages -->
      <div class="meta-section project__languages">
        <div class="section__title">
          <h3>Project Languages <span class="caption">(Optional)</span></h3>
          <p>Languages used creating this project.</p>
        </div>
        <div class="languages__container">
          <LanguagePicker v-model="formModel.languages"/>
        </div>
      </div>

      <!-- Resources -->
      <div class="meta-section project__languages">
        <div class="section__title">
          <h3>Project Stack<span class="caption"> (Optional)</span></h3>
          <p>Resources used creating this project.</p>
        </div>
        <div class="languages__container">
          <ResourcePicker
            v-model="formModel.resources"
          />
        </div>
      </div>
    </div>

    <div class="form-section project__save-btn">
      <!-- <v-progress-circular
        v-if="projectsStore.saving"
        indeterminate
        class="progress__ind"
        color="primary"
        width="8"
        size="38"
      /> -->
      <div v-if="false /* $v.$invalid && submitted */" class="error-prompt">
        <p>Please complete all require fields</p>
        <div class="divider" />
      </div>
      <AppButton
        label="Save Project"
        :loading="projectsStore.saving"
        @click.native="submitForm"
      />
    </div>
  </v-container>
</template>

<script setup>
  import _pick from 'lodash.pick'
  import _isEqual from 'lodash.isequal'
  import _isObject from 'lodash.isobject'
  import { uuid } from 'vue-uuid'
  import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'

  import stores from '@/stores/index.js'
  import { objectHelpers, asyncComponents } from '@/utils/helpers'

  import AttachmentUploader from '@/components/_global/Attachment_Uploader.vue'
  import AttachmentItem from '@/components/Forms/CreateProject/Project/Project_Create__Attachment_Item.vue'
  import LanguagePicker from '@/components/Forms/CreateProject/Project/Project_Create__Language_Picker.vue'
  import ResourcePicker from '@/components/Forms/CreateProject/Project/Project_Create__Resource_Picker.vue'
  import AppButton from '@/components/_global/App_Button.vue'

  // stores
  const typesStore = stores.config.typesStore()
  const propsStore = stores.config.propsStore()
  const overlayStore = stores.ui.overlayStore()
  const toastStore = stores.ui.toastStore()
  const userStore = stores.userStore()
  const projectsStore = stores.projectsStore()
  const uploadManagerStore = stores.s3.uploadManagerStore()
  const routingStore = stores.routingStore()

  const props = defineProps({
    data: {
      type: Object,
      required: false
    }
  })

  // refs
  const updateProject = ref({})

  const submitted = ref(false)
  const fileDragOver = ref(false)

  const attachmentUploader_Thumbnail = ref(null)
  const attachmentUploader_Header = ref(null)
  const attachmentUploader_Body = ref(null)
  const attachmentUploader_Video = ref(null)

  const formModel = reactive({
    projectId: null,
    isGuestProject: null,
    type: null,
    title: null,
    subtitle: null,
    client: null,
    role: null,
    projectYear: null,
    excerpt: null,
    description: null,
    link: null,
    published: true,
    languages: [],
    resources: []
  })

  // computed
  const projectTypesKey = computed((open) => {
      return propsStore.projectTypes.map(i => i.value).join('-')
  })

  const getAttachTo = computed(() => ({ 
    model: typesStore.ATTACHMENT_TYPE__PROJECT,
    modelId: formModel.projectId
  }))

  const isEditMode = computed(() => {
    return !!props.data.id
  })

  // lifecycle hooks
  onMounted(async () => {
    if (props.data.id) {
      const project = await projectsStore.fetchProjectById(props.data.id)
      updateProject.value = project
    }

    initForm()
  })

  onUnmounted(() => {
    uploadManagerStore.reset() 
  })

  const initForm = () => {
    if (propsStore.projectTypes.length) {
      formModel.type = propsStore.projectTypes.find(i => i.value === 'work')?.value
    }

    if (isEditMode.value) {
      Object.assign(formModel, {
        ...updateProject.value,
        projectId: updateProject.value.projectId,
        type: updateProject.value.type,
        title: updateProject.value.title,
        subtitle: updateProject.value.subtitle,
        client: updateProject.value.client,
        role: updateProject.value.role,
        projectYear: updateProject.value.projectYear,
        excerpt: updateProject.value.excerpt,
        description: updateProject.value.description,
        link: updateProject.value.link,
        published: updateProject.value.published,
        attachments: updateProject.value.attachments,
        languages: JSON.parse(JSON.stringify(updateProject.value.languages)),
        resources: JSON.parse(JSON.stringify(updateProject.value.resources))
      })
    } else {
      formModel.isGuestProject = !userStore.userIsAuthenticated
      formModel.projectId = uuid.v4()
    }
  }

  // medthods
  const uploadDragOver = (value) => {
    fileDragOver.value = value
  }

  const dropFiles = (event) => {
    fileDragOver.value = false
    // this.$refs.attachmentUploader.loadFiles(event.dataTransfer.files) // <--------------------------- MAKE THIS WORK (refs?)
  }

  const fileAttachments = (usageType, singleReturn) => {
    let files = !!usageType
      ? formModel.attachments?.[usageType]
      : Object.values(formModel.attachments || {}).flat() || []

    const paramsWithId = {
      attachTo: getAttachTo.value
    }

    files = [...files || []]
      .concat(uploadManagerStore.getCompletedFiles(paramsWithId))
      .concat(uploadManagerStore.getUploadingFiles(paramsWithId))
      .concat(uploadManagerStore.getProcessingFiles(paramsWithId))
      .concat(uploadManagerStore.getQueuedFiles(paramsWithId))

    files.sort((a, b) => a.addedToQueue - b.addedToQueue)

    let filteredFiles = !!usageType
      ? files.filter(file => file.usageType === usageType)
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

  const resourceItemsSelected = (items) => {
    formModel.resources = items.map(item => item.value)
  }

  const removeAttachment = (removeFile) => {
    if (removeFile.hashId) {
      // remove from upload manager
      uploadManagerStore.removeFile(removeFile.hashId)
    } else {
      // remove from model
      const modelAttachments = formModel.attachments || {}
    
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

  const submitForm = async () => {
    submitted.value = true

    // Clean model before send
    Object.keys(formModel).forEach(k => {
      if (formModel[k] === null ||
        formModel[k] === undefined ||
        formModel[k].length === 0) delete formModel[k]
    })

    const wrapperKeys = ['key', 'uri', 'status', 'file', 'fileId', 'filename', 'attachTo', 'projectId', 'usageType', 'usageSubtype']
    const fileKeys = ['name', 'type']
    
    const attachments = extractAttachmentData([
      typesStore.ATTACHMENT_USAGE_TYPE__THUMBNAIL,
      typesStore.ATTACHMENT_USAGE_TYPE__HEADER,
      typesStore.ATTACHMENT_USAGE_TYPE__BODY,
      typesStore.ATTACHMENT_USAGE_TYPE__VIDEO
    ], wrapperKeys, fileKeys)

    if (isEditMode.value) {
      // diff gets everything that is not equal except for the attachments
      const diff = objectHelpers.deepDiff(updateProject.value, formModel)
      try {
        await projectsStore.updateProject(props.data.id, {
          ...diff,
          attachments,
          resources: formModel.resources
        })
        
        toastStore.addToast({
          component: asyncComponents.ToastMessage,
          data: {
            type: 'success',
            title: 'Project Updated!',
            message: `${formModel.title}`
          }
        })
      } catch (error) {
        toastStore.addToast({
          component: asyncComponents.ToastMessage,
          data: {
            type: 'error',
            title: 'Error',
            message: 'An error occurred while updating the project.'
          }
        })
      }
    } else {       
      // Create new project
      try {
        const project = await projectsStore.createProject({ ...formModel, attachments })

        routingStore.pushRoute({
          name: 'project-details',
          params: { _id: project._id }
        })

        toastStore.addToast({
          component: asyncComponents.ToastMessage,
          data: {
            type: 'success',
            title: 'Project Created!',
            message: `${formModel.title}`
          }
        })
      } catch (error) {
        toastStore.addToast({
          component: asyncComponents.ToastMessage,
          data: {
            type: 'error',
            title: 'Error',
            message: 'An error occurred while updating the project.'
          }
        })
      }
    }

    overlayStore.hideOverlay()
  }
</script>
