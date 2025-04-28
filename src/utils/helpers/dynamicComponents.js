import { defineAsyncComponent } from 'vue'

const CreateProject = defineAsyncComponent(() => import('@/components/Forms/CreateProject/Project/Project_Create.vue'))


export default {
  CreateProject
}