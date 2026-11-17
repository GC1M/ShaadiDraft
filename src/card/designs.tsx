import type { FC, ReactNode } from 'react'
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

export interface Design {
  id: string
  sky: string // CSS background of the whole card
  colors: { title: string; heading: string; text: string; accent: string; muted: string }
  fonts: { title: string; heading: string; body: string; names: string } // Latin faces
  Top: FC // full-width top decoration, natural height
  Bottom: FC // 540 x 340 scene anchored to the bottom (print crops its sky)
  Overlay?: FC<{ h: number }> // full-card frame, h in 540-wide units
  // Text safe area in px, per format (story 540x960, print 450x630).
  safe: { story: Box; print: Box }
}
type Box = { top: number; bottom: number; x: number }

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

export const DESIGNS: Record<string, Design> = Object.fromEntries(
  [gulabi, udaipur, kesar, marigold, henna, vrindavan, anandKaraj, kanchipuram, nikkah, paithani, bandhani].map((d) => [d.id, d]),
)

