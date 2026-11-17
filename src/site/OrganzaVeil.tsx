import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent, type PointerEvent } from 'react'
import './organza.css'

// Sample couple website ("Organza Veil" theme). Demo content only: Ananya, Arjun, their story and the guests
// are fictional. The photographs are from Wikimedia Commons (CC BY / CC BY-SA, credited in the footer).
// The site goes out before the wedding, so no wedding photos: a real couple would use their pre-wedding shoot.
// ponytail: RSVPs and blessings live in this browser's localStorage, so guests can't see each other's.
// Swap the two load/save helpers for a realtime backend (e.g. Supabase) when the hosted microsite ships.

// w = the original's width: Commons refuses thumbnails wider than the original.
export const commons = (path: string, w: number, alt: string, by: string, licence: string, pos = 'center') => {
  const name = path.split('/').pop()!
  const thumb = (x: number) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${x}px-${name}`
  const widths = [960, 1280, 1920].filter((x) => x < w)
  return {
    src: widths.length ? thumb(widths[Math.min(1, widths.length - 1)]) : `https://upload.wikimedia.org/wikipedia/commons/${path}`,
    small: widths.length ? thumb(widths[0]) : `https://upload.wikimedia.org/wikipedia/commons/${path}`, // for 3D textures
    srcSet: widths.map((x) => `${thumb(x)} ${x}w`).join(', ') || undefined,
    alt,
    pos,
    credit: { by, licence, file: decodeURIComponent(name) },
  }
}
export type Photo = ReturnType<typeof commons>
// Pre-wedding pictures only: the lake and palace, engaged couples, and the things each ceremony is made of.
export const SHOTS = {
  pavilion: commons('4/46/Udaipur%2C_India%2C_Sunset_on_Lake_Pichola.jpg', 3072, 'Gilded pavilions on Lake Pichola at sunset', 'Vyacheslav Argenberg', 'CC BY 4.0', '50% 60%'),
  beach: commons('b/bb/Couple_at_beach001.jpg', 1620, 'A couple walking hand in hand on a wet beach', 'Shagil Kannur', 'CC BY-SA 4.0', '50% 55%'),
  holding: commons('9/98/Holding_hands_2.jpg', 3264, 'Two hands held against a sunset over the sea', 'Sneha ss', 'CC BY-SA 4.0'),
  engaged: commons('0/0c/Engagement_ceremony_india_couple.jpg', 5472, 'A newly engaged couple showing their rings', 'Shuttersmile2011', 'CC BY-SA 4.0', '45% 30%'),
  lakeDusk: commons('1/1a/Udaipur_Lake_Pichola_Sunset.jpg', 3888, 'The City Palace lit up across Lake Pichola at dusk', 'Pallav.journo', 'CC BY-SA 4.0', '70% 50%'),
  lakeBoats: commons('9/93/20191207_Zach%C3%B3d_s%C5%82o%C5%84ca_nad_jeziorem_Pichola_w_Udajpurze_1733_7352.jpg', 4688, 'The sun setting over Lake Pichola, boats on the water', 'Jakub Hałun', 'CC BY-SA 4.0', '65% 50%'),
  henna: commons('3/32/Mehndi_and_henna_cone.jpg', 960, 'A hand with fresh mehendi beside a henna cone', "Ilona's Henna 'n' Stuff", 'CC BY-SA 4.0', '40% 50%'),
  turmeric: commons('a/a5/Grounded_turmeric.jpg', 4592, 'A heaped tray of ground turmeric', 'Barbara-Ingeborg', 'CC BY-SA 4.0', '96% 72%'),
  diyas: commons('e/e7/Rows_of_diyas.jpg', 3872, 'Rows of lit clay diyas', 'Sneha G Gupta', 'CC BY-SA 4.0'),
  diyaLedge: commons('5/53/Diya_on_a_balcony_ledge.jpg', 4608, 'Diyas burning along a balcony ledge', 'siddarth varanasi', 'CC BY 2.0'),
  lakePalace: commons('f/f4/Taj_Lake_Palace_Udaipur.jpg', 8278, 'The Lake Palace lit up at night', 'Jakub Michankow', 'CC BY 2.0'),
  marigold: commons('3/3c/African_Marigold_%28405632987%29.jpg', 2816, 'A marigold in bloom', 'Dinesh Valke', 'CC BY-SA 2.0', '60% 50%'),
  courtyard: commons('3/38/Mor_chowk%2C_City_Palace%2C_Udaipur.jpg', 3072, 'The peacock courtyard of the City Palace, Udaipur', 'nborun', 'CC BY 2.0'),
}

