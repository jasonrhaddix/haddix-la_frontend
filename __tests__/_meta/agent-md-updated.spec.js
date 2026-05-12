import fs from 'node:fs'
import path from 'node:path'

const agentMd = fs.readFileSync(path.resolve(process.cwd(), 'AGENT.md'), 'utf8')

describe('AC-1.10 AGENT.md reflects new test reality', () => {
  test('the old "Testing — Current Limitation" section is gone', () => {
    expect(agentMd).not.toMatch(/Testing — Current Limitation/)
    // Also catch the body text that asserted no runner was configured
    expect(agentMd).not.toMatch(/There is \*\*no test runner\*\* configured/)
  })

  test('the new Testing section names Vitest', () => {
    expect(agentMd).toMatch(/Vitest/)
  })

  test('the new Testing section documents the three yarn scripts', () => {
    expect(agentMd).toMatch(/yarn test\b/)
    expect(agentMd).toMatch(/yarn test:watch/)
    expect(agentMd).toMatch(/yarn test:coverage/)
  })

  test('critical rule "do NOT use npm" remains intact', () => {
    expect(agentMd).toMatch(/Do NOT use npm/)
  })

  test('critical rule "do NOT add TypeScript" remains intact', () => {
    expect(agentMd).toMatch(/Do NOT add TypeScript/)
  })
})
