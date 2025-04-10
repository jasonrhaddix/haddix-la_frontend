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
            label="Project Type"
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
            :items="propsStore.projectClients"
            v-model="formModel.client"
          />
        </v-col>
        <v-col class="col-12 col-md-4">
          <v-select
            dense
            label="Role"
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
                file-usage-type="thumbnail"
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
                <AttachmentItem
                  v-for="(file, i) in fileAttachments('thumbnail', true)"
                  :key="`attachment-item--thumbnail-${i}-${$uuid.v4()}`"
                  :data="file"
                />
              </div>
            </div>
          </div>
        </v-col>

        <!-- CAROUSEL IMAGES -->
        <v-col class="col-12 col-md-4">
          <div class="images-section images__carousel">
            <div class="section__title">
              <h3>Carousel Images</h3>
              <p>Header images</p>
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
                    <p class="subheading">Upload Images</p>
                    <v-icon color="grey darken-1">add</v-icon>
                  </div>
                </div>
                <div class="dropzone__scrim" />
              </div>
              <div v-if="fileAttachments.length > 0" class="images__list">
                <AttachmentItem
                  v-for="(file, i) in fileAttachments('header')"
                  :key="`attachment-item--carousel-${i}-${$uuid.v4()}`"
                  :data="file"
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
              <div v-if="fileAttachments.length > 0" class="images__list">
                <AttachmentItem
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
          <div v-if="fileAttachments.length > 0" class="images__list">
            <AttachmentItem
              v-for="(file, i) in fileAttachments('video')"
              :key="`attachment-item--video-${i}-${$uuid.v4()}`"
              :data="file"
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
          <h3>Project Resources <span class="caption">(Optional)</span></h3>
          <p>Resources used creating this project.</p>
        </div>
        <div class="languages__container">
          <ResourcePicker
            v-model="formModel.resources"
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
import _pick from 'lodash.pick'
import _isEqual from 'lodash.isequal'
import _isObject from 'lodash.isobject'
import { uuid } from 'vue-uuid'
import { ref, reactive, computed, onMounted } from 'vue'

import stores from '@/stores/index.js'
import { Project } from '@/models'

import AttachmentUploader from '@/components/_global/Attachment_Uploader.vue'
import AttachmentItem from '@/components/Forms/CreateProject/Project/Project_Create__Attachment_Item.vue'
// import CreateLanguageItem from '@/components/Forms/CreateProject/Project/Project_Create__Language_Item.vue'

import LanguagePicker from '@/components/Forms/CreateProject/Project/Project_Create__Language_Picker.vue'
import ResourcePicker from '@/components/Forms/CreateProject/Project/Project_Create__Resource_Picker.vue'
import AppButton from '@/components/_global/App_Button.vue'

// stores
const typesStore = stores.config.typesStore()
const propsStore = stores.config.propsStore()
const userStore = stores.userStore()
const projectsStore = stores.projectsStore()
const uploadManagerStore = stores.s3.uploadManagerStore()
// const projectTreeStore = stores.projectTreeStore()

const props = defineProps({
  data: {
    type: [Boolean, Number, String, Array, Object, null],
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
  // hasTree: false
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
const projectTypesKey = computed((open) => {
    return propsStore.projectTypes.map(i => i.value).join('-')
})

const projectYears = computed(() => {
  return propsStore.projectYears.slice().reverse()
})

const getAttachTo = computed(() => ({ 
  model: typesStore.ATTACHMENT_TYPE__PROJECT,
  modelId: formModel.projectId
}))

const isEditMode = computed(() => {
  return !!props.data.id
})

/* const folderIcon = computed((open) => {
    return open ? faFolder: faFolderOpen
}) */

// lifecycle hooks
onMounted(async () => {
  if (props.data.id) {
    const project = await projectsStore.fetchProjectById(props.data.id)
    updateProject.value = Project.projectDetails(project)
  }
  initForm()
  
})

function initForm () {
  formModel.isGuestProject = !userStore.userIsAuthenticated
  if (isEditMode.value) {
    formModel.projectId = updateProject.value.projectId
    formModel.type = updateProject.value.type
    formModel.title = updateProject.value.title
    formModel.subtitle = updateProject.value.subtitle
    formModel.client = propsStore.getPropertyByKey('projectClients', updateProject.value.client, 'title', 'value')
    formModel.role = propsStore.getPropertyByKey('projectRoles', updateProject.value.role, 'title', 'value')
    formModel.projectYear = updateProject.value.projectYear
    formModel.excerpt = updateProject.value.excerpt
    formModel.description = updateProject.value.description
    formModel.link = updateProject.value.link
    formModel.published = updateProject.value.published
    formModel.attachments = updateProject.value.attachments // ?.map(i => i.id)
    formModel.languages = updateProject.value.languages?.map(i => i.value)
    formModel.resources = updateProject.value.resources?.map(i => i.value)
  } else {
    formModel.projectId = uuid.v4()
  }
}
// medthods
function uploadThumbnail () {
  attachmentUploader_Thumbnail.value.select()
}

function uploadDragOver (value) {
  fileDragOver.value = value
}

function dropFiles (event) {
  fileDragOver.value = false
  // this.$refs.attachmentUploader.loadFiles(event.dataTransfer.files) // <--------------------------- MAKE THIS WORK (refs?)
}

function fileAttachments (usageType, singleReturn) {
    let files = []

    let paramsWithId = {
      attachTo: {
        modelId: formModel.projectId,
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

    let filteredFiles = files?.filter(file => file.usageType === usageType) || []

    if (filteredFiles.length === 0) return []
    return singleReturn ? new Array(filteredFiles[filteredFiles.length - 1]) : filteredFiles
}

function resourceItemsSelected (items) {
  formModel.resources = items.map(item => item.value)
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

function deepDiff(obj1, obj2) {
  if (_isEqual(obj1, obj2)) return undefined;

  if (!_isObject(obj1) || !_isObject(obj2)) return obj2;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length || !obj1.every((val, i) => _isEqual(val, obj2[i]))) {
      return obj2; // replace the array if it’s different
    }
    return undefined;
  }

  const diff = {};
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allKeys) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!obj2.hasOwnProperty(key)) {
      diff[key] = undefined; // key was removed
    } else {
      const difference = deepDiff(value1, value2);
      if (difference !== undefined) {
        diff[key] = difference;
      }
    }
  }

  return Object.keys(diff).length > 0 ? diff : undefined;
}

function submitForm () {
  submitted.value = true

  // Clean model before send
  Object.keys(formModel).forEach(k => {
    if (formModel[k] === null ||
      formModel[k] === undefined ||
      formModel[k].length === 0) delete formModel[k]
  })
   
  // if (!this.$v.$invalid) {
    const fileProps = ['key', 'uri', 'fileId', 'filename', 'attachTo', 'projectId', 'usageType']
    const attachments = {
      thumbnail: fileAttachments('thumbnail', true).map(file => _pick(file, fileProps)),
      header: fileAttachments('header').map(file => _pick(file, fileProps)),
      body: fileAttachments('body').map(file => _pick(file, fileProps)),
      video:fileAttachments('video').map(file => _pick(file, fileProps))
    }
    console.log('submitForm', isEditMode.value)
    if (isEditMode.value) {
      console.log('update')

      const diff = deepDiff(updateProject.value, Project.projectDetails(formModel))
      console.log('diff', diff, updateProject.value, Project.projectDetails(formModel))
      
      projectsStore.updateProject(props.data.id, diff)
    } else { 
      console.log('create')
      
      projectsStore.createProject({ ...formModel, attachments })
    }

    window.scrollTo(0, 0)
  // }
}
</script>
