import { createContext, useContext, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { LANGS } from '../i18n'
import { templateById } from '../templates'
import type { CoverPage, Format, Invite, Lang, Page, SectionsPage, SymbolId } from '../types'
import { DESIGNS, type Design, type Ornaments } from './designs'
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
  const L = { ...LANGS[lang], ...design.script?.[lang] }
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

// The design's artwork icons, for [[name]] in text.
const Art = createContext<Ornaments>({})

// "\n" = new line, *word* = accent colour, **words** = large heading colour, ***words*** = bold,
// [[name]] = artwork icon, ___ = a rule to write on, and a line starting << or >> leans left or right.
function Rich({ text, accent, big }: { text: string; accent: string; big: string }) {
  const art = useContext(Art)
  return (
    <>
      {text.split('\n').map((raw, i) => {
        const lean = raw.startsWith('<<') ? 'left' : raw.startsWith('>>') ? 'right' : undefined
        const line = lean ? raw.slice(2) : raw
        const pad = lean === 'left' ? { paddingLeft: '14%' } : lean === 'right' ? { paddingRight: '14%' } : {}
        return (
        <span key={i} style={{ display: 'block', minHeight: '1em', textAlign: lean, ...pad }}>
          {line.split(/(\[\[[^\]]+\]\]|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|_{3,})/).map((part, j) =>
            /^\[\[.+\]\]$/.test(part) && art[part.slice(2, -2)] ? (
              <img key={j} src={art[part.slice(2, -2)].src} alt="" style={{ display: 'inline-block', width: `${art[part.slice(2, -2)].w}em`, verticalAlign: 'middle' }} />
            ) : /^_{3,}$/.test(part) ? (
              <span key={j} style={{ display: 'inline-block', width: `${part.length * 0.45}em`, borderBottom: '1px solid currentColor', marginLeft: '0.2em' }} />
            ) : part.length > 6 && part.startsWith('***') && part.endsWith('***') ? (
              <span key={j} style={{ fontWeight: 700, fontSize: '1.2em' }}>
                {part.slice(3, -3)}
              </span>
            ) : part.length > 4 && part.startsWith('**') && part.endsWith('**') ? (
              <span key={j} style={{ color: big, fontWeight: 700, fontSize: '1.6em', lineHeight: 1.25 }}>
                {part.slice(2, -2)}
              </span>
            ) : part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
              <span key={j} style={{ color: accent, fontWeight: 700 }}>
                {part.slice(1, -1)}
              </span>
            ) : (
              part
            ),
          )}
        </span>
        )
      })}
    </>
  )
}

function Heading({ x, children, size = 1.05 }: { x: Look; children: string; size?: number }) {
  if (!children.trim()) return null
  // Headings typed with their own marks (":: Li. Snehadhin ::") keep them.
  const own = /^(::|॥|\|\||II )/.test(children.trim())
  const text = DANDA.includes(x.lang) && !own ? `॥ ${children} ॥` : children
  return (
    <p style={{ fontFamily: x.f.heading, color: x.d.colors.heading, fontSize: `${size}em`, fontWeight: 700, letterSpacing: x.lang === 'en' ? '0.06em' : 0 }}>
      {text}
    </p>
  )
}

const P = ({ show, style, children }: { show: boolean; style: CSSProperties; children: ReactNode }) => (show ? <div style={style}>{children}</div> : null)

