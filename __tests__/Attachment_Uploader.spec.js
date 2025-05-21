import { shallowMount } from '@vue/test-utils'
import AttahmentUploader from '@/components/AttahmentUploader.vue'

describe('AttahmentUploader.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(AttahmentUploader, {
      props: {
        attachTo: {},
        fileUsageType: 'test'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
