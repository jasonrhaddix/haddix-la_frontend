import { defineStore } from 'pinia'

import api from '@/api'
import stores from '@/stores'

export default defineStore('contact', {
  state: () => ({
    saving: false
  }),

  getters: {},

  actions: {
    async sendEmail(payload) {
      this.saving = true
      
      try {
        const res = await api.post(`/contact/send`, payload)
        this.saving = false

        return res
      } catch (err) {
        console.error(err)
      }

      this.saving = false
    }
  }
})
