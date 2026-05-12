import { shallowMount } from '@vue/test-utils'
import { vi } from 'vitest'

vi.mock('pinia', async () => {
  const actual = await vi.importActual('pinia')
  return {
    ...actual,
    storeToRefs: () => ({
      openState: { value: false },
      component: { value: 'div' },
      width: { value: '300' },
      props: { value: {} }
    })
  }
})

vi.mock('@/stores/index.js', () => ({
  __esModule: true,
  default: {
    ui: {
      drawerStore: () => ({
        hideDrawer: vi.fn()
      })
    }
  }
}))

import Drawer_Container from '@/components/Containers/Drawer_Container.vue'

describe('Drawer_Container.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Drawer_Container)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
