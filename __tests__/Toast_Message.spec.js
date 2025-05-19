import { shallowMount } from '@vue/test-utils'
import ToastMessage from './ToastMessage.vue'

describe('ToastMessage.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ToastMessage, {
      props: {
        data: {}
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
