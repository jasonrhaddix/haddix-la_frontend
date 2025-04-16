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
      } catch (err) {
        console.error(err)
      }
    },

    async fetchRoleById(id) {
      const headerStore = stores.ui.headerStore()
      
      try {
        const res = await api.get(`/roles/${id}`)
        this.role = Role.roleDetails(res.data)

        headerStore.setTitle(this.role.title)

        return res.data
      } catch (err) {
        console.error(err)
      }
    },

    async createRole(payload) {
      const userStore = stores.userStore()
      
      this.saving = true
      
      try {
        const res = await api.post(`/roles`, {
          ...payload,
          sessionId: userStore.sessionToken
        })

        this.role.unshift(Role.roleDetails(res.data))
        return res
        
        //show success
      } catch (err) {
        // throw error
      }

      this.saving = false
    },

    async updateRole(id, payload) {
      const overlayStore = stores.ui.overlayStore()
      
      this.saving = true
      
      try {
        const res = await api.patch(`/roles/${id}`, payload)
        this.role = Role.roleDetails(res.data)

        this.roles.splice(this.roles.findIndex(p => p._id === id), 1, Role.roleDetails(res.data))

        return res

        //show success
      } catch (err) {
        // throw error
      } finally {
        this.saving = false
      }

    },

    async deleteRole(id) {
      this.saving = true
      
      try {
        await api.delete(`/roles/${id}`)
        this.roles.splice(this.roles.findIndex(p => p._id === id), 1)

        //show success
      } catch (err) {
        // throw error
      } finally {
        this.saving = false
      }
    }
  }
})
