<template>
  <div class="projects-view">
    <!-- <SphereBG :style="{position: 'fixed'}" class="sphere-bg" /> -->

    <div class="projects__add-btn">
      <CreateButton />
    </div>
    <div v-if="!projectsStore.hasProjects && projectsStore.projectsLoading">
      <v-progress-circular
        indeterminate
        class="progress__ind"
        color="primary"
        width="8"
        size="38"
      />
    </div>
    <div v-if="projectsStore.hasProjects" class="projects__list">
      <project-item
        v-for="(item, i) in filteredProjects"
        :key="`project-${item.projectId}-${i}`"
        :data="item"
        :click-callback="navigateToProject"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import stores from '@/stores/index.js'

// import SphereBG from '@/components/SphereBG/Sphere_BG.vue'
import ProjectItem from '@/components/Projects/Project_Item.vue'
import CreateButton from '@/components/_global/Create_Button.vue'

const typesStore = stores.config.typesStore()
const routingStore = stores.routingStore()
const projectsStore = stores.projectsStore()
const userStore = stores.userStore()

const filteredProjects = computed(() => {
  return projectsStore.projects.filter(p => {
    if (
      p.type !== typesStore.PROJECT_TYPE__EXPERIMENT
      && (!p.isGuestProject || p.sessionId === userStore.sessionToken)
    )
      return p
  })/* .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)); SORTING NOW HAPPENS ON THE BE */
})

function navigateToProject(data) {
  routingStore.pushRoute({
    name: 'project-details',
    params: data
  })
}

</script>
