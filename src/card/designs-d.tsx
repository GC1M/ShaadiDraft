// Batch D: regional wedding cards (Bengali, Kerala, Telugu, Jain, Christian, Parsi, Kashmiri).
// Each card has one hero motif and a frame specific to its region; everything else stays quiet.
import type { ReactNode } from 'react'
import type { Design } from './designs'
import type { Template } from '../templates'
import { FoilDefs, GRAIN, GRAIN_LIGHT, LuxeFrame, SHEEN, VIGNETTE, foil } from './luxe'
import { Mandap, Mountains, Water } from './motifs'

const serif = '"Cormorant Garamond", Georgia, serif'

const Scene = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 540 340" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" style={{ display: 'block' }}>
    <FoilDefs />
    {children}
  </svg>
)

const TopSvg = ({ h, children }: { h: number; children: ReactNode }) => (
  <svg viewBox={`0 0 540 ${h}`} width="100%" style={{ display: 'block' }}>
    <FoilDefs />
    {children}
  </svg>
)

const FrameSvg = ({ h, children }: { h: number; children: ReactNode }) => (
  <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    <FoilDefs />
    {children}
  </svg>
)

/* ---------------- hero motifs ---------------- */

// Bengali topor: tall conical sola-pith crown with cut-work.
function Topor({ x, y, s = 1, fill, line, jewel }: { x: number; y: number; s?: number; fill: string; line: string; jewel: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0 L-14 -96 Q0 -112 14 -96 L30 0 Z" fill={fill} stroke={line} strokeWidth="1.3" />
      <path d="M-24 -4 L-11 -90 M24 -4 L11 -90" stroke={line} strokeWidth="0.5" opacity="0.7" />
      <path d="M-34 0 Q0 10 34 0 L30 -10 Q0 -2 -30 -10 Z" fill={line} />
      {[-74, -60, -46, -32, -18].map((yy, i) => (
        <path key={yy} d={`M${-12 - i * 3} ${yy} Q0 ${yy - 9} ${12 + i * 3} ${yy}`} stroke={line} strokeWidth="0.8" fill="none" />
      ))}
      {[-21, -13, -5, 3, 11, 19].map((dx) => (
        <path key={dx} d={`M${dx - 3} -13 l3 -6 l3 6`} fill="none" stroke={line} strokeWidth="0.7" />
      ))}
      <circle cy="-46" r="5.5" fill={jewel} stroke={line} strokeWidth="1" />
      <circle cy="-46" r="9" fill="none" stroke={line} strokeWidth="0.6" />
      <path d="M0 -104 L0 -124" stroke={line} strokeWidth="1.4" />
      <path d="M-6 -118 Q0 -128 6 -118 Q0 -112 -6 -118 Z" fill={line} />
      <circle cy="-128" r="2.6" fill={jewel} />
    </g>
  )
}

// Alpana half-lotus in rice-paste lines, rising from the bottom edge.
function AlpanaLotus({ y = 340, r = 150, color, sw = 1 }: { y?: number; r?: number; color: string; sw?: number }) {
  return (
    <g transform={`translate(270 ${y})`} fill="none" stroke={color} strokeLinecap="round">
      {[1, 0.74, 0.5].map((k, ring) => {
        const rr = r * k
        const n = 15 - ring * 4
        return (
          <g key={k}>
            {Array.from({ length: n }, (_, i) => {
              const a = (-180 + (180 / (n - 1)) * i) * (Math.PI / 180)
              const deg = (a * 180) / Math.PI + 90
              return (
                <g key={i} transform={`translate(${Math.cos(a) * rr * 0.82} ${Math.sin(a) * rr * 0.82}) rotate(${deg})`}>
                  <path d="M0 0 Q-11 -16 0 -32 Q11 -16 0 0 Z" strokeWidth={sw} />
                  <path d="M0 -6 Q-5 -16 0 -25 Q5 -16 0 -6" strokeWidth={sw * 0.6} />
                </g>
              )
            })}
            <path d={`M${-rr * 0.7} 0 A${rr * 0.7} ${rr * 0.7} 0 0 1 ${rr * 0.7} 0`} strokeWidth={sw} strokeDasharray="0.1 5" />
          </g>
        )
      })}
      <circle r={r * 0.22} strokeWidth={sw} />
      <circle r={r * 0.17} strokeWidth={sw * 0.6} />
    </g>
  )
}

