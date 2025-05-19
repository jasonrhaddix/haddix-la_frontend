import { shallowMount } from '@vue/test-utils'
import LoginDrawer from '@/components/LoginDrawer.vue'

describe('LoginDrawer.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(LoginDrawer, {
      global: {
        stubs: ['v-navigation-drawer']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
