import { setActivePinia, createPinia } from 'pinia'
import useDialogStore from '@/stores/modules/ui/dialog'

beforeEach(() => setActivePinia(createPinia()))

describe('AC-1.8 stores/ui/dialog', () => {
  test('initial state', () => {
    const s = useDialogStore()
    expect(s.openState).toBe(false)
    expect(s.component).toBe(null)
    expect(s.width).toBe(null)
    expect(s.props).toBe(null)
  })

  test('showDialog with full payload sets all fields and opens', () => {
    const s = useDialogStore()
    s.showDialog({ component: 'MyComp', width: '500', props: { foo: 1 } })
    expect(s.openState).toBe(true)
    expect(s.component).toBe('MyComp')
    expect(s.width).toBe('500')
    expect(s.props).toEqual({ foo: 1 })
  })

  test('showDialog with empty payload still opens', () => {
    const s = useDialogStore()
    s.showDialog({})
    expect(s.openState).toBe(true)
  })

  test('hideDialog closes', () => {
    const s = useDialogStore()
    s.showDialog({ component: 'X' })
    s.hideDialog()
    expect(s.openState).toBe(false)
  })
})
