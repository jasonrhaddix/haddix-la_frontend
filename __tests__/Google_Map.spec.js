import { shallowMount } from '@vue/test-utils'
import Component from './Component.vue'

describe('Component.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Component)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
