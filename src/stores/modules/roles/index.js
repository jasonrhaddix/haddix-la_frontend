import { defineStore } from 'pinia'

import api from '@/api'
import stores from '@/stores'

import { Role } from '@/models'

export default defineStore('role', {
  state: () => ({
    roles: [],
    role: {},

    loading: false,
    saving: false
  }),

  getters: {
    hasRoles:(state) => state.roles.length,
    
    rolesLoading:(state) => state.loading,

    attachmentsByUsageType: (state) => (type = null, obj = null, id = null) => {
      if (!type || !obj || !id) return []
  
      let attachments = (obj === 'roles')
        ? state.roles.find(p => p.roleId === id)?.attachments
        : state.role.attachments
  
      if (!attachments || !attachments?.length) return []
      return attachments.filter(item => item.usageType === type)
    }
  },

  actions: {
    async fetchRoles() {
      try {
        const res = await api.get(`/roles`)
        this.roles = res.data.map((item) => Role.roleBase(item))

        return this.roles
      } catch (error) {
        throw error
      }
    },

    async fetchRoleById(id) {
      const headerStore = stores.ui.headerStore()
      const toastStore = stores.ui.toastStore()
      const routesStore = stores.routingStore()
      
      try {
        const res = await api.get(`/roles/${id}`)
        this.role = Role.roleDetails(res.data)

        headerStore.setTitle(`${this.role.role} <span style="text-transform: lowercase">at</span> ${this.role.company}`)

        return this.role
      } catch (error) {
        routesStore.pushRoute({ name: 'home' })
        toastStore.addToast({
          component: '_global/Toast/Toast_Message.vue',
          data: {
            type: 'error',
            title: 'Error',
            message: error.response?.data?.message
          }
        })

        throw error
      }
    },

    async createRole(payload) {
      const userStore = stores.userStore()
      
      this.saving = true
      
      try {
        const res = await api.post(`/roles`, payload)

        const role = Role.roleDetails(res.data)
        this.roles.unshift(role)

        return role
      } catch (error) {
        throw error
      } finally {
        this.saving = false
      }
    },

    async updateRole(id, payload) {
      this.saving = true
      
      try {
        const res = await api.patch(`/roles/${id}`, payload)
        this.role = Role.roleDetails(res.data)

        this.roles.splice(this.roles.findIndex(p => p._id === id), 1, Role.roleDetails(res.data))

        return this.role
      } catch (error) {
        throw error
      } finally {
        this.saving = false
      }

    },

    async deleteRole(id) {
      this.saving = true
      
      try {
        const res = await api.delete(`/roles/${id}`)
        this.roles.splice(this.roles.findIndex(p => p._id === id), 1)
        
        return res.data
      } catch (error) {
        throw error
      } finally {
        this.saving = false
      }
    }
  }
})
