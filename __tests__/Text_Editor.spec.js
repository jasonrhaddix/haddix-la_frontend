import { shallowMount } from '@vue/test-utils'
import TextEditor from './TextEditor.vue'

describe('TextEditor.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(TextEditor, {
      global: {
        stubs: ['EditorContent', 'v-icon']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
