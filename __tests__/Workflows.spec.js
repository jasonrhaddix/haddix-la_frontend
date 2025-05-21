import { shallowMount } from '@vue/test-utils'
import WorkflowsView from './WorkflowsView.vue'

describe('WorkflowsView.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(WorkflowsView)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
