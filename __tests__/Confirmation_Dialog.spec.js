import { shallowMount } from '@vue/test-utils'
import { ref } from 'vue'
import { vi } from 'vitest'

vi.mock('pinia', async () => {
  const actual = await vi.importActual('pinia')
  return {
    ...actual,
    storeToRefs: () => ({
      props: ref({
        title: 'Are you sure?',
        subtitle: 'This action cannot be undone.',
        cancel: { label: 'Cancel', action: () => {} },
        confirm: { label: 'OK', action: () => {} }
      })
    })
  }
})

vi.mock('@/stores/index.js', () => ({
  __esModule: true,
  default: {
    ui: { dialogStore: () => ({ hideDialog: vi.fn() }) }
  }
}))

import Confirmation_Dialog from '@/components/_global/Confirmation_Dialog.vue'

describe('Confirmation_Dialog.vue', () => {
  test('renders correctly and matches snapshot', () => {
    const wrapper = shallowMount(Confirmation_Dialog)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
