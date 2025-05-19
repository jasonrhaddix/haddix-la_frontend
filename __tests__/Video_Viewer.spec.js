import { shallowMount } from '@vue/test-utils'
import VideoViewer from './VideoViewer.vue'

describe('video-viewer', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(VideoViewer, {
      props: {
        videos: { uri: 'http://example.com/video.mp4' }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
