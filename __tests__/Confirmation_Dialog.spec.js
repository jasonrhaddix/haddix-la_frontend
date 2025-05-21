import { shallowMount } from '@vue/test-utils'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

describe('ConfirmationDialog.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(ConfirmationDialog)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
