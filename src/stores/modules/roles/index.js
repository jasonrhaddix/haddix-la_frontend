import { defineStore } from 'pinia'

import api from '@/api/index.js'

export default defineStore('roles', {
  state: () => ({
    roles: [],
    role: {},

    loading: false,
    saving: false
  }),

  getters: {
    hasRoles() {
      return this.roles.length
    },

    projectsLoading() {
      return this.loading
    }
  },

  actions: {
    async fetchRoles() {
      try {
        const res = await api.get(`/roles`)
        this.roles = res.data
      } catch (err) {
        console.error(err)
      }
    },

    fetchSingleRole() {
      //
    },

    createRole(payload) {
      console.log(payload)
    }
  }
})
