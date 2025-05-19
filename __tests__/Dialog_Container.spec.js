import { shallowMount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import DialogWrapper from '@/components/DialogWrapper.vue'

describe('DialogWrapper.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(DialogWrapper, {
      global: {
        plugins: [createPinia()],
        stubs: ['v-dialog', 'v-btn']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
