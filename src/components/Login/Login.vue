<template>
  <div class="login-container">
    <v-layout class="login-drawer__container">
      <v-navigation-drawer
        fixed
        temporary
        width="300"
        class="login-drawer"
        v-model="loginStore.openState"
      >
        <div class="login-input__container">
          <div 
            v-if="!authStore.appAuthenticated"
            class="login-input__inner">

            <h3>Admin Login</h3>
            <v-text-field
              solo
              dark
              
              label="Email"
              type="email"
              v-model="model.email"
            />
            <v-text-field
              solo
              dark
              
              label="Password"
              type="password"
              v-model="model.password"
            />
            <v-btn
              class="auth-btn login-btn"
              :disabled="authStore.appAuthenticated"
              :loading="authStore.isAuthorizing"
              color="primary"
              @click="authStore.login(model)"
              >Login</v-btn
            >
          </div>
          <div v-else class="login-input__inner">
            <h3>You're currently logged in</h3>
            <v-btn
              class="auth-btn logout-btn"
              color="primary" @click="authStore.logout">
              Logout
            </v-btn>
          </div>
        </div>
      </v-navigation-drawer>
    </v-layout>

    <div class="login-btn__container">
      <v-btn
        small
        class="login-btn"
        icon="vpn_key"
        @click="loginStore.showLogin"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

import store from '@/stores/index.js'

const loginStore = store.ui.loginStore()
const authStore = store.authStore()

const model = reactive({
  email: null,
  password: null
})

// import { required } from 'vuelidate/lib/validators'

// import { mapState, mapGetters, mapActions } from 'vuex'

/* import {
	VUEX_UI_LOGIN_CONTAINER_SHOW
} from '@/store/constants/ui' */

/* import {
	VUEX_AUTH_REQUEST,
	VUEX_AUTH_LOGOUT
} from '@/store/constants/auth' */

/* export default {
	name: 'login-container',

	data: () => ({
		model: {
			email: null,
			password: null
		},
		submitted: false
	}),

	validations: {
		model: {
			email: {
				required
			},
			password: {
				required
			}
		}
	},

	computed: {
		...mapState({
			loginOpenState: state => state.ui.loginContainer.openState,
			isAuthorizing: state => state.auth.authorizing
		}),

		...mapGetters({
			appAuthenticated: 'appAuthenticated'
		}),

		openState: {
			get () { return this.loginOpenState },
			set (val) { this.$store.dispatch('VUEX_UI_LOGIN_CONTAINER_SET_STATE', val) }
		}
	},

	methods: {
		...mapActions({
			openLoginDrawer: VUEX_UI_LOGIN_CONTAINER_SHOW,
			submitForAuth: VUEX_AUTH_REQUEST,
			logout: VUEX_AUTH_LOGOUT
		}),

		submitCredentials () {
			if (!this.$v.$invalid) {
				this.submitted = false
				// TODO: need spread operator?
				this.submitForAuth({ ...this.model })
			} else {
				this.submitted = true
			}
		}
	}
} */
</script>
