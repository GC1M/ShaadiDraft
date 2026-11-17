import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { PAGE_TITLES, RoyalMarigoldPage } from './card/RoyalMarigold'
import { defaultInvite, sampleInvite, type AuspiciousHeader, type EventInfo, type PageId, type Person, type WeddingInviteData } from './types'
import { AdSlot, ScaledCard } from './ui'

type Props = { data: WeddingInviteData; setData: Dispatch<SetStateAction<WeddingInviteData>> }

const HEADERS: { value: AuspiciousHeader; label: string }[] = [
  { value: 'ganesh', label: 'Shree Ganeshay Namah' },
  { value: 'ikonkar', label: 'Ik Onkar' },
  { value: 'bismillah', label: 'Bismillah' },
  { value: 'custom', label: 'Custom text' },
  { value: 'none', label: 'None' },
]

const EXTRA_FIELD = {
  haldi: { key: 'dressCode', label: 'Dress code note', placeholder: 'Shades of yellow & green' },
  sangeet: { key: 'rsvp', label: 'RSVP contact', placeholder: 'Name · +91 98765 43210' },
  reception: { key: 'hosts', label: 'Family host footer', placeholder: 'The Sharma & Mehta Families' },
} as const

const inputCls =
  'mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-[15px] outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20'

function Field(props: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-stone-600">{props.label}</span>
      <input
        type={props.type ?? 'text'}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  )
}

