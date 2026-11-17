import type { FC, ReactNode } from 'react'
import type { Lang } from '../types'
import {
  ArchFrame,
  Diya,
  Gopuram,
  Grass,
  HangingVines,
  LotusBloom,
  LotusPad,
  Mandap,
  Marigold,
  Mosque,
  Mountains,
  Paisley,
  Palace,
  PeacockFeather,
  SideVine,
  TeethBand,
  Temple,
  Toran,
  Trees,
  Water,
} from './motifs'
import { designs as batchA } from './designs-a'
import { EdgeJewel, FoilDefs, GRAIN, GRAIN_LIGHT, Lace, LeafFlecks, LuxeFrame, SHEEN, VIGNETTE, foil } from './luxe'
import { designs as batchB } from './designs-b'
import { designs as batchC } from './designs-c'
import { designs as batchD } from './designs-d'

export interface Design {
  id: string
  sky: string // CSS background of the whole card
  colors: { title: string; heading: string; text: string; accent: string; muted: string; names?: string } // names default to heading
  fonts: { title: string; heading: string; body: string; names: string } // Latin faces
  script?: Partial<Record<Lang, { title: string; body: string }>> // replaces the app-wide face for a script
  tracking?: string // letter-spacing for body text
  // Type sizes in em, where a design departs from the defaults (body .88, heading 1.05, names 1.95, RSVP heading .95).
  type?: { body?: number; heading?: number; names?: number; rsvpHeading?: number; plainDate?: boolean; lists?: 'left'; grow?: number }
  // Cut-outs from the artwork, w in em. couple sits between the names, swirl-l/-r flank the RSVP heading;
  // any of them can be placed in text as [[name]].
  ornaments?: Ornaments
  Top: FC // full-width top decoration, natural height
  Bottom: FC // 540 x 340 scene anchored to the bottom (print crops its sky)
  Overlay?: FC<{ h: number }> // full-card frame, h in 540-wide units
  // Full-bleed 1080x1920 artwork, one per page (cycled), replacing Top/Bottom/Overlay.
  // top/bottom are the text-free band in 540x960 story px; print crops the image to 5:7.
  // head: the image already prints the page title, symbol and invocation, so the card leaves them out.
  // size: starting text size for that page, before shrinking to fit (pages differ in density).
  pages?: { src: string; top: number; bottom: number; head?: boolean; size?: number }[]
  // Text safe area in px, per format (story 540x960, print 450x630).
  safe: { story: Box; print: Box }
}
type Box = { top: number; bottom: number; x: number }
export type Ornaments = Record<string, { src: string; w: number }>

const SAFE: Design['safe'] = { story: { top: 170, bottom: 250, x: 34 }, print: { top: 128, bottom: 160, x: 28 } }

const Scene = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 540 340" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" style={{ display: 'block' }}>
    {children}
  </svg>
)

const serif = '"Cormorant Garamond", Georgia, serif'

function Kalash({ x, y, s = 1, pot = '#c9962e', line = '#7a4a0c' }: { x: number; y: number; s?: number; pot?: string; line?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-50, -25, 0, 25, 50].map((a) => (
        <ellipse key={a} cx="0" cy="-48" rx="5" ry="16" fill="#3f7d2c" transform={`rotate(${a} 0 -36)`} />
      ))}
      <ellipse cx="0" cy="-50" rx="11" ry="13" fill="#8d5a2b" />
      <path d="M-14 -36 L14 -36 L10 -28 L-10 -28 Z" fill={pot} stroke={line} strokeWidth="1" />
      <path d="M-10 -28 Q-30 -14 -22 4 Q0 14 22 4 Q30 -14 10 -28 Z" fill={pot} stroke={line} strokeWidth="1.2" />
      <path d="M-24 -6 Q0 2 24 -6" stroke="#c62828" strokeWidth="2.5" fill="none" />
      <path d="M-6 -16 L6 -16 M0 -22 L0 -10" stroke="#c62828" strokeWidth="2" />
    </g>
  )
}

// Half mandala rising from the bottom edge.
function HalfMandala({ y = 340, color, fill, r = 150 }: { y?: number; color: string; fill: string; r?: number }) {
  return (
    <g transform={`translate(270 ${y})`}>
      {[r, r * 0.78, r * 0.56].map((rr, k) => (
        <g key={rr}>
          <circle r={rr} stroke={color} strokeWidth="1.5" fill="none" />
          {Array.from({ length: 24 - k * 6 }, (_, i) => (
            <ellipse key={i} cx="0" cy={-rr + 12} rx="5" ry="12" fill={k % 2 ? fill : color} opacity="0.85" transform={`rotate(${-90 + (180 / (23 - k * 6)) * i})`} />
          ))}
        </g>
      ))}
    </g>
  )
}

