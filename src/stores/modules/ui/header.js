import { defineStore } from 'pinia'

export default defineStore('header', {
  state: () => ({
    openState: false,
    title: null
  }),

  actions: {
    showHeader() {
      this.openState = true
    },

    hideHeader() {
      this.openState = false
    },

    setTitle(title) {
      this.title = title
    },

    removeTitle() {
      this.title = null
    }
  }
})
