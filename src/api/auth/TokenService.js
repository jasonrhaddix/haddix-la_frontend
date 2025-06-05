import stores from '@/stores/index.js'

class TokenService {
  getLocalAccessToken() {
    const localStorage = stores.localStorageStore()
    const accessToken = localStorage.get('access_token')
    return accessToken
  }

  updateLocalAccessToken(access_token) {
    const localStorage = stores.localStorageStore()
    localStorage.set({ access_token })
  }

  clearLocalAccessToken() {
    const localStorage = stores.localStorageStore()
    localStorage.clear('refresh_token')
  }
}

export default new TokenService()
