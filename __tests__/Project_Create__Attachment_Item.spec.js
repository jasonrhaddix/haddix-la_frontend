import { shallowMount } from '@vue/test-utils'
import CreateAttachmentItem from '@/components/CreateAttachmentItem.vue'

describe('CreateAttachmentItem.vue', () => {
  test('renders correctly with default props', () => {
    const data = {
      file: { type: 'image/png' },
      preview: 'preview.png',
      uri: 'uri.png',
      uploadStatus: 'pending',
      status: 'SUCCESS',
      progress: { total: 100, loaded: 50 }
    }
    const wrapper = shallowMount(CreateAttachmentItem, {
      props: { data }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
