import Lenis from 'lenis'
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent, type PointerEvent } from 'react'
import 'lenis/dist/lenis.css'
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
  haldi: { src: scene('#fff0a6', '#e9a03b', `${Array.from({ length: 9 }, (_, i) => `<circle cx="${80 + (i % 3) * 220}" cy="${160 + Math.floor(i / 3) * 240}" r="46" fill="#f6b21a" opacity=".85"/>`).join('')}`), alt: 'Illustrated marigolds on a haldi yellow ground' },
  dusk: { src: scene('#c98f8f', '#3b2433', `<path d="M0 520q150-80 300 0t300 0v280H0z" fill="#4a2f45"/><circle cx="420" cy="260" r="40" fill="#f7dcb4" opacity=".9"/>`), alt: 'Illustrated hills at dusk' },
} as const
type Photo = (typeof PHOTOS)[keyof typeof PHOTOS]
const WALL = [
  PHOTOS.lake, PHOTOS.umbrella, PHOTOS.henna, PHOTOS.distance, PHOTOS.haldi, PHOTOS.couple,
  PHOTOS.dusk, PHOTOS.umbrella, PHOTOS.lake, PHOTOS.haldi, PHOTOS.henna,
]

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
  { id: 'haldi', name: 'Haldi', date: 'Sunday, 22 November 2026', start: '20261122T100000', end: '20261122T123000', time: '10 am', note: 'You will be painted yellow. Wear white you don’t mind losing.', photo: PHOTOS.haldi },
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
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

// One rAF-throttled scroll callback. Lenis scrolls the real window, so native scroll events still fire.
function useScroll(fn: () => void) {
  const ref = useRef(fn)
  ref.current = fn
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => ref.current())
    }
    on()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', on)
      removeEventListener('resize', on)
    }
  }, [])
}

/* ---------- photo wall: columns of sharp arched portraits drifting at different speeds ---------- */

const COL_SPEED = [0.5, -0.35, 0.7, -0.55, 0.3]
function PhotoWall({ tone, offset = 0, y }: { tone: 'dark' | 'light'; offset?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  // Without an explicit y, the wall drifts with its own position on screen.
  useScroll(() => {
    if (y !== undefined || reducedMotion() || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    if (r.bottom > 0 && r.top < innerHeight) ref.current.style.setProperty('--wall-y', `${r.top * 0.35}px`)
  })
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={y === undefined ? undefined : ({ '--wall-y': `${y}px` } as CSSProperties)}
    >
      <div className="-mx-2 flex h-full gap-3 sm:gap-4">
        {COL_SPEED.map((speed, c) => (
          <div
            key={c}
            className={`-mt-[520px] flex flex-1 flex-col gap-3 will-change-transform sm:gap-4 ${c > 2 ? 'max-md:hidden' : ''}`}
            style={{ transform: `translate3d(0, calc(var(--wall-y, 0px) * ${speed}), 0)` }}
          >
            {Array.from({ length: 9 }, (_, i) => {
              const p = WALL[(c * 4 + i * 3 + offset) % WALL.length]
              return <img key={i} src={p.src} alt="" loading="lazy" className="aspect-[2/3] w-full rounded-t-full object-cover object-top" />
            })}
          </div>
        ))}
      </div>
      <div className={`absolute inset-0 ${tone === 'dark' ? 'bg-(--ov-ink)/70' : 'bg-(--ov-white)/80'}`} />
    </div>
  )
}

/* ---------- sections ---------- */

const PETALS = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 9) * 0.18,
  dur: 3.4 + ((i * 7) % 10) / 4,
  dx: ((i * 53) % 160) - 80,
  rot: ((i * 97) % 720) - 360,
  color: ['var(--ov-rose)', 'var(--ov-white)', 'var(--ov-zari)', '#e8c4c0'][i % 4],
}))

