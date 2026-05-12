import { setActivePinia, createPinia } from 'pinia'
import { vi } from 'vitest'

// Stub the stores barrel so `stores.config.typesStore()` returns a default delay.
vi.mock('@/stores/', () => ({
  default: {
    config: {
      typesStore: () => ({ UI__TOAST__DELAY__DEFAULT: 3000 })
    }
  }
}))

import useToastStore from '@/stores/modules/ui/toast'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('AC-1.8 stores/ui/toast', () => {
  test('initial state', () => {
    const s = useToastStore()
    expect(s.currentToasts).toEqual([])
  })

  test('addToast appends a toast with id+open flags', () => {
    const s = useToastStore()
    s.addToast({ message: 'hi', persist: true })
    expect(s.currentToasts).toHaveLength(1)
    const t = s.currentToasts[0]
    expect(t.message).toBe('hi')
    expect(t.open).toBe(true)
    expect(typeof t.id).toBe('number')
  })

  test('non-persistent toast auto-clears after timeout', () => {
    const s = useToastStore()
    s.addToast({ message: 'auto' })
    expect(s.currentToasts).toHaveLength(1)
    vi.advanceTimersByTime(3000)
    expect(s.currentToasts).toHaveLength(0)
  })

  test('clearToast(id) removes a single toast by id', () => {
    const s = useToastStore()
    s.addToast({ message: 'a', persist: true })
    // advance fake clock so the second toast gets a distinct Date.now() id
    vi.advanceTimersByTime(1)
    s.addToast({ message: 'b', persist: true })
    const firstId = s.currentToasts[0].id
    s.clearToast(firstId)
    expect(s.currentToasts).toHaveLength(1)
    expect(s.currentToasts[0].message).toBe('b')
  })

  test('clearAllToasts empties the list', () => {
    const s = useToastStore()
    s.addToast({ message: 'a', persist: true })
    vi.advanceTimersByTime(1)
    s.addToast({ message: 'b', persist: true })
    s.clearAllToasts()
    expect(s.currentToasts).toEqual([])
  })

  test('clearAllPersistentToasts removes persist:true entries only', () => {
    const s = useToastStore()
    s.addToast({ message: 'p', persist: true })
    // Force unique ids if Date.now() collides
    vi.advanceTimersByTime(1)
    s.addToast({ message: 't', persist: false })
    s.clearAllPersistentToasts()
    const remaining = s.currentToasts.map(t => t.message)
    expect(remaining).toEqual(['t'])
  })
})
