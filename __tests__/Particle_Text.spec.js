import { shallowMount } from '@vue/test-utils'
import Particle_Text from '@/components/_global/Particle_Text.vue'

describe('Particle_Text.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Particle_Text, {
      props: { text: 'Sample Text' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
