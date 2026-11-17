import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { LANGS } from '../i18n'
import { templateById } from '../templates'
import type { CoverPage, Format, Invite, Lang, Page, SectionsPage, SymbolId } from '../types'
import { DESIGNS, type Design } from './designs'
import { Emblem, Flourish } from './motifs'

export const SIZES: Record<Format, { w: number; h: number }> = {
  story: { w: 540, h: 960 }, // 9:16, exported at 2x = 1080 x 1920
  print: { w: 450, h: 630 }, // 5:7, exported at 4x = 1800 x 2520
}
const SCALE = { s: 0.9, m: 1, l: 1.1 }

// Any script can appear in any field (a Bismillah line on an English card, a Gurmukhi ੴ...),
// so every stack ends with one face per script.
const SCRIPTS = '"Amiri", "Tiro Devanagari Hindi", "Noto Serif Gujarati", "Tiro Gurmukhi", "Tiro Tamil", serif'
const DANDA: Lang[] = ['hi', 'mr', 'gu', 'pa']

interface Look {
  d: Design
  lang: Lang
  f: { title: string; heading: string; body: string; names: string }
}

function look(design: Design, lang: Lang): Look {
  const L = LANGS[lang]
  const pick = (latin: string, indic: string) => `${indic ? indic + ', ' : ''}${latin}, ${SCRIPTS}`
  return {
    d: design,
    lang,
    f: {
      title: pick(design.fonts.title, L.title),
      heading: pick(design.fonts.heading, L.body),
      body: pick(design.fonts.body, L.body),
      names: pick(design.fonts.names, L.title),
    },
  }
}

// "\n" = new line, *word* = accent colour.
function Rich({ text, accent }: { text: string; accent: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i} style={{ display: 'block' }}>
          {line.split(/(\*[^*]+\*)/).map((part, j) =>
            part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
              <span key={j} style={{ color: accent, fontWeight: 700 }}>
                {part.slice(1, -1)}
              </span>
            ) : (
              part
            ),
          )}
        </span>
      ))}
    </>
  )
}

function Heading({ x, children, size = 1.05 }: { x: Look; children: string; size?: number }) {
  if (!children.trim()) return null
  const text = DANDA.includes(x.lang) ? `॥ ${children} ॥` : children
  return (
    <p style={{ fontFamily: x.f.heading, color: x.d.colors.heading, fontSize: `${size}em`, fontWeight: 700, letterSpacing: x.lang === 'en' ? '0.06em' : 0 }}>
      {text}
    </p>
  )
}

const P = ({ show, style, children }: { show: boolean; style: CSSProperties; children: ReactNode }) => (show ? <div style={style}>{children}</div> : null)

function Cover({ x, p, symbol }: { x: Look; p: CoverPage; symbol: SymbolId }) {
  const c = x.d.colors
  const name: CSSProperties = { fontFamily: x.f.names, color: c.heading, fontSize: '1.95em', lineHeight: 1.2 }
  return (
    <>
      <P show={!!p.invocation} style={{ fontSize: '0.92em', color: c.heading, fontWeight: 600 }}>
        {p.invocation}
      </P>
      <P show={!!p.shlok} style={{ fontSize: '0.76em', color: c.muted, lineHeight: 1.35 }}>
        <Rich text={p.shlok} accent={c.accent} />
      </P>
      <div style={{ width: '3.4em', alignSelf: 'center' }}>
        <Emblem symbol={symbol} color={c.title} accent={c.accent} size="100%" />
      </div>
      <P show={!!p.title} style={{ fontFamily: x.f.title, color: c.title, fontSize: '2.5em', lineHeight: 1.15 }}>
        {p.title}
      </P>
      <P show={!!p.hostLine} style={{ fontSize: '0.92em', lineHeight: 1.4 }}>
        <Rich text={p.hostLine} accent={c.accent} />
      </P>
      <div>
        <P show={!!p.bride.name} style={name}>
          {p.bride.name}
        </P>
        <P show={!!p.bride.parents} style={{ fontSize: '0.8em', color: c.muted }}>
          {p.bride.parents}
        </P>
        <P show={!!p.joiner} style={{ fontFamily: x.f.names, color: c.title, fontSize: '1.1em', margin: '0.15em 0' }}>
          {p.joiner}
        </P>
        <P show={!!p.groom.name} style={name}>
          {p.groom.name}
        </P>
        <P show={!!p.groom.parents} style={{ fontSize: '0.8em', color: c.muted }}>
          {p.groom.parents}
        </P>
      </div>
      <div style={{ width: '9em', alignSelf: 'center' }}>
        <Flourish color={c.heading} width="100%" />
      </div>
      <div>
        <P show={!!p.date} style={{ fontFamily: x.f.heading, color: c.heading, fontSize: '1.05em', fontWeight: 700 }}>
          {p.date}
        </P>
        <P show={!!p.time} style={{ fontSize: '0.92em' }}>
          <Rich text={p.time} accent={c.accent} />
        </P>
        <P show={!!p.venue} style={{ fontSize: '1em', fontWeight: 700, marginTop: '0.3em' }}>
          {p.venue}
        </P>
        <P show={!!p.address} style={{ fontSize: '0.85em' }}>
          {p.address}
        </P>
      </div>
      {p.rsvp.trim() && (
        <div>
          <Heading x={x} size={0.95}>
            {p.rsvpTitle}
          </Heading>
          <div style={{ fontSize: '0.85em', lineHeight: 1.4 }}>
            <Rich text={p.rsvp} accent={c.accent} />
          </div>
        </div>
      )}
    </>
  )
}

