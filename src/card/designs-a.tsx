import type { ReactNode } from 'react'
import type { Design } from './designs'
import type { Template } from '../templates'
import { FoilDefs, GRAIN, GRAIN_LIGHT, Lace, LuxeFrame, SHEEN, foil } from './luxe'

// Batch A: save-the-date and ring (sagai/roka) designs. One hero element per card, everything
// else quiet; each card has its own palette and a frame specific to its subject.

const serif = '"Cormorant Garamond", Georgia, serif'

const Scene = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 540 340" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" style={{ display: 'block' }}>
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

const TopArt = ({ h, children }: { h: number; children?: ReactNode }) => (
  <svg viewBox={`0 0 540 ${h}`} width="100%" style={{ display: 'block' }}>
    <FoilDefs />
    {children}
  </svg>
)

// Four-point sparkle.
const Sparkle = ({ x, y, r, fill }: { x: number; y: number; r: number; fill: string }) => (
  <path d={`M${x} ${y - r} Q${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} Q${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} Q${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} Q${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z`} fill={fill} />
)

const wave = (x: number, y: number, n: number) => `M${x} ${y} q5 -4 10 0` + ' t10 0'.repeat(n)

/* ---------------- monsoon postcard: hero = silver postmark seal ---------------- */

function UmbrellaLine({ stroke }: { stroke: string }) {
  return (
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-90 0 Q-88 -80 0 -86 Q88 -80 90 0" strokeWidth="2" fill="rgba(255,255,255,.06)" />
      <path d="M-90 0 q22.5 -12 45 0 q22.5 -12 45 0 q22.5 -12 45 0 q22.5 -12 45 0" strokeWidth="1.6" />
      <path d="M0 -86 Q-30 -50 -45 0 M0 -86 L0 0 M0 -86 Q30 -50 45 0" strokeWidth="1" />
      <path d="M0 -86 L0 -100" strokeWidth="2" />
      <path d="M0 0 L0 84 q0 18 -14 18 q-12 0 -12 -12" strokeWidth="2.2" />
    </g>
  )
}

const monsoon: Design = {
  id: 'monsoon',
  sky: `${GRAIN_LIGHT}, radial-gradient(ellipse at 30% 12%,rgba(255,255,255,.13) 0%,rgba(255,255,255,0) 55%), linear-gradient(180deg,#47515d 0%,#333c47 55%,#242b34 100%)`,
  colors: { title: '#e6eaf0', heading: '#d3dbe4', text: '#eef1f5', accent: '#bfcad7', muted: '#a5b1be' },
  fonts: { title: '"Pinyon Script"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <TopArt h={236}>
      {Array.from({ length: 46 }, (_, i) => {
        const x = (i * 97) % 540
        const y = (i * 53) % 230
        const len = 14 + (i % 4) * 7
        return <path key={i} d={`M${x} ${y} l${-len * 0.28} ${len}`} stroke={foil('silver')} strokeWidth="0.6" opacity={0.2 + (i % 5) * 0.07} />
      })}
      <g transform="translate(270 124)">
        <circle r="66" fill="#2c343e" stroke={foil('silver')} strokeWidth="1.6" />
        <circle r="58" fill="none" stroke={foil('silver')} strokeWidth="0.6" />
        {Array.from({ length: 56 }, (_, i) => (
          <circle key={i} cy={-62} r="0.9" fill={foil('silver')} transform={`rotate(${i * (360 / 56)})`} />
        ))}
        <circle r="44" fill="none" stroke={foil('silver')} strokeWidth="0.6" strokeDasharray="2 3" />
        <g transform="translate(0 6) scale(0.34)">
          <UmbrellaLine stroke={foil('silver')} />
        </g>
      </g>
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k} stroke={foil('silver')} strokeWidth="0.9" fill="none" opacity="0.75">
          <path d={wave(96, 106 + k * 9, 8)} />
          <path d={wave(354, 106 + k * 9, 8)} />
        </g>
      ))}
    </TopArt>
  ),
  // Postage-stamp perforation cut into the card edge, then a fine silver keyline.
  Overlay: ({ h }) => (
    <Frame h={h}>
      {Array.from({ length: 34 }, (_, i) => (
        <g key={i} fill="#181d24">
          <circle cx={6 + i * 16} cy={0} r="5" />
          <circle cx={6 + i * 16} cy={h} r="5" />
        </g>
      ))}
      {Array.from({ length: Math.ceil(h / 16) + 1 }, (_, i) => (
        <g key={i} fill="#181d24">
          <circle cx={0} cy={6 + i * 16} r="5" />
          <circle cx={540} cy={6 + i * 16} r="5" />
        </g>
      ))}
      <rect x="22" y="22" width="496" height={h - 44} fill="none" stroke={foil('silver')} strokeWidth="1.2" />
      <rect x="27" y="27" width="486" height={h - 54} fill="none" stroke={foil('silver')} strokeWidth="0.5" />
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      {[0, 1, 2].map((k) => (
        <ellipse key={k} cx={270} cy={318} rx={40 + k * 46} ry={5 + k * 4} fill="none" stroke={foil('silver')} strokeWidth={0.9 - k * 0.2} opacity={0.75 - k * 0.2} />
      ))}
      {[150, 390].map((x) => (
        <ellipse key={x} cx={x} cy={308} rx="22" ry="3" fill="none" stroke={foil('silver')} strokeWidth="0.6" opacity="0.5" />
      ))}
    </Scene>
  ),
  safe: { story: { top: 240, bottom: 110, x: 52 }, print: { top: 200, bottom: 82, x: 44 } },
}

