import { shallowMount } from '@vue/test-utils'
import LanguagePicker from './Project_Create__Language_Picker.vue'

describe('LanguagePicker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(LanguagePicker, {
      props: {}
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
