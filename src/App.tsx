import { ArrowRight, Pencil } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CardPage, SIZES } from './card/Card'
import Editor from './Editor'
import OrganzaVeilSite from './site/OrganzaVeil'
import { EVENTS, LANGS, SYMBOLS } from './i18n'
import { loadInvite, newInvite, saveInvite, TEMPLATES, type Template } from './templates'
import { EVENT_IDS, LANG_IDS, SYMBOL_IDS, type EventType, type Invite, type Lang, type SymbolId } from './types'
import { ScaledCard } from './ui'

// Hash routes: #edit (editor), #/ananya-arjun (sample couple website), else the gallery.
const isEditor = () => location.hash === '#edit'
const isSite = () => location.hash === '#/ananya-arjun'

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
    location.hash = 'edit'
  }

  if (inSite) return <OrganzaVeilSite />
  if (inEditor && invite) return <Editor invite={invite} setInvite={setInvite} onBack={() => (location.hash = '')} />
  return <Gallery onOpen={open} draft={invite} />
}

export const Wordmark = () => (
  <span className="font-display text-2xl italic">
    ShaadiDraft <span className="ml-1 font-deva text-base not-italic text-zari">शादी</span>
  </span>
)

function Gallery({ onOpen, draft }: { onOpen: (t: Template) => void; draft: Invite | null }) {
  const [lang, setLang] = useState<Lang | 'all'>('all')
  const [symbol, setSymbol] = useState<SymbolId | 'all'>('all')
  const [event, setEvent] = useState<EventType | 'all'>('all')
  // Sample invites are built once; previews re-render only when filters change.
  const previews = useMemo(() => Object.fromEntries(TEMPLATES.map((t) => [t.id, newInvite(t)])), [])
  const shown = TEMPLATES.filter((t) => (lang === 'all' || t.lang === lang) && (symbol === 'all' || t.symbol === symbol) && (event === 'all' || t.event === event))
  const filtered = lang !== 'all' || symbol !== 'all' || event !== 'all'
  const clear = () => {
    setLang('all')
    setSymbol('all')
    setEvent('all')
  }
  const story = SIZES.story
  const hero = ['royal-udaipur', 'gulabi-kankotri', 'kanchipuram'].map((id) => previews[id])
  const select = 'rounded-full border border-stone-400 bg-white py-2 pl-4 pr-9 text-[15px] text-ink focus:border-maroon'

  return (
    <div className="min-h-screen">
      <div className="bg-wine text-rose">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <Wordmark />
          <nav className="flex gap-5 text-sm">
            <a href="#/ananya-arjun" className="text-rose/85 underline-offset-4 hover:text-rose hover:underline">
              Sample wedding website
            </a>
            {draft && (
              <a href="#edit" className="text-rose/85 underline-offset-4 hover:text-rose hover:underline">
                Continue your draft
              </a>
            )}
          </nav>
        </header>

        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-2 lg:pb-24 lg:pt-10">
          <div className="min-w-0">
            <h1 className="font-display text-[38px] leading-[1.08] sm:text-6xl">Invitations as grand as the wedding</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-rose/85">
              Kankotris and wedding cards in English, Hindi, Marathi, Gujarati, Punjabi and Tamil. Fill in your families'
              names, then download images for WhatsApp or a PDF for the press. Free, with no login.
            </p>
            <a
              href="#templates"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-zari px-7 py-3.5 font-medium text-wine-deep shadow-lg shadow-black/30 hover:bg-zari-light"
            >
              Choose a design <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
          <div className="relative order-first mx-auto h-[300px] w-full max-w-[440px] sm:h-[440px] lg:order-none" aria-hidden>
            {hero.map((inv, i) => (
              <div
                key={inv.templateId}
                className="hero-card absolute top-2 w-[46%]"
                style={{ left: `${3 + i * 24}%`, rotate: `${(i - 1) * 7}deg`, zIndex: i === 1 ? 2 : 1, animationDelay: `${i * 120}ms` }}
              >
                <ScaledCard w={story.w} h={story.h} className="shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)]">
                  <CardPage invite={inv} page={inv.pages[0]} />
                </ScaledCard>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="templates" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-14 sm:px-6">
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">Choose your design</h2>

        <div className="mt-8 flex flex-wrap items-center gap-3" role="group" aria-label="Filter designs">
          <button
            onClick={clear}
            aria-pressed={!filtered}
            className={`rounded-full px-5 py-2 text-[15px] ${!filtered ? 'bg-maroon text-white' : 'border border-stone-400 bg-white text-ink'}`}
          >
            All
          </button>
          <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as Lang | 'all')} className={select}>
            <option value="all">All languages</option>
            {LANG_IDS.map((l) => (
              <option key={l} value={l}>
                {l === 'en' ? 'English' : `${LANGS[l].name} (${LANGS[l].native})`}
              </option>
            ))}
          </select>
          <select aria-label="God or sacred symbol" value={symbol} onChange={(e) => setSymbol(e.target.value as SymbolId | 'all')} className={select}>
            <option value="all">All symbols</option>
            {SYMBOL_IDS.map((s) => (
              <option key={s} value={s}>
                {SYMBOLS[s]}
              </option>
            ))}
          </select>
          <select aria-label="Invitation type" value={event} onChange={(e) => setEvent(e.target.value as EventType | 'all')} className={select}>
            <option value="all">All events</option>
            {EVENT_IDS.map((e) => (
              <option key={e} value={e}>
                {EVENTS[e]}
              </option>
            ))}
          </select>
          <p className="ml-auto text-sm text-stone-600" aria-live="polite">
            {shown.length} {shown.length === 1 ? 'design' : 'designs'}
          </p>
        </div>

        {shown.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-stone-400 p-10 text-center">
            <p className="text-lg">No design matches all three filters yet.</p>
            <button onClick={clear} className="mt-4 rounded-full bg-maroon px-6 py-2.5 text-white hover:bg-wine">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((t) => {
              const inv = previews[t.id]
              return (
                <article key={t.id} className="flex min-w-0 flex-col">
                  <button onClick={() => onOpen(t)} aria-label={`Customize ${t.name}`} className="block">
                    <div className="pointer-events-none transition duration-300 hover:-translate-y-1">
                      <ScaledCard w={story.w} h={story.h} className="shadow-[0_16px_36px_-14px_rgba(43,20,24,0.5)]">
                        <CardPage invite={inv} page={inv.pages[0]} />
                      </ScaledCard>
                    </div>
                  </button>
                  <h3 className="mt-4 font-display text-lg leading-snug">{t.name}</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
                    {[LANGS[t.lang].native, SYMBOLS[t.symbol], EVENTS[t.event]].map((b) => (
                      <li key={b} className="rounded-full bg-white px-2.5 py-1 text-stone-700 ring-1 ring-stone-300">
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onOpen(t)}
                    className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-wine px-4 py-2 text-sm text-rose hover:bg-wine-deep"
                  >
                    <Pencil className="size-3.5" aria-hidden /> Customize template
                  </button>
                </article>
              )
            })}
          </div>
        )}
      </section>

      <footer className="border-t border-stone-300/70 px-4 py-8 text-center text-sm text-stone-600">
        Your invitation is saved in this browser only. Phonetic typing sends single words to Google to convert them.
      </footer>
    </div>
  )
}
