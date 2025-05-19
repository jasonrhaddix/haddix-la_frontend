import { shallowMount } from '@vue/test-utils'
import LanguageGraph from './LanguageGraph.vue'

describe('LanguageGraph.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(LanguageGraph, {
      props: {
        value: 75,
        language: 'JavaScript'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
