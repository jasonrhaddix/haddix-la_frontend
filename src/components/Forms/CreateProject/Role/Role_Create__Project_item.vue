<template>
  <div class="form--role-create--item">
    <div class="inner">
      <v-row>
        <v-btn
          icon x-small 
          class="remove-btn" 
          @click="removeCallback(id)">
          <v-icon>remove</v-icon>
        </v-btn>
        <v-col class="col-12">
          <div class="section__title">
            <h3>Title</h3>
            <!-- <p>Only 1 video allowed</p> -->
          </div>
          <div class="title__container">
            <v-text-field
              filled hide-details 
              label="Project Title"
              v-model="model.title" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <div class="section__title">
            <h3>Project Summary</h3>
            <!-- <p>Only 1 video allowed</p> -->
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
              <!-- <p>Projects page thumbnail.</p> -->
            </div>
            <div class="images__container">
              <AttachmentUploader
                ref="attachmentUploader_Body"
                :attach-to="getAttachTo"
                :file-usage-type="
                  types.ATTACHMENT_USAGE_TYPE__BODY
                "
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
                  v-for="(file, i) in fileAttachments(
                    types.ATTACHMENT_USAGE_TYPE__BODY
                  )"
                  :key="`attachment-item--body-${i}}`"
                  :data="file"
                />
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="col-12 col-md-4">
          <div class="images-section videos__thumbnails">
            <div class="section__title">
              <h3>Project Video</h3>
              <!-- <p>Only 1 video allowed</p> -->
            </div>
            <div class="images__container">
              <AttachmentUploader
                ref="attachmentUploader_Video"
                :attach-to="getAttachTo"
                :accepted-file-types="['video/mp4']"
                :file-usage-type="
                  types.ATTACHMENT_USAGE_TYPE__VIDEO
                "
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
                  v-for="(file, i) in fileAttachments(
                    types.ATTACHMENT_USAGE_TYPE__VIDEO
                  )"
                  :key="`attachment-item--video-${i}}`"
                  :data="file"
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
  import { ref, reactive, computed, onMounted } from 'vue'
  import { uuid } from 'vue-uuid'

  import stores from '@/stores/index.js'

  import TextEditor from '@/components/_global/Text_Editor.vue'
  import AttachmentUploader from '@/components/_global/Attachment_Uploader.vue'
  import AttachmentItem from '@/components/Forms/CreateProject/Project/Project_Create__Attachment_Item.vue'


  const types = stores.config.typesStore()
  const uploadManagerStore = stores.s3.uploadManagerStore()

  const props = defineProps({
    id: {
      type: Number,
      required: true,
      default: null
    },

    roleId: {
      type: String,
      required: true,
      default: null
    },

    removeCallback: {
      type: Function,
      required: true,
      default: null
    }
  })

  const model = reactive({
    projectId: null,
    title: '',
    summary: '',
    attachments: []
  })

  const fileDragOver = ref(false)

  const getAttachTo = computed(() => ({
    modelId: props.roleId,
    projectId: model.projectId,
    model: types.PROJECT_TYPE__NEW_ROLE
  }))
  const fileAttachments = computed(() => {
    return (usageType, singleReturn) => {
      let files = []

      let paramsWithId = {
        attachTo: getAttachTo.value
      }

      files = files
        .concat(uploadManagerStore.getCompletedFiles(paramsWithId))
        .concat(uploadManagerStore.getUploadingFiles(paramsWithId))
        .concat(uploadManagerStore.getProcessingFiles(paramsWithId))
        .concat(uploadManagerStore.getQueuedFiles(paramsWithId))

      files.sort(function (a, b) {
        return a.addedToQueue - b.addedToQueue
      })

      let filteredFiles = files.filter(file => file.usageType === usageType)
      if (filteredFiles.length === 0) return []

      let data = singleReturn ? new Array(filteredFiles[filteredFiles.length - 1]) : filteredFiles

      // Add File to local attachments
      let filteredSuccessFiles = data.filter(item => item.status === types.REQUEST_STATUS__SUCCESS)
      if (filteredSuccessFiles.length > 0) addToAttachments(filteredSuccessFiles)

      return data
    }
  })
  const addToAttachments = (files) => {
    files.forEach(projectFile => {
      let idx = model.attachments.findIndex(item => item.fileId === projectFile.fileId)
      if (idx === -1) {
        // eslint-disable-next-line camelcase
        const { key, uri, fileId, filename, attachTo, projectId, usageType } = projectFile

        model.attachments.push({
          key,
          uri,
          fileId,
          filename,
          attachTo,
          projectId,
          usageType
        })
      }
    })
  }
  const uploadDragOver = (value) => {
    fileDragOver.value = value
  }
  const dropFiles = (event) => {
    console.error('Drag and Drop not setup |', event)
    // fileDragOver.value = false
    // this.$refs.attachmentUploader.loadFiles(event.dataTransfer.files)
  }
  onMounted(() => {
    model.projectId = uuid.v4()
  })
  // const mounted = () => {
