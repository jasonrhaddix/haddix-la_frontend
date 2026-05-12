import { shallowMount } from '@vue/test-utils'
import Role_Create__Projects from '@/components/Forms/CreateProject/Role/Role_Create__Projects.vue'

describe('Role_Create__Projects.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Role_Create__Projects)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
