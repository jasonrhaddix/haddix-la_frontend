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
            <h3>{{ $t('components:LOGIN.TITLE') }}</h3>
            <v-text-field
              solo dark
              :label="$t('components:LOGIN.EMAIL.LABEL')"
              type="email"
              v-model="modelValue.email" />

            <v-text-field
              solo dark
              :label="$t('components:LOGIN.PASSWORD.LABEL')"
              type="password"
              v-model="modelValue.password"
            />
            
            <AppButton
              variant="colorful"
              :label="$t('common:BUTTONS.LOGIN')"
              :disabled="userStore.userIsAuthenticated"
              :loading="userStore.isAuthorizing"
              class="auth-btn login-btn"
              @click.native="login" />
            
            <!-- <v-btn
              class="auth-btn login-btn"
              :disabled="userStore.userIsAuthenticated"
              :loading="userStore.isAuthorizing"
              color="primary"
              @click="login">
							Login
						</v-btn> -->
          </div>
          <div v-else class="login-input__inner">
            <h3>{{ $t('components:LOGIN.NOT_LOGGED_IN') }}You're currently logged in</h3>

            <AppButton
              variant="colorful"
              :label="$t('common:BUTTONS.LOGOUT')"
              :loading="userStore.isAuthorizing"
              class="auth-btn login-btn"
              @click.native="logout" />

            <!-- <v-btn class="auth-btn logout-btn" color="primary" @click="logout">
              Logout
            </v-btn> -->
          </div>
        </div>
      </v-navigation-drawer>
    </div>

    <div class="login-btn__container">
      <v-btn
        small color="primary"
        class="login-btn"
        prepend-icon="vpn_key"
        @click="loginStore.showLogin">CMS</v-btn>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

import stores from '@/stores/index.js'

import AppButton from '@/components/_global/App_Button.vue'

import { asyncComponents } from '@/utils/helpers'

const loginStore = stores.ui.loginStore()
const userStore = stores.userStore()
const toastStore = stores.ui.toastStore()

const modelValue = reactive({
  email: null,
  password: null
})

const login = async () => {
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
}

const logout = async () => {
  try {
    await userStore.logout()

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
}
</script>
