import { createRouter, createWebHistory } from 'vue-router'

import stores from '@/stores/index.js'

import beforeEnterGuard from '@/router/navigationGuards/beforeEnter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    let position = { left: 0, top: 0 }

    // Keep scroll position when using browser buttons
    if (savedPosition) position = savedPosition

    // Workaround for transitions scrolling to the top of the page
    // However, there are still some problems being fixed by the vue team
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(position)
      }, 150)
    })
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
      // beforeEnter: beforeEnterGuard
      /* meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, '')
					next()
				}
			} */
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/Projects.vue'),
      beforeEnter: beforeEnterGuard,
      meta: {
        beforeEnterCallback: (to, from, next) => {
          stores.routingStore().enterProjectsRoute()
          next()
        }
      }
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import('@/views/Roles.vue'),
      beforeEnter: beforeEnterGuard,
      meta: {
        beforeEnterCallback: (to, from, next) => {
          stores.routingStore().enterRolesRoute()
          next()
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      beforeEnter: beforeEnterGuard
      /* meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'About')
					next()
				}
			} */
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
      beforeEnter: beforeEnterGuard
      /* meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Contact')
					next()
				}
			} */
    },
    {
      path: '/labs',
      name: 'labs',
      component: () => import('../views/Labs.vue'),
      beforeEnter: beforeEnterGuard
      /* meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Labs')
					next()
				}
			} */
    }
  ]
})

export default router
