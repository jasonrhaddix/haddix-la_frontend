import { createPinia } from 'pinia'

//
import propsStore from '@/stores/modules/config/properties.js'
import utilsStore from '@/stores/modules/config/utils.js'

//
import authStore from '@/stores/modules/auth/index.js'
import contactStore from './modules/contact/index.js'
import projectsStore from './modules/projects/index.js'
import projectTreeStore from './modules/projectTree/index.js'
import rolesStore from './modules/roles/index.js'
import routingStore from './modules/routing/index.js'

//
import headerStore from './modules/ui/header.js'
import loginStore from './modules/ui/login.js'
import navigationStore from './modules/ui/navigation.js'
import overlayStore from './modules/ui/overlay.js'

export default {
  root: createPinia(),

  // config
  config: {
    propsStore,
    utilsStore
  },

  // main modules
  authStore,
  contactStore,
  projectsStore,
  projectTreeStore,
  rolesStore,
  routingStore,

  // ui modules
  ui: {
    headerStore,
    loginStore,
    navigationStore,
    overlayStore
  }
}
