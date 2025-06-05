import { defineStore } from 'pinia'
import storage from 'store'
import _get from 'lodash.get'
import _set from 'lodash.set'
import _unset from 'lodash.unset'
import _isEqual from 'lodash.isequal'

export default defineStore('localStorageStore', {
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
      return !prop ? storage.get(this.storageName) : storage.get(this.storageName)?.[prop] || null
    },

    set(data) {
      const storageState = this.get()
      storage.set(this.storageName, Object.assign(storageState, data))
    },

    clear(prop) {
      storage.remove(this.storageName, prop)
    },

    clearAll() {
      storage.clearAll() // need storage name?
    }
  }
})
