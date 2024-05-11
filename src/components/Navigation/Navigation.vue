<template>
  <div
    :class="[
      'navigation-container',
      { open: navigationStore.openState },
      { endabled: navigationStore.IsEnabled }
    ]"
  >
    <div
      :class="['navigation-skrim', { enabled: navigationStore.openState }]"
      @click="navigationStore.toggleNavigation"
    />
    <div class="navigation-poly">
      <nav>
        <template v-for="item in sitenav">
          <navigation-item
            v-if="hasAccess(item)"
            :key="`${item.label}-${$uuid.v4()}`"
            v-match-route:class.active="item.routeName"
            :text="item.label"
            :styles="{ color: '#646468', fontSize: '3rem' }"
            @click.native="routingStore.pushRoute({ name: item.routeName })"
          />
        </template>
      </nav>
    </div>
    <header :class="[{ open: headerStore.openState }]">
      <div class="header--logo-container">
        <div class="app-logo" @click.native="routingStore.pushRoute({ name: 'home' })">
          <img :src="logoImage" />
        </div>
        <div class="divider" />
        <div class="breadcrumb">
          <p>{{ routeName() }}</p>
        </div>
      </div>
      <div class="nav-menu-button" @click="navigationStore.toggleNavigation">
        <hamburger-menu :menu-state="navigationStore.openState" />
      </div>
    </header>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import stores from '@/stores/index.js'
import router from '@/router/index.js'

import logoImage from '@/assets/app/images/header-logo.svg'
import sitenav from '@/config/sitenav.js'

import HamburgerMenu from '@/components/_global/Hamburger_Menu.vue'
import NavigationItem from '@/components/Navigation/Navigation_Item.vue'

const userStore = stores.userStore()
const routingStore = stores.routingStore()
const headerStore = stores.ui.headerStore()
const navigationStore = stores.ui.navigationStore()

const hasAccess = computed(() => {
  return (item) => {
    return !item.needsAuth || (item.needsAuth && userStore.userIsAuthenticated)
  }
})

function routeName() {
  return navigationStore.title || router.currentRoute.value.name
}

/* export default {
  name: 'navigation',

  components: {
    'hamburger-menu': HamburgerMenu,
    'navigation-item': NavigationItem
  },

  data: () => ({
    navItems: sitenav
  }),

  computed: {
    ...mapState({
			headerState: state => state.ui.headerState,
			navigationOpenState: state => state.ui.navigation.openState,
			navigationIsEnabled: state => state.ui.navigation.isEnabled,
			routeTitle: state => state.ui.navigation.title
		}),

    ...mapGetters({
			userIsAuthenticated: 'userIsAuthenticated'
		}),

    headerLogo() {
      return VUEX_UI_HEADER_LOGO
    },

    hasAccess(item) {
      return (item) => {
        return !item.needsAuth || (item.needsAuth && this.userIsAuthenticated)
      }
    },

    routeName() {
      return this.routeTitle ? this.routeTitle : this.$route.name
    }
  },

  methods: {
    ...mapActions({
			toggleNavigationMenu: VUEX_UI_NAVIGATION_TOGGLE_OPENSTATE,
			navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
		})
  }
} */
</script>
