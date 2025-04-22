<template>
  <div class="create-attachment-item">
    <div class="item__inner">
      <div class="item__image">
        <video
          v-if="data?.file?.type === 'video/mp4' || data?.file?.type === 'video/quicktime'"
          autoplay loop controls muted
          :src="compileVideoSrc"
        ></video>
        <img v-else :src="data.preview || data.uri" />
      </div>

      <div
        v-if="canRemove"
        @click="removeFile"
        class="item__remove">
        <v-icon color="error">delete</v-icon>
      </div>

      <div :class="['item__progress', `upload_${data.uploadStatus}`]">
        <div
          v-if="data.status === typesStore.REQUEST_STATUS__PENDING"
          class="progress"
        >
          <div class="progress__ind-background" />
          <div class="progress__ind" :style="fileProgress" />
          <div class="progress__percentage">
            <p>{{ fileProgressPercent }}</p>
          </div>
        </div>

        <div
          v-else-if="data.status === typesStore.REQUEST_STATUS__SUCCESS"
          class="status"
        >
          <div>
            <v-icon color="success">check_circle_outline</v-icon>
          </div>
        </div>

        <div
          v-else-if="data.status === typesStore.REQUEST_STATUS__FAILURE"
          class="status"
        >
          <div>
            <v-icon color="error">highlight_off</v-icon>
          </div>
        </div>
      </div>

      <!--
      <div class="item__actions">
        Remove
      </div>
      -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import stores from '@/stores'
// import { reverse } from 'store/storages/all'

const typesStore = stores.config.typesStore()

const emit = defineEmits(['remove-file'])

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// video
/* const compileVideoSrc = computed(() => {
  return URL.createObjectURL(props.data.file)
}) */

const canRemove = computed(() => {
  return props.data.status !== typesStore.REQUEST_STATUS__PENDING
})

const compileVideoSrc = computed(() => {
  if (props.data.file instanceof File) {
    return URL.createObjectURL(props.data.file)
  }

  // fallback to server-hosted URI (if reloaded from DB)
  return props.data.uri
})

// file progress percentage
const fileProgressPercent = computed(() => {
  const { total = null, loaded = null } = props?.data?.progress || {}
  if (!total || !loaded) return 0
  
  return total ? Math.round((loaded / total) * 100) + '%' : '0%'
})

// file progress style
const fileProgress = computed(() => {
  const { total = null, loaded = null } = props?.data?.progress || {}
  if (!total || !loaded) return 0

  return total ? { transform: `scaleX(${loaded / total})` } : 0
})

const removeFile = () => {
  emit('remove-file', props.data)
}
</script>