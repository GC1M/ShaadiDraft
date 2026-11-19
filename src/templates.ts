import { templates as batchD } from './card/designs-d'
import { templates as batchE } from './card/designs-e'
import { templates as batchF } from './card/designs-f'
import { templates as batchG } from './card/designs-g'
import { templates as batchH } from './card/designs-h'
import { templates as batchI } from './card/designs-i'
import { templates as batchJ } from './card/designs-j'
import { SAMPLES } from './i18n'
import type { CoverPage, EventType, Invite, Lang, Page, Section, SampleText, SectionsPage, SymbolId } from './types'

export interface Template {
  id: string
  name: string
  design: string // key in DESIGNS
  lang: Lang
  symbol: SymbolId
  event: EventType
  also?: SymbolId[] // other sacred figures in the artwork, so the symbol filter finds the card under each
  featured?: true // starred: shown first in the gallery with a badge
  // Replaces sample fields when the card is in the template's own language (e.g. a Nikkah couple, a church wedding).
  override?: Partial<Pick<CoverPage, 'title' | 'hostLine' | 'joiner' | 'time' | 'venue' | 'address' | 'rsvp'>> &
    Partial<Pick<SampleText, 'functions' | 'ceremonies' | 'letter' | 'family' | 'message'>> & { bride?: [string, string]; groom?: [string, string] }
  // The printed card's own words, page by page, used as is when the card is in the template's language.
  pages?: { title: string; sections: Section[] }[]
  // The same pages in every other language: the same pages and sections in the same order, only the words change
  // (sizes come from pages). scripts/languages-check.mjs fails CI when a language is missing or its shape differs.
  tr?: Partial<Record<Lang, { title: string; sections: Pick<Section, 'heading' | 'body'>[] }[]>>
}

export const TEMPLATES: Template[] = [...batchD, ...batchE, ...batchF, ...batchG, ...batchH, ...batchI, ...batchJ]

export const templateById = (id: string) => TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]

let n = 0
const uid = () => `p${Date.now().toString(36)}${(n++).toString(36)}`

export function sectionsPage(title: string, sections: [string, string][]): SectionsPage {
  return { id: uid(), kind: 'sections', title, sections: sections.map(([heading, body]) => ({ heading, body })) }
}

// Sample pages for a template in a language. Weddings get the full kankotri set; other events are one card.
export function samplePages(t: Template, lang: Lang): Page[] {
  if (t.pages) {
    const words = lang === t.lang ? t.pages : (t.tr?.[lang] ?? t.pages)
    return t.pages.map((p, i) => ({
      id: uid(),
      kind: 'sections',
      title: words[i].title,
      sections: p.sections.map((x, j) => ({ ...x, heading: words[i].sections[j].heading, body: words[i].sections[j].body })),
    }))
  }
  const s = SAMPLES[lang]
  const e = t.event
  const o = lang === t.lang ? (t.override ?? {}) : {}
  const lineage = e === 'wedding' || e === 'ring' || e === 'reception'
  const bride = o.bride ?? s.bride
  const groom = o.groom ?? s.groom
  const cover: CoverPage = {
    id: uid(),
    kind: 'cover',
    invocation: s.invocation[t.symbol],
    shlok: t.symbol === 'ganesha' && e === 'wedding' ? s.shlok : '',
    title: o.title ?? s.titles[e],
    hostLine: o.hostLine ?? s.hostLine[e],
    bride: { name: bride[0], parents: lineage ? bride[1] : '' },
    groom: { name: groom[0], parents: lineage ? groom[1] : '' },
    joiner: o.joiner ?? s.joiner,
    date: s.date[e],
    time: o.time ?? s.time[e],
    venue: e === 'save-the-date' ? '' : (o.venue ?? s.venue),
    address: o.address ?? s.address,
    rsvpTitle: s.rsvpTitle,
    rsvp: o.rsvp ?? s.rsvp,
  }
  if (e !== 'wedding') return [cover]
  const { functions, ceremonies, letter, family, message } = { ...s, ...o }
  return [
    cover,
    sectionsPage(functions.title, functions.sections),
    sectionsPage(ceremonies.title, ceremonies.sections),
    sectionsPage(letter.title, [['', letter.body]]),
    sectionsPage(family.title, family.sections),
    sectionsPage(message.title, [['', message.body]]),
  ]
}

export function newInvite(t: Template, lang: Lang = t.lang): Invite {
  return { version: 2, templateId: t.id, lang, format: 'story', scale: 'm', pages: samplePages(t, lang) }
}

const KEY = 'shaadidraft:invite:v2'

export function loadInvite(): Invite | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    return v?.version === 2 ? v : null
  } catch {
    return null // corrupt or unavailable storage: start fresh
  }
}

export function saveInvite(i: Invite) {
  try {
    localStorage.setItem(KEY, JSON.stringify(i))
  } catch {
    // private mode / quota: editing still works, just not persisted
  }
}
