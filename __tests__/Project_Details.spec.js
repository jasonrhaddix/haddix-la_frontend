// ProjectDetailsView.spec.js
import { shallowMount } from '@vue/test-utils'
import ProjectDetailsView from '@/components/ProjectDetailsView.vue'

describe('ProjectDetailsView.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ProjectDetailsView)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
