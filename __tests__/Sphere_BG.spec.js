import { shallowMount } from '@vue/test-utils'
import Sphere_BG from '@/components/SphereBG/Sphere_BG.vue'

describe('Sphere_BG.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Sphere_BG)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
