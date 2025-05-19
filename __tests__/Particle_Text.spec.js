import { shallowMount } from '@vue/test-utils'
import ParticleText from './ParticleText.vue'

describe('ParticleText.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ParticleText, {
      props: {
        text: 'Hello World'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
