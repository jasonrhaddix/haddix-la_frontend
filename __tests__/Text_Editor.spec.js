import { shallowMount } from '@vue/test-utils'
import TextEditor from './TextEditor.vue'

describe('TextEditor.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(TextEditor)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
