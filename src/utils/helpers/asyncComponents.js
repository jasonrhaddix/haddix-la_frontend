import { defineAsyncComponent, markRaw } from 'vue'

const CreatePicker = markRaw(defineAsyncComponent(() => import('@/components/_global/Create_Picker.vue')))
const CreateProject = markRaw(defineAsyncComponent(() => import('@/components/Forms/CreateProject/Project/Project_Create.vue')))
const CreateRole = markRaw(defineAsyncComponent(() => import('@/components/Forms/CreateProject/Role/Role_Create.vue')))

const ProjectsSort = markRaw(defineAsyncComponent(() => import('@/components/Projects/Sort/Projects_Sort.vue')))

const ConfirmationDialog = markRaw(defineAsyncComponent(() => import('@/components/_global/Confirmation_Dialog.vue')))

const PhotoViewer = markRaw(defineAsyncComponent(() => import('@/components/_global/Photo_Viewer.vue')))

const ToastMessage = markRaw(defineAsyncComponent(() => import('@/components/_global/Toast/Toast_Message.vue')))

export default {
  CreatePicker,
  CreateProject,
  CreateRole,

  ProjectsSort,

  ConfirmationDialog,

  PhotoViewer,

  ToastMessage
}