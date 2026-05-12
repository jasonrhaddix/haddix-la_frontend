import { shallowMount } from '@vue/test-utils'
import Contact_Form from '@/components/Forms/Contact/Contact_Form.vue'

describe('Contact_Form.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Contact_Form)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
