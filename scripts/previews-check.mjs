// Fails when a template's pre-rendered preview (public/templates/previews) no longer matches its sample text,
// design or artwork, so a stale cover never ships silently.
//
//   node scripts/previews-check.mjs              check every template (CI runs this)
//   node scripts/previews-check.mjs --write ids  record ids as fresh (scripts/previews.py calls this after rendering;
//                                                no ids records every template)
//
// A template's fingerprint hashes its sample pages, its design (with Top/Bottom source) and the bytes of every
// public image the design points at.
// ponytail: helpers a design calls from motifs.tsx are not hashed; editing one needs a manual re-render.
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { runnerImport } from 'vite'

const MANIFEST = 'scripts/previews.json'
const opts = { configFile: false, logLevel: 'error' }
const [{ module: tpl }, { module: des }] = await Promise.all([runnerImport('/src/templates.ts', opts), runnerImport('/src/card/designs.tsx', opts)])

function fingerprint(t) {
  const h = createHash('sha256')
  const pages = tpl.newInvite(t).pages.map(({ id, ...p }) => p) // ids are random per call
  const design = JSON.stringify(des.DESIGNS[t.design], (_, v) => (typeof v === 'function' ? String(v) : v))
  h.update(JSON.stringify(pages)).update(design)
  for (const [, path] of design.matchAll(/"\/([^"]+\.(?:png|jpe?g|webp|svg))"/g)) if (existsSync(`public/${path}`)) h.update(readFileSync(`public/${path}`))
  return h.digest('hex').slice(0, 16)
}

const saved = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {}
const args = process.argv.slice(2)
if (args[0] === '--write') {
  const ids = args.length > 1 ? args.slice(1) : tpl.TEMPLATES.map((t) => t.id)
  for (const id of ids) {
    const t = tpl.TEMPLATES.find((x) => x.id === id)
    if (!t) throw new Error(`No template with id ${id}`)
    saved[id] = fingerprint(t)
  }
  const live = Object.entries(saved).filter(([id]) => tpl.TEMPLATES.some((t) => t.id === id)) // drop removed templates
  writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(live.sort()), null, 2) + '\n')
} else {
  const stale = tpl.TEMPLATES.filter((t) => saved[t.id] !== fingerprint(t)).map((t) => t.id)
  if (stale.length) {
    console.error(`Previews out of date: ${stale.join(' ')}\nWith npm run dev running: python3 scripts/previews.py ${stale.join(' ')}`)
    process.exit(1)
  }
  console.log(`All ${tpl.TEMPLATES.length} previews match their templates`)
}
