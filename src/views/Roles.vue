<template>
    <div class="roles-view">
		<div class="projects__add-btn">
			<CreateButton />
		</div>

		<div class="roles__inner">
			<v-data-table
				dark
				:headers="headers"
				:items="rolesStore.roles"
				:items-per-page="50"
				class="elevation-1">
					<template v-slot:item="{ item }">
						<tr>
							<td>{{ item.jobTitle || '--' }}</td>
							<td class="col__role-id"
								@click="roleClick(item._id)">
								{{ item.roleId || '--' }}
							</td>
							<td>{{ item.company || '--' }}</td>
							<td>{{ item.department || '--' }}</td>
							<td>{{ item.recruiter || '--' }}</td>
							<td class="col__publish">
								<v-icon color="green">{{ getPublished(item.published) }}</v-icon>
							</td>
						</tr>
					</template>
				</v-data-table>
			</div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

import stores from '@/stores/index.js'

import CreateButton from '@/components/_global/Create_Button.vue'

const rolesStore = stores.rolesStore()
const routingStore = stores.routingStore()

const headers = reactive([
  { title: 'Job Title', value: 'jobTitle' },
  { title: 'ID', value: 'roleId' },
  { title: 'Company', value: 'company' },
  { title: 'Department', value: 'department' },
  { title: 'Recruiter', value: 'recruiter' },
  { title: 'Published', value: 'published', align: 'center' }
])

const getPublished = (published) => {
	return published ? 'mdi-check-circle' : 'close'
}

const roleClick = (id) => {
	routingStore.pushRoute({
		name: 'role-details',
		params: {
			_id: id
		}
	})
}

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
