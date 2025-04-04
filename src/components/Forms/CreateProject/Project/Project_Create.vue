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
            dense
            label="Project Type"
            item-text="title"
            item-value="value"
            :error="/* $v.model.type.$invalid &&  */ submitted"
            :items="propsStore.projectTypes"
            v-model="formModel.type"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field
            label="Title"
            :error="/* $v.model.title.$invalid &&  */ submitted"
            v-model="formModel.title"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field label="Subtitle" v-model="formModel.subtitle" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-md-4">
          <v-select
            dense
            label="Client"
            item-text="title"
            item-value="value"
            :items="propsStore.projectClients"
            v-model="formModel.client"
          />
        </v-col>
        <v-col class="col-12 col-md-4">
          <v-select
            dense
            label="Role"
            item-text="title"
            item-value="value"
            :items="propsStore.projectRoles"
            v-model="formModel.role"
          />
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-select
            dense
            label="Year"
            :items="projectYears"
            v-model="formModel.projectYear"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field label="Excerpt" v-model="formModel.excerpt" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-textarea label="Description" v-model="formModel.description" />
        </v-col>
      </v-row>

      <v-row>
        <v-col clasa="col-12">
          <v-text-field
            label="Project Link"
            hint="Requires link format (Example: http://www.my-link.com)"
            :error="/* $v.model.link.$invalid &&  */ submitted"
            v-model="formModel.link"
          />
        </v-col>
      </v-row>
    </div>

    <div class="form-section create__images">
      <h2>Images</h2>

      <div class="inner__divider" />

      <v-row>
        <v-col class="col-12 col-md-4">
          <div class="images-section images__thumbnails">
            <div class="section__title">
              <h3>Thumbnail Image</h3>
              <p>Projects page thumbnail</p>
            </div>
            <div class="images__container">
              <AttachmentUploader
                ref="attachmentUploader_Thumbnail"
                :attach-to="getAttachTo"
                :file-usage-type="'thumbnail'"
              />
              <div :class="['images__dropzone', { 'drag-over': fileDragOver }]">
                <div
                  v-ripple
                  class="dropzone__button"
                  @dragover.prevent
                  @dragenter.prevent.stop="uploadDragOver(true)"
                  @dragleave.prevent.stop="uploadDragOver(false)"
                  @drop.prevent.stop="dropFiles"
                  @click="uploadThumbnail"
                >
                  <div class="button__content">
                    <p class="subheading">Upload Image</p>
                    <v-icon color="grey darken-1">add</v-icon>
                  </div>
                </div>
                <div class="dropzone__scrim" />
              </div>
              <div v-if="fileAttachments.length > 0" class="images__list">
                <CreateAttachmentItem
                  v-for="(file, i) in fileAttachments('thumbnail', true)"
                  :key="`attachment-item--thumbnail-${i}-${$uuid.v4()}`"
                  :data="file"
                />
              </div>
            </div>
          </div>
        </v-col>

        <!-- <div class="inner__divider" /> -->

        <v-col class="col-12 col-md-4">
          <div class="images-section images__carousel">
            <div class="section__title">
              <h3>Carousel Images</h3>
              <p>Header images</p>
            </div>
            <div class="images__container">
              <AttachmentUploader
                multiple
                ref="attachmentUploader_Carousel"
                :attach-to="getAttachTo"
                :file-usage-type="'carousel'"
              />
              <div :class="['images__dropzone', { 'drag-over': fileDragOver }]">
                <div
                  v-ripple
                  class="dropzone__button"
                  @dragover.prevent
                  @dragenter.prevent.stop="uploadDragOver(true)"
                  @dragleave.prevent.stop="uploadDragOver(false)"
                  @drop.prevent.stop="dropFiles"
                  @click="attachmentUploader_Carousel.select()"
                >
                  <div class="button__content">
                    <p class="subheading">Upload Images</p>
                    <v-icon color="grey darken-1">add</v-icon>
                  </div>
                </div>
                <div class="dropzone__scrim" />
              </div>
              <div v-if="fileAttachments.length > 0" class="images__list">
                <CreateAttachmentItem
                  v-for="(file, i) in fileAttachments('carousel')"
                  :key="`attachment-item--carousel-${i}-${$uuid.v4()}`"
                  :data="file"
                />
              </div>
            </div>
          </div>
        </v-col>

        <!-- <div class="inner__divider" /> -->

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
                :file-usage-type="'body'"
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
              <div v-if="fileAttachments.length > 0" class="images__list">
                <CreateAttachmentItem
                  v-for="(file, i) in fileAttachments('body')"
                  :key="`attachment-item--body-${i}-${$uuid.v4()}`"
                  :data="file"
                />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

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
            :file-usage-type="'video'"
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
            <CreateAttachmentItem
              v-for="(file, i) in fileAttachments('video')"
              :key="`attachment-item--video-${i}-${$uuid.v4()}`"
              :data="file"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="form-section create__meta">
      <h2>Meta</h2>

      <div class="inner__divider" />

      <div class="meta-section project__languages">
        <div class="section__title">
          <h3>Project Languages <span class="caption">(Optional)</span></h3>
          <p>Languages used creating this project.</p>
        </div>
        <div class="languages__container">
          <div :ripple="false" class="language__add-button" @click="addLanguage">
            <div class="button__content">
              <p class="subheading">Add Language</p>
              <v-icon color="grey darken-1">add</v-icon>
            </div>
          </div>
          <div class="language__list">
            <CreateLanguageItem
              v-for="(item, i) in formModel.languages"
              :key="`language-item-${item.id})`"
              :id="item.id"
              :value="formModel.languages[i].value"
              :value-callback="updateLanguage"
              :language="formModel.languages[i].language"
              :language-callback="updateLanguage"
              :remove-callback="removeLanguage"
            />
          </div>
        </div>
      </div>

      <div class="meta-section project__languages">
        <div class="section__title">
          <h3>Project Resources <span class="caption">(Optional)</span></h3>
          <p>Resources used creating this project.</p>
        </div>
        <div class="languages__container">
          <CreateResourcePicker
            :items="propsStore.projectResources"
            :items-selected-callback="resourceItemsSelected"
          />
        </div>
      </div>

      <!-- <div class="meta-section project__file-tree">
        <div class="section__title">
          <h3>File Structure <span class="caption">(Optional)</span></h3>
          <p>Project file structure. Requires JSON file.</p>
        </div>
        <div class="tree__input">
          <div
            v-ripple
            class="tree__add-button"
            @click="$refs.fileStructureControl.click()"
          >
            <div class="button__content">
              <p class="subheading">Add JSON File</p>
              <v-icon color="grey darken-1">add</v-icon>
            </div>
          </div>
          <input
            hidden
            ref="fileStructureControl"
            class="file-structure-uploader__input"
            accept="application/json"
            type="file"
            name="file"
            @change="handleSelectedFileStructFiles"
          />
        </div>
        
        <div class="tree__container">
          <v-treeview
            hoverable
            open-on-click
            :items="projectTreeStore.tree_data"
            :open="[1]">
            <template v-slot:prepend="{ item, open }">
                <FontAwesomeIcon v-if="!item.file" :icon="folderIcon(open)" />
                <font-awesome-icon v-else :icon="[treeOptions.fileIcons[item.file].prefix, treeOptions.fileIcons[item.file].icon]" />
            </template>
          </v-treeview>
        </div>
      </div> -->

      <!-- <div class="meta-section project__code-sample">
            <div class="section__title">
                <h3>Code Sample</h3>
                <p>Projects page image.</p>
            </div>
            <div class="code-sample__container">
                  <codemirror v-model="model.code" :options="cmOptions"></codemirror>
            </div>
        </div> -->
    </div>

    <div class="form-section project__save-btn">
      <v-progress-circular
        v-if="projectsStore.saving"
        indeterminate
        class="progress__ind"
        color="primary"
        width="8"
        size="38"
      />
      <div v-if="false /* $v.$invalid && submitted */" class="error-prompt">
        <p>Please complete all require fields</p>
        <div class="divider" />
      </div>
      <AppButton
        label="Save Project"
        :disabled="projectsStore.saving"
        @click.native="submitForm"
      />
    </div>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { uuid } from 'vue-uuid'

