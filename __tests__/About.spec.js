import { shallowMount } from '@vue/test-utils'
import AboutView from './AboutView.vue'

describe('AboutView.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(AboutView, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          AppButton: true,
          'v-row': true,
          'v-col': true,
          'v-container': true
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
