import { shallowMount } from '@vue/test-utils'
import ContactView from '@/components/ContactView.vue'

describe('ContactView.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ContactView)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
