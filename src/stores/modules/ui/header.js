import { defineStore } from 'pinia'

const useHeaderStore = defineStore('header', {
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

export default useHeaderStore
