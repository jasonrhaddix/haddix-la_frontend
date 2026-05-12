import { shallowMount } from '@vue/test-utils'
import Under_Construction_Bar from '@/components/_global/Under_Construction_Bar.vue'

describe('Under_Construction_Bar.vue', () => {
  test('renders and matches snapshot', () => {
    const wrapper = shallowMount(Under_Construction_Bar)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
