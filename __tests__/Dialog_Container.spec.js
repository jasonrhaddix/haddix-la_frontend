import { shallowMount } from '@vue/test-utils'
import Dialog_Container from '@/components/Containers/Dialog_Container.vue'

describe('Dialog_Container.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Dialog_Container)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