// Kerala nilavilakku: brass standing lamp with five wicks.
function Nilavilakku({ x, y, s = 1, brass, line }: { x: number; y: number; s?: number; brass: string; line: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={line} strokeWidth="0.9">
      <path d="M-40 0 Q0 -18 40 0 Z" fill={brass} />
      <path d="M-28 -4 Q0 -14 28 -4" fill="none" strokeWidth="0.5" />
      <path d="M-6 -10 L-4 -120 L4 -120 L6 -10 Z" fill={brass} />
      {[-30, -55, -80, -105].map((yy) => (
        <g key={yy}>
          <ellipse cy={yy} rx="10" ry="3.5" fill={brass} />
          <ellipse cy={yy - 5} rx="6" ry="2" fill={brass} strokeWidth="0.5" />
        </g>
      ))}
      <path d="M-34 -122 Q0 -104 34 -122 Q0 -130 -34 -122 Z" fill={brass} />
      <path d="M-6 -126 L0 -150 L6 -126 Z" fill={brass} />
      <circle cy="-152" r="4" fill={brass} />
      {[-28, -14, 0, 14, 28].map((dx) => (
        <g key={dx} stroke="none">
          <ellipse cx={dx} cy={-132} rx="3.2" ry="8.5" fill="#efa23c" />
          <ellipse cx={dx} cy={-130} rx="1.5" ry="4.6" fill="#fff3cf" />
        </g>
      ))}
    </g>
  )
}

// Hanging string of pointed mango leaves (thoranam), spanning x0..x1.
function MangoToran({ x0, x1, thread, leaf, vein, dot }: { x0: number; x1: number; thread: string; leaf: string; vein: string; dot: string }) {
  const n = 15
  const span = x1 - x0
  return (
    <TopSvg h={100}>
      <path d={`M${x0} 12 Q270 34 ${x1} 12`} stroke={thread} strokeWidth="1.6" fill="none" />
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + (i * span) / (n - 1)
        const u = (x - x0) / span
        const top = 12 + 44 * u * (1 - u)
        const len = i % 2 ? 40 : 52
        return (
          <g key={i}>
            <path d={`M${x} ${top} Q${x - 9} ${top + len * 0.45} ${x} ${top + len} Q${x + 9} ${top + len * 0.45} ${x} ${top} Z`} fill={leaf} />
            <path d={`M${x} ${top + 2} L${x} ${top + len - 3}`} stroke={vein} strokeWidth="0.7" />
            {i % 2 === 0 && <circle cx={x} cy={top} r="2.4" fill={dot} />}
          </g>
        )
      })}
    </TopSvg>
  )
}

// Nagara-style temple shikhar with an amalaka and pennant.
function Shikhar({ x = 270, y = 300, s = 1, stone, line, flag }: { x?: number; y?: number; s?: number; stone: string; line: string; flag: string }) {
  const tower = (cx: number, w: number, h: number, key: string) => (
    <g key={key}>
      <path d={`M${cx - w} 0 L${cx - w} ${-h * 0.35} Q${cx - w * 0.95} ${-h * 0.8} ${cx} ${-h} Q${cx + w * 0.95} ${-h * 0.8} ${cx + w} ${-h * 0.35} L${cx + w} 0 Z`} fill={stone} stroke={line} strokeWidth="1.1" />
      {Array.from({ length: 7 }, (_, i) => {
        const yy = -h * 0.35 - i * h * 0.085
        const ww = w * (1 - i * 0.1)
        return <path key={i} d={`M${cx - ww} ${yy} L${cx + ww} ${yy}`} stroke={line} strokeWidth="0.5" />
      })}
      {[-0.5, 0, 0.5].map((k) => (
        <path key={k} d={`M${cx + w * k} 0 L${cx + w * k * 0.6} ${-h * 0.35} Q${cx + w * k * 0.4} ${-h * 0.75} ${cx} ${-h}`} stroke={line} strokeWidth="0.5" fill="none" />
      ))}
      <ellipse cx={cx} cy={-h - 4} rx={w * 0.35} ry="5" fill={stone} stroke={line} strokeWidth="1" />
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-120" y="-12" width="240" height="12" fill={stone} stroke={line} strokeWidth="1" />
      <rect x="-104" y="-24" width="208" height="12" fill={stone} stroke={line} strokeWidth="1" />
      {tower(-78, 26, 90, 'l')}
      {tower(78, 26, 90, 'r')}
      {tower(0, 52, 180, 'c')}
      <path d="M-14 -24 L-14 -62 Q0 -78 14 -62 L14 -24 Z" fill={line} opacity="0.85" />
      <path d="M0 -188 L0 -214" stroke={line} strokeWidth="1.6" />
      <path d="M-6 -188 Q0 -198 6 -188 Z" fill={line} />
      <path d="M0 -214 L30 -207 L0 -200 Z" fill={flag} />
    </g>
  )
}

/* Ashtamangala marks, each in a ~40px box at (0,0). */
function PurnaKalash({ c }: { c: string }) {
  return (
    <g fill="none" stroke={c} strokeWidth="1.1">
      <path d="M-14 -6 Q-20 10 -8 16 L8 16 Q20 10 14 -6 Z" />
      <path d="M-10 -6 L-8 -12 L8 -12 L10 -6" />
      <path d="M0 -12 Q-10 -24 -14 -20 M0 -12 Q10 -24 14 -20 M0 -12 L0 -24" />
      <circle cy="-26" r="2.6" fill={c} stroke="none" />
    </g>
  )
}
function FishPair({ c }: { c: string }) {
  const fish = (flip: number) => (
    <g transform={`scale(${flip} 1) translate(-2 0)`}>
      <path d="M0 -16 Q-12 -4 -6 12 L-10 20 L0 16 L10 20 L6 12 Q12 -4 0 -16 Z" transform="translate(-9 0) rotate(-12)" />
    </g>
  )
  return (
    <g fill="none" stroke={c} strokeWidth="1.1">
      {fish(1)}
      {fish(-1)}
    </g>
  )
}
function Mirror({ c }: { c: string }) {
  return (
    <g fill="none" stroke={c} strokeWidth="1.1">
      <circle cy="-6" r="13" />
      <circle cy="-6" r="8" strokeWidth="0.6" />
      <path d="M-3 7 L-4 20 L4 20 L3 7" />
    </g>
  )
}

