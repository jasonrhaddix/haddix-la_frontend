import { shallowMount } from '@vue/test-utils'
import Role_Create from '@/components/Forms/CreateProject/Role/Role_Create.vue'

describe('Role_Create.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Role_Create, {
      props: { data: {} }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
