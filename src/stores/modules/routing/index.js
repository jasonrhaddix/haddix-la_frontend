import { defineStore } from 'pinia'

import router from '@/router'
import store from '@/stores/index.js'

export default defineStore('routing', {
  state: () => ({
    localStore: store.config.localStore(),
    headerStore: store.ui.headerStore(),
    navigationStore: store.ui.navigationStore(),
    rolesStore: store.rolesStore(),
    userStore: store.userStore(),

    route: {
      previous: null,
      current: null
    }
  }),

  actions: {
    async init() {
      this.localStore.init()
      await this.userStore.rehydrateUserFromToken()

      return new Promise((resolve, reject) => {
        this.route.current = router.currentRoute.value.name
        resolve(this)
      })
    },

    pushRoute(payload) {
      router.push(payload)
    },

    async navigateToRoute(route) {
      const toRoute = route.to.name
      const fromRoute = route.from.name

      if (this.navigationStore.openState) this.navigationStore.disableNavigation()

      this.navigationStore.hideNavigation()

      // Abort if incoming route is same as current current route
      if (toRoute === fromRoute) return

      await this.exitRouteTeardown(toRoute)
      await this.setPreviousRoute(toRoute)
      await this.setCurrentRoute(toRoute)
      this.enterRoute(toRoute)
    },

    exitRouteTeardown(route) {
      switch (route) {
        case 'project-details':
          // commit(VUEX_PROJECT_TEARDOWN)
          break
        case 'role-details':
          // commit(VUEX_ROLE_TEARDOWN)
          break
      }
    },

    enterRoute(route) {
      if (route !== 'home') {
        this.headerStore.showHeader()
      } else {
        this.headerStore.hideHeader()
      }
    },

    // enterProject() {},

    enterRoles() {
      this.rolesStore.fetchRoles()
    },

    // enterRole() {},

    previousPage() {
      router.go(-1)
    },

    setCurrentRoute(route) {
      this.route.currentRoute = route
    },

    setPreviousRoute(route) {
      this.route.previous = route
    }
  }
})
