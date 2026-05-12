import { shallowMount } from '@vue/test-utils'
import Create_Picker from '@/components/_global/Create_Picker.vue'

describe('Create_Picker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Create_Picker)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
