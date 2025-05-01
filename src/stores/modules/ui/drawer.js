import { defineStore } from 'pinia'

export default defineStore('drawer', {
  state: () => ({
    openState: false,
    component: null,
    width: null,
    props: null
  }),

  getters: {},

  actions: {
    showDrawer(payload) {
      if (payload.component) this.component = payload.component
      if (payload.width) this.width = payload.width
      if( payload.props) this.props = payload.props
      
      this.openState = true
    },

    hideDrawer() {
      this.openState = false
    }
  }
})
