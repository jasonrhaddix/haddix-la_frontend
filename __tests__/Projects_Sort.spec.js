import { shallowMount } from '@vue/test-utils'
import ProjectsSort from './ProjectsSort.vue'

describe('ProjectsSort.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(ProjectsSort, {
      global: {
        stubs: ['draggable']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
