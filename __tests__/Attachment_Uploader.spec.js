import { shallowMount } from '@vue/test-utils'
import AttachmentUploader from '@/components/AttachmentUploader.vue'

describe('AttachmentUploader.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(AttachmentUploader)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
