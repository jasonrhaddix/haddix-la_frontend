import { defineStore } from 'pinia'

import api from '@/api'

const useAuthStore = defineStore('auth', {
  // STATE
  state: () => ({
    appToken: null,

    authData: null,
    isAuthorizing: false
  }),

  // GETTERS
  getters: {
    appAuthenticated () {
      return this.authData
    }
  },

  // ACTIONS
  actions: {
    // user login
    async login (credentials) {
      this.isAuthorizing = true
      
      try {
        const res = await api.post(`/auth/login`, credentials)
        this.authData = res
      } catch (err) {
        console.log(err)
        // throw err message to user
      }

      this.isAuthorizing = false
    },

    // user logout
    async logout () {
      this.isAuthorizing = true
      
      try {
        await api.post(`/auth/logout`)
        this.authData = null
      } catch (err) {
        // throw err message to user
      }

      this.isAuthorizing = false
    }
  }
})

export default useAuthStore