/* 	import { mapGetters } from 'vuex'

	import AttachmentUploader from '@/components/_global/Attachment_Uploader'
	import CreateAttachmentItem from '@/components/Forms/CreateProject/Project/Project_Create__Attachment_Item'
	import TextEditor from '@/components/_global/Text_Editor'

	export default {

		components: {
			'attachment-uploader': AttachmentUploader,
			'attachment-item': CreateAttachmentItem,
			'text-editor': TextEditor
		},

		props: {
			id: {
				type: Number,
				required: true,
				default: null
			},

			roleId: {
				type: String,
				required: true,
				default: null
			},

			removeCallback: {
				type: Function,
				required: true,
				default: null
			}
		},

		data: () => ({
			blah: [],
			model: {
				projectId: null,
				title: '',
				summary: '',
				attachments: []
			},

			fileDragOver: false
		}),

		computed: {
			...mapGetters({
				userIsAuthenticated: 'userIsAuthenticated',
				getQueuedFiles: 'getQueuedFiles',
				getUploadingFiles: 'getUploadingFiles',
				getProcessingFiles: 'getProcessingFiles',
				getCompletedFiles: 'getCompletedFiles'
			}),

			fileAttachments () {
				return (usageType, singleReturn) => {
					let files = []

					let paramsWithId = {
						attachTo: {
							modelId: this.roleId,
							projectId: this.model.projectId,
							model: HADDIX_ATTACHMENT_TYPE__NEW_ROLE
						}
					}

					files = files
						.concat(this.getCompletedFiles(paramsWithId))
						.concat(this.getUploadingFiles(paramsWithId))
						.concat(this.getProcessingFiles(paramsWithId))
						.concat(this.getQueuedFiles(paramsWithId))

					files.sort(function (a, b) {
						return a.addedToQueue - b.addedToQueue
					})

					let filteredFiles = files.filter(file => file.usageType === usageType)
					if (filteredFiles.length === 0) return []

					let data = singleReturn ? new Array(filteredFiles[filteredFiles.length - 1]) : filteredFiles

					// Add File to local attachments
					let filteredSuccessFiles = data.filter(item => item.status === HADDIX_UPLOAD_S3_UPLOAD_STATUS__SUCCESS)
					if (filteredSuccessFiles.length > 0) this.addToAttachments(filteredSuccessFiles)

					return data
				}
			},

			getAttachTo () {
				return {
					modelId: this.roleId,
					projectId: this.model.projectId,
					model: HADDIX_ATTACHMENT_TYPE__NEW_ROLE
				}
			}
		},

		mounted () {
			this.model.projectId = this.$uuid.v4()
		},

		methods: {
			addToAttachments (files) {
				files.forEach(projectFile => {
					let idx = this.model.attachments.findIndex(item => item.fileId === projectFile.fileId)
					if (idx === -1) {
						// eslint-disable-next-line camelcase
						const { key, uri, fileId, filename, attachTo, projectId, usageType } = projectFile

						this.model.attachments.push({
							key,
							uri,
							fileId,
							filename,
							attachTo,
							projectId,
							usageType
						})
					}
				})
			},

			uploadDragOver (value) {
				this.fileDragOver = value
			},

			dropFiles (event) {
				console.error('Drag and Drop not setup |', event)
				// this.fileDragOver = false
				// this.$refs.attachmentUploader.loadFiles(event.dataTransfer.files)
			}
		}
	} */
</script>
