import { shallowMount } from '@vue/test-utils'
import HamburgerMenu from './hamburger-menu.vue'

describe('hamburger-menu.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(HamburgerMenu)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
