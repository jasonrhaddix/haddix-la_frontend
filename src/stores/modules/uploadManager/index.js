import { defineStore } from 'pinia'
import hash from 'object-hash'
import isEqual from 'lodash.isequal'

import stores from '@/stores'

export default defineStore('uploadManage', {
	state: () => ({
		fileHash: {},

		filesHolding: [], // Files added from upload but holding for user input | comment attachment usage
		filesQueued: [], // Files ready to be processed
		filesAttaching: [], // ONLY used for file that are being attached and NOT uploaded
		filesUploading: [], // Files that are being uploaded
		filesProcessing: [], // Files currently being processed; Signal from BE not implemented yet, v2.1
		filesCompleted: [], // Successfully uploaded files
		filesFailed: [] // File that failed upload
	}),

	getters: {
		getHoldingFiles () {
			return params => this.filesHolding.map(hashId => this.fileHash[hashId]).reduce(function (filtered, fileObject) {
				if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
					filtered.push(fileObject)
				}
				return filtered
			}, [])
		},
	
		getQueuedFiles () {
			return params => this.filesQueued.map(hashId => this.fileHash[hashId]).reduce(function (filtered, fileObject) {
				if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
					filtered.push(fileObject)
				}
				return filtered
			}, [])
		},
	
		getUploadingFiles () {
			return params => this.filesUploading.map(hashId => this.fileHash[hashId]).reduce(function (filtered, fileObject) {
				if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
					filtered.push(fileObject)
				}
				return filtered
			}, [])
		},
	
		getProcessingFiles () {
			return params => this.filesProcessing.map(hashId => this.fileHash[hashId]).reduce(function (filtered, fileObject) {
				if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
					filtered.push(fileObject)
				}
				return filtered
			}, [])
		},
	
		getCompletedFiles () {
			return params => this.filesCompleted.map(hashId => this.fileHash[hashId]).reduce(function (filtered, fileObject) {
				if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
					filtered.push(fileObject)
				}
				return filtered
			}, [])
		}	
	},

	actions: {
		async addFiles(payload) {
			const typesStore = stores.config.typesStore()
			let fileObj

			for (var item in payload) {
				fileObj = payload[item]

				// Slugify filename here

				let hashId = hash(fileObj.file.name + (Math.floor(Math.random() * 100000) + 1))

				fileObj.hashId = hashId

				if (fileObj.hasOwnProperty('filemeta')) {
					fileObj.filemeta.hashId = hashId
				} else {
					fileObj.filemeta = { hashId: hashId }
				}

				fileObj.addedToQueue = Date.now()

				this.fileHash[hashId] = fileObj
				/* await commit(VUEX_ATTACHMENT_QUEUE_MANAGER_HASH_PUSH_FILE, {
					key: hashId,
					val: fileObj
				}) */

				this.moveToBucket({
					hashId: hashId,
					from: null,
					to: typesStore.UPLOAD_MANAGER_BUCKET__QUEUED
				})

				this.enqueueUpload()
			}
		},

		enqueueUpload() {
			const typesStore = stores.config.typesStore()
			const s3UploadStore = stores.s3.s3UploadStore()

			// Only process if there is work to do
			if (this.filesQueued.length > 0 && this.filesUploading.length < typesStore.S3__QUEUE_SIZE) {
				// Get next id
				let hashId = this.filesQueued[0]

				// Move from queued to uploading
				this.moveToBucket({
					hashId: hashId,
					from: typesStore.UPLOAD_MANAGER_BUCKET__QUEUED,
					to: typesStore.UPLOAD_MANAGER_BUCKET__UPLOADING
				})

				// Create a file object first
				// We need to send a specific set of create props
				let fileObj = this.fileHash[hashId]

				this.fileHash[hashId].status = typesStore.REQUEST_STATUS__PENDING

				s3UploadStore.s3UlopadRequest(fileObj)

				// if (!rootState.ui.globalUploader.displayState) {
				// 	dispatch(VUEX_UI_SHOW_GLOBAL_UPLOADER)
				// }

				// We may still have room, call again
				if (this.filesQueued.length > 0 && this.filesUploading.length < S3__QUEUE_SIZE) {
					this.enqueueUpload()
				}
			}
		},

		handleResult(payload) {
			const typesStore = stores.config.typesStore()

			// Save the deets to the object before continuing (status, URI, etc)
			this.fileHash[payload.hashId].upload_status = payload.status
			this.fileHash[payload.hashId].uri = payload.uri ? payload.uri : null
			
			if (payload.status === typesStore.REQUEST_STATUS__SUCCESS) {
				// Move on to next bucket
				this.moveToBucket({
					hashId: payload.hashId,
					from: typesStore.UPLOAD_MANAGER_BUCKET__UPLOADING,
					to: typesStore.UPLOAD_MANAGER_BUCKET__COMPLETE
				})
			} else if (payload.status === typesStore.REQUEST_STATUS__FAILURE) {
				this.moveToBucket({
					hashId: payload.hashId,
					from: typesStore.UPLOAD_MANAGER_BUCKET__UPLOADING,
					to: typesStore.UPLOAD_MANAGER_BUCKET__FAILED
				})
			}

			// See if we have more uploading to do
			this.enqueueUpload()
		},

		moveToBucket(payload) {
			// Remove it from preceding bucket
			if (payload.from) {
				let index = this[payload.from].indexOf(payload.hashId)
				// eslint-disable-next-line no-unused-vars
				let removed = (index > -1) ? this[payload.from].splice(index, 1) : null
			}

			// Add it to next bucket
			this[payload.to].unshift(payload.hashId)
		},

		assignS3Key(payload) {
			this.fileHash[payload.hashId].key = payload.key
		},

		uploadProgress(payload) {
			Object.keys(this.fileHash).forEach((hashId) => {
				if (this.fileHash[hashId].key === payload.key) {
					this.fileHash[hashId].progress = {
						loaded: payload.loaded,
						total: payload.total
					}
				}
			})
		},

		changeStatus(payload) {
			this.fileHash[payload.hashId].status = payload.status
		}
	}
})






