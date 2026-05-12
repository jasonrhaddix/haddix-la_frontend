import { shallowMount } from '@vue/test-utils'
import Text_Editor from '@/components/_global/Text_Editor.vue'

describe('Text_Editor.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(Text_Editor)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
