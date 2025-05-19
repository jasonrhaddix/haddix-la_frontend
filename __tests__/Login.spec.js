import { shallowMount } from '@vue/test-utils'
import Login from '@/components/Login.vue'

describe('Login.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Login, {
      global: {
        stubs: ['v-navigation-drawer', 'v-text-field', 'v-btn', 'AppButton']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
