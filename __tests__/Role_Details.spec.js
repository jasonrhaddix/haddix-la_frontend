import { shallowMount } from '@vue/test-utils'
import Role_Details from '@/views/Role_Details.vue'

describe('Role_Details.vue', () => {
  test('renders correctly with default state', () => {
    const wrapper = shallowMount(Role_Details)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
