import { shallowMount } from '@vue/test-utils'
import ProjectCreateLanguagePicker from './Project_Create__Language_Picker.vue'

describe('Project_Create__Language_Picker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ProjectCreateLanguagePicker)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