export default function Editor({ data, setData }: Props) {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')
  const [page, setPage] = useState<PageId>('cover')
  const [downloading, setDownloading] = useState(false)

  const pages: PageId[] = ['cover', ...data.pages.filter((p) => p.enabled).map((p) => p.id)]
  const current = pages.includes(page) ? page : 'cover'

  // Clone-and-mutate keeps nested updates one-liners.
  const edit = (fn: (d: WeddingInviteData) => void) =>
    setData((d) => {
      const copy = structuredClone(d)
      fn(copy)
      return copy
    })

  const personFields = (who: 'bride' | 'groom', title: string) => {
    const p = data.cover[who]
    const set = (k: keyof Person) => (v: string) => edit((d) => void (d.cover[who][k] = v))
    return (
      <fieldset className="space-y-3">
        <legend className="mb-2 font-display text-sm font-bold text-maroon">{title}</legend>
        <Field label="Full name" value={p.name} onChange={set('name')} />
        <Field label="Parents" value={p.parents} onChange={set('parents')} placeholder="Mr. & Mrs. ..." />
        <Field label="Grandparents" value={p.grandparents} onChange={set('grandparents')} placeholder="Shri & Smt. ..." />
      </fieldset>
    )
  }

  const eventFields = (info: EventInfo, set: (k: keyof EventInfo, v: string) => void, timeLabel = 'Time') => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Field label="Date" type="date" value={info.date} onChange={(v) => set('date', v)} />
      <Field label={timeLabel} value={info.time} onChange={(v) => set('time', v)} placeholder="7:30 PM onwards" />
      <Field label="Venue" value={info.venue} onChange={(v) => set('venue', v)} />
      <Field label="Address / City" value={info.address} onChange={(v) => set('address', v)} />
    </div>
  )

  const move = (i: number, dir: -1 | 1) =>
    edit((d) => {
      const j = i + dir
      ;[d.pages[i], d.pages[j]] = [d.pages[j], d.pages[i]]
    })

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
          <a href="#" className="font-display font-bold tracking-widest text-maroon">
            ShaadiDraft
          </a>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setData((d) => sampleInvite(d.themeId, d.pages))}
              className="rounded-full border border-maroon px-3 py-1.5 text-sm font-medium text-maroon hover:bg-maroon/5"
            >
              Quick Sample Fill
            </button>
            <button
              onClick={() => setDownloading(true)}
              className="rounded-full bg-maroon px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#5f1717]"
            >
              Download PDF
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:hidden" role="tablist">
          {(['edit', 'preview'] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`border-b-2 py-2.5 text-sm font-semibold ${tab === t ? 'border-maroon text-maroon' : 'border-transparent text-stone-500'}`}
            >
              {t === 'edit' ? 'Edit Details' : 'Live Preview'}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
        {/* ---------- Form ---------- */}
        <div className={`space-y-6 ${tab === 'edit' ? '' : 'hidden'} lg:block`}>
          <section className="space-y-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="font-display text-lg font-bold text-maroon">Page 1 · Main Wedding Invite</h2>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-stone-600">Auspicious header</span>
              <select
                value={data.cover.header}
                onChange={(e) => edit((d) => void (d.cover.header = e.target.value as AuspiciousHeader))}
                className={inputCls}
              >
                {HEADERS.map((h) => (
                  <option key={h.value} value={h.value}>
                    {h.label}
                  </option>
                ))}
              </select>
            </label>
            {data.cover.header === 'custom' && (
              <Field
                label="Custom header text"
                value={data.cover.customHeader}
                onChange={(v) => edit((d) => void (d.cover.customHeader = v))}
                placeholder="|| Shubh Vivah ||"
              />
            )}
            <div className="grid gap-6 sm:grid-cols-2">
              {personFields('bride', 'Bride')}
              {personFields('groom', 'Groom')}
            </div>
            <h3 className="pt-2 font-display text-sm font-bold text-maroon">Wedding Ceremony</h3>
            {eventFields(data.cover.wedding, (k, v) => edit((d) => void (d.cover.wedding[k] = v)), 'Muhurat / Time')}
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-maroon">Event Pages</h2>
            {data.pages.map((p, i) => {
              const extra = EXTRA_FIELD[p.id]
              const ev = data.events[p.id]
              return (
                <details key={p.id} className="group rounded-xl bg-white shadow-sm ring-1 ring-stone-200">
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
                    <input
                      type="checkbox"
                      checked={p.enabled}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => edit((d) => void (d.pages[i].enabled = e.target.checked))}
                      aria-label={`Include ${PAGE_TITLES[p.id]} page`}
                      className="size-4 accent-maroon"
                    />
                    <span className={`font-semibold ${p.enabled ? 'text-stone-800' : 'text-stone-400 line-through'}`}>
                      {PAGE_TITLES[p.id]}
                    </span>
                    <span className="ml-auto flex gap-1">
                      {([-1, 1] as const).map((dir) => (
                        <button
                          key={dir}
                          type="button"
                          disabled={i + dir < 0 || i + dir >= data.pages.length}
                          onClick={(e) => {
                            e.preventDefault()
                            move(i, dir)
                          }}
                          aria-label={`Move ${PAGE_TITLES[p.id]} ${dir < 0 ? 'up' : 'down'}`}
                          className="rounded border border-stone-300 px-2 py-0.5 text-sm text-stone-600 hover:bg-stone-100 disabled:opacity-30"
                        >
                          {dir < 0 ? '↑' : '↓'}
                        </button>
                      ))}
                      <span className="px-1 text-stone-400 transition group-open:rotate-180">▾</span>
                    </span>
                  </summary>
                  <div className="space-y-3 border-t border-stone-100 p-4">
                    {eventFields(ev, (k, v) => edit((d) => void (d.events[p.id][k] = v)))}
                    <Field
                      label={extra.label}
                      value={(ev as unknown as Record<string, string>)[extra.key]}
                      placeholder={extra.placeholder}
                      onChange={(v) => edit((d) => void ((d.events[p.id] as unknown as Record<string, string>)[extra.key] = v))}
                    />
                  </div>
                </details>
              )
            })}
          </section>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setDownloading(true)}
              className="rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5f1717]"
            >
              Download PDF ({pages.length} {pages.length === 1 ? 'page' : 'pages'})
            </button>
            <button
              onClick={() => confirm('Clear all details and start over?') && setData((d) => defaultInvite(d.themeId))}
              className="rounded-full px-4 py-2.5 text-sm text-stone-500 hover:text-maroon"
            >
              Reset
            </button>
          </div>

          <AdSlot slot="editor-below-controls" />
        </div>

        {/* ---------- Preview (ad-free) ---------- */}
        <div className={`${tab === 'preview' ? '' : 'hidden'} lg:block`}>
          <div className="space-y-4 lg:sticky lg:top-20">
            <div className="flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Card pages">
              {pages.map((id, n) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={current === id}
                  onClick={() => setPage(id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    current === id ? 'bg-maroon text-white' : 'bg-white text-stone-600 ring-1 ring-stone-200'
                  }`}
                >
                  {n + 1}. {PAGE_TITLES[id]}
                </button>
              ))}
            </div>
            <ScaledCard>
              <RoyalMarigoldPage data={data} page={current} />
            </ScaledCard>
          </div>
        </div>
      </main>

      {downloading && <DownloadModal data={data} pages={pages} onClose={() => setDownloading(false)} />}
    </div>
  )
}

function DownloadModal({ data, pages, onClose }: { data: WeddingInviteData; pages: PageId[]; onClose: () => void }) {
  const exportRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const slug = [data.cover.bride.name, data.cover.groom.name]
      .map((n) => n.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z0-9]/g, ''))
      .filter(Boolean)
      .join('-')
    // Hold the modal for at least 3s so the ad zone gets a fair impression.
    Promise.all([import('./pdf').then((m) => m.buildPdf(exportRef.current!)), new Promise((r) => setTimeout(r, 3000))])
      .then(([pdf]) => {
        if (cancelled) return
        pdf.save(`${slug || 'wedding'}-invitation.pdf`)
        onClose()
      })
      .catch((e) => {
        console.error(e)
        if (!cancelled) setError('Something went wrong while creating the PDF. Please try again.')
      })
    return () => {
      cancelled = true
    }
    // Runs once per modal open; data is a snapshot of that moment.
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 text-center shadow-2xl">
        {error ? (
          <>
            <p className="text-sm text-red-700">{error}</p>
            <button onClick={onClose} className="rounded-full bg-maroon px-5 py-2 text-sm font-semibold text-white">
              Close
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto size-10 animate-spin rounded-full border-4 border-gold/30 border-t-maroon" />
            <p className="font-display font-bold text-maroon">Preparing your high-resolution PDF...</p>
            <p className="text-xs text-stone-500">
              {pages.length} {pages.length === 1 ? 'page' : 'pages'} · A5 · print-ready
            </p>
          </>
        )}
        <AdSlot slot="download-modal" className="min-h-[250px]" />
      </div>

      {/* Full-size, unscaled pages captured for the PDF. Off-screen but rendered (not display:none). */}
      <div ref={exportRef} aria-hidden className="pointer-events-none fixed top-0" style={{ left: -100000 }}>
        {pages.map((id) => (
          <div key={id}>
            <RoyalMarigoldPage data={data} page={id} />
          </div>
        ))}
      </div>
    </div>
  )
}
