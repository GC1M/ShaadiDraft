import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Blessings, PhotoCredits, RsvpForm, SHOTS, SeeAlso, clamp01, jump, reducedMotion, scrollToY, useLenis, useScroll, useTitle } from '../shared'
import '../organza.css'
import '../walk.css'
import { Chapter, PlaceMap, Programme, WalkIntro, placeNames } from './stops'

// The Ananya and Arjun site told as a walk through a real place: a 3D scan shown in the Sketchfab viewer.
// Page scroll walks the viewer's camera from one view to the next; with a mouse you can also drag to look
// around. The words live in plain HTML on top.

// A view, relative to the scan author's own opening view (r = its distance to what it looks at):
// ahead and side move you (times r), lift raises you (times r), look turns your head left (degrees),
// tilt raises your gaze (degrees).
type View = { ahead: number; side?: number; lift?: number; look?: number; tilt?: number }
type Site = { uid: string; name: string; by: string; url: string; title: string; line: string; labels: [string, string]; walk: View[] }

// Seven views each: the way in, one per chapter of the story, the programme, and the last look.
const SITES: Record<string, Site> = {
  '#/ananya-arjun/stepwell': {
    uid: '1a4fee746a4449c9b67c833fefbf7f98',
    name: 'Rani ki Vav, Patan, Gujarat',
    by: 'CyArk',
    url: 'https://sketchfab.com/3d-models/rani-ki-vav-gujarat-india-1a4fee746a4449c9b67c833fefbf7f98',
    title: 'Ananya and Arjun: down the Rani ki Vav',
    line: 'Scroll to walk down the steps of the Rani ki Vav, Patan.',
    labels: ['The top step', 'The well'],
    walk: [{ ahead: 0 }, { ahead: 0.2, lift: -0.1, look: 15 }, { ahead: 0.35, lift: -0.18, look: -15 }, { ahead: 0.5, lift: -0.25, tilt: 8 }, { ahead: 0.65, lift: -0.3, look: 12 }, { ahead: 0.8, lift: -0.34, look: -12 }, { ahead: 0.95, lift: -0.38, tilt: 10 }],
  },
  '#/ananya-arjun/courtyard': {
    uid: 'd559ed52ab584b1c87945835e7077575',
    name: 'Palazzo Falson Courtyard, Mdina',
    by: 'artfletch',
    url: 'https://sketchfab.com/3d-models/palazzo-falson-courtyard-d559ed52ab584b1c87945835e7077575',
    title: 'Ananya and Arjun: a palazzo courtyard',
    line: 'Scroll to walk into the courtyard of the Palazzo Falson, Mdina.',
    labels: ['The doorway', 'The stair'],
    walk: [{ ahead: -0.3 }, { ahead: 0, look: 25 }, { ahead: 0.15, look: -25 }, { ahead: 0.3, tilt: 15 }, { ahead: 0.4, look: 35 }, { ahead: 0.5, look: -30 }, { ahead: 0.6, tilt: 10 }],
  },
  '#/ananya-arjun/hall': {
    uid: 'd18155613363445b9b68c0c67196d98d',
    name: "The King's Hall, Skokloster Castle",
    by: 'Skokloster Castle',
    url: 'https://sketchfab.com/3d-models/the-king-s-hall-d18155613363445b9b68c0c67196d98d',
    title: "Ananya and Arjun: the King's Hall",
    line: "Scroll to walk the length of the King's Hall, Skokloster Castle.",
    labels: ['The door', 'The far wall'],
    walk: [{ ahead: 0 }, { ahead: 0.1, look: 30 }, { ahead: 0.22, look: -30 }, { ahead: 0.35, tilt: 25 }, { ahead: 0.5, look: 35 }, { ahead: 0.65, look: -35 }, { ahead: 0.8, tilt: 5 }],
  },
  '#/ananya-arjun/salon': {
    uid: '3a6385844d0647d382a72661bbc556f7',
    name: 'The Small Drawing Room, Hallwyl Museum',
    by: 'The Hallwyl Museum',
    url: 'https://sketchfab.com/3d-models/the-small-drawing-room-3a6385844d0647d382a72661bbc556f7',
    title: 'Ananya and Arjun: the drawing room',
    line: 'Scroll to step into the small drawing room of the Hallwyl Museum, Stockholm.',
    labels: ['The door', 'The fireside'],
    walk: [{ ahead: -0.2 }, { ahead: 0, look: 30 }, { ahead: 0.12, look: -30 }, { ahead: 0.22, tilt: 20 }, { ahead: 0.3, look: 40 }, { ahead: 0.38, look: -40 }, { ahead: 0.45, tilt: 5 }],
  },
}

const VIEWER = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'

type V3 = [number, number, number]
type Camera = { position: V3; target: V3 }
type ViewerApi = {
  start: () => void
  addEventListener: (name: string, fn: () => void) => void
  getCameraLookAt: (fn: (err: unknown, cam: Camera) => void) => void
  setCameraLookAt: (position: V3, target: V3, seconds: number) => void
}
declare global {
  interface Window {
    Sketchfab?: new (iframe: HTMLIFrameElement) => { init: (uid: string, options: Record<string, unknown>) => void }
  }
}

const loadViewer = () =>
  new Promise<void>((done, fail) => {
    if (window.Sketchfab) return done()
    const s = document.createElement('script')
    s.src = VIEWER
    s.onload = () => done()
    s.onerror = fail
    document.head.append(s)
  })

