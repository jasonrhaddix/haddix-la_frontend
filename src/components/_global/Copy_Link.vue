<template>
  <div class="copy-link-container" style="display: inline-block; position: relative;">
    <v-tooltip
      v-model="tooltipVisible"
      :text="tooltipText"
      location="top"
      transition="fade-transition"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          size="small"
          icon="link"
          @click="copyUrl"
        />
      </template>
    </v-tooltip>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tooltipVisible = ref(false)
const tooltipText = ref('Copy link')

const props = defineProps({
  postpend: {
    type: String,
    default: '',
  },
})

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(`${window.location.href}${props.postpend}`)
    tooltipText.value = 'Copied!'
    tooltipVisible.value = true

    setTimeout(() => {
      tooltipVisible.value = false
      tooltipText.value = 'Copy link'
    }, 1500)
  } catch (err) {
    tooltipText.value = 'Failed to copy'
    tooltipVisible.value = true
    setTimeout(() => (tooltipVisible.value = false), 2000)
  }
}
</script>