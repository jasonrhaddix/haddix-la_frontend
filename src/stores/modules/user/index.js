import { defineStore } from 'pinia'

import api from '@/api'
import TokenService from '@/api/auth/TokenService.js'

import store from '@/stores/index.js'

export default defineStore('user', {
  // STATE
  state: () => ({
    localStorage: store.config.localStore(),

    accessToken: null,
    isAuthorizing: false
  }),

  // GETTERS
  getters: {
    userIsAuthenticated() {
      return !!this.accessToken
    }
  },

  // ACTIONS
  actions: {
    async rehydrateUserFromToken() {
      try {
        const res = await api.post(`/auth/tokenrefresh`, {}, { withCredentials: true })
        this.updateAccessTokenInState(res.data?.accessToken)
      } catch (err) {
        console.log('cannot rehydrate from token')
      }
    },

    // user login
    async login(credentials) {
      this.isAuthorizing = true

      try {
        const res = await api.post(`/auth/login`, credentials, { withCredentials: true })
        this.updateAccessTokenInState(res.data?.accessToken)
      } catch (err) {
        // throw err message to user
        console.log(err)
      }

      this.isAuthorizing = false
    },

    // user logout
    async logout() {
      this.isAuthorizing = true

      try {
        await api.post(
          `/auth/logout`,
          {},
          {
            withCredentials: true
          }
        )

        this.accessToken = null
        TokenService.clearLocalAccessToken()
      } catch (err) {
        // throw err message to user
      }

      this.isAuthorizing = false
    },

    updateAccessTokenInState(accessToken) {
      if (!accessToken) return

      this.accessToken = accessToken
      TokenService.updateLocalAccessToken(accessToken)
    }
  }
})
