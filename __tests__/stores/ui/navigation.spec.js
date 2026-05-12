import { setActivePinia, createPinia } from 'pinia'
import useNavigationStore from '@/stores/modules/ui/navigation'

beforeEach(() => setActivePinia(createPinia()))

describe('AC-1.8 stores/ui/navigation', () => {
  test('initial state', () => {
    const s = useNavigationStore()
    expect(s.isEnabled).toBe(true)
    expect(s.openState).toBe(false)
  })

  test('show/hide/toggle navigation flow', () => {
    const s = useNavigationStore()
    s.showNavigation()
    expect(s.openState).toBe(true)
    s.hideNavigation()
    expect(s.openState).toBe(false)
    s.toggleNavigation()
    expect(s.openState).toBe(true)
    s.toggleNavigation()
    expect(s.openState).toBe(false)
  })

  test('enable / disable (no delay) toggles isEnabled', () => {
    const s = useNavigationStore()
    s.disableNavigation()
    expect(s.isEnabled).toBe(false)
    s.enableNavigation()
    expect(s.isEnabled).toBe(true)
  })

  // NOTE: disableNavigation(delay) references an undefined identifier `enableDelay`
  // in navigation.js:37. The delay branch is intentionally not exercised here.
  // Filed as a follow-up in dev-summary.md.
})
