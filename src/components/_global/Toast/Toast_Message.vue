<template>
    <div class="toast-message">
        <div v-if="toastIcon">
            <v-icon :color="toastIcon.color">{{ toastIcon.icon }}</v-icon>
        </div>
        <div>
            <h4 v-if="data.title" v-html="data.title" />
            <p v-html="data.message" />
        </div>
    </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    data: {
      type: Object,
      required: true,
      default: null
    }
  })

  const message = computed(() => {
    return props.data.message || ''
  })

  const toastIcon = computed(() => {
    if (!props.data.type) return null
    
    switch (props.data.type) {
      case 'success' :
        return {
          color: 'green',
          icon: 'check_circle'
        }
      case 'warning' :
        return {
          color: 'rgba(214, 209, 36, 1)',
          icon: 'warning'
        }
      case 'error' :
        return {
          color: 'red',
          icon: 'error'
        }
      default :
        return null
    }
  })
</script>
