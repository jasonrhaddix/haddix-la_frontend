<template>
  <v-dialog
    dark
    fullscreen
    persistent
    hide-overlay
    transition="dialog-bottom-transition"
    scroll-strategy="none"
    content-class="overlay-container"
    v-model="overlayStore.openState"
  >
    <div v-if="!userStore.userIsAuthenticated" class="overlay__guest-warning">
      <p>
        <span>You're not currently logged in.</span> Projects created as Guest will be
        removed after each session.
      </p>
    </div>

    <v-container>
      <v-layout class="overlay-container__content">
        <v-container class="section section__header">
          <div class="header__content">
            <img class="header__geo-image" :src="Geo" />
            <h1 class="header__title">{{ overlayStore.title }}</h1>
          </div>

          <v-btn
            light
            small
            variant="tonal"
            icon="close"
            class="header__close-btn"
            @click="overlayStore.hideOverlay"
          />
        </v-container>

        <div class="section section__content">
          <component :is="loadedComponent" />
        </div>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script setup>
import { watch, ref, markRaw, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'

import stores from '@/stores/index.js'

import Geo from '@/assets/app/images/geo.svg'

const userStore = stores.userStore()
const overlayStore = stores.ui.overlayStore()

const loadedComponent = ref(null)

const { component } = storeToRefs(overlayStore)

watch(component, (val) => {
  loadedComponent.value = markRaw(
    defineAsyncComponent(() => import(`../../components/${val}`))
  )
})

// import { mapState, mapGetters, mapActions } from 'vuex'

// import {
// 	VUEX_UI_OVERLAY_CONTAINER_HIDE
// } from '@/store/constants/ui'

/* export default {
	name: 'overlay-container',

	computed: {
		...mapState({
			overlayOpenState: state => state.ui.overlayContainer.openState,
			overlayComponent: state => state.ui.overlayContainer.component,
			overlayTitle: state => state.ui.overlayContainer.title
		}),

		...mapGetters({
			userIsAuthenticated: 'userIsAuthenticated'
		}),

		loadComponent () {
			return this.overlayComponent ? this.$root.loadComponent(this.overlayComponent) : null
		},

		openState: {
			get () { return this.overlayOpenState },
			set (val) { this.$store.commit('VUEX_UI_OVERLAY_CONTAINER_SET_STATE', val) }
		}
	},

	methods: {
		...mapActions({
			closeOverlay: VUEX_UI_OVERLAY_CONTAINER_HIDE
		})
	}
} */
</script>
