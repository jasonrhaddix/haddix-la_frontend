import { shallowMount } from '@vue/test-utils'
import Projects_Sort from '@/components/Projects/Sort/Projects_Sort.vue'

describe('Projects_Sort.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(Projects_Sort, {
      global: {
        stubs: ['draggable']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
