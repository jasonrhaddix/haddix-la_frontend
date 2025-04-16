<template>
  <div class="toast__content">
    <component :is="loadedComponent" :data="item.data" />
  </div>
</template>

<script setup>
  import { watch, ref, markRaw, defineAsyncComponent } from 'vue'

  const props = defineProps({
    item: {
      type: Object,
      required: true,
      default: null
    }
  })

  const loadedComponent = ref(null)

  watch(() => props.item, (val) => {
    loadedComponent.value = markRaw(
      defineAsyncComponent(() => import(`../../${val.component}`))
    )
  }, { deep: true, immediate: true })
</script>