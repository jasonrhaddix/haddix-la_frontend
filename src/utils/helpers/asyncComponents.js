import { defineAsyncComponent, markRaw } from 'vue'

const CreatePicker = markRaw(defineAsyncComponent(() => import('@/components/_global/Create_Picker.vue')))
const CreateProject = markRaw(defineAsyncComponent(() => import('@/components/Forms/CreateProject/Project/Project_Create.vue')))
const CreateRole = markRaw(defineAsyncComponent(() => import('@/components/Forms/CreateProject/Role/Role_Create.vue')))

const ToastMessage = markRaw(defineAsyncComponent(() => import('@/components/_global/Toast/Toast_Message.vue')))

export default {
  CreatePicker,
  CreateProject,
  CreateRole,

  ToastMessage

  /* project: {

  },

  role: {

  }, */
}