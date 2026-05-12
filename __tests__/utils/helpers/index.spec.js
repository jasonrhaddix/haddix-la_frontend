import * as helpers from '@/utils/helpers'

describe('AC-1.7 utils/helpers (barrel)', () => {
  test('re-exports objectHelpers', () => {
    expect(helpers.objectHelpers).toBeDefined()
    expect(typeof helpers.objectHelpers.deepDiff).toBe('function')
    expect(typeof helpers.objectHelpers.deepDiffRoles).toBe('function')
  })

  test('re-exports asyncComponents', () => {
    expect(helpers.asyncComponents).toBeDefined()
    expect(typeof helpers.asyncComponents).toBe('object')
  })
})
