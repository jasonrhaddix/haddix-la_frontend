import { shallowMount } from '@vue/test-utils'
import Attachment_Uploader from '@/components/_global/Attachment_Uploader.vue'

describe('Attachment_Uploader.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(Attachment_Uploader, {
      props: {
        attachTo: {},
        fileUsageType: 'test'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
