import { shallowMount } from '@vue/test-utils'
import Hamburger_Menu from '@/components/_global/Hamburger_Menu.vue'

describe('Hamburger_Menu.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(Hamburger_Menu)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
