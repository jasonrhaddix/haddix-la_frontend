import storage from 'store'
import { defineStore } from 'pinia'

export default defineStore('localStorage', {
  // STATE
  state: () => ({
    storageName: 'haddix_la'
  }),

  // GETTERS
  getters: {},

  // ACTIONS
  actions: {
    init() {
      if (!window.localStorage.hasOwnProperty(this.storageName))
        storage.set(this.storageName, {})
    },

    get(prop) {
      return storage.get(this.storageName)?.[prop] || null
    },

    set(data) {
      storage.set(this.storageName, data)
    },

    clear(prop) {
      storage.remove(this.storageName, prop)
    },

    clearAll() {
      storage.clearAll() // need storage name?
    }
  }
})