function Gurdwara({ fill, line, y = 290 }: { fill: string; line: string; y?: number }) {
  return (
    <g>
      <rect x="150" y={y - 70} width="240" height="70" fill={fill} stroke={line} strokeWidth="1.2" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${166 + i * 26} ${y} L${166 + i * 26} ${y - 30} Q${174 + i * 26} ${y - 42} ${182 + i * 26} ${y - 30} L${182 + i * 26} ${y}`} fill={line} opacity="0.35" />
      ))}
      <rect x="200" y={y - 110} width="140" height="40" fill={fill} stroke={line} strokeWidth="1.2" />
      {/* inverted-lotus dome */}
      <path d={`M220 ${y - 110} Q215 ${y - 160} 270 ${y - 178} Q325 ${y - 160} 320 ${y - 110} Z`} fill={fill} stroke={line} strokeWidth="1.4" />
      {[-30, -15, 0, 15, 30].map((dx) => (
        <path key={dx} d={`M${270 + dx} ${y - 112} Q${270 + dx * 1.2} ${y - 150} 270 ${y - 176}`} stroke={line} strokeWidth="0.8" fill="none" />
      ))}
      <path d={`M270 ${y - 178} L270 ${y - 196}`} stroke={line} strokeWidth="2" />
      {[165, 375].map((x) => (
        <path key={x} d={`M${x - 14} ${y - 70} Q${x} ${y - 98} ${x + 14} ${y - 70} Z`} fill={fill} stroke={line} strokeWidth="1.2" />
      ))}
    </g>
  )
}

/* ------------------------------------------------------------------ */

const gulabi: Design = {
  id: 'gulabi',
  sky: 'linear-gradient(180deg,#e9a6b8 0%,#f1bfca 35%,#f6d6da 62%,#ece2e8 80%,#e2dfe8 100%)',
  colors: { title: '#2f4f2a', heading: '#6e1a2b', text: '#4b1e27', accent: '#8b1c1c', muted: '#643d46' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => <HangingVines drop="bud" />,
  Bottom: () => (
    <Scene>
      <Mountains y={140} far="#b8a9c6" near="#a59cb6" />
      <Trees y={262} seed={11} />
      <Temple x={420} y={290} s={0.8} />
      <Grass y={300} seed={4} />
      <SideVine x={14} top={70} bottom={320} />
      <SideVine x={526} flip top={60} bottom={320} />
      {[120, 210, 300].map((x, i) => (
        <LotusBloom key={x} x={x} y={322 - (i % 2) * 6} s={0.8} />
      ))}
    </Scene>
  ),
  safe: { ...SAFE, print: { ...SAFE.print, bottom: 195 } }, // clears the mountains, as in the printed kankotri
}

const udaipur: Design = {
  id: 'udaipur',
  sky: 'radial-gradient(ellipse at 50% 30%,#8a1c2e 0%,#5e0f1d 55%,#3a0812 100%)',
  colors: { title: '#f3d58f', heading: '#e8c77e', text: '#f6e7d0', accent: '#ffb74d', muted: '#d9bfa0' },
  fonts: { title: '"Pinyon Script"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => <Toran thread="#d4af5a" leaf="#4f8f3a" accent="#f3d58f" />,
  Overlay: ({ h }) => <ArchFrame gold="#d4af5a" inner="#a8823a" h={h} />,
  Bottom: () => (
    <Scene>
      <Water y={292} color="#2a0a12" line="#a8823a" />
      <Palace fill="#4a0c18" line="#d4af5a" y={292} />
    </Scene>
  ),
  safe: { story: { top: 190, bottom: 230, x: 60 }, print: { top: 140, bottom: 170, x: 52 } },
}

const kesar: Design = {
  id: 'kesar',
  sky: 'radial-gradient(ellipse at 50% 40%,#fff6e3 0%,#ffe2b8 60%,#ffcf8a 100%)',
  colors: { title: '#9b1b1b', heading: '#7a1f1f', text: '#3b2314', accent: '#a5370a', muted: '#7a4f30' },
  fonts: { title: '"Cinzel"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => <Toran />,
  Bottom: () => (
    <Scene>
      <HalfMandala y={350} color="#b8860b" fill="#e8730c" r={170} />
      <Kalash x={80} y={318} s={1.3} />
      <Kalash x={460} y={318} s={1.3} />
      {[180, 225, 270, 315, 360].map((x) => (
        <Diya key={x} x={x} y={330} s={0.9} />
      ))}
    </Scene>
  ),
  safe: SAFE,
}

const marigold: Design = {
  id: 'marigold',
  sky: 'linear-gradient(180deg,#fffbe0 0%,#fff0a6 55%,#ffd94a 100%)',
  colors: { title: '#b34700', heading: '#8a3b00', text: '#4a2a05', accent: '#ad1457', muted: '#7a5a20' },
  fonts: { title: '"Great Vibes"', heading: '"Marcellus"', body: serif, names: '"Great Vibes"' },
  Top: () => <Toran thread="#8a6a1a" />,
  Bottom: () => (
    <Scene>
      {Array.from({ length: 40 }, (_, i) => (
        <ellipse key={i} cx={(i * 47) % 540} cy={300 + (i % 4) * 9} rx="7" ry="18" fill={i % 2 ? '#3f7d2c' : '#5a9a3a'} transform={`rotate(${(i % 5) * 30 - 60} ${(i * 47) % 540} ${300 + (i % 4) * 9})`} />
      ))}
      {Array.from({ length: 36 }, (_, i) => (
        <Marigold key={i} x={(i * 61) % 560} y={300 + ((i * 7) % 5) * 9} r={12 + (i % 3) * 3} dark={i % 3 ? '#e8730c' : '#e0a800'} light={i % 3 ? '#ffa726' : '#ffd23f'} />
      ))}
      <path d="M220 330 Q270 280 320 330 Z" fill="#c9962e" stroke="#7a4a0c" strokeWidth="1.5" />
      <ellipse cx="270" cy="312" rx="38" ry="9" fill="#f4b400" />
    </Scene>
  ),
  safe: SAFE,
}

const henna: Design = {
  id: 'henna',
  sky: 'radial-gradient(ellipse at 50% 35%,#1d6b55 0%,#0f4a3a 60%,#0a3328 100%)',
  colors: { title: '#f3d9a4', heading: '#f3d7b0', text: '#f1e8d6', accent: '#ffd3ab', muted: '#d2dfcf' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <svg viewBox="0 0 540 120" width="100%" style={{ display: 'block' }}>
      <path d="M0 40 Q 67 90 135 40 T 270 40 T 405 40 T 540 40" stroke="#e9b872" strokeWidth="1.6" fill="none" />
      <path d="M0 28 Q 67 78 135 28 T 270 28 T 405 28 T 540 28" stroke="#e9b872" strokeWidth="0.9" fill="none" />
      {[67, 202, 337, 472].map((x) => (
        <g key={x}>
          <Paisley x={x} y={88} s={1.2} rot={180} color="#e9b872" />
          <circle cx={x} cy={110} r="2.4" fill="#e9b872" />
        </g>
      ))}
      {Array.from({ length: 28 }, (_, i) => (
        <circle key={i} cx={i * 20 + 10} cy={10} r="2" fill="#e9b872" />
      ))}
    </svg>
  ),
  Bottom: () => (
    <Scene>
      <HalfMandala y={350} color="#e9b872" fill="#c9773a" r={190} />
      {[60, 480].map((x) => (
        <Paisley key={x} x={x} y={300} s={2} rot={x < 270 ? -20 : 20} color="#e9b872" />
      ))}
    </Scene>
  ),
  safe: { story: { top: 140, bottom: 220, x: 40 }, print: { top: 100, bottom: 155, x: 32 } },
}

const vrindavan: Design = {
  id: 'vrindavan',
  sky: 'linear-gradient(180deg,#0e2a47 0%,#1b4b6b 45%,#2f6f7d 72%,#e9a98a 100%)',
  colors: { title: '#ffd27a', heading: '#ffe3a3', text: '#eef6f4', accent: '#ffc2d1', muted: '#d4e6e6' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => <HangingVines drop="bell" leaf={['#1f4d2b', '#2e6b3a', '#3f8a4a']} cord="#e8c77e" pendant={{ a: '#e8c77e', b: '#8a6a1f' }} seed={21} />,
  Bottom: () => (
    <Scene>
      <Trees y={250} seed={8} greens={['#163d2a', '#1f5236', '#2a6a44']} />
      <Water y={262} color="#1d5566" line="#9fd3db" />
      {[70, 160, 380, 470].map((x, i) => (
        <LotusPad key={x} x={x} y={306 + (i % 2) * 14} r={30} />
      ))}
      {[110, 270, 420].map((x) => (
        <LotusBloom key={x} x={x} y={300} s={1} />
      ))}
      <PeacockFeather x={30} y={340} s={1.1} rot={18} />
      <PeacockFeather x={510} y={340} s={1.1} rot={-18} />
    </Scene>
  ),
  safe: SAFE,
}

const anandKaraj: Design = {
  id: 'anand-karaj',
  sky: 'linear-gradient(180deg,#1b2f7a 0%,#13235e 60%,#0b1640 100%)',
  colors: { title: '#f6c453', heading: '#f6c453', text: '#eef1fb', accent: '#ffa94d', muted: '#b8c2e8' },
  fonts: { title: '"Cinzel"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <TeethBand
      base="#c2255c"
      tooth="#f6c453"
      line="#ffe08a"
      h={34}
      n={18}
      pattern={(x, i) => <path key={i} d={`M${x} 8 L${x + 8} 17 L${x} 26 L${x - 8} 17 Z`} fill={i % 2 ? '#ffd43b' : '#ff922b'} />}
    />
  ),
  Bottom: () => (
    <Scene>
      <Water y={290} color="#132a6b" line="#f6c453" />
      <Gurdwara fill="#d9a520" line="#8a5a00" y={292} />
    </Scene>
  ),
  safe: { story: { top: 100, bottom: 240, x: 36 }, print: { top: 70, bottom: 192, x: 30 } },
}

const kanchipuram: Design = {
  id: 'kanchipuram',
  sky: 'repeating-linear-gradient(90deg,rgba(255,255,255,.3) 0 1px,transparent 1px 4px),linear-gradient(180deg,#fbf3df,#f1dfb6)',
  colors: { title: '#8c1c13', heading: '#7a1410', text: '#3b2410', accent: '#8f5400', muted: '#7a5a3a' },
  fonts: { title: '"Bodoni Moda"', heading: '"Bodoni Moda"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <TeethBand base="#c9962e" tooth="#8c1c13" line="#8a6414" h={20} n={24} pattern={(x, i) => <circle key={i} cx={x} cy={10} r="2.2" fill="#8c1c13" />} />
  ),
  Bottom: () => (
    <Scene>
      <Gopuram x={270} y={300} s={1.05} fill="#e3b866" line="#8a5a14" />
      {Array.from({ length: 27 }, (_, i) => (
        <circle key={i} cx={10 + i * 20} cy={318} r="2.6" fill="#8c1c13" />
      ))}
      <rect x="0" y="326" width="540" height="14" fill="#c9962e" />
      {[60, 140, 400, 480].map((x) => (
        <Diya key={x} x={x} y={300} s={1.1} />
      ))}
    </Scene>
  ),
  safe: { story: { top: 80, bottom: 260, x: 36 }, print: { top: 56, bottom: 200, x: 30 } },
}

const nikkah: Design = {
  id: 'nikkah',
  sky: 'linear-gradient(180deg,#fdfaf2,#f1e8d4)',
  colors: { title: '#8a6a1f', heading: '#0f5c4d', text: '#3a3226', accent: '#0f5c4d', muted: '#6f6350' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <svg viewBox="0 0 540 130" width="100%" style={{ display: 'block' }}>
      {[70, 160, 270, 380, 470].map((x, i) => {
        const len = 40 + (i % 2) * 30 + (i === 2 ? 20 : 0)
        return (
          <g key={x}>
            <line x1={x} y1="0" x2={x} y2={len} stroke="#a8823a" strokeWidth="1.4" />
            <g transform={`translate(${x} ${len})`}>
              <path d="M0 -2 L11 10 L9 30 L0 38 L-9 30 L-11 10 Z" fill="#e8d3a0" stroke="#a8823a" strokeWidth="1.4" />
              <path d="M-11 10 L11 10 M-9 30 L9 30 M0 -2 L0 38" stroke="#a8823a" strokeWidth="0.9" />
            </g>
          </g>
        )
      })}
    </svg>
  ),
  Overlay: ({ h }) => <ArchFrame gold="#b08a3e" inner="#0f5c4d" h={h} />,
  Bottom: () => (
    <Scene>
      <Mosque fill="#efe2c2" line="#a8823a" y={330} />
    </Scene>
  ),
  safe: { story: { top: 190, bottom: 240, x: 60 }, print: { top: 140, bottom: 172, x: 52 } },
}

const paithani: Design = {
  id: 'paithani',
  sky: 'radial-gradient(ellipse at 50% 30%,#7a2a7e 0%,#561a5a 55%,#3a0f40 100%)',
  colors: { title: '#f5c96b', heading: '#a8e6b8', text: '#f8eef8', accent: '#ffd27a', muted: '#d9bfe0' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <TeethBand base="#1f7a4d" tooth="#f5c96b" line="#f5c96b" h={36} n={16} pattern={(x, i) => <Paisley key={i} x={x} y={20} s={0.5} rot={90} color="#f5c96b" />} />
  ),
  Bottom: () => (
    <Scene>
      <Mandap fill="#f5c96b" line="#a8741a" cloth="#2e8b57" y={318} />
      {[60, 120, 420, 480].map((x) => (
        <Diya key={x} x={x} y={322} s={1} />
      ))}
      <rect x="0" y="326" width="540" height="14" fill="#1f7a4d" />
    </Scene>
  ),
  safe: { story: { top: 100, bottom: 250, x: 36 }, print: { top: 72, bottom: 220, x: 30 } },
}

const bandhani: Design = {
  id: 'bandhani',
  sky: 'radial-gradient(circle,#ffe8a3 1.6px,transparent 2.3px) 0 0/18px 18px,radial-gradient(circle,#ffffff 1.1px,transparent 1.8px) 9px 9px/18px 18px,linear-gradient(180deg,#c2132f,#8a0c22)',
  colors: { title: '#ffd34d', heading: '#fff1c7', text: '#fff6ea', accent: '#ffdc6e', muted: '#ffd9c2' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <TeethBand base="#1d5c3a" tooth="#f2b705" line="#ffe08a" h={30} n={18} pattern={(x, i) => <circle key={i} cx={x} cy={15} r="5" fill="#e8eef5" stroke="#ffe08a" strokeWidth="1.5" />} />
  ),
  Bottom: () => (
    <Scene>
      <rect x="0" y="292" width="540" height="48" fill="#1d5c3a" />
      {Array.from({ length: 18 }, (_, i) => (
        <path key={i} d={`M${i * 30} 292 L${i * 30 + 15} 272 L${(i + 1) * 30} 292 Z`} fill="#f2b705" stroke="#ffe08a" strokeWidth="1" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <Diya key={i} x={30 + i * 60} y={322} s={1} />
      ))}
    </Scene>
  ),
  safe: { story: { top: 90, bottom: 210, x: 36 }, print: { top: 64, bottom: 130, x: 30 } },
}

// Laurel sprig sweeping out from (0,0) to the right; flip mirrors it. Pointed leaves follow the stem.
function Laurel({ x, y, flip = false, color, s = 1 }: { x: number; y: number; flip?: boolean; color: string; s?: number }) {
  const P = [0, 0, 50, 6, 100, -14, 150, -56]
  const at = (t: number) => {
    const u = 1 - t
    const bx = u * u * u * P[0] + 3 * u * u * t * P[2] + 3 * u * t * t * P[4] + t * t * t * P[6]
    const by = u * u * u * P[1] + 3 * u * u * t * P[3] + 3 * u * t * t * P[5] + t * t * t * P[7]
    const dx = 3 * u * u * (P[2] - P[0]) + 6 * u * t * (P[4] - P[2]) + 3 * t * t * (P[6] - P[4])
    const dy = 3 * u * u * (P[3] - P[1]) + 6 * u * t * (P[5] - P[3]) + 3 * t * t * (P[7] - P[5])
    return [bx, by, (Math.atan2(dy, dx) * 180) / Math.PI]
  }
  const leaf = 'M0 0 C4 -5 12 -6 19 0 C12 6 4 5 0 0 Z'
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d={`M${P[0]} ${P[1]} C${P[2]} ${P[3]} ${P[4]} ${P[5]} ${P[6]} ${P[7]}`} stroke={color} strokeWidth="1.2" fill="none" />
      {Array.from({ length: 11 }, (_, i) => {
        const t = (i + 1) / 12
        const [bx, by, a] = at(t)
        const k = 1.15 - t * 0.5
        return (
          <g key={i} transform={`translate(${bx} ${by})`}>
            <path d={leaf} fill={color} transform={`rotate(${a - 38}) scale(${k})`} />
            <path d={leaf} fill={color} opacity="0.8" transform={`rotate(${a + 38}) scale(${k})`} />
            {i % 3 === 1 && <circle cx="0" cy={-9 * k} r="1.8" fill={color} />}
          </g>
        )
      })}
      <path d={leaf} fill={color} transform={`translate(${P[6]} ${P[7]}) rotate(-40) scale(0.8)`} />
    </g>
  )
}

function BananaLeaf({ x, y, s = 1, rot = 0, fill = '#3f8f3a', vein = '#2a6a28' }: { x: number; y: number; s?: number; rot?: number; fill?: string; vein?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 Q-38 -90 -6 -200 Q34 -100 0 0 Z" fill={fill} />
      <path d="M0 0 Q4 -100 -6 -198" stroke={vein} strokeWidth="1.6" fill="none" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${1 - i * 0.6} ${-18 - i * 19} l-22 -14 M${1 - i * 0.6} ${-18 - i * 19} l20 -14`} stroke={vein} strokeWidth="0.7" opacity="0.6" />
      ))}
    </g>
  )
}