function Dove({ x, y, s = 1, flip = false, body, line }: { x: number; y: number; s?: number; flip?: boolean; body: string; line: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} stroke={line} strokeWidth="0.9">
      <path d="M-22 4 L-34 -2 L-32 8 Z" fill={body} />
      <path d="M-24 4 Q-10 14 10 6 Q20 2 22 -6 Q16 -12 10 -8 Q-4 -2 -24 4 Z" fill={body} />
      <path d="M-8 2 Q-14 -24 6 -34 Q4 -16 6 -2 Z" fill={body} />
      <path d="M-4 -6 Q-6 -20 4 -28 M0 -4 Q0 -16 5 -22" fill="none" strokeWidth="0.5" />
      <path d="M22 -6 L28 -4 L22 -2" fill={line} />
      <circle cx="16" cy="-6" r="1.1" fill={line} stroke="none" />
    </g>
  )
}

function Lily({ x, y, s = 1, rot = 0, petal, line, stem }: { x: number; y: number; s?: number; rot?: number; petal: string; line: string; stem: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 Q4 -50 0 -100" stroke={stem} strokeWidth="1.4" fill="none" />
      <path d="M0 -20 Q-26 -40 -20 -70 Q-8 -46 0 -30" fill={stem} />
      <path d="M2 -40 Q26 -56 22 -84 Q10 -62 2 -50" fill={stem} />
      {[-50, -20, 20, 50, 0].map((a) => (
        <path key={a} d="M0 0 Q-9 -16 0 -34 Q9 -16 0 0 Z" transform={`translate(0 -100) rotate(${a})`} fill={petal} stroke={line} strokeWidth="0.8" />
      ))}
      {[-12, 0, 12].map((a) => (
        <path key={a} d="M0 0 L0 -18" transform={`translate(0 -100) rotate(${a})`} stroke={line} strokeWidth="0.8" />
      ))}
    </g>
  )
}

function Chapel({ x = 270, y = 300, fill, line, roof, glass }: { x?: number; y?: number; fill: string; line: string; roof: string; glass: string }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={line} strokeWidth="1">
      <rect x="-70" y="-80" width="140" height="80" fill={fill} />
      <path d="M-80 -78 L0 -130 L80 -78 Z" fill={roof} />
      <circle cy="-96" r="12" fill={glass} />
      {[0, 45, 90, 135].map((a) => (
        <path key={a} d="M-12 0 L12 0" transform={`translate(0 -96) rotate(${a})`} strokeWidth="0.6" />
      ))}
      <path d="M-16 0 L-16 -40 Q0 -58 16 -40 L16 0 Z" fill={roof} />
      <path d="M0 0 L0 -50" strokeWidth="0.6" />
      {[-48, 48].map((dx) => (
        <path key={dx} d={`M${dx - 8} -26 L${dx - 8} -50 Q${dx} -60 ${dx + 8} -50 L${dx + 8} -26 Z`} fill={glass} />
      ))}
      <rect x="70" y="-150" width="44" height="150" fill={fill} />
      <path d="M78 -112 L78 -132 Q92 -146 106 -132 L106 -112 Z" fill={roof} />
      <path d="M86 -120 Q92 -132 98 -120 L96 -116 L88 -116 Z" fill={line} />
      <path d="M66 -150 L118 -150 L92 -210 Z" fill={roof} />
      <path d="M92 -210 L92 -232 M84 -224 L100 -224" strokeWidth="1.6" />
      {[-30, -60].map((yy) => (
        <path key={yy} d={`M86 ${yy} L86 ${yy - 16} Q92 ${yy - 22} 98 ${yy - 16} L98 ${yy} Z`} fill={glass} />
      ))}
    </g>
  )
}

// Chalk rangoli: dotted strokes, as if poured from a tin stencil.
const CHALK = { fill: 'none', stroke: '#fffdf8', strokeWidth: 2.3, strokeDasharray: '0.1 4.2', strokeLinecap: 'round' as const }

function ChalkFish({ x, y, s = 1, flip = false, eye }: { x: number; y: number; s?: number; flip?: boolean; eye: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M-18 0 Q-4 -12 14 0 Q-4 12 -18 0 Z M14 0 L24 -8 L22 0 L24 8 Z" {...CHALK} />
      <path d="M-4 -6 Q-1 0 -4 6 M2 -6 Q5 0 2 6" {...CHALK} strokeWidth={1.6} />
      <circle cx="-10" cy="-1" r="1.8" fill={eye} />
    </g>
  )
}

