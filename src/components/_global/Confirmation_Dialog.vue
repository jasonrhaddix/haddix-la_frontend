<template>
  <div class="confirmation-dialog">
    <div class="confirmation-dialog__content">
      <div class="confirmation__title">
        <h1>{{ props.title }}</h1>
        <h4>{{ props.subtitle }}</h4>
      </div>
      <div class="confirmation__options">
        <div class="options__inner">
          <AppButton
            variant="colorful"
            :label="props.cancel.label"
            class="btn cancel-btn"
            @click="cancelAction" />

          <AppButton
            variant="light"
            :label="props.confirm.label"
            class="btn confirm-btn"
            @click="confirmAction" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import stores from '@/stores/index.js'

import AppButton from '@/components/_global/App_Button.vue'


const dialogStore = stores.ui.dialogStore()
const { props } = storeToRefs(dialogStore)

const cancelAction = () => {
  props.value?.cancel?.value?.action()
  closeDialog()
}

const confirmAction = () => {
  props.value?.confirm?.action()
  closeDialog()
}

const closeDialog = () => {
  dialogStore.hideDialog()
}
</script>
