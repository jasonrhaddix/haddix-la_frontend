import { shallowMount } from '@vue/test-utils'
import Navigation from '@/components/Navigation/Navigation.vue'

describe('Navigation.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Navigation)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
