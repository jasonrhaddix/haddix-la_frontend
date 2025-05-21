import { shallowMount } from '@vue/test-utils'
import CreatePicker from '@/components/CreatePicker.vue'

describe('CreatePicker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(CreatePicker)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
