import { Fragment, lazy, Suspense, type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { CardPage, SIZES } from './card/Card'
import Editor from './Editor'
import { EVENTS, LANGS, SYMBOLS } from './i18n'
import { loadInvite, newInvite, saveInvite, TEMPLATES, type Template } from './templates'
import { EVENT_IDS, LANG_IDS, SYMBOL_IDS, type EventType, type Invite, type Lang, type SymbolId } from './types'
import { PAGES } from './site/pages'
import { ScaledCard, ZariBorder } from './ui'
import { track } from './analytics'

// Hash routes: #edit (editor), the sample couple website in each version (site/pages.ts: a film, and walks through
// real 3D scans), else the gallery. Sites load on demand to keep the main bundle small.
const isEditor = () => location.hash === '#edit'
const Scan = lazy(() => import('./site/journey/Scan'))
const SITES: Record<string, ReturnType<typeof lazy>> = {
  '#/ananya-arjun': lazy(() => import('./site/FilmSite')),
  ...Object.fromEntries(['stepwell', 'courtyard', 'hall', 'salon'].map((k) => [`#/ananya-arjun/${k}`, Scan])),
}
const isSite = () => (location.hash in SITES ? location.hash : '')
// Static template pages link to #template/<id> to open that design. Consumed once, so StrictMode's re-run is a no-op.
let linked = TEMPLATES.find((t) => `#template/${t.id}` === location.hash)

export default function App() {
  const [invite, setInvite] = useState<Invite | null>(loadInvite)
  const [inEditor, setInEditor] = useState(isEditor)
  const [inSite, setInSite] = useState(isSite)

  useEffect(() => {
    if (invite) saveInvite(invite)
  }, [invite])
  useEffect(() => {
    const onHash = () => {
      setInEditor(isEditor())
      setInSite(isSite())
    }
    addEventListener('hashchange', onHash)
    return () => removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    scrollTo(0, 0)
  }, [inEditor, inSite])
  // The static guide, FAQ and footer in index.html belong to the gallery only.
  const view = inSite ? 'site' : inEditor && invite ? 'editor' : 'home'
  useEffect(() => {
    document.documentElement.dataset.view = view
  }, [view])

  const open = (t: Template) => {
    // Re-opening the template you were editing keeps your text.
    if (invite?.templateId !== t.id) {
      const prev = invite && TEMPLATES.find((p) => p.id === invite.templateId)
      // Page ids are random, so ignore them when checking whether the draft was ever edited.
      const plain = (i: Invite) => JSON.stringify(i, (k, v) => (k === 'id' ? undefined : v))
      const edited = prev && plain(invite) !== plain(newInvite(prev, invite.lang))
      if (edited && !confirm(`Opening ${t.name} will replace your ${prev.name} draft. Continue?`)) return
      setInvite(newInvite(t))
    }
    track('template_open', { template: t.id, lang: t.lang, event: t.event })
    location.hash = 'edit'
  }
  useEffect(() => {
    if (!linked) return
    const t = linked
    linked = undefined
    history.replaceState(null, '', location.pathname + location.search) // cancelling the draft prompt leaves a clean gallery URL
    open(t)
  }, [])

  if (inSite) {
    const Site = SITES[inSite]
    return (
      <Suspense fallback={<div className="min-h-svh bg-[#0e0a0c]" />}>
        <Site key={inSite} />
      </Suspense>
    )
  }
  if (inEditor && invite) return <Editor invite={invite} setInvite={setInvite} onBack={() => (location.hash = '')} />
  return <Gallery onOpen={open} draft={invite} />
}

export const Wordmark = () => (
  <span className="inline-flex items-center gap-2.5 font-display text-2xl italic tracking-tight">
    <img src={`${import.meta.env.BASE_URL}logo-on-dark.svg`} alt="" width="28" height="30" className="-mt-1" />
    ShaadiTemplate <span className="ml-1 font-deva text-base not-italic text-zari">शादी</span>
  </span>
)

// Gold line-art mandap, viewBox 1200x820, drawn in stages: platform, pillars, beam, domes,
// drapes, then marigold strings and diyas. Left-hand parts are drawn once and mirrored.
const g = (d: number, dur = 1.6) => ({ '--d': `${d}s`, '--dur': `${dur}s` }) as CSSProperties
const cusps = (n: number, w: number, h: number) => Array(n).fill(`q${w / 2} ${h} ${w} 0`).join(' ')
const Side = () => (
  <>
    <g style={g(0.4)}>
      <path d="M196 760V732H264V760M204 732V718H256V732" pathLength={1} />
      <path d="M212 718V344M248 718V344M212 650H248M212 570H248M212 490H248M212 410H248" pathLength={1} />
      <path d="M230 600l9 10-9 10-9-10zM230 520l9 10-9 10-9-10zM230 440l9 10-9 10-9-10z" pathLength={1} />
      <path d="M212 344Q212 332 202 328H258Q248 332 248 344M194 328V314H266V328" pathLength={1} />
    </g>
    <g style={g(1.5, 1.8)}>
      <path d="M182 288V274H278V288M188 274C178 238 206 214 230 188C254 214 282 238 272 274M230 188V172" pathLength={1} />
      <circle cx="230" cy="166" r="4" pathLength={1} />
    </g>
    <g style={g(2)}>
      <path d="M266 330C318 392 296 470 262 520C296 566 300 640 276 704M282 336C322 400 304 470 270 516" pathLength={1} />
      <circle cx="263" cy="520" r="6" pathLength={1} />
    </g>
    <g style={g(2.5, 1.2)}>
      <path d="M158 314V500M176 314V440" pathLength={1} />
      {[...Array(9)].map((_, i) => <circle key={`a${i}`} cx="158" cy={334 + i * 20} r="6" pathLength={1} />)}
      {[...Array(6)].map((_, i) => <circle key={`b${i}`} cx="176" cy={334 + i * 20} r="5" pathLength={1} />)}
      <path d="M130 748Q150 768 170 748Z" pathLength={1} />
      <path className="flame" d="M150 744Q142 730 150 712Q158 730 150 744Z" />
    </g>
  </>
)
function Mandap() {
  return (
    <svg className="mandap" viewBox="0 0 1200 820" aria-hidden>
      <g style={g(0, 1.4)}>
        <path d="M120 760H1080M90 760H1110V786H90ZM60 786H1140V812H60Z" pathLength={1} />
        <path d={Array.from({ length: 25 }, (_, i) => `M${114 + i * 40} 773l6-6 6 6-6 6z`).join('')} pathLength={1} />
      </g>
      <g style={g(1, 1.4)}>
        <path d="M140 314H1060M140 300H1060V314M140 300V314M128 300V288H1072V300" pathLength={1} />
        <path d={`M264 314${cusps(8, 84, 34)}`} pathLength={1} />
        <path d={Array.from({ length: 7 }, (_, i) => `M${348 + i * 84} 314v12m-4 0h8l-4 10z`).join('')} pathLength={1} />
      </g>
      <g style={g(1.5, 1.8)}>
        <path d={`M420 288V268H780V288M430 268${cusps(10, 34, -16)}`} pathLength={1} />
        <path d="M462 268C440 206 500 168 600 120C700 168 760 206 738 268" pathLength={1} />
        <path d="M434 268C404 196 480 150 600 92C720 150 796 196 766 268M600 92C556 150 532 210 540 268M600 92C644 150 668 210 660 268M600 92V78M586 78Q600 58 614 78ZM600 58V40" pathLength={1} />
        <circle cx="600" cy="34" r="6" pathLength={1} />
      </g>
      <g style={g(2)}>
        <path d="M264 330Q432 398 600 330Q768 398 936 330" pathLength={1} />
      </g>
      <Side />
      <g transform="matrix(-1 0 0 1 1200 0)">
        <Side />
      </g>
    </svg>
  )
}

const GREETINGS = ['Shubh Vivah', 'शुभ विवाह', 'શુભ લગ્ન', 'ਸ਼ੁਭ ਵਿਆਹ', 'சுப முகூர்த்தம்', 'शुभमंगल सावधान', 'Save the Date']

function Gallery({ onOpen, draft }: { onOpen: (t: Template) => void; draft: Invite | null }) {
  const [lang, setLang] = useState<Lang | 'all'>('all')
  const [symbol, setSymbol] = useState<SymbolId | 'all'>('all')
  const [event, setEvent] = useState<EventType | 'all'>('all')
  // Sample invites are built once; previews re-render only when filters change.
  const previews = useMemo(() => Object.fromEntries(TEMPLATES.map((t) => [t.id, newInvite(t)])), [])
  const byLangSymbol = TEMPLATES.filter((t) => (lang === 'all' || t.lang === lang) && (symbol === 'all' || t.symbol === symbol || !!t.also?.includes(symbol)))
  const shown = byLangSymbol.filter((t) => event === 'all' || t.event === event).sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  const count = (e: EventType | 'all') => byLangSymbol.filter((t) => e === 'all' || t.event === e).length
  const filtered = lang !== 'all' || symbol !== 'all' || event !== 'all'
  const clear = () => {
    setLang('all')
    setSymbol('all')
    setEvent('all')
  }
  const story = SIZES.story
  const draftName = draft && TEMPLATES.find((t) => t.id === draft.templateId)?.name
  // When a filter changes, bring the top of the grid back into view and fade the new set in.
  const top = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  useEffect(() => {
    if (first.current) return void (first.current = false)
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (top.current && top.current.getBoundingClientRect().top < 0) top.current.scrollIntoView({ behavior: still ? 'auto' : 'smooth' })
    if (!still) grid.current?.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' })
  }, [lang, symbol, event])
  const select = 'select-chevron min-w-0 truncate rounded-full border border-wine/25 bg-paper py-2.5 pl-4 pr-10 text-[15px] text-ink hover:border-wine/50 focus:border-wine'

  return (
    <div className="min-h-screen">
      <div className="scroll-progress" aria-hidden />
      <div className="velvet text-rose">
        <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-6">
          <a href="#" aria-label="ShaadiTemplate home">
            <Wordmark />
          </a>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
            {[['Designs', 'templates/'], ['Guides', 'guides/'], ["A couple's wedding website", PAGES[0][1]]].map(([label, href]) => (
              <a key={href} href={href} className="text-rose/80 underline-offset-[6px] hover:text-rose hover:underline">
                {label}
              </a>
            ))}
          </nav>
        </header>

      {/* Hero: a gold mandap draws itself, and the headline stands in its opening. */}
      <section className="hero mandap-hero">
        <Mandap />
        <div className="hero-copy">
          <h1 className="font-display text-[40px] leading-[1.04] tracking-[-0.02em] [text-wrap:balance] sm:text-[56px] lg:text-[64px]">
            {'Invitations as grand as the wedding'.split(' ').map((w, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="intro inline-block" style={{ animationDelay: `${900 + i * 70}ms` }}>
                  {w}
                </span>
              </Fragment>
            ))}
          </h1>
          <p className="intro mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-rose/85">
            Type your families' names in English or your own script, then download images for WhatsApp or a PDF for the press.
          </p>
          <div className="intro mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <a href="#templates" className="zari-button shine relative inline-block overflow-hidden rounded-full px-8 py-4 text-[15px] font-medium text-wine-deep">
              Choose a design
            </a>
            {draftName && (
              <a href="#edit" className="text-[15px] text-rose underline decoration-zari/70 underline-offset-[6px] hover:decoration-zari">
                Continue {draftName}
              </a>
            )}
          </div>
          <p className="intro mt-6 text-sm text-rose/60">Free, with no login. English, हिन्दी, मराठी, ગુજરાતી, ਪੰਜਾਬੀ and தமிழ்.</p>
        </div>
      </section>
      </div>
      <ZariBorder />

      {/* A slow ribbon of the greeting in every script the maker supports. */}
      <div className="overflow-hidden border-b border-wine/10 py-5" aria-hidden>
        <div className="ribbon flex w-max whitespace-nowrap font-display text-[26px] italic text-wine/70 sm:text-[32px]">
          {[0, 1].map((k) =>
            GREETINGS.map((g, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10 pr-10">
                {g}
                <span className="text-[18px] not-italic text-zari">✦</span>
              </span>
            )),
          )}
        </div>
      </div>

      <section id="templates" className="mx-auto max-w-6xl scroll-mt-2 px-4 pb-24 pt-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <h2 className="reveal font-display text-[40px] leading-none tracking-[-0.015em] sm:text-[56px]">Choose your design</h2>
          <div className="grid w-full grid-cols-2 items-center gap-3 sm:flex sm:w-auto sm:flex-wrap">
            <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as Lang | 'all')} className={select}>
              <option value="all">Any language</option>
              {LANG_IDS.map((l) => (
                <option key={l} value={l}>
                  {l === 'en' ? 'English' : `${LANGS[l].name} (${LANGS[l].native})`}
                </option>
              ))}
            </select>
            <select aria-label="God or sacred symbol" value={symbol} onChange={(e) => setSymbol(e.target.value as SymbolId | 'all')} className={select}>
              <option value="all">Any symbol</option>
              {SYMBOL_IDS.map((s) => (
                <option key={s} value={s}>
                  {SYMBOLS[s]}
                </option>
              ))}
            </select>
            {filtered && (
              <button onClick={clear} className="col-span-2 justify-self-start px-2 py-2 text-[15px] text-wine underline decoration-zari underline-offset-[6px] hover:decoration-wine">
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* The event is the first thing people know, so it leads and stays in reach while scrolling. */}
        <div ref={top} className="mt-8" />
        <div className="sticky top-0 z-20 -mx-4 bg-rose/90 px-4 backdrop-blur-md sm:-mx-6 sm:px-6">
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex min-w-max gap-1 border-b border-wine/15 pt-3" role="group" aria-label="Invitation type">
              {(['all', ...EVENT_IDS] as const).map((e) => (
                <button
                  key={e}
                  onClick={() => setEvent(e)}
                  aria-pressed={event === e}
                  className={`event-tab relative px-3.5 pb-3.5 pt-1 text-[15px] transition-colors ${event === e ? 'text-wine' : 'text-ink/60 hover:text-ink'}`}
                >
                  {e === 'all' ? 'All' : EVENTS[e]}
                  <span className="ml-1.5 text-xs text-ink/40">{count(e)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="mt-14 rounded-sm border border-dashed border-wine/30 px-6 py-14 text-center">
            <p className="font-display text-2xl">No design matches these filters yet.</p>
            <p className="mt-2 text-ink/70">Try another language or symbol. Every card can switch language once you open it.</p>
            <button onClick={clear} className="mt-6 rounded-full bg-wine px-6 py-3 text-[15px] text-rose hover:bg-wine-deep">
              Clear filters
            </button>
          </div>
        ) : (
          <div ref={grid} className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-10 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((t) => {
              const inv = previews[t.id]
              return (
                <button key={t.id} onClick={() => onOpen(t)} className="design group flex min-w-0 flex-col text-left">
                  <div className="pointer-events-none relative w-full transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                    {t.featured && (
                      <span className="zari-button absolute left-2 top-2 z-10 rounded-full px-2.5 py-1 text-xs font-medium text-wine-deep shadow">★ Featured</span>
                    )}
                    <ScaledCard w={story.w} h={story.h} className="design-card">
                      <CardPage invite={inv} page={inv.pages[0]} />
                    </ScaledCard>
                  </div>
                  <h3 className="mt-5 font-display text-[19px] leading-snug">{t.name}</h3>
                  <p className="mt-1 text-sm text-ink/60">
                    {EVENTS[t.event]}, {LANGS[t.lang].native}
                  </p>
                  <span className="mt-2.5 text-sm font-medium text-wine underline decoration-zari underline-offset-[6px] group-hover:decoration-wine">
                    Customize
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </section>

      <ZariBorder />
    </div>
  )
}
