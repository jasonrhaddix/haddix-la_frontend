import { defineStore } from 'pinia'

export default defineStore('dialog', {
  state: () => ({
    openState: false,
    component: null,
    width: null,
    props: null
  }),

  getters: {},

  actions: {
    showDialog(payload) {
      if (payload.component) this.component = payload.component
      if (payload.width) this.width = payload.width
      this.openState = true
    },

    hideDialog() {
      this.openState = false
    }
  }
})
