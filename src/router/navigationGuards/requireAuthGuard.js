// import store from '@/store'
import router from '@/router'

import stores from '@/stores/index.js'

const requireAuthGuard = (to, from, next) => {
  const routingStore = stores.routingStore()
  const userStore = stores.userStore()
  const toastStore = stores.ui.toastStore()

  const authRoutes = ['roles'] // <<-- MOVE TO CONFIG

  if (authRoutes.includes(to.name) && !userStore.userIsAuthenticated) {
    toastStore.addToast({
      component: '_global/Toast/Toast_Message.vue',
      data: {
        type: 'error',
        title: 'Unauthorized',
        message: "You're not authorized to access this page"
      }
    })

    router.push({ name: 'home' })
  }

  routingStore.navigateToRoute({ to, from })
  
  if (to.meta.hasOwnProperty('beforeEnterCallback')) {
    to.meta.beforeEnterCallback(to, from, next)
  } else {
    next()
  }
}

export default requireAuthGuard
