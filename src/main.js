// dependency imports
import { createApp, h } from 'vue'
import UUID from 'vue-uuid'

// local imports
import router from './router'
import stores from '@/stores'
import '@/api/config/interceptors'

// components
import App from './App.vue'

// directives
import { MatchRoute } from '@/directives'

// plugins
import Vuetify from '@/plugins/vuetify'
import i18next from '@/plugins/i18nextParser'
// import Ripple from 'vuetify/lib/directives/ripple/index.mjs';

// ===============================================================

// creat Vue app
const app = createApp({
  router,
  store: stores.root,
  watch: {
    '$router.name': () => {}
  },
  render: () => h(App)
})

// interceptorService(stores.root)

// use statements
app.use(stores.root)

app.use(Vuetify)
app.use(UUID)

i18next(app)

// directives statements
app.directive('match-route', MatchRoute)

const routingStore = stores.routingStore()
const localStore = stores.localStorageStore()
const localizationStore = stores.localizationStore()

routingStore.init().then(() => {
  const storeLang = localStore.get('lang') || 'en-US'
  localizationStore.changeLanguage(storeLang)
  
  app.use(router)   // <<-- init router after store init
  app.mount('#app') // <<-- mount application
})

export default app
