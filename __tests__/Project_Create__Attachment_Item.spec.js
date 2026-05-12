import { shallowMount } from '@vue/test-utils'
import Project_Create__Attachment_Item from '@/components/Forms/CreateProject/Project/Project_Create__Attachment_Item.vue'

describe('Project_Create__Attachment_Item.vue', () => {
  test('renders correctly with default props', () => {
    const data = {
      file: { type: 'image/png' },
      preview: 'preview.png',
      uri: 'uri.png',
      uploadStatus: 'pending',
      status: 'SUCCESS',
      progress: { total: 100, loaded: 50 }
    }
    const wrapper = shallowMount(Project_Create__Attachment_Item, {
      props: { data }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
