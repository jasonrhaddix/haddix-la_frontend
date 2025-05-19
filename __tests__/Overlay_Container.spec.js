import { shallowMount } from '@vue/test-utils'
import OverlayDialog from './OverlayDialog.vue'

describe('OverlayDialog.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(OverlayDialog)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
