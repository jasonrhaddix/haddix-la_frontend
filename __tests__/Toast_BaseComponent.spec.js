import { shallowMount } from '@vue/test-utils'
import ToastContent from './ToastContent.vue'

describe('ToastContent.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ToastContent)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
