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
        :key="`project-${item.projectId}-${i}`"
        :id="item.projectId"
        :session-id="item.sessionId"
        :client="getClientName(item.client)"
        :title="item.title"
        :subtitle="item.subtitle"
        :is-guest-project="item.isGuestProject"
        :click-callback="navigateToProject"
        :image="getThumbnailImage(item.projectId)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import stores from '@/stores/index.js'

import ProjectsItem from '@/components/Projects/Projects_Item.vue'
import CreateButton from '@/components/_global/Create_Button.vue'

const propsStore = stores.config.propsStore()
const typesStore = stores.config.typesStore()
const routingStore = stores.routingStore()
const projectsStore = stores.projectsStore()
const userStore = stores.userStore()
// const overlayStore = stores.ui.overlayStore()

const filteredProjects = computed(() => {
  return projectsStore.projects.filter((p) => {
    if (
      p.type !== typesStore.PROJECT_TYPE__EXPERIMENT
        && (!p.isGuestProject || p.sessionId === userStore.sessionId)
    )
      return p
  })
})

const getThumbnailImage = computed(() => {
  return (id) => {
    let images = projectsStore.attachmentsByUsageType(
      typesStore.ATTACHMENT_USAGE_TYPE__THUMBNAIL,
      'projects',
      id
    )
    
    return images[0]?.uri
  }
})

const getClientName = computed(() => {
  return (clientValue) => {
    if (!clientValue) return ''
    return propsStore.projectClients.find(item => item.value === clientValue).title
  }
})


function navigateToProject(data) {
  routingStore.navigateToRoute({
    name: 'project-details',
    params: data
  })
}



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
