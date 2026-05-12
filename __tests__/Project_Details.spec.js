import { shallowMount } from '@vue/test-utils'
import Project_Details from '@/views/Project_Details.vue'

describe('Project_Details.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Project_Details)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
