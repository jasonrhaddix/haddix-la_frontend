import { shallowMount } from '@vue/test-utils'
import Contact from '@/views/Contact.vue'

describe('Contact.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(Contact)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
