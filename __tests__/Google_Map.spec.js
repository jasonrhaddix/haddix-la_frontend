import { shallowMount } from '@vue/test-utils'
import MapComponent from '@/components/MapComponent.vue'

describe('MapComponent.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(MapComponent)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
