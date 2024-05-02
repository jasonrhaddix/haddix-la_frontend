import { defineStore } from 'pinia'

import router from '@/router'

import store from '@/stores/index.js'

const useRoutingStore = defineStore('routing', {
  // const storeHeader = useHeaderStore(),

  state: () => ({
    headerStore: store.ui.headerStore(),
    navigationStore: store.ui.navigationStore(),
    route: {
      previous: null,
      current: null
    }
  }),

  actions: {
    init() {
      return new Promise((resolve, reject) => {
        this.route.current = router.currentRoute.value.name
        resolve(this)
      })
    },

    pushRoute(payload) {
      router.push(payload)
    },

    navigateToRoute(route) {
      const toRoute = route.to.name
      const fromRoute = route.from.name

      if (this.navigationStore.openState)
        this.navigationStore.disableNavigation()
      // if (rootState.ui.navigation.openState) { dispatch(VUEX_UI_NAVIGATION_DISABLED, 1000) }

      this.navigationStore.hideNavigation()
      // dispatch(VUEX_UI_NAVIGATION_HIDE)

      // Abort if incoming route is same as current current route
      if (toRoute === fromRoute) return

      this.exitRouteTeardown(toRoute)
      // await dispatch(VUEX_ROUTING_EXIT_ROUTE_TEARDOWN, toRoute)

      this.setPreviousRoute(toRoute)
      // await commit(VUEX_ROUTING_SET_PREVIOUS_ROUTE)

      this.setCurrentRoute(toRoute)
      // await commit(VUEX_ROUTING_SET_CURRENT_ROUTE, toRoute)

      this.enterRoute(toRoute)
      // dispatch(VUEX_ROUTING_ENTER_ROUTE, toRoute)
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

    // enterRoles() {},

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

export default useRoutingStore
