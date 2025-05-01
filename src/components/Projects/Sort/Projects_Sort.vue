<template>
  <div class="projects__sort">

    <div>
      <div class="projects-sort-title">
        Sort Projects
      </div>

      <div>
        <draggable
          v-model="sortedProjects"
          item-key="projectId"
          class="project-sort-list"
          
          @change="itemSort($event)">
          <template #item="{ element }">
            <div class=" project-item">
              <div class="skrim" />
              <div class="project-inner">
                <div class="project-img">
                  <img
                    v-if="element.attachments.thumbnail[0].uri"
                    class="project-thumbnail"
                    :src="element.attachments.thumbnail[0].uri"
                    :alt="`${element.title} thumbnail`"
                    />
                </div>
                <div class="project-title">
                  {{ element.title }}
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import draggable from 'vuedraggable'

import stores from '@/stores/index.js'

const projectsStore = stores.projectsStore()
const typesStore = stores.config.typesStore()

const sortedProjects = ref([])

const filteredProjects = computed(() => {
  return projectsStore.projects.filter(p => {
    if (
      p.type !== typesStore.PROJECT_TYPE__EXPERIMENT
      && (!p.isGuestProject || p.sessionId === userStore.sessionToken)
    )
      return p
  })
})

/* onMounted(() => {
  sortedProjects.value = filteredProjects.value
}) */

const itemSort = (event) => {
  const { newIndex, oldIndex, element } = event.moved
  
  projectsStore.sortProjects({ 
    newIndex,
    oldIndex,
    id: element._id
  })
}

watch(() => projectsStore.projects, (newProjects) => {
  sortedProjects.value = newProjects
}, { deep: true, immediate: true })
</script>

<style lang="scss" scoped>
  .projects__sort {
    padding: 1rem;
  }

  .projects-sort-title {
    background: #333;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
  }

  .project-sort-list {
    height: 90vh;
    overflow: auto;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .project-item {
    position: relative;
    // padding: 1rem;
    margin-bottom: 0.5rem;
    background: #222;
    border: 1px solid #555;
    cursor: grab;

    .skrim {
      top: 0;
      position: absolute;
      height: 100%;
      width: 100%;
    }

    .project-inner {

      .project-img {
        display: flex;
        align-items: center;
        justify-content: center;
        // margin-right: 1rem;

        .project-thumbnail {
          width: 100%;
          object-fit: cover;
        }
      }

      .project-title {
        text-align: center;
        padding: 0.5rem 1rem;
        font-weight: 500;
        text-transform: uppercase;
      }
    }

    &.sortable-chosen {
      .skrim {
        background: {
          color: #333;
          // color: $app-color-grey--light-4;
        }
        border: {
          color: #444;
        }
      }
    }

    // Selected module
    &.sortable-chosen:not(.sortable-ghost) {
      .skrim {
        background: {
          color: transparent;
        }
      }
    }

    &.hover {
      .skrim {
        background: {
          color: #333 !important;
        }
      }
      .project-inner {
        
        .project-thumbnail {
        }
      }
    }
  }
</style>