import { shallowMount } from '@vue/test-utils'
import CreateLanguageItem from '@/components/CreateLanguageItem.vue'

describe('CreateLanguageItem.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(CreateLanguageItem, {
      props: {
        id: 'test-id'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
