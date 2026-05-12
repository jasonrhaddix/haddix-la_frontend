import { shallowMount } from '@vue/test-utils'
import Labs from '@/views/Labs.vue'

describe('Labs.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Labs)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