const ivory: Design = {
  id: 'ivory',
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 28%,#fffdf8 0%,#f8f1e3 58%,#ebdfc6 100%)`,
  colors: { title: '#9a7426', heading: '#4f4128', text: '#3a3226', accent: '#a07a2c', muted: '#7d6c4f' },
  fonts: { title: '"Pinyon Script"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <svg viewBox="0 0 540 190" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <g transform="translate(270 104)">
        <Lace r={40} fill={foil()} />
      </g>
      {[-1, 1].map((k) => (
        <g key={k} transform={`translate(270 104) scale(${k} 1)`} fill="none" stroke={foil()} strokeLinecap="round">
          <path d="M56 0 C80 -6 120 -6 196 0" strokeWidth="1.2" />
          <path d="M56 0 C80 6 120 6 196 0" strokeWidth="0.6" />
          <path d="M70 -12 C84 -24 102 -20 100 -10 C98 -2 88 -6 92 -12" strokeWidth="1" />
          <path d="M70 12 C84 24 102 20 100 10 C98 2 88 6 92 12" strokeWidth="1" />
          <circle cx="204" cy="0" r="2.4" fill={foil()} stroke="none" />
        </g>
      ))}
    </svg>
  ),
  Overlay: ({ h }) => <LuxeFrame h={h} />,
  Bottom: () => (
    <Scene>
      <FoilDefs />
      <g transform="translate(0 230)">
        <LeafFlecks w={540} h={80} n={14} fill={foil()} seed={9} />
      </g>
      <Laurel x={262} y={296} color={foil()} flip s={1.35} />
      <Laurel x={278} y={296} color={foil()} s={1.35} />
      <g transform="translate(270 300)">
        <EdgeJewel fill={foil()} />
      </g>
    </Scene>
  ),
  safe: { story: { top: 200, bottom: 190, x: 64 }, print: { top: 150, bottom: 132, x: 54 } },
}