import stores from '@/stores/index.js'

import AttachmentUploader from '@/components/_global/Attachment_Uploader.vue'
import CreateAttachmentItem from '@/components/Forms/CreateProject/Project/Project_Create__Attachment_Item.vue'
import CreateLanguageItem from '@/components/Forms/CreateProject/Project/Project_Create__Language_Item.vue'
import CreateResourcePicker from '@/components/Forms/CreateProject/Project/Project_Create__Resource_Picker.vue'
import AppButton from '@/components/_global/App_Button.vue'

// stores
const typesStore = stores.config.typesStore()
const propsStore = stores.config.propsStore()
const userStore = stores.userStore()
const projectsStore = stores.projectsStore()
const uploadManagerStore = stores.s3.uploadManagerStore()
// const projectTreeStore = stores.projectTreeStore()

// refs
let submitted = ref(false)
const fileDragOver = ref(false)
const attachmentUploader_Thumbnail = ref(null)
const attachmentUploader_Carousel = ref(null)
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
  resources: [],
  hasTree: false
})

const treeOptions = reactive({
  fileIcons: {
    css: { prefix: 'fab', icon: 'css3' },
    fav: { prefix: 'fas', icon: 'star' },
    group: { prefix: 'fas', icon: 'ellipsis-h' },
    html: { prefix: 'fab', icon: 'html5' },
    image: { prefix: 'fas', icon: 'file-image' },
    js: { prefix: 'fab', icon: 'js' },
    json: { prefix: 'fas', icon: 'code' },
    md: { prefix: 'fab', icon: 'markdown' },
    node: { prefix: 'fab', icon: 'node-js' },
    pdf: { prefix: 'fas', icon: 'file-pdf' },
    vieo: { prefix: 'fas', icon: 'file-video' },
    vue: { prefix: 'fab', icon: 'vuejs' },
    yarn: { prefix: 'fab', icon: 'yarn' }
  }
})

