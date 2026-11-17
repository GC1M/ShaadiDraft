import { PerformanceMonitor, useProgress } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { CatmullRomCurve3, Vector3 } from 'three'
import {
  Blessings,
  EVENTS,
  PhotoCredits,
  RsvpForm,
  STORY,
  VENUE,
  clamp01,
  downloadIcs,
  jump,
  reducedMotion,
  scrollToY,
  useLenis,
  useScroll,
  useTitle,
  type Photo,
  type WeddingEvent,
} from '../OrganzaVeil'
import '../organza.css'
import '../walk.css'
import type { V3 } from './parts'

// Shell shared by the 3D journeys: the Ananya and Arjun site told as one continuous trip through a scene.
// Page scroll drives a camera along a curve through each place; the words live in plain HTML on top.

export type Stop = { kicker: string; place: string; title: string; body: string; photo: Photo; event?: WeddingEvent }
const ev = (id: string) => EVENTS.find((e) => e.id === id)!
// The first and third chapters of the couple's story, then the three ceremonies.
export const STOPS: Stop[] = [
  ...[STORY[0], STORY[2]].map((s) => ({ place: s.year, kicker: s.year, title: s.title, body: s.body, photo: s.photo })),
  ...['mehendi', 'haldi', 'pheras'].map((id) => {
    const e = ev(id)
    return { place: e.name, kicker: e.date, title: e.name, body: `${e.time}. ${e.note}`, photo: e.photo, event: e }
  }),
]
// Photos alternate sides; the words sit opposite.
export const photoSide = (i: number) => (i % 2 ? 1 : -1)

export type Place = { cam: V3; look: V3 }
const VIEWS = [
  ['Classic', '#/ananya-arjun'],
  ['Palace', '#/ananya-arjun/walk'],
  ['Lake', '#/ananya-arjun/lake'],
  ['Garden', '#/ananya-arjun/garden'],
]

// Rests at each place, so you arrive, look, then move on.
const settle = (f: number) => {
  const t = clamp01((f - 0.15) / 0.7)
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function Rig({ places, progress, bob }: { places: Place[]; progress: RefObject<number>; bob?: boolean }) {
  // Parallax follows the mouse only: on touch, R3F's pointer sticks at the last touch and would skew the view.
  const mouse = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const on = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') mouse.current = { x: (e.clientX / innerWidth) * 2 - 1, y: 1 - (e.clientY / innerHeight) * 2 }
    }
    addEventListener('pointermove', on)
    return () => removeEventListener('pointermove', on)
  }, [])
  const [pos, look] = useMemo(() => [places.map((p) => p.cam), places.map((p) => p.look)].map((v) => new CatmullRomCurve3(v.map((x) => new Vector3(...x)), false, 'catmullrom', 0.35)), [places])
  const p = useMemo(() => new Vector3(), [])
  const l = useMemo(() => new Vector3(), [])
  const aim = useRef<Vector3 | null>(null)
  useFrame((state, dt) => {
    const n = places.length - 1
    const s = progress.current * n
    const k = Math.min(n - 1, Math.floor(s))
    const t = (k + settle(s - k)) / n
    pos.getPoint(t, p)
    look.getPoint(t, l)
    const still = reducedMotion()
    if (!still) {
      p.x += mouse.current.x * 0.25
      p.y += mouse.current.y * 0.12
    }
    const time = state.clock.elapsedTime
    if (bob && !still) p.y += Math.sin(time * 1.1) * 0.05
    const a = 1 - Math.exp(-dt * 4)
    if (!aim.current) {
      aim.current = l.clone()
      state.camera.position.copy(p)
    }
    state.camera.position.lerp(p, a)
    aim.current.lerp(l, a)
    state.camera.lookAt(aim.current)
    if (bob && !still) state.camera.rotateZ(Math.sin(time * 0.8) * 0.012)
  })
  return null
}

function Loading() {
  const { active, progress } = useProgress()
  return (
    <p className="pw-loading" data-show={active || undefined} aria-live="polite">
      Lighting the lamps {Math.round(progress)}%
    </p>
  )
}

type Props = {
  title: string
  intro: string
  labels: [string, string] // names for the first and last places
  finale: { kicker: string; title: string }
  places: (narrow: boolean) => Place[]
  bg: string
  bob?: boolean
  rsvp: Photo
  blessings: Photo
  children: ReactNode
}

