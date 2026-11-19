import type { ReactNode } from 'react'
import type { Design } from './designs'
import type { Template } from '../templates'
import { Paisley } from './motifs'
import { FoilDefs, GRAIN, GRAIN_LIGHT, LuxeFrame, SHEEN, VIGNETTE, foil } from './luxe'

// Batch B: Haldi and Mehendi. Each card has one hero element; everything else stays quiet.

const serif = '"Cormorant Garamond", Georgia, serif'
const G = foil('gold')
const CU = foil('copper')
const AG = foil('silver')

const Scene = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 540 340" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" style={{ display: 'block' }}>
    <FoilDefs />
    {children}
  </svg>
)

const Band = ({ h, children }: { h: number; children: ReactNode }) => (
  <svg viewBox={`0 0 540 ${h}`} width="100%" style={{ display: 'block' }}>
    <FoilDefs />
    {children}
  </svg>
)

const Frame = ({ h, children }: { h: number; children: ReactNode }) => (
  <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    <FoilDefs />
    {children}
  </svg>
)

// Closed rectangle of semicircle scallops; sweep 0 bulges inward on a clockwise loop, 1 outward.
function scallops(x0: number, y0: number, x1: number, y1: number, step: number, sweep: 0 | 1) {
  const nx = Math.round((x1 - x0) / step)
  const ny = Math.round((y1 - y0) / step)
  const sx = (x1 - x0) / nx
  const sy = (y1 - y0) / ny
  const arc = (dx: number, dy: number, r: number) => ` a${r} ${r} 0 0 ${sweep} ${dx} ${dy}`
  let d = `M${x0} ${y0}`
  for (let i = 0; i < nx; i++) d += arc(sx, 0, sx / 2)
  for (let i = 0; i < ny; i++) d += arc(0, sy, sy / 2)
  for (let i = 0; i < nx; i++) d += arc(-sx, 0, sx / 2)
  for (let i = 0; i < ny; i++) d += arc(0, -sy, sy / 2)
  return d + ' Z'
}

// Points spaced along the four edges of an inset rectangle (for stitched / mirrored borders).
function edgePoints(inset: number, h: number, gap: number) {
  const pts: [number, number][] = []
  const w = 540 - inset * 2
  const hh = h - inset * 2
  const nx = Math.round(w / gap)
  const ny = Math.round(hh / gap)
  for (let i = 0; i <= nx; i++) pts.push([inset + (w / nx) * i, inset], [inset + (w / nx) * i, h - inset])
  for (let i = 1; i < ny; i++) pts.push([inset, inset + (hh / ny) * i], [540 - inset, inset + (hh / ny) * i])
  return pts
}

/* ---------------- shared fine-line pieces ---------------- */

// Pointed mango leaf, base at (0,0), tip up. Veins taper with the blade.
function Leaf({ x, y, s = 1, rot = 0, stroke, fill = 'none' }: { x: number; y: number; s?: number; rot?: number; stroke: string; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C10 -14 12 -34 0 -54 C-12 -34 -10 -14 0 0 Z" fill={fill} stroke={stroke} strokeWidth="1" />
      <path d="M0 -2 L0 -50" stroke={stroke} strokeWidth="0.7" />
      {[12, 20, 28, 36, 44].map((yy) => {
        const k = 7 * (1 - yy / 62)
        return <path key={yy} d={`M0 ${-yy} q${k * 0.6} -3 ${k} -8 M0 ${-yy} q${-k * 0.6} -3 ${-k} -8`} stroke={stroke} strokeWidth="0.5" fill="none" />
      })}
    </g>
  )
}

// Small oil lamp: foil bowl, layered flame and a soft glow.
function Diya({ x, y, s = 1, glow, ink }: { x: number; y: number; s?: number; glow: string; ink: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cy="-15" rx="11" ry="17" fill={glow} opacity="0.2" />
      <path d="M0 -27 C5 -19 6 -11 0 -5 C-6 -11 -5 -19 0 -27 Z" fill={glow} />
      <path d="M0 -19 C2 -15 2 -10 0 -7 C-2 -10 -2 -15 0 -19 Z" fill="#fff6dc" />
      <path d="M-20 -4 C-14 10 14 10 20 -4 C14 -1 -14 -1 -20 -4 Z" fill={G} />
      <path d="M20 -4 l8 -5 l-4 7 Z" fill={G} />
      <path d="M-14 1 Q0 6 14 1" stroke={ink} strokeWidth="0.6" fill="none" />
      <path d="M-6 7 L6 7 L9 12 L-9 12 Z" fill={G} />
    </g>
  )
}

/* ================= 1. Turmeric Splash: hero = engraved brass urli of haldi ================= */

