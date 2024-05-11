import stores from '@/stores/index.js'

class TokenService {
  getLocalAccessToken() {
    const localStorage = stores.config.localStore()
    const accessToken = localStorage.get('access_token')
    return accessToken
  }

  updateLocalAccessToken(access_token) {
    const localStorage = stores.config.localStore()
    localStorage.set({ access_token })
  }

  clearLocalAccessToken() {
    const localStorage = stores.config.localStore()
    localStorage.clear('refresh_token')
  }
}

export default new TokenService()
