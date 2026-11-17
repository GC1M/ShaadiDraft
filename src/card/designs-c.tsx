import type { ReactNode } from 'react'
import type { Design } from './designs'
import type { Template } from '../templates'
import { FoilDefs, GRAIN, GRAIN_LIGHT, LuxeFrame, SHEEN, VIGNETTE, foil } from './luxe'

// Batch C: sangeet + reception. Each card has one hero element; everything else stays quiet.

const serif = '"Cormorant Garamond", Georgia, serif'
const G = foil('gold')
const S = foil('silver')

const Scene = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 540 340" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" style={{ display: 'block' }}>
    <FoilDefs />
    {children}
  </svg>
)

const Glow = ({ id, c, o = 0.85 }: { id: string; c: string; o?: number }) => (
  <radialGradient id={id}>
    <stop offset="0" stopColor={c} stopOpacity={o} />
    <stop offset="0.4" stopColor={c} stopOpacity={o * 0.35} />
    <stop offset="1" stopColor={c} stopOpacity="0" />
  </radialGradient>
)

const rad = (a: number) => (a * Math.PI) / 180

// Deco sunburst: rays and arcs from (cx,cy) between angles a0..a1 (degrees, SVG y-down).
function Sunburst({ cx, cy, r, a0, a1, n, fill, hub }: { cx: number; cy: number; r: number; a0: number; a1: number; n: number; fill: string; hub: string }) {
  const pt = (a: number, rr: number) => `${cx + Math.cos(rad(a)) * rr} ${cy + Math.sin(rad(a)) * rr}`
  const arc = (rr: number) => `M${pt(a0, rr)} A${rr} ${rr} 0 0 1 ${pt(a1, rr)}`
  return (
    <g fill="none" stroke={fill} strokeLinecap="round">
      {Array.from({ length: n + 1 }, (_, i) => {
        const a = a0 + ((a1 - a0) * i) / n
        return <path key={i} d={`M${pt(a, r * 0.3)} L${pt(a, i % 2 ? r * 0.86 : r)}`} strokeWidth={i % 2 ? 0.6 : 1.2} />
      })}
      <path d={arc(r)} strokeWidth="1.4" />
      <path d={arc(r * 0.93)} strokeWidth="0.5" />
      <path d={`${arc(r * 0.24)} L${cx} ${cy} Z`} fill={fill} stroke="none" />
      <path d={arc(r * 0.3)} strokeWidth="0.8" />
      {Array.from({ length: n / 2 + 1 }, (_, i) => {
        const a = a0 + ((a1 - a0) * i * 2) / n
        return <circle key={`d${i}`} cx={cx + Math.cos(rad(a)) * r * 1.06} cy={cy + Math.sin(rad(a)) * r * 1.06} r="1.6" fill={fill} stroke="none" />
      })}
      <circle cx={cx} cy={cy} r={r * 0.08} fill={hub} stroke="none" />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Bollywood Marquee: the bulb-studded marquee frame is the hero.     */

const MarqueeBulb = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="10" fill="url(#marquee-glow)" />
    <circle r="3.6" fill="none" stroke={G} strokeWidth="0.7" />
    <circle r="2.2" fill="#fff2cc" />
  </g>
)

const marquee: Design = {
  id: 'marquee',
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 40%,#231b12 0%,#130e09 60%,#080604 100%)`,
  colors: { title: '#e9cf86', heading: '#f2e1ae', text: '#efe6d2', accent: '#e2b85c', muted: '#bdb196' },
  fonts: { title: '"Bodoni Moda"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <svg viewBox="0 0 540 150" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <Sunburst cx={270} cy={140} r={86} a0={180} a1={360} n={28} fill={G} hub="#fff2cc" />
      <path d="M150 140 H390" stroke={G} strokeWidth="1.2" />
    </svg>
  ),
  Overlay: ({ h }) => {
    const n = 17
    const side = Math.max(4, Math.round((h - 52) / 31))
    return (
      <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        <FoilDefs />
        <defs>
          <Glow id="marquee-glow" c="#ffd88a" o={0.7} />
        </defs>
        <rect x="16" y="16" width="508" height={h - 32} fill="none" stroke={G} strokeWidth="2.2" />
        <rect x="36" y="36" width="468" height={h - 72} fill="none" stroke={G} strokeWidth="0.7" />
        {Array.from({ length: n }, (_, i) => {
          const x = 26 + (i * 488) / (n - 1)
          return (
            <g key={i}>
              <MarqueeBulb x={x} y={26} />
              <MarqueeBulb x={x} y={h - 26} />
            </g>
          )
        })}
        {Array.from({ length: side - 1 }, (_, i) => {
          const y = 26 + ((i + 1) * (h - 52)) / side
          return (
            <g key={i}>
              <MarqueeBulb x={26} y={y} />
              <MarqueeBulb x={514} y={y} />
            </g>
          )
        })}
      </svg>
    )
  },
  Bottom: () => (
    <Scene>
      {/* film strip */}
      <rect x="40" y="290" width="460" height="30" fill="#0c0906" stroke={G} strokeWidth="0.9" />
      {Array.from({ length: 33 }, (_, i) => (
        <g key={i}>
          <rect x={46 + i * 14} y="293" width="6" height="4" rx="1" fill={G} opacity="0.75" />
          <rect x={46 + i * 14} y="313" width="6" height="4" rx="1" fill={G} opacity="0.75" />
        </g>
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={48 + i * 45.5} y="300" width="38" height="10" fill="none" stroke={G} strokeWidth="0.45" />
      ))}
    </Scene>
  ),
  safe: { story: { top: 168, bottom: 120, x: 64 }, print: { top: 134, bottom: 96, x: 54 } },
}

/* ------------------------------------------------------------------ */
/* Garba Raas: the glowing perforated garbo is the hero.               */

const Dandiya = ({ rot }: { rot: number }) => (
  <g transform={`rotate(${rot})`}>
    <rect x="-2.6" y="-62" width="5.2" height="124" rx="2.6" fill={G} />
    {[-44, -22, 0, 22, 44].map((y) => (
      <rect key={y} x="-3" y={y} width="6" height="2.4" fill="#0d1538" />
    ))}
  </g>
)

const garba: Design = {
  id: 'garba',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, radial-gradient(ellipse at 50% 34%,#1e2b5e 0%,#121c42 58%,#0a102a 100%)`,
  colors: { title: '#edd28e', heading: '#f4e0aa', text: '#ebeaf6', accent: '#e6c26c', muted: '#b6bedc' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <svg viewBox="0 0 540 120" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      {/* three mirror-work lozenges on a fine cord */}
      <path d="M150 36 Q270 70 390 36" stroke={G} strokeWidth="0.8" fill="none" />
      {[
        [190, 50, 0.8],
        [270, 54, 1],
        [350, 50, 0.8],
      ].map(([x, y, s]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 0 L12 18 L0 36 L-12 18 Z" fill="#0d1538" stroke={G} strokeWidth="1.2" />
          <circle cy="18" r="5" fill="#dfe6f6" stroke={G} strokeWidth="0.8" />
          <path d="M0 38 V52 M-3 38 L-4 50 M3 38 L4 50" stroke={G} strokeWidth="0.6" />
        </g>
      ))}
    </svg>
  ),
  Overlay: ({ h }) => <LuxeFrame h={h} inset={14} jewels={false} />,
  Bottom: () => (
    <Scene>
      <defs>
        <Glow id="garba-glow" c="#ffbf55" o={0.55} />
        <Glow id="garba-flame" c="#ffe7a2" />
      </defs>
      <g transform="translate(270 334) scale(1.4)">
        <ellipse cy="-52" rx="92" ry="80" fill="url(#garba-glow)" />
        <path d="M-40 0 C-62 -16 -60 -58 -30 -76 L-16 -88 L-16 -96 L16 -96 L16 -88 L30 -76 C60 -58 62 -16 40 0 Z" fill="#0d1538" stroke={G} strokeWidth="1.3" />
        {[
          [-12, 40],
          [-26, 46],
          [-40, 46],
          [-54, 40],
          [-68, 28],
        ].map(([y, hw], j) =>
          Array.from({ length: Math.floor((hw * 2 - 12) / 9) + 1 }, (_, k) => (
            <circle key={`${j}-${k}`} cx={-hw + 6 + k * 9 + (j % 2) * 4.5} cy={y} r={j % 2 ? 1.5 : 2} fill="#ffd98a" opacity={0.6 + ((j + k) % 3) * 0.15} />
          )),
        )}
        <path d="M-50 -33 Q0 -24 50 -33 M-46 -61 Q0 -54 46 -61" stroke={G} strokeWidth="0.9" fill="none" />
        <ellipse cy="-96" rx="18" ry="3.6" fill={G} />
        <path d="M-12 -98 Q0 -88 12 -98 Z" fill={G} />
        <circle cy="-110" r="16" fill="url(#garba-flame)" />
        <path d="M0 -124 C5 -116 5 -108 0 -103 C-5 -108 -5 -116 0 -124 Z" fill="#ffe08a" />
      </g>
      <g transform="translate(118 318)">
        <Dandiya rot={26} />
        <Dandiya rot={-26} />
      </g>
      <g transform="translate(422 318)">
        <Dandiya rot={26} />
        <Dandiya rot={-26} />
      </g>
    </Scene>
  ),
  safe: { story: { top: 150, bottom: 250, x: 46 }, print: { top: 112, bottom: 185, x: 38 } },
}

/* ------------------------------------------------------------------ */
/* Dhol Jaago: one large engraved dhol is the hero; phulkari frames it. */

function PhulkariStar({ x, y, r, fill }: { x: number; y: number; r: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 45, 90, 135].map((a) => (
        <path key={a} d={`M0 ${-r} L${r * 0.22} 0 L0 ${r} L${-r * 0.22} 0 Z`} fill={fill} transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.18} fill="#3b0912" />
    </g>
  )
}

const jaago: Design = {
  id: 'jaago',
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 34%,#6c1622 0%,#4b0d18 58%,#2b060d 100%)`,
  colors: { title: '#f1d18c', heading: '#f6e0ab', text: '#f7ece2', accent: '#ebc66f', muted: '#dfbfb3' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <svg viewBox="0 0 540 84" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <rect x="0" y="0" width="540" height="62" fill="#350811" />
      <path d="M0 4 H540 M0 58 H540" stroke={G} strokeWidth="0.9" />
      {Array.from({ length: 12 }, (_, i) => {
        const cx = 22.5 + i * 45
        return (
          <g key={i} fill="none" stroke={G}>
            <path d={`M${cx} 9 L${cx + 20} 31 L${cx} 53 L${cx - 20} 31 Z`} strokeWidth="1" />
            <path d={`M${cx} 18 L${cx + 11} 31 L${cx} 44 L${cx - 11} 31 Z`} strokeWidth="0.6" />
            <path d={`M${cx} 26 L${cx + 4} 31 L${cx} 36 L${cx - 4} 31 Z`} fill={G} stroke="none" />
          </g>
        )
      })}
      <path d={`M0 62 ${Array.from({ length: 36 }, (_, i) => `L${i * 15 + 7.5} ${i % 2 ? 62 : 72}`).join(' ')} L540 62`} stroke={G} strokeWidth="0.8" fill="none" />
    </svg>
  ),
  Overlay: ({ h }) => (
    <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
      <FoilDefs />
      <rect x="20" y="20" width="500" height={h - 40} fill="none" stroke={G} strokeWidth="1" />
      <rect x="27" y="27" width="486" height={h - 54} fill="none" stroke={G} strokeWidth="0.7" strokeDasharray="5 3" />
      {[
        [20, h - 20],
        [520, h - 20],
      ].map(([x, y]) => (
        <PhulkariStar key={x} x={x} y={y} r={14} fill={G} />
      ))}
    </svg>
  ),
  Bottom: () => (
    <Scene>
      <defs>
        <Glow id="jaago-flame" c="#ffe39a" />
        <linearGradient id="jaago-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a1c2b" />
          <stop offset="0.45" stopColor="#5a1220" />
          <stop offset="1" stopColor="#2a050c" />
        </linearGradient>
      </defs>
      <g transform="translate(270 270) scale(1.55)">
        {/* strap */}
        <path d="M-58 -30 Q0 -78 58 -30" stroke={G} strokeWidth="0.9" fill="none" />
        <path d="M-58 -32 C-63 -12 -63 12 -58 32 L58 32 C63 12 63 -12 58 -32 Z" fill="url(#jaago-shade)" stroke={G} strokeWidth="1.1" />
        {/* rope lacing */}
        <path d={`M-50 -30 ${Array.from({ length: 11 }, (_, i) => `L${-50 + (i + 1) * 9.1} ${i % 2 ? -30 : 30}`).join(' ')}`} stroke={G} strokeWidth="0.9" fill="none" />
        {Array.from({ length: 6 }, (_, i) => (
          <circle key={i} cx={-41 + i * 18.2} cy="30" r="1.8" fill={G} />
        ))}
        {/* engraved band */}
        <path d="M-60 0 C-20 4 20 4 60 0" stroke={G} strokeWidth="0.5" fill="none" strokeDasharray="1 2.5" />
        {/* heads */}
        <ellipse cx="-58" rx="8" ry="33" fill="#e8d9bb" stroke={G} strokeWidth="1.6" />
        <ellipse cx="-58" rx="4" ry="22" fill="none" stroke="#b39a6a" strokeWidth="0.5" />
        <ellipse cx="58" rx="8" ry="33" fill="#d9c59e" stroke={G} strokeWidth="1.6" />
      </g>
      {[110, 430].map((x) => (
        <g key={x} transform={`translate(${x} 322)`}>
          <circle cy="-12" r="13" fill="url(#jaago-flame)" />
          <path d="M-12 0 Q0 10 12 0 Z" fill={G} />
          <path d="M0 -20 C4 -14 4 -7 0 -3 C-4 -7 -4 -14 0 -20 Z" fill="#ffe08a" />
        </g>
      ))}
    </Scene>
  ),
  safe: { story: { top: 110, bottom: 220, x: 44 }, print: { top: 84, bottom: 165, x: 36 } },
}

/* ------------------------------------------------------------------ */
/* Qawwali Mehfil: a glowing lantern cluster under a cusped arch.      */

// Mughal multifoil arch: lobes bulge outward between cusps; returns an open path from bottom-left to bottom-right.
function cuspedArch(l: number, spring: number, apex: number, lobes: number, h: number) {
  const pts: [number, number][] = []
  const cy = apex + 0.35 * (spring - apex)
  for (let i = 0; i <= lobes; i++) {
    const t = i / lobes
    const u = 1 - t
    pts.push([u * u * l + 2 * u * t * l + t * t * 270, u * u * spring + 2 * u * t * cy + t * t * apex])
  }
  const right = pts.slice(0, -1).reverse().map(([x, y]) => [540 - x, y] as [number, number])
  const all = [...pts, ...right]
  let d = `M${l} ${h} L${l} ${spring}`
  for (let i = 1; i < all.length; i++) {
    const [x0, y0] = all[i - 1]
    const [x1, y1] = all[i]
    const r = (Math.hypot(x1 - x0, y1 - y0) / 2) * 1.08
    d += ` A${r} ${r} 0 0 1 ${x1} ${y1}`
  }
  return `${d} L${540 - l} ${h}`
}

function Lantern({ x, drop, s }: { x: number; drop: number; s: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d={`M0 0 V${drop}`} stroke={G} strokeWidth="1" strokeDasharray="3 2" />
      <g transform={`translate(0 ${drop}) scale(${s})`}>
        <circle cy="38" r="52" fill="url(#qawwali-glow)" />
        <path d="M-12 8 Q0 -6 12 8 Z" fill={G} />
        <circle cy="-4" r="2.4" fill="none" stroke={G} strokeWidth="1" />
        <rect x="-18" y="8" width="36" height="4" fill={G} />
        <path d="M-18 12 L18 12 L22 40 L14 60 L-14 60 L-22 40 Z" fill="url(#qawwali-glass)" stroke={G} strokeWidth="1.2" />
        <path d="M-22 40 H22" stroke={G} strokeWidth="0.8" />
        {[-10, 0, 10].map((wx) => (
          <path key={wx} d={`M${wx - 3.5} 37 L${wx - 3.5} 24 Q${wx} 17 ${wx + 3.5} 24 L${wx + 3.5} 37`} stroke={G} strokeWidth="0.7" fill="#fff1c8" fillOpacity="0.45" />
        ))}
        {[-8, 0, 8].map((wx) => (
          <circle key={wx} cx={wx} cy="50" r="1.6" fill={G} />
        ))}
        <path d="M-14 60 L14 60 L6 70 L-6 70 Z" fill={G} />
        <path d="M0 70 V84 M-2 88 L-3 102 M0 88 V104 M2 88 L3 102" stroke={G} strokeWidth="0.7" />
        <circle cy="86" r="2.6" fill={G} />
      </g>
    </g>
  )
}

const qawwali: Design = {
  id: 'qawwali',
  sky: `${GRAIN_LIGHT}, radial-gradient(ellipse at 50% 30%,#1b2c56 0%,#101b3a 58%,#081025 100%)`,
  colors: { title: '#efd594', heading: '#f1dca4', text: '#e8ecf6', accent: '#e3c070', muted: '#b4bfd9' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <svg viewBox="0 0 540 230" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <defs>
        <Glow id="qawwali-glow" c="#ffc76a" o={0.6} />
        <radialGradient id="qawwali-glass" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#ffe6a8" />
          <stop offset="0.6" stopColor="#e9a24a" />
          <stop offset="1" stopColor="#8a4a1a" />
        </radialGradient>
      </defs>
      <Lantern x={182} drop={34} s={0.82} />
      <Lantern x={358} drop={34} s={0.82} />
      <Lantern x={270} drop={64} s={1.05} />
    </svg>
  ),
  Overlay: ({ h }) => {
    const d = cuspedArch(46, 300, 96, 7, h)
    return (
      <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        <FoilDefs />
        <defs>
          <mask id="qawwali-mask">
            <rect width="540" height={h} fill="#fff" />
            <path d={`${d} Z`} fill="#000" />
          </mask>
        </defs>
        <rect width="540" height={h} fill="#050b1b" opacity="0.55" mask="url(#qawwali-mask)" />
        <path d={d} fill="none" stroke={G} strokeWidth="2.2" />
        <path d={`M34 ${h} L34 300 Q34 ${96 + 0.35 * 216} 270 82 Q506 ${96 + 0.35 * 216} 506 300 L506 ${h}`} fill="none" stroke={G} strokeWidth="0.7" />
        {[40, 500].map((x) => (
          <rect key={x} x={x - 8} y="296" width="16" height="6" fill={G} />
        ))}
      </svg>
    )
  },
  Bottom: () => (
    <Scene>
      <path d="M60 300 H480" stroke={G} strokeWidth="0.6" />
      {[190, 270, 350].map((cx) => (
        <path key={cx} d={`M${cx - 22} 336 L${cx - 22} 322 Q${cx - 22} 312 ${cx} 306 Q${cx + 22} 312 ${cx + 22} 322 L${cx + 22} 336`} fill="#0a1430" stroke={G} strokeWidth="0.8" />
      ))}
      <rect x="46" y="336" width="448" height="4" fill={G} />
    </Scene>
  ),
  safe: { story: { top: 240, bottom: 110, x: 70 }, print: { top: 200, bottom: 84, x: 58 } },
}

/* ------------------------------------------------------------------ */
/* Black Tie Emerald: the deco fan crest is the hero.                  */

// Rectangle with corners notched by two steps.
function stepped(i: number, st: number, h: number) {
  const L = i
  const R = 540 - i
  const T = i
  const B = h - i
  return `M${L + 2 * st} ${T} H${R - 2 * st} V${T + st} H${R - st} V${T + 2 * st} H${R} V${B - 2 * st} H${R - st} V${B - st} H${R - 2 * st} V${B} H${L + 2 * st} V${B - st} H${L + st} V${B - 2 * st} H${L} V${T + 2 * st} H${L + st} V${T + st} H${L + 2 * st} Z`
}

const emeraldDeco: Design = {
  id: 'emerald-deco',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, radial-gradient(ellipse at 50% 35%,#105c47 0%,#0a4032 55%,#062b21 100%)`,
  colors: { title: '#ead08f', heading: '#f0dba8', text: '#edf3ee', accent: '#e0c072', muted: '#b6d1c4' },
  fonts: { title: '"Bodoni Moda"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <svg viewBox="0 0 540 200" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <Sunburst cx={270} cy={138} r={98} a0={180} a1={360} n={26} fill={G} hub="#0a4032" />
      <rect x="150" y="138" width="240" height="2.6" fill={G} />
      <rect x="176" y="145" width="188" height="1" fill={G} />
      <path d="M246 160 L270 172 L294 160" stroke={G} strokeWidth="1" fill="none" />
      <path d="M256 168 L270 175 L284 168" stroke={G} strokeWidth="0.6" fill="none" />
    </svg>
  ),
  Overlay: ({ h }) => (
    <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
      <FoilDefs />
      <path d={stepped(18, 10, h)} fill="none" stroke={G} strokeWidth="2" />
      <path d={stepped(30, 8, h)} fill="none" stroke={G} strokeWidth="0.7" />
    </svg>
  ),
  Bottom: () => (
    <Scene>
      {/* stepped keystone */}
      <path d="M210 318 H330 V310 H312 V302 H296 V294 H244 V302 H228 V310 H210 Z" fill="none" stroke={G} strokeWidth="1" />
      <path d="M262 294 L270 286 L278 294" stroke={G} strokeWidth="1" fill="none" />
      <path d="M90 318 H200 M340 318 H450" stroke={G} strokeWidth="0.6" />
    </Scene>
  ),
  safe: { story: { top: 210, bottom: 120, x: 60 }, print: { top: 162, bottom: 92, x: 50 } },
}

/* ------------------------------------------------------------------ */
/* Garden Fairy Lights: a canopy of string lights is the hero.         */

function Eucalyptus({ x, y, rot = 0, s = 1, n = 9, tones }: { x: number; y: number; rot?: number; s?: number; n?: number; tones: string[] }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d={`M0 0 Q12 ${-n * 7} 0 ${-n * 14}`} stroke={tones[3]} strokeWidth="1.1" fill="none" />
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.6) / n
        const xx = 24 * t * (1 - t)
        const side = i % 2 ? 1 : -1
        return <circle key={i} cx={xx + side * 8} cy={-(i + 0.6) * 14} r={7.5 - t * 3.5} fill={tones[i % 3]} stroke={i % 3 === 0 ? G : 'none'} strokeWidth="0.6" opacity="0.92" />
      })}
    </g>
  )
}

