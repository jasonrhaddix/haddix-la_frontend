import { shallowMount } from '@vue/test-utils'
import ProjectsSort from '@/components/ProjectsSort.vue'

describe('ProjectsSort.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(ProjectsSort, {
      global: {
        stubs: {
          draggable: true
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
