import { defineStore } from 'pinia'

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

  actions: {}
})
