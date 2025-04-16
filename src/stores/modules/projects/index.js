import { defineStore } from 'pinia'

import api from '@/api'
import stores from '@/stores'

import { Project } from '@/models'

export default defineStore('projects', {
  state: () => ({
    projects: [],
    project: {},

    loading: false,
    saving: false
  }),

  getters: {
    /* sortedProjects: (state) => (sortedProp, direction) => {
      return _sort(state.projects, [sortedProp], direction)
    }, */

    hasProjects:(state) => state.projects.length,
    
    projectsLoading:(state) => state.loading,

    attachmentsByUsageType: (state) => (type = null, obj = null, id = null) => {
      if (!type || !obj || !id) return []
  
      let attachments = (obj === 'projects')
        ? state.projects.find(p => p.projectId === id)?.attachments
        : state.project.attachments
  
      if (!attachments || !attachments?.length) return []
      return attachments.filter(item => item.usageType === type)
    }
  },

  actions: {
    async fetchProjects() {
      try {
        const res = await api.get(`/projects`)
        this.projects = res.data.map((item) => Project.projectBase(item))
      } catch (err) {
        console.error(err)
      }
    },

    async fetchProjectById(id) {
      const headerStore = stores.ui.headerStore()
      
      try {
        const res = await api.get(`/projects/${id}`)
        this.project = Project.projectDetails(res.data)

        headerStore.setTitle(this.project.title)

        return res.data
      } catch (err) {
        console.error(err)
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

        this.projects.unshift(Project.projectDetails(res.data))
        return res
        
        //show success
      } catch (err) {
        // throw error
      }

      this.saving = false
    },

    async updateProject(id, payload) {
      const overlayStore = stores.ui.overlayStore()
      
      this.saving = true
      
      try {
        const res = await api.patch(`/projects/${id}`, payload)
        this.project = Project.projectDetails(res.data)

        this.projects.splice(this.projects.findIndex(p => p._id === id), 1, Project.projectDetails(res.data))

        return res

        //show success
      } catch (err) {
        // throw error
      } finally {
        this.saving = false
      }

    },

    async deleteProject(id) {
      this.saving = true
      
      try {
        await api.delete(`/projects/${id}`)
        this.projects.splice(this.projects.findIndex(p => p._id === id), 1)

        //show success
      } catch (err) {
        // throw error
      } finally {
        this.saving = false
      }
    }
  }
})