/* 
import hash from 'object-hash'
import isEqual from 'lodash.isequal'

import {
	VUEX_ATTACHMENT_QUEUE_MANAGER_ADD_FILES,
	VUEX_ATTACHMENT_QUEUE_MANAGER_HASH_PUSH_FILE,
	VUEX_ATTACHMENT_QUEUE_MANAGER_HASH_POP_FILE,

	VUEX_ATTACHMENT_QUEUE_MANAGER_FILE_MOVE_TO_BUCKET,

	VUEX_ATTACHMENT_QUEUE_MANAGER_ENQUEUE_UPLOAD,
	VUEX_ATTACHMENT_QUEUE_MANAGER_ASSIGN_S3_KEY,
	VUEX_ATTACHMENT_QUEUE_MANAGER_UPLOAD_PROGRESS,
	VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT,
	VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS
} from '@/store/constants/attachments/attachment_queue_manager'
import {
	VUEX_UPLOAD_S3_REQUEST
} from '@/store/constants/attachments/attachment_upload'

// const AQM_HOLDING_BUCKET = 'filesHolding'
const AQM_QUEUED_BUCKET = 'filesQueued'
const AQM_UPLOADING_BUCKET = 'filesUploading'
const AQM_COMPLETED_BUCKET = 'filesCompleted'
const AQM_FAILED_BUCKET = 'filesFailed'

const state = {
	fileHash: {}, // The file objects go in the "hashmap", use pushFile and popFile
	// to auto-magically tag it with an id, and get that back for tracing
	// throughout the process.

	// These now, will just have IDs, as per some reading I was doing from
	// the Vue core team for maintaining reactivity, etc. using Vue.set
	//
	filesHolding: [], // Files added from upload but holding for user input | comment attachment usage
	filesQueued: [], // Files ready to be processed
	filesAttaching: [], // ONLY used for file that are being attached and NOT uploaded
	filesUploading: [], // Files that are being uploaded
	filesProcessing: [], // Files currently being processed; Signal from BE not implemented yet, v2.1
	filesCompleted: [], // Successfully uploaded files
	filesFailed: [] // File that failed upload
}

const getters = {
	getHoldingFiles (state) {
		return params => state.filesHolding.map(hashId => state.fileHash[hashId]).reduce(function (filtered, fileObject) {
			if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
				filtered.push(fileObject)
			}
			return filtered
		}, [])
	},

	getQueuedFiles (state) {
		return params => state.filesQueued.map(hashId => state.fileHash[hashId]).reduce(function (filtered, fileObject) {
			if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
				filtered.push(fileObject)
			}
			return filtered
		}, [])
	},

	getUploadingFiles (state) {
		return params => state.filesUploading.map(hashId => state.fileHash[hashId]).reduce(function (filtered, fileObject) {
			if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
				filtered.push(fileObject)
			}
			return filtered
		}, [])
	},

	getProcessingFiles (state) {
		return params => state.filesProcessing.map(hashId => state.fileHash[hashId]).reduce(function (filtered, fileObject) {
			if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
				filtered.push(fileObject)
			}
			return filtered
		}, [])
	},

	getCompletedFiles (state) {
		return params => state.filesCompleted.map(hashId => state.fileHash[hashId]).reduce(function (filtered, fileObject) {
			if (!params || isEqual(fileObject.attach_to, params.attach_to)) {
				filtered.push(fileObject)
			}
			return filtered
		}, [])
	}
}

const actions = {
	[VUEX_ATTACHMENT_QUEUE_MANAGER_ADD_FILES]: async ({ commit, dispatch }, payload) => {
		let fileObj

		for (var item in payload) {
			fileObj = payload[item]

			// Slugify filename here

			let hashId = hash(fileObj.file.name + (Math.floor(Math.random() * 100000) + 1))

			fileObj.hashId = hashId

			if (fileObj.hasOwnProperty('filemeta')) {
				fileObj.filemeta.hashId = hashId
			} else {
				fileObj.filemeta = { hashId: hashId }
			}

			fileObj.addedToQueue = Date.now()

			await commit(VUEX_ATTACHMENT_QUEUE_MANAGER_HASH_PUSH_FILE, {
				key: hashId,
				val: fileObj
			})

			await commit(VUEX_ATTACHMENT_QUEUE_MANAGER_FILE_MOVE_TO_BUCKET, {
				hashId: hashId,
				from: null,
				to: AQM_QUEUED_BUCKET
			})

			dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_ENQUEUE_UPLOAD)
		}
	},

	[VUEX_ATTACHMENT_QUEUE_MANAGER_ENQUEUE_UPLOAD]: async ({ rootState, state, dispatch, commit }) => {
		// Only process if there is work to do
		if (state.filesQueued.length > 0 && state.filesUploading.length < HADDIX_ATTACHMENTS_S3_QUEUE_SIZE) {
			// Get next id
			let hashId = state.filesQueued[0]

			// Move from queued to uploading
			await commit(VUEX_ATTACHMENT_QUEUE_MANAGER_FILE_MOVE_TO_BUCKET, {
				hashId: hashId,
				from: AQM_QUEUED_BUCKET,
				to: AQM_UPLOADING_BUCKET
			})

			// Create a file object first
			// We need to send a specific set of create props
			let fileObj = state.fileHash[hashId]

			commit(VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS, {
				hashId: hashId,
				status: HADDIX_UPLOAD_S3_UPLOAD_STATUS__STARTED
			})

			dispatch(VUEX_UPLOAD_S3_REQUEST, fileObj)

			// if (!rootState.ui.globalUploader.displayState) {
			// 	dispatch(VUEX_UI_SHOW_GLOBAL_UPLOADER)
			// }

			// We may still have room, call again
			if (state.filesQueued.length > 0 && state.filesUploading.length < HADDIX_ATTACHMENTS_S3_QUEUE_SIZE) {
				dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_ENQUEUE_UPLOAD)
			}
		}
	},

	[VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT]: async ({ state, dispatch, commit }, payload) => {
		// Save the deets to the object before continuing (status, URI, etc)
		await commit(VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT, payload)

		if (payload.status === HADDIX_UPLOAD_S3_UPLOAD_STATUS__SUCCESS) {
			// Move on to next bucket
			await commit(VUEX_ATTACHMENT_QUEUE_MANAGER_FILE_MOVE_TO_BUCKET, {
				hashId: payload.hashId,
				from: AQM_UPLOADING_BUCKET,
				to: AQM_COMPLETED_BUCKET
			})
		} else if (payload.status === HADDIX_UPLOAD_S3_UPLOAD_STATUS__FAILURE) {
			await commit(VUEX_ATTACHMENT_QUEUE_MANAGER_FILE_MOVE_TO_BUCKET, {
				hashId: payload.hashId,
				from: AQM_UPLOADING_BUCKET,
				to: AQM_FAILED_BUCKET
			})
		}

		// See if we have more uploading to do
		dispatch(VUEX_ATTACHMENT_QUEUE_MANAGER_ENQUEUE_UPLOAD)
	},

	[VUEX_ATTACHMENT_QUEUE_MANAGER_ASSIGN_S3_KEY]: async ({ commit }, payload) => {
		commit(VUEX_ATTACHMENT_QUEUE_MANAGER_ASSIGN_S3_KEY, payload)
	}
}

const mutations = {
	// expects { key: hashId, val: fileObject }
	[VUEX_ATTACHMENT_QUEUE_MANAGER_HASH_PUSH_FILE]: (state, payload) => {
		state.fileHash[payload.key] = payload.val
	},

	// expects { key: hashId }
	[VUEX_ATTACHMENT_QUEUE_MANAGER_HASH_POP_FILE]: (state, payload) => {
		delete state.fileHash[payload.key]
	},

	// This little gem is what moves our hashIds from one bucket to the next
	[VUEX_ATTACHMENT_QUEUE_MANAGER_FILE_MOVE_TO_BUCKET]: (state, payload) => {
		// Remove it from preceding bucket
		if (payload.from) {
			let index = state[payload.from].indexOf(payload.hashId)
			// eslint-disable-next-line no-unused-vars
			let removed = (index > -1) ? state[payload.from].splice(index, 1) : null
		}

		// Add it to next bucket
		state[payload.to].unshift(payload.hashId)
	},

	// Assign the S3 key to the file object
	[VUEX_ATTACHMENT_QUEUE_MANAGER_ASSIGN_S3_KEY]: (state, payload) => {
		state.fileHash[payload.hashId].key = payload.key
	},

	// Set the upload progress on a file object
	[VUEX_ATTACHMENT_QUEUE_MANAGER_UPLOAD_PROGRESS]: (state, payload) => {
		Object.keys(state.fileHash).forEach((hashId) => {
			if (state.fileHash[hashId].key === payload.key) {
				state.fileHash[hashId].progress = {
					loaded: payload.loaded,
					total: payload.total
				}
			}
		})
	},

	// Once the S3 upload is complete, we store the result
	[VUEX_ATTACHMENT_QUEUE_MANAGER_HANDLE_UPLOAD_RESULT]: (state, payload) => {
		state.fileHash[payload.hashId].upload_status = payload.status
		state.fileHash[payload.hashId].uri = payload.uri ? payload.uri : null
	},

	[VUEX_ATTACHMENT_QUEUE_MANAGER_CHANGE_STATUS]: (state, payload) => {
		state.fileHash[payload.hashId].status = payload.status
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
 */