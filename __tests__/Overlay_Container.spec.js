import { shallowMount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import Overlay_Container from '@/components/Containers/Overlay_Container.vue'

describe('Overlay_Container.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(Overlay_Container, {
      global: {
        plugins: [createPinia()],
        stubs: ['v-dialog', 'v-container', 'v-layout', 'v-btn']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
