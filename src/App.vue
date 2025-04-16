<script setup>
  import Navigation from '@/components/Navigation/Navigation.vue'
  import Login from '@/components/Login/Login.vue'
  import Overlay from '@/components/Containers/Overlay_Container.vue'
  import Dialog from '@/components/Containers/Dialog_Container.vue'
  import Toast from '@/components/Containers/Toast_Container.vue'
</script>

<template>
  <v-app id="app">
    <v-main>
      <RouterView />
      <Navigation />
    </v-main>

    <Login />
    <Overlay />
    <Dialog />
    <Toast />

  </v-app>
</template>

<style lang="scss">
  @import './styles/index.scss';
</style>
