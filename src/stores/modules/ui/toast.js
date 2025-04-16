import { defineStore } from 'pinia'

import stores from '@/stores/'

export default defineStore('toast', {
  state: () => ({
    currentToasts: []
  }),

  actions: {
    addToast(payload) {
      const typesStore = stores.config.typesStore()

      const toast = {
        ...payload,
        id: Date.now(),
        open: true
      }

      this.currentToasts.push(toast)

      if (!toast.persist) {
        setTimeout(() => {
          this.clearToast(toast.id)
        }, toast.timeout || typesStore.UI__TOAST__DELAY__DEFAULT)
      }
    },

    clearAllToasts() {
      this.currentToasts = []
    },

    clearAllPersistentToasts() {
      this.currentToasts = this.currentToasts.filter(t => !t.persist)
    },

    clearToast(id) {
      this.currentToasts = this.currentToasts.filter(t => t.id !== id)
    }
  }
})