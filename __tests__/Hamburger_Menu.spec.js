import { shallowMount } from '@vue/test-utils'
import HamburgerMenu from '@/components/HamburgerMenu.vue'

describe('HamburgerMenu.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(HamburgerMenu, {
      props: { menuState: false }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
