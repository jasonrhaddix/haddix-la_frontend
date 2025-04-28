<template>
  <div class="create__button">
    <v-btn color="primary" icon="add" @click="createClick" />
  </div>
</template>

<script setup>
import { dynamicComponents } from '@/utils/helpers'


import stores from '@/stores/index.js'

console.log('dynamicComponents', dynamicComponents)

const userStore = stores.userStore()
const dialogStore = stores.ui.dialogStore()
const overlayStore = stores.ui.overlayStore()

function createClick() {
  if (userStore.userIsAuthenticated) {
    dialogStore.showDialog({
      component: dynamicComponents.CreateProject,
      width: 900
    })
  } else {
    overlayStore.setComponent({
      component: dynamicComponents.CreateProject,
      title: 'Create Project'
    })

    overlayStore.showOverlay()
  }
}
</script>
