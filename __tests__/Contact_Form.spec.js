import { shallowMount } from '@vue/test-utils'
import ContactForm from '@/components/ContactForm.vue'

describe('ContactForm.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ContactForm)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
