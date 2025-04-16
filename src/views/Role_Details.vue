<template>
  <v-container fluid class="role-details-view">
    <div class="details__content">
      <div class="header__container">
        <v-img
          contain
          v-if="headerPlaceholder"
          :src="headerPlaceholder"
        ></v-img>

        <div class="scrim" />

        <div class="title__container">
          <h4>Relevant experience for</h4>
          <h1>{{ role.jobTitle }}</h1>
          <h3><!-- <span>at</span> --> {{ role.company }}</h3>
        </div>

        <div class="project-info__container">
          <v-row class="project-info__inner">
            <v-col align-self="center" class="col-4 project-info__item">
              <div class="item">
                <h4>Company</h4>
                <p>{{ role.company }}</p>
              </div>
            </v-col>

            <v-col align-self="center" class="col-4 project-info__item">
              <div class="item">
                <h4>Organization</h4>
                <p>{{ role.organization || '--' }}</p>
              </div>
            </v-col>

            <v-col align-self="center" class="col-4 project-info__item">
              <div class="item">
                <h4>Recruiter</h4>
                <p>{{ role.recruiter || '--' }}</p>
              </div>
            </v-col>
          </v-row>
        </div>

        <v-btn
          icon small
          class="header__close-btn"
          @click="navigateToPreviousPage">
          <v-icon>close</v-icon>
        </v-btn>
      </div>

      <div class="project-info__container__mobile">
        <v-row class="project-info__inner">
          <v-col align-self="center" class="col-4 project-info__item">
            <div class="item">
              <h4>Company</h4>
              <p>{{ role.company }}</p>
            </div>
          </v-col>

          <v-col align-self="center" class="col-4 project-info__item">
            <div class="item">
              <h4>Organization</h4>
              <p>{{ role.organization }}</p>
            </div>
          </v-col>

          <v-col align-self="center" class="col-4 project-info__item">
            <div class="item">
              <h4>Recruiter</h4>
              <p>{{ role.recruiter }}</p>
            </div>
          </v-col>
        </v-row>
      </div>

      <v-container class="content__container">
        <div class="section description__container">
          <div class="section-title">
            <h2>Relevant Experience</h2>
          </div>
          <p class="" v-html="role.description" />
        </div>

        <div class="divider" />

        <div class="section project__container">
          <div class="section-title">
            <h2>Relevant Projects</h2>
          </div>

          <div
            class="project-item"
            v-for="project in role.projects"
            :key="`project-item--${project.projectId}}`"
          >
            <div>
              <div class="title__container">
                <div class="title__info">
                  <h3>{{ project.title }}</h3>
                  <p v-html="project.summary" />
                </div>

                <div
                  v-if="projectVideos(project.project_id)"
                  class="watch__btn"
                >
                  <AppButton
                    light label="Watch Video"
                    @click.native="loadVideo(projectVideos(project.projectId))"
                  />
                </div>
              </div>

							<v-container fluid>
								<v-row class="photos__inner" dense>
									<v-col
										cols="12"
										md="6"
										class="d-flex align-center"
										v-for="(item, i) in projectImages(project.projectId)"
										:key="`project-photo-${$uuid.v4()}-${i}`"
										@click="showFullsizeImage(item)"
									>
										<div class="photo">
											<img :src="item.uri" />
											<div class="img-hover">
												<div class="skrim" />
												<v-icon size="32" class="icon" color="white">
													search
												</v-icon>
											</div>
										</div>
									</v-col>
								</v-row>
							</v-container>

            </div>
            <!-- <div class="divider"/> -->
          </div>
        </div>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
	import { computed } from 'vue'
	import { storeToRefs } from 'pinia'

	import stores from '@/stores/index.js'

	import AppButton from '@/components/_global/App_Button.vue'

	import headerPlaceholder from '@/assets/app/images/project-placeholder-thumb.jpg'

	const propsStore = stores.config.propsStore()
  const types = stores.config.typesStore()
	const dialogStore = stores.ui.dialogStore()
	const rolesStore = stores.rolesStore()

	const { role /* projectAttachmentsByUsageType */ } = storeToRefs(rolesStore)

	// mapGetters
	// const projectAttachmentsByUsageType = rolesStore.projectAttachmentsByUsageType
	const getPropertyByKey = propsStore.getPropertyByKey

	const client = computed(() =>
		''
		//getPropertyByKey('roleClients', role.client, 'value', 'name') || ''
	)

	const description = computed(() => ''/* role.description */)
	const recruiter = computed(() => ''/* role.recruiter */)

	// scoped methods
	const projectVideos = (projectId) => {
		/* const videos = projectAttachmentsByUsageType(
			types.ATTACHMENT_USAGE_TYPE__VIDEO,
			'roles',
			projectId
		) */

		const videos = []
		return videos.length > 0 ? videos[0] : null
	}

	const projectImages = (projectId) => {
		/* const images = projectAttachmentsByUsageType(
			ATTACHMENT_USAGE_TYPE__BODY,
			'roles',
			projectId
		) */

		const images = []
		return images.length > 0 ? images : headerPlaceholder
	}

	const navigateToPreviousPage = () => {
		stores.routingStore().previousPage()
	}

	const showFullsizeImage = (item) => {
		dialogStore.showDialog({
      component: '_global/Photo_Viewer.vue',
			width: '70%',
				props: {
					image: item.uri
				}
    })
	}

	const loadVideo = (item) => {
		dialogStore.showDialog({
      component: '_global/Photo_Viewer.vue',
			width: '70%',
				props: {
					image: item.uri
				}
    })
	}