function Lemon({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-18 0 C-18 -10 -8 -13 0 -13 C8 -13 18 -10 18 0 C18 10 8 13 0 13 C-8 13 -18 10 -18 0 Z" fill="#e2b45a" fillOpacity="0.45" stroke={G} strokeWidth="1.1" />
      <path d="M18 0 q5 -1 6 -4 M-18 0 q-4 1 -5 3" stroke={G} strokeWidth="1.1" fill="none" />
      <path d="M-10 -7 C-4 -10 4 -10 9 -8" stroke={G} strokeWidth="0.6" fill="none" />
      {[
        [-8, 3],
        [-2, 6],
        [5, 2],
        [10, 6],
        [2, -2],
      ].map(([a, b]) => (
        <circle key={`${a}${b}`} cx={a} cy={b} r="0.7" fill={G} />
      ))}
    </g>
  )
}

function Urli() {
  const ink = '#5b3d0f'
  return (
    <g transform="translate(270 290)">
      <ellipse cy="50" rx="110" ry="6" fill="#6a4a14" opacity="0.18" />
      <path d="M-96 0 C-90 36 -42 48 0 48 C42 48 90 36 96 0 Z" fill={G} />
      <path d="M-84 14 Q0 34 84 14" stroke={ink} strokeWidth="0.8" fill="none" />
      <path d="M-78 22 Q0 42 78 22" stroke={ink} strokeWidth="0.6" fill="none" />
      {Array.from({ length: 15 }, (_, i) => {
        const t = (i + 0.5) / 15
        const px = -80 + 160 * t
        const py = 18 + 20 * Math.sin(Math.PI * t) * 0.62
        return <path key={i} d={`M${px - 4} ${py} q4 -6 8 0`} stroke={ink} strokeWidth="0.6" fill="none" />
      })}
      <ellipse rx="96" ry="14" fill={G} />
      <ellipse rx="88" ry="10.5" fill="#c9821c" />
      <ellipse cx="-10" cy="-1" rx="62" ry="6" fill="#dfa23c" />
      <ellipse cx="-24" cy="-2" rx="26" ry="2.6" fill="#f2c56a" opacity="0.8" />
      {[
        [-40, 1, 0.9],
        [22, -2, 1.1],
        [52, 3, 0.8],
      ].map(([px, py, k]) => (
        <g key={px} transform={`translate(${px} ${py}) scale(${k} ${k * 0.42})`}>
          {Array.from({ length: 10 }, (_, i) => (
            <ellipse key={i} cy="-6" rx="2.6" ry="6" fill="#f0d08a" stroke={ink} strokeWidth="0.4" transform={`rotate(${i * 36})`} />
          ))}
          <circle r="2.4" fill={ink} />
        </g>
      ))}
      <path d="M-32 48 L32 48 L24 58 L-24 58 Z" fill={G} />
    </g>
  )
}

const turmericSplash: Design = {
  id: 'turmeric-splash',
  sky: `${GRAIN}, radial-gradient(ellipse 42% 24% at 10% 14%,rgba(212,146,42,.30),transparent 70%), radial-gradient(ellipse 34% 20% at 92% 8%,rgba(198,128,34,.24),transparent 70%), radial-gradient(ellipse 52% 22% at 82% 88%,rgba(212,146,42,.26),transparent 70%), radial-gradient(ellipse 46% 20% at 14% 92%,rgba(190,118,28,.22),transparent 70%), linear-gradient(180deg,#fffaf1,#f6ead1)`,
  colors: { title: '#a65e17', heading: '#5e4b1d', text: '#3e3013', accent: '#98570f', muted: '#7b6542' },
  fonts: { title: '"Pinyon Script"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <Band h={150}>
      <g transform="translate(270 34)">
        <Leaf x={0} y={0} s={0.95} rot={145} stroke={G} fill="#8a7a3a" />
        <Leaf x={0} y={0} s={0.95} rot={215} stroke={G} fill="#8a7a3a" />
        <Leaf x={0} y={0} s={0.75} rot={168} stroke={G} />
        <Leaf x={0} y={0} s={0.75} rot={192} stroke={G} />
        <Lemon x={-22} y={62} s={0.9} rot={-24} />
        <Lemon x={22} y={62} s={0.9} rot={24} />
        <circle r="3" fill={G} />
      </g>
      {[-1, 1].map((k) => (
        <g key={k} transform={`translate(270 34) scale(${k} 1)`}>
          <path d="M40 0 C80 -3 120 -3 170 0" stroke={G} strokeWidth="0.9" fill="none" />
          <circle cx="176" cy="0" r="2" fill={G} />
        </g>
      ))}
    </Band>
  ),
  Overlay: ({ h }) => <LuxeFrame h={h} jewels={false} />,
  Bottom: () => (
    <Scene>
      {[-1, 1].map((k) => (
        <g key={k} transform={`translate(270 0) scale(${k} 1) translate(-270 0)`}>
          <Leaf x={150} y={318} s={1.05} rot={-62} stroke={G} fill="#8a7a3a" />
          <Leaf x={150} y={318} s={0.85} rot={-30} stroke={G} />
          <Lemon x={138} y={304} s={0.95} rot={-14} />
        </g>
      ))}
      <Urli />
    </Scene>
  ),
  safe: { story: { top: 168, bottom: 210, x: 58 }, print: { top: 126, bottom: 152, x: 48 } },
}

/* ================= 2. Haldi Kalash: hero = engraved brass kalash on saffron silk ================= */

