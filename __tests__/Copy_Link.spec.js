import { shallowMount } from '@vue/test-utils'
import CopyLink from './CopyLink.vue'

describe('CopyLink.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(CopyLink)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
