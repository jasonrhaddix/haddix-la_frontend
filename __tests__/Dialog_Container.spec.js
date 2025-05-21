import { shallowMount } from '@vue/test-utils'
import DialogComponent from '@/components/DialogComponent.vue'

describe('DialogComponent.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(DialogComponent)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