function GrandKalash({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const ink = '#4e2a06'
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-64, -38, -13, 13, 38, 64].map((a) => (
        <Leaf key={a} x={0} y={-76} s={0.8} rot={a} stroke={G} fill="#5f3a0c" />
      ))}
      <ellipse cx="0" cy="-96" rx="17" ry="21" fill="#4a2407" stroke={G} strokeWidth="1" />
      {[-9, -3, 3, 9].map((dx) => (
        <path key={dx} d={`M0 -117 Q${dx * 1.6} -100 ${dx} -78`} stroke={G} strokeWidth="0.5" fill="none" />
      ))}
      <path d="M-24 -78 L24 -78 L19 -70 L-19 -70 Z" fill={G} />
      <rect x="-14" y="-70" width="28" height="10" fill={G} />
      <path d="M-14 -66 L14 -66" stroke={ink} strokeWidth="0.6" />
      <path d="M-25 -60 L25 -60 L21 -54 L-21 -54 Z" fill={G} />
      <path d="M-21 -54 C-60 -40 -62 6 -31 20 C-12 28 12 28 31 20 C62 6 60 -40 21 -54 Z" fill={G} stroke={ink} strokeWidth="0.8" />
      <path d="M-50 -30 Q0 -18 50 -30" stroke={ink} strokeWidth="0.8" fill="none" />
      <path d="M-53 -21 Q0 -9 53 -21" stroke={ink} strokeWidth="0.8" fill="none" />
      {Array.from({ length: 11 }, (_, i) => {
        const t = (i + 0.5) / 11
        return <circle key={i} cx={-50 + 100 * t} cy={-25.5 + 24 * t * (1 - t)} r="1.1" fill={ink} />
      })}
      <path d="M-48 -38 Q0 -26 48 -38" stroke="#8c1d10" strokeWidth="1.8" fill="none" />
      {/* engraved belly rosette */}
      <g transform="translate(0 4)" fill="none" stroke={ink}>
        <circle r="13" strokeWidth="0.8" />
        <circle r="8" strokeWidth="0.6" />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d="M0 -8 Q2.4 -10.5 0 -13 Q-2.4 -10.5 0 -8" strokeWidth="0.6" transform={`rotate(${i * 30})`} />
        ))}
        <circle r="2.4" fill="#8c1d10" stroke="none" />
      </g>
      <path d="M-15 22 L15 22 L22 33 L-22 33 Z" fill={G} />
      <path d="M-30 33 L30 33" stroke={G} strokeWidth="1.4" />
    </g>
  )
}

// Bandhanwar: three foil swags of marigold beads.
function Bandhanwar() {
  const bead = (x: number, y: number, k: number) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
      <circle r={5.4 * k} fill="#a4410a" stroke={G} strokeWidth="0.8" />
      <circle r={2.8 * k} fill="none" stroke={G} strokeWidth="0.6" />
    </g>
  )
  return (
    <Band h={120}>
      <rect x="0" y="0" width="540" height="8" fill={G} />
      <path d="M0 13 L540 13" stroke={G} strokeWidth="0.6" strokeDasharray="0.1 4" strokeLinecap="round" />
      {[0, 1, 2, 3].map((k) => {
        const x0 = k * 135
        return Array.from({ length: 11 }, (_, i) => {
          const t = i / 10
          return bead(x0 + 135 * t, 20 + Math.sin(Math.PI * t) * 34, 1 - Math.sin(Math.PI * t) * 0.15)
        })
      })}
      {[135, 270, 405].map((x) => (
        <g key={x}>
          <path d={`M${x} 26 L${x} 58`} stroke={G} strokeWidth="0.9" />
          <Leaf x={x} y={58} s={0.55} rot={160} stroke={G} fill="#5f3a0c" />
          <Leaf x={x} y={58} s={0.55} rot={200} stroke={G} fill="#5f3a0c" />
          <circle cx={x} cy={60} r="3" fill={G} />
        </g>
      ))}
    </Band>
  )
}

const haldiKalash: Design = {
  id: 'haldi-kalash',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, ${VIGNETTE}, radial-gradient(ellipse at 50% 34%,#9c4f0c 0%,#7f3906 56%,#5a2304 100%)`,
  colors: { title: '#f5d58e', heading: '#fae2ab', text: '#fcf0de', accent: '#f1c463', muted: '#f2caa2' },
  fonts: { title: '"Cinzel"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => <Bandhanwar />,
  // Temple-cusp frame: hairline plus an inward scallop edge.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect x="14" y="14" width="512" height={h - 28} fill="none" stroke={G} strokeWidth="1.8" />
      <path d={scallops(24, 24, 516, h - 24, 12, 0)} fill="none" stroke={G} strokeWidth="0.9" />
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      {/* divine glow: fine rays behind the kalash */}
      <g transform="translate(270 300)" stroke={G} strokeWidth="0.5" opacity="0.55">
        {Array.from({ length: 31 }, (_, i) => {
          const a = Math.PI + (Math.PI * i) / 30
          const r1 = 94
          const r2 = i % 2 ? 128 : 146
          return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} />
        })}
      </g>
      <GrandKalash x={270} y={298} s={1.3} />
      {[118, 422].map((x) => (
        <Diya key={x} x={x} y={322} s={1.05} glow="#ffcc6e" ink="#4e2a06" />
      ))}
    </Scene>
  ),
  safe: { story: { top: 135, bottom: 250, x: 52 }, print: { top: 100, bottom: 192, x: 44 } },
}

