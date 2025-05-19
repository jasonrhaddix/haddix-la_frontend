import { shallowMount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'

describe('AboutView.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(AboutView)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
