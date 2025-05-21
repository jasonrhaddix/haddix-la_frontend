import { shallowMount } from '@vue/test-utils'
import RolesView from '@/components/RolesView.vue'

describe('RolesView.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(RolesView, {
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
