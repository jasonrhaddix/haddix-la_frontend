<template>
    <div class="create-attachment-item">
        <div class="item__inner">
            <div class="item__image">
                <video
                    v-if="data.file.type == 'video/mp4' || data.file.type == 'video/quicktime'"
                    autoplay loop
                    controls muted
                    :src="compileVideoSrc"></video>

                <img v-else :src="data.preview" />
            </div>
            <div :class="['item__progress', `upload_${data.upload_status}`]">
                <div
                    v-if="data.status == typesStore.REQUEST_STATUS__PENDING"
                    class="progress">
                    <div class="progress__ind-background"/>
                    <div class="progress__ind" :style="fileProgress"/>
                    <div class="progress__percentage">
                        <p>{{fileProgressPercent}}</p>
                    </div>
                </div>

                <div
                    v-else-if="typesStore.REQUEST_STATUS__SUCCESS"
                    class="status">
                    <div><v-icon color="success">check_circle_outline</v-icon></div>
                </div>

                <div
                    v-else-if="typesStore.REQUEST_STATUS__FAILURE"
                    class="status">
                    <div><v-icon color="error">highlight_off</v-icon></div>
                </div>
            </div>
           <!--  <div class="item__actions">
                Remove
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

import stores from '@/stores'

const typesStore = stores.config.typesStore()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// video
const compileVideoSrc = computed(() => {
  return URL.createObjectURL(props.data.file)
})

// file progress
const fileProgressPercent = computed(() => {
  let total = props.data.progress.total
  let loaded = props.data.progress.loaded
  return (total) ? Math.round(loaded / total * 100) + '%' : '0%'
  // return (total) ? (loaded/total * 100).toFixed(1) + "%" : "0.0%" // with tenths
})

const fileProgress = computed(() => {
  let total = props.data.progress.total
  let loaded = props.data.progress.loaded

  if (!total) return 0
  return { transform: 'scaleX(' + loaded / total + ')' }
})
</script>
