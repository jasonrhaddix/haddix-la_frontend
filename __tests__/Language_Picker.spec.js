import { shallowMount } from '@vue/test-utils'
import Language_Picker from '@/components/_global/Language_Picker.vue'

describe('Language_Picker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Language_Picker)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
