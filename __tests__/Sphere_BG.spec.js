import { shallowMount } from '@vue/test-utils'
import SphereBgContainer from './sphere-bg-container.vue'

describe('sphere-bg-container.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(SphereBgContainer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
