import { shallowMount } from '@vue/test-utils'
import AppButton from './AppButton.vue'

describe('AppButton.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(AppButton, {
      props: { label: 'Test Label' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
