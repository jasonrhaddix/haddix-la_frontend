import { shallowMount } from '@vue/test-utils'
import RoleCreateProject from './Role_Create__Project.vue'

describe('Role_Create__Project.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(RoleCreateProject)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
