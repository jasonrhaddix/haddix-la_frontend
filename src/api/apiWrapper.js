import api from '@/api'
import stores from '@/stores'
// import TokenService from '@/auth/TokenService'

// Core wrapped request
export async function apiRequest(config) {
  const userStore = stores.userStore()
  const toastStore = stores.ui.toastStore()

  try {
    const response = await api(config)
    return response
  } catch (error) {
    if (error.isAuthError) return null

    const message = error.response?.data?.message || 'An unexpected error occurred'
    const status = error.response?.status

    if (status !== 401 && status !== 403) {
      toastStore.addToast({
        component: '_global/Toast/Toast_Message.vue',
        data: {
          type: 'error',
          title: 'Error',
          message
        }
      })
    }

    throw error
  }
}

// 🔹 Short-hand helpers
export const apiGet = (url, config = {}) => {
  return apiRequest({ method: 'get', url, ...config })
}

export const apiPost = (url, data = {}, config = {}) => {
  return apiRequest({ method: 'post', url, data, ...config })
}

export const apiPut = (url, data = {}, config = {}) => {
  return apiRequest({ method: 'put', url, data, ...config })
}

export const apiPatch = (url, data = {}, config = {}) => {
  return apiRequest({ method: 'patch', url, data, ...config })
}

export const apiDelete = (url, config = {}) => {
  return apiRequest({ method: 'delete', url, ...config })
}