import { shallowMount } from '@vue/test-utils'
import Workflows from '@/views/Workflows.vue'

describe('Workflows.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Workflows)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
