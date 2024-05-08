import { defineStore } from 'pinia'

export default defineStore('header', {
  state: () => ({
    openState: false
  }),

  actions: {
    showHeader() {
      this.openState = true
    },

    hideHeader() {
      this.openState = false
    }
  }
})
