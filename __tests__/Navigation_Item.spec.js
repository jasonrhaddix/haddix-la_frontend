import { shallowMount } from '@vue/test-utils'
import NavigationItem from './navigation-item.vue'

describe('navigation-item.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(NavigationItem)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
