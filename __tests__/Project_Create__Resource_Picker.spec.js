import { shallowMount } from '@vue/test-utils'
import { vi } from 'vitest'

vi.mock('@/stores', () => ({
  default: {
    config: {
      propsStore: () => ({ projectResources: [] })
    }
  }
}))

import Project_Create__Resource_Picker from '@/components/Forms/CreateProject/Project/Project_Create__Resource_Picker.vue'

describe('Project_Create__Resource_Picker.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Project_Create__Resource_Picker)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
