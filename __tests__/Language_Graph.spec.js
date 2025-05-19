import { shallowMount } from '@vue/test-utils'
import LanguageGraph from './LanguageGraph.vue'

describe('LanguageGraph.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(LanguageGraph)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
