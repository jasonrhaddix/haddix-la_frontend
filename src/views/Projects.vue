<template>
  <div class="projects-view">
    <div class="projects__add-btn">
      <CreateButton />
    </div>
    <div v-if="!projectsStore.hasProjects && projectsStore.projectsLoading">
      <v-progress-circular
        indeterminate
        class="progress__ind"
        color="primary"
        width="8"
        size="38"
      />
    </div>
    <div v-if="projectsStore.hasProjects" class="projects__list">
      <projects-item
        v-for="(item, i) in filteredProjects"
        :key="`project-${item.project_id}-${i}`"
        :id="item.project_id"
        :session-id="item.session_id"
        :client="getClientName(item.client)"
        :title="item.title"
        :subtitle="item.subtitle"
        :is-guest-project="item.is_guest_project"
        :click-callback="navigateToProject"
        :image="getThumbnailImage(item.project_id)"
      />
    </div>
  </div>
</template>

<script setup>
import stores from '@/stores/index.js'

import ProjectsItem from '@/components/Projects/Projects_Item.vue'
import CreateButton from '@/components/_global/Create_Button.vue'

const projectsStore = stores.projectsStore()
// const overlayStore = stores.ui.overlayStore()

/* function addProject () {
  
  overlayStore.setComponent({
    component: 'Forms/CreateProject/Project/Project_Create.vue',
    title: 'Create Project'
  })

  overlayStore.showOverlay()
} */

// =====================================================

/* export default {
  name: 'projects-view',

  components: {
    'projects-item': ProjectsItem,
    'create-button': CreateButton
  },

  computed: {
    ...mapState({
			projects: state => state.projects.projects,
			projectsLoading: state => state.projects.projectsLoading,
			sessionId: state => state.app.sessionToken
		}),

    ...mapGetters({
			hasProjects: 'hasProjects',
			attachmentsByUsageType: 'attachmentsByUsageType',
			getPropertyByKey: 'getPropertyByKey'
		}),

    filteredProjects() {
      return this.projects.filter((p) => {
        if (
          p.type !== HADDIX_PROJECT_TYPE__EXPERIMENT &&
          (!p.is_guest_project || p.session_id === this.sessionId)
        )
          return p
      })
    },

    getThumbnailImage() {
      return (id) => {
        let images = this.attachmentsByUsageType(
          HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL,
          'projects',
          id
        )
        return images.length > 0
          ? images[0].uri
          : require('@/assets/app/images/project-placeholder-thumb.jpg')
      }
    },

    getClientName() {
      return (client) => {
        if (!client) return ''
        return this.getPropertyByKey('projectClients', client, 'value', 'name')
      }
    }
  },

  methods: {
    ...mapActions({
			openOverlayContainer: VUEX_UI_OVERLAY_CONTAINER_SHOW,
			setOverlayComponent: VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT,
			navigateToRoute: VUEX_ROUTING_PUSH_ROUTE
		}),

    addProject() {
      this.setOverlayComponent({
        component: {
          path: 'Forms/CreateProject/Project',
          file: 'Project_Create'
        },
        title: 'Create Project'
      })

      this.openOverlayContainer()
    },

    navigateToProject(data) {
      this.navigateToRoute({
        name: 'project-details',
        params: {
          ...data
        }
      })
    }
  }
} */
</script>
