import { defineStore } from 'pinia'
import { uuid } from 'vue-uuid'

import api from '@/api'
import TokenService from '@/api/auth/TokenService.js'

import stores from '@/stores/index.js'

export default defineStore('user', {
  // STATE
  state: () => ({
    accessToken: null,
    sessionToken: null, // used for guest project creation, not for auth
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
      const routingStore = stores.routingStore()

      this.isAuthorizing = true

      try {
        await api.post( `/auth/logout`, {}, { withCredentials: true })

        this.accessToken = null
        TokenService.clearLocalAccessToken()
        routingStore.pushRoute({ name: 'home' })
      } catch (err) {
        console.log(err)
        // throw err message to user
      }

      this.isAuthorizing = false
    },

    updateAccessTokenInState(accessToken) {
      if (!accessToken) return

      this.accessToken = accessToken
      TokenService.updateLocalAccessToken(accessToken)
    },

    createSessionToken() {
      this.sessionToken = uuid.v4()
    }
  }
})
