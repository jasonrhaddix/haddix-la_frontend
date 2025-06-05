import { shallowMount } from '@vue/test-utils'
import LanguagePicker from '@/components/LanguagePicker.vue'

describe('LanguagePicker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(LanguagePicker)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