function ChinarLeaf({ x, y, s = 1, rot = 0, fill, vein }: { x: number; y: number; s?: number; rot?: number; fill: string; vein: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 4 L-3 -4 L-14 -6 L-9 -11 L-16 -21 L-6 -18 L-5 -28 L0 -21 L5 -28 L6 -18 L16 -21 L9 -11 L14 -6 L3 -4 Z" fill={fill} />
      <path d="M0 6 L0 -20 M0 -6 L-10 -16 M0 -6 L10 -16 M0 -2 L-12 -6 M0 -2 L12 -6" stroke={vein} strokeWidth="0.5" />
    </g>
  )
}

function Shikara({ x, y, s = 1, hull, canopy, line }: { x: number; y: number; s?: number; hull: string; canopy: string; line: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-70 -10 Q-40 6 0 6 Q40 6 74 -14 L66 0 Q30 14 -60 4 Z" fill={hull} stroke={line} strokeWidth="0.7" />
      <path d="M-62 -4 Q0 8 66 -8" stroke={line} strokeWidth="0.5" fill="none" />
      <rect x="-30" y="-30" width="54" height="22" fill={canopy} stroke={line} strokeWidth="0.8" />
      <path d="M-34 -30 Q-3 -42 28 -30 Z" fill={canopy} stroke={line} strokeWidth="0.8" />
      {[-24, -10, 4, 18].map((dx) => (
        <path key={dx} d={`M${dx} -28 L${dx} -10`} stroke={line} strokeWidth="0.6" />
      ))}
      <path d="M-30 -14 L24 -14" stroke={line} strokeWidth="0.5" />
      <path d="M40 -4 L60 -40" stroke={line} strokeWidth="1.2" />
      <path d="M58 -40 L62 -40 L64 -30 L56 -30 Z" fill={line} />
    </g>
  )
}

/* ---------------- designs ---------------- */

