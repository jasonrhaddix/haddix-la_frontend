// dependency imports
import { createApp, h } from 'vue'
import UUID from 'vue-uuid'

// local imports
import router from './router'
import stores from '@/stores'
import interceptorService from '@/api/config/interceptors'

// components
import App from './App.vue'

// directives
import { MatchRoute } from '@/directives'

// plugins
import Vuetify from '@/plugins/vuetify'
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

interceptorService(stores.root)

// use statements
app.use(stores.root)
app.use(router)
app.use(Vuetify)
app.use(UUID)

// directives statements
app.directive('match-route', MatchRoute)
// app.directive('v-ripple', Ripple)

// trigger route store -> mount app
const routingStore = stores.routingStore()
routingStore.init().then(() => {
  app.mount('#app')
})

export default app
