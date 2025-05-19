import { shallowMount } from '@vue/test-utils'
import NavigationItem from '@/components/NavigationItem.vue'

describe('navigation-item.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(NavigationItem, {
      props: { text: 'Test Text' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