/* ---------------- Uttarayan: hero = filigree kite ---------------- */

function FiligreeKite() {
  const g = foil()
  return (
    <g>
      <defs>
        <linearGradient id="pt-silk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#56397a" />
          <stop offset="1" stopColor="#2a1c45" />
        </linearGradient>
      </defs>
      <path d="M0 -84 L62 -10 L0 72 L-62 -10 Z" fill="url(#pt-silk)" stroke={g} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M0 -70 L50 -10 L0 58 L-50 -10 Z" fill="none" stroke={g} strokeWidth="0.6" />
      <path d="M0 -84 L0 72" stroke={g} strokeWidth="0.9" />
      <path d="M-62 -10 Q0 -44 62 -10" stroke={g} strokeWidth="0.9" fill="none" />
      <g fill="none" stroke={g} strokeWidth="0.8" strokeLinecap="round">
        <path d="M-9 -58 C-15 -50 -7 -44 0 -48 C7 -44 15 -50 9 -58" />
        <path d="M-9 44 C-15 36 -7 30 0 34 C7 30 15 36 9 44" />
        <path d="M-40 -6 C-34 -14 -26 -10 -28 -4 M40 -6 C34 -14 26 -10 28 -4" />
      </g>
      <g transform="translate(0 -10)">
        <Lace r={15} fill={g} petals={16} />
      </g>
      {[-62, 62].map((x) => (
        <g key={x} transform={`translate(${x} -10)`} stroke={g} strokeWidth="0.7">
          {[-6, -3, 0, 3, 6].map((d) => (
            <path key={d} d={`M0 0 L${d} 16`} />
          ))}
          <circle cy="2" r="2.4" fill={g} stroke="none" />
        </g>
      ))}
      <path d="M0 72 C22 106 -18 136 8 172" stroke={g} strokeWidth="0.8" fill="none" />
      {[
        [5, 100],
        [-3, 134],
        [7, 166],
      ].map(([x, y]) => (
        <path key={y} d={`M${x - 8} ${y - 4} L${x} ${y} L${x - 8} ${y + 4} Z M${x + 8} ${y - 4} L${x} ${y} L${x + 8} ${y + 4} Z`} fill={g} />
      ))}
    </g>
  )
}

// Old-city pol rooftops, tone-on-tone with a single foil roofline.
function roofs() {
  const tops = [292, 280, 298, 270, 286, 300, 276, 262, 276, 300, 286, 270, 298, 280, 292]
  const w = 540 / tops.length
  let d = 'M0 340'
  tops.forEach((t, i) => {
    d += ` L${i * w} ${t} L${(i + 1) * w} ${t}`
  })
  return d + ' L540 340 Z'
}

