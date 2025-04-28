<template>
  <div class="toast__content">
    <component :is="item.component" :data="item.data" />
  </div>
</template>

<script setup>
  const props = defineProps({
    item: {
      type: Object,
      default: null
    }
  })
</script>