</script>

<!-- <script>
// import { mapState, mapGetters, mapActions } from 'vuex'

// import {
// 	VUEX_ROUTING_PREVIOUS_PAGE
// } from '@/store/constants/routing'

// import {
// 	VUEX_UI_DIALOG_CONTAINER_SHOW
// } from '@/store/constants/ui'

import AppBtn from '@/components/_global/App_Button'

export default {
	name: 'project-details-view',

	components: {
		'app-btn': AppBtn
	},

	computed: {
		...mapState({
			role: state => state.roles.role
		}),

		...mapGetters({
			projectAttachmentsByUsageType: 'projectAttachmentsByUsageType',
			getPropertyByKey: 'getPropertyByKey'
		}),

		headerImage () {
			return require('@/assets/app/images/project-placeholder-thumb.jpg')
		},

		client () {
			return this.getPropertyByKey('roleClients', this.role.client, 'value', 'name') || ''
		},

		jobTitle () {
			return this.role.jobTitle
		},

		organization () {
			return this.role.organization
		},

		description () {
			return this.role.description
		},

		recruiter () {
			return this.role.recruiter
		},

		projectVideos () {
			return projectId => {
				let videos = this.projectAttachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__VIDEO_ROLE, 'roles', projectId)
				return (videos.length > 0)
					? videos[0]
					: null
			}
		},

		projectImages () {
			return projectId => {
				let images = this.projectAttachmentsByUsageType(HADDIX_ATTACHMENT_USAGE_TYPE__BODY_ROLE, 'roles', projectId)
				return (images.length > 0)
					? images
					: require('@/assets/app/images/project-placeholder-thumb.jpg')
			}
		}
	},

	methods: {
		...mapActions({
			navigateToPreviousPage: VUEX_ROUTING_PREVIOUS_PAGE,
			showDialog: VUEX_UI_DIALOG_CONTAINER_SHOW
		}),

		showFullsizeImage (item) {
			this.showDialog({
				component: {
					path: '_global',
					file: 'Photo_Viewer'
				},
				props: {
					images: item
				}
			})
		},

		loadVideo (item) {
			this.showDialog({
				component: {
					path: '_global',
					file: 'Video_Viewer'
				},
				props: {
					videos: item
				}
			})
		}
	}
}
</script> -->
