import { createRouter, createWebHistory } from 'vue-router'

import stores from '@/stores/index.js'

import requireAuthGuard from '@/router/navigationGuards/requireAuthGuard.js'

import About from '@/views/About.vue'

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
      component: () => import('@/views/Home.vue'),
      beforeEnter: () => {
        stores.ui.headerStore().hideHeader()
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/Projects.vue'),
      beforeEnter: [requireAuthGuard],
      meta: {
        beforeEnterCallback: (to, from, next) => {
          stores.routingStore().enterProjectsRoute()
          
          next()
        }
      }
    },

    { path: '/projects/project-details', redirect: { name: 'home' } },
    
    {
      path: '/projects/project-details/:_id',
      name: 'project-details',
      component: () => import('@/views/Project_Details.vue'),
      beforeEnter: [requireAuthGuard],
      meta: {
        beforeEnterCallback: (to, from, next) => {
          if(!to.params._id) next({ name: 'Home' })
          stores.routingStore().enterProjectDetailsRoute(to.params)
          
          next()
        }
      }
    },
    {
      path: '/workflows',
      name: 'workflows',
      component: () => import('@/views/Workflows.vue'),
      beforeEnter: [requireAuthGuard],
      meta: {
        beforeEnterCallback: (to, from, next) => {
          stores.routingStore().enterWorkflowsRoute()
          
          next()
        }
      }
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import('@/views/Roles.vue'),
      beforeEnter: [requireAuthGuard],
      meta: {
        beforeEnterCallback: (to, from, next) => {
          stores.routingStore().enterRolesRoute()
          
          next()
        }
      }
    },
    
    { path: '/roles/role-details', redirect: { name: 'home' } },

    {
      path: '/roles/role-details/:_id',
      name: 'role-details',
      component: () => import('@/views/Role_Details.vue'),
      beforeEnter: [requireAuthGuard],
      meta: {
        beforeEnterCallback: (to, from, next) => {
          if(!to.params._id) next({ name: 'Home' })
          stores.routingStore().enterRoleDetailsRoute(to.params)

          next()
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      component: About,
      beforeEnter: [requireAuthGuard]
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
      beforeEnter: [requireAuthGuard]
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
      beforeEnter: [requireAuthGuard]
      /* meta: {
				beforeEnterCallback: (to, from, next) => {
					store.dispatch(VUEX_UI_NAVIGATION_SET_TITLE, 'Labs')
					next()
				}
			} */
    }
  ]
})

router.beforeEach((to, from, next) => {
  stores.ui.navigationStore().hideNavigation()
  stores.ui.headerStore().removeTitle()
  next()
})

export default router
