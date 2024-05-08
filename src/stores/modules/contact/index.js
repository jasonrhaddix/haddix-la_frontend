import { defineStore } from 'pinia'

export default defineStore('contact', {
  state: () => ({
    roles: [],
    role: {},

    loading: false,
    saving: false
  }),

  getters: {},

  actions: {
    sendEmail() {
      //
    }
  }
})
