// RoleCreate.spec.js
import { shallowMount } from '@vue/test-utils'
import RoleCreate from '@/components/RoleCreate.vue'

describe('RoleCreate.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(RoleCreate)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
