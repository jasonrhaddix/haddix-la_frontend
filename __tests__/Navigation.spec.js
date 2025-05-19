import { shallowMount } from '@vue/test-utils'
import NavigationContainer from '@/components/NavigationContainer.vue'

describe('NavigationContainer.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(NavigationContainer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
