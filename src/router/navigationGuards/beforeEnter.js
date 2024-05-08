// import store from '@/store'
import router from '@/router'

import store from '@/stores/index.js'

const beforeEnterGuard = (to, from, next) => {
  const routingStore = store.routingStore()
  const userStore = store.userStore()

  if (to.name === 'roles' && !userStore.userIsAuthenticated) {
    /* store.dispatch(VUEX_NOTIFICATIONS_ADD_TO_QUEUE, {
			component: {
				path: 'Notifications',
				file: 'Notification_Message'
			},
			data: {
				type: 'error',
				message: "You're not authorized to access this page"
			},
			timeout: 0
		}) */

    router.push({ name: 'home' })
  }

  routingStore.navigateToRoute({ to, from })
  // store.dispatch(VUEX_ROUTING_NAVIGATE_TO_ROUTE, { to: to, from: from })

  if (to.meta.hasOwnProperty('beforeEnterCallback')) {
    to.meta.beforeEnterCallback(to, from, next)
  } else {
    next()
  }
}

export default beforeEnterGuard
