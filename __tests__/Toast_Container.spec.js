import { shallowMount } from '@vue/test-utils'
import ToastStackWrapper from '@/components/_global/Toast/ToastStackWrapper.vue'

describe('ToastStackWrapper.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(ToastStackWrapper)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
