import { defineStore } from 'pinia'

// import api from '@/api/index.js'
import s3 from '@/api/aws.js'

import stores from '@/stores'

export default defineStore('s3Upload', {
	state: () => ({}),

	getters: {},

	actions: {
		s3UlopadRequest(payload) {
			const uploadManagerStore = stores.s3.uploadManagerStore()
			// let destinationFileKey = `files/${payload.projectId}/${payload.fileId}_${payload.filename}`
			let destinationFileKey = `files/${payload.attachTo.modelId}/${payload.fileId}_${payload.filename}`

			uploadManagerStore.assignS3Key({
				hashId: payload.hashId,
				key: destinationFileKey
			})

			const handleS3UploadProgress = function (evt) {
				uploadManagerStore.uploadProgress(evt)
			}

			var params = {
				Key: destinationFileKey,
				Body: payload.file
				// ACL: 'public-read' // causes an upload error
			}
	
			var options = {
				partSize: 5 * 1024 * 1024,
				queueSize: 4
			}

			s3.upload(params, options, async (error, data) => {
				if (error) {
					// S3 UPLOAD - FAILURE
					await this.requestFailure({
						hashId: payload.hashId,
						data: data
					})
				} else {
					// S3 UPLOAD - SUCCESS
					await this.requestSuccess({
						hashId: payload.hashId,
						data: data
					})

					// ATTACHMENT REQUEST
					/* this.attachmentRequest({
						hashId: payload.hashId,
						attachmentId: payload.fileId,
						modelId: payload.attachTo.modelId,
						model: payload.attachTo.model,
						name: payload.filename,
						filename: payload.filename,
						usageType: payload.usageType,
						mimetype: payload.file.type,
						size: payload.file.size,
						uri: payload.uri
					}) */
				}
			}).on('httpUploadProgress', handleS3UploadProgress)
		},

		requestSuccess(payload) {
			const typesStore = stores.config.typesStore()
			const uploadManagerStore = stores.s3.uploadManagerStore()

			uploadManagerStore.changeStatus({
				hashId: payload.hashId,
				status: typesStore.REQUEST_STATUS__SUCCESS
			})

			uploadManagerStore.handleResult({
				hashId: payload.hashId,
				uri: payload.data.Location,
				status: typesStore.REQUEST_STATUS__SUCCESS
			})
		},
		
		requestFailure(payload) {
			const typesStore = stores.config.typesStore()
			const uploadManagerStore = stores.s3.uploadManagerStore()

			uploadManagerStore.changeStatus({
				hashId: payload.hashId,
				status: typesStore.REQUEST_STATUS__FAILURE
			})

			uploadManagerStore.handleResult({
				hashId: payload.hashId,
				status: typesStore.REQUEST_STATUS__FAILURE
			})
		}

		/* attachmentRequest(payload) {
			const userStore = stores.userStore()
			const typesStore = stores.config.typesStore()
			const uploadManagerStore = stores.s3.uploadManagerStore()
			
			uploadManagerStore.changeStatus({
				hashId: payload.hashId,
				status: typesStore.REQUEST_STATUS__PENDING
			})

			const data = {
				...payload,
				session_id: userStore.accessToken
			}

			api.post(`/attachments`, data).then(response => {
				uploadManagerStore.changeStatus({
					hashId: payload.hashId,
					status: typesStore.REQUEST_STATUS__SUCCESS
				})
			}).catch(() => {
				uploadManagerStore.changeStatus({
					hashId: payload.hashId,
					status: typesStore.REQUEST_STATUS__FAILURE
				})
	
				// SHOW ERROR NOTIFICATION
				// component: {
				// 	path: 'Notifications',
				// 	file: 'Notification_Message'
				// },
				// data: {
				// 	type: 'error',
				// 	message: 'Attachment Upload Failed'
				// }
			})
		} */
	}
})