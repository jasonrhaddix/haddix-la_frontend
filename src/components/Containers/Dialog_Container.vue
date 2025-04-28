<template>
  <v-dialog light content-class="dialog-container" :max-width="width" v-model="openState">
    <div class="dialog-container__content">
      <component :is="loadedComponent" v-bind="props" @close="dialogStore.hideDialog" />
      <v-btn light small icon="close" class="close-btn" @click="dialogStore.hideDialog" />
    </div>
  </v-dialog>
</template>

<script setup>
import { watch, ref, markRaw, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'

import stores from '@/stores/index.js'

const dialogStore = stores.ui.dialogStore()
const { openState, component, width, props } = storeToRefs(dialogStore)

const loadedComponent = ref(null)

watch(component, (val) => {
  loadedComponent.value = component.value
  /* loadedComponent.value = markRaw(
    defineAsyncComponent(() => import(`../../components/${val}`))
  ) */
})
</script>