const STORY: { year: string; title: string; body: string; photo: Photo }[] = [
  {
    year: '2016',
    title: 'A borrowed umbrella',
    body: 'First week of college in Pune, the monsoon came early, and Arjun had the only umbrella at the bus stop. Ananya kept it for a month.',
    photo: SHOTS.beach,
  },
  {
    year: '2019',
    title: 'Bengaluru to Delhi',
    body: 'Two jobs, two cities, and three years of video calls that started with “have you eaten?”',
    photo: SHOTS.holding,
  },
  {
    year: '2025',
    title: 'The question, on Lake Pichola',
    body: 'A boat, a sunset and a ring that nearly went overboard. She said yes before he finished asking.',
    photo: SHOTS.engaged,
  },
  {
    year: '2026',
    title: 'Udaipur, with everyone',
    body: 'We’re getting married by the lake, with the people who’ve watched all of this happen.',
    photo: SHOTS.lakeDusk,
  },
]

export type WeddingEvent = { id: string; name: string; date: string; start: string; end: string; time: string; note: string; photo: Photo }
export const VENUE = 'The Leela Palace, Lake Pichola, Udaipur'
export const EVENTS: WeddingEvent[] = [
  { id: 'mehendi', name: 'Mehendi', date: 'Saturday, 21 November 2026', start: '20261121T160000', end: '20261121T220000', time: '4 pm until late, on the lake lawns', note: 'Floor seating and a lot of henna. Wear something you can sit cross-legged in.', photo: SHOTS.henna },
  { id: 'haldi', name: 'Haldi', date: 'Sunday, 22 November 2026', start: '20261122T100000', end: '20261122T123000', time: '10 am, in the courtyard', note: 'You will be painted yellow. Wear white you don’t mind losing.', photo: SHOTS.turmeric },
  { id: 'pheras', name: 'Pheras', date: 'Sunday, 22 November 2026', start: '20261122T153000', end: '20261122T193000', time: '3:30 pm, by the water', note: 'Seven rounds of the fire as the sun goes down, then dinner on the lawns.', photo: SHOTS.diyas },
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

const icsTime = (d: Date) => `${d.toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`
// Event times are written in IST; UTC needs no VTIMEZONE block (a bare TZID breaks Outlook).
const fromIst = (t: string) => icsTime(new Date(t.replace(/(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)/, '$1-$2-$3T$4:$5:$6+05:30')))

export function downloadIcs(e: WeddingEvent) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ShaadiDraft//Sample//EN',
    'BEGIN:VEVENT',
    `UID:${e.id}-ananya-arjun@shaadidraft`,
    `DTSTAMP:${icsTime(new Date())}`,
    `DTSTART:${fromIst(e.start)}`,
    `DTEND:${fromIst(e.end)}`,
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

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
export const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

// One rAF-throttled scroll callback. Lenis scrolls the real window, so native scroll events still fire.
export function useScroll(fn: () => void) {
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

// Smooth inertial scrolling for the lifetime of a sample site page.
export function useLenis() {
  useEffect(() => {
    if (reducedMotion()) return
    const l = new Lenis({ autoRaf: true, lerp: 0.085 })
    lenis = l
    return () => {
      l.destroy()
      lenis = null
    }
  }, [])
}
let lenis: Lenis | null = null

// A full-bleed photograph used as a section background.
export function Backdrop({ photo, className = '', style, eager }: { photo: Photo; className?: string; style?: CSSProperties; eager?: boolean }) {
  return (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes="100vw"
      alt=""
      aria-hidden
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ objectPosition: photo.pos, ...style }}
    />
  )
}

