<template>
  <div class="create-picker">
    <div class="create-picker__content">
      <div class="picker__title">
        <h1>{{ $t('components:CREATE_PICKER.TITLE') }}</h1>
      </div>
      <div class="picker__options">
        <div v-ripple class="content__item">
          <div class="item" @click="openForm(typesStore.PROJECT_TYPE__WORK)">
            <v-icon size="170" color="white">dashboard</v-icon>
            <div>
              <h3>{{ $t('components:CREATE_PICKER.PROJECT_BUTTON.TITLE') }}</h3>
            </div>
          </div>
        </div>
        <div class="content__item">
          <div v-ripple class="item" @click="openForm(typesStore.PROJECT_TYPE__NEW_ROLE)">
            <v-icon size="170" color="white">person</v-icon>
            <div>
              <h3>{{ $t('components:CREATE_PICKER.ROLE_BUTTON.TITLE') }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18next from 'i18next'

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
        title: i18next.t('components:CREATE_PICKER.BUTTONS.CREATE_PROJECT'),
      })

      overlayStore.showOverlay()
      break

    case typesStore.PROJECT_TYPE__NEW_ROLE:
      overlayStore.setComponent({
        component: asyncComponents.CreateRole,
        title: i18next.t('components:CREATE_PICKER.BUTTONS.CREATE_PROJECT')
      })

      overlayStore.showOverlay()
      break
  }

  dialogStore.hideDialog()
}
</script>
