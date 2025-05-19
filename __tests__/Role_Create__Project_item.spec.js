import { shallowMount } from '@vue/test-utils'
import ProjectCreateItem from '@/components/Forms/CreateProject/Project/Project_Create__Item.vue'

describe('Project_Create__Item.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ProjectCreateItem, {
      props: {
        modelValue: {}
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
