import flagLoader from '@/utils/helpers/flagLoader'

describe('AC-1.7 utils/helpers/flagLoader', () => {
  const expectedLocales = [
    'en-US', 'zh-CN', 'de-DE', 'es-ES', 'fr-FR', 'it-IT',
    'ja-JP', 'ko-KR', 'pl-PL', 'pt-BR', 'ru-RU'
  ]

  test('exports an object with all expected locale keys', () => {
    expect(Object.keys(flagLoader).sort()).toEqual(expectedLocales.sort())
  })

  test('every value is a non-empty string (Vite resolves .svg imports to URL strings)', () => {
    for (const locale of expectedLocales) {
      const value = flagLoader[locale]
      expect(typeof value).toBe('string')
      expect(value.length).toBeGreaterThan(0)
    }
  })
})
