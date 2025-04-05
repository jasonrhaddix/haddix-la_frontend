<template>
  <div class="labs-view">
    <div class="labs__add-btn">
      <v-btn color="primary" @click="addProject" icon="add"> </v-btn>
    </div>

    <div class="labs__header">
      <div class="header__content">
        <particle-text text="HADDIX" />
        <p>Experiments from Jason R. Haddix</p>
        <div class="scroll-arrow">
          <v-icon color="grey darken-2">keyboard_arrow_down</v-icon>
        </div>
        <div v-if="!projectsStore.hasProjects" class="coming-soon">
          <h3><span>¯\_(ツ)_/¯</span> {{ getMessage }}</h3>
          <p><small>Instead, try looking at this pretty animation.</small></p>
        </div>
      </div>
      <!-- <div
				v-if="true"
				:class="['header__scroll', {'visible':scrollIndVisible}]">
				<p>SCROLL</p>
				<v-icon>keyboard_arrow_down</v-icon>
			</div> -->
    </div>

    <div v-if="!projectsStore.hasProjects && projectsStore.loading">
      <v-progress-circular
        indeterminate
        class="progress__ind"
        color="primary"
        width="8"
        size="38"
      />
    </div>

    <div v-if="projectsStore.hasProjects" class="projects__list">
      <project-item
        v-for="(item, i) in filteredProjects"
        :key="`project-${item.projectId}-${i}`"
        :id="item.projectId"
        :session-id="item.session_id"
        :client="getClientName(item.client)"
        :title="item.title"
        :subtitle="item.subtitle"
        :link="item.link"
        :image="getThumbnailImage(item.projectId)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'

import stores from '@/stores/index.js'

import ParticleText from '@/components/_global/Particle_Text.vue'
import ProjectItem from '@/components/Projects/Project_Item.vue'

const typesStore = stores.config.typesStore()
const projectsStore = stores.projectsStore()
const overlayStore = stores.ui.overlayStore()

// #region LIFECYCLE HOOKS ------------------------------
onMounted(() => {
  // window.addEventListener('scroll', checkScroll)
})

onBeforeUnmount(() => {
  // window.removeEventListener('scroll', checkScroll)
})
// #regionend -------------------------------------------

// #region GLOBAL ---------------------------------------
// const scrollListener = ref(null)
// const scrollIndVisible = ref(true)
function checkScroll(e) {
  let scrollPos = e.target.scrollingElement.scrollTop
  if (scrollPos > 100) {
    scrollIndVisible = false
    window.removeEventListener('scroll', this.checkScroll)
  }
}
// #regionend -------------------------------------------

// #region ADD BUTTON -----------------------------------
function addProject() {
  overlayStore.setComponent({
    component: {
      path: 'Forms/CreateProject/Project',
      file: 'Project_Create'
    },
    title: 'Create Project'
  })

  overlayStore.showOverlay()
}
// #endregion -------------------------------------------

// #region HEADER ---------------------------------------
const getMessage = computed(() => {
  const msgs = [
    'Nope, Not Yet',
    'Coming Soon...ish',
    "Workin' On It",
    'Nothing Here'
  ]
  return msgs[Math.round(Math.random() * msgs.length - 1)]
})
// #endregion -------------------------------------------

// #region CONTENT --------------------------------------
const projects = projectsStore.projects
const filteredProjects = computed(() => {
  projects.filter((p) => {
    if (
      p.type === typesStore.PROJECT_TYPE__EXPERIMENT &&
      (!p.is_guest_project || p.session_id === this.sessionId)
    )
      return p
  })
})

const getClientName = computed((client) => {
  if (!client) return ''
  return this.getPropertyByKey('clients', client, 'value', 'name')
})

const getThumbnailImage = computed((id) => {
  let images = projectsStore.attachmentsByUsageType(
    typesStore.ATTACHMENT_USAGE_TYPE__THUMBNAIL,
    'projects',
    id
  )

  return images.length > 0
    ? images[0].uri
    : require('@/assets/app/images/project-placeholder-thumb.jpg')
})

// #endregion -------------------------------------------

// #region SOMETHING
// #endregion

/* export default {
		name: 'labs-view',

		components: {
			'particle-text': ParticleText,
			'projects-item': ProjectsItem
		},

		data: () => ({
			scrollListener: null,
			scrollIndVisible: true,
			comingSoonMessages: [
				'Nope...Not Yet',
				'Coming Soon-ish',
				"Workin' On It",
				'Nothing Here',
				''
			]
		}),

		computed: {
			...mapState({
				projects: state => state.projects.projects,
				projectsLoading: state => state.projects.projectsLoading

			}),

			...mapGetters({
				hasProjects: 'hasProjects',
				attachmentsByUsageType: 'attachmentsByUsageType',
				getPropertyByKey: 'getPropertyByKey'
			}),

			filteredProjects () {
			return this.projects.filter(p => {
				if (p.type === HADDIX_PROJECT_TYPE__EXPERIMENT && (!p.is_guest_project || p.session_id === this.sessionId)) return p
			})
		},

			getThumbnailImage () {
				return (id) => {
					let images = this.attachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__THUMBNAIL, 'projects', id)
					return (images.length > 0) ? images[0].uri : require('@/assets/app/images/project-placeholder-thumb.jpg')
				}
			},

			getClientName () {
				return (client) => {
					if (!client) return ''
					return this.getPropertyByKey('clients', client, 'value', 'name')
				}
			},

			getMessage () {
				return this.comingSoonMessages[Math.round(Math.random() * this.comingSoonMessages.length - 1)]
			}
		},

		mounted () {
			window.addEventListener('scroll', this.checkScroll)
		},

		beforeDestroy () {
			window.removeEventListener('scroll', this.checkScroll)
		},

		methods: {
			...mapActions({
				openOverlayContainer: VUEX_UI_OVERLAY_CONTAINER_SHOW,
				setOverlayComponent: VUEX_UI_OVERLAY_CONTAINER_SET_COMPONENT
			}),
			checkScroll (e) {
				let scrollPos = e.target.scrollingElement.scrollTop
				if (scrollPos > 100) {
					this.scrollIndVisible = false
					window.removeEventListener('scroll', this.checkScroll)
				}
			},

			addProject () {
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
	} */
</script>