// Bengali: sindoor red, ivory alpana lace edge, one tall topor as hero.
const SH_IVORY = '#fbf1e1'
const shubho: Design = {
  id: 'shubho',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, ${VIGNETTE}, radial-gradient(ellipse at 50% 30%,#a01526 0%,#7c0d1b 55%,#4e0710 100%)`,
  colors: { title: '#f7e6c0', heading: '#efd394', text: '#fcf1e4', accent: '#eacb7a', muted: '#e8c6bf' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => null,
  Overlay: ({ h }) => {
    const nx = 20
    const ny = Math.round((h - 60) / 24)
    const sy = (h - 60) / ny
    return (
      <FrameSvg h={h}>
        <g fill="none" stroke={SH_IVORY} strokeWidth="1" strokeLinecap="round">
          <rect x="22" y="22" width="496" height={h - 44} />
          {Array.from({ length: nx }, (_, i) => {
            const x = 30 + i * 24
            return (
              <g key={i}>
                <path d={`M${x} 22 q12 14 24 0 M${x + 6} 22 q6 7 12 0`} />
                <path d={`M${x} ${h - 22} q12 -14 24 0 M${x + 6} ${h - 22} q6 -7 12 0`} />
                <circle cx={x + 12} cy={40} r="1.3" fill={SH_IVORY} stroke="none" />
                <circle cx={x + 12} cy={h - 40} r="1.3" fill={SH_IVORY} stroke="none" />
              </g>
            )
          })}
          {Array.from({ length: ny }, (_, i) => {
            const y = 30 + i * sy
            return (
              <g key={i}>
                <path d={`M22 ${y} q14 ${sy / 2} 0 ${sy} M22 ${y + sy / 4} q7 ${sy / 4} 0 ${sy / 2}`} />
                <path d={`M518 ${y} q-14 ${sy / 2} 0 ${sy} M518 ${y + sy / 4} q-7 ${sy / 4} 0 ${sy / 2}`} />
                <circle cx={40} cy={y + sy / 2} r="1.3" fill={SH_IVORY} stroke="none" />
                <circle cx={500} cy={y + sy / 2} r="1.3" fill={SH_IVORY} stroke="none" />
              </g>
            )
          })}
          {[
            [22, 22],
            [518, 22],
            [22, h - 22],
            [518, h - 22],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
              <circle r="11" fill="#7c0d1b" />
              {Array.from({ length: 8 }, (_, i) => (
                <path key={i} d="M0 -3 Q-4 -8 0 -13 Q4 -8 0 -3 Z" transform={`rotate(${i * 45})`} />
              ))}
              <circle r="2" fill={SH_IVORY} stroke="none" />
            </g>
          ))}
        </g>
        <rect x="48" y="48" width="444" height={h - 96} stroke={foil()} strokeWidth="0.8" fill="none" />
      </FrameSvg>
    )
  },
  Bottom: () => (
    <Scene>
      <AlpanaLotus y={348} r={172} color={SH_IVORY} sw={0.9} />
      <Topor x={270} y={322} s={1.45} fill="#fdf6ea" line={foil()} jewel="#8e0f20" />
    </Scene>
  ),
  safe: { story: { top: 110, bottom: 235, x: 60 }, print: { top: 84, bottom: 186, x: 50 } },
}

// Kerala: ivory handloom, kasavu zari bands on the edges, the nilavilakku as hero.
const KA_ZARI = foil()
const KA_LINE = '#7d2414'
function ZariBand({ x, y, w, h, vertical = false }: { x: number; y: number; w: number; h: number; vertical?: boolean }) {
  const n = Math.floor((vertical ? h : w) / 9)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={KA_ZARI} />
      {Array.from({ length: n }, (_, i) =>
        vertical ? (
          <path key={i} d={`M${x + w / 2} ${y + 4 + i * 9} l3 3 l-3 3 l-3 -3 Z`} fill="#fbf3df" opacity="0.55" />
        ) : (
          <path key={i} d={`M${x + 4 + i * 9} ${y + h / 2} l3 -3 l3 3 l-3 3 Z`} fill="#fbf3df" opacity="0.55" />
        ),
      )}
    </g>
  )
}
const kasavu: Design = {
  id: 'kasavu',
  sky: `${GRAIN}, ${SHEEN}, linear-gradient(180deg,#fdfaf2 0%,#f6efdd 65%,#ede2c6 100%)`,
  colors: { title: '#8f6b1f', heading: '#5b3c10', text: '#3c2b16', accent: '#9a6f22', muted: '#7d6847' },
  fonts: { title: '"Great Vibes"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <TopSvg h={52}>
      <ZariBand x={0} y={8} w={540} h={24} />
      <path d="M0 38 L540 38" stroke={KA_LINE} strokeWidth="1.2" />
      <path d="M0 44 L540 44" stroke={KA_ZARI} strokeWidth="0.6" />
    </TopSvg>
  ),
  Overlay: ({ h }) => (
    <FrameSvg h={h}>
      {[8, 514].map((x) => (
        <ZariBand key={x} x={x} y={0} w={18} h={h} vertical />
      ))}
      <path d={`M32 0 L32 ${h} M508 0 L508 ${h}`} stroke={KA_LINE} strokeWidth="1.1" />
      <path d={`M37 0 L37 ${h} M503 0 L503 ${h}`} stroke={KA_ZARI} strokeWidth="0.5" />
    </FrameSvg>
  ),
  Bottom: () => (
    <Scene>
      <defs>
        <radialGradient id="kasavu-glow">
          <stop offset="0" stopColor="#ffd98a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="270" cy="142" r="96" fill="url(#kasavu-glow)" />
      <Nilavilakku x={270} y={314} s={1.32} brass={KA_ZARI} line="#6b4810" />
      <path d="M0 312 L540 312" stroke={KA_ZARI} strokeWidth="0.5" />
      <path d="M0 317 L540 317" stroke={KA_LINE} strokeWidth="1.1" />
      <ZariBand x={0} y={322} w={540} h={18} />
    </Scene>
  ),
  safe: { story: { top: 92, bottom: 250, x: 52 }, print: { top: 70, bottom: 198, x: 44 } },
}

// Telugu: deep turmeric with kumkum, mango thoranam, the kalyana mandapam as hero.
const PE_KUMKUM = '#7d0f14'
const pelli: Design = {
  id: 'pelli',
  sky: `${GRAIN}, ${SHEEN}, ${VIGNETTE}, radial-gradient(ellipse at 50% 34%,#d49a2a 0%,#b67c14 55%,#7a5006 100%)`,
  colors: { title: '#5e0d10', heading: '#4a0a0c', text: '#2a1206', accent: PE_KUMKUM, muted: '#4e3010' },
  fonts: { title: '"Great Vibes"', heading: '"Marcellus"', body: serif, names: '"Great Vibes"' },
  Top: () => <MangoToran x0={92} x1={448} thread={foil()} leaf="#3d4613" vein={foil()} dot={PE_KUMKUM} />,
  Overlay: ({ h }) => <LuxeFrame h={h} inset={14} jewels={false} />,
  Bottom: () => (
    <Scene>
      <Mandap fill={foil()} line="#4a2c04" cloth={PE_KUMKUM} y={316} />
      <rect x="0" y="322" width="540" height="18" fill={PE_KUMKUM} />
      {Array.from({ length: 27 }, (_, i) => (
        <path key={i} d={`M${10 + i * 20} 326 l4 5 l-4 5 l-4 -5 Z`} fill={foil()} />
      ))}
    </Scene>
  ),
  safe: { story: { top: 120, bottom: 272, x: 56 }, print: { top: 90, bottom: 215, x: 46 } },
}

// Jain: pearl and saffron, cusped temple arch, the marble shikhar as hero.
const JA_SAFFRON = '#e07a1a'
function cuspedArch(cx: number, cy: number, r: number, x: number, h: number, n = 13) {
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = Math.PI - (Math.PI * i) / n
    return [cx + r * Math.cos(t), cy - r * Math.sin(t)]
  })
  const chord = 2 * r * Math.sin(Math.PI / (2 * n))
  const arcs = pts
    .slice(1)
    .map(([px, py]) => `A${chord * 0.62} ${chord * 0.62} 0 0 1 ${px.toFixed(1)} ${py.toFixed(1)}`)
    .join(' ')
  return `M${x} ${h} L${x} ${cy} ${arcs} L${540 - x} ${h}`
}
const jainLagna: Design = {
  id: 'jain-lagna',
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 30%,#fffdf9 0%,#fbf3e6 60%,#f1dfc0 100%)`,
  colors: { title: '#b0500c', heading: '#74360a', text: '#3d2a16', accent: '#c45f0e', muted: '#7b5d3e' },
  fonts: { title: '"Cinzel"', heading: '"Cinzel"', body: serif, names: '"Great Vibes"' },
  Top: () => (
    <TopSvg h={124}>
      {[
        [212, <FishPair key="f" c={foil()} />],
        [270, <PurnaKalash key="k" c={foil()} />],
        [328, <Mirror key="m" c={foil()} />],
      ].map(([x, el]) => (
        <g key={x as number} transform={`translate(${x} 96) scale(0.8)`}>
          {el}
        </g>
      ))}
    </TopSvg>
  ),
  Overlay: ({ h }) => (
    <FrameSvg h={h}>
      <path d={cuspedArch(270, 250, 228, 42, h - 26)} stroke={foil()} strokeWidth="2" fill="none" />
      <path d={cuspedArch(270, 250, 216, 54, h - 34)} stroke={foil()} strokeWidth="0.7" fill="none" />
      <path d={cuspedArch(270, 250, 208, 62, h - 40, 26)} stroke={JA_SAFFRON} strokeWidth="0.6" fill="none" opacity="0.8" />
      <path d={`M30 ${h - 26} L510 ${h - 26}`} stroke={foil()} strokeWidth="2" />
    </FrameSvg>
  ),
  Bottom: () => (
    <Scene>
      <Shikhar x={270} y={314} s={0.92} stone="#fffbf4" line={foil()} flag={JA_SAFFRON} />
      <path d="M60 318 L480 318" stroke={JA_SAFFRON} strokeWidth="0.8" />
    </Scene>
  ),
  safe: { story: { top: 172, bottom: 250, x: 66 }, print: { top: 142, bottom: 200, x: 56 } },
}

