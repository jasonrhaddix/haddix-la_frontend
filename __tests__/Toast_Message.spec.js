import { shallowMount } from '@vue/test-utils'
import Toast_Message from '@/components/_global/Toast/Toast_Message.vue'

describe('Toast_Message.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(Toast_Message, {
      props: {
        data: {}
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