/* ================= 3. Pithi Mirror Work: hero = abhla mirror medallion ================= */

function Abhla({ x, y, r, thread }: { x: number; y: number; r: number; thread: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r + 2.6} fill="none" stroke={thread} strokeWidth="2" strokeDasharray="1.2 1.2" />
      <circle r={r} fill={AG} stroke="#6d6a66" strokeWidth="0.5" />
      <ellipse cx={-r * 0.3} cy={-r * 0.35} rx={r * 0.42} ry={r * 0.18} fill="#ffffff" opacity="0.75" />
    </g>
  )
}

// Lazy-daisy stitch flower centred on (0,0).
function Daisy({ x, y, r, thread }: { x: number; y: number; r: number; thread: string }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={thread} strokeWidth="0.9">
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse key={i} cy={-r * 0.6} rx={r * 0.22} ry={r * 0.45} transform={`rotate(${i * 72})`} />
      ))}
      <circle r={r * 0.14} fill={thread} stroke="none" />
    </g>
  )
}

const pithiMirror: Design = {
  id: 'pithi-mirror',
  sky: `${GRAIN}, ${SHEEN}, radial-gradient(ellipse at 50% 40%,#dfa93a 0%,#cc9022 60%,#a87310 100%)`,
  colors: { title: '#561318', heading: '#470e13', text: '#33200b', accent: '#741a1d', muted: '#5c4317' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <Band h={60}>
      <rect x="0" y="0" width="540" height="40" fill="#561318" />
      <path d="M0 4 L540 4 M0 36 L540 36" stroke={G} strokeWidth="1" strokeDasharray="4 2.4" />
      {Array.from({ length: 15 }, (_, i) => (
        <g key={i}>
          <Abhla x={18 + i * 36} y={20} r={6.5} thread="#e6b04a" />
          {i < 14 && <Daisy x={36 + i * 36} y={20} r={9} thread="#e6b04a" />}
        </g>
      ))}
      <path d="M0 40 L540 40" stroke={G} strokeWidth="1.6" />
    </Band>
  ),
  // Mirror-work band frame: stitched rules with mirrors set between them.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect x="14" y="14" width="512" height={h - 28} fill="none" stroke="#561318" strokeWidth="1.4" strokeDasharray="5 3" />
      <rect x="34" y="34" width="472" height={h - 68} fill="none" stroke={G} strokeWidth="0.9" />
      {edgePoints(24, h, 30).map(([x, y]) => (
        <Abhla key={`${x}-${y}`} x={x} y={y} r={3.6} thread="#561318" />
      ))}
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <g transform="translate(270 340)">
        <circle r="128" fill="#561318" />
        <circle r="122" fill="none" stroke={G} strokeWidth="1" strokeDasharray="3 2" />
        {Array.from({ length: 19 }, (_, i) => {
          const a = Math.PI + (Math.PI * (i + 0.5)) / 19
          return <Abhla key={i} x={Math.cos(a) * 108} y={Math.sin(a) * 108} r={6.4} thread="#e6b04a" />
        })}
        {Array.from({ length: 13 }, (_, i) => {
          const a = Math.PI + (Math.PI * (i + 0.5)) / 13
          return <Daisy key={i} x={Math.cos(a) * 84} y={Math.sin(a) * 84} r={10} thread="#e6b04a" />
        })}
        <circle r="66" fill="none" stroke={G} strokeWidth="1.2" />
        <circle r="60" fill="#3d0c10" />
        {Array.from({ length: 9 }, (_, i) => {
          const a = Math.PI + (Math.PI * (i + 0.5)) / 9
          return <Abhla key={i} x={Math.cos(a) * 44} y={Math.sin(a) * 44} r={7.4} thread="#c9762e" />
        })}
        <Abhla x={0} y={-12} r={15} thread="#e6b04a" />
      </g>
    </Scene>
  ),
  safe: { story: { top: 92, bottom: 220, x: 58 }, print: { top: 70, bottom: 162, x: 50 } },
}

/* ================= 4. Rangoli Haldi: hero = sanskar-bharati rangoli ================= */