// Christian: ivory and sage, silver gothic lancet arch, the chapel bell tower as hero.
const CH_SAGE = '#8ea585'
const chapel: Design = {
  id: 'chapel',
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 30%,#fdfdfa 0%,#f2f4ec 60%,#dde5d3 100%)`,
  colors: { title: '#475c43', heading: '#36472f', text: '#2c3529', accent: '#66805f', muted: '#66745f' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <TopSvg h={140}>
      <Dove x={248} y={118} s={0.8} body="#fffefa" line={foil('silver')} />
      <Dove x={292} y={118} s={0.8} flip body="#fffefa" line={foil('silver')} />
    </TopSvg>
  ),
  Overlay: ({ h }) => (
    <FrameSvg h={h}>
      <path d={`M40 ${h - 30} L40 250 Q40 64 270 26 Q500 64 500 250 L500 ${h - 30} Z`} stroke={foil('silver')} strokeWidth="2" fill="none" />
      <path d={`M50 ${h - 38} L50 252 Q50 76 270 40 Q490 76 490 252 L490 ${h - 38} Z`} stroke={foil('silver')} strokeWidth="0.7" fill="none" />
      <path d={`M60 ${h - 46} L60 254 Q60 88 270 54 Q480 88 480 254 L480 ${h - 46} Z`} stroke={CH_SAGE} strokeWidth="0.6" fill="none" />
      <g transform="translate(270 76)" fill="none" stroke={foil('silver')} strokeWidth="0.9">
        {[0, 90, 180, 270].map((a) => (
          <circle key={a} cx="0" cy="-5" r="5" transform={`rotate(${a})`} />
        ))}
      </g>
    </FrameSvg>
  ),
  Bottom: () => (
    <Scene>
      <path d="M60 300 Q270 262 480 300 L480 310 L60 310 Z" fill="#d6e0cc" />
      <Chapel x={251} y={302} fill="#fffefa" line={foil('silver')} roof="#dbe4d2" glass="#eef1ea" />
      <Lily x={110} y={312} s={0.75} rot={-6} petal="#fffefa" line={foil('silver')} stem={CH_SAGE} />
      <Lily x={430} y={312} s={0.75} rot={6} petal="#fffefa" line={foil('silver')} stem={CH_SAGE} />
      <path d="M60 310 L480 310" stroke={foil('silver')} strokeWidth="1.2" />
    </Scene>
  ),
  safe: { story: { top: 186, bottom: 250, x: 68 }, print: { top: 155, bottom: 200, x: 57 } },
}

