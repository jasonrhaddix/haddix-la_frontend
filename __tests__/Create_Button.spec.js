import { shallowMount } from '@vue/test-utils'
import CreateButton from '@/components/CreateButton.vue'

describe('CreateButton.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(CreateButton)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
