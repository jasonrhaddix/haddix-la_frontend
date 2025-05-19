import { shallowMount } from '@vue/test-utils'
import CreateLanguageItem from './CreateLanguageItem.vue'

describe('CreateLanguageItem.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(CreateLanguageItem, {
      props: {
        id: '1',
        value: '50',
        language: 'en'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
