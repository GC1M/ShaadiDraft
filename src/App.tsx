import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
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

  const open = (t: Template) => {
    // Re-opening the template you were editing keeps your text.
    if (invite?.templateId !== t.id) setInvite(newInvite(t))
    track('template_open', { template: t.id, lang: t.lang, event: t.event })
    location.hash = 'edit'
  }

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
  <span className="font-display text-2xl italic tracking-tight">
    ShaadiDraft <span className="ml-1 font-deva text-base not-italic text-zari">शादी</span>
  </span>
)

const STEPS = [
  `Choose one of ${TEMPLATES.length} designs`,
  "Type your families' names, in English or your own script",
  'Download images for WhatsApp, or a PDF for the press',
]

function Gallery({ onOpen, draft }: { onOpen: (t: Template) => void; draft: Invite | null }) {
  const [lang, setLang] = useState<Lang | 'all'>('all')
  const [symbol, setSymbol] = useState<SymbolId | 'all'>('all')
  const [event, setEvent] = useState<EventType | 'all'>('all')
  // Sample invites are built once; previews re-render only when filters change.
  const previews = useMemo(() => Object.fromEntries(TEMPLATES.map((t) => [t.id, newInvite(t)])), [])
  const byLangSymbol = TEMPLATES.filter((t) => (lang === 'all' || t.lang === lang) && (symbol === 'all' || t.symbol === symbol))
  const shown = byLangSymbol.filter((t) => event === 'all' || t.event === event)
  const count = (e: EventType | 'all') => byLangSymbol.filter((t) => e === 'all' || t.event === e).length
  const filtered = lang !== 'all' || symbol !== 'all' || event !== 'all'
  const clear = () => {
    setLang('all')
    setSymbol('all')
    setEvent('all')
  }
  const story = SIZES.story
  const hero = ['royal-udaipur', 'gulabi-kankotri', 'kanchipuram'].map((id) => previews[id])
  const draftName = draft && TEMPLATES.find((t) => t.id === draft.templateId)?.name
  const select = 'select-chevron rounded-full border border-wine/25 bg-paper py-2.5 pl-4 pr-10 text-[15px] text-ink hover:border-wine/50 focus:border-wine'

  return (
    <div className="min-h-screen">
      <div className="velvet text-rose">
        <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-6">
          <a href="#" aria-label="ShaadiDraft home">
            <Wordmark />
          </a>
          <nav className="flex items-center gap-5 text-[15px]">
            <a href={PAGES[0][1]} className="text-rose/80 underline-offset-[6px] hover:text-rose hover:underline">
              See a couple's wedding website
            </a>
          </nav>
        </header>

        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-6 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-14">
          <div className="min-w-0">
            <h1 className="font-display text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[68px] lg:text-[80px]">
              Invitations as grand as the wedding
            </h1>
            <ol className="mt-9 max-w-md space-y-3.5 text-[17px] leading-snug text-rose/85">
              {STEPS.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="w-5 shrink-0 font-display text-xl italic leading-none text-zari">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href="#templates" className="zari-button inline-block rounded-full px-8 py-4 text-[15px] font-medium text-wine-deep">
                Choose a design
              </a>
              {draftName && (
                <a href="#edit" className="text-[15px] text-rose underline decoration-zari/70 underline-offset-[6px] hover:decoration-zari">
                  Continue {draftName}
                </a>
              )}
            </div>
            <p className="mt-8 text-sm text-rose/60">Free, with no login. English, हिन्दी, मराठी, ગુજરાતી, ਪੰਜਾਬੀ and தமிழ்.</p>
          </div>
          <div className="relative order-first mx-auto h-[320px] w-full max-w-[460px] sm:h-[470px] lg:order-none" aria-hidden>
            {hero.map((inv, i) => (
              <div
                key={inv.templateId}
                className="hero-card absolute top-2 w-[46%]"
                style={{ left: `${3 + i * 24}%`, rotate: `${(i - 1) * 7}deg`, zIndex: i === 1 ? 2 : 1, animationDelay: `${i * 120}ms` }}
              >
                <ScaledCard w={story.w} h={story.h} className="shadow-[0_30px_60px_-14px_rgba(10,0,4,0.75)]">
                  <CardPage invite={inv} page={inv.pages[0]} />
                </ScaledCard>
              </div>
            ))}
          </div>
        </section>
      </div>
      <ZariBorder />

      <section id="templates" className="mx-auto max-w-6xl scroll-mt-2 px-4 pb-24 pt-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[40px] leading-none tracking-[-0.015em] sm:text-[56px]">Choose your design</h2>
          <p className="text-[15px] text-ink/60" aria-live="polite">
            {shown.length} {shown.length === 1 ? 'design' : 'designs'}
          </p>
        </div>

        {/* The event is the first thing people know, so it leads; language and symbol refine it. */}
        <div className="-mx-4 mt-9 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-1 border-b border-wine/15" role="group" aria-label="Invitation type">
            {(['all', ...EVENT_IDS] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEvent(e)}
                aria-pressed={event === e}
                className={`event-tab relative px-3.5 pb-3.5 pt-1 text-[15px] transition-colors ${event === e ? 'text-wine' : 'text-ink/60 hover:text-ink'}`}
              >
                {e === 'all' ? 'Every event' : EVENTS[e]}
                <span className="ml-1.5 text-xs text-ink/40">{count(e)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
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
            <button onClick={clear} className="px-2 py-2 text-[15px] text-wine underline decoration-zari underline-offset-[6px] hover:decoration-wine">
              Clear filters
            </button>
          )}
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
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-10 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((t) => {
              const inv = previews[t.id]
              return (
                <button key={t.id} onClick={() => onOpen(t)} className="design group flex min-w-0 flex-col text-left">
                  <div className="pointer-events-none w-full transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
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
      <footer className="velvet px-4 py-10 text-center text-sm text-rose/70">
        <Wordmark />
        <p className="mx-auto mt-4 max-w-xl leading-relaxed">
          Your invitation is saved in this browser only. Phonetic typing sends single words to Google to convert them.
        </p>
        <nav className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1">
          {[['About', 'about.html'], ['Contact', 'contact.html'], ['Privacy', 'privacy.html'], ['Terms', 'terms.html'], ['Refunds', 'refund.html']].map(([label, href]) => (
            <a key={href} href={href} className="underline underline-offset-4 hover:text-rose">
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  )
}
