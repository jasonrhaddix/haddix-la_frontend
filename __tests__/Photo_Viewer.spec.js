import { shallowMount } from '@vue/test-utils'
import PhotoViewer from './PhotoViewer.vue'

describe('PhotoViewer.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(PhotoViewer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
