<template>
  <v-container class="form--role-create">
    <div class="form-section create__form">
      <v-row>
        <v-col class="col-12 order-md-12 offset-md-4 col-md-4">
          <div class="project__pending-id">
            <p>{{ formModel.roleId }}</p>
          </div>
        </v-col>
        <v-col class="col-12 col-md-4">
          <v-select
            filled
            dense
            label="Company"
            item-text="name"
            :items="propsStore.roleCompanies"
            v-model="formModel.company"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field filled label="Job Title" v-model="formModel.jobTitle" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field filled label="Organization" v-model="formModel.organization" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <!-- <v-textarea
						filled
						label="Description"
						v-model="formModel.description"/> -->
          <TextEditor v-model="formModel.description" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field filled label="Recruiter" v-model="formModel.recruiter" />
        </v-col>
      </v-row>
    </div>

    <div class="form-section create__projects">
      <h2>Project Examples</h2>

      <div class="inner__divider" />

      <v-row>
        <v-col cols="12">
          <div class="projects-section">
            <div class="projects__container">
              <div>
                <RoleProjectItem
                  ref="roleProjects"
                  v-for="(project, i) in formModel.projects"
                  :key="`project-item--${i}`"
                  :id="i"
                  :role-id="formModel.roleId"
                  :removeCallback="removeProjectCallback"
                />

                <div :ripple="false" class="add-project-btn" @click="addProject">
                  <div class="button__content">
                    <p class="subheading">Add Project</p>
                    <v-icon color="grey darken-1">add</v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="form-section role__save-btn">
      <v-progress-circular
        v-if="saving"
        indeterminate
        class="progress__ind"
        color="primary"
        width="8"
        size="38"
      />
      <AppButton label="Save Role" :disabled="saving" @click.native="submitForm" />
    </div>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { uuid } from 'vue-uuid'

import stores from '@/stores/index.js'

import RoleProjectItem from '@/components/Forms/CreateProject/Role/Role_Create__Project_item.vue'
import AppButton from '@/components/_global/App_Button.vue'
import TextEditor from '@/components/_global/Text_Editor.vue'

const propsStore = stores.config.propsStore()
const rolesStore = stores.rolesStore()
const overlayStore = stores.ui.overlayStore()
const toastStore = stores.ui.toastStore()

const { saving, createRole } = storeToRefs(rolesStore)

const props = defineProps({
  data: {
    type: Object,
    required: false
  }
})

const updateProject = ref({})

const submitted = ref(false)
const formModel = reactive({
  roleId: null,
  company: null,
  jobTitle: null,
  organization: null,
  recruiter: null,
  description: null,
  projects: [],
  published: true
})

onMounted(async () => {
  if (props.data.id) {
    const project = await projectsStore.fetchProjectById(props.data.id)
    updateProject.value = Project.projectDetails(project)
  }

  initForm()

  // formModel.roleId = uuid.v4()
})

const initForm = () => {
  if (isEditMode.value) {
    Object.assign(formModel, {
      ...updateProject.value,
      roleId: updateRole.value.projectId,
      company: updateRole.value.company,
      jobTitle: updateRole.value.jobTitle,
      organization: updateRole.value.organization,
      recruiter: updateRole.value.recruiter,
      description: updateRole.value.description,
      projects: updateRole.value.projects,
      published: updateRole.value.published
    })
  } else {
    formModel.roleId = uuid.v4()
  }
}

const isEditMode = computed(() => {
  return !!props.data.id
})

function addProject() {
  formModel.projects.push({})
}

function removeProjectCallback(id) {
  formModel.projects.splice(id, 1)
}

const submitForm = async () => {
    submitted.value = true

    // Clean model before send
    Object.keys(formModel).forEach(k => {
      if (formModel[k] === null ||
        formModel[k] === undefined ||
        formModel[k].length === 0) delete formModel[k]
    })


    // const wrapperKeys = ['key', 'uri', 'status', 'file', 'fileId', 'filename', 'attachTo', 'projectId', 'usageType', 'usageSubtype']
    // const fileKeys = ['name', 'type']
    
    // const attachments = extractAttachmentData(['thumbnail', 'header', 'body', 'video'], wrapperKeys, fileKeys)
  
    if (isEditMode.value) {
      const diff = objectHelpers.deepDiff(updateProject.value, {...formModel, attachments})

      try {
        await rolessStore.updateRole(props.data.id, diff)
        
        toastStore.addToast({
          component: '_global/Toast/Toast_Message.vue',
          data: {
            type: 'success',
            title: 'Role Updated!',
            message: `${formModel.title}`
          }
        })
      } catch (error) {
        toastStore.addToast({
          component: '_global/Toast/Toast_Message.vue',
          data: {
            type: 'error',
            title: 'Error',
            message: 'An error occurred while updating the role.'
          }
        })
      }
    } else {       
      // Create new role
      try {
        await rolesStore.createRole(formModel)
        // await rolesStore.createRole({ ...formModel, attachments })

        toastStore.addToast({
          component: '_global/Toast/Toast_Message.vue',
          data: {
            type: 'success',
            title: 'Role Created!',
            message: `${formModel.title}`
          }
        })
      } catch (error) {
        toastStore.addToast({
          component: '_global/Toast/Toast_Message.vue',
          data: {
            type: 'error',
            title: 'Error',
            message: 'An error occurred while creating the role.'
          }
        })
      }
    }

    overlayStore.hideOverlay()
  }

/* function submitForm() {
  submitted.value = true

  formModel.projects = roleProjects.value ? roleProjects.value?.map((project) => project.model) : []

  // Clean model before send
  Object.keys(formModel).forEach((k) => {
    if (formModel[k] === null || formModel[k] === undefined || formModel[k].length === 0)
      delete formModel[k]
  })

  rolesStore.createRole(formModel)
} */

// <======================================================================================================


/* import { mapState, mapActions } from 'vuex'

import { VUEX_ROLE_CREATE } from '@/store/constants/roles'

import RoleProjectItem from '@/components/Forms/CreateProject/Role/Role_Create__Project_item'
import AppButton from '@/components/_global/App_Button'
import TextEditor from '@/components/_global/Text_Editor'

export default {
  name: 'project-create-form',

  components: {
    'app-btn': AppButton,
    'role-project': RoleProjectItem,
    'text-editor': TextEditor
  },

  data: () => ({
    model: {
      roleId: null,
      client: null,
      jobTitle: null,
      organization: null,
      recruiter: null,
      description: null,
      projects: [],
      published: true
    },

    submitted: false
  }),

  computed: {
    ...mapState({
      roleSaving: (state) => state.roles.roleSaving,
      roleClients: (state) => state.config.roleClients
    })
  },

  mounted() {
    this.model.roleId = this.$uuid.v4()
    // this.model.roleId = `r_${this.$uuid.v4()}`
  },

  methods: {
    ...mapActions({
      createRole: VUEX_ROLE_CREATE
    }),

    addProject() {
      this.model.projects.push({})
    },

    removeProjectCallback(id) {
      this.model.projects.splice(id, 1)
    },

    submitForm() {
      this.submitted = true

      this.model.projects = this.$refs.roleProjects
        ? this.$refs.roleProjects.map((project) => project.model)
        : []

      // Clean model before send
      Object.keys(this.model).forEach((k) => {
        if (this.model[k] === null || this.model[k] === undefined || this.model[k].length === 0)
          delete this.model[k]
      })

      this.createRole(this.model)
    }
  }
} */
</script>