function Cover({ x, p, symbol, head }: { x: Look; p: CoverPage; symbol: SymbolId; head: boolean }) {
  const c = x.d.colors
  const o = x.d.ornaments?.couple ? x.d.ornaments : undefined
  const ty = x.d.type ?? {}
  const name: CSSProperties = { fontFamily: x.f.names, color: c.names ?? c.heading, fontSize: `${ty.names ?? 1.95}em`, lineHeight: 1.2 }
  return (
    <>
      <P show={!head && !!p.invocation} style={{ fontSize: '0.92em', color: c.heading, fontWeight: 600 }}>
        {p.invocation}
      </P>
      <P show={!head && !!p.shlok} style={{ fontSize: '0.76em', color: c.muted, lineHeight: 1.35 }}>
        <Rich text={p.shlok} accent={c.accent} big={c.heading} />
      </P>
      {!head && (
        <div style={{ width: '3.4em', alignSelf: 'center' }}>
          <Emblem symbol={symbol} color={c.title} accent={c.accent} size="100%" />
        </div>
      )}
      <P show={!head && !!p.title} style={{ fontFamily: x.f.title, color: c.title, fontSize: '2.5em', lineHeight: 1.15 }}>
        {p.title}
      </P>
      <P show={!!p.hostLine} style={{ fontSize: '0.92em', lineHeight: 1.4 }}>
        <Rich text={p.hostLine} accent={c.accent} big={c.heading} />
      </P>
      {o ? (
        // Names side by side around the artwork's couple icon, as on the printed card.
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1em', width: '100%' }}>
          {(['bride', 'groom'] as const).map((who, i) => (
            <div key={who} style={{ flex: 1, minWidth: 0, order: i * 2, textAlign: i ? 'left' : 'right' }}>
              <P show={!!p[who].name} style={name}>
                {p[who].name}
              </P>
              <P show={!!p[who].parents} style={{ fontSize: '0.8em', color: c.muted }}>
                {p[who].parents}
              </P>
            </div>
          ))}
          <img src={o.couple.src} alt="" style={{ order: 1, width: `${o.couple.w}em` }} />
        </div>
      ) : (
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
      )}
      {!head && (
        <div style={{ width: '9em', alignSelf: 'center' }}>
          <Flourish color={c.heading} width="100%" />
        </div>
      )}
      <div>
        <P show={!!p.date} style={ty.plainDate ? { fontSize: '1.05em' } : { fontFamily: x.f.heading, color: c.heading, fontSize: '1.05em', fontWeight: 700 }}>
          {p.date}
        </P>
        <P show={!!p.time} style={{ fontSize: '0.92em' }}>
          <Rich text={p.time} accent={c.accent} big={c.heading} />
        </P>
        <P show={!!p.venue} style={{ fontSize: '1em', fontWeight: 700, marginTop: '0.3em' }}>
          {p.venue}
        </P>
        <P show={!!p.address} style={{ fontSize: '0.85em' }}>
          {p.address}
        </P>
      </div>
      {p.rsvp.trim() && (
        <div style={{ marginTop: ty.plainDate ? '1em' : 0 }}>
          {o ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35em' }}>
              <img src={o['swirl-l'].src} alt="" style={{ width: `${o['swirl-l'].w}em` }} />
              <Heading x={x} size={ty.rsvpHeading ?? 0.95}>
                {p.rsvpTitle}
              </Heading>
              <img src={o['swirl-r'].src} alt="" style={{ width: `${o['swirl-r'].w}em` }} />
            </div>
          ) : (
            <Heading x={x} size={0.95}>
              {p.rsvpTitle}
            </Heading>
          )}
          <div style={{ fontSize: '0.85em', lineHeight: 1.4 }}>
            <Rich text={p.rsvp} accent={c.accent} big={c.heading} />
          </div>
        </div>
      )}
    </>
  )
}

