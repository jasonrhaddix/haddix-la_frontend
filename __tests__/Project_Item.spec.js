import { shallowMount } from '@vue/test-utils'
import ProjectItem from '@/components/ProjectItem.vue'

describe('ProjectItem.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ProjectItem, {
      props: {
        data: {},
        clickCallback: null
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
