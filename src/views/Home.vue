<template>
  <div class="home-view">
    <SphereBG class="sphere-bg" />

    <div class="home-view--content">
      <Logo class="animated-logo" />
      <p>Portfolio for Jason R. Haddix</p>
      <div class="divider" />
      <div class="view-work-btn">
        <AppButton
          label="View Works"
          @click.native="routingStore.pushRoute({ name: 'projects' })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import stores from '@/stores'

import SphereBG from '@/components/SphereBG/Sphere_BG.vue'
import Logo from '@/components/AnimatedLogo/Animated_Logo.vue'
import AppButton from '@/components/_global/App_Button.vue'

const routingStore = stores.routingStore()

/* export default {
  name: 'home-view',

  components: {
    'sphere-bg': SphereBG,
    logo: Logo,
    'app-btn': AppButton
  },

  methods: {
    ...mapActions({
      navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
    })
  }
} */
</script>
