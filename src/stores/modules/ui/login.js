import { defineStore } from 'pinia'

export default defineStore('login', {
  state: () => ({
    openState: false
  }),

  actions: {
    showLogin() {
      this.openState = true
    },

    hideLogin() {
      this.openState = false
    },

    setState(state) {
      this.openState = state
    }
  }
})
