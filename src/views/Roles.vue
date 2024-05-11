<template>
  <div class="roles-view">
    <div class="projects__add-btn">
      <CreateButton />
    </div>

    <div class="roles__inner"></div>
  </div>
</template>

<script setup>
// import { mapState, mapGetters, mapActions } from 'vuex'

/* import {
	VUEX_ROUTING_PUSH_ROUTE
} from '@/store/constants/routing' */

import { reactive } from 'vue'

import stores from '@/stores/index.js'

import CreateButton from '@/components/_global/Create_Button.vue'

const rolesStore = stores.rolesStore()

const headers = reactive([
  { title: 'Job Title', value: 'job_title' },
  { title: 'Role ID', value: 'role_id' },
  { title: 'Client', value: 'client' },
  { title: 'Department', value: 'department' },
  { title: 'Recruiter', value: 'recruiter' },
  { title: 'Published', value: 'published', align: 'center' }
])

/* export default {
	name: 'roles-view',

	components: {
		'create-button': CreateButton
	},

	data: () => ({
		headers: [
			{ text: 'Job Title', value: 'job_title' },
			{ text: 'Role ID', value: 'role_id' },
			{ text: 'Client', value: 'client' },
			{ text: 'Department', value: 'department' },
			{ text: 'Recruiter', value: 'recruiter' },
			{ text: 'Published', value: 'published', align: 'center' }
		]
	}),

	computed: {
		...mapState({
			roles: state => state.roles.roles
		}),

		...mapGetters({
			getPropertyByKey: 'getPropertyByKey'
		}),

		publishedRoles () {
			return this.roles.filter(role => role.published)
		},

		getClient () {
			return client => {
				if (!client) return null
				return this.getPropertyByKey('roleClients', client, 'value', 'name')
			}
		},

		getPublished () {
			return published => published ? 'check_circle_outline' : null
		}
	},

	methods: {
		...mapActions({
			navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
		}),

		roleClick (id) {
			this.navigateToRoute({
				name: 'role-details',
				params: {
					role_id: id
				}
			})
		}
	}
} */
</script>
