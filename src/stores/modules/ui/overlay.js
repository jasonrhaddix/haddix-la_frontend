import { defineStore } from 'pinia'

const useOverlayStore = defineStore('overlay', {
  state: () => ({
    openState: false,
    component: null,
    title: '',
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
      if (payload.component)this.component = payload.component
		  if (payload.title) this.title = payload.title
    }
  }
})

export default useOverlayStore
