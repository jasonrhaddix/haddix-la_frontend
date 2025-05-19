import { shallowMount } from '@vue/test-utils'
import AboutView from './AboutView.vue'

describe('AboutView.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(AboutView, {
      global: {
        stubs: ['FontAwesomeIcon', 'AppButton', 'v-row', 'v-col', 'v-container']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
