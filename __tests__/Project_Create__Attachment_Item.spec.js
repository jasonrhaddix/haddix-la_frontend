import { shallowMount } from '@vue/test-utils'
import CreateAttachmentItem from '@/components/CreateAttachmentItem.vue'

describe('CreateAttachmentItem.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(CreateAttachmentItem, {
      props: {
        data: {}
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
