import { shallowMount } from '@vue/test-utils'
import AnimatedLogoContainer from './AnimatedLogoContainer.vue'

describe('AnimatedLogoContainer.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(AnimatedLogoContainer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