const rangoliHaldi: Design = {
  id: 'rangoli-haldi',
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 30%,#fffbf3 0%,#f5e9d4 62%,#e8d6b6 100%)`,
  colors: { title: '#8d1e2b', heading: '#5b4920', text: '#392913', accent: '#9c2e2b', muted: '#796343' },
  fonts: { title: '"Great Vibes"', heading: '"Marcellus"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <Band h={96}>
      <path d="M0 6 Q270 34 540 6" stroke={G} strokeWidth="1.2" fill="none" />
      {Array.from({ length: 17 }, (_, i) => {
        const x = 16 + i * 31.75
        const u = x / 540
        const y = 6 + 28 * 4 * u * (1 - u) * 0.5
        return <Leaf key={i} x={x} y={y} s={0.72} rot={180} stroke={G} fill={i % 2 ? '#6b763a' : '#57622c'} />
      })}
    </Band>
  ),
  // Chalk-dot lace: hairline plus an outward scallop with a dot in each lobe.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect x="16" y="16" width="508" height={h - 32} fill="none" stroke={G} strokeWidth="1.4" />
      <path d={scallops(26, 26, 514, h - 26, 14, 1)} fill="none" stroke="#9c2e2b" strokeWidth="0.8" />
      {edgePoints(30, h, 14).map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" fill={G} />
      ))}
    </Frame>
  ),
  Bottom: () => {
    const rings = [
      { r: 170, n: 30, c: '#9c2e2b' },
      { r: 142, n: 24, c: '#c9952f' },
      { r: 114, n: 20, c: '#5f6b31' },
      { r: 86, n: 16, c: '#9c2e2b' },
      { r: 60, n: 12, c: '#c9952f' },
    ]
    return (
      <Scene>
        <g transform="translate(270 350)">
          {rings.map((g, k) => (
            <g key={g.r}>
              <circle r={g.r} fill={k % 2 ? '#f6ebd6' : '#efe0c3'} stroke={G} strokeWidth="1" />
              {Array.from({ length: g.n }, (_, i) => (
                <path key={i} d={`M0 ${-g.r + 2} q-6 -11 0 -20 q6 9 0 20 z`} fill={g.c} fillOpacity="0.88" stroke={G} strokeWidth="0.4" transform={`rotate(${-90 + (180 / (g.n - 1)) * i})`} />
              ))}
              {Array.from({ length: g.n - 1 }, (_, i) => (
                <circle key={i} cx="0" cy={-g.r + 9} r="1.3" fill={G} transform={`rotate(${-90 + (180 / (g.n - 1)) * (i + 0.5)})`} />
              ))}
            </g>
          ))}
          <circle r="32" fill="#9c2e2b" stroke={G} strokeWidth="1.2" />
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d="M0 -6 Q6 -16 0 -26 Q-6 -16 0 -6 Z" fill="#c9952f" stroke={G} strokeWidth="0.5" transform={`rotate(${-90 + i * 25.7})`} />
          ))}
          <circle r="5" fill={G} />
        </g>
      </Scene>
    )
  },
  safe: { story: { top: 104, bottom: 222, x: 52 }, print: { top: 78, bottom: 160, x: 44 } },
}

/* ================= 5. Mehendi Hands: hero = a pair of henna-traced hands ================= */