const strand = (x0: number, x1: number, y: number, sag: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const u = (i + 0.5) / n
    return { x: x0 + (x1 - x0) * u, y: y + 4 * sag * u * (1 - u) }
  })

const FAIRY_LEAF = ['#8ea493', '#aabcaa', '#78907f', '#647a69']

const fairyGarden: Design = {
  id: 'fairy-garden',
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 35%,#f3f5ee 0%,#e5ebdd 60%,#d4ddca 100%)`,
  colors: { title: '#86672a', heading: '#2e4a37', text: '#2b392e', accent: '#8a6b2c', muted: '#5b6e5e' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <svg viewBox="0 0 540 190" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <defs>
        <Glow id="fairy-glow" c="#ffcf6a" o={0.75} />
      </defs>
      <Eucalyptus x={0} y={0} rot={122} s={1.05} n={9} tones={FAIRY_LEAF} />
      <Eucalyptus x={540} y={0} rot={-122} s={1.05} n={9} tones={FAIRY_LEAF} />
      {[
        [0, 540, 10, 62, 21],
        [40, 500, 24, 54, 17],
        [110, 430, 40, 40, 11],
      ].map(([x0, x1, y, sag, n], k) => (
        <g key={k}>
          <path d={`M${x0} ${y} Q${(x0 + x1) / 2} ${y + 2 * sag} ${x1} ${y}`} stroke="#8a7b5c" strokeWidth="0.6" fill="none" />
          {strand(x0, x1, y, sag, n).map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y})`}>
              <circle r="8" fill="url(#fairy-glow)" />
              <rect x="-1" y="-4.5" width="2" height="2.4" fill={G} />
              <circle r="2" fill="#fff5d4" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  ),
  Overlay: ({ h }) => (
    <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
      <FoilDefs />
      <rect x="22" y="22" width="496" height={h - 44} fill="none" stroke={G} strokeWidth="1" />
    </svg>
  ),
  Bottom: () => (
    <Scene>
      <Eucalyptus x={24} y={346} rot={28} s={1.2} n={9} tones={FAIRY_LEAF} />
      <Eucalyptus x={516} y={346} rot={-28} s={1.2} n={9} tones={FAIRY_LEAF} />
      <Eucalyptus x={64} y={346} rot={8} s={0.85} n={7} tones={FAIRY_LEAF} />
      <Eucalyptus x={476} y={346} rot={-8} s={0.85} n={7} tones={FAIRY_LEAF} />
    </Scene>
  ),
  safe: { story: { top: 150, bottom: 170, x: 58 }, print: { top: 115, bottom: 128, x: 48 } },
}

/* ------------------------------------------------------------------ */
/* Champagne Minimal: typography is the hero; one tiny jewel.          */

const champagne: Design = {
  id: 'champagne',
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 32%,#fdf9f1 0%,#f5ecdb 60%,#e9d8bc 100%)`,
  colors: { title: '#8f6f2e', heading: '#5a4930', text: '#40362a', accent: '#9a7a35', muted: '#857256' },
  fonts: { title: '"Pinyon Script"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <svg viewBox="0 0 540 150" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <path d="M196 112 H258 M282 112 H344" stroke={G} strokeWidth="0.6" />
      <path d="M270 105 L277 112 L270 119 L263 112 Z" fill={G} />
    </svg>
  ),
  Overlay: ({ h }) => (
    <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
      <FoilDefs />
      <rect x="28" y="28" width="484" height={h - 56} fill="none" stroke={G} strokeWidth="0.8" />
      <rect x="34" y="34" width="472" height={h - 68} fill="none" stroke={G} strokeWidth="0.35" />
    </svg>
  ),
  Bottom: () => (
    <Scene>
      <path d="M232 280 H308" stroke={G} strokeWidth="0.6" />
      <circle cx="270" cy="290" r="1.6" fill={G} />
    </Scene>
  ),
  safe: { story: { top: 170, bottom: 120, x: 78 }, print: { top: 128, bottom: 92, x: 64 } },
}

/* ------------------------------------------------------------------ */
/* Sheesh Mahal: a half medallion of mirror shards is the hero.        */

const sheeshMahal: Design = {
  id: 'sheesh-mahal',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, radial-gradient(ellipse at 50% 35%,#4b1b50 0%,#33103b 58%,#1d0823 100%)`,
  colors: { title: '#efe5f3', heading: '#e1d3ea', text: '#f3ebf5', accent: '#d8c4e5', muted: '#c2adcc' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <svg viewBox="0 0 540 50" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      {Array.from({ length: 18 }, (_, c) => (
        <g key={c} stroke="#2a0c30" strokeWidth="0.6">
          <path d={`M${c * 30} 26 L${c * 30 + 15} 4 L${c * 30 + 30} 26 Z`} fill={S} opacity={0.4 + ((c * 7) % 10) / 18} />
          <path d={`M${c * 30 + 15} 4 L${c * 30 + 45} 4 L${c * 30 + 30} 26 Z`} fill={S} opacity={0.3 + ((c * 13) % 10) / 20} />
        </g>
      ))}
      <path d="M0 30 H540" stroke={S} strokeWidth="1" />
    </svg>
  ),
  Overlay: ({ h }) => <LuxeFrame h={h} f="silver" inset={14} jewels={false} />,
  Bottom: () => {
    const cx = 270
    const cy = 352
    const radii = [44, 78, 112, 146, 176]
    const pt = (a: number, r: number) => `${cx + Math.cos(rad(a)) * r} ${cy + Math.sin(rad(a)) * r}`
    return (
      <Scene>
        {radii.slice(0, -1).map((ri, k) => {
          const ro = radii[k + 1]
          const n = 10 + k * 6
          const step = 180 / n
          return Array.from({ length: n }, (_, j) => {
            const a0 = 180 + j * step
            const am = a0 + step / 2
            return (
              <g key={`${k}-${j}`} stroke="#2a0c30" strokeWidth="0.6">
                <path d={`M${pt(a0, ri)} L${pt(a0 + step, ri)} L${pt(am, ro)} Z`} fill={S} opacity={0.35 + ((j * 7 + k * 3) % 10) / 16} />
                {j < n - 1 && <path d={`M${pt(am, ro)} L${pt(am + step, ro)} L${pt(a0 + step, ri)} Z`} fill={S} opacity={0.25 + ((j * 11 + k * 5) % 10) / 22} />}
              </g>
            )
          })
        })}
        <path d={`M${pt(180, 44)} A44 44 0 0 1 ${pt(360, 44)} Z`} fill="#33103b" stroke={S} strokeWidth="1" />
        <path d={`M${pt(180, 180)} A180 180 0 0 1 ${pt(360, 180)}`} fill="none" stroke={S} strokeWidth="1.4" />
      </Scene>
    )
  },
  safe: { story: { top: 90, bottom: 210, x: 50 }, print: { top: 70, bottom: 155, x: 42 } },
}

export const designs: Design[] = [marquee, garba, jaago, qawwali, emeraldDeco, fairyGarden, champagne, sheeshMahal]

export const templates: Template[] = [
  { id: 'bollywood-marquee', name: 'Bollywood Marquee Night', design: 'marquee', lang: 'en', symbol: 'floral', event: 'sangeet' },
  { id: 'garba-raas-night', name: 'Garba Raas Night', design: 'garba', lang: 'gu', symbol: 'ganesha', event: 'sangeet' },
  { id: 'dhol-jaago', name: 'Dhol Jaago Phulkari', design: 'jaago', lang: 'pa', symbol: 'ek-onkar', event: 'sangeet' },
  { id: 'qawwali-mehfil', name: 'Qawwali Mehfil Lanterns', design: 'qawwali', lang: 'en', symbol: 'bismillah', event: 'sangeet' },
  { id: 'black-tie-emerald', name: 'Black Tie Emerald Deco', design: 'emerald-deco', lang: 'en', symbol: 'floral', event: 'reception' },
  { id: 'garden-fairy-lights', name: 'Garden Fairy Lights', design: 'fairy-garden', lang: 'en', symbol: 'floral', event: 'reception' },
  { id: 'champagne-minimal', name: 'Champagne Minimal', design: 'champagne', lang: 'en', symbol: 'floral', event: 'reception' },
  { id: 'sheesh-mahal', name: 'Sheesh Mahal Mirror Night', design: 'sheesh-mahal', lang: 'hi', symbol: 'ganesha', event: 'reception' },
]
