<template>
  <div class="attahment-uploader">
    <div>
      <!-- <video
			loop
			ref="videoControl"
			type="video/mp4"
			:style="{width: 'auto', display:'none'}"></video> -->
      <!-- <canvas
			ref="videoControlCanvas"
			:style="{width: 'auto', display:'none'}"></canvas> -->
      <v-img :src="base64" alt=""></v-img>
    </div>
    <input
			hidden
      ref="fileControl"
      class="attachment-uploader__input"
      :multiple="multiple"
      :accept="propsStore.acceptedFileTypes"
      type="file"
      name="thumbnail"
      @change="handleSelectedFiles"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { uuid } from 'vue-uuid'

import stores from '@/stores/index.js'

// SETUP ================================================
const propsStore = stores.config.propsStore()
const typesStore = stores.config.typesStore()
const uploadManagerStore = stores.s3.uploadManagerStore()

// define props
const props = defineProps({
  attachTo: {
    type: [Object, Array],
    required: true,
    default: () => ({})
  },
  fileUsageType: {
    type: String,
    required: true,
    default: null
  },
  setProps: {
    type: Object,
    required: false,
    default: null
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false
  },
  acceptedFileTypes: {
    type: [Array, String],
    required: false,
    default: '*'
  },
  dispatchOnItemsSelected: {
    type: [Function, Promise],
    required: false,
    default: null
  }
})
// ================================================

// refs
const fileControl = ref(null) // element
const base64 = ref(null)
const multiple = ref(null)

// reactive
const previewsPending = reactive([])
let processedFiles = reactive([])
let files = reactive([])
let previewLoadTicker = reactive(null)

// upload methods
function select() {
  fileControl.value?.click()
}

function loadFiles() {
	this.handleSelectedFiles(files)
}

// handle upload
function handleSelectedFiles(event) {
	// 1) Freshly read the files array in each change
	// there is a bug where sometimes fileControl appears as undefined
	// so grab files from the path
	if (fileControl !== undefined) {
		files = fileControl.value.files
	} else {
		if (event.path && event.path[0].files) {
			files = event.path[0].files
		}
	}

	// 2) Abort if no files are selected
	if (!files.length) return

	// 3) Loop through files
	Array.prototype.forEach.call(files, (file, index) => {
		let	data = {
			projectId: props.attachTo.modelId,
			fileId: uuid.v4(),
			file: file,
			filename: file.name.replace(/\s/g, '_'),
			usageType: props.fileUsageType,
			usageSubtype: null,
			progress: {},
			status: typesStore.REQUEST_STATUS__PENDING,
			uploadStatus: typesStore.REQUEST_STATUS__PENDING,
			attachTo: props.attachTo
		}

		// Assign props from incoming 'setProps Obj'
		if (props.setProps) Object.assign(data, props.setProps)

		// if (file.type === 'video/mp4' || file.type === 'video/quicktime') {
		if (false) {
			// GET VIDEO THUMBNAIL

			// let video = this.$refs.videoControl
			// let canvas = this.$refs.videoControlCanvas

			// video.src = URL.createObjectURL(file)
			// video.currentTime = 15

			// let ctx = canvas.getContext('2d')

			// video.onloadedmetadata = function () {
			// 	ctx.canvas.width = video.videoWidth
			// 	ctx.canvas.height = video.videoHeight

			// 	setTimeout(() => {
			// 		ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

			// 		let base64Img = canvas.toDataURL('image/jpeg')
			// 		Object.assign(data, { preview: base64Img })

			// 		self.addFilesToAQM([data])
			// 	}, 1000)
			// }

			// this.addFilesToAQM([data])
		} else {
			// FILES LESS THAT 20MB get preview
			if (file.size < 20 * 1024 * 1024) {
				var fr = new FileReader()
				fr.onload = function () {
					Object.assign(data, { preview: fr.result })
					processedFiles.push(data)
				}

				fr.readAsDataURL(file)
				previewsPending.push(fr)
			} else {
				Object.assign(data, { preview: null })
				processedFiles.push(data)

				previewsPending.push(null)
			}
		}

		previewLoadTicker = setInterval(checkPreviewsReadyState, 100)
	})
}

function checkPreviewsReadyState () {
	let isPending = previewsPending.filter(item => {
		if (!item) return
		return item['readyState'] !== 2 // is finished
	})

	if (isPending.length === 0) {
		clearInterval(previewLoadTicker)

		uploadManagerStore.addFiles(processedFiles)

		if (props.dispatchOnItemsSelected) { props.dispatchOnItemsSelected(processedFiles) }
		processedFiles = []
	}
}

// exposed properties
defineExpose({
  select, // function
	loadFiles // function
})
</script>
