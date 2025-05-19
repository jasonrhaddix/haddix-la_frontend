import { shallowMount } from '@vue/test-utils'
import RoleCreateProjects from '@/components/Forms/CreateProject/Role/Role_Create__Projects.vue'

describe('RoleCreateProjects.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(RoleCreateProjects, {
      props: {
        modelValue: []
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
