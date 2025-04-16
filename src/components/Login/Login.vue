<template>
  <div class="login-container">
    <div class="login-drawer__container">
      <v-navigation-drawer
        fixed
        temporary
        width="300"
        class="login-drawer"
        v-model="loginStore.openState"
      >
        <div class="login-input__container">
          <div v-if="!userStore.userIsAuthenticated" class="login-input__inner">
            <h3>Admin Login</h3>
            <v-text-field solo dark label="Email" type="email" v-model="model.email" />
            <v-text-field
              solo
              dark
              label="Password"
              type="password"
              v-model="model.password"
            />
            <v-btn
              class="auth-btn login-btn"
              :disabled="userStore.userIsAuthenticated"
              :loading="userStore.isAuthorizing"
              color="primary"
              @click="login">
							Login
						</v-btn>
          </div>
          <div v-else class="login-input__inner">
            <h3>You're currently logged in</h3>
            <v-btn class="auth-btn logout-btn" color="primary" @click="logout">
              Logout
            </v-btn>
          </div>
        </div>
      </v-navigation-drawer>
    </div>

    <div class="login-btn__container">
      <v-btn small class="login-btn" icon="vpn_key" @click="loginStore.showLogin" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

import stores from '@/stores/index.js'

const loginStore = stores.ui.loginStore()
const userStore = stores.userStore()
const toastStore = stores.ui.toastStore()

const model = reactive({
  email: null,
  password: null
})

const login = async () => {
  try {
    const res = await userStore.login(model)
    loginStore.hideLogin()

    toastStore.addToast({
      data: {
        title: 'Login',
        message: "You've logged in successfully",
        type: 'success'
      },
      component: '_global/Toast/Toast_Message.vue'
    })
  } catch (error) {
    toastStore.addToast({
      data: {
        title: 'Login',
        message: 'There was an error logging you in',
        type: 'error'
      },
      component: '_global/Toast/Toast_Message.vue'
    })
  }
}

const logout = async () => {
  try {
    const res = await userStore.logout()
    console.log('Logout response:', res)

    toastStore.addToast({
      data: {
        title: 'Logout',
        message: "You've logged out successfully",
        type: 'success'
      },
      component: '_global/Toast/Toast_Message.vue' // consider swapping this to an actual import
    })
  } catch (error) {
    toastStore.addToast({
      data: {
        title: 'Logout',
        message: 'There was an error logging you out',
        type: 'error'
      },
      component: '_global/Toast/Toast_Message.vue'
    })
  }
}
</script>
