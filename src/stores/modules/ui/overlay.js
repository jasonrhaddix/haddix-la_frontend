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
      if (payload.component) this.component = payload.component
      if (payload.title) this.title = payload.title
      if (payload.props) this.props = payload.props
    }
  }
})
