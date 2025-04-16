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

const routeName = () => {
  return headerStore.title || router.currentRoute.value.name
}
</script>
