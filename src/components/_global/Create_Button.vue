<template>
  <div class="create__button">
    <v-btn color="primary" icon="add" @click="createClick" />
  </div>
</template>

<script setup>
import store from '@/stores/index.js'

const userStore = store.userStore()
const dialogStore = store.ui.dialogStore()
const overlayStore = store.ui.overlayStore()

function createClick() {
  if (userStore.userIsAuthenticated) {
    dialogStore.showDialog({
      component: '_global/Create_Picker.vue',
      width: 900
    })
  } else {
    overlayStore.setComponent({
      component: 'Forms/CreateProject/Project/Project_Create.vue',
      title: 'Create Project'
    })

    overlayStore.showOverlay()
  }
}
// import { mapGetters, mapActions } from 'vuex'

/* import {
		VUEX_UI_OVERLAY_CONTAINER_SHOW,
		VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT,
		VUEX_UI_DIALOG_CONTAINER_SHOW
	} from '@/store/constants/ui' */

/* export default {
  name: 'create-button',

  data: () => ({}),

  computed: {
    ...mapGetters({
			userIsAuthenticated: 'userIsAuthenticated'
		})
  },

  methods: {
    ...mapActions({
				openOverlayContainer: VUEX_UI_OVERLAY_CONTAINER_SHOW,
				setOverlayComponent: VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT,
				showDialog: VUEX_UI_DIALOG_CONTAINER_SHOW
			}),

    createClick() {
      if (this.userIsAuthenticated) {
        this.showDialog({
          component: {
            path: '_global',
            file: 'Create_Picker'
          },
          width: 900
        })
      } else {
        this.setOverlayComponent({
          component: {
            path: 'Forms/CreateProject/Project',
            file: 'Project_Create'
          },
          title: 'Create Project'
        })

        this.openOverlayContainer()
      }
    }
  }
} */
</script>
