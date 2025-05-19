import { shallowMount } from '@vue/test-utils'
import OverlayDialog from '@/components/OverlayDialog.vue'

describe('OverlayDialog.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(OverlayDialog)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
