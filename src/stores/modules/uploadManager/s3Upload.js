import { defineStore } from 'pinia'
import api from '@/api/index' // <- Axios instance you probably already have
import axios from 'axios'

import stores from '@/stores'

export default defineStore('s3Upload', {
  state: () => ({}),

  getters: {},

  actions: {
    async s3UploadRequest(payload) {
			const uploadManagerStore = stores.s3.uploadManagerStore()
      
      let destinationFileKey = `files/${payload.attachTo.modelId}/${payload.fileId}_${payload.filename}`

      uploadManagerStore.assignS3Key({
        hashId: payload.hashId,
        key: destinationFileKey
      })

      try {
        // 1. Get a presigned POST from backend
        const { data: presignRes } = await api.post('/aws/s3/upload/presigned-url', {
					key: destinationFileKey
        })

				const presignedUrl = presignRes.data.presignedUrl

        // 2. Upload to S3
				 const uploadRes = await axios.put(presignedUrl, payload.file, {
          headers: {
            'Content-Type': payload.file.type || 'application/octet-stream'
          },
          onUploadProgress: (progressEvent) => {
            uploadManagerStore.uploadProgress({ ...progressEvent, hashId: payload.hashId })
          }
        })

        // 3. Success!
        await this.requestSuccess({
          hashId: payload.hashId,
					data: presignRes.data
        })

      } catch (error) {
				// Handle error | TOAST component
        await this.requestFailure({
          hashId: payload.hashId,
          data: {}
        })
      }
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
        uri: payload.data.uri,
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
  }
})


/* import { defineStore } from 'pinia'

// import api from '@/api/index.js'
import s3 from '@/api/aws.js'

import stores from '@/stores'

export default defineStore('s3Upload', {
	state: () => ({}),

	getters: {},

	actions: {
		s3UploadRequest(payload) {
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
	}
}) */