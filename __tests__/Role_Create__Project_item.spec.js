import { shallowMount } from '@vue/test-utils'
import RoleCreateItem from './RoleCreateItem.vue'

describe('RoleCreateItem.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(RoleCreateItem, {
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
