<template>
  <div class="toast-stack-wrapper">

    <v-snackbar
      ref="snackbar"
      v-for="(item, index) in reversedToasts"
      :key="item.id"
      v-model="item.open"
      :timeout="-1"
      :class="['toast-container', item.data.type]"
      :style="{
        position: 'absolute',
        bottom: calcMargin(index),
        left: '50%',
        transform: 'translateX(-50%)'
      }">

      <!-- {{index}} -->
      <ToastBase :key="item.id" :item="item"/>

      <v-icon
        v-if="parseInt(item.timeout) === -1 || item.persist"
        icon="cancel" size="17"
        class="toast__clear-btn"
        @click="clear(item)" />
    </v-snackbar>

  </div>
</template>

<script setup>
  import { ref, computed, watch, nextTick } from 'vue'

  import stores from '@/stores'

  import ToastBase from '@/components/_global/Toast/Toast_BaseComponent.vue'

  const toastStore = stores.ui.toastStore()

  const snackbarHeights = ref([])

  const currentToasts = computed(() => toastStore.currentToasts)

  const reversedToasts = computed(() => {
    return [...currentToasts.value]/* .reverse() */
  })

  const calcMargin = (i) => {
    const height = snackbarHeights.value.slice(0, i).reduce((acc, item) => acc + item, 0)
    return `${height + (10 * i)}px`
  }

  const clear = (toast) => {
    toastStore.clearToast(toast.id)

    // Fire the close callback if it exists
    if (toast.closeCallback) toast.closeCallback()
  }

  watch( currentToasts, () => {
    nextTick(() => {
      snackbarHeights.value = Array.from(document.querySelectorAll('.toast-container')).map(item => {
        return item.querySelector('.v-snackbar__wrapper')?.offsetHeight || 0
      })
    })
  },{ deep: true })
</script>