// computed
const projectYears = computed(() => {
  return propsStore.projectYears.slice().reverse()
})

const getAttachTo = computed(() => ({ 
  model: typesStore.ATTACHMENT_TYPE__PROJECT,
  model_id: formModel.projectId
}))

const fileAttachments = computed(() => {
  return (usageType, singleReturn) => {
    let files = []

    let paramsWithId = {
      attach_to: {
        model_id: formModel.projectId,
        model: typesStore.ATTACHMENT_TYPE__PROJECT
      }
    }

    files = files
      .concat(uploadManagerStore.getCompletedFiles(paramsWithId))
      .concat(uploadManagerStore.getUploadingFiles(paramsWithId))
      .concat(uploadManagerStore.getProcessingFiles(paramsWithId))
      .concat(uploadManagerStore.getQueuedFiles(paramsWithId))

    files.sort(function (a, b) {
      return a.addedToQueue - b.addedToQueue
    })

    let filteredFiles = files.filter(file => file.usage_type === usageType)

    if (filteredFiles.length === 0) return []
    return singleReturn ? new Array(filteredFiles[filteredFiles.length - 1]) : filteredFiles
  }
})

const folderIcon = computed((open) => {
    return open ? faFolder: faFolderOpen
})

// lifecycle hooks
onMounted(() => {
  formModel.projectId = uuid.v4()
  formModel.isGuestProject = !userStore.userIsAuthenticated
})

// medthods
function uploadThumbnail() {
  attachmentUploader_Thumbnail.value.select()
}

function uploadDragOver (value) {
  fileDragOver = value
}

function dropFiles (event) {
  fileDragOver = false
  // this.$refs.attachmentUploader.loadFiles(event.dataTransfer.files) // <--------------------------- MAKE THIS WORK (refs?)
}

function addLanguage () {
  formModel.languages.push({
    id: uuid.v4(),
    value: 0,
    language: ''
  })
}

function updateLanguage (data) {
  let index = formModel.languages.findIndex(x => x.id === data.id)
  if (index > -1) {
    Object.assign(formModel.languages[index], data)
  }
}

function removeLanguage (id) {
  let index = formModel.languages.findIndex(x => x.id === id)
  if (index > -1) {
    formModel.languages.splice(index, 1)
  }
}

function resourceItemsSelected (items) {
  formModel.resources = items
}

/* function handleSelectedFileStructFiles (event) {
  // let file = this.$refs.fileStructureControl.files[0] // <--------------------------- MAKE THIS WORK (refs?)

  let reader = new FileReader()
  reader.onload = this.onReaderLoad
  reader.readAsText(file)
} */

/* function onReaderLoad (event) {
  var jsonTree = JSON.parse(event.target.result)
  this.createProjectTree(
    {
      projectId: formModel.projectId,
      tree_data: jsonTree
    }
  )
} */

function submitForm () {
  submitted = true

  // Clean model before send
  Object.keys(formModel).forEach(k => {
    if (formModel[k] === null ||
      formModel[k] === undefined ||
      formModel[k].length === 0) delete formModel[k]
  })

  // let [projectDateYear, projectDateMonth] = formModel.project_date.split('-')

  // if (!this.$v.$invalid) {
    projectsStore.createProject(formModel)

    /* this.createProject({
      ...formModel,
      project_date: `${projectDateMonth}-01-${projectDateYear} 00:00:00`
    }) */
  // }
}

/* watch(projectTree, (val) => {
  // if (val && val.tree_data.length) this.model.hasTree = true
}) */
</script>
