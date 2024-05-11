import api from '@/api/index.js'
import stores from '@/stores/index.js'
import TokenService from '../auth/TokenService.js'

export default (function () {
  // request interceptor
  api.interceptors.request.use(
    (config) => {
      const accessToken = TokenService.getLocalAccessToken()

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // response interceptor
  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config

      if (originalConfig.url !== '/auth/login' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            const res = await api.post(
              `/auth/tokenrefresh`,
              {},
              { withCredentials: true }
            )

            // get access token and save to store
            const { accessToken } = res.data
            stores.userStore().updateAccessTokenInState(accessToken)
            TokenService.updateLocalAccessToken(accessToken)

            return api(originalConfig)
          } catch (_error) {
            console.log(_error)
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
})
