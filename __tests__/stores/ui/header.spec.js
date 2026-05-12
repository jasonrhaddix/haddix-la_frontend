import { setActivePinia, createPinia } from 'pinia'
import useHeaderStore from '@/stores/modules/ui/header'

beforeEach(() => setActivePinia(createPinia()))

describe('AC-1.8 stores/ui/header', () => {
  test('initial state', () => {
    const s = useHeaderStore()
    expect(s.openState).toBe(false)
    expect(s.title).toBe(null)
  })

  test('showHeader and hideHeader toggle openState', () => {
    const s = useHeaderStore()
    s.showHeader()
    expect(s.openState).toBe(true)
    s.hideHeader()
    expect(s.openState).toBe(false)
  })

  test('setTitle and removeTitle manage the title field', () => {
    const s = useHeaderStore()
    s.setTitle('My Title')
    expect(s.title).toBe('My Title')
    s.removeTitle()
    expect(s.title).toBe(null)
  })
})
