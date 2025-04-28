<template>
  <div class="create-picker">
    <div class="create-picker__content">
      <div class="picker__title">
        <h1>Create New</h1>
      </div>
      <div class="picker__options">
        <div v-ripple class="content__item">
          <div class="item" @click="openForm(typesStore.PROJECT_TYPE__WORK)">
            <v-icon size="170" color="white">dashboard</v-icon>
            <div>
              <h3>Project</h3>
            </div>
          </div>
        </div>
        <div class="content__item">
          <div v-ripple class="item" @click="openForm(typesStore.PROJECT_TYPE__NEW_ROLE)">
            <v-icon size="170" color="white">person</v-icon>
            <div>
              <h3>Role</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import stores from '@/stores/index.js'

import { asyncComponents } from '@/utils/helpers'

const typesStore = stores.config.typesStore()
const overlayStore = stores.ui.overlayStore()
const dialogStore = stores.ui.dialogStore()

function openForm(type) {
  switch (type) {
    case typesStore.PROJECT_TYPE__WORK:
    case typesStore.PROJECT_TYPE__COLLAB:
    case typesStore.PROJECT_TYPE__PERSONAL:
    case typesStore.PROJECT_TYPE__EXPERIMENT:
      overlayStore.setComponent({
        component: asyncComponents.CreateProject,
        title: 'Create Project'
      })

      overlayStore.showOverlay()
      break

    case typesStore.PROJECT_TYPE__NEW_ROLE:
      overlayStore.setComponent({
        component: asyncComponents.CreateRole,
        title: 'Create Role'
      })

      overlayStore.showOverlay()
      break
  }

  dialogStore.hideDialog()
}
</script>
