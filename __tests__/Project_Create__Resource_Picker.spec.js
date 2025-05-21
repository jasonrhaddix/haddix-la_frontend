// CreateResourcePicker.spec.js
import { shallowMount } from '@vue/test-utils'
import CreateResourcePicker from './CreateResourcePicker.vue'

jest.mock('@/stores', () => ({
  default: {
    config: {
      propsStore: () => ({ projectResources: [] })
    }
  }
}))

describe('CreateResourcePicker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(CreateResourcePicker)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
