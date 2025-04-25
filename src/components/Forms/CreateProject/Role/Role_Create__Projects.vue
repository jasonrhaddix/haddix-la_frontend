<template>
  <div class="projects__container">
    <RoleProjectItem
      v-for="(project, i) in projects"
      :key="project.roleId"
      v-model="projects[i]"
      @remove="removeProject"
    />

    <div :ripple="false" class="add-project-btn" @click="addProject">
      <div class="button__content">
        <p class="subheading">Add Project</p>
        <v-icon color="grey darken-1">add</v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import shortid from 'shortid'

import RoleProjectItem from '@/components/Forms/CreateProject/Role/Role_Create__Project_item.vue'

const modelValue = defineModel()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  roleId: {
    type: String,
    required: false,
    default: shortid.generate()
  }
})

const projects = ref([])

const addProject = () => {
  projects.value.push({
    roleId: props.roleId,
    projectId: shortid.generate(),
    title: '',
    summary: '',
    attachments: []
  })
}

const removeProject = removeId => {
  projects.value = projects.value.filter(project => project.roleId !== removeId)
}

watch(modelValue, (value) => {
  projects.value = value
})

watch(projects, (value) => {
  modelValue.value = value
}, { deep: true })
</script>