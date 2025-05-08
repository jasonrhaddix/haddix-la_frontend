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
        <div class="header--photo-container">
          <div class="header--photo">
            <img :src="BioPhoto" />
          </div>
        </div>

        <template v-for="item in sitenav">
          <navigation-item
            v-if="hasAccess(item)"
            :key="`${item.label}-${$uuid.v4()}`"
            :class="[{ 'active': item.routeName === currentRouteName }]"
            :text="item.label"
            :styles="{ color: '#646468', fontSize: '3rem' }"
            @click.native="routingStore.pushRoute({ name: item.routeName })"
          />
        </template>

        <div class="social-media--container">
            <div class="social-media--list">
              <a
                class="social-list"
                href="http://github.com/jasonrhaddix"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faGithub" size="2x" />
              </a>

              <a
                class="social-list"
                href="https://codepen.io/Jasonrhaddix/"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faCodepen" size="2x" />
              </a>

              <a
                class="social-list"
                href="https://medium.com/@jasonrhaddix"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faMedium" size="2x" />
              </a>

              <a
                class="social-list"
                href="https://x.com/jasonrhaddix"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faTwitter" size="2x" />
              </a>

              <a
                class="social-list"
                href="https://www.linkedin.com/in/jasonrhaddix/"
                target="_blank"
              >
                <FontAwesomeIcon :icon="faLinkedin" size="2x" />
              </a>
            </div>
          </div>
      </nav>
    </div>
    <header :class="[{ open: headerStore.openState }]">
      <div class="header--logo-container">
        <div class="app-logo" @click.native="routingStore.pushRoute({ name: 'home' })">
          <img :src="logoImage" />
        </div>
        <div class="divider" />
        <div class="breadcrumb">
          <p v-html="routeName()" />
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import stores from '@/stores/index.js'
import router from '@/router/index.js'

import logoImage from '@/assets/app/images/header-logo.svg'
import sitenav from '@/config/sitenav.js'

import HamburgerMenu from '@/components/_global/Hamburger_Menu.vue'
import NavigationItem from '@/components/Navigation/Navigation_Item.vue'

import BioPhoto from '@/assets/app/images/profile-photo.png'

import {
  faGithub,
  faMedium,
  faTwitter,
  faCodepen,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'

const userStore = stores.userStore()
const routingStore = stores.routingStore()
const headerStore = stores.ui.headerStore()
const navigationStore = stores.ui.navigationStore()

const hasAccess = computed(() => {
  return (item) => {
    return !item.needsAuth || (item.needsAuth && userStore.userIsAuthenticated)
  }
})

const currentRouteName = computed(() => {
return router.currentRoute.value.name
})  

const routeName = () => {
  return headerStore.title || router.currentRoute.value.name
}
</script>