// Name list as two centred tables whose words line up, the way kankotri family lists are typeset.
function Table({ lines, accent, big }: { lines: string[]; accent: string; big: string }) {
  const half = Math.ceil(lines.length / 2)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.6em' }}>
      {[lines.slice(0, half), lines.slice(half)].map((col, k) => {
        const words = col.map((l) => l.trim().split(/\s+/))
        const n = Math.max(...words.map((w) => w.length))
        return (
          <div key={k} style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, auto)`, columnGap: '0.4em', textAlign: 'left' }}>
            {words.flatMap((w, i) => Array.from({ length: n }, (_, j) => <Rich key={`${i}.${j}`} text={w[j] ?? ''} accent={accent} big={big} />))}
          </div>
        )
      })}
    </div>
  )
}

type Sec = SectionsPage['sections'][number]
const lineCount = (b: string) => b.split('\n').length

function Sections({ x, p, head }: { x: Look; p: SectionsPage; head: boolean }) {
  const c = x.d.colors
  const ty = x.d.type ?? {}
  const short = (s: Sec) => !!s.heading && lineCount(s.body) <= 6 && s.heading.length < 24
  // Pair consecutive short sections side by side, as kankotris do; long ones take the full width.
  // In a run of 5, 9... the middle one stands alone, centred between the pairs.
  const rows: Sec[][] = []
  for (let i = 0; i < p.sections.length; ) {
    let n = 0
    while (i + n < p.sections.length && short(p.sections[i + n])) n++
    if (!n) {
      rows.push([p.sections[i++]])
      continue
    }
    const run = p.sections.slice(i, i + n)
    const mid = n % 4 === 1 && n >= 5 ? (n - 1) / 2 : -1
    for (let j = 0; j < n; ) {
      if (j === mid || j === n - 1) rows.push([run[j++]])
      else rows.push([run[j++], run[j++]])
    }
    i += n
  }
  // Name lists flow into two columns; long sentences (an invitation letter) stay one wide column.
  const list = (b: string) => lineCount(b) > 6 && Math.max(...b.split('\n').map((l) => l.length)) <= 40
  return (
    <>
      <P show={!head && !!p.title} style={{ fontFamily: x.f.title, color: c.title, fontSize: '2.3em', lineHeight: 1.15 }}>
        {p.title}
      </P>
      {!head && (
        <div style={{ width: '9em', alignSelf: 'center' }}>
          <Flourish color={c.heading} width="100%" />
        </div>
      )}
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: '1em', width: '100%' }}>
          {row.map((s, j) => (
            <div key={j} style={{ flex: 1, minWidth: 0 }}>
              <Heading x={x} size={ty.heading}>
                {s.heading}
              </Heading>
              {/* columnCount only for real lists: a one-column multicol box with a fixed height pushes overflow into an invisible extra column on export. */}
              <div style={{ fontSize: `${ty.body ?? 0.88}em`, lineHeight: 1.5, columnCount: list(s.body) && !ty.lists ? 2 : undefined, columnGap: '1.2em' }}>
                {list(s.body) && ty.lists ? <Table lines={s.body.split('\n')} accent={c.accent} big={c.heading} /> : <Rich text={s.body} accent={c.accent} big={c.heading} />}
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
  // Painted templates: each page has its own artwork and its own text band, scaled from story px.
  const art = d.pages?.[Math.max(0, invite.pages.indexOf(page)) % d.pages.length]
  const k = w / 540
  const crop = (960 * k - h) / 2
  const safe = art ? { top: art.top * k - crop, bottom: art.bottom * k - crop, x: d.safe.story.x * k } : d.safe[invite.format]
  const x = look(d, invite.lang)
  const base = w / 30
  const box = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  // Shrink text until it fits the safe area, so long family lists never spill onto the artwork.
  // Designs with type.grow start larger, so sparse pages fill their band as a designer would.
  useLayoutEffect(() => {
    const fit = () => {
      const b = box.current
      const el = inner.current
      if (!b || !el) return
      let k = SCALE[invite.scale] * (art?.size ?? d.type?.grow ?? 1)
      el.style.fontSize = `${base * k}px`
      while (el.scrollHeight > b.clientHeight + 1 && k > 0.5) {
        k -= 0.03
        el.style.fontSize = `${base * k}px`
      }
    }
    fit()
    // Re-fit whenever a web font finishes loading (faces load lazily on first use), not on every keystroke.
    document.fonts?.addEventListener('loadingdone', fit)
    return () => document.fonts?.removeEventListener('loadingdone', fit)
    // Only pages whose content or look changed re-fit; untouched pages keep their object identity.
  }, [page, base, invite.scale, invite.lang, invite.templateId, art])

  return (
    <div className="relative overflow-hidden" style={{ width: w, height: h, background: art ? `center / cover url("${art.src}") ${d.sky}` : d.sky, color: d.colors.text, fontFamily: x.f.body, letterSpacing: d.tracking }}>
      {!art && (
        <>
          {d.Overlay && <d.Overlay h={(h * 540) / w} />}
          <div className="absolute inset-x-0 top-0">
            <d.Top />
          </div>
          <div className="absolute inset-x-0 bottom-0" style={{ height: invite.format === 'story' ? (w * 340) / 540 : w * 0.46 }}>
            <d.Bottom />
          </div>
        </>
      )}
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
          <Art.Provider value={d.ornaments ?? {}}>{page.kind === 'cover' ? <Cover x={x} p={page} symbol={t.symbol} head={!!art?.head} /> : <Sections x={x} p={page} head={!!art?.head} />}</Art.Provider>
        </div>
      </div>
    </div>
  )
}
