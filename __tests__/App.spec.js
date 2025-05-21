import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: ['RouterView', 'v-app', 'v-main']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