export function PhotoCredits() {
  return (
    <p className="mx-auto mt-4 max-w-3xl">
      Photographs from Wikimedia Commons, shown cropped and darkened:{' '}
      {Object.values(SHOTS).map(({ credit: c }, i) => (
        <span key={c.file}>
          {i > 0 && '; '}
          <a href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(c.file)}`} className="underline underline-offset-4 hover:text-(--ov-zari)" target="_blank" rel="noreferrer">
            {c.by}
          </a>{' '}
          ({c.licence})
        </span>
      ))}
      .
    </p>
  )
}

/* ---------- sections ---------- */

const PETALS = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 9) * 0.2,
  dur: 4 + ((i * 7) % 10) / 3,
  dx: ((i * 53) % 160) - 80,
  rot: ((i * 97) % 720) - 360,
  color: ['#9e2b3c', 'var(--ov-zari)', '#c45a62', 'var(--ov-mogra)'][i % 4],
}))

function Hero() {
  const [x, setX] = useState(0)
  const [lean, setLean] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [open, setOpen] = useState(false)
  const [petals, setPetals] = useState(false)
  const origin = useRef(0)

  const lift = (dir = 1) => {
    setOpen(true)
    setX(dir * (innerWidth + 300)) // clear the skewed hem too
    if (!reducedMotion()) {
      setPetals(true)
      setTimeout(() => setPetals(false), 8000)
    }
  }
  const onDown = (e: PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    origin.current = e.clientX - x
    setDragging(true)
  }
  const onMove = (e: PointerEvent) => {
    if (dragging) setX(e.clientX - origin.current)
    else if (e.pointerType === 'mouse') setLean((e.clientX / innerWidth - 0.5) * 2) // the fabric leans toward the cursor
  }
  const onUp = () => {
    setDragging(false)
    if (Math.abs(x) > innerWidth * 0.25) lift(Math.sign(x))
    else setX(0)
  }
  // The veil billows in the direction it is pulled.
  const skew = Math.max(-7, Math.min(7, (-x / innerWidth) * 12)) - lean

  return (
    <header className="relative h-svh min-h-[600px] overflow-hidden bg-(--ov-kohl)" data-open={open || undefined}>
      <Backdrop photo={SHOTS.pavilion} eager className="ov-kenburns" />
      <div className="ov-vignette absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-[11svh] text-center text-(--ov-mogra)">
        <p className="ov-rise-in font-deva text-lg text-(--ov-zari)" style={{ transitionDelay: '400ms' }}>
          ॥ शुभ विवाह ॥
        </p>
        <h1 className="ov-display mt-4 text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.92]">
          <span className="ov-rise-in block" style={{ transitionDelay: '600ms' }}>
            Ananya <i className="ov-amp">&amp;</i> Arjun
          </span>
        </h1>
        <p className="ov-rise-in ov-meta mt-6" style={{ transitionDelay: '1100ms' }}>
          21 and 22 November 2026, Udaipur
        </p>
        <span aria-hidden className="ov-rise-in ov-cue mx-auto mt-10 block" style={{ transitionDelay: '1600ms' }} />
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
          transition: dragging || reducedMotion() ? 'none' : `transform ${open ? 1500 : 900}ms cubic-bezier(.22,.8,.2,1)`,
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={() => !dragging && setLean(0)}
      >
        <span className="ov-kinari left-0" />
        <span className="ov-kinari right-0" />
        <div className="relative flex h-full select-none flex-col items-center justify-center px-10 text-center text-(--ov-kohl)">
          <p className="font-deva text-lg text-(--ov-zari-deep)">॥ शुभ विवाह ॥</p>
          <p className="ov-display mt-6 text-[clamp(4rem,13vw,10rem)] leading-[0.88]">Ananya</p>
          <p className="ov-display my-1 text-[clamp(2rem,5vw,3.5rem)] italic text-(--ov-zari-deep)">&amp;</p>
          <p className="ov-display text-[clamp(4rem,13vw,10rem)] leading-[0.88]">Arjun</p>
          <p className="ov-meta mt-10 text-(--ov-kohl)/75">You are invited to our wedding</p>
          <button
            type="button"
            onClick={() => lift()}
            onPointerDown={(e) => e.stopPropagation()}
            className="ov-press ov-btn-veil mt-8"
          >
            Lift the veil
          </button>
          <p className="mt-4 text-[13px] text-(--ov-kohl)/60">or drag it aside</p>
        </div>
      </div>
    </header>
  )
}

function Invitation() {
  return (
    <section className="bg-(--ov-kohl) px-6 py-[18svh] text-center text-(--ov-mogra)">
      <svg viewBox="0 0 120 60" className="mx-auto w-20 text-(--ov-zari)" aria-hidden>
        <path d="M10 58V30a50 28 0 0 1 100 0v28" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M24 58V32a36 22 0 0 1 72 0v26" fill="none" stroke="currentColor" strokeWidth=".6" />
        <circle cx="60" cy="8" r="2.5" fill="currentColor" />
      </svg>
      <p className="ov-display mx-auto mt-10 max-w-[22ch] text-[clamp(2rem,4.4vw,3.6rem)] italic leading-[1.15]">
        With the blessings of our families, we would love you to be with us in Udaipur as we marry.
      </p>
      <p className="ov-meta mt-10 text-(--ov-gulab)">The Sharma and Rao families</p>
    </section>
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
    <section id="story" className="relative bg-(--ov-smoke) text-(--ov-mogra)">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1fr_1.1fr] md:gap-24">
        <div className="sticky top-0 hidden h-svh items-center md:flex">
          <figure className="ov-arch relative h-[74svh] w-full max-w-[420px]">
            {STORY.map((s, i) => (
              <img
                key={s.year}
                src={s.photo.src}
                srcSet={s.photo.srcSet}
                sizes="420px"
                alt={s.photo.alt}
                loading="lazy"
                style={{ objectPosition: s.photo.pos }}
                className={`ov-story-img absolute inset-0 h-full w-full object-cover ${i === active ? 'is-active' : ''}`}
              />
            ))}
          </figure>
        </div>
        <div>
          <h2 className="ov-display text-[clamp(3rem,6vw,5rem)]">Our story</h2>
          <ol ref={list} className="relative mt-6">
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-(--ov-zari)/25" />
            <span ref={fill} aria-hidden className="absolute bottom-0 left-0 top-0 w-px origin-top scale-y-0 bg-(--ov-zari)" />
            {STORY.map((s, i) => (
              <li
                key={s.year}
                ref={(el) => void (refs.current[i] = el)}
                data-i={i}
                className={`ov-chapter flex min-h-[72svh] flex-col justify-center py-12 pl-10 ${i === active ? 'is-active' : ''}`}
              >
                <img src={s.photo.src} alt={s.photo.alt} loading="lazy" style={{ objectPosition: s.photo.pos }} className="ov-arch mb-8 aspect-[3/4] w-60 object-cover md:hidden" />
                <p className="ov-display text-2xl text-(--ov-zari)">{s.year}</p>
                <h3 className="ov-display mt-2 text-[clamp(2.2rem,3.6vw,3.2rem)] leading-tight">{s.title}</h3>
                <p className="mt-5 max-w-md text-[17px] leading-[1.75] text-(--ov-mogra)/80">{s.body}</p>
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
  // As the next celebration slides over, the one underneath sinks back and dims.
  useScroll(() => {
    if (reducedMotion()) return
    cards.current.forEach((card, i) => {
      const next = cards.current[i + 1]
      const el = inner.current[i]
      if (!el || !card) return
      const t = next ? clamp01(1 - next.getBoundingClientRect().top / innerHeight) : 0
      el.style.transform = `scale(${1 - t * 0.06})`
      el.style.filter = `brightness(${1 - t * 0.5})`
    })
  })

  return (
    <section id="events" aria-labelledby="events-h" className="relative bg-(--ov-kohl) text-(--ov-mogra)">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-[16svh] text-center">
        <h2 id="events-h" className="ov-display text-[clamp(3rem,7vw,6rem)]">
          The celebrations
        </h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-(--ov-mogra)/70">Two days at The Leela Palace on Lake Pichola. Save the ones you’re coming to.</p>
      </div>
      {EVENTS.map((e, i) => (
        <article key={e.id} ref={(el) => void (cards.current[i] = el)} className="sticky top-0 h-svh min-h-[620px] overflow-hidden">
          <div ref={(el) => void (inner.current[i] = el)} className="relative h-full origin-top will-change-transform">
            <Backdrop photo={e.photo} />
            <div className="ov-event-shade absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-[9svh] sm:px-10">
              <p className="ov-meta text-(--ov-zari)">{e.date}</p>
              <h3 className="ov-display mt-3 text-[clamp(4.5rem,12vw,10rem)] leading-[0.85]">{e.name}</h3>
              <p className="mt-6 text-lg">{e.time}</p>
              <p className="mt-3 max-w-md leading-relaxed text-(--ov-mogra)/75">{e.note}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => downloadIcs(e)} className="ov-press ov-btn-gold">
                  Add to calendar
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ov-press ov-btn-line"
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
    <section ref={ref} id="pheras" className="relative h-[420svh] bg-(--ov-kohl) text-(--ov-mogra)">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Backdrop photo={SHOTS.diyaLedge} style={{ transform: reducedMotion() ? undefined : `scale(${1.18 - p * 0.18})` }} />
        <div className="absolute inset-0 bg-(--ov-kohl)/78" />
        <div className="relative flex flex-col items-center">
          <h2 className="ov-display text-[clamp(2.4rem,5vw,4rem)] text-(--ov-gulab)">Seven rounds, seven promises</h2>
          <ol className="mt-10 flex gap-4" aria-label={`Phera ${step + 1} of 7`}>
            {VOWS.map((_, i) => (
              <li key={i} className={`size-2 rotate-45 border border-(--ov-zari) transition-colors duration-500 ${i <= step ? 'bg-(--ov-zari)' : ''}`} />
            ))}
          </ol>
          <p key={step} className="ov-display ov-vow mt-10 min-h-[3.4em] max-w-3xl text-[clamp(2rem,4.6vw,3.8rem)] italic leading-[1.15]" aria-live="polite">
            {VOWS[step]}
          </p>
          <svg viewBox="0 0 1000 120" className="mt-8 w-[min(46rem,88vw)]" aria-hidden>
            {[
              { d: wave(0), c: 'var(--ov-zari)' },
              { d: wave(Math.PI), c: 'var(--ov-gulab)' },
            ].map((t) => (
              <path key={t.c} d={t.d} pathLength={1} fill="none" stroke={t.c} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - p} />
            ))}
            <circle cx="992" cy="60" r={tied ? 8 : 0} fill="var(--ov-zari)" style={{ transition: 'r 500ms cubic-bezier(.3,1.6,.5,1)' }} />
          </svg>
          <p className="ov-meta mt-8 text-(--ov-mogra)/60">{tied ? 'Tied' : 'Keep scrolling to walk the rounds'}</p>
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

export function RsvpForm({ photo = SHOTS.lakePalace }: { photo?: Photo }) {
  const [saved, setSaved] = useState<Rsvp | null>(() => load<Rsvp | null>(RSVP_KEY, null))
  const [editing, setEditing] = useState(!saved)
  const [error, setError] = useState('')
  const [party, setParty] = useState(saved?.party ?? 1)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name')).trim()
    const events = f.getAll('events').map(String)
    if (!name) {
      ;(e.currentTarget.elements.namedItem('name') as HTMLInputElement).focus()
      return setError('Add your name so the families know who is coming.')
    }
    const r: Rsvp = { name, side: String(f.get('side')), events, party, note: String(f.get('note')).trim() }
    save(RSVP_KEY, r)
    setSaved(r)
    setEditing(false)
    setError('')
  }

  return (
    <section id="rsvp" className="relative overflow-hidden bg-(--ov-kohl) text-(--ov-mogra)">
      <Backdrop photo={photo} />
      <div className="absolute inset-0 bg-(--ov-kohl)/70" />
      <div className="relative mx-auto max-w-2xl px-6 py-[16svh]">
        <h2 className="ov-display text-center text-[clamp(3rem,7vw,5.5rem)] leading-none">Will you join us?</h2>
        <p className="mt-5 text-center text-(--ov-mogra)/70">Reply by 1 October so the families can plan rooms and seating.</p>
        {!editing && saved ? (
          <div className="ov-rise mt-14 flex flex-col items-center text-center" aria-live="polite">
            <Knot />
            <p className="ov-display mt-6 text-[clamp(2rem,4vw,3rem)] italic">
              {saved.events.length ? `See you in Udaipur, ${saved.name}.` : `We’ll miss you, ${saved.name}.`}
            </p>
            <p className="mt-3 text-(--ov-mogra)/75">
              {saved.events.length
                ? `Party of ${saved.party} for ${saved.events.map((id) => EVENTS.find((e) => e.id === id)?.name).join(', ')}.`
                : 'You told us you can’t make it.'}
            </p>
            <button type="button" onClick={() => setEditing(true)} className="ov-link mt-8">
              Change your reply
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-14 space-y-10">
            <label className="block">
              <span className="ov-label">Your name</span>
              <input
                name="name"
                defaultValue={saved?.name}
                placeholder="Meera Sharma"
                aria-invalid={!!error}
                aria-describedby="rsvp-err"
                onChange={() => setError('')}
                className="ov-field"
              />
              <span id="rsvp-err" className="ov-error" role="alert">
                {error}
              </span>
            </label>
            <fieldset>
              <legend className="ov-label">You are with</legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  ['ananya', 'Ananya’s family'],
                  ['arjun', 'Arjun’s family'],
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
              <legend className="ov-label">Which celebrations? Leave all unticked if you can’t come.</legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {EVENTS.map((e) => (
                  <label key={e.id} className="ov-chip">
                    <input type="checkbox" name="events" value={e.id} defaultChecked={saved ? saved.events.includes(e.id) : true} className="sr-only" />
                    {e.name}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <span className="ov-label" id="party-l">
                How many of you, including you?
              </span>
              <div className="mt-4 flex items-center gap-6" role="group" aria-labelledby="party-l">
                <button type="button" aria-label="One fewer" onClick={() => setParty((n) => Math.max(1, n - 1))} className="ov-press ov-round">
                  −
                </button>
                <span key={party} className="ov-display ov-tick w-10 text-center text-5xl" aria-live="polite">
                  {party}
                </span>
                <button type="button" aria-label="One more" onClick={() => setParty((n) => Math.min(8, n + 1))} className="ov-press ov-round">
                  +
                </button>
              </div>
            </div>
            <label className="block">
              <span className="ov-label">Anything the hosts should know?</span>
              <input name="note" defaultValue={saved?.note} placeholder="Vegetarian, arriving from Delhi on the 20th" className="ov-field" />
            </label>
            <div className="text-center">
              <button type="submit" className="ov-press ov-btn-gold">
                Send reply
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

export function Blessings({ photo = SHOTS.marigold }: { photo?: Photo }) {
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

  return (
    <section id="blessings" className="relative overflow-hidden bg-(--ov-kohl) text-(--ov-mogra)">
      <Backdrop photo={photo} />
      <div className="absolute inset-0 bg-(--ov-kohl)/78" />
      <div className="relative mx-auto max-w-5xl px-6 py-[16svh]">
        <h2 className="ov-display text-center text-[clamp(3rem,7vw,5.5rem)] leading-none">Leave a blessing</h2>
        <p className="mt-5 text-center text-(--ov-mogra)/70">We’ll read every one on the morning of the pheras.</p>
        <div className="mt-14 grid items-start gap-12 md:grid-cols-2">
          <form onSubmit={submit} noValidate className="grid gap-8">
            <label className="block">
              <span className="ov-label">Your name</span>
              <input value={name} onChange={(e) => (setName(e.target.value), setError(''))} maxLength={60} placeholder="Meera Sharma" className="ov-field" />
            </label>
            <label className="block">
              <span className="ov-label">Your blessing</span>
              <textarea
                value={text}
                onChange={(e) => (setText(e.target.value), setError(''))}
                rows={3}
                maxLength={280}
                placeholder="May your home always be this full of people who love you."
                className="ov-field resize-none"
              />
            </label>
            <div className="-mt-4 flex items-center justify-between text-sm">
              <span className="ov-error !mt-0" role="alert">
                {error}
              </span>
              <span className="text-(--ov-mogra)/50">{280 - text.length} left</span>
            </div>
            <button type="submit" className="ov-press ov-btn-gold justify-self-start">
              Post blessing
            </button>
          </form>
          {/* Live preview: the blessing takes shape as the guest types. */}
          <figure aria-hidden className="ov-preview" data-empty={!text || undefined}>
            <span className="ov-display block text-6xl leading-none text-(--ov-zari)">“</span>
            <p className="ov-display -mt-4 text-[1.9rem] italic leading-snug">{text || 'Your words will appear here as you write.'}</p>
            <p className="ov-meta mt-6 text-(--ov-gulab)">{name || 'Your name'}</p>
          </figure>
        </div>
        {list.length > 0 && (
          <ul className="mt-20 grid gap-x-12 sm:grid-cols-2">
            {list.map((b, i) => (
              <li key={`${b.at}-${i}`} className={`border-t border-(--ov-zari)/35 py-8 ${b.at === fresh ? 'ov-rise' : ''}`}>
                <p className="ov-display text-2xl italic leading-snug">{b.text}</p>
                <p className="ov-meta mt-4 text-(--ov-gulab)">{b.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export function useTitle(title: string) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    return () => void (document.title = prev)
  }, [title])
}

export default function OrganzaVeilSite() {
  useTitle('Ananya and Arjun, 22 November 2026')
  useLenis()

  return (
    <div className="ov">
      <Hero />
      <nav aria-label="Sections" className="sticky top-0 z-30 border-b border-(--ov-zari)/20 bg-(--ov-kohl)/80 text-(--ov-mogra) backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 overflow-x-auto px-6 py-3.5">
          <span className="ov-monogram shrink-0" aria-label="Ananya and Arjun">
            A<i>&amp;</i>A
          </span>
          <div className="ov-nav flex gap-6">
            <a href="#story" onClick={(e) => jump(e, 'story')}>Story</a>
            <a href="#events" onClick={(e) => jump(e, 'events')}>Celebrations</a>
            <a href="#rsvp" onClick={(e) => jump(e, 'rsvp')}>RSVP</a>
            <a href="#blessings" onClick={(e) => jump(e, 'blessings')}>Blessings</a>
          </div>
        </div>
      </nav>
      <Invitation />
      <Story />
      <Events />
      <Pheras />
      <RsvpForm />
      <Blessings />
      <footer className="bg-(--ov-kohl) px-6 pb-14 pt-24 text-center text-[13px] leading-relaxed text-(--ov-mogra)/60">
        <span className="ov-monogram text-3xl" aria-hidden>
          A<i>&amp;</i>A
        </span>
        <p className="mt-8">
          A sample wedding website made with ShaadiDraft. The couple and their story are fictional.{' '}
          <a href="#/ananya-arjun/walk" className="underline underline-offset-4 hover:text-(--ov-zari)">See it as a palace walk</a>
          {' or '}
          <a href="#" className="underline underline-offset-4 hover:text-(--ov-zari)">make your own</a>.
        </p>
        <PhotoCredits />
      </footer>
    </div>
  )
}

// Smooth scroll to an absolute page offset (used by the palace walk's map).
export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 2.4 })
  else scrollTo(0, y)
}

// Section links must not overwrite the sample site's route hash.
export function jump(e: MouseEvent, id: string) {
  e.preventDefault()
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: id === 'events' ? 0 : -56, duration: 1.6 })
  else el.scrollIntoView()
}
