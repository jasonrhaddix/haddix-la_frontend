<template>
    <div class="roles-view">
		<!-- <SphereBG :style="{position: 'fixed'}" class="sphere-bg" /> -->

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
							<td>{{ item.role || '--' }}</td>
							<td>
								<span
									class="col__role-id"
									@click="roleClick(item._id)">
									{{ item.roleId || '--' }}
								</span>
								<CopyLink class="copy-link" :postpend="`/role-details/${item._id}`" />
							</td>
							<td>{{ item.company || '--' }}</td>
							<td>{{ item.organization || '--' }}</td>
							<td>{{ item.year || '--' }}</td>
							<td class="col__publish">
								<v-btn
									variant="text"
									:color="getPublished(item.published).color"
									:icon="getPublished(item.published).icon"
									@click="togglePublished(item)" />
							</td>
							<td class="col__more">
								<v-menu
  								:offset="[-50, 15]">
									<template v-slot:activator="{ props }">
										<v-btn
											v-bind="props"
											variant="text"
											color="grey"
											icon="more_horiz"/>
									</template>

									<v-list>
										<v-list-item
											title="Edit"
											@click="editRole(item)" />

										<v-list-item
										 	title="Delete"
											style="color: red" 
											@click="deleteRole(item)" />
									</v-list>
								</v-menu>
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
import { asyncComponents } from '@/utils/helpers'

import CreateButton from '@/components/_global/Create_Button.vue'
import CopyLink from '@/components/_global/Copy_Link.vue'

const rolesStore = stores.rolesStore()
const dialogStore = stores.ui.dialogStore()
const toastStore = stores.ui.toastStore()
const routingStore = stores.routingStore()

const headers = reactive([
  { title: 'Role', value: 'role' },
  { title: 'Role ID', value: 'roleId' },
  { title: 'Company', value: 'company' },
  { title: 'Organization', value: 'organization' },
  { title: 'Year', value: 'year' },
  { title: 'Published', value: 'published', align: 'center' },
  { title: 'More', value: null, align: 'right' }
])

const getPublished = (published) => {
	return published
		? { color: 'green', icon: 'check' }
		: { color: 'grey darken-4', icon: 'check' }
}

const roleClick = (id) => {
	routingStore.pushRoute({
		name: 'role-details',
		params: {
			_id: id
		}
	})
}

const togglePublished = async (item) => {
	try {
		await rolesStore.updateRole(item._id, {
			_id: item._id,
			published: !item.published
		})

		toastStore.addToast({
			component: asyncComponents.ToastMessage,
			data: {
				type: 'success',
				title: 'Success',
				message: 'Role updated successfully',
			}
		})
	} catch (error) {
		toastStore.addToast({
			component: asyncComponents.ToastMessage,
			data: {
				type: 'error',
				title: 'Error',
				message: 'Failed to update role',
			}
		})
	}
}

const editRole = (item) => {
	const overlayStore = stores.ui.overlayStore()

	overlayStore.setComponent({
		component: asyncComponents.CreateRole,
		title: 'Edit Role',
		props: {
			id: item._id,
			data: item
		}
	})

	overlayStore.showOverlay()
}

const deleteRole = (item) => {
	dialogStore.showDialog({
    component: asyncComponents.ConfirmationDialog,
    width: 650,
    props: {
      title: 'Delete Role',
      subtitle: 'Are you sure you want to delete this role?',
      confirm: {
        label: 'Delete',
        action: async () => {
					try {
						await rolesStore.deleteRole(item._id)

						toastStore.addToast({
							component: asyncComponents.ToastMessage,
							data: {
								type: 'success',
								title: 'Success',
								message: 'Role deleted successfully',
							}
						})
					} catch (error) {
						toastStore.addToast({
							component: asyncComponents.ToastMessage,
							data: {
								type: 'error',
								title: 'Error',
								message: 'Failed to delete role',
							}
						})
					}
        }
      },

      cancel: {
        label: 'Cancel'
        /* action: () => {
          dialogStore.closeDialog()
        } */
      }
    }
  })
}
</script>
