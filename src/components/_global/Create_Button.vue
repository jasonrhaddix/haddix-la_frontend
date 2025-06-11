<template>
  <div class="create__button">
    <v-btn color="primary" icon="add" @click="createClick" />
  </div>
</template>

<script setup>
import i18next from 'i18next'

import { asyncComponents } from '@/utils/helpers'

import stores from '@/stores/index.js'

const userStore = stores.userStore()
const dialogStore = stores.ui.dialogStore()
const overlayStore = stores.ui.overlayStore()

function createClick() {
  if (userStore.userIsAuthenticated) {
    dialogStore.showDialog({
      component: asyncComponents.CreatePicker,
      width: 900
    })
  } else {
    overlayStore.setComponent({
      component: asyncComponents.CreateProject,
      title: i18next.t('components:CREATE_BUTTON.CREATE_PROJECT'),
    })

    overlayStore.showOverlay()
  }
}
</script>