function HennaHand({ x, y, s = 1, rot = 0, flip = false }: { x: number; y: number; s?: number; rot?: number; flip?: boolean }) {
  const skin = '#b9663e'
  const ink = '#4f1d0c'
  const fingers = [
    { x: -36, len: 60 },
    { x: -12, len: 82 },
    { x: 12, len: 76 },
    { x: 36, len: 58 },
  ]
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`}>
      <g fill={skin} stroke={CU} strokeWidth="0.8">
        <rect x="-38" y="-48" width="76" height="62" rx="8" />
        <rect x="-11" y="-70" width="22" height="70" rx="11" transform="translate(56 -60) rotate(38)" />
        {fingers.map((f) => (
          <rect key={f.x} x={f.x - 11} y={-140 - f.len} width="22" height={f.len + 22} rx="11" />
        ))}
        <rect x="-50" y="-150" width="100" height="118" rx="30" />
      </g>
      {/* fingers: tip caps, mesh section, twin bands */}
      {fingers.map((f) => (
        <g key={f.x}>
          <path d={`M${f.x - 11} ${-129 - f.len} a11 11 0 0 1 22 0 v5 h-22 z`} fill={ink} />
          <rect x={f.x - 9} y={-118 - f.len} width="18" height={f.len * 0.32} fill="url(#mehendi-hands-mesh)" />
          <path d={`M${f.x - 10} ${-116 - f.len * 0.62} h20 M${f.x - 10} ${-112 - f.len * 0.62} h20`} stroke={ink} strokeWidth="0.8" />
          <path d={`M${f.x} ${-104 - f.len * 0.5} l3 4 l-3 4 l-3 -4 Z`} fill={ink} />
        </g>
      ))}
      <g transform="translate(56 -60) rotate(38)">
        <path d="M-11 -59 a11 11 0 0 1 22 0 v5 h-22 z" fill={ink} />
        <path d="M-9 -36 h18 M-9 -32 h18" stroke={ink} strokeWidth="0.8" />
      </g>
      {/* palm mandala */}
      <g transform="translate(0 -96)" fill="none" stroke={ink}>
        <circle r="30" strokeWidth="1.1" />
        <circle r="24" strokeWidth="0.5" />
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d="M0 -24 Q4 -27 0 -30 Q-4 -27 0 -24" fill={ink} strokeWidth="0.4" transform={`rotate(${i * 22.5})`} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cy="-34" r="1" fill={ink} stroke="none" transform={`rotate(${i * 22.5 + 11})`} />
        ))}
        <circle r="15" strokeWidth="0.8" />
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d="M0 -4 Q5 -10 0 -15 Q-5 -10 0 -4" strokeWidth="0.7" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="3" fill={ink} stroke="none" />
      </g>
      {/* trailing vine to the wrist */}
      <g fill="none" stroke={ink} strokeWidth="0.9">
        <path d="M0 -62 Q-14 -50 0 -38 Q14 -26 0 -14" />
        <Paisley x={-12} y={-50} s={0.3} rot={-40} color={ink} />
        <Paisley x={12} y={-28} s={0.3} rot={40} color={ink} />
      </g>
      {/* gold bangle stack */}
      {[-2, 4, 10].map((yy, i) => (
        <rect key={yy} x="-40" y={yy} width="80" height={i === 1 ? 4 : 2.4} rx="1.2" fill={G} />
      ))}
    </g>
  )
}

const mehendiHands: Design = {
  id: 'mehendi-hands',
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 32%,#a5502e 0%,#85391e 58%,#5d2614 100%)`,
  colors: { title: '#f7d6ac', heading: '#f3ca9e', text: '#fcefe3', accent: '#efb47e', muted: '#e5c4a8' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <Band h={74}>
      <path d="M0 14 L540 14" stroke={CU} strokeWidth="1.2" />
      {Array.from({ length: 54 }, (_, i) => (
        <circle key={i} cx={i * 10 + 5} cy="6" r="1.2" fill={CU} />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i} fill="none" stroke={CU}>
          <path d={`M${i * 45} 14 a22.5 22.5 0 0 0 45 0`} strokeWidth="1" />
          <path d={`M${i * 45 + 9} 14 a13.5 13.5 0 0 0 27 0`} strokeWidth="0.6" />
          <path d={`M${i * 45 + 22.5} 18 q3 5 0 9 q-3 -4 0 -9`} fill={CU} stroke="none" />
          <circle cx={i * 45 + 22.5} cy="46" r="1.6" fill={CU} stroke="none" />
        </g>
      ))}
    </Band>
  ),
  // Henna-traced Mughal arch framing the text; open at the base where the hands sit.
  Overlay: ({ h }) => {
    const d = `M46 ${h - 40} L46 270 C46 200 120 178 190 158 C232 146 258 126 270 96 C282 126 308 146 350 158 C420 178 494 200 494 270 L494 ${h - 40}`
    return (
      <Frame h={h}>
        <path d={d} fill="none" stroke={CU} strokeWidth="1.5" />
        <path d={d} fill="none" stroke={CU} strokeWidth="0.8" strokeDasharray="0.1 4.5" strokeLinecap="round" transform="translate(270 0) scale(0.955 1) translate(-270 14)" />
        <circle cx="270" cy="84" r="3" fill={CU} />
      </Frame>
    )
  },
  Bottom: () => (
    <Scene>
      <defs>
        <pattern id="mehendi-hands-mesh" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 L0 5 M0 0 L5 0" stroke="#4f1d0c" strokeWidth="0.6" />
        </pattern>
      </defs>
      <HennaHand x={124} y={378} s={0.95} rot={-14} />
      <HennaHand x={416} y={378} s={0.95} rot={14} flip />
    </Scene>
  ),
  safe: { story: { top: 178, bottom: 252, x: 68 }, print: { top: 138, bottom: 196, x: 58 } },
}

/* ================= 6. Jharokha Jaal: hero = one lattice jharokha ================= */

