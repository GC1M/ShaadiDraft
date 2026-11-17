import { Fragment, useEffect, useState } from 'react'
import { RoyalMarigoldPage } from './card/RoyalMarigold'
import Editor from './Editor'
import { loadInvite, sampleInvite, saveInvite, type ThemeId } from './types'
import { AdSlot, ScaledCard } from './ui'

const TEMPLATES: { id: ThemeId; name: string; tag: 'Traditional' | 'Modern'; ready: boolean; swatch: string }[] = [
  { id: 'royal-marigold', name: 'Royal Marigold & Gold', tag: 'Traditional', ready: true, swatch: '' },
  {
    id: 'pastel-peach',
    name: 'Pastel Peach & Floral',
    tag: 'Modern',
    ready: false,
    swatch: 'linear-gradient(160deg,#fde8de,#f9cdbb 55%,#cfe3cf)',
  },
  {
    id: 'classic-crimson',
    name: 'Classic Crimson & Heritage',
    tag: 'Traditional',
    ready: false,
    swatch: 'linear-gradient(160deg,#5c0f14,#8b1a1f 55%,#c9a227)',
  },
]
const FILTERS = ['All', 'Traditional', 'Modern'] as const

const isEditorHash = () => location.hash === '#editor'

export default function App() {
  const [data, setData] = useState(loadInvite)
  const [inEditor, setInEditor] = useState(isEditorHash)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')

  useEffect(() => {
    saveInvite(data)
  }, [data])
  useEffect(() => {
    const onHash = () => setInEditor(isEditorHash())
    addEventListener('hashchange', onHash)
    return () => removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    scrollTo(0, 0)
  }, [inEditor])

  const openEditor = (themeId: ThemeId) => {
    setData((d) => ({ ...d, themeId }))
    location.hash = 'editor'
  }

  if (inEditor) return <Editor data={data} setData={setData} />

  const shown = TEMPLATES.filter((t) => filter === 'All' || t.tag === filter)
  const preview = sampleInvite('royal-marigold', data.pages)

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <span className="font-display text-lg font-bold tracking-widest text-maroon">ShaadiDraft</span>
        <a href="#editor" className="text-sm font-medium text-maroon underline-offset-4 hover:underline">
          Continue editing
        </a>
      </header>

      <section className="mx-auto max-w-3xl px-4 pb-12 pt-10 text-center sm:pt-16">
        <p className="font-deva text-maroon">॥ शुभ विवाह ॥</p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-maroon sm:text-5xl">
          Indian Wedding Invitations, <span className="text-gold">beautifully free</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-serif text-xl text-stone-700">
          Design your wedding, Haldi, Mehendi, Sangeet and Reception cards in minutes. Download a print-ready,
          WhatsApp-friendly PDF. No login, no watermark.
        </p>
        <button
          onClick={() => openEditor('royal-marigold')}
          className="mt-8 rounded-full bg-maroon px-8 py-3.5 font-display text-sm font-bold tracking-widest text-white shadow-lg hover:bg-[#5f1717]"
        >
          CREATE FREE WEDDING CARD
        </button>
      </section>

      <section id="templates" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-maroon">Templates</h2>
          <div className="flex gap-2" role="group" aria-label="Filter templates">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  filter === f ? 'border-maroon bg-maroon text-white' : 'border-stone-300 bg-white text-stone-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t, i) => (
            <Fragment key={t.id}>
              <button
                disabled={!t.ready}
                onClick={() => openEditor(t.id)}
                className="group w-full rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-stone-200 enabled:hover:shadow-md disabled:cursor-not-allowed"
              >
                <div className="pointer-events-none">
                  {t.ready ? (
                    <ScaledCard>
                      <RoyalMarigoldPage data={preview} page="cover" />
                    </ScaledCard>
                  ) : (
                    <div
                      className="mx-auto flex aspect-[148/210] max-w-[444px] items-center justify-center rounded shadow-xl"
                      style={{ background: t.swatch }}
                    >
                      <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold tracking-wider text-stone-700">
                        COMING SOON
                      </span>
                    </div>
                  )}
                </div>
                <p className="mt-4 font-display text-sm font-bold text-maroon">{t.name}</p>
                <p className="text-xs text-stone-500">{t.tag}</p>
              </button>
              {/* Ad between gallery rows (every 3 templates = one desktop row) */}
              {(i + 1) % 3 === 0 && <AdSlot slot="gallery-inline" className="col-span-full" />}
            </Fragment>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-500">
        Everything stays in your browser. Nothing is uploaded.
      </footer>
    </div>
  )
}
