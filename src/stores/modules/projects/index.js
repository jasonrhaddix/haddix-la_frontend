import { defineStore } from 'pinia'

import api from '@/api/index.js'

export default defineStore('projects', {
  state: () => ({
    projects: [],

    loading: false,
    saving: false
  }),

  getters: {
    hasProjects() {
      return this.projects.length
    },

    projectsLoading() {
      return this.loading
    }
  },

  actions: {
    async fetchProjects() {
      try {
        const res = await api.get(`/projects`)
        this.roles = res.data
      } catch (err) {
        console.log(err)
      }
    }
  }
})
