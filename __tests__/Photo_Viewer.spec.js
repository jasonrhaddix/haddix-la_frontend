import { shallowMount } from '@vue/test-utils'
import Photo_Viewer from '@/components/_global/Photo_Viewer.vue'

describe('Photo_Viewer.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(Photo_Viewer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
