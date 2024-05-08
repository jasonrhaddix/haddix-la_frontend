import { createPinia } from 'pinia'

//
import localStore from './modules/config/localStorage.js'
import propsStore from './modules/config/properties.js'
import typesStore from './modules/config/types.js'
import utilsStore from './modules/config/utils.js'

//
import userStore from './modules/user/index.js'
import contactStore from './modules/contact/index.js'
import projectsStore from './modules/projects/index.js'
import projectTreeStore from './modules/projectTree/index.js'
import rolesStore from './modules/roles/index.js'
import routingStore from './modules/routing/index.js'

//
import dialogStore from './modules/ui/dialog.js'
import headerStore from './modules/ui/header.js'
import loginStore from './modules/ui/login.js'
import navigationStore from './modules/ui/navigation.js'
import overlayStore from './modules/ui/overlay.js'

export default {
  root: createPinia(),

  // config
  config: {
    localStore,
    propsStore,
    typesStore,
    utilsStore
  },

  // ui modules
  ui: {
    dialogStore,
    headerStore,
    loginStore,
    navigationStore,
    overlayStore
  },

  // main modules
  userStore,
  contactStore,
  projectsStore,
  projectTreeStore,
  rolesStore,
  routingStore
}