type Sec = SectionsPage['sections'][number]
const lineCount = (b: string) => b.split('\n').length

function Sections({ x, p }: { x: Look; p: SectionsPage }) {
  const c = x.d.colors
  const short = (s: Sec) => !!s.heading && lineCount(s.body) <= 5 && s.heading.length < 24
  // Pair consecutive short sections side by side, as kankotris do; long ones take the full width.
  const rows: Sec[][] = []
  for (let i = 0; i < p.sections.length; i++) {
    const a = p.sections[i]
    const b = p.sections[i + 1]
    if (b && short(a) && short(b)) {
      rows.push([a, b])
      i++
    } else rows.push([a])
  }
  return (
    <>
      <P show={!!p.title} style={{ fontFamily: x.f.title, color: c.title, fontSize: '2.3em', lineHeight: 1.15 }}>
        {p.title}
      </P>
      <div style={{ width: '9em', alignSelf: 'center' }}>
        <Flourish color={c.heading} width="100%" />
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: '1em', width: '100%' }}>
          {row.map((s, j) => (
            <div key={j} style={{ flex: 1, minWidth: 0 }}>
              <Heading x={x}>{s.heading}</Heading>
              <div style={{ fontSize: '0.88em', lineHeight: 1.5, columnCount: lineCount(s.body) > 6 ? 2 : 1, columnGap: '1.2em' }}>
                <Rich text={s.body} accent={c.accent} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export function CardPage({ invite, page }: { invite: Invite; page: Page }) {
  const t = templateById(invite.templateId)
  const d = DESIGNS[t.design]
  const { w, h } = SIZES[invite.format]
  const safe = d.safe[invite.format]
  const x = look(d, invite.lang)
  const base = w / 30
  const box = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  // Shrink text until it fits the safe area, so long family lists never spill onto the artwork.
  useLayoutEffect(() => {
    const fit = () => {
      const b = box.current
      const el = inner.current
      if (!b || !el) return
      let k = SCALE[invite.scale]
      el.style.fontSize = `${base * k}px`
      while (el.scrollHeight > b.clientHeight + 1 && k > 0.5) {
        k -= 0.03
        el.style.fontSize = `${base * k}px`
      }
    }
    fit()
    document.fonts?.ready.then(fit)
  })

  return (
    <div className="relative overflow-hidden" style={{ width: w, height: h, background: d.sky, color: d.colors.text, fontFamily: x.f.body }}>
      {d.Overlay && <d.Overlay h={(h * 540) / w} />}
      <div className="absolute inset-x-0 top-0">
        <d.Top />
      </div>
      <div className="absolute inset-x-0 bottom-0" style={{ height: invite.format === 'story' ? (w * 340) / 540 : w * 0.46 }}>
        <d.Bottom />
      </div>
      <div ref={box} className="absolute overflow-hidden" style={{ top: safe.top, bottom: safe.bottom, left: safe.x, right: safe.x }}>
        <div
          ref={inner}
          style={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.55em',
            lineHeight: 1.3,
            fontSize: base,
          }}
        >
          {page.kind === 'cover' ? <Cover x={x} p={page} symbol={t.symbol} /> : <Sections x={x} p={page} />}
        </div>
      </div>
    </div>
  )
}
