import asyncComponents from '@/utils/helpers/asyncComponents'

describe('AC-1.7 utils/helpers/asyncComponents', () => {
  const expectedKeys = [
    'CreatePicker',
    'CreateProject',
    'CreateRole',
    'ProjectsSort',
    'ConfirmationDialog',
    'PhotoViewer',
    'ToastMessage'
  ]

  test('exports the expected component keys', () => {
    expect(Object.keys(asyncComponents).sort()).toEqual(expectedKeys.sort())
  })

  test('every value looks like a Vue async component (object with name or __asyncLoader)', () => {
    for (const key of expectedKeys) {
      const comp = asyncComponents[key]
      expect(comp).toBeDefined()
      expect(typeof comp === 'object' || typeof comp === 'function').toBe(true)
      const looksLikeAsync =
        comp.__asyncLoader !== undefined ||
        comp.setup !== undefined ||
        typeof comp === 'function'
      expect(looksLikeAsync).toBe(true)
    }
  })
})