// Parsi: blush-lilac-mint pastels, chalk-white rangoli edge, a chalk rangoli medallion as hero.
const PA_GOLD = foil()
const parsiLagan: Design = {
  id: 'parsi-lagan',
  sky: `${GRAIN}, linear-gradient(180deg,#ebc6d1 0%,#dac8e2 50%,#c4dcd2 100%)`,
  colors: { title: '#5d3f6e', heading: '#3f5753', text: '#352d3c', accent: '#93506f', muted: '#5f566a' },
  fonts: { title: '"Pinyon Script"', heading: '"Cinzel"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <TopSvg h={110}>
      {Array.from({ length: 6 }, (_, k) => {
        const x0 = 45 + k * 75
        return (
          <g key={k}>
            <path d={`M${x0} 34 Q${x0 + 37.5} 70 ${x0 + 75} 34`} {...CHALK} />
            {k % 2 === 0 && <ChalkFish x={x0 + 37.5 + 75 / 2} y={60} s={0.75} flip={k % 4 === 0} eye={PA_GOLD} />}
          </g>
        )
      })}
    </TopSvg>
  ),
  Overlay: ({ h }) => (
    <FrameSvg h={h}>
      <rect x="20" y="20" width="500" height={h - 40} rx="26" {...CHALK} />
      <rect x="27" y="27" width="486" height={h - 54} rx="21" {...CHALK} strokeWidth={1.4} strokeDasharray="0.1 3" />
      <rect x="36" y="36" width="468" height={h - 72} rx="16" stroke={PA_GOLD} strokeWidth="0.8" fill="none" />
    </FrameSvg>
  ),
  Bottom: () => (
    <Scene>
      <g transform="translate(270 344)">
        <path d="M-150 0 A150 150 0 0 1 150 0 Z" fill="#fbf3f6" opacity="0.55" />
        {[150, 118, 86].map((r) => (
          <path key={r} d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0`} {...CHALK} />
        ))}
        {Array.from({ length: 11 }, (_, i) => {
          const a = 180 + (180 / 10) * i
          return <path key={`p${i}`} d="M0 0 Q-10 -16 0 -30 Q10 -16 0 0 Z" {...CHALK} fill={i % 2 ? '#b46f8e' : '#8a6aa6'} strokeWidth={1.9} transform={`rotate(${a + 90}) translate(0 -88)`} />
        })}
        {Array.from({ length: 7 }, (_, i) => {
          const a = 180 + (180 / 6) * i
          return <path key={`q${i}`} d="M0 0 Q-8 -12 0 -24 Q8 -12 0 0 Z" {...CHALK} fill="#6f9c8c" strokeWidth={1.9} transform={`rotate(${a + 90}) translate(0 -56)`} />
        })}
        <circle r="34" fill={PA_GOLD} />
        <circle r="28" fill="none" stroke="#fffdf8" strokeWidth="0.8" />
      </g>
      <ChalkFish x={112} y={318} s={1.2} eye={PA_GOLD} />
      <ChalkFish x={428} y={318} s={1.2} flip eye={PA_GOLD} />
    </Scene>
  ),
  safe: { story: { top: 120, bottom: 190, x: 58 }, print: { top: 92, bottom: 150, x: 48 } },
}

// Kashmiri: walnut wood, shawl-jaal border, a shikara on Dal lake as hero.
const KS_RUST = '#a2442a'
const KS_SAFFRON = '#d38a36'
const chinar: Design = {
  id: 'chinar',
  sky: `${GRAIN_LIGHT}, ${SHEEN}, ${VIGNETTE}, radial-gradient(ellipse at 50% 30%,#5b3b27 0%,#3f2719 55%,#24150c 100%)`,
  colors: { title: '#efc888', heading: '#f2dbb0', text: '#f4e9dc', accent: '#e0954e', muted: '#d3bca3' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  Top: () => (
    <TopSvg h={130}>
      {[1, -1].map((k) => (
        <g key={k} transform={k < 0 ? 'translate(540 0) scale(-1 1)' : undefined}>
          <ChinarLeaf x={44} y={52} s={1.5} rot={-30} fill={KS_RUST} vein="#3f2719" />
          <ChinarLeaf x={82} y={78} s={1.05} rot={20} fill={foil()} vein="#3f2719" />
          <ChinarLeaf x={52} y={104} s={0.8} rot={-10} fill={KS_SAFFRON} vein="#3f2719" />
        </g>
      ))}
    </TopSvg>
  ),
  Overlay: ({ h }) => {
    const zig = (x0: number, x1: number, y0: number, y1: number, n: number) =>
      Array.from({ length: n + 1 }, (_, i) => `${i % 2 ? x1 : x0} ${y0 + ((y1 - y0) * i) / n}`).join(' L')
    const nv = Math.round((h - 48) / 10)
    return (
      <FrameSvg h={h}>
        <rect x="14" y="14" width="512" height={h - 28} stroke={foil()} strokeWidth="1.4" fill="none" />
        <rect x="32" y="32" width="476" height={h - 64} stroke={foil()} strokeWidth="0.8" fill="none" />
        <g stroke={foil()} strokeWidth="0.6" fill="none">
          <path d={`M${zig(18, 28, 24, h - 24, nv)}`} />
          <path d={`M${zig(512, 522, 24, h - 24, nv)}`} />
          <path d={`M${zig(28, 18, 24, h - 24, nv)}`} />
          <path d={`M${zig(522, 512, 24, h - 24, nv)}`} />
          <path d={`M24 18 L${Array.from({ length: 50 }, (_, i) => `${24 + (i + 1) * 9.84} ${i % 2 ? 18 : 28}`).join(' L')}`} />
          <path d={`M24 ${h - 18} L${Array.from({ length: 50 }, (_, i) => `${24 + (i + 1) * 9.84} ${h - (i % 2 ? 18 : 28)}`).join(' L')}`} />
        </g>
      </FrameSvg>
    )
  },
  Bottom: () => (
    <Scene>
      <Mountains y={190} far="#6a4630" near="#4c2f1f" />
      <path d="M0 220 L60 180 L120 210 L190 150 L260 200 L330 160 L410 205 L470 170 L540 200" stroke={foil()} strokeWidth="0.7" fill="none" opacity="0.8" />
      <Water y={262} color="#2b190f" line={foil()} />
      <Shikara x={270} y={290} s={1.5} hull="#1a0d06" canopy="#7a2c1d" line={foil()} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${200 + i * 10} ${304 + i * 8} L${330 - i * 12} ${304 + i * 8}`} stroke={foil()} strokeWidth="0.6" opacity={0.6 - i * 0.15} strokeDasharray="10 6" />
      ))}
    </Scene>
  ),
  safe: { story: { top: 112, bottom: 222, x: 56 }, print: { top: 86, bottom: 176, x: 46 } },
}

// Gujarati Sandhya kankotri: the couple's own pink dusk artwork, one painted scene per page,
// with the printed text removed (titles kept) so every language can be typed over it.
// Text band under each page's printed calligraphy title, in story px. Order follows the Gujarati page titles.
const SANDHYA_PAGES: [top: number, bottom: number][] = [[350, 380], [295, 320], [285, 275], [345, 292], [272, 310], [258, 420], [320, 370]]
const sandhya: Design = {
  id: 'sandhya',
  sky: '#f1c4cf',
  colors: { title: '#3d5a2a', heading: '#3d5a2a', text: '#5b1f3c', accent: '#d0312d', muted: '#7a4560', names: '#7e224a' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  script: { gu: { title: '"Sandhya Gujarati Bold"', body: '"Sandhya Gujarati"' } },
  tracking: '0.04em',
  type: { body: 0.72, heading: 1.12, names: 2.15, rsvpHeading: 1.3, plainDate: true, lists: 'left', grow: 1.3 },
  ornaments: { couple: `${import.meta.env.BASE_URL}templates/sandhya/couple.png`, swirl: [`${import.meta.env.BASE_URL}templates/sandhya/swirl-l.png`, `${import.meta.env.BASE_URL}templates/sandhya/swirl-r.png`] },
  Top: () => null,
  Bottom: () => null,
  pages: SANDHYA_PAGES.map(([top, bottom], i) => ({ src: `${import.meta.env.BASE_URL}templates/sandhya/${i + 1}.jpg`, top, bottom, head: true })),
  safe: { story: { top: 160, bottom: 320, x: 14 }, print: { top: 48, bottom: 182, x: 12 } },
}

export const designs: Design[] = [shubho, kasavu, pelli, jainLagna, chapel, parsiLagan, chinar, sandhya]

export const templates: Template[] = [
  { id: 'shubho-bibaho', name: 'Shubho Bibaho Alpana Red', design: 'shubho', lang: 'en', symbol: 'ganesha', event: 'wedding' },
  { id: 'kerala-kasavu', name: 'Kerala Kasavu Gold Border', design: 'kasavu', lang: 'en', symbol: 'floral', event: 'wedding' },
  { id: 'pelli-patrika', name: 'Pelli Patrika Turmeric Mandapam', design: 'pelli', lang: 'en', symbol: 'balaji', event: 'wedding' },
  { id: 'jain-lagna-patrika', name: 'Jain Lagna Patrika Saffron', design: 'jain-lagna', lang: 'gu', symbol: 'floral', event: 'wedding' },
  { id: 'white-chapel', name: 'White Chapel Silver Arch', design: 'chapel', lang: 'en', symbol: 'floral', event: 'wedding' },
  { id: 'parsi-lagan', name: 'Parsi Lagan Pastel Chalk', design: 'parsi-lagan', lang: 'gu', symbol: 'floral', event: 'wedding' },
  { id: 'kashmiri-chinar', name: 'Kashmiri Chinar & Shikara', design: 'chinar', lang: 'hi', symbol: 'ganesha', event: 'wedding' },
  { id: 'sandhya-kankotri', name: 'Sandhya Pink Dusk Kankotri', design: 'sandhya', lang: 'gu', symbol: 'ganesha', event: 'wedding' },
]
