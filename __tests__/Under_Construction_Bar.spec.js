import { shallowMount } from '@vue/test-utils'
import UnderConstructionContainer from './UnderConstructionContainer.vue'

describe('UnderConstructionContainer.vue', () => {
  test('renders and matches snapshot', () => {
    const wrapper = shallowMount(UnderConstructionContainer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