const patang: Design = {
  id: 'patang',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, linear-gradient(180deg,#251b3e 0%,#34234b 52%,#4b2d4f 100%)`,
  colors: { title: '#efd89b', heading: '#f4e4b9', text: '#f2ebf3', accent: '#e3c076', muted: '#cab9d0' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <TopArt h={256}>
      <path d="M270 112 C320 170 420 210 560 250" stroke={foil()} strokeWidth="0.5" fill="none" opacity="0.8" />
      <g transform="translate(270 112) rotate(-8) scale(0.92)">
        <FiligreeKite />
      </g>
    </TopArt>
  ),
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect x="18" y="18" width="504" height={h - 36} fill="none" stroke={foil()} strokeWidth="1.3" />
      <rect x="24" y="24" width="492" height={h - 48} fill="none" stroke={foil()} strokeWidth="0.5" />
      {[
        [21, 21],
        [519, 21],
        [21, h - 21],
        [519, h - 21],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y - 10} L${x + 7} ${y} L${x} ${y + 10} L${x - 7} ${y} Z`} fill={foil()} />
      ))}
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <path d={roofs()} fill="#1d1531" stroke={foil()} strokeWidth="0.9" />
      <path d="M252 262 Q270 236 288 262 Z" fill="#1d1531" stroke={foil()} strokeWidth="0.9" />
      <path d="M270 238 L270 228" stroke={foil()} strokeWidth="1" />
    </Scene>
  ),
  safe: { story: { top: 262, bottom: 110, x: 48 }, print: { top: 218, bottom: 90, x: 40 } },
}

/* ---------------- calendar circle: hero = calendar page with brush-ringed date ---------------- */

// Certificate-style frame with concave (scooped) corners.
function scoop(i: number, r: number, h: number) {
  return `M${i + r} ${i} H${540 - i - r} A${r} ${r} 0 0 0 ${540 - i} ${i + r} V${h - i - r} A${r} ${r} 0 0 0 ${540 - i - r} ${h - i} H${i + r} A${r} ${r} 0 0 0 ${i} ${h - i - r} V${i + r} A${r} ${r} 0 0 0 ${i + r} ${i} Z`
}

const calendar: Design = {
  id: 'calendar',
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 25%,#fffbf3 0%,#f5ebd9 60%,#e8d7ba 100%)`,
  colors: { title: '#7b1e2b', heading: '#5e1823', text: '#3b2a24', accent: '#9a7329', muted: '#7a6553' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => <TopArt h={70} />,
  Overlay: ({ h }) => (
    <Frame h={h}>
      <path d={scoop(18, 26, h)} fill="none" stroke="#7b1e2b" strokeWidth="1.5" />
      <path d={scoop(25, 22, h)} fill="none" stroke={foil()} strokeWidth="0.8" />
    </Frame>
  ),
  Bottom: () => {
    const x0 = 165
    const y0 = 196
    const cw = 30
    const ch = 24
    return (
      <Scene>
        <rect x="153" y="146" width="240" height="186" rx="4" fill="rgba(90,40,20,.10)" />
        <rect x="149" y="142" width="242" height="186" rx="4" fill="#fffdf8" stroke={foil()} strokeWidth="0.9" />
        <rect x="149" y="142" width="242" height="34" rx="4" fill="#7b1e2b" />
        <path d="M232 160 L308 160" stroke={foil()} strokeWidth="0.8" />
        <path d="M270 154 L276 160 L270 166 L264 160 Z" fill={foil()} />
        {[200, 340].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="132" width="6" height="18" rx="3" fill={foil()} />
          </g>
        ))}
        {Array.from({ length: 7 }, (_, c) => (
          <path key={c} d={`M${x0 + c * cw + 9} 186 l12 0`} stroke="#9a7329" strokeWidth="1" opacity="0.7" />
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const c = i % 7
          const r = Math.floor(i / 7)
          return i === 24 ? null : <circle key={i} cx={x0 + c * cw + 15} cy={y0 + r * ch + 12} r="1.6" fill="#7b1e2b" opacity="0.45" />
        })}
        <g transform={`translate(${x0 + 3 * cw + 15} ${y0 + 3 * ch + 12})`}>
          <path d="M-2 -14 C14 -15 20 -4 17 6 C13 16 -6 17 -15 9 C-21 2 -16 -12 4 -13" fill="none" stroke="#7b1e2b" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M-12 -9 C-2 -17 15 -12 16 -1" fill="none" stroke="#7b1e2b" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <path d="M0 5 C-8 -3 -6 -9 0 -5 C6 -9 8 -3 0 5 Z" fill={foil()} />
        </g>
      </Scene>
    )
  },
  safe: { story: { top: 120, bottom: 215, x: 52 }, print: { top: 92, bottom: 172, x: 44 } },
}

/* ---------------- rose gold solitaire: hero = the ring ---------------- */

const solitaire: Design = {
  id: 'solitaire',
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 30%,#fdf5f2 0%,#f5e2dc 60%,#ebcec5 100%)`,
  colors: { title: '#9b5a4b', heading: '#6b3a31', text: '#4c2c27', accent: '#b4705f', muted: '#8d6c64' },
  fonts: { title: '"Pinyon Script"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => <TopArt h={80} />,
  // Halo setting: a rounded band of pavé stones between two fine rose-gold rails.
  Overlay: ({ h }) => {
    const g = foil('rose')
    const pave = (x: number, y: number) => <path key={`${x}-${y}`} d={`M${x} ${y - 2.2} L${x + 2.2} ${y} L${x} ${y + 2.2} L${x - 2.2} ${y} Z`} fill={g} />
    return (
      <Frame h={h}>
        <rect x="20" y="20" width="500" height={h - 40} rx="28" fill="none" stroke={g} strokeWidth="1.3" />
        <rect x="32" y="32" width="476" height={h - 64} rx="18" fill="none" stroke={g} strokeWidth="0.5" />
        {Array.from({ length: 43 }, (_, i) => [pave(60 + i * 10, 26), pave(60 + i * 10, h - 26)])}
        {Array.from({ length: Math.floor((h - 120) / 10) + 1 }, (_, i) => [pave(26, 60 + i * 10), pave(514, 60 + i * 10)])}
      </Frame>
    )
  },
  Bottom: () => {
    const g = foil('rose')
    return (
      <Scene>
        <defs>
          <radialGradient id="sol-glow">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sol-stone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f3e3e6" />
          </linearGradient>
        </defs>
        <circle cx="270" cy="200" r="64" fill="url(#sol-glow)" />
        <path d="M192 276 A78 26 0 1 0 348 276 A78 26 0 1 0 192 276 Z M202 278 A68 19 0 1 1 338 278 A68 19 0 1 1 202 278 Z" fill={g} fillRule="evenodd" />
        <ellipse cx="270" cy="277" rx="73" ry="22.5" fill="none" stroke="#fff5f1" strokeWidth="0.6" opacity="0.7" />
        <path d="M252 252 L258 214 M288 252 L282 214 M262 252 L264 218 M278 252 L276 218" stroke={g} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M256 186 L284 186 L300 202 L270 236 L240 202 Z" fill="url(#sol-stone)" stroke={g} strokeWidth="1.2" strokeLinejoin="round" />
        <g stroke={g} strokeWidth="0.6" fill="none">
          <path d="M240 202 L300 202" />
          <path d="M256 186 L250 202 L270 236 L290 202 L284 186 M270 186 L262 202 L270 236 L278 202 L270 186" />
        </g>
        <Sparkle x={300} y={184} r={9} fill={g} />
        <Sparkle x={236} y={214} r={5} fill={g} />
      </Scene>
    )
  },
  safe: { story: { top: 120, bottom: 205, x: 58 }, print: { top: 92, bottom: 172, x: 50 } },
}

/* ---------------- gol dhana: hero = engraved brass thali ---------------- */

function Mound({ x, fill, seed, dot }: { x: number; fill: string; seed: number; dot: string }) {
  return (
    <g>
      <path d={`M${x - 38} 300 C${x - 30} 270 ${x + 30} 270 ${x + 38} 300 Z`} fill={fill} />
      {Array.from({ length: 26 }, (_, i) => {
        const dx = (((i * 37 + seed * 13) % 60) - 30) * (1 - (i % 5) * 0.08)
        const dy = 296 - ((i * 23 + seed) % 20)
        return <circle key={i} cx={x + dx} cy={dy} r="1.1" fill={dot} opacity="0.7" />
      })}
    </g>
  )
}

const golDhana: Design = {
  id: 'gol-dhana',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, radial-gradient(ellipse at 50% 30%,#5c2b1b 0%,#411a10 55%,#2b0f09 100%)`,
  colors: { title: '#f0cd86', heading: '#f2dfb1', text: '#f5e9da', accent: '#e4b667', muted: '#d0b297' },
  fonts: { title: '"Great Vibes"', heading: '"Marcellus"', body: serif, names: '"Great Vibes"' },
  Top: () => <TopArt h={70} />,
  Overlay: ({ h }) => <LuxeFrame h={h} inset={16} />,
  Bottom: () => {
    const g = foil()
    return (
      <Scene>
        <defs>
          <radialGradient id="gd-flame">
            <stop offset="0" stopColor="#fff6cf" />
            <stop offset="0.5" stopColor="#ffbe5c" />
            <stop offset="1" stopColor="#ff8a2a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="270" cy="306" rx="194" ry="34" fill="rgba(0,0,0,.35)" />
        <ellipse cx="270" cy="300" rx="190" ry="34" fill={g} />
        <ellipse cx="270" cy="298" rx="170" ry="28" fill="#5a2a12" opacity="0.35" />
        <ellipse cx="270" cy="298" rx="146" ry="23" fill="none" stroke="#4a2a0a" strokeWidth="0.7" />
        {Array.from({ length: 40 }, (_, i) => {
          const a = (i / 40) * Math.PI * 2
          return <circle key={i} cx={270 + Math.cos(a) * 180} cy={299 + Math.sin(a) * 31} r="1.3" fill="#4a2a0a" opacity="0.6" />
        })}
        <Mound x={196} fill={foil('copper')} seed={3} dot="#3a1606" />
        <Mound x={344} fill="#7d6f35" seed={7} dot="#d8c88a" />
        <path d="M252 296 Q270 312 288 296 Q270 302 252 296 Z" fill={g} stroke="#4a2a0a" strokeWidth="0.6" />
        <circle cx="270" cy="276" r="22" fill="url(#gd-flame)" opacity="0.7" />
        <path d="M270 266 C275 276 274 286 270 292 C266 286 265 276 270 266 Z" fill="url(#gd-flame)" />
      </Scene>
    )
  },
  safe: { story: { top: 100, bottom: 140, x: 54 }, print: { top: 80, bottom: 112, x: 46 } },
}

/* ---------------- misri roka: hero = stitched phulkari star ---------------- */

const STITCH = '5 3.5'

const phulkari: Design = {
  id: 'phulkari',
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 30%,#fdf2ea 0%,#f8e1d1 60%,#efccb6 100%)`,
  colors: { title: '#8c4632', heading: '#476552', text: '#3d2b25', accent: '#a8792e', muted: '#7d6559' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <TopArt h={60}>
      <rect x="0" y="0" width="540" height="30" fill="#a9bea6" />
      {Array.from({ length: 18 }, (_, i) => (
        <path key={i} d={`M${15 + i * 30} 4 L${26 + i * 30} 15 L${15 + i * 30} 26 L${4 + i * 30} 15 Z`} fill="none" stroke={foil()} strokeWidth="1.2" strokeDasharray="3 2" />
      ))}
      <path d="M0 36 L540 36" stroke="#6d8a72" strokeWidth="1" strokeDasharray={STITCH} />
    </TopArt>
  ),
  // Running-stitch border in gold thread with a sage inner row.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect x="18" y="18" width="504" height={h - 36} fill="none" stroke={foil()} strokeWidth="1.4" strokeDasharray={STITCH} strokeLinecap="round" />
      <rect x="25" y="25" width="490" height={h - 50} fill="none" stroke="#6d8a72" strokeWidth="1" strokeDasharray="3 3" strokeLinecap="round" />
    </Frame>
  ),
  Bottom: () => {
    const R = 74
    const k = R * 0.707
    const star = (r: number, q: number) => (
      <>
        <path d={`M270 ${250 - r} L${270 + r} 250 L270 ${250 + r} L${270 - r} 250 Z`} fill={q ? 'none' : '#bccfb8'} stroke={q ? '#5f7f66' : foil()} strokeWidth={q ? 0.8 : 1.3} strokeDasharray={q ? undefined : STITCH} />
        <rect x={270 - r * 0.707} y={250 - r * 0.707} width={r * 1.414} height={r * 1.414} fill={q ? 'none' : '#bccfb8'} stroke={q ? '#5f7f66' : foil()} strokeWidth={q ? 0.8 : 1.3} strokeDasharray={q ? undefined : STITCH} />
      </>
    )
    return (
      <Scene>
        {star(R, 0)}
        <rect x={270 - k + 4} y={250 - k + 4} width={k * 2 - 8} height={k * 2 - 8} fill="#bccfb8" />
        <path d={`M270 ${250 - R + 4} L${270 + R - 4} 250 L270 ${250 + R - 4} L${270 - R + 4} 250 Z`} fill="#bccfb8" />
        {Array.from({ length: 32 }, (_, i) => (
          <path key={i} d="M0 -20 L0 -42" stroke={foil()} strokeWidth="0.6" transform={`translate(270 250) rotate(${i * 11.25})`} />
        ))}
        {star(R * 0.36, 1)}
        <path d="M270 238 L282 250 L270 262 L258 250 Z" fill={foil()} />
        <rect x="0" y="322" width="540" height="18" fill="#a9bea6" />
        <path d="M0 326 L540 326" stroke={foil()} strokeWidth="1.1" strokeDasharray={STITCH} />
      </Scene>
    )
  },
  safe: { story: { top: 80, bottom: 225, x: 50 }, print: { top: 64, bottom: 178, x: 42 } },
}

/* ---------------- celestial moon phases: hero = foil crescent ---------------- */

// Lit fraction f of a moon of radius r, lit on the right (waxing).
function moonPath(r: number, f: number) {
  const rx = r * Math.abs(1 - 2 * f)
  return `M0 ${-r} A${r} ${r} 0 0 1 0 ${r} A${rx} ${r} 0 0 ${f < 0.5 ? 0 : 1} 0 ${-r} Z`
}

const celestial: Design = {
  id: 'celestial',
  sky: `${GRAIN_LIGHT}, radial-gradient(circle,#f7ecc8 .7px,transparent 1.3px) 0 0/41px 43px, radial-gradient(circle,#ffffff .5px,transparent 1.1px) 13px 21px/29px 31px, radial-gradient(ellipse at 50% 80%,#25315f 0%,#141c3f 55%,#0a1029 100%)`,
  colors: { title: '#ecd59a', heading: '#f1e3bb', text: '#e9ecf6', accent: '#d9bd78', muted: '#abb4d4' },
  fonts: { title: '"Pinyon Script"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <TopArt h={120}>
      <path d="M90 78 Q270 30 450 78" fill="none" stroke={foil()} strokeWidth="0.6" strokeDasharray="0.1 5" strokeLinecap="round" />
      {[0.2, 0.5, 0.75, 1, 0.75, 0.5, 0.2].map((f, i) => {
        const x = 90 + i * 60
        const y = 78 - Math.sin((i / 6) * Math.PI) * 24
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="9" fill="#141c3f" stroke={foil()} strokeWidth="0.5" />
            <path d={moonPath(9, f)} fill={foil()} transform={i > 3 ? 'scale(-1 1)' : undefined} />
          </g>
        )
      })}
    </TopArt>
  ),
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect x="20" y="20" width="500" height={h - 40} fill="none" stroke={foil()} strokeWidth="0.9" />
      {[
        [20, 20],
        [520, 20],
        [20, h - 20],
        [520, h - 20],
        [270, 20],
        [270, h - 20],
      ].map(([x, y]) => (
        <Sparkle key={`${x}-${y}`} x={x} y={y} r={x === 270 ? 9 : 7} fill={foil()} />
      ))}
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <g transform="translate(270 246) rotate(-28)">
        <path d={moonPath(74, 0.2)} fill={foil()} />
        <path d={moonPath(66, 0.16)} fill="none" stroke="#5a4512" strokeWidth="0.6" opacity="0.7" transform="translate(4 0)" />
      </g>
      {[
        [214, 228, 30],
        [242, 214, 52],
        [228, 260, 18],
      ].map(([x, y, len]) => (
        <g key={x}>
          <path d={`M${x} ${y} L${x} ${y + len}`} stroke={foil()} strokeWidth="0.5" />
          <Sparkle x={x} y={y + len + 7} r={7} fill={foil()} />
        </g>
      ))}
    </Scene>
  ),
  safe: { story: { top: 118, bottom: 200, x: 48 }, print: { top: 94, bottom: 165, x: 40 } },
}

export const designs: Design[] = [monsoon, patang, calendar, solitaire, golDhana, phulkari, celestial]

export const templates: Template[] = [
  { id: 'monsoon-postcard', name: 'Monsoon Postcard', design: 'monsoon', lang: 'en', symbol: 'floral', event: 'save-the-date' },
  { id: 'kite-festival', name: 'Uttarayan Kite Festival', design: 'patang', lang: 'gu', symbol: 'ganesha', event: 'save-the-date' },
  { id: 'calendar-circle', name: 'Calendar Circle', design: 'calendar', lang: 'hi', symbol: 'ganesha', event: 'save-the-date' },
  { id: 'celestial-moon', name: 'Celestial Moon Phases', design: 'celestial', lang: 'en', symbol: 'floral', event: 'save-the-date' },
  { id: 'rose-gold-solitaire', name: 'Rose Gold Solitaire', design: 'solitaire', lang: 'en', symbol: 'floral', event: 'ring' },
  { id: 'gol-dhana', name: 'Gol Dhana Brass Thali', design: 'gol-dhana', lang: 'gu', symbol: 'ganesha', event: 'ring' },
  { id: 'misri-roka', name: 'Misri Roka Phulkari', design: 'phulkari', lang: 'pa', symbol: 'ek-onkar', event: 'ring' },
]
