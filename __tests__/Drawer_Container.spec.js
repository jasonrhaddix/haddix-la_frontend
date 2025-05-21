import { shallowMount } from '@vue/test-utils'
import Drawer from '@/components/Drawer.vue'

jest.mock('pinia', () => ({
  storeToRefs: () => ({
    openState: { value: false },
    component: { value: 'div' },
    width: { value: '300' },
    props: { value: {} }
  })
}))

jest.mock('@/stores/index.js', () => ({
  __esModule: true,
  default: {
    ui: {
      drawerStore: () => ({
        hideDrawer: jest.fn()
      })
    }
  }
}))

describe('Drawer.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Drawer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
