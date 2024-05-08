import store from '@/stores/index.js'

class TokenService {
  getLocalAccessToken() {
    const localStorage = store.config.localStore()
    const accessToken = localStorage.get('access_token')
    return accessToken
  }

  updateLocalAccessToken(access_token) {
    const localStorage = store.config.localStore()
    localStorage.set({ access_token })
  }

  clearLocalAccessToken() {
    const localStorage = store.config.localStore()
    localStorate.clear('refresh_token')
  }
}

export default new TokenService()
