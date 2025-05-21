import { shallowMount } from '@vue/test-utils'
import LabsView from './LabsView.vue'

describe('LabsView.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(LabsView)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
