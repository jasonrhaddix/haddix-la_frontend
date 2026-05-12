import helperObjects from '@/utils/helpers/helperObjects'

const { deepDiff, deepDiffRoles } = helperObjects

describe('AC-1.7 utils/helpers/helperObjects — deepDiff', () => {
  test('returns undefined for equal primitives', () => {
    expect(deepDiff(1, 1)).toBeUndefined()
    expect(deepDiff('x', 'x')).toBeUndefined()
  })

  test('returns the right side when primitives differ', () => {
    expect(deepDiff(1, 2)).toBe(2)
    expect(deepDiff('a', 'b')).toBe('b')
  })

  test('returns undefined for deeply equal objects', () => {
    expect(deepDiff({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBeUndefined()
  })

  test('returns the differing key for a single-level change', () => {
    expect(deepDiff({ a: 1, b: 2 }, { a: 1, b: 3 })).toEqual({ b: 3 })
  })

  test('marks removed keys as undefined', () => {
    expect(deepDiff({ a: 1, b: 2 }, { a: 1 })).toEqual({ b: undefined })
  })

  test('handles array element diffs', () => {
    expect(deepDiff([1, 2, 3], [1, 2, 4])).toEqual([4])
  })

  test('returns undefined when array contents are identical', () => {
    expect(deepDiff([1, 2, 3], [1, 2, 3])).toBeUndefined()
  })

  test('handles nested object diffs', () => {
    expect(deepDiff({ a: { b: 1, c: 2 } }, { a: { b: 1, c: 9 } })).toEqual({ a: { c: 9 } })
  })
})

describe('AC-1.7 utils/helpers/helperObjects — deepDiffRoles', () => {
  test('returns undefined for deeply equal payloads', () => {
    const a = { projects: [{ id: 1, name: 'p1' }] }
    const b = { projects: [{ id: 1, name: 'p1' }] }
    expect(deepDiffRoles(a, b)).toBeUndefined()
  })

  test('overwrites attachments wholesale when they differ', () => {
    const a = { projects: [{ id: 1, attachments: { keepMe: 1 } }] }
    const b = { projects: [{ id: 1, attachments: { newOnly: 2 } }] }
    const diff = deepDiffRoles(a, b)
    expect(diff).toBeDefined()
    expect(diff.projects[0].attachments).toEqual({ newOnly: 2 })
  })

  test('reports a simple top-level scalar change', () => {
    expect(deepDiffRoles({ name: 'a' }, { name: 'b' })).toEqual({ name: 'b' })
  })
})
