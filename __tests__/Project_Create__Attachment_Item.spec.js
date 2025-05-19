import { shallowMount } from '@vue/test-utils'
import CreateAttachmentItem from './CreateAttachmentItem.vue'

describe('CreateAttachmentItem.vue', () => {
  test('renders correctly', () => {
    const data = {
      file: { type: '' },
      preview: '',
      uri: '',
      progress: {},
      status: '',
      uploadStatus: ''
    }
    const wrapper = shallowMount(CreateAttachmentItem, {
      props: { data }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
