<template>
  <v-container fluid class="project-details-view">
		<v-btn
			icon small
			color="primary"
			class="header__close-btn"
			@click="navigateToPreviousPage">
			<v-icon>close</v-icon>
		</v-btn>

    <div class="details__content">
      <div class="header__container">
        <v-img
          contain
          v-if="headerImage"
          :src="headerImage"
        />

        <div class="scrim" />

        <div class="title__container">
          <h3>{{ project.client }}</h3>
          <h1>{{ project.title }}</h1>
          <p><i>{{ project.subtitle }}</i></p>
        </div>

        <div class="project-info__container">
          <v-row class="project-info__inner">
            <v-col
              align-self="center"
              class="col-6 col-md-4 project-info__item">
							
							<div class="project-info__item">
								<div class="item">
									<h4>Client</h4>
									<p>{{ project.client }}</p>
								</div>
							</div>
							
            </v-col>

            <v-col
              align-self="center"
              class="col-6 col-md-4 project-info__item">
							
							<div class="project-info__item">
              	<div class="item">
									<h4>Role</h4>
									<p>{{ project.role }}</p>
								</div>
              </div>
							
            </v-col>

            <v-col
              align-self="center"
              class="d-none d-md-block col-12 col-md-4 project-info__item">
              <div class="item">
                <div
                  v-if="project.link"
                  class="project-btn__container"
                  @click="navigateToProject">

                  <AppButton
										variant="colorful"
										class="project-btn"
										label="View Project" />
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <v-container class="content__container">
        <div class="section excerpt__container">
          <h3 class="headline">"{{ project.excerpt }}"</h3>
        </div>

        <div v-if="projectVideo" class="divider" />

        <div class="section video__container">
          <div v-if="projectVideo" class="video__inner">
            <video
              loop muted autoplay controls playsInline
              class="project-video">
              <source :src="projectVideo.uri" :type="projectVideo.mimetype" />
            </video>
          </div>
        </div>

        <div v-if="project.description" class="divider" />

        <div class="section description__container">
          <div class="description__inner">
            <div class="description" v-html="project.description" />
          </div>
        </div>

        <div v-if="projectPhotos" class="divider" />

				<div v-if="project.resources?.length" class="section-title photos">
					<h2>Project Photos</h2>
				</div>

        <div class="section photos__container">
          <v-container class="photos__inner ps-0 pe-0" fluid>
            <v-row dense>
              <v-col
                cols="12"
                sm="6"
                v-for="(item, i) in projectPhotos"
                :key="`project-photo-${$uuid.v4()}-${i}`"
                @click="showFullsizeImage(item)"
              >
                <div class="photo">
                  <img :src="item.uri" />
                  <div class="img-hover">
                    <div class="skrim" />
                    <v-icon size="54" class="icon" color="white">zoom_in</v-icon>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <div v-if="project.languages || project.resources || project.tree" class="divider" />

        <div class="section meta__container">
          <div v-if="project.languages?.length" class="section-title languages">
            <h2>Languages</h2>
          </div>

          <div v-if="project.languages?.length" class="subsection meta_languages">
            <v-layout class="languages__inner">
              <LanguageGraph
                v-for="(item, i) in project.languages"
                :key="`project-language-${item.value}-${i}`"
                v-bind="item"
              />
            </v-layout>
          </div>

          <div v-if="project.resources?.length" class="section-title languages">
            <h2>Technologies</h2>
          </div>

          <div v-if="project.resources?.length" class="subsection meta_resources">
						<v-container class="resources__inner" fluid>
							<v-row>
								<v-col
									cols="12"
									sm="6"
									v-for="(item, i) in projectResources"
									:key="`resource-item-${i}`"
									class="resource-item"
								>
									<p>{{ item.title }}</p>
								</v-col>
							</v-row>
						</v-container>
					</div>
        </div>
      </v-container>
    </div>

    <!-- <div
      v-if="project.link"
      class="d-sm-block d-md-none footer__container">
      <v-row class="footer__inner">
        <v-col align-self="center" class="col-12 project-info__item">
          <div class="project-btn__container">
            <AppButton
							variant="colorful"
							class="project-btn"
							label="View Project"
							@click="navigateToProject" />
          </div>
        </v-col>
      </v-row>
    </div> -->
  </v-container>
</template>


<script setup>
	import { computed } from 'vue'

	import stores from '@/stores/index.js'

	import { asyncComponents } from '@/utils/helpers'

	import AppButton from '@/components/_global/App_Button.vue'
	import LanguageGraph from '@/components/_global/Language_Graph.vue'

	import headerPlaceholder from '@/assets/app/images/project-placeholder-thumb.jpg'

	const propsStore = stores.config.propsStore()
	const dialogStore = stores.ui.dialogStore()
	const projectsStore = stores.projectsStore()

	/* const props = defineProps({
		project: {
			type: Object,
			required: true
		}
	}) */
	
	// const treeFoldersOpen = ref([1])
/* 	const treeOptions = ref({
		fileIcons: {
			css: { prefix: 'fab', icon: 'css3' },
			fav: { prefix: 'fas', icon: 'star' },
			group: { prefix: 'fas', icon: 'ellipsis-h' },
			html: { prefix: 'fab', icon: 'html5' },
			image: { prefix: 'fas', icon: 'file-image' },
			js: { prefix: 'fab', icon: 'js' },
			json: { prefix: 'fas', icon: 'code' },
			md: { prefix: 'fab', icon: 'markdown' },
			node: { prefix: 'fab', icon: 'node-js' },
			pdf: { prefix: 'fas', icon: 'file-pdf' },
			vieo: { prefix: 'fas', icon: 'file-video' },
			vue: { prefix: 'fab', icon: 'vuejs' },
			yarn: { prefix: 'fab', icon: 'yarn' }
		}
	}) */

	const project = computed(() => {
		return projectsStore.project
	})

	const headerImage = computed(() => {
		return project.value.attachments?.header[0]?.uri || headerPlaceholder
	})

	const projectVideo = computed(() => {
		return project.value.attachments?.video?.[0] || null
	})

	const projectPhotos = computed(() => {
		return project.value.attachments?.body || null
	})

	const projectResources = computed(() => {
		return propsStore.projectResources.filter(item => project.value.resources.includes(item.value))
	})

	const showFullsizeImage = (item) => {
		dialogStore.showDialog({
      component: asyncComponents.PhotoViewer,
			width: '1600px',
				props: {
					image: item.uri
				}
    })
	}

	const navigateToPreviousPage = () => {
		stores.routingStore().previousPage()
	}

	const navigateToProject = () => {
		window.location.href = project.link
	}
</script>
