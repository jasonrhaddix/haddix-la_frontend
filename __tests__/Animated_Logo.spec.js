import { shallowMount } from '@vue/test-utils'
import Animated_Logo from '@/components/AnimatedLogo/Animated_Logo.vue'

describe('Animated_Logo.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(Animated_Logo)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
