import { shallowMount } from '@vue/test-utils'
import AttahmentUploader from '@/components/AttahmentUploader.vue'

describe('AttahmentUploader.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(AttahmentUploader)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
