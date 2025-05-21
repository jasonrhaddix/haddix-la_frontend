import { shallowMount } from '@vue/test-utils'
import ContactView from '@/components/ContactView.vue'

describe('ContactView.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(ContactView)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
