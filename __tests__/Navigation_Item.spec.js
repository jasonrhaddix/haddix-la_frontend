import { shallowMount } from '@vue/test-utils'
import NavigationItem from './NavigationItem.vue'

describe('NavigationItem.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(NavigationItem)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
