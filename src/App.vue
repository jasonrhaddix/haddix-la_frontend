<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Navigation from '@/components/Navigation/Navigation.vue'
import Login from '@/components/Login/Login.vue'
import Overlay from '@/components/Containers/Overlay_Container.vue'
import Dialog from '@/components/Containers/Dialog_Container.vue'
// import Notification from '@/components/Containers/Notification_Container.vue'
</script>

<template>
  <div id="app">
    <RouterView />

    <Navigation />
    <Login />
    <Overlay />
    <Dialog />
    <!-- <Notification /> -->
  </div>
</template>

<style lang="scss">
@import './styles/index.scss';
</style>
