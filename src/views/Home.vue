<template>
  <div class="home-view">
    <SphereBG class="sphere-bg" />

    <div class="home-view--content">
      <Logo class="animated-logo" />
      <p>{{ $t('views:HOME.SUBTITLE', { name: 'Jason R. Haddix' }) }}</p>
      <div class="divider" />
      <div class="view-work-btn">
        <AppButton
          :label="$t('common:BUTTONS.VIEW_WORKS')"
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
</script>