// Foil temple garland: scalloped band with hanging bells.
function BellGarland({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 540 120" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <rect x="0" y="0" width="540" height="22" fill={fill} />
      <rect x="0" y="22" width="540" height="6" fill="#0a2a1a" />
      {Array.from({ length: 36 }, (_, i) => (
        <circle key={i} cx={7.5 + i * 15} cy={11} r="2.2" fill="#0a2a1a" />
      ))}
      {Array.from({ length: 18 }, (_, i) => (
        <path key={i} d={`M${i * 30} 28 q15 20 30 0`} stroke={fill} strokeWidth="1.4" fill="none" />
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const x = 30 + i * 60
        const len = i % 2 ? 46 : 64
        return (
          <g key={i}>
            <path d={`M${x} 46 L${x} ${len}`} stroke={fill} strokeWidth="1" />
            <circle cx={x} cy={46} r="3" fill={fill} />
            <path d={`M${x - 9} ${len + 18} C${x - 9} ${len + 2} ${x - 5} ${len} ${x} ${len} C${x + 5} ${len} ${x + 9} ${len + 2} ${x + 9} ${len + 18} Z`} fill={fill} />
            <circle cx={x} cy={len + 22} r="2.6" fill={fill} />
          </g>
        )
      })}
    </svg>
  )
}