function Jharokha({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const stone = '#173f3b'
  const deep = '#09201e'
  const arch = (ww: number, hh: number) =>
    `M${-ww / 2} 0 L${-ww / 2} ${-hh + ww / 2} Q${-ww / 2} ${-hh} 0 ${-hh - ww * 0.22} Q${ww / 2} ${-hh} ${ww / 2} ${-hh + ww / 2} L${ww / 2} 0 Z`
  const top = -h - w * 0.22
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={arch(w, h)} fill={stone} stroke={G} strokeWidth="1.4" />
      <path d={arch(w * 0.8, h * 0.88)} fill={deep} stroke={G} strokeWidth="0.8" />
      <path d={arch(w * 0.8, h * 0.88)} fill="url(#jharokha-jaal-lattice)" />
      <path d={arch(w * 0.9, h * 0.94)} fill="none" stroke={G} strokeWidth="0.5" strokeDasharray="0.1 3" strokeLinecap="round" />
      {/* chhajja canopy, chhatri dome, finial */}
      <path d={`M${-w / 2 - 14} ${top + 4} L${w / 2 + 14} ${top + 4} L${w / 2 + 2} ${top - 8} L${-w / 2 - 2} ${top - 8} Z`} fill={G} />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${-w / 2 - 10 + i * ((w + 20) / 8)} ${top + 4} l0 6`} stroke={G} strokeWidth="1" />
      ))}
      <path d={`M${-w * 0.32} ${top - 8} Q0 ${top - 8 - w * 0.46} ${w * 0.32} ${top - 8} Z`} fill={stone} stroke={G} strokeWidth="1.2" />
      {[-0.16, 0, 0.16].map((k) => (
        <path key={k} d={`M${w * k} ${top - 9} Q${w * k * 0.5} ${top - 8 - w * 0.34} 0 ${top - 8 - w * 0.23}`} stroke={G} strokeWidth="0.5" fill="none" />
      ))}
      <path d={`M0 ${top - 8 - w * 0.23} l0 -12`} stroke={G} strokeWidth="1.4" />
      <circle cx="0" cy={top - 22 - w * 0.23} r="2.6" fill={G} />
      {/* balcony ledge and corbels */}
      <rect x={-w / 2 - 10} y="-6" width={w + 20} height="9" fill={G} />
      {[-w / 2 + 4, -w / 4, 0, w / 4, w / 2 - 4].map((bx) => (
        <path key={bx} d={`M${bx - 5} 3 L${bx + 5} 3 Q${bx + 3} 12 ${bx} 16 Q${bx - 3} 12 ${bx - 5} 3 Z`} fill={G} />
      ))}
    </g>
  )
}

const jharokhaJaal: Design = {
  id: 'jharokha-jaal',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, radial-gradient(ellipse at 50% 30%,#1e504c 0%,#133b38 58%,#0a2624 100%)`,
  colors: { title: '#e9cd86', heading: '#f1dba3', text: '#ebe5d4', accent: '#dfba67', muted: '#b6ccc5' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <Band h={40}>
      <rect x="0" y="0" width="540" height="10" fill={G} />
      {Array.from({ length: 45 }, (_, i) => (
        <rect key={i} x={i * 12 + 3} y="12" width="6" height="6" fill={G} />
      ))}
      <path d="M0 22 L540 22" stroke={G} strokeWidth="0.7" />
    </Band>
  ),
  // Jaali edge: a narrow lattice strip down both sides between foil rules.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <defs>
        <pattern id="jharokha-jaal-edge" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 L5 0 L10 5 L5 10 Z" fill="none" stroke="#c9a85a" strokeWidth="0.6" />
        </pattern>
      </defs>
      {[16, 504].map((x) => (
        <g key={x}>
          <rect x={x} y="40" width="20" height={h - 80} fill="url(#jharokha-jaal-edge)" opacity="0.7" />
          <path d={`M${x} 40 L${x} ${h - 40} M${x + 20} 40 L${x + 20} ${h - 40}`} stroke={G} strokeWidth="1" />
        </g>
      ))}
      <path d={`M16 ${h - 16} L524 ${h - 16}`} stroke={G} strokeWidth="1.2" />
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <defs>
        <pattern id="jharokha-jaal-lattice" width="11" height="11" patternUnits="userSpaceOnUse">
          <path d="M0 5.5 L5.5 0 L11 5.5 L5.5 11 Z" fill="none" stroke="#d9b765" strokeWidth="0.7" />
          <circle cx="5.5" cy="5.5" r="1.1" fill="#d9b765" />
        </pattern>
      </defs>
      <Jharokha x={270} y={316} w={140} h={128} />
      <rect x="40" y="320" width="460" height="20" fill="#0e2c29" />
      <path d="M40 320 L500 320" stroke={G} strokeWidth="1.2" />
      {Array.from({ length: 23 }, (_, i) => (
        <path key={i} d={`M${50 + i * 20} 326 l5 5 l-5 5 l-5 -5 Z`} fill="none" stroke={G} strokeWidth="0.6" />
      ))}
    </Scene>
  ),
  safe: { story: { top: 80, bottom: 290, x: 60 }, print: { top: 60, bottom: 215, x: 52 } },
}

/* ================= 7. Mayun Night: hero = parandi tassel fringe ================= */

function Parandi({ x, len }: { x: number; len: number }) {
  const silk = ['#c39338', '#8e3446', '#b8723a', '#6c7a38', '#c39338']
  return (
    <g>
      {[0, 1].map((k) => (
        <path
          key={k}
          d={Array.from({ length: Math.floor(len / 6) + 1 }, (_, i) => `${i ? 'L' : 'M'}${x + ((i + k) % 2 ? 2.4 : -2.4)} ${i * 6}`).join(' ')}
          stroke={k ? '#c39338' : G}
          strokeWidth="1.6"
          fill="none"
        />
      ))}
      {[0.42, 0.7].map((t) => (
        <g key={t}>
          <circle cx={x} cy={len * t} r="3.6" fill={G} />
          <circle cx={x - 1} cy={len * t - 1.2} r="1" fill="#fff4d0" opacity="0.8" />
        </g>
      ))}
      <path d={`M${x - 6} ${len} L${x + 6} ${len} L${x + 4.5} ${len + 10} L${x - 4.5} ${len + 10} Z`} fill={G} />
      <path d={`M${x - 5} ${len + 4} h10 M${x - 4.6} ${len + 7} h9.2`} stroke="#3a2a0c" strokeWidth="0.5" />
      {Array.from({ length: 15 }, (_, i) => (
        <path key={i} d={`M${x + (i - 7) * 0.5} ${len + 10} q${(i - 7) * 0.9} 16 ${(i - 7) * 1.5} 34`} stroke={silk[i % silk.length]} strokeWidth="0.9" fill="none" />
      ))}
      <circle cx={x} cy={len + 46} r="3.2" fill={G} />
    </g>
  )
}

