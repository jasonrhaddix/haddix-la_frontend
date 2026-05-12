import { shallowMount } from '@vue/test-utils'
import Language_Graph from '@/components/_global/Language_Graph.vue'

describe('Language_Graph.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Language_Graph)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
