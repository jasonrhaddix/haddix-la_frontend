import { shallowMount } from '@vue/test-utils'
import Copy_Link from '@/components/_global/Copy_Link.vue'

describe('Copy_Link.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Copy_Link)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
