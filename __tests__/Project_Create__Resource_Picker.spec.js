import { shallowMount } from '@vue/test-utils'
import CreateResourcePicker from '@/components/CreateResourcePicker.vue'

describe('CreateResourcePicker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(CreateResourcePicker)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
