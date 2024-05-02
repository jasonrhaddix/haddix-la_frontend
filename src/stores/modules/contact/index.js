import { defineStore } from 'pinia'

const useContactStore = defineStore('contact', {
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

export default useContactStore
