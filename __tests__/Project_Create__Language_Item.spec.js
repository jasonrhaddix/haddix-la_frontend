// CreateLanguageItem.spec.js
import { shallowMount } from '@vue/test-utils'
import CreateLanguageItem from '../CreateLanguageItem.vue'

describe('CreateLanguageItem.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(CreateLanguageItem, {
      props: { id: 'test-id' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
