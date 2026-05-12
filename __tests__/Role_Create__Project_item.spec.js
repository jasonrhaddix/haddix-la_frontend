import { shallowMount } from '@vue/test-utils'
import Role_Create__Project_item from '@/components/Forms/CreateProject/Role/Role_Create__Project_item.vue'

describe('Role_Create__Project_item.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Role_Create__Project_item, {
      props: {
        modelValue: {
          id: '1',
          projectId: 'p1',
          roleId: 'r1',
          attachments: {}
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
