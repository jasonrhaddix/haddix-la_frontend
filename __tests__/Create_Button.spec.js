import { shallowMount } from '@vue/test-utils'
import Create_Button from '@/components/_global/Create_Button.vue'

describe('Create_Button.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Create_Button)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
