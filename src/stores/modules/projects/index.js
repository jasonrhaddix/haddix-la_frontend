import { defineStore } from 'pinia'

const useProjectsStore = defineStore('projects', {
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

export default useProjectsStore
