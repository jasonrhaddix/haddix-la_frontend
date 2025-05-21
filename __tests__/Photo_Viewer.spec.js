import { shallowMount } from '@vue/test-utils'
import PhotoViewer from '@/components/PhotoViewer.vue'

describe('PhotoViewer.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(PhotoViewer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
