import { defineStore } from 'pinia'

export default defineStore('overlay', {
  state: () => ({
    openState: false,
    component: null,
    title: '',
    props: {}
  }),

  actions: {
    showOverlay() {
      this.openState = true
    },

    hideOverlay() {
      this.openState = false
    },

    setState(state) {
      this.openState = state
    },

    setComponent(payload) {
      this.component = payload?.component || null
      this.title = payload?.title || ''
      this.props = payload?.props || {}
    }
  }
})