const mayunNight: Design = {
  id: 'mayun-night',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, radial-gradient(ellipse at 50% 30%,#1c4832 0%,#113222 58%,#091f15 100%)`,
  colors: { title: '#e7c76f', heading: '#f0dc9c', text: '#f1eedb', accent: '#d9a85a', muted: '#c4d8c0' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => {
    const xs = Array.from({ length: 9 }, (_, i) => 30 + i * 60)
    const yAt = (x: number) => {
      const u = (x % 270) / 270
      return 10 + 44 * u * (1 - u)
    }
    return (
      <Band h={180}>
        <path d="M0 4 Q135 50 270 4 Q405 50 540 4" stroke="#c39338" strokeWidth="5" fill="none" />
        <path d="M0 1 Q135 47 270 1 Q405 47 540 1" stroke={G} strokeWidth="0.9" fill="none" />
        <path d="M0 7 Q135 53 270 7 Q405 53 540 7" stroke={G} strokeWidth="0.9" fill="none" />
        {xs.map((x, i) => (
          <g key={x} transform={`translate(0 ${yAt(x)})`}>
            <Parandi x={x} len={42 + [0, 22, 10, 30, 40, 30, 10, 22, 0][i]} />
          </g>
        ))}
      </Band>
    )
  },
  // Phulkari frame: running-stitch rule with satin-stitch diamonds at the corners.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect x="18" y="18" width="504" height={h - 36} fill="none" stroke="#c39338" strokeWidth="1.2" strokeDasharray="6 4" />
      <rect x="26" y="26" width="488" height={h - 52} fill="none" stroke={G} strokeWidth="0.7" />
      {[
        [26, 26],
        [514, 26],
        [26, h - 26],
        [514, h - 26],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <path d="M0 -14 L14 0 L0 14 L-14 0 Z" fill="#0d2619" stroke={G} strokeWidth="0.9" />
          {Array.from({ length: 7 }, (_, i) => {
            const t = -10 + i * 3.3
            const half = 10 - Math.abs(t)
            return <path key={i} d={`M${t} ${-half} L${t} ${half}`} stroke="#c39338" strokeWidth="1.2" />
          })}
        </g>
      ))}
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <rect x="0" y="304" width="540" height="36" fill="#4d1720" />
      <path d="M0 304 L540 304 M0 338 L540 338" stroke={G} strokeWidth="1" />
      {Array.from({ length: 18 }, (_, i) => {
        const cx = 15 + i * 30
        return (
          <g key={i} transform={`translate(${cx} 321)`}>
            <path d="M0 -12 L12 0 L0 12 L-12 0 Z" fill="none" stroke={G} strokeWidth="0.6" />
            {Array.from({ length: 6 }, (_, j) => {
              const t = -8.5 + j * 3.4
              const half = 9 - Math.abs(t)
              return <path key={j} d={`M${t} ${-half} L${t} ${half}`} stroke={i % 2 ? '#c39338' : '#b8723a'} strokeWidth="1.3" />
            })}
          </g>
        )
      })}
    </Scene>
  ),
  safe: { story: { top: 200, bottom: 100, x: 56 }, print: { top: 160, bottom: 80, x: 48 } },
}

export const designs: Design[] = [turmericSplash, haldiKalash, pithiMirror, rangoliHaldi, mehendiHands, jharokhaJaal, mayunNight]

export const templates: Template[] = [
  { id: 'turmeric-splash', name: 'Turmeric Splash', design: 'turmeric-splash', lang: 'en', symbol: 'floral', event: 'haldi' },
  { id: 'haldi-kalash', name: 'Haldi Kalash Saffron', design: 'haldi-kalash', lang: 'hi', symbol: 'ganesha', event: 'haldi' },
  { id: 'pithi-mirror-work', name: 'Pithi Mirror Work', design: 'pithi-mirror', lang: 'gu', symbol: 'ganesha', event: 'haldi' },
  { id: 'rangoli-haldi', name: 'Rangoli Haldi', design: 'rangoli-haldi', lang: 'mr', symbol: 'ganesha', event: 'haldi' },
  { id: 'mehendi-hands', name: 'Mehendi Hands Terracotta', design: 'mehendi-hands', lang: 'en', symbol: 'floral', event: 'mehendi' },
  { id: 'jharokha-jaal', name: 'Jharokha Jaal', design: 'jharokha-jaal', lang: 'hi', symbol: 'floral', event: 'mehendi' },
  { id: 'mayun-night', name: 'Mayun Night Parandi', design: 'mayun-night', lang: 'pa', symbol: 'ek-onkar', event: 'mehendi' },
]
