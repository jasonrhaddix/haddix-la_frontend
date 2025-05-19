import { shallowMount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

describe('ConfirmationDialog.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const pinia = createPinia()
    const wrapper = shallowMount(ConfirmationDialog, {
      global: {
        plugins: [pinia]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