const nischayam: Design = {
  id: 'nischayam',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, radial-gradient(ellipse at 50% 30%,#1f5e3c 0%,#123f28 55%,#0a2a1a 100%)`,
  colors: { title: '#ecd08a', heading: '#f3dea6', text: '#efeadb', accent: '#e8c46a', muted: '#bcd2c0' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => <BellGarland fill={foil()} />,
  Overlay: ({ h }) => <LuxeFrame h={h} inset={12} jewels={false} />,
  Bottom: () => (
    <Scene>
      <FoilDefs />
      <BananaLeaf x={30} y={356} s={1.3} rot={14} fill="#0f3a24" vein={foil()} />
      <BananaLeaf x={510} y={356} s={1.3} rot={-14} fill="#0f3a24" vein={foil()} />
      <BananaLeaf x={70} y={356} s={0.95} rot={30} fill="#164a2f" vein={foil()} />
      <BananaLeaf x={470} y={356} s={0.95} rot={-30} fill="#164a2f" vein={foil()} />
      <Gopuram x={270} y={314} s={0.8} fill={foil()} line="#4a3008" />
      <rect x="0" y="318" width="540" height="22" fill={foil()} />
      {Array.from({ length: 27 }, (_, i) => (
        <path key={i} d={`M${10 + i * 20} 323 l4 6 l-4 6 l-4 -6 Z`} fill="#0a2a1a" />
      ))}
    </Scene>
  ),
  safe: { story: { top: 150, bottom: 250, x: 48 }, print: { top: 112, bottom: 192, x: 40 } },
}

/* ---------- peacock: midnight-teal velvet, gold line-art feathers ---------- */

function PeacockDefs() {
  return (
    <defs>
      <radialGradient id="pk-eye" cx="50%" cy="58%" r="55%">
        <stop offset="0" stopColor="#0a1c3f" />
        <stop offset="0.45" stopColor="#1c4f93" />
        <stop offset="1" stopColor="#0f6f6c" />
      </radialGradient>
    </defs>
  )
}

// Fine line-art peacock feather rising from (0,0) along -y: foil shaft and barbs, layered eye.
function LineFeather({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  const g = foil()
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill="none" strokeLinecap="round">
      <path d="M0 0 Q3 -70 0 -150" stroke={g} strokeWidth="1.1" />
      {Array.from({ length: 30 }, (_, i) => {
        const yy = -22 - i * 3.6
        const len = 5 + 17 * Math.sin((Math.PI * (i + 2)) / 34)
        return <path key={i} d={`M0 ${yy} q${len * 0.5} ${-len * 0.3} ${len} ${-len * 0.62} M0 ${yy} q${-len * 0.5} ${-len * 0.3} ${-len} ${-len * 0.62}`} stroke={g} strokeWidth="0.5" opacity="0.85" />
      })}
      {Array.from({ length: 22 }, (_, i) => (
        <path key={`f${i}`} d="M0 -25 L0 -33" stroke={g} strokeWidth="0.45" transform={`translate(0 -128) rotate(${i * (360 / 22)})`} />
      ))}
      <ellipse cy="-128" rx="19" ry="25" stroke={g} strokeWidth="0.7" />
      <ellipse cy="-127" rx="15" ry="20" fill="url(#pk-eye)" stroke={g} strokeWidth="1" />
      <ellipse cy="-124" rx="8" ry="11" fill={g} />
      <ellipse cy="-122" rx="4.4" ry="6.2" fill="#08182e" />
    </g>
  )
}

// Cusped jharokha arch: ogee outline with a row of small cusps along its inner edge.
function JharokhaArch({ h }: { h: number }) {
  const g = foil()
  const bez = (t: number, p: number[]) => {
    const u = 1 - t
    return [0, 1].map((k) => u * u * u * p[k] + 3 * u * u * t * p[2 + k] + 3 * u * t * t * p[4 + k] + t * t * t * p[6 + k])
  }
  const left = [[48, 260, 48, 176, 152, 156, 214, 134], [214, 134, 246, 122, 262, 106, 270, 84]]
  const cusps = left.flatMap((seg) => Array.from({ length: 7 }, (_, i) => bez((i + 0.5) / 7, seg)))
  const d = `M48 ${h - 18} L48 260 C48 176 152 156 214 134 C246 122 262 106 270 84 C278 106 294 122 326 134 C388 156 492 176 492 260 L492 ${h - 18}`
  return (
    <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <FoilDefs />
      <rect x="16" y="16" width="508" height={h - 32} stroke={g} strokeWidth="0.8" fill="none" />
      <path d={d} stroke={g} strokeWidth="2.2" fill="none" />
      <path d={d} stroke={g} strokeWidth="0.7" fill="none" transform="translate(270 0) scale(0.96 1) translate(-270 12)" />
      {[...cusps, ...cusps.map(([cx, cy]) => [540 - cx, cy])].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy + 14} r="5.5" stroke={g} strokeWidth="0.7" fill="none" />
      ))}
      <path d={`M48 ${h - 18} L492 ${h - 18}`} stroke={g} strokeWidth="1.4" />
    </svg>
  )
}

