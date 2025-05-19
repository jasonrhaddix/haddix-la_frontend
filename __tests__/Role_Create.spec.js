import { shallowMount } from '@vue/test-utils'
import RoleCreate from '@/components/Forms/CreateRole/Role_Create.vue'

describe('Role_Create.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(RoleCreate)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
