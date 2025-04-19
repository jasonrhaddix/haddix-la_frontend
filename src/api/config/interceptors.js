import api from '@/api/index.js'
import stores from '@/stores/index.js'
import TokenService from '../auth/TokenService.js'

export default (function () {
  // Request interceptor to add Authorization header
  api.interceptors.request.use(
    (config) => {
      const accessToken = TokenService.getLocalAccessToken()
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor to handle token expiration
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config
      const skipAuthRoutes = ['/auth/login', '/auth/tokenrefresh']

      if (
        error?.response?.status === 401 &&
        originalConfig?.url &&
        !originalConfig._retry &&
        !skipAuthRoutes.includes(originalConfig.url)
      ) {
        originalConfig._retry = true

        try {
          const res = await api.post('/auth/tokenrefresh', {}, { withCredentials: true })
          const { accessToken } = res.data

          stores.userStore().updateAccessTokenInState(accessToken)
          TokenService.updateLocalAccessToken(accessToken)
          originalConfig.headers['Authorization'] = `Bearer ${accessToken}`

          return api(originalConfig)
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)

          if (refreshError.response && [401, 403].includes(refreshError.response.status)) {
            const userStore = stores.userStore()
            userStore.logout()
          }

          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )
})()

/* import api from '@/api/index.js'
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
            console.error(_error)
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
})
 */