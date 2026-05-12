import fs from 'node:fs'
import path from 'node:path'

const pkgPath = path.resolve(process.cwd(), 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

describe('AC-1.2 runner is installed as devDependency', () => {
  const expected = ['vitest', '@vue/test-utils', 'jsdom', '@vitest/coverage-v8']

  test.each(expected)('%s is in devDependencies', (name) => {
    expect(pkg.devDependencies?.[name]).toBeDefined()
  })

  test.each(expected)('%s is NOT in dependencies', (name) => {
    expect(pkg.dependencies?.[name]).toBeUndefined()
  })
})

describe('AC-1.3 yarn scripts exist', () => {
  test('scripts.test invokes vitest run', () => {
    expect(pkg.scripts?.test).toMatch(/vitest( |$)/)
  })

  test('scripts.test:watch exists', () => {
    expect(pkg.scripts?.['test:watch']).toMatch(/vitest/)
  })

  test('scripts.test:coverage exists and references coverage', () => {
    expect(pkg.scripts?.['test:coverage']).toMatch(/vitest/)
    expect(pkg.scripts?.['test:coverage']).toMatch(/coverage/)
  })
})
