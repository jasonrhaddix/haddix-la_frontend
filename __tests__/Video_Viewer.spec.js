import { shallowMount } from '@vue/test-utils'
import Video_Viewer from '@/components/_global/Video_Viewer.vue'

describe('Video_Viewer.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Video_Viewer, {
      props: {
        videos: { uri: 'test-video.mp4' }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
