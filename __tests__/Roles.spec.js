import { shallowMount } from '@vue/test-utils'
import RolesView from '@/components/RolesView.vue'

describe('RolesView.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(RolesView)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
