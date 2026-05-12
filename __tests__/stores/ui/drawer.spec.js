import { setActivePinia, createPinia } from 'pinia'
import useDrawerStore from '@/stores/modules/ui/drawer'

beforeEach(() => setActivePinia(createPinia()))

describe('AC-1.8 stores/ui/drawer', () => {
  test('initial state', () => {
    const s = useDrawerStore()
    expect(s.openState).toBe(false)
    expect(s.component).toBe(null)
    expect(s.width).toBe(null)
    expect(s.props).toBe(null)
  })

  test('showDrawer sets all fields and opens', () => {
    const s = useDrawerStore()
    s.showDrawer({ component: 'D', width: '300', props: { x: 1 } })
    expect(s.openState).toBe(true)
    expect(s.component).toBe('D')
    expect(s.width).toBe('300')
    expect(s.props).toEqual({ x: 1 })
  })

  test('hideDrawer closes', () => {
    const s = useDrawerStore()
    s.showDrawer({})
    s.hideDrawer()
    expect(s.openState).toBe(false)
  })
})
