import fs from 'node:fs'
import path from 'node:path'

function listSpecs(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...listSpecs(full))
    else if (entry.isFile() && entry.name.endsWith('.spec.js')) out.push(full)
  }
  return out
}

const ROOT = path.resolve(process.cwd(), '__tests__')

// SELF_FILE is this spec's own filename. We skip it because it intentionally
// contains the literal token `jest.` in its regex — checking that token would
// be self-defeating.
const SELF_FILE = 'no-jest-globals.spec.js'

describe('No spec file uses Jest globals (regression gate)', () => {
  const files = listSpecs(ROOT).filter((f) => path.basename(f) !== SELF_FILE)

  test('there is at least one spec file to check', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  test.each(files.map((f) => [path.relative(ROOT, f), f]))(
    '%s contains no `jest.` token',
    (_label, file) => {
      const text = fs.readFileSync(file, 'utf8')
      // Disallow `jest.mock`, `jest.fn`, `jest.spyOn`, `jest.clearAllMocks`, etc.
      expect(/\bjest\./.test(text)).toBe(false)
    }
  )
})
