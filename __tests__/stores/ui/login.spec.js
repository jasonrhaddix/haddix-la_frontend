import { setActivePinia, createPinia } from 'pinia'
import useLoginStore from '@/stores/modules/ui/login'

beforeEach(() => setActivePinia(createPinia()))

describe('AC-1.8 stores/ui/login', () => {
  test('initial state', () => {
    const s = useLoginStore()
    expect(s.openState).toBe(false)
  })

  test('showLogin opens', () => {
    const s = useLoginStore()
    s.showLogin()
    expect(s.openState).toBe(true)
  })

  test('hideLogin closes', () => {
    const s = useLoginStore()
    s.showLogin()
    s.hideLogin()
    expect(s.openState).toBe(false)
  })

  test('setState passes through explicit state', () => {
    const s = useLoginStore()
    s.setState(true)
    expect(s.openState).toBe(true)
    s.setState(false)
    expect(s.openState).toBe(false)
  })
})
