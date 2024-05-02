import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
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

export default useLoginStore