// Sketchfab scenes are Z-up. Walk along the opening view's heading, then turn your head.
function place(home: Camera, v: View): Camera {
  const [px, py, pz] = home.position
  const [dx, dy, dz] = [home.target[0] - px, home.target[1] - py, home.target[2] - pz]
  const r = Math.hypot(dx, dy, dz)
  const heading = Math.atan2(dy, dx)
  const [fx, fy] = [Math.cos(heading), Math.sin(heading)]
  const position: V3 = [px + (fx * v.ahead + fy * (v.side ?? 0)) * r, py + (fy * v.ahead - fx * (v.side ?? 0)) * r, pz + (v.lift ?? 0) * r]
  const turn = heading + ((v.look ?? 0) * Math.PI) / 180
  const pitch = Math.atan2(dz, Math.hypot(dx, dy)) + ((v.tilt ?? 0) * Math.PI) / 180
  const near = r * 0.5
  const target: V3 = [position[0] + near * Math.cos(pitch) * Math.cos(turn), position[1] + near * Math.cos(pitch) * Math.sin(turn), position[2] + near * Math.sin(pitch)]
  return { position, target }
}

export default function Scan() {
  const site = SITES[location.hash]
  const names = placeNames(...site.labels)
  const last = names.length - 1
  useTitle(site.title)
  useLenis()
  const section = useRef<HTMLElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const api = useRef<ViewerApi | null>(null)
  const home = useRef<Camera | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [here, setHere] = useState(0)
  const [view, setView] = useState(0)

  useEffect(() => {
    let gone = false
    loadViewer()
      .then(() => {
        if (gone) return
        new window.Sketchfab!(frame.current!).init(site.uid, {
          autostart: 1,
          preload: 1,
          camera: 0,
          dnt: 1,
          scrollwheel: 0,
          transparent: 0,
          ui_animations: 0,
          annotations_visible: 0,
          ui_annotations: 0,
          ui_ar: 0,
          ui_controls: 0,
          ui_fullscreen: 0,
          ui_help: 0,
          ui_hint: 0,
          ui_infos: 0,
          ui_inspector: 0,
          ui_loading: 0,
          ui_settings: 0,
          ui_stop: 0,
          ui_vr: 0,
          success: (a: ViewerApi) => {
            a.start()
            a.addEventListener('viewerready', () =>
              a.getCameraLookAt((err, cam) => {
                if (gone || err) return
                home.current = cam
                api.current = a
                setReady(true)
              }),
            )
          },
          error: () => setFailed(true),
        })
      })
      .catch(() => setFailed(true))
    return () => {
      gone = true
    }
  }, [site.uid])

  // Walk to the nearest view whenever it changes.
  useEffect(() => {
    if (!ready) return
    const c = place(home.current!, site.walk[view])
    api.current!.setCameraLookAt(c.position, c.target, reducedMotion() ? 0 : 2.8)
  }, [ready, view, site])

  useScroll(() => {
    const r = section.current!.getBoundingClientRect()
    const s = clamp01(-r.top / (r.height - innerHeight)) * last
    const near = Math.round(s)
    setView(near)
    setHere(Math.abs(s - near) < 0.24 ? near : -1)
  })

  const go = (k: number) => {
    const sec = section.current!
    scrollToY(sec.offsetTop + (k / last) * (sec.offsetHeight - innerHeight))
  }
  const toRsvp = (e: MouseEvent) => jump(e, 'rsvp', 0)

  return (
    <div className="ov">
      <section ref={section} className="relative" style={{ height: `${last * 150 + 100}svh` }} aria-label={`A walk through ${site.name}`}>
        <div className="pw-stage">
          <iframe ref={frame} className="pw-scan" title={`3D scan of ${site.name}`} aria-hidden tabIndex={-1} allow="autoplay; fullscreen" />
          <div className="pw-fog" aria-hidden />
          <div className="pw-curtain" data-up={ready || failed || undefined}>
            <p className="pw-loading" aria-live="polite">
              Opening the doors
            </p>
          </div>

          <div className="pw-hud">
            <WalkIntro show={here === 0} line={site.line} />
            {[0, 1, 2, 3].map((i) => (
              <Chapter key={i} i={i} show={here === i + 1} />
            ))}
            <Programme show={here === 5} />
            <div className="pw-intro" data-show={here === last || undefined} inert={here !== last}>
              <p className="ov-meta text-(--ov-zari)">The Leela Palace, Lake Pichola</p>
              <h2 className="ov-display mt-4 text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">See you in Udaipur</h2>
              <a href="#rsvp" onClick={toRsvp} className="ov-press ov-btn-gold mt-9">
                Reply to the invitation
              </a>
            </div>
          </div>

          <PlaceMap names={names} here={here} go={go} />
        </div>
      </section>

      <RsvpForm photo={SHOTS.lakePalace} />
      <Blessings photo={SHOTS.lodhi} />
      <footer className="bg-(--ov-kohl) px-6 pb-14 pt-24 text-center text-[13px] leading-relaxed text-(--ov-mogra)/60">
        <span className="ov-monogram text-3xl" aria-hidden>
          A<i>&amp;</i>A
        </span>
        <SeeAlso />
        <p className="mt-4">
          3D scan:{' '}
          <a href={site.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-(--ov-zari)">
            {site.name}
          </a>{' '}
          by {site.by}, on Sketchfab.
        </p>
        <PhotoCredits />
      </footer>
    </div>
  )
}
