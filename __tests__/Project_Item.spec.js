import { shallowMount } from '@vue/test-utils'
import ProjectsItem from '@/components/ProjectsItem.vue'

describe('ProjectsItem.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ProjectsItem)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
