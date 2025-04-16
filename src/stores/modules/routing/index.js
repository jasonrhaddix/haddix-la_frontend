import { defineStore } from 'pinia'

import router from '@/router'
import stores from '@/stores/index.js'

export default defineStore('routing', {
  state: () => ({
    route: {
      previous: null,
      current: null
    }
  }),

  actions: {
    async init() {
      const localStore = stores.config.localStore()
      const userStore = stores.userStore()
      
      await localStore.init()
      await userStore.rehydrateUserFromToken()
      await userStore.createSessionToken()

      return new Promise((resolve, reject) => {
        this.route.current = router.currentRoute.value.name
        resolve(this)
      })
    },

    pushRoute(payload) {
      router.push(payload)
    },

    async navigateToRoute(route) {
      const navStore = stores.ui.navigationStore()

      const toRoute = route.to.name
      const fromRoute = route.from.name

      if (navStore.openState) navStore.disableNavigation()

      navStore.hideNavigation()

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
      const headerStore = stores.ui.headerStore()

      if (route !== 'home') {
        headerStore.showHeader()
      } else {
        headerStore.hideHeader()
      }
    },

    previousPage() {
      router.go(-1)
    },

    setCurrentRoute(route) {
      this.route.currentRoute = route
    },

    setPreviousRoute(route) {
      this.route.previous = route
    },

    // ================================================
    // ROUTES
    // ================================================
    enterProjectsRoute() {
      const projectsStore = stores.projectsStore()
      projectsStore.fetchProjects()
    },

    enterProjectDetailsRoute(params) {
      const projectsStore = stores.projectsStore()
      projectsStore.fetchProjectById(params?._id)
    },

    enterRolesRoute() {
      const rolesStore = stores.rolesStore()
      rolesStore.fetchRoles()
    },

    enterRoleDetailsRoute(params) {
      const rolesStore = stores.rolesStore()
      rolesStore.fetchRoleById(params?._id)
    },
  }
})
