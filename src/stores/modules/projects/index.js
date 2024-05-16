import { defineStore } from 'pinia'

import api from '@/api'
import stores from '@/stores'

export default defineStore('projects', {
  state: () => ({
    projects: [],

    loading: false,
    saving: false
  }),

  getters: {
    sortedProjects: (state) => (sortedProp, direction) => {
      return _sort(state.projects, [sortedProp], direction)
    },

    hasProjects:(state) => state.projects.length,
    
    projectsLoading:(state) => state.loading,

    attachmentsByUsageType: (state) => (type = null, obj = null, id = null) => {
      console.log(state.projects)
      if (!type || !obj) return []
  
      let attachments = (obj === 'projects')
        ? state.projects.find(p => p.projectId === id).attachments
        : state.project.attachments
  
      if (!attachments || attachments.length === 0) return []
      return attachments.filter(item => item.usage_type === type)
    }
  },

  actions: {
    async fetchProjects() {
      try {
        const res = await api.get(`/projects`)
        this.projects = res.data
      } catch (err) {
        console.log(err)
      }
    },

    async createProject(payload) {
      const userStore = stores.userStore()
      const overlayStore = stores.ui.overlayStore()
      
      this.saving = true
      
      try {
        const res = await api.post(`/projects`, {
          ...payload,
          sessionId: userStore.sessionToken
        })

        this.projects.push(res.data)

        overlayStore.hideOverlay()
        //show success
      } catch (err) {
        // throw error
      }

      this.saving = true
    }
  }
})
