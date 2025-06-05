import { createPinia } from 'pinia'

//
import propsStore from './modules/config/properties.js'
import typesStore from './modules/config/types.js'
import utilsStore from './modules/config/utils.js'

// S3
import uploadManagerStore from './modules/uploadManager/index.js'
import s3UploadStore from './modules/uploadManager/s3Upload.js'

//
import userStore from './modules/user/index.js'
import contactStore from './modules/contact/index.js'
import projectsStore from './modules/projects/index.js'
import projectTreeStore from './modules/projectTree/index.js'
import rolesStore from './modules/roles/index.js'
import routingStore from './modules/routing/index.js'
import localStorageStore from './modules/localStorage/index.js'
import localizationStore from './modules/localization/index.js'

//
import dialogStore from './modules/ui/dialog.js'
import drawerStore from './modules/ui/drawer.js'
import headerStore from './modules/ui/header.js'
import loginStore from './modules/ui/login.js'
import navigationStore from './modules/ui/navigation.js'
import overlayStore from './modules/ui/overlay.js'
import toastStore from './modules/ui/toast.js'

export default {
  root: createPinia(),

  // config
  config: {
    propsStore,
    typesStore,
    utilsStore
  },

  s3: {
    uploadManagerStore,
    s3UploadStore
  },

  // ui modules
  ui: {
    dialogStore,
    drawerStore,
    headerStore,
    loginStore,
    navigationStore,
    overlayStore,
    toastStore
  },

  // main modules
  userStore,
  contactStore,
  projectsStore,
  projectTreeStore,
  rolesStore,
  routingStore,
  localStorageStore,
  localizationStore
}
