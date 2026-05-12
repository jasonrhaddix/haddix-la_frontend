import { shallowMount } from '@vue/test-utils'
import Toast_Container from '@/components/Containers/Toast_Container.vue'

describe('Toast_Container.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Toast_Container, {
      global: {
        stubs: ['v-snackbar', 'v-icon', 'ToastBase']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
