import { shallowMount } from '@vue/test-utils'
import RoleDetailsView from '@/components/RoleDetailsView.vue'

describe('RoleDetailsView.vue', () => {
  test('renders correctly with default state', () => {
    const wrapper = shallowMount(RoleDetailsView)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
