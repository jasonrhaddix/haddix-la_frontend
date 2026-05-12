import { shallowMount } from '@vue/test-utils'
import Project_Create__Language_Picker from '@/components/Forms/CreateProject/Project/Project_Create__Language_Picker.vue'

describe('Project_Create__Language_Picker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Project_Create__Language_Picker, {
      props: {}
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
