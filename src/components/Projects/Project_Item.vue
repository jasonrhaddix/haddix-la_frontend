<template>
  <!-- <div :class="['projects-item', hue]"> -->
  <div :class="['projects-item']">
    <div class="project__inner">
      <div
        v-if="userStore.userIsAuthenticated"
        class="project__edit-btns">

        <v-menu
          :offset="[-39, 11]">
          <template #activator="{ props }">
            <v-btn v-bind="props">
              <v-icon>more_horiz</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              title="Edit"
              @click="updateProject" />

            <v-list-item
              title="Delete"
              style="color: red" 
              @click="deleteProject" />
          </v-list>
        </v-menu>
      </div>
      
      <!-- <div
        class="image-container">
        <div
          v-for="(item, index) in patterns[0].p"
          :key="index"
          :class="`poly poly-${index}`"
          :style="{ clipPath:`polygon(${item})` }">
          <v-img
            contain
            :src="projectThumbnail"></v-img>
        </div>
        <v-img
          contain
          class="hidden-img"
          :src="projectThumbnail"></v-img>
      </div> -->

      <div class="image__main">
        <v-img eager contain :src="projectThumbnail"></v-img>
        <div class="scrim" />
      </div>

      <div class="title-container">
        <div class="title-inner">
          <div class="project-title">
            <h3>{{ projectClient }}</h3>
            <h1>{{ data.title }}</h1>
            <p><i>{{ data.subtitle }}</i></p>
            <div v-if="clickCallback || data.link" class="divider" />
            <AppButton
              v-if="clickCallback || data.link"
              variant="colorful"
              :label="viewProjectLabel"
              @click.native.stop="clickItem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import i18next from 'i18next'

import stores from '@/stores'
import { asyncComponents } from '@/utils/helpers'

import AppButton from '@/components/_global/App_Button.vue'

import placeholderImg from '@/assets/app/images/project-placeholder-thumb-blur.jpg'

const projectsStore = stores.projectsStore()
const overlayStore = stores.ui.overlayStore()
const dialogStore = stores.ui.dialogStore()
const toastStore = stores.ui.toastStore()
const userStore = stores.userStore()

const currentLanguage = ref(i18next.language)
i18next.on('languageChanged', (lng) => {
  currentLanguage.value = lng
})

/* const patterns = [
  {
    p: [
      '0% 0%, 20% 50%, 0% 100%',
      '0% 0%, 20% 0%, 50% 20%, 20% 50%',
      '20% 0%, 75% 0%, 50% 20%',
      '75% 0%, 100% 0%, 100% 20%, 90% 50%, 50% 20%',
      '50% 20%, 90% 50%, 75% 100%, 60% 100%, 20% 50%',
      '100% 20%, 100% 57%, 90% 50%',
      '90% 50%, 100% 57%, 100% 100%, 75% 100%',
      '20% 50%, 60% 100% , 75% 100%, 0% 100%'
    ]

  }
] */

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },

  clickCallback: {
    type: [Function, Promise],
    required: false,
    default: null
  }
})

const projectThumbnail = computed(() => {
  return props.data?.attachments?.thumbnail?.[0]?.uri || placeholderImg
})

function clickItem() {
  if (props.clickCallback) {
    props.clickCallback({
      _id: props.data?._id
    })
  } else {
    var win = window.open(props.link, '_blank')
    win.focus()
  }
}

const projectClient = computed(() => {
  if (!props.data?.client) return ''
  return props.data?.client
    ? props.data?.client
    : props.data?.clientName || props.data?.client
})

const viewProjectLabel = computed(() => {
  const lang = currentLanguage.value
  return i18next.t('common:BUTTONS.VIEW_PROJECT')
})

const updateProject = () => {
  overlayStore.setComponent({
      component: asyncComponents.CreateProject,
      title: 'Update Project',
      props: {
        id: props.data._id,
      }
    })

    overlayStore.showOverlay()
}


const deleteProject = () => {
  dialogStore.showDialog({
    component: asyncComponents.ConfirmationDialog,
    width: 650,
    props: {
      title: 'Delete Project',
      subtitle: 'Are you sure you want to delete this project?',
      confirm: {
        label: 'Delete',
        action: async () => {
          try {
            await projectsStore.deleteProject(props.data._id)

            toastStore.addToast({
              component: asyncComponents.ToastMessage,
              data: {
								title: 'Success',
                message: 'Project deleted successfully!',
                type: 'success'
              }
            })
          } catch (error) {
            toastStore.addToast({
              component: asyncComponents.ToastMessage,
              data: {
                title: 'Error',
                message: 'There was an error deleting the project',
                type: 'error'
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
