import { ArrowDown, ArrowLeft, ArrowUp, Check, Eye, FileDown, ImageDown, Loader2, Plus, RotateCcw, Share2, Trash2 } from 'lucide-react'
import { flushSync } from 'react-dom'
import { useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Wordmark } from './App'
import { CardPage, SIZES } from './card/Card'
import { LANGS, SAMPLES } from './i18n'
import { samplePages, sectionsPage, templateById } from './templates'
import { TransliterateInput } from './transliterate'
import { LANG_IDS, type CoverPage, type FontScale, type Format, type Invite, type Lang, type Page, type SectionsPage } from './types'
import { ScaledCard, Segmented } from './ui'
import { track } from './analytics'

type Props = { invite: Invite; setInvite: Dispatch<SetStateAction<Invite | null>>; onBack: () => void }

const inputCls = 'mt-1 w-full rounded-lg border border-stone-400 bg-white px-3 py-2 text-base outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20'
const stripIds = (pages: Page[]) => JSON.stringify(pages.map(({ id: _id, ...rest }) => rest))

export default function Editor({ invite, setInvite, onBack }: Props) {
  const t = templateById(invite.templateId)
  const [current, setCurrent] = useState(invite.pages[0]?.id)
  const [zoom, setZoom] = useState<'fit' | '100'>('fit')
  const [phonetic, setPhonetic] = useState(true)
  const [busy, setBusy] = useState<'' | 'png' | 'pdf' | 'share'>('')
  const [toast, setToast] = useState('')
  const exportRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLElement>(null)
  const asideRef = useRef<HTMLElement>(null)
  // Phones stack the preview under the form; a floating button jumps to it while it's out of view.
  const [previewSeen, setPreviewSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPreviewSeen(e.isIntersecting))
    io.observe(asideRef.current!)
    return () => io.disconnect()
  }, [])
  const stacked = () => !matchMedia('(min-width: 1024px)').matches

  const page = invite.pages.find((p) => p.id === current) ?? invite.pages[0]
  const index = invite.pages.indexOf(page)
  const { w, h } = SIZES[invite.format]
  const L = invite.lang

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(''), 3500)
    return () => clearTimeout(id)
  }, [toast])

  // Keep the page being edited in view in the preview.
  useEffect(() => {
    const box = previewRef.current
    const el = box?.querySelector<HTMLElement>(`[data-page="${page.id}"]`)
    if (box && el) box.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' })
  }, [page.id, zoom, invite.format])

  const set = (patch: Partial<Invite>) => setInvite((i) => i && { ...i, ...patch })
  const editPage = (fn: (p: Page) => Page) => setInvite((i) => i && { ...i, pages: i.pages.map((p) => (p.id === page.id ? fn(p) : p)) })
  const editCover = (patch: Partial<CoverPage>) => editPage((p) => ({ ...(p as CoverPage), ...patch }))
  const editSections = (fn: (p: SectionsPage) => SectionsPage) => editPage((p) => fn(p as SectionsPage))

  const changeLang = (lang: Lang) => {
    const untouched = stripIds(invite.pages) === stripIds(samplePages(t, invite.lang))
    if (untouched || confirm(`Replace your text with the ${LANGS[lang].name} sample text? Choose Cancel to keep your text and only switch fonts and typing.`)) {
      const pages = samplePages(t, lang)
      set({ lang, pages })
      setCurrent(pages[0].id)
    } else set({ lang })
  }
  const reset = () => {
    if (!confirm('Replace every page with the sample text?')) return
    const pages = samplePages(t, invite.lang)
    set({ pages })
    setCurrent(pages[0].id)
  }

  const move = (dir: -1 | 1) =>
    setInvite((i) => {
      if (!i) return i
      const pages = [...i.pages]
      const j = index + dir
      ;[pages[index], pages[j]] = [pages[j], pages[index]]
      return { ...i, pages }
    })
  const remove = () => {
    if (invite.pages.length < 2 || !confirm('Delete this page?')) return
    const pages = invite.pages.filter((p) => p.id !== page.id)
    set({ pages })
    setCurrent(pages[Math.max(0, index - 1)].id)
  }
  const s = SAMPLES[L]
  const PAGE_KINDS: { label: string; make: () => SectionsPage }[] = [
    { label: 'Event details', make: () => sectionsPage(s.functions.title, s.functions.sections.slice(0, 2)) },
    { label: 'Invitation letter', make: () => sectionsPage(s.letter.title, [['', s.letter.body]]) },
    { label: 'Family names', make: () => sectionsPage(s.family.title, s.family.sections) },
    { label: 'Message / RSVP', make: () => sectionsPage(s.message.title, [['', s.message.body]]) },
  ]
  const addPage = (make: () => SectionsPage) => {
    const p = make()
    set({ pages: [...invite.pages, p] })
    setCurrent(p.id)
  }

  const cover = invite.pages.find((p) => p.kind === 'cover') as CoverPage | undefined
  const slug =
    [cover?.bride.name, cover?.groom.name]
      .map((n) => (n ?? '').toLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, '')) // keeps Indic names
      .filter(Boolean)
      .join('-') || t.id

  // Renders pages off-screen at full size, then captures them.
  const [exportPages, setExportPages] = useState<Page[] | null>(null)
  const run = async (kind: 'png' | 'pdf' | 'share') => {
    setBusy(kind)
    // Mount the off-screen pages (and run their auto-fit layout effects) before capturing.
    flushSync(() => setExportPages(kind === 'png' ? [page] : invite.pages))
    try {
      const m = await import('./pdf')
      const el = exportRef.current!
      if (kind === 'pdf') {
        save(await m.buildPdf(el, invite.format, `${slug}-invitation`))
        setToast('PDF downloaded')
      } else {
        const files = await m.buildPngs(el, invite.format, kind === 'png' ? `${slug}-page-${index + 1}` : `${slug}-invitation`)
        if (kind === 'share' && navigator.canShare?.({ files })) {
          await navigator.share({ files, title: 'Wedding invitation' }).catch((e) => {
            if (e.name !== 'AbortError') throw e
          })
        } else {
          files.forEach(save)
          setToast(files.length > 1 ? `${files.length} images downloaded` : 'Image downloaded')
        }
      }
      track('export', { kind, format: invite.format, pages: invite.pages.length, template: invite.templateId })
    } catch (e) {
      console.error(e)
      track('export_failed', { kind, format: invite.format, error: String(e).slice(0, 150) })
      setToast('Could not create the file. Please try again.')
    } finally {
      setBusy('')
      setExportPages(null)
    }
  }

  const btn = 'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium disabled:opacity-60'
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  return (
    // Families' names, dates and venues never reach Clarity recordings; clicks and layout still do.
    <div className="min-h-screen" data-clarity-mask="true">
      <header className="sticky top-0 z-20 bg-wine text-rose shadow-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
          <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-rose/85 hover:text-rose">
            <ArrowLeft className="size-4" aria-hidden /> Back to templates
          </button>
          <span className="hidden sm:inline">
            <Wordmark />
          </span>
          <div className="ml-auto flex flex-wrap gap-2">
            <button onClick={() => run('png')} disabled={!!busy} className={`${btn} bg-zari text-wine-deep hover:bg-zari-light`}>
              {busy === 'png' ? <Loader2 className="size-4 animate-spin" /> : <ImageDown className="size-4" />} Download PNG
            </button>
            <button onClick={() => run('pdf')} disabled={!!busy} className={`${btn} border border-zari/80 text-rose hover:bg-white/10`}>
              {busy === 'pdf' ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />} PDF ({invite.pages.length})
            </button>
            {canShare && (
              <button onClick={() => run('share')} disabled={!!busy} className={`${btn} border border-zari/80 text-rose hover:bg-white/10`}>
                {busy === 'share' ? <Loader2 className="size-4 animate-spin" /> : <Share2 className="size-4" />} Share
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)]">
        <div className="min-w-0 space-y-8">
          <section className="space-y-4">
            <h1 className="font-display text-3xl">{t.name}</h1>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
              <label className="block">
                <span className="text-[13px] text-stone-600">Card language</span>
                <select value={L} onChange={(e) => changeLang(e.target.value as Lang)} className={`${inputCls} w-auto`}>
                  {LANG_IDS.map((l) => (
                    <option key={l} value={l}>
                      {l === 'en' ? 'English' : `${LANGS[l].name} (${LANGS[l].native})`}
                    </option>
                  ))}
                </select>
              </label>
              <Control label="Card shape">
                <Segmented<Format>
                  label="Card shape"
                  value={invite.format}
                  onChange={(format) => set({ format })}
                  options={[
                    { id: 'story', label: 'Phone 9:16' },
                    { id: 'print', label: 'Print 5:7' },
                  ]}
                />
              </Control>
              <Control label="Text size">
                <Segmented<FontScale>
                  label="Text size"
                  value={invite.scale}
                  onChange={(scale) => set({ scale })}
                  options={[
                    { id: 's', label: 'S' },
                    { id: 'm', label: 'M' },
                    { id: 'l', label: 'L' },
                  ]}
                />
              </Control>
            </div>
            {L !== 'en' && (
              <label className="flex items-start gap-2 text-[15px] text-stone-700">
                <input type="checkbox" checked={phonetic} onChange={(e) => setPhonetic(e.target.checked)} className="mt-1 size-4 accent-maroon" />
                <span>
                  Type in English letters and get {LANGS[L].native}. Press space to accept a word, Esc to keep English.
                  <span className="block text-[13px] text-stone-500">Each word you type is sent to Google's transliteration service.</span>
                </span>
              </label>
            )}
          </section>

          <section className="space-y-3 border-t border-zari/50 pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="mr-2 font-display text-xl">Pages</h2>
              {invite.pages.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setCurrent(p.id)}
                  aria-current={p.id === page.id}
                  className={`max-w-[11rem] truncate rounded-full px-3.5 py-1.5 text-sm ${p.id === page.id ? 'bg-maroon text-white' : 'bg-white text-stone-700 ring-1 ring-stone-300'}`}
                >
                  {i + 1}. {(p.kind === 'cover' ? p.title : p.title) || 'Untitled'}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <button onClick={() => move(-1)} disabled={index === 0} className="inline-flex size-10 items-center justify-center rounded-full ring-1 ring-stone-300 disabled:opacity-30" aria-label="Move page earlier">
                <ArrowUp className="size-4" />
              </button>
              <button onClick={() => move(1)} disabled={index === invite.pages.length - 1} className="inline-flex size-10 items-center justify-center rounded-full ring-1 ring-stone-300 disabled:opacity-30" aria-label="Move page later">
                <ArrowDown className="size-4" />
              </button>
              <button onClick={remove} disabled={invite.pages.length < 2} className="inline-flex size-10 items-center justify-center rounded-full ring-1 ring-stone-300 disabled:opacity-30" aria-label="Delete page">
                <Trash2 className="size-4" />
              </button>
              <span className="ml-2 text-stone-500">Add page:</span>
              {PAGE_KINDS.map((k) => (
                <button key={k.label} onClick={() => addPage(k.make)} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-maroon ring-1 ring-maroon/40 hover:bg-maroon/5">
                  <Plus className="size-3.5" aria-hidden /> {k.label}
                </button>
              ))}
            </div>
          </section>

          <section ref={formRef} className="scroll-mt-28 space-y-4 border-t border-zari/50 pt-6">
            <p className="text-[13px] text-stone-600">
              Press Enter for a new line. Wrap a word in stars, like *Sajode*, to print it in the accent colour.
            </p>
            {page.kind === 'cover' ? (
              <CoverForm p={page} on={editCover} lang={L} phonetic={phonetic} />
            ) : (
              <SectionsForm p={page} on={editSections} lang={L} phonetic={phonetic} />
            )}
            <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm text-stone-600 hover:text-maroon">
              <RotateCcw className="size-4" aria-hidden /> Reset to sample text
            </button>
          </section>
        </div>

        <aside ref={asideRef} className="min-w-0 scroll-mt-28">
          <div className="space-y-3 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-600">
                Page {index + 1} of {invite.pages.length}
              </p>
              <Segmented<'fit' | '100'>
                label="Zoom"
                value={zoom}
                onChange={setZoom}
                options={[
                  { id: 'fit', label: 'Fit' },
                  { id: '100', label: '100%' },
                ]}
              />
            </div>
            {/* Every page in one scrollable column, like a PDF viewer. Click a page to edit it. */}
            <div ref={previewRef} className="relative max-h-[80vh] space-y-5 overflow-auto rounded-lg bg-stone-200/50 p-4 ring-1 ring-stone-300 lg:max-h-[calc(100vh-9rem)]">
              {invite.pages.map((p, i) => (
                <button
                  key={p.id}
                  data-page={p.id}
                  onClick={() => {
                    setCurrent(p.id)
                    if (stacked()) formRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  aria-label={`Edit page ${i + 1}`}
                  aria-current={p.id === page.id}
                  className={`mx-auto block rounded-sm ${p.id === page.id ? 'ring-2 ring-maroon ring-offset-4 ring-offset-stone-100' : ''}`}
                  style={zoom === 'fit' ? { width: '100%', maxWidth: invite.format === 'story' ? 380 : 460 } : { width: w }}
                >
                  <div className="pointer-events-none">
                    {zoom === 'fit' ? (
                      <ScaledCard w={w} h={h}>
                        <CardPage invite={invite} page={p} />
                      </ScaledCard>
                    ) : (
                      <div className="shadow-xl">
                        <CardPage invite={invite} page={p} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {exportPages && (
        <div ref={exportRef} aria-hidden className="pointer-events-none fixed top-0" style={{ left: -100000 }}>
          {exportPages.map((p) => (
            <div key={p.id}>
              <CardPage invite={invite} page={p} />
            </div>
          ))}
        </div>
      )}

      {!previewSeen && !toast && (
        <button
          type="button"
          onClick={() => asideRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-5 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-medium text-white shadow-xl lg:hidden"
        >
          <Eye className="size-4" aria-hidden /> Preview page {index + 1}
        </button>
      )}

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-rose shadow-xl">
          <Check className="size-4 text-zari" aria-hidden /> {toast}
        </div>
      )}
    </div>
  )
}

function save(file: File) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = file.name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}

const Control = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <span className="mb-1 block text-[13px] text-stone-600">{label}</span>
    {children}
  </div>
)

type FieldProps = { label: string; value: string; onChange: (v: string) => void; lang: Lang; phonetic: boolean; multiline?: boolean; rows?: number }

function Field({ label, value, onChange, lang, phonetic, multiline, rows = 3 }: FieldProps) {
  return (
    <label className="block">
      <span className="text-[13px] text-stone-600">{label}</span>
      <TransliterateInput lang={lang} enabled={phonetic} value={value} onChange={onChange} multiline={multiline} rows={multiline ? rows : undefined} className={inputCls} />
    </label>
  )
}

function CoverForm({ p, on, lang, phonetic }: { p: CoverPage; on: (patch: Partial<CoverPage>) => void; lang: Lang; phonetic: boolean }) {
  const f = (label: string, key: keyof CoverPage, multiline = false) => (
    <Field label={label} value={p[key] as string} onChange={(v) => on({ [key]: v })} lang={lang} phonetic={phonetic} multiline={multiline} rows={2} />
  )
  const person = (who: 'bride' | 'groom', title: string) => (
    <fieldset className="space-y-3">
      <legend className="mb-1 font-display text-lg">{title}</legend>
      <Field label="Name" value={p[who].name} onChange={(name) => on({ [who]: { ...p[who], name } })} lang={lang} phonetic={phonetic} />
      <Field label="Parents (optional)" value={p[who].parents} onChange={(parents) => on({ [who]: { ...p[who], parents } })} lang={lang} phonetic={phonetic} />
    </fieldset>
  )
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {f('Sacred invocation / header', 'invocation')}
        {f('Event title', 'title')}
      </div>
      {f('Shlok (optional)', 'shlok', true)}
      {f('Host / parents line', 'hostLine', true)}
      <div className="grid gap-6 sm:grid-cols-2">
        {person('bride', 'Bride')}
        {person('groom', 'Groom')}
      </div>
      {f('Word between the names', 'joiner')}
      <div className="grid gap-4 sm:grid-cols-2">
        {f('Date & day', 'date')}
        {f('Time / Shubh Muhurat', 'time')}
        {f('Venue name', 'venue')}
        {f('Full address', 'address')}
        {f('RSVP heading', 'rsvpTitle')}
      </div>
      {f('RSVP / family contact details', 'rsvp', true)}
    </div>
  )
}

function SectionsForm({ p, on, lang, phonetic }: { p: SectionsPage; on: (fn: (p: SectionsPage) => SectionsPage) => void; lang: Lang; phonetic: boolean }) {
  const setSection = (i: number, patch: Partial<SectionsPage['sections'][number]>) =>
    on((q) => ({ ...q, sections: q.sections.map((s, j) => (j === i ? { ...s, ...patch } : s)) }))
  return (
    <div className="space-y-5">
      <Field label="Page title" value={p.title} onChange={(title) => on((q) => ({ ...q, title }))} lang={lang} phonetic={phonetic} />
      {p.sections.map((s, i) => (
        <fieldset key={i} className="space-y-3 rounded-xl bg-white/60 p-4 ring-1 ring-stone-300">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Field label={`Section ${i + 1} heading (optional)`} value={s.heading} onChange={(heading) => setSection(i, { heading })} lang={lang} phonetic={phonetic} />
            </div>
            <button
              onClick={() => on((q) => ({ ...q, sections: q.sections.filter((_, j) => j !== i) }))}
              className="mb-0.5 inline-flex size-10 items-center justify-center rounded-full text-stone-500 ring-1 ring-stone-300 hover:text-maroon"
              aria-label={`Remove section ${i + 1}`}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
          <Field label="Text" value={s.body} onChange={(body) => setSection(i, { body })} lang={lang} phonetic={phonetic} multiline rows={Math.min(10, Math.max(3, s.body.split('\n').length + 1))} />
        </fieldset>
      ))}
      <button
        onClick={() => on((q) => ({ ...q, sections: [...q.sections, { heading: '', body: '' }] }))}
        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-maroon ring-1 ring-maroon/40 hover:bg-maroon/5"
      >
        <Plus className="size-4" aria-hidden /> Add section
      </button>
    </div>
  )
}
