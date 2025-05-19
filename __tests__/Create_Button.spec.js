import { shallowMount } from '@vue/test-utils'
import CreateButton from '@/components/CreateButton.vue'

describe('CreateButton.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(CreateButton)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