export default function Journey({ title, intro, labels, finale, places, bg, bob, rsvp, blessings, children }: Props) {
  useTitle(title)
  useLenis()
  const section = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const [here, setHere] = useState(0)
  const [live, setLive] = useState(true)
  const [narrow, setNarrow] = useState(() => innerWidth < 768)
  useEffect(() => {
    const on = () => setNarrow(innerWidth < 768)
    addEventListener('resize', on)
    return () => removeEventListener('resize', on)
  }, [])
  const route = useMemo(() => places(narrow), [places, narrow])
  const [slow, setSlow] = useState(false)
  const dpr = slow ? 1 : Math.min(devicePixelRatio, narrow ? 1.5 : 2)
  const last = route.length - 1
  const names = [labels[0], ...STOPS.map((s) => s.place), labels[1]]

  useScroll(() => {
    const r = section.current!.getBoundingClientRect()
    const p = clamp01(-r.top / (r.height - innerHeight))
    progress.current = p
    const s = p * last
    const near = Math.round(s)
    setHere(Math.abs(s - near) < 0.24 ? near : -1)
    setLive(r.bottom > 0) // stop rendering once the RSVP covers the scene
  })

  const go = (k: number) => {
    const sec = section.current!
    scrollToY(sec.offsetTop + (k / last) * (sec.offsetHeight - innerHeight))
  }
  const toRsvp = (e: MouseEvent) => jump(e, 'rsvp', 0)

  return (
    <div className="ov">
      <section ref={section} className="relative" style={{ height: `${last * 150 + 100}svh` }} aria-label="A walk through the celebrations">
        <div className="pw-stage" style={{ background: bg }}>
          <Canvas
            aria-hidden
            frameloop={live ? 'always' : 'never'}
            dpr={dpr}
            camera={{ fov: narrow ? 68 : 52, near: 0.1, far: 900, position: route[0].cam }}
          >
            <color attach="background" args={[bg]} />
            {/* Drop resolution on devices that can't keep up. */}
            <PerformanceMonitor onDecline={() => setSlow(true)} onIncline={() => setSlow(false)} />
            <Rig places={route} progress={progress} bob={bob} />
            <Suspense fallback={null}>{children}</Suspense>
          </Canvas>
          <div className="pw-fog" aria-hidden />
          <Loading />

          <div className="pw-hud">
            <div className="pw-intro" data-show={here === 0 || undefined}>
              <p className="font-deva text-lg text-(--ov-zari)">॥ शुभ विवाह ॥</p>
              <h1 className="ov-display mt-3 text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.92]">
                Ananya <i className="ov-amp">&amp;</i> Arjun
              </h1>
              <p className="ov-meta mt-5">21 and 22 November 2026, Udaipur</p>
              <p className="mt-8 text-[15px] text-(--ov-mogra)/80">{intro}</p>
              <span aria-hidden className="ov-cue mx-auto mt-5 block" />
            </div>
            {STOPS.map((s, i) => (
              <article key={s.title} className={`pw-card ${photoSide(i) > 0 ? 'pw-left' : 'pw-right'}`} data-show={here === i + 1 || undefined} inert={here !== i + 1}>
                <p className="ov-meta text-(--ov-zari)">{s.kicker}</p>
                <h2 className="ov-display mt-3 text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95]">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-(--ov-mogra)/80">{s.body}</p>
                {s.event && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={() => downloadIcs(s.event!)} className="ov-press ov-btn-gold">
                      Add to calendar
                    </button>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`} target="_blank" rel="noreferrer" className="ov-press ov-btn-line">
                      Get directions
                    </a>
                  </div>
                )}
              </article>
            ))}
            <div className="pw-intro" data-show={here === last || undefined} inert={here !== last}>
              <p className="ov-meta text-(--ov-zari)">{finale.kicker}</p>
              <h2 className="ov-display mt-4 text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">{finale.title}</h2>
              <a href="#rsvp" onClick={toRsvp} className="ov-press ov-btn-gold mt-9">
                Reply to the invitation
              </a>
            </div>
          </div>

          <nav aria-label="Places" className="pw-map">
            <span className="ov-monogram shrink-0" aria-label="Ananya and Arjun">
              A<i>&amp;</i>A
            </span>
            <ol className="flex gap-1 overflow-x-auto">
              {names.map((p, k) => (
                <li key={p}>
                  <button type="button" onClick={() => go(k)} aria-current={here === k ? 'step' : undefined} className="pw-place">
                    {p}
                  </button>
                </li>
              ))}
            </ol>
            <div className="hidden shrink-0 gap-1 lg:flex" aria-label="Other views">
              {VIEWS.map(([label, href]) => (
                <a key={href} href={href} className="pw-view" aria-current={location.hash === href ? 'page' : undefined}>
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      <RsvpForm photo={rsvp} />
      <Blessings photo={blessings} />
      <footer className="bg-(--ov-kohl) px-6 pb-14 pt-24 text-center text-[13px] leading-relaxed text-(--ov-mogra)/60">
        <span className="ov-monogram text-3xl" aria-hidden>
          A<i>&amp;</i>A
        </span>
        <p className="mt-8">
          A sample wedding website made with ShaadiDraft. The couple and their story are fictional. See it as{' '}
          {VIEWS.filter(([, href]) => href !== location.hash).map(([label, href], i, all) => (
            <span key={href}>
              <a href={href} className="underline underline-offset-4 hover:text-(--ov-zari)">
                {label.toLowerCase()}
              </a>
              {i < all.length - 1 ? ', ' : ''}
            </span>
          ))}
          , or{' '}
          <a href="#" className="underline underline-offset-4 hover:text-(--ov-zari)">
            make your own
          </a>
          .
        </p>
        <PhotoCredits />
      </footer>
    </div>
  )
}
