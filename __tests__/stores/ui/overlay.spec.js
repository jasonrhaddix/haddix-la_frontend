import { setActivePinia, createPinia } from 'pinia'
import useOverlayStore from '@/stores/modules/ui/overlay'

beforeEach(() => setActivePinia(createPinia()))

describe('AC-1.8 stores/ui/overlay', () => {
  test('initial state', () => {
    const s = useOverlayStore()
    expect(s.openState).toBe(false)
    expect(s.component).toBe(null)
    expect(s.title).toBe('')
    expect(s.props).toEqual({})
  })

  test('showOverlay and hideOverlay toggle openState', () => {
    const s = useOverlayStore()
    s.showOverlay()
    expect(s.openState).toBe(true)
    s.hideOverlay()
    expect(s.openState).toBe(false)
  })

  test('setState assigns openState directly', () => {
    const s = useOverlayStore()
    s.setState(true)
    expect(s.openState).toBe(true)
  })

  test('setComponent with full payload', () => {
    const s = useOverlayStore()
    s.setComponent({ component: 'Modal', title: 'Hello', props: { foo: 1 } })
    expect(s.component).toBe('Modal')
    expect(s.title).toBe('Hello')
    expect(s.props).toEqual({ foo: 1 })
  })

  test('setComponent with no payload zeroes the fields', () => {
    const s = useOverlayStore()
    s.setComponent({ component: 'Old', title: 'Old', props: { keep: 1 } })
    s.setComponent(undefined)
    expect(s.component).toBe(null)
    expect(s.title).toBe('')
    expect(s.props).toEqual({})
  })
})