const peacock: Design = {
  id: 'peacock',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, ${VIGNETTE}, radial-gradient(ellipse at 50% 34%,#155f69 0%,#0b4249 55%,#05282e 100%)`,
  colors: { title: '#e9cd86', heading: '#f0dba4', text: '#e6f0ec', accent: '#dcbb66', muted: '#a6c6c0' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <svg viewBox="0 0 540 110" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <path d="M270 40 L270 72" stroke={foil()} strokeWidth="1" />
      <g transform="translate(270 30)">
        <Lace r={11} fill={foil()} petals={12} />
      </g>
    </svg>
  ),
  Overlay: ({ h }) => <JharokhaArch h={h} />,
  Bottom: () => (
    <Scene>
      <FoilDefs />
      <PeacockDefs />
      {[-72, -54, -36, -18, 0, 18, 36, 54, 72].map((a) => (
        <LineFeather key={a} x={270} y={352} s={1.2 - (Math.abs(a) / 72) * 0.24} rot={a} />
      ))}
    </Scene>
  ),
  safe: { story: { top: 210, bottom: 250, x: 72 }, print: { top: 170, bottom: 196, x: 60 } },
}

/* ---------- palace-night: ink navy, glowing foil palace and its reflection ---------- */

function NightDefs() {
  return (
    <defs>
      <radialGradient id="pn-glow">
        <stop offset="0" stopColor="#ffe7a6" stopOpacity="0.95" />
        <stop offset="0.4" stopColor="#f2b95a" stopOpacity="0.45" />
        <stop offset="1" stopColor="#f2b95a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="pn-halo">
        <stop offset="0" stopColor="#d9a24a" stopOpacity="0.32" />
        <stop offset="1" stopColor="#d9a24a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="pn-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0c1532" />
        <stop offset="1" stopColor="#040817" />
      </linearGradient>
    </defs>
  )
}

const PALACE_Y = 288
// Window centres matching the Palace motif's arcade and chhatri arches.
const WINDOWS: [number, number, number][] = [
  ...Array.from({ length: 20 }, (_, i) => [40 + i * 24, PALACE_Y - 12, 7] as [number, number, number]),
  ...[80, 170, 270, 370, 460].flatMap((x, i) => {
    const k = i === 2 ? 1.25 : 0.95
    return [-16, 0, 16].map((dx) => [x + dx * k, PALACE_Y - 16 * k, 6 * k] as [number, number, number])
  }),
]

function GlowPalace() {
  return (
    <g>
      <Palace fill="#0f1a3c" line={foil()} y={PALACE_Y} />
      {WINDOWS.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r * 1.6} fill="url(#pn-glow)" />
      ))}
    </g>
  )
}

