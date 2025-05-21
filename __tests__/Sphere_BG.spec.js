import { shallowMount } from '@vue/test-utils'
import SphereBgContainer from '@/components/sphere-bg-container.vue'

describe('SphereBgContainer', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(SphereBgContainer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
