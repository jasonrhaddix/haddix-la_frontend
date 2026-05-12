import { shallowMount } from '@vue/test-utils'
import Roles from '@/views/Roles.vue'

describe('Roles.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Roles, {
      global: {
        stubs: [
          'CreateButton',
          'CopyLink',
          'v-data-table',
          'v-btn',
          'v-menu',
          'v-list',
          'v-list-item'
        ]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