// Hairline frame scattered with four-point stars, a crescent at the top centre.
function StarfieldFrame({ h }: { h: number }) {
  const g = foil()
  const star = (x: number, y: number, r: number, k: string) => (
    <path key={k} d={`M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z`} fill={g} />
  )
  const n = Math.round((h - 40) / 64)
  return (
    <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <FoilDefs />
      <rect x="20" y="20" width="500" height={h - 40} stroke={g} strokeWidth="0.6" fill="none" />
      {[
        [20, 20],
        [520, 20],
        [20, h - 20],
        [520, h - 20],
      ].map(([x, y]) => star(x, y, 9, `c${x}${y}`))}
      {Array.from({ length: n - 1 }, (_, i) => [star(20, 20 + ((i + 1) * (h - 40)) / n, 3.2, `l${i}`), star(520, 20 + ((i + 1) * (h - 40)) / n, 3.2, `r${i}`)])}
      <rect x="252" y="8" width="36" height="24" fill="#070d24" />
      <path d="M270 8 A12 12 0 1 0 270 32 A9 10.5 0 1 1 270 8 Z" fill={g} transform="translate(-2 0)" />
    </svg>
  )
}

const palaceNight: Design = {
  id: 'palace-night',
  sky: `${GRAIN_LIGHT}, radial-gradient(circle,#fbf1d2 0.7px,transparent 1.3px) 0 0/41px 37px, radial-gradient(circle,#e9dcb4 0.5px,transparent 1.1px) 17px 21px/59px 53px, radial-gradient(ellipse at 50% 100%,rgba(232,178,84,.2) 0%,rgba(232,178,84,0) 46%), linear-gradient(180deg,#050a1c 0%,#0c1634 52%,#181d42 100%)`,
  colors: { title: '#efd38e', heading: '#eedaa6', text: '#e7eaf5', accent: '#e4c06c', muted: '#a8b2d4' },
  fonts: { title: '"Pinyon Script"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <svg viewBox="0 0 540 100" width="100%" style={{ display: 'block' }}>
      <FoilDefs />
      <NightDefs />
      <path d="M36 40 Q153 92 270 46 Q387 92 504 40" stroke={foil()} strokeWidth="0.6" fill="none" />
      {Array.from({ length: 17 }, (_, i) => {
        const x = 36 + i * 29.25
        const u = ((x - 36) % 234) / 234
        const y = 40 + 6 * u + 92 * u * (1 - u) * 0.62
        return (
          <g key={i}>
            <circle cx={x} cy={y + 5} r="9" fill="url(#pn-glow)" />
            <path d={`M${x} ${y} C${x + 2.4} ${y + 3} ${x + 2.4} ${y + 7} ${x} ${y + 9} C${x - 2.4} ${y + 7} ${x - 2.4} ${y + 3} ${x} ${y} Z`} fill="#fff1c4" />
          </g>
        )
      })}
    </svg>
  ),
  Overlay: ({ h }) => <StarfieldFrame h={h} />,
  Bottom: () => (
    <Scene>
      <FoilDefs />
      <NightDefs />
      <ellipse cx="270" cy={PALACE_Y - 40} rx="300" ry="130" fill="url(#pn-halo)" />
      <rect x="0" y={PALACE_Y} width="540" height={340 - PALACE_Y} fill="url(#pn-water)" />
      <g transform={`translate(0 ${PALACE_Y * 2}) scale(1 -1)`} opacity="0.22">
        <GlowPalace />
      </g>
      {Array.from({ length: 16 }, (_, i) => {
        const x = 40 + ((i * 131) % 460)
        const y = PALACE_Y + 7 + ((i * 7) % 40)
        return <path key={i} d={`M${x} ${y} l${18 + (i % 4) * 9} 0`} stroke={foil()} strokeWidth="0.9" opacity={0.35 + (i % 3) * 0.2} />
      })}
      <GlowPalace />
      <path d={`M0 ${PALACE_Y} L540 ${PALACE_Y}`} stroke={foil()} strokeWidth="1" />
    </Scene>
  ),
  safe: { story: { top: 130, bottom: 225, x: 44 }, print: { top: 96, bottom: 168, x: 38 } },
}

/* ---------- snanam: deep turmeric silk, engraved brass kalash ---------- */

