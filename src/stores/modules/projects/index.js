import { defineStore } from 'pinia'

import { apiPatch } from '@/api/apiWrapper'
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

        return this.projects
      } catch (err) {
        console.error(err)
      }
    },

    async fetchProjectById(id) {
      const headerStore = stores.ui.headerStore()
      
      try {
        const res = await api.get(`/projects/${id}`)

        const project = Project.projectDetails(res.data)
        this.project = project

        headerStore.setTitle(this.project.title)

        return project
      } catch (err) {
        console.error(err)
      }
    },

    async createProject(payload) {
      const userStore = stores.userStore()
      
      this.saving = true
      
      try {
        const res = await api.post(`/projects`, {
          ...payload,
          sessionId: userStore.sessionToken
        })

        const project = Project.projectDetails(res.data)
        this.projects.unshift(project)
        
        return project
      } catch (err) {
        throw err
      } finally {
        this.saving = false
      }
    },

    // async updateProject(id, payload) {
    //   this.saving = true
      
    //   try {
    //     const res = await api.patch(`/projects/${id}`, payload)
    //     const project = Project.projectDetails(res.data)
        
    //     // this.project = project <<-- this line is not needed as we are updating the project in the list
    //     this.projects.splice(this.projects.findIndex(p => p._id === id), 1, project)

    //     return project
    //   } catch (err) {
    //     throw error
    //   } finally {
    //     this.saving = false
    //   }

    // },

    async updateProject(id, payload) {
      this.saving = true
    
      try {
        const res = await apiPatch(`/projects/${id}`, payload)
        const project = Project.projectDetails(res.data)
    
        this.projects.splice(this.projects.findIndex(p => p._id === id), 1, project)
    
        return project
      } catch (error) {
        throw error
      } finally {
        this.saving = false
      }
    },

    async deleteProject(id) {
      this.saving = true
      
      try {
        const res = await api.delete(`/projects/${id}`)
        this.projects.splice(this.projects.findIndex(p => p._id === id), 1)

        return res.data
      } catch (err) {
        throw error
      } finally {
        this.saving = false
      }
    }
  }
})
