import { defineStore } from 'pinia'

const useRolesStore = defineStore('roles', {
  state: () => ({
    roles: [],
    role: {},

    loading: false,
    saving: false
  }),

  getters: {
    hasRoles() {
      return this.projects.length
    },

    projectsLoading() {
      return this.loading
    }
  },

  actions: {
    fetchRoles() {
      // 
    },

    fetchSingleRole() {
      // 
    },

    createRole() {
      // 
    }
  }
})

export default useRolesStore
