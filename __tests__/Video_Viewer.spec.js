import { shallowMount } from '@vue/test-utils'
import VideoViewer from './video-viewer.vue'

describe('VideoViewer.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(VideoViewer, {
      props: {
        videos: { uri: 'test-video.mp4' }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
