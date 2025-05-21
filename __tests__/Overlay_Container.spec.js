import { shallowMount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import OverlayDialog from '@/components/OverlayDialog.vue'

describe('OverlayDialog.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(OverlayDialog, {
      global: {
        plugins: [createPinia()],
        stubs: ['v-dialog', 'v-container', 'v-layout', 'v-btn']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
