import i18next from "i18next"
import { defineStore } from 'pinia'

import stores from '@/stores/'

export default defineStore('localizationStore', {
  // STATE
  state: () => ({
    currentLang: 'en-US',
  // fallbackLang: 'en-US'
  }),

  // GETTERS
  getters: {},

  // ACTIONS
  actions: {
    changeLanguage(langCode) {
      const localStorage = stores.localStorageStore()
      localStorage.set({ lang: langCode })
      
      i18next.changeLanguage(langCode)
      this.currentLang = langCode
    }
  }
})
