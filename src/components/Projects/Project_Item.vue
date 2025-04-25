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

        <!-- <v-btn
          class="btn edit-btn"
          size="x-small"
          color="darkred"
          icon="edit"
          @click="updateProject" />

        <v-btn
          class="btn delete-btn"
          size="x-small"
          color="darkred"
          icon="close"
          @click="deleteProject" /> -->

        <!-- Old Buttons -->
        <!-- <div
          v-ripple
          class="btn edit-btn"
          @click="updateRecord">
          <v-icon size="22" icon="edit" />
        </div>
        <div
          v-ripple
          class="btn delete-btn"
          @click="deleteProject">
          <v-icon size="26" icon="close" />
        </div> -->
      </div>
      <!-- <div
                class="image-container">
                <div
                    v-for="(item, index) in patterns[0].p"
                    :key="$uuid.v4()"
                    :class="`poly poly-${index}`"
                    :style="{clipPath:`polygon(${item})`}">
                    <v-img
                        contain
                        :src="image"></v-img>
                </div>
                <v-img
                    contain
                    class="hidden-img"
                    :src="image"></v-img>
            </div> -->

      <!-- <div class="title-container" >
                <div class="title-inner">
                    <div class="project-title">
                        <p>{{ client }}</p>
                        <h4>{{ title }}</h4>
                        <h5>{{ subtitle }}</h5>
                        <div class="divider" />
                        <app-btn
                            label="View Project"
                            @click.native.stop="clickItem"
                            @mouseover.native.stop="hover=true"
                            @mouseout.native.stop="hover=false"/>
                    </div>
                </div>
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
            <!-- <p>{{ projectClient }}</p>
            <h4>{{ data.title }}</h4>
            <h5>{{ data.subtitle }}</h5> -->
            <div v-if="clickCallback || data.link" class="divider" />
            <AppButton
              v-if="clickCallback || data.link"
              variant="colorful"
              label="View Project"
              @click.native.stop="clickItem"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import stores from '@/stores'

import AppButton from '@/components/_global/App_Button.vue'

import placeholderImg from '@/assets/app/images/project-placeholder-thumb-blur.jpg'

const projectsStore = stores.projectsStore()
const overlayStore = stores.ui.overlayStore()
const dialogStore = stores.ui.dialogStore()
const toastStore = stores.ui.toastStore()
const userStore = stores.userStore()

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

const updateProject = () => {
  overlayStore.setComponent({
      component: 'Forms/CreateProject/Project/Project_Create.vue',
      title: 'Update Project',
      props: {
        id: props.data._id,
      }
    })

    overlayStore.showOverlay()
}

const deleteProject = () => {
  dialogStore.showDialog({
    component: '_global/Confirmation_Dialog.vue',
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
              component: '_global/Toast/Toast_Message.vue',
              data: {
								title: 'Success',
                message: 'Project deleted successfully!',
                type: 'success'
              }
            })
          } catch (error) {
            toastStore.addToast({
              component: '_global/Toast/Toast_Message.vue',
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