function Hero() {
  const [x, setX] = useState(0)
  const [lean, setLean] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [open, setOpen] = useState(false)
  const [petals, setPetals] = useState(false)
  const origin = useRef(0)
  const [wallY, setWallY] = useState(0)
  useScroll(() => setWallY(reducedMotion() ? 0 : -scrollY * 0.6))

  const lift = (dir = 1) => {
    setOpen(true)
    setX(dir * (innerWidth + 300)) // clear the skewed hem too
    if (!reducedMotion()) {
      setPetals(true)
      setTimeout(() => setPetals(false), 7000)
    }
  }
  const onDown = (e: PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    origin.current = e.clientX - x
    setDragging(true)
  }
  const onMove = (e: PointerEvent) => {
    if (dragging) setX(e.clientX - origin.current)
    else if (e.pointerType === 'mouse') setLean((e.clientX / innerWidth - 0.5) * 2) // fabric leans toward the cursor
  }
  const onUp = () => {
    setDragging(false)
    if (Math.abs(x) > innerWidth * 0.25) lift(Math.sign(x))
    else setX(0)
  }
  // The veil billows in the direction it is pulled.
  const skew = Math.max(-7, Math.min(7, (-x / innerWidth) * 12)) - lean
  const names = 'Ananya and Arjun'

  return (
    <header className="relative h-svh min-h-[560px] overflow-hidden bg-(--ov-ink)" data-open={open || undefined}>
      <PhotoWall tone="dark" y={wallY} />
      <div className="relative flex h-full items-center justify-center px-4 pb-28 pt-12">
        <figure className="ov-arch ov-hero-arch aspect-[634/930] h-[min(64svh,600px)] max-w-[78vw] shadow-2xl">
          <img src={PHOTOS.couple.src} alt={PHOTOS.couple.alt} fetchPriority="high" className="h-full w-full object-cover" />
        </figure>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center text-(--ov-white)">
        <h1 className="ov-display text-[clamp(2.4rem,7vw,4.5rem)] leading-none" aria-label={names}>
          {[...names].map((ch, i) => (
            <span key={i} aria-hidden className="ov-letter" style={{ transitionDelay: `${500 + i * 45}ms` }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </h1>
        <p className="ov-letter mt-3 text-sm sm:text-base" style={{ transitionDelay: '1300ms' }}>
          are getting married on 22 November 2026, in Udaipur
        </p>
      </div>

      {petals && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
          {PETALS.map((p, i) => (
            <span
              key={i}
              className="ov-petal"
              style={
                {
                  left: `${p.left}%`,
                  background: p.color,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.dur}s`,
                  '--dx': `${p.dx}px`,
                  '--rot': `${p.rot}deg`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* The veil. Inert once lifted; the button inside is the keyboard path. */}
      <div
        inert={open}
        className={`ov-veil ${!open && !dragging ? 'ov-sway' : ''}`}
        style={{
          transform: `translateX(${x}px) skewX(${skew}deg)`,
          transition: dragging || reducedMotion() ? 'none' : `transform ${open ? 1400 : 900}ms cubic-bezier(.22,.8,.2,1)`,
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={() => !dragging && setLean(0)}
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
            className="ov-press mt-10 rounded-full border border-(--ov-zari) px-7 py-3 font-semibold tracking-wide hover:bg-(--ov-zari)/15"
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
  const list = useRef<HTMLOListElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(Number((en.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])
  // The zari thread down the timeline fills as you read.
  useScroll(() => {
    if (!list.current || !fill.current) return
    const r = list.current.getBoundingClientRect()
    fill.current.style.transform = `scaleY(${clamp01((innerHeight / 2 - r.top) / r.height)})`
  })

  return (
    <section id="story" className="relative">
      {/* Background: the current chapter's photograph, softened, pinned behind the text. */}
      <div aria-hidden className="pointer-events-none sticky top-0 -mb-[100svh] h-svh overflow-hidden">
        {STORY.map((s, i) => (
          <img
            key={s.year}
            src={s.photo.src}
            alt=""
            loading="lazy"
            className={`ov-fade absolute inset-0 h-full w-full scale-125 object-cover object-top blur-2xl ${i === active ? 'opacity-60' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-(--ov-white)/55" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:gap-20">
        <div className="sticky top-0 hidden h-svh items-center md:flex">
          <figure className="ov-arch relative h-[72svh] w-full max-w-[400px] bg-(--ov-sage) shadow-2xl">
            {STORY.map((s, i) => (
              <img
                key={s.year}
                src={s.photo.src}
                alt={s.photo.alt}
                loading="lazy"
                className={`ov-story-img absolute inset-0 h-full w-full object-cover object-top ${i === active ? 'is-active' : ''}`}
              />
            ))}
          </figure>
        </div>
        <div>
          <h2 className="ov-display text-5xl sm:text-6xl">How we got here</h2>
          <ol ref={list} className="relative mt-4">
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-(--ov-zari)/30" />
            <span ref={fill} aria-hidden className="absolute bottom-0 left-0 top-0 w-[2px] origin-top scale-y-0 bg-(--ov-zari)" />
            {STORY.map((s, i) => (
              <li
                key={s.year}
                ref={(el) => void (refs.current[i] = el)}
                data-i={i}
                className={`ov-chapter flex min-h-[70svh] flex-col justify-center py-12 pl-8 ${i === active ? 'is-active' : ''}`}
              >
                <img src={s.photo.src} alt={s.photo.alt} loading="lazy" className="ov-arch mb-8 aspect-[3/4] w-56 object-cover object-top md:hidden" />
                <p className="font-bodoni text-lg text-(--ov-rose)">{s.year}</p>
                <h3 className="ov-display mt-2 text-3xl sm:text-4xl">{s.title}</h3>
                <p className="mt-4 max-w-md text-[17px] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Events() {
  const inner = useRef<(HTMLDivElement | null)[]>([])
  const cards = useRef<(HTMLElement | null)[]>([])
  // As the next event slides over, the one underneath sinks back and dims.
  useScroll(() => {
    if (reducedMotion()) return
    cards.current.forEach((card, i) => {
      const next = cards.current[i + 1]
      const el = inner.current[i]
      if (!el || !card) return
      const t = next ? clamp01(1 - next.getBoundingClientRect().top / innerHeight) : 0
      el.style.transform = `scale(${1 - t * 0.08})`
      el.style.filter = `brightness(${1 - t * 0.45})`
    })
  })

  return (
    <section id="events" aria-labelledby="events-h" className="relative bg-(--ov-ink)">
      <div className="relative overflow-hidden py-28">
        <PhotoWall tone="dark" offset={5} />
        <h2 id="events-h" className="ov-display relative px-6 text-center text-5xl text-(--ov-white) sm:text-7xl">
          Two days in Udaipur
        </h2>
        <p className="relative mt-4 text-center text-(--ov-white)/80">Scroll through each one. Save the ones you’re coming to.</p>
      </div>
      {EVENTS.map((e, i) => (
        <article key={e.id} ref={(el) => void (cards.current[i] = el)} className="sticky top-0 h-svh min-h-[600px] overflow-hidden">
          <div ref={(el) => void (inner.current[i] = el)} className="relative h-full origin-top will-change-transform">
            <img src={e.photo.src} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full scale-125 object-cover object-top blur-2xl saturate-[.9]" />
            <div className="absolute inset-0 bg-(--ov-ink)/20" />
            <div className="relative mx-auto flex h-full max-w-6xl items-center gap-12 px-6">
              <img
                src={e.photo.src}
                alt={e.photo.alt}
                loading="lazy"
                className="ov-arch hidden aspect-[3/4] h-[64svh] object-cover object-top shadow-2xl md:block"
              />
              <div className="ov-sheer w-full max-w-lg p-8 sm:p-12">
                <p className="text-sm font-semibold text-(--ov-rose)">{e.date}</p>
                <h3 className="ov-display mt-3 text-6xl sm:text-7xl">{e.name}</h3>
                <p className="mt-4 text-lg">{e.time}, at The Leela Palace</p>
                <p className="mt-4 max-w-sm leading-relaxed text-(--ov-ink)/80">{e.note}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => downloadIcs(e)}
                    className="ov-press rounded-full bg-(--ov-ink) px-5 py-2.5 text-sm font-semibold text-(--ov-white) hover:bg-(--ov-ink)/90"
                  >
                    Add to calendar
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ov-press rounded-full border border-(--ov-ink)/40 px-5 py-2.5 text-sm font-semibold hover:border-(--ov-ink)"
                  >
                    Get directions
                  </a>
                </div>
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
  useScroll(() => {
    const r = ref.current!.getBoundingClientRect()
    setP(clamp01(-r.top / (r.height - innerHeight)))
  })
  const step = Math.min(6, Math.floor(p * 7))
  const tied = p > 0.97
  // Two threads, zari and rose, wind toward each other and meet in a knot at the seventh round.
  const wave = (phase: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const x = (i / 40) * 1000
      const y = 60 + Math.sin(i / 3 + phase) * 34 * (1 - i / 40)
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    }).join(' ')

  return (
    <section ref={ref} id="pheras" className="relative h-[420svh] bg-(--ov-ink) text-(--ov-white)">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
        <PhotoWall tone="dark" offset={2} y={reducedMotion() ? 0 : (0.5 - p) * 900} />
        <div className="relative flex flex-col items-center">
          <h2 className="ov-display text-4xl text-(--ov-sage) sm:text-5xl">Seven rounds, seven promises</h2>
          <ol className="mt-10 flex gap-3" aria-label={`Phera ${step + 1} of 7`}>
            {VOWS.map((_, i) => (
              <li key={i} className={`size-2.5 rounded-full border border-(--ov-zari) transition-colors duration-500 ${i <= step ? 'bg-(--ov-zari)' : ''}`} />
            ))}
          </ol>
          <p key={step} className="ov-display ov-vow mt-8 min-h-[3.6em] max-w-2xl text-3xl leading-snug sm:text-5xl" aria-live="polite">
            {VOWS[step]}
          </p>
          <svg viewBox="0 0 1000 120" className="mt-10 w-[min(48rem,88vw)]" aria-hidden>
            {[
              { d: wave(0), c: 'var(--ov-zari)' },
              { d: wave(Math.PI), c: 'var(--ov-rose)' },
            ].map((t) => (
              <path key={t.c} d={t.d} pathLength={1} fill="none" stroke={t.c} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - p} />
            ))}
            <circle cx="992" cy="60" r={tied ? 9 : 0} fill="var(--ov-zari)" style={{ transition: 'r 500ms cubic-bezier(.3,1.6,.5,1)' }} />
          </svg>
          <p className="mt-6 text-[13px] text-(--ov-white)/70">{tied ? 'Tied.' : 'Keep scrolling to walk the rounds.'}</p>
        </div>
      </div>
    </section>
  )
}

function Knot() {
  return (
    <svg viewBox="0 0 120 40" className="ov-knot h-10 w-32" aria-hidden>
      <path d="M2 20 C 30 20, 40 4, 60 20 S 90 36, 118 20" pathLength={1} />
      <path d="M2 20 C 30 20, 40 36, 60 20 S 90 4, 118 20" pathLength={1} className="ov-knot-rose" />
      <circle cx="60" cy="20" r="4" />
    </svg>
  )
}

function RsvpForm() {
  const [saved, setSaved] = useState<Rsvp | null>(() => load<Rsvp | null>(RSVP_KEY, null))
  const [editing, setEditing] = useState(!saved)
  const [error, setError] = useState('')
  const [party, setParty] = useState(saved?.party ?? 1)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name')).trim()
    const events = f.getAll('events').map(String)
    if (!name) return setError('Add your name so the families know who is coming.')
    const r: Rsvp = { name, side: String(f.get('side')), events, party, note: String(f.get('note')).trim() }
    save(RSVP_KEY, r)
    setSaved(r)
    setEditing(false)
    setError('')
  }

  const field = 'mt-2 w-full border-b border-(--ov-ink)/30 bg-transparent py-2 text-lg outline-none transition-colors focus:border-(--ov-zari)'
  return (
    <section id="rsvp" className="relative mx-auto max-w-2xl px-6 py-28">
      <div className="ov-sheer p-8 sm:p-12">
        <h2 className="ov-display text-5xl sm:text-6xl">Will you be there?</h2>
        {!editing && saved ? (
          <div className="ov-rise mt-10" aria-live="polite">
            <Knot />
            <p className="ov-display mt-4 text-3xl">
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
            <fieldset>
              <legend className="text-sm font-semibold">You are with</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {[
                  ['ananya', 'Ananya’s side'],
                  ['arjun', 'Arjun’s side'],
                  ['both', 'Both, somehow'],
                ].map(([v, label]) => (
                  <label key={v} className="ov-chip">
                    <input type="radio" name="side" value={v} defaultChecked={(saved?.side ?? 'ananya') === v} className="sr-only" />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">Which events? Leave all unticked if you can’t come.</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {EVENTS.map((e) => (
                  <label key={e.id} className="ov-chip">
                    <input type="checkbox" name="events" value={e.id} defaultChecked={saved ? saved.events.includes(e.id) : true} className="sr-only" />
                    {e.name}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <span className="text-sm font-semibold" id="party-l">
                How many of you, including you?
              </span>
              <div className="mt-3 flex items-center gap-5" role="group" aria-labelledby="party-l">
                <button type="button" aria-label="One fewer" onClick={() => setParty((n) => Math.max(1, n - 1))} className="ov-press size-11 rounded-full border border-(--ov-ink)/30 text-xl">
                  −
                </button>
                <span key={party} className="ov-display ov-tick w-8 text-center text-4xl" aria-live="polite">
                  {party}
                </span>
                <button type="button" aria-label="One more" onClick={() => setParty((n) => Math.min(8, n + 1))} className="ov-press size-11 rounded-full border border-(--ov-ink)/30 text-xl">
                  +
                </button>
              </div>
            </div>
            <label className="block">
              <span className="text-sm font-semibold">Anything the hosts should know?</span>
              <input name="note" defaultValue={saved?.note} placeholder="Vegetarian, arriving from Delhi on the 13th" className={field} />
            </label>
            <button type="submit" className="ov-press rounded-full bg-(--ov-ink) px-8 py-3.5 font-semibold text-(--ov-white) hover:bg-(--ov-ink)/90">
              Send reply
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function Blessings() {
  const [list, setList] = useState<Blessing[]>(() => load<Blessing[]>(BLESS_KEY, []))
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [fresh, setFresh] = useState(0)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return setError('Add your name and a few words before you post.')
    const b = { name: name.trim(), text: text.trim(), at: Date.now() }
    const next = [b, ...list]
    save(BLESS_KEY, next)
    setList(next)
    setFresh(b.at)
    setError('')
    setText('')
  }
  const line = 'border-b border-(--ov-ink)/30 bg-transparent py-2 text-lg outline-none transition-colors focus:border-(--ov-zari)'

  return (
    <section id="blessings" className="relative px-6 pb-28 pt-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_1fr]">
          <form onSubmit={submit} noValidate className="ov-sheer grid gap-4 p-8 sm:p-12">
            <h2 className="ov-display text-5xl sm:text-6xl">Leave a blessing</h2>
            <p className="text-(--ov-ink)/80">We’ll read every one on the morning of the pheras.</p>
            <input
              value={name}
              onChange={(e) => (setName(e.target.value), setError(''))}
              placeholder="Your name"
              aria-label="Your name"
              maxLength={60}
              className={`mt-4 ${line}`}
            />
            <textarea
              value={text}
              onChange={(e) => (setText(e.target.value), setError(''))}
              rows={3}
              maxLength={280}
              placeholder="May your home always be this full of people who love you."
              aria-label="Your blessing"
              className={`resize-none ${line}`}
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-(--ov-rose)" role="alert">
                {error}
              </span>
              <span className="text-(--ov-ink)/60">{280 - text.length} left</span>
            </div>
            <button type="submit" className="ov-press justify-self-start rounded-full bg-(--ov-ink) px-8 py-3.5 font-semibold text-(--ov-white) hover:bg-(--ov-ink)/90">
              Post blessing
            </button>
          </form>
          {/* Live preview: the blessing takes shape as the guest types. */}
          <figure aria-hidden className="ov-preview md:mt-24" data-empty={!text || undefined}>
            <p className="ov-display text-2xl leading-snug">{text || 'Your words will appear here as you write.'}</p>
            <p className="mt-5 text-sm font-semibold text-(--ov-rose)">{name || 'Your name'}</p>
          </figure>
        </div>
        {list.length > 0 && (
          <ul className="mt-16 gap-6 sm:columns-2 lg:columns-3">
            {list.map((b, i) => (
              <li key={`${b.at}-${i}`} className={`ov-sheer mb-6 break-inside-avoid border border-(--ov-zari)/40 p-6 ${b.at === fresh ? 'ov-rise' : ''}`}>
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

let lenis: Lenis | null = null

export default function OrganzaVeilSite() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Ananya and Arjun, 22 November 2026'
    if (!reducedMotion()) lenis = new Lenis({ autoRaf: true, lerp: 0.085 })
    return () => {
      document.title = prev
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return (
    <div className="ov">
      <Hero />
      <nav aria-label="Sections" className="sticky top-0 z-30 border-b border-(--ov-zari)/30 bg-(--ov-white)/85 backdrop-blur">
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
      <div className="relative overflow-hidden">
        <PhotoWall tone="light" offset={7} />
        <RsvpForm />
        <Blessings />
      </div>
      <footer className="bg-(--ov-ink) px-6 py-16 text-center text-[13px] leading-relaxed text-(--ov-white)/75">
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
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: id === 'rsvp' || id === 'blessings' ? -60 : 0, duration: 1.6 })
  else el.scrollIntoView()
}
