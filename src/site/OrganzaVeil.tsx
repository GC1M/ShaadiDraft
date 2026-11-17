import { useEffect, useRef, useState, type FormEvent, type MouseEvent, type PointerEvent } from 'react'
import './organza.css'

// Sample couple website ("Organza Veil" theme). Demo content only: the couple, their story and the
// guests are fictional, and the pictures are drawn inline so the page needs no photo licences.
// ponytail: RSVPs and blessings live in this browser's localStorage, so guests can't see each other's.
// Swap the two load/save helpers for a realtime backend (e.g. Supabase) when the hosted microsite ships.

// Portrait 600x800 scenes; a real couple site would use their own photos here.
const scene = (top: string, bottom: string, body: string) =>
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="600" height="800" fill="url(#g)"/>${body}</svg>`,
  )
const palace = (fill: string) =>
  `<path fill="${fill}" d="M60 560h480v-90h-40v-40h-30v-50a30 30 0 0 0-60 0v50h-60v-70a50 50 0 0 0-100 0v70h-60v-50a30 30 0 0 0-60 0v50h-30v40h-40z"/>`
const PHOTOS = {
  couple: { src: scene('#e8b9a8', '#6d4a63', `<circle cx="300" cy="330" r="90" fill="#f7dcb4" opacity=".8"/>${palace('#4a2f45')}<rect y="560" width="600" height="240" fill="#3b2433"/><path d="M80 620h440M140 660h320M200 700h200" stroke="#f7dcb4" stroke-width="3" opacity=".5"/>`), alt: 'An illustrated lake palace at dusk' },
  umbrella: { src: scene('#c9d1c3', '#8a9a8a', `${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 71) % 600} ${(i * 113) % 800}l-8 26" stroke="#fbfaf8" stroke-width="2" opacity=".6"/>`).join('')}<path d="M150 420a150 120 0 0 1 300 0q-37-30-75 0q-37-30-75 0q-37-30-75 0q-37-30-75 0z" fill="#c98f8f"/><path d="M300 420v170a24 24 0 0 1-48 0" fill="none" stroke="#3b2433" stroke-width="8" stroke-linecap="round"/>`), alt: 'An illustrated rose umbrella in the rain' },
  distance: { src: scene('#2b2140', '#5d4a6e', `${Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 97) % 600}" cy="${(i * 61) % 560}" r="${1 + (i % 3)}" fill="#fbfaf8" opacity=".7"/>`).join('')}<circle cx="170" cy="250" r="9" fill="#e8c77e"/><circle cx="430" cy="250" r="9" fill="#e8c77e"/><path d="M170 250Q300 120 430 250" fill="none" stroke="#e8c77e" stroke-width="2" stroke-dasharray="6 8"/><path d="M0 640q150-60 300 0t300 0v160H0z" fill="#3b2433"/>`), alt: 'Two stars joined by a dotted line over a night sky' },
  lake: { src: scene('#f2c48d', '#c98f8f', `<circle cx="300" cy="420" r="120" fill="#fbe3b8"/><rect y="470" width="600" height="330" fill="#7e6a8a"/><path d="M220 560h160l-30 30h-100z" fill="#3b2433"/><path d="M300 560v-70l45 60z" fill="#fbfaf8"/><path d="M60 650h480M120 700h360" stroke="#fbe3b8" stroke-width="3" opacity=".6"/>`), alt: 'An illustrated boat on a lake at sunset' },
  henna: { src: scene('#d9a066', '#8a4b2a', `${[0, 1, 2, 3].map((k) => `<circle cx="300" cy="400" r="${70 + k * 70}" fill="none" stroke="#5a2a14" stroke-width="5" stroke-dasharray="${4 + k * 3} ${10 + k * 4}"/>`).join('')}<path d="M300 300c60 40 60 160 0 200c-60-40-60-160 0-200z" fill="#5a2a14"/>`), alt: 'An illustrated mehendi pattern' },
} as const
type Photo = (typeof PHOTOS)[keyof typeof PHOTOS]

const STORY: { year: string; title: string; body: string; photo: Photo }[] = [
  {
    year: '2016',
    title: 'A borrowed umbrella',
    body: 'First week of college in Pune, the monsoon came early, and Arjun had the only umbrella at the bus stop. Ananya kept it for a month.',
    photo: PHOTOS.umbrella,
  },
  {
    year: '2019',
    title: 'Bengaluru to Delhi',
    body: 'Two jobs, two cities, and three years of video calls that started with “have you eaten?”',
    photo: PHOTOS.distance,
  },
  {
    year: '2025',
    title: 'The question, on Lake Pichola',
    body: 'A boat, a sunset and a ring that nearly went overboard. She said yes before he finished asking.',
    photo: PHOTOS.lake,
  },
  {
    year: '2026',
    title: 'Udaipur, with everyone',
    body: 'We’re getting married by the lake, with the people who’ve watched all of this happen.',
    photo: PHOTOS.couple,
  },
]

type WeddingEvent = { id: string; name: string; date: string; start: string; end: string; time: string; note: string; photo: Photo }
const VENUE = 'The Leela Palace, Lake Pichola, Udaipur'
const EVENTS: WeddingEvent[] = [
  { id: 'mehendi', name: 'Mehendi', date: 'Saturday, 21 November 2026', start: '20261121T160000', end: '20261121T220000', time: '4 pm until late', note: 'Floor seating and a lot of henna. Wear something you can sit cross-legged in.', photo: PHOTOS.henna },
  { id: 'haldi', name: 'Haldi', date: 'Sunday, 22 November 2026', start: '20261122T100000', end: '20261122T123000', time: '10 am', note: 'You will be painted yellow. Wear white you don’t mind losing.', photo: PHOTOS.lake },
  { id: 'pheras', name: 'Pheras', date: 'Sunday, 22 November 2026', start: '20261122T153000', end: '20261122T193000', time: '3:30 pm', note: 'Seven rounds of the fire by the lake, then dinner on the lawns.', photo: PHOTOS.couple },
]

const VOWS = [
  'We will keep each other fed, in every sense of the word.',
  'We will be each other’s strength on the days one of us has none.',
  'We will build a life of honest work, and know when we have enough.',
  'We will treat both our families as one family.',
  'We will raise our children with patience and a lot of laughter.',
  'We will take every season together, monsoon included.',
  'We will stay best friends.',
]

/* ---------- local persistence ---------- */

type Rsvp = { name: string; side: string; events: string[]; party: number; note: string }
type Blessing = { name: string; text: string; at: number }
const RSVP_KEY = 'shaadidraft:ananya-arjun:rsvp'
const BLESS_KEY = 'shaadidraft:ananya-arjun:blessings'
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private mode: the page still works for this visit */
  }
}

function downloadIcs(e: WeddingEvent) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ShaadiDraft//Sample//EN',
    'BEGIN:VEVENT',
    `UID:${e.id}-ananya-arjun@shaadidraft`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Asia/Kolkata:${e.start}`,
    `DTEND;TZID=Asia/Kolkata:${e.end}`,
    `SUMMARY:${e.name}: Ananya and Arjun`,
    `LOCATION:${VENUE.replace(/,/g, '\\,')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = `${e.id}-ananya-arjun.ics`
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000) // Safari/Firefox fetch the blob after click returns
}

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- sections ---------- */

function Hero() {
  const [x, setX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [open, setOpen] = useState(false)
  const origin = useRef(0)

  const lift = (dir = 1) => {
    setOpen(true)
    setX(dir * (innerWidth + 300)) // clear the skewed hem too
  }
  const onDown = (e: PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    origin.current = e.clientX - x
    setDragging(true)
  }
  const onMove = (e: PointerEvent) => dragging && setX(e.clientX - origin.current)
  const onUp = () => {
    setDragging(false)
    if (Math.abs(x) > innerWidth * 0.28) lift(Math.sign(x))
    else setX(0)
  }
  // The veil billows a little in the direction it is pulled.
  const skew = Math.max(-6, Math.min(6, (-x / innerWidth) * 10))

  return (
    <header className="relative h-svh min-h-[560px] overflow-hidden">
      <img
        src={PHOTOS.couple.src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl saturate-[.8]"
      />
      <div className="absolute inset-0 bg-(--ov-ink)/25" />
      <div className="relative flex h-full items-center justify-center px-4 pb-24 pt-16">
        <figure className="ov-arch h-[min(68svh,600px)] aspect-[634/930] max-w-[80vw] shadow-2xl">
          <img src={PHOTOS.couple.src} alt={PHOTOS.couple.alt} className="h-full w-full object-cover" />
        </figure>
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 px-6 pb-8 text-center text-(--ov-white) ov-fade ${open ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="ov-display text-4xl sm:text-6xl">Ananya and Arjun</h1>
        <p className="mt-2 text-sm sm:text-base">are getting married on 22 November 2026, in Udaipur</p>
      </div>

      {/* The veil. Inert once lifted; the button inside is the keyboard path. */}
      <div
        inert={open}
        className="ov-veil"
        style={{
          transform: `translateX(${x}px) skewX(${skew}deg)`,
          transition: dragging || reducedMotion() ? 'none' : 'transform 1100ms cubic-bezier(.22,.8,.2,1)',
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <span className="ov-kinari left-0" />
        <span className="ov-kinari right-0" />
        <div className="relative flex h-full select-none flex-col items-center justify-center px-10 text-center">
          <p className="ov-display text-[clamp(4rem,14vw,10rem)] leading-[0.9]">Ananya</p>
          <p className="ov-display my-2 text-3xl text-(--ov-zari) sm:text-4xl">and</p>
          <p className="ov-display text-[clamp(4rem,14vw,10rem)] leading-[0.9]">Arjun</p>
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed">
            Two families, one lake in Udaipur, and you. Sunday, 22 November 2026.
          </p>
          <button
            type="button"
            onClick={() => lift()}
            onPointerDown={(e) => e.stopPropagation()}
            className="mt-10 border-b border-(--ov-zari) pb-1 font-semibold tracking-wide"
          >
            Lift the veil
          </button>
          <p className="mt-3 text-[13px] text-(--ov-ink)/70">or drag it aside</p>
        </div>
      </div>
    </header>
  )
}

function Story() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(Number((en.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="story" className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:gap-20">
      <div className="sticky top-0 hidden h-svh items-center md:flex">
        <figure className="ov-arch relative h-[72svh] w-full max-w-[400px] bg-(--ov-sage)">
          {STORY.map((s, i) => (
            <img
              key={s.year}
              src={s.photo.src}
              alt={s.photo.alt}
              loading="lazy"
              className={`ov-fade absolute inset-0 h-full w-full object-cover object-top ${i === active ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </figure>
      </div>
      <div>
        <h2 className="ov-display text-5xl sm:text-6xl">How we got here</h2>
        <ol>
          {STORY.map((s, i) => (
            <li
              key={s.year}
              ref={(el) => void (refs.current[i] = el)}
              data-i={i}
              className="flex min-h-[70svh] flex-col justify-center border-l border-(--ov-zari)/50 py-12 pl-8"
            >
              <img src={s.photo.src} alt={s.photo.alt} loading="lazy" className="ov-arch mb-8 aspect-[3/4] w-56 object-cover object-top md:hidden" />
              <p className="font-bodoni text-lg text-(--ov-rose)">{s.year}</p>
              <h3 className="ov-display mt-2 text-3xl sm:text-4xl">{s.title}</h3>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-(--ov-ink)/85">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Events() {
  return (
    <section id="events" aria-labelledby="events-h">
      <h2 id="events-h" className="ov-display px-6 pb-12 text-center text-5xl sm:text-6xl">
        Two days in Udaipur
      </h2>
      {/* Each event pins to the top and the next slides over it. */}
      {EVENTS.map((e) => (
        <article key={e.id} className="sticky top-0 h-svh min-h-[600px] overflow-hidden">
          <img src={e.photo.src} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl saturate-[.85]" />
          <div className="relative mx-auto flex h-full max-w-6xl items-center gap-12 px-6">
            <img
              src={e.photo.src}
              alt={e.photo.alt}
              loading="lazy"
              className="ov-arch hidden aspect-[3/4] h-[62svh] object-cover object-top shadow-2xl md:block"
            />
            <div className="ov-sheer w-full max-w-lg rounded-sm p-8 sm:p-12">
              <p className="text-sm font-semibold text-(--ov-rose)">{e.date}</p>
              <h3 className="ov-display mt-3 text-6xl sm:text-7xl">{e.name}</h3>
              <p className="mt-4 text-lg">{e.time}, at The Leela Palace</p>
              <p className="mt-4 max-w-sm leading-relaxed text-(--ov-ink)/80">{e.note}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => downloadIcs(e)}
                  className="rounded-full bg-(--ov-ink) px-5 py-2.5 text-sm font-semibold text-(--ov-white) hover:bg-(--ov-ink)/90"
                >
                  Add to calendar
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-(--ov-ink)/40 px-5 py-2.5 text-sm font-semibold hover:border-(--ov-ink)"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

function Pheras() {
  const ref = useRef<HTMLElement>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = ref.current!.getBoundingClientRect()
        setP(Math.min(1, Math.max(0, -r.top / (r.height - innerHeight))))
      })
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  const step = Math.min(6, Math.floor(p * 7))
  // Two threads, zari and rose, wind toward each other and meet in a knot at the seventh round.
  const wave = (phase: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const x = (i / 40) * 1000
      const y = 60 + Math.sin(i / 3 + phase) * 34 * (1 - i / 40)
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    }).join(' ')

  return (
    <section ref={ref} id="pheras" className="relative h-[420svh] bg-(--ov-ink) text-(--ov-white)">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6 text-center">
        <h2 className="ov-display text-4xl text-(--ov-sage) sm:text-5xl">Seven rounds, seven promises</h2>
        <p className="mt-10 text-sm font-semibold text-(--ov-zari)" aria-live="polite">
          Phera {step + 1} of 7
        </p>
        <p key={step} className="ov-display mt-4 min-h-[3.6em] max-w-2xl text-3xl leading-snug sm:text-5xl">
          {VOWS[step]}
        </p>
        <svg viewBox="0 0 1000 120" className="mt-12 w-full max-w-3xl" aria-hidden>
          {[
            { d: wave(0), c: 'var(--ov-zari)' },
            { d: wave(Math.PI), c: 'var(--ov-rose)' },
          ].map((t) => (
            <path
              key={t.c}
              d={t.d}
              pathLength={1}
              fill="none"
              stroke={t.c}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={1 - p}
            />
          ))}
          <circle cx="1000" cy="60" r={p > 0.97 ? 9 : 0} fill="var(--ov-zari)" style={{ transition: 'r 400ms ease' }} />
        </svg>
        <p className="mt-6 text-[13px] text-(--ov-white)/60">{p > 0.97 ? 'Tied.' : 'Keep scrolling to walk the rounds.'}</p>
      </div>
    </section>
  )
}

function RsvpForm() {
  const [saved, setSaved] = useState<Rsvp | null>(() => load<Rsvp | null>(RSVP_KEY, null))
  const [editing, setEditing] = useState(!saved)
  const [error, setError] = useState('')

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name')).trim()
    const events = f.getAll('events').map(String)
    if (!name) return setError('Add your name so the families know who is coming.')
    const r: Rsvp = { name, side: String(f.get('side')), events, party: Math.min(8, Math.max(1, Math.round(Number(f.get('party')) || 1))), note: String(f.get('note')).trim() }
    save(RSVP_KEY, r)
    setSaved(r)
    setEditing(false)
    setError('')
  }

  const field = 'mt-2 w-full border-b border-(--ov-ink)/30 bg-transparent py-2 text-lg outline-none focus:border-(--ov-zari)'
  return (
    <section id="rsvp" className="mx-auto max-w-2xl px-6 py-28">
      <h2 className="ov-display text-5xl sm:text-6xl">Will you be there?</h2>
      {!editing && saved ? (
        <div className="mt-10" aria-live="polite">
          <p className="ov-display text-3xl">
            {saved.events.length ? `See you in Udaipur, ${saved.name}.` : `We’ll miss you, ${saved.name}.`}
          </p>
          <p className="mt-3 text-(--ov-ink)/80">
            {saved.events.length
              ? `Party of ${saved.party} for ${saved.events.map((id) => EVENTS.find((e) => e.id === id)?.name).join(', ')}.`
              : 'You told us you can’t make it.'}
          </p>
          <button type="button" onClick={() => setEditing(true)} className="mt-6 border-b border-(--ov-zari) pb-1 font-semibold">
            Change your reply
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-10 space-y-8">
          <label className="block">
            <span className="text-sm font-semibold">Your name</span>
            <input
              name="name"
              defaultValue={saved?.name}
              placeholder="Meera Sharma"
              aria-invalid={!!error}
              aria-describedby="rsvp-err"
              onChange={() => setError('')}
              className={field}
            />
            <span id="rsvp-err" className="mt-2 block text-sm text-(--ov-rose)" role="alert">
              {error}
            </span>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">You are with</span>
            <select name="side" defaultValue={saved?.side ?? 'ananya'} className={field}>
              <option value="ananya">Ananya’s side</option>
              <option value="arjun">Arjun’s side</option>
              <option value="both">Both, somehow</option>
            </select>
          </label>
          <fieldset>
            <legend className="text-sm font-semibold">Which events? Leave all unticked if you can’t come.</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {EVENTS.map((e) => (
                <label key={e.id} className="flex cursor-pointer items-center gap-2 rounded-full border border-(--ov-ink)/25 px-4 py-2 has-[:checked]:border-(--ov-ink) has-[:checked]:bg-(--ov-ink) has-[:checked]:text-(--ov-white)">
                  <input type="checkbox" name="events" value={e.id} defaultChecked={saved ? saved.events.includes(e.id) : true} className="accent-(--ov-zari)" />
                  {e.name}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="text-sm font-semibold">How many of you, including you?</span>
            <input name="party" type="number" min={1} max={8} defaultValue={saved?.party ?? 1} className={`${field} w-24`} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Anything the hosts should know?</span>
            <input name="note" defaultValue={saved?.note} placeholder="Vegetarian, arriving from Delhi on the 13th" className={field} />
          </label>
          <button type="submit" className="rounded-full bg-(--ov-ink) px-8 py-3.5 font-semibold text-(--ov-white) hover:bg-(--ov-ink)/90">
            Send reply
          </button>
        </form>
      )}
    </section>
  )
}

function Blessings() {
  const [list, setList] = useState<Blessing[]>(() => load<Blessing[]>(BLESS_KEY, []))
  const [error, setError] = useState('')
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const name = String(f.get('name')).trim()
    const text = String(f.get('text')).trim()
    if (!name || !text) return setError('Add your name and a few words before you post.')
    const next = [{ name, text, at: Date.now() }, ...list]
    save(BLESS_KEY, next)
    setList(next)
    setError('')
    form.reset()
  }

  return (
    <section id="blessings" className="bg-(--ov-sage)/35 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="ov-display text-5xl sm:text-6xl">Leave a blessing</h2>
        <p className="mt-4 max-w-md text-(--ov-ink)/80">We’ll read every one on the morning of the pheras.</p>
        <form onSubmit={submit} noValidate className="mt-10 grid max-w-2xl gap-4">
          <input name="name" placeholder="Your name" aria-label="Your name" maxLength={60} onChange={() => setError('')} className="border-b border-(--ov-ink)/30 bg-transparent py-2 text-lg outline-none focus:border-(--ov-zari)" />
          <textarea
            name="text"
            rows={3}
            maxLength={280}
            placeholder="May your home always be this full of people who love you."
            aria-label="Your blessing"
            onChange={() => setError('')}
            className="resize-none border-b border-(--ov-ink)/30 bg-transparent py-2 text-lg outline-none focus:border-(--ov-zari)"
          />
          <p className="text-sm text-(--ov-rose)" role="alert">
            {error}
          </p>
          <button type="submit" className="justify-self-start rounded-full bg-(--ov-ink) px-8 py-3.5 font-semibold text-(--ov-white) hover:bg-(--ov-ink)/90">
            Post blessing
          </button>
        </form>
        {list.length > 0 && (
          <ul className="mt-16 gap-6 sm:columns-2 lg:columns-3">
            {list.map((b, i) => (
              <li key={`${b.at}-${i}`} className="ov-sheer mb-6 break-inside-avoid border border-(--ov-zari)/40 p-6">
                <p className="ov-display text-xl leading-snug">{b.text}</p>
                <p className="mt-4 text-sm font-semibold text-(--ov-rose)">{b.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default function OrganzaVeilSite() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Ananya and Arjun, 22 November 2026'
    return () => void (document.title = prev)
  }, [])

  return (
    <div className="ov">
      <Hero />
      <nav aria-label="Sections" className="sticky top-0 z-20 border-b border-(--ov-zari)/30 bg-(--ov-white)/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 overflow-x-auto px-6 py-3 text-sm font-semibold">
          <span className="ov-display shrink-0 text-xl font-normal">A &amp; A</span>
          <div className="flex gap-5">
            <a href="#story" onClick={(e) => jump(e, 'story')}>Story</a>
            <a href="#events" onClick={(e) => jump(e, 'events')}>Events</a>
            <a href="#rsvp" onClick={(e) => jump(e, 'rsvp')}>RSVP</a>
            <a href="#blessings" onClick={(e) => jump(e, 'blessings')}>Blessings</a>
          </div>
        </div>
      </nav>
      <Story />
      <Events />
      <Pheras />
      <RsvpForm />
      <Blessings />
      <footer className="px-6 py-16 text-center text-[13px] leading-relaxed text-(--ov-ink)/70">
        <p>
          A sample wedding website made with ShaadiDraft. The couple and their story are fictional.{' '}
          <a href="#" className="underline underline-offset-4">Make your own</a>
        </p>
      </footer>
    </div>
  )
}

// Section links must not overwrite the #/ananya-arjun route hash.
function jump(e: MouseEvent, id: string) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
}
