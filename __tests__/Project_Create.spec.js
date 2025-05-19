import { shallowMount } from '@vue/test-utils'
import ProjectCreate from './ProjectCreate.vue'

describe('ProjectCreate.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ProjectCreate)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
