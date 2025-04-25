import { defineStore } from 'pinia'
import hash from 'object-hash'
import _pick from 'lodash.pick'
import _isEqual from 'lodash.isequal'

import stores from '@/stores'

export default defineStore('uploadManage', {
	state: () => ({
		fileHash: {},

		filesHolding: [], // files added from upload but holding for user input | comment attachment usage
		filesQueued: [], // files ready to be processed
		filesAttaching: [], // ONLY used for files that are being attached and NOT uploaded
		filesUploading: [], // files that are being uploaded
		filesProcessing: [], // files currently being processed; Signal from BE not implemented yet, v2.1
		filesCompleted: [], // successfully uploaded files
		filesFailed: [] // file that failed upload
	}),

	getters: {
		getHoldingFiles () {
			return params => this.filesHolding
				.map(hashId => this.fileHash[hashId])
				.reduce((filtered, fileObject) => {
					if (!fileObject) return filtered
					if (!params || _isEqual(fileObject.attachTo, params.attachTo)) {
						filtered.push(fileObject)
					}
					return filtered
				}, [])
		},
		
		getQueuedFiles () {
			return params => this.filesQueued
				.map(hashId => this.fileHash[hashId])
				.reduce((filtered, fileObject) => {
					if (!fileObject) return filtered
					if (!params || _isEqual(fileObject.attachTo, params.attachTo)) {
						filtered.push(fileObject)
					}
					return filtered
				}, [])
		},
		
		getUploadingFiles () {
			return params => this.filesUploading
				.map(hashId => this.fileHash[hashId])
				.reduce((filtered, fileObject) => {
					if (!fileObject) return filtered
					if (!params || _isEqual(fileObject.attachTo, params.attachTo)) {
						filtered.push(fileObject)
					}
					return filtered
				}, [])
		},
		
		getProcessingFiles () {
			return params => this.filesProcessing
				.map(hashId => this.fileHash[hashId])
				.reduce((filtered, fileObject) => {
					if (!fileObject) return filtered
					if (!params || _isEqual(fileObject.attachTo, params.attachTo)) {
						filtered.push(fileObject)
					}
					return filtered
				}, [])
		},
	
		getCompletedFiles () {
			return params => this.filesCompleted
				.map(hashId => this.fileHash[hashId])
				.reduce((filtered, fileObject) => {
					if (!fileObject) return filtered // skip undefined entries
					if (!params || _isEqual(fileObject.attachTo, params.attachTo)) {
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

				// We may still have room, call again
				if (this.filesQueued.length > 0 && this.filesUploading.length < typesStore.S3__QUEUE_SIZE) {
					this.enqueueUpload()
				}
			}
		},

		handleResult(payload) {
			const typesStore = stores.config.typesStore()

			// Save the deets to the object before continuing (status, URI, etc)
			this.fileHash[payload.hashId].uploadStatus = payload.status
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
		},

		removeFile(payload) {
			delete this.fileHash[payload]
		},

		reset() {
			this.fileHash = {}
		
			this.filesHolding = []
			this.filesQueued = []
			this.filesAttaching = []
			this.filesUploading = []
			this.filesProcessing = []
			this.filesCompleted = []
			this.filesFailed = []
		}
	}
})