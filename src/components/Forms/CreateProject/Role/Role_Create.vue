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
            filled dense
            label="Company"
            item-text="name"
            :items="propsStore.roleCompanies"
            v-model="formModel.company"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-text-field filled label="Role" v-model="formModel.role" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-6">
          <v-text-field filled label="Organization" v-model="formModel.organization" />
        </v-col>

        <v-col class="col-6">
          <v-select
            dense
            label="Year"
            :items="propsStore.roleYears"
            v-model="formModel.year"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
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
            <CreateRoleProjects v-model="formModel.projects" :roleId="formModel.roleId" />
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
import cloneDeep from 'lodash/cloneDeep' // or use your own deep clone util
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { uuid } from 'vue-uuid'

import stores from '@/stores/index.js'
import { Role } from '@/models'
import { objectHelpers } from '@/utils/helpers'

import AppButton from '@/components/_global/App_Button.vue'
import TextEditor from '@/components/_global/Text_Editor.vue'
import CreateRoleProjects from '@/components/Forms/CreateProject/Role/Role_Create__Projects.vue'

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

const updateRole = ref({})
const submitted = ref(false)
const formModel = reactive({
  roleId: null,
  role: null,
  company: null,
  organization: null,
  year: null,
  recruiter: null,
  description: null,
  projects: [],
  published: true
})

onMounted(async () => {
  if (props.data.id) {
    const role = await rolesStore.fetchRoleById(props.data.id)
    updateRole.value = role
  }

  initForm()
})

const initForm = () => {
  if (isEditMode.value) {
    const cleanRole = cloneDeep(updateRole.value)

    Object.assign(formModel, {
      ...cleanRole,
      roleId: cleanRole.roleId,
      role: cleanRole.role,
      company: cleanRole.company,
      organization: cleanRole.organization,
      year: cleanRole.year,
      recruiter: cleanRole.recruiter,
      description: cleanRole.description,
      projects: cleanRole.projects,
      published: cleanRole.published
    })
  } else {
    formModel.roleId = uuid.v4()
  }
}

const isEditMode = computed(() => {
  return !!props.data.id
})

const submitForm = async () => {
    submitted.value = true

    /* // Clean model before send
    Object.keys(formModel).forEach(k => {
      if (formModel[k] === null ||
        formModel[k] === undefined ||
        formModel[k].length === 0) delete formModel[k]
    }) */
  
    if (isEditMode.value) {
      const diff = objectHelpers.deepDiff(updateRole.value, formModel)

      try {
        await rolesStore.updateRole(props.data.id, diff)

        toastStore.addToast({
          component: '_global/Toast/Toast_Message.vue',
          data: {
            type: 'success',
            title: 'Role Updated!',
            message: `${formModel.role} for ${formModel.company}`
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
        const role = await rolesStore.createRole(formModel)

        toastStore.addToast({
          component: '_global/Toast/Toast_Message.vue',
          data: {
            type: 'success',
            title: 'Role Created!',
            message: `${role.role} for ${role.company}`
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
</script>
