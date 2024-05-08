<template>
  <v-container class="form--role-create">
    <div class="form-section create__form">
      <v-row>
        <v-col class="col-12 order-md-12 offset-md-4 col-md-4">
          <div class="project__pending-id">
            <p>{{ formModel.role_id }}</p>
          </div>
        </v-col>
        <v-col class="col-12 col-md-4">
          <v-select
            filled
            dense
            label="Client"
            item-text="name"
            :items="propsStore.roleClients"
            v-model="formModel.client"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field filled label="Job Title" v-model="formModel.job_title" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field filled label="Organization" v-model="formModel.department" />
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
      <h2>Projects</h2>

      <div class="inner__divider" />

      <v-row>
        <v-col class="col-12">
          <div class="projects-section">
            <div class="projects__container">
              <div>
                <RoleProjectItem
                  ref="roleProjects"
                  v-for="(project, i) in formModel.projects"
                  :key="`project-item--${i}`"
                  :id="i"
                  :role-id="formModel.role_id"
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
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { uuid } from 'vue-uuid'

import store from '@/stores/index.js'

import RoleProjectItem from '@/components/Forms/CreateProject/Role/Role_Create__Project_item.vue'
import AppButton from '@/components/_global/App_Button.vue'
import TextEditor from '@/components/_global/Text_Editor.vue'

const propsStore = store.config.propsStore()
const rolesStore = store.rolesStore()

const { saving, createRole } = storeToRefs(rolesStore)

const roleProjects = ref(null)

let submitted = ref(false)
const formModel = reactive({
  ole_id: null,
  client: null,
  job_title: null,
  department: null,
  recruiter: null,
  description: null,
  projects: [],
  published: true
})

onMounted(() => {
  formModel.role_id = uuid.v4()
  // this.model.role_id = `r_${this.$uuid.v4()}`
})

function addProject() {
  formModel.projects.push({})
}

function removeProjectCallback(id) {
  formModel.projects.splice(id, 1)
}

function submitForm() {
  submitted = true

  formModel.projects = roleProjects ? roleProjects.map((project) => project.model) : []

  // Clean model before send
  Object.keys(formModel).forEach((k) => {
    if (formModel[k] === null || formModel[k] === undefined || formModel[k].length === 0)
      delete formModel[k]
  })

  createRole(formModel)
}

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
      role_id: null,
      client: null,
      job_title: null,
      department: null,
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
    this.model.role_id = this.$uuid.v4()
    // this.model.role_id = `r_${this.$uuid.v4()}`
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