// Brass kalash with chased bands, centred on its base at (0,0).
function BrassKalash({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const g = foil()
  const ink = '#4f2604'
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-56, -30, -8, 14, 38].map((a, i) => (
        <path key={a} d="M0 0 C5 -8 6 -20 0 -30 C-6 -20 -5 -8 0 0 Z" fill="#3b4410" stroke={g} strokeWidth="0.6" transform={`translate(0 -66) rotate(${a + (i % 2 ? 4 : 0)})`} />
      ))}
      <ellipse cx="0" cy="-74" rx="12" ry="14" fill="#5e3110" />
      {[-6, 0, 6].map((dx) => (
        <path key={dx} d={`M${dx} -87 Q${dx * 1.4} -74 ${dx} -61`} stroke="#3e1f08" strokeWidth="0.6" fill="none" />
      ))}
      <path d="M-16 -58 L16 -58 L12 -50 L-12 -50 Z" fill={g} stroke={ink} strokeWidth="0.6" />
      <path d="M-12 -50 C-38 -38 -32 -6 -18 0 L18 0 C32 -6 38 -38 12 -50 Z" fill={g} stroke={ink} strokeWidth="0.8" />
      <path d="M-27 -34 Q0 -26 27 -34 M-29 -22 Q0 -14 29 -22" stroke={ink} strokeWidth="0.6" fill="none" />
      {Array.from({ length: 13 }, (_, i) => (
        <circle key={i} cx={-24 + i * 4} cy={-28 + Math.abs(6 - i) * 0.25} r="0.9" fill={ink} />
      ))}
      {[-14, 0, 14].map((dx) => (
        <path key={dx} d={`M${dx} -18 C${dx - 4} -13 ${dx - 2} -7 ${dx} -5 C${dx + 2} -7 ${dx + 4} -13 ${dx} -18 Z`} stroke={ink} strokeWidth="0.6" fill="none" />
      ))}
      <path d="M-20 0 L20 0 L24 6 L-24 6 Z" fill={g} stroke={ink} strokeWidth="0.6" />
    </g>
  )
}

function FoilLotus({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-64, -32, 0, 32, 64].map((a) => (
        <path key={a} d="M0 0 C-10 -14 -7 -30 0 -38 C7 -30 10 -14 0 0 Z" fill={Math.abs(a) > 40 ? '#b2600e' : '#c9771c'} stroke={foil()} strokeWidth="0.7" transform={`rotate(${a})`} />
      ))}
    </g>
  )
}

// Temple-border band: foil rails with inward teeth on every side.
function TempleBorder({ h }: { h: number }) {
  const g = foil()
  const t = 12
  const across = Math.round(540 / 18)
  const down = Math.round(h / 18)
  return (
    <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <FoilDefs />
      <path d={`M0 0 H540 V${h} H0 Z M${t} ${t} V${h - t} H${540 - t} V${t} Z`} fill={g} fillRule="evenodd" />
      {Array.from({ length: across }, (_, i) => {
        const x = (i * 540) / across
        const w = 540 / across
        return (
          <g key={`h${i}`}>
            <path d={`M${x} ${t} L${x + w / 2} ${t + 9} L${x + w} ${t} Z`} fill={g} />
            <path d={`M${x} ${h - t} L${x + w / 2} ${h - t - 9} L${x + w} ${h - t} Z`} fill={g} />
          </g>
        )
      })}
      {Array.from({ length: down }, (_, i) => {
        const y = (i * h) / down
        const w = h / down
        return (
          <g key={`v${i}`}>
            <path d={`M${t} ${y} L${t + 9} ${y + w / 2} L${t} ${y + w} Z`} fill={g} />
            <path d={`M${540 - t} ${y} L${540 - t - 9} ${y + w / 2} L${540 - t} ${y + w} Z`} fill={g} />
          </g>
        )
      })}
      <rect x="30" y="30" width="480" height={h - 60} stroke={g} strokeWidth="0.6" fill="none" />
    </svg>
  )
}

const snanam: Design = {
  id: 'snanam',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, ${VIGNETTE}, radial-gradient(ellipse at 50% 30%,#c4721b 0%,#a2530f 55%,#763808 100%)`,
  colors: { title: '#fae2a2', heading: '#fdeec6', text: '#fff5e4', accent: '#ffd57e', muted: '#f1cfa4' },
  fonts: { title: '"Great Vibes"', heading: '"Marcellus"', body: serif, names: '"Great Vibes"' },
  Top: () => null,
  Overlay: ({ h }) => <TempleBorder h={h} />,
  Bottom: () => (
    <Scene>
      <FoilDefs />
      <BananaLeaf x={34} y={356} s={1.15} rot={16} fill="#8a4410" vein={foil()} />
      <BananaLeaf x={506} y={356} s={1.15} rot={-16} fill="#8a4410" vein={foil()} />
      <rect x="0" y="300" width="540" height="40" fill="#6e3307" opacity="0.6" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${40 + (i % 2) * 50} ${308 + i * 5} q18 -5 36 0 t36 0 M${330 + (i % 2) * 40} ${310 + i * 5} q18 -5 36 0 t36 0`} stroke={foil()} strokeWidth="0.7" fill="none" opacity="0.7" />
      ))}
      <FoilLotus x={150} y={306} s={0.85} />
      <FoilLotus x={390} y={306} s={0.85} />
      <BrassKalash x={270} y={304} s={1.75} />
    </Scene>
  ),
  safe: { story: { top: 70, bottom: 240, x: 50 }, print: { top: 52, bottom: 180, x: 42 } },
}

export const DESIGNS: Record<string, Design> = Object.fromEntries(
  [gulabi, udaipur, kesar, marigold, henna, vrindavan, anandKaraj, kanchipuram, nikkah, paithani, bandhani, ivory, nischayam, peacock, palaceNight, snanam, ...batchA, ...batchB, ...batchC, ...batchD].map((d) => [d.id, d]),
)

