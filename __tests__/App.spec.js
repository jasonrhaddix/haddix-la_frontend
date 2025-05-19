import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          RouterView: true
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
