<template>
  <div class="drawer-container">
    <v-navigation-drawer
      fixed
      temporary
      right
      width="300"
      class="login-drawer"
      location="right"
      v-model="drawerStore.openState">

      <!-- <div class="drawer__content"> -->
        <component :is="component" v-bind="props" @close="drawerStore.hideDrawer" />
      <!-- </div> -->

    </v-navigation-drawer>
  </div>
</template>

<script setup>
// import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import stores from '@/stores/index.js'
import App from '@/App.vue'

import AppButton from '@/components/_global/App_Button.vue'

// import { asyncComponents } from '@/utils/helpers'

const drawerStore = stores.ui.drawerStore()
// const userStore = stores.userStore()
// const toastStore = stores.ui.toastStore()

const { openState, component, width, props } = storeToRefs(drawerStore)

// const modelValue = reactive({})

/* const login = async () => {
  try {
    await userStore.login(modelValue)
    loginStore.hideLogin()

    toastStore.addToast({
      data: {
        title: 'Login',
        message: "You've logged in successfully",
        type: 'success'
      },
      component: asyncComponents.ToastMessage
    })
  } catch (error) {
    toastStore.addToast({
      data: {
        title: 'Login',
        message: 'There was an error logging you in',
        type: 'error'
      },
      component: asyncComponents.ToastMessage
    })
  }
} */

/* const logout = async () => {
  try {
    // await userStore.logout()

    toastStore.addToast({
      data: {
        title: 'Logout',
        message: "You've logged out successfully",
        type: 'success'
      },
      component: asyncComponents.ToastMessage
    })
  } catch (error) {
    toastStore.addToast({
      data: {
        title: 'Logout',
        message: 'There was an error logging you out',
        type: 'error'
      },
      component: asyncComponents.ToastMessage
    })
  }
} */
</script>
