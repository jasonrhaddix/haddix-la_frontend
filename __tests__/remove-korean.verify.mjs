#!/usr/bin/env node
// Verification script for ticket #3 — "Remove Korean language option".
// Runs against the repo tree at $REPO_ROOT (defaults to two dirs up from this file).
// Zero new dependencies — uses only node built-ins (fs, path, url).
// Each frozen AC from the PRD has exactly one corresponding check below.
// Run via: `node __tests__/remove-korean.verify.mjs`
// Exit code: 0 if every AC passes, 1 otherwise.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO = resolve(__dirname, '..')

const results = []
const record = (id, ok, detail) => results.push({ id, ok, detail })

const read = (rel) => readFileSync(join(REPO, rel), 'utf8')

// ──────────────────────────────────────────────────────────────────────────
// AC-3.1 — Language_Picker dropdown excludes Korean
// ──────────────────────────────────────────────────────────────────────────
;(() => {
  const id = 'AC-3.1'
  try {
    const src = read('src/components/_global/Language_Picker.vue')
    const hasKoCode = /code:\s*['"]ko-KR['"]/.test(src)
    const hasKoShort = /codeShort:\s*['"]ko['"]/.test(src)
    // Count entries by counting the `code:` keys in the languages ref block.
    const block = src.match(/const languages\s*=\s*ref\(\[([\s\S]*?)\]\)/)
    if (!block) {
      record(id, false, 'could not locate `const languages = ref([...])` block')
      return
    }
    const codeMatches = block[1].match(/code:\s*['"][^'"]+['"]/g) || []
    const entryCount = codeMatches.length

    if (hasKoCode) return record(id, false, `'ko-KR' code still present in Language_Picker.vue`)
    if (hasKoShort) return record(id, false, `'ko' codeShort still present in Language_Picker.vue`)
    if (entryCount !== 8) return record(id, false, `languages array has ${entryCount} entries; expected 8`)
    record(id, true, `languages array has 8 entries and no Korean references`)
  } catch (e) {
    record(id, false, `error: ${e.message}`)
  }
})()

// ──────────────────────────────────────────────────────────────────────────
// AC-3.2 — flagLoader has no Korean entry or import
// ──────────────────────────────────────────────────────────────────────────
;(() => {
  const id = 'AC-3.2'
  try {
    const src = read('src/utils/helpers/flagLoader.js')
    const hasKrImport = /import\s+\w+\s+from\s+['"][^'"]*flags\/kr\.svg['"]/.test(src)
    const hasKoKey = /['"]ko-KR['"]\s*:/.test(src)

    // Count keys in the default-exported object.
    const exportBlock = src.match(/export\s+default\s*\{([\s\S]*?)\}/)
    if (!exportBlock) {
      record(id, false, 'could not locate `export default { ... }` block')
      return
    }
    const keyMatches = exportBlock[1].match(/['"][^'"]+['"]\s*:/g) || []
    const keyCount = keyMatches.length

    if (hasKrImport) return record(id, false, `flagLoader.js still imports flags/kr.svg`)
    if (hasKoKey) return record(id, false, `flagLoader.js still has 'ko-KR' key`)
    if (keyCount !== 10) return record(id, false, `flagLoader default export has ${keyCount} keys; expected 10`)
    record(id, true, `flagLoader has 10 keys and no Korean import or key`)
  } catch (e) {
    record(id, false, `error: ${e.message}`)
  }
})()

// ──────────────────────────────────────────────────────────────────────────
// AC-3.3 — i18next-parser locales[] excludes Korean
// ──────────────────────────────────────────────────────────────────────────
;(() => {
  const id = 'AC-3.3'
  try {
    const src = read('i18next-parser.config.js')
    const localesMatch = src.match(/locales:\s*\[([^\]]+)\]/)
    if (!localesMatch) {
      record(id, false, `could not locate locales: [...] in i18next-parser.config.js`)
      return
    }
    const entries = (localesMatch[1].match(/['"][^'"]+['"]/g) || []).map(s => s.slice(1, -1))
    const hasKo = entries.includes('ko-KR')
    if (hasKo) return record(id, false, `i18next-parser locales[] still includes 'ko-KR'`)
    if (entries.length !== 10) return record(id, false, `i18next-parser locales[] has ${entries.length} entries; expected 10`)
    record(id, true, `locales[] has 10 entries and no 'ko-KR'`)
  } catch (e) {
    record(id, false, `error: ${e.message}`)
  }
})()

// ──────────────────────────────────────────────────────────────────────────
// AC-3.4 — Korean locale directory is deleted (with all 4 namespace files)
// ──────────────────────────────────────────────────────────────────────────
;(() => {
  const id = 'AC-3.4'
  try {
    const dir = join(REPO, 'public/localization/locales/ko-KR')
    if (existsSync(dir)) return record(id, false, `directory still exists: ${dir}`)
    const files = ['common.json', 'components.json', 'components_old.json', 'views.json']
    for (const f of files) {
      const full = join(dir, f)
      if (existsSync(full)) return record(id, false, `file still exists: ${full}`)
    }
    record(id, true, `public/localization/locales/ko-KR/ and its 4 namespace files are absent`)
  } catch (e) {
    record(id, false, `error: ${e.message}`)
  }
})()

// ──────────────────────────────────────────────────────────────────────────
// AC-3.5 — Other languages are intact
// ──────────────────────────────────────────────────────────────────────────
;(() => {
  const id = 'AC-3.5'
  try {
    const localesDir = join(REPO, 'public/localization/locales')
    const present = readdirSync(localesDir).filter(name =>
      statSync(join(localesDir, name)).isDirectory()
    )
    const expected = ['de-DE', 'en-US', 'es-ES', 'fr-FR', 'it-IT', 'ja-JP', 'pl-PL', 'pt-BR', 'ru-RU', 'zh-CN']
    const missing = expected.filter(e => !present.includes(e))
    if (missing.length) return record(id, false, `missing expected locale dirs: ${missing.join(', ')}`)
    if (present.includes('ko-KR')) return record(id, false, `ko-KR dir still present`)

    // Picker still contains all 8 originally-listed non-Korean entries.
    const pickerSrc = read('src/components/_global/Language_Picker.vue')
    const pickerExpected = ['en-US', 'de-DE', 'es-ES', 'fr-FR', 'it-IT', 'ja-JP', 'ru-RU', 'zh-CN']
    const pickerMissing = pickerExpected.filter(code => !new RegExp(`code:\\s*['"]${code}['"]`).test(pickerSrc))
    if (pickerMissing.length) return record(id, false, `Language_Picker missing required entries: ${pickerMissing.join(', ')}`)
    record(id, true, `10 non-Korean locale dirs present; picker has all 8 expected non-Korean entries`)
  } catch (e) {
    record(id, false, `error: ${e.message}`)
  }
})()

// ──────────────────────────────────────────────────────────────────────────
// Report
// ──────────────────────────────────────────────────────────────────────────
let allPass = true
for (const r of results) {
  const tag = r.ok ? 'PASS' : 'FAIL'
  if (!r.ok) allPass = false
  // eslint-disable-next-line no-console
  console.log(`[${tag}] ${r.id} — ${r.detail}`)
}
console.log('')
console.log(`Summary: ${results.filter(r => r.ok).length}/${results.length} ACs passing`)
console.log(`Note: AC-3.6 (yarn build succeeds) is verified separately by running 'yarn build'.`)
process.exit(allPass ? 0 : 1)
