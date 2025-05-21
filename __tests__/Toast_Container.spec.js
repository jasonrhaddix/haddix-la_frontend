import { shallowMount } from '@vue/test-utils'
import ToastStackWrapper from './ToastStackWrapper.vue'

describe('ToastStackWrapper.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ToastStackWrapper, {
      global: {
        stubs: ['v-snackbar', 'v-icon', 'ToastBase']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
