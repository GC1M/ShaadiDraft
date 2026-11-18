// Shared SVG kit for card backdrops. Everything is drawn on a 540-wide grid and scaled by the
// caller, so one motif serves both the 9:16 phone card and the 5:7 print card.
import type { ReactNode } from 'react'
import type { SymbolId } from '../types'

// Deterministic "randomness" so a card renders identically on screen and in export.
export function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ---------------- small pieces ---------------- */

export function Flower({ x, y, r, n = 6, fill, center }: { x: number; y: number; r: number; n?: number; fill: string; center: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={r * 0.55} cy="0" rx={r * 0.55} ry={r * 0.3} fill={fill} transform={`rotate(${(360 / n) * i})`} />
      ))}
      <circle r={r * 0.24} fill={center} />
    </g>
  )
}

export function Marigold({ x, y, r, dark = '#d35400', light = '#f39c12' }: { x: number; y: number; r: number; dark?: string; light?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={dark} />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={r * 0.55} cy="0" r={r * 0.42} fill={light} transform={`rotate(${i * 36})`} />
      ))}
      <circle r={r * 0.4} fill={dark} />
    </g>
  )
}

const PAISLEY = 'M0 22 C -14 18 -16 0 -10 -10 C -4 -20 10 -22 14 -12 C 18 -2 10 6 4 2 C 0 -1 2 -8 6 -6'
export function Paisley({ x, y, s = 1, rot = 0, color, fill }: { x: number; y: number; s?: number; rot?: number; color: string; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d={PAISLEY} stroke={color} strokeWidth={1.6 / s} fill={fill ?? 'none'} />
      <path d={PAISLEY} stroke={color} strokeWidth={0.9 / s} fill="none" transform="scale(0.6) translate(0 6)" />
      <circle cx="-3" cy="8" r="2" fill={color} />
    </g>
  )
}

export function LotusBloom({ x, y, s = 1, petal = '#f4a7b9', deep = '#c2185b' }: { x: number; y: number; s?: number; petal?: string; deep?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-62, -32, 0, 32, 62].map((a) => (
        <ellipse key={a} cy="-17" rx="6.5" ry="17" fill={petal} stroke={deep} strokeWidth="0.7" opacity="0.8" transform={`rotate(${a})`} />
      ))}
      {[-38, -12, 12, 38].map((a) => (
        <ellipse key={a} cy="-13" rx="6" ry="13" fill={petal} stroke={deep} strokeWidth="0.8" transform={`rotate(${a})`} />
      ))}
      <ellipse cy="-12" rx="5" ry="13" fill={deep} opacity="0.85" />
    </g>
  )
}

export function LotusPad({ x, y, r, fill = '#5f8f4e', vein = '#3f6b35' }: { x: number; y: number; r: number; fill?: string; vein?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(1 0.4)`}>
      <path d={`M0 0 L${r * 0.26} ${-r} A${r} ${r} 0 1 1 ${-r * 0.26} ${-r} Z`} fill={fill} stroke={vein} strokeWidth="2" />
    </g>
  )
}

/* ---------------- top decor ---------------- */

type Drop = 'bud' | 'bell' | 'lantern' | 'marigold' | 'diya' | 'mirror'

function Pendant({ kind, x, y, c }: { kind: Drop; x: number; y: number; c: { a: string; b: string } }) {
  if (kind === 'bell')
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-11 18 Q-11 0 0 -2 Q11 0 11 18 Z" fill={c.a} stroke={c.b} strokeWidth="1" />
        <rect x="-13" y="17" width="26" height="3" rx="1.5" fill={c.b} />
        <circle cy="23" r="2.6" fill={c.b} />
      </g>
    )
  if (kind === 'lantern')
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M0 -2 L9 8 L7 24 L0 30 L-7 24 L-9 8 Z" fill={c.a} stroke={c.b} strokeWidth="1" />
        <path d="M-9 8 L9 8 M-7 24 L7 24" stroke={c.b} strokeWidth="1" />
        <path d="M0 30 L0 38" stroke={c.b} strokeWidth="1.4" />
      </g>
    )
  if (kind === 'marigold') return <Marigold x={x} y={y + 6} r={7} />
  if (kind === 'diya')
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-10 6 Q0 16 10 6 Z" fill={c.a} stroke={c.b} strokeWidth="1" />
        <ellipse cy="0" rx="3" ry="6" fill="#ffb300" />
      </g>
    )
  if (kind === 'mirror')
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M0 0 L8 10 L0 20 L-8 10 Z" fill={c.a} stroke={c.b} strokeWidth="1.2" />
        <circle cy="10" r="3" fill="#e8eef5" stroke={c.b} strokeWidth="0.8" />
      </g>
    )
  // bud: copper lotus bud, as in the reference kankotri
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -2 C 10 6 11 18 0 28 C -11 18 -10 6 0 -2 Z" fill={c.a} stroke={c.b} strokeWidth="1.2" />
      <path d="M0 4 C 5 10 5 18 0 24 C -5 18 -5 10 0 4 Z" fill={c.b} opacity="0.35" />
    </g>
  )
}

// Hanging greenery with pendants on cords: the signature top of modern kankotris.
export function HangingVines({ drop = 'bud', leaf = ['#3d6b2f', '#5b8a3a', '#7aa84e'], cord = '#f3e7d3', pendant = { a: '#d98b5f', b: '#8a4b2a' }, seed = 7 }: {
  drop?: Drop
  leaf?: string[]
  cord?: string
  pendant?: { a: string; b: string }
  seed?: number
}) {
  const r = rng(seed)
  const strands = Array.from({ length: 34 }, (_, i) => ({ x: i * 16 + r() * 8, len: 30 + r() * 90 }))
  const drops = Array.from({ length: 9 }, (_, i) => ({ x: 34 + i * 59, len: 70 + (i % 2) * 34 + r() * 16 }))
  return (
    <svg viewBox="0 0 540 200" width="100%" style={{ display: 'block' }}>
      <rect x="0" y="0" width="540" height="22" fill={leaf[0]} />
      {strands.map((s, i) => (
        <g key={i}>
          <path d={`M${s.x} 0 Q ${s.x + 4} ${s.len / 2} ${s.x - 2} ${s.len}`} stroke={leaf[0]} strokeWidth="1" fill="none" />
          {Array.from({ length: Math.floor(s.len / 7) }, (_, j) => {
            const y = j * 7 + 4
            const side = j % 2 ? 1 : -1
            return <ellipse key={j} cx={s.x + side * 3} cy={y} rx="2.4" ry="5.5" fill={leaf[(i + j) % leaf.length]} transform={`rotate(${side * 35} ${s.x + side * 3} ${y})`} />
          })}
        </g>
      ))}
      {drops.map((d, i) => (
        <g key={i}>
          <line x1={d.x} y1="10" x2={d.x} y2={d.len} stroke={cord} strokeWidth="2.2" />
          {[0.35, 0.6].map((t) => (
            <circle key={t} cx={d.x} cy={10 + (d.len - 10) * t} r="2.2" fill={pendant.b} />
          ))}
          <Pendant kind={drop} x={d.x} y={d.len} c={pendant} />
        </g>
      ))}
    </svg>
  )
}

// Rajasthani marigold toran.
export function Toran({ thread = '#b8860b', leaf = '#3f7d2c', accent = '#7a1f1f' }: { thread?: string; leaf?: string; accent?: string }) {
  const xs = Array.from({ length: 17 }, (_, i) => 16 + i * 31.7)
  return (
    <svg viewBox="0 0 540 120" width="100%" style={{ display: 'block' }}>
      <path d="M0 8 Q 270 26 540 8" stroke={thread} strokeWidth="3" fill="none" />
      {xs.map((x, i) => {
        const beads = i % 2 ? 5 : 8
        const top = 8 + 18 * Math.sin((Math.PI * x) / 540) * 0.7
        return (
          <g key={x}>
            <line x1={x} y1={top} x2={x} y2={top + beads * 10 + 4} stroke={thread} strokeWidth="1" />
            {Array.from({ length: beads }, (_, j) => (
              <Marigold key={j} x={x} y={top + 7 + j * 10} r={5.4} dark={j % 3 === 2 ? '#e0a800' : '#e8730c'} light={j % 3 === 2 ? '#ffd23f' : '#ffa726'} />
            ))}
            <path d={`M${x} ${top + beads * 10 + 3} l-4 8 l4 3 l4 -3 z`} fill={i % 2 ? leaf : accent} />
            <ellipse cx={x + 16} cy={top + 5} rx="3.5" ry="10" fill={leaf} transform={`rotate(-20 ${x + 16} ${top + 5})`} />
          </g>
        )
      })}
    </svg>
  )
}

// Scalloped Mughal/Rajput arch frame in foil gold; content sits inside the arch.
export function ArchFrame({ gold, inner, h }: { gold: string; inner: string; h: number }) {
  const top = 70
  const d = `M40 ${h} L40 ${top + 150} Q40 ${top + 60} 150 ${top + 30} Q 230 ${top + 10} 270 ${top - 40} Q 310 ${top + 10} 390 ${top + 30} Q 500 ${top + 60} 500 ${top + 150} L500 ${h}`
  return (
    <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
      <path d={d} stroke={gold} strokeWidth="3" fill="none" />
      <path d={d} stroke={inner} strokeWidth="1.2" fill="none" transform="translate(270 0) scale(0.955 1) translate(-270 14)" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={40} cy={top + 170 + i * ((h - top - 200) / 8)} r="2.4" fill={gold} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={500} cy={top + 170 + i * ((h - top - 200) / 8)} r="2.4" fill={gold} />
      ))}
    </svg>
  )
}

// Repeating triangle border (temple teeth / phulkari / mirror-work), drawn as a top band.
export function TeethBand({ base, tooth, line, inner, h = 26, n = 22, pattern }: { base: string; tooth: string; line: string; inner?: ReactNode; h?: number; n?: number; pattern?: (x: number, i: number) => ReactNode }) {
  const w = 540 / n
  return (
    <svg viewBox={`0 0 540 ${h + 24}`} width="100%" style={{ display: 'block' }}>
      <rect width="540" height={h} fill={base} />
      <line x1="0" y1="4" x2="540" y2="4" stroke={line} strokeWidth="1.2" />
      <line x1="0" y1={h - 4} x2="540" y2={h - 4} stroke={line} strokeWidth="1.2" />
      {pattern && Array.from({ length: n }, (_, i) => pattern(i * w + w / 2, i))}
      {inner}
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${i * w} ${h} L${i * w + w / 2} ${h + 20} L${(i + 1) * w} ${h} Z`} fill={tooth} stroke={line} strokeWidth="1" />
      ))}
    </svg>
  )
}

/* ---------------- bottom scenes (540 x 340 grid, anchored to the card's bottom) ---------------- */

export function Mountains({ far = '#b9a7c4', near = '#9c93ae', y = 150 }: { far?: string; near?: string; y?: number }) {
  return (
    <g>
      <path d={`M0 ${y + 30} L60 ${y - 10} L120 ${y + 20} L190 ${y - 40} L260 ${y + 10} L330 ${y - 30} L410 ${y + 15} L470 ${y - 20} L540 ${y + 10} L540 340 L0 340 Z`} fill={far} opacity="0.55" />
      <path d={`M0 ${y + 60} L80 ${y + 20} L150 ${y + 50} L230 ${y + 10} L310 ${y + 55} L390 ${y + 25} L460 ${y + 50} L540 ${y + 20} L540 340 L0 340 Z`} fill={near} opacity="0.6" />
    </g>
  )
}

export function Trees({ y = 230, seed = 3, greens = ['#2f5d34', '#3f7a3f', '#4f8f45'] }: { y?: number; seed?: number; greens?: string[] }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: 14 }, (_, i) => {
        const x = i * 42 + r() * 20
        const s = 22 + r() * 18
        return (
          <g key={i}>
            <rect x={x - 2} y={y - 4} width="4" height="24" fill="#4a3424" />
            <circle cx={x} cy={y - s * 0.6} r={s} fill={greens[i % 3]} />
            <circle cx={x - s * 0.6} cy={y - s * 0.2} r={s * 0.7} fill={greens[(i + 1) % 3]} />
            <circle cx={x + s * 0.6} cy={y - s * 0.1} r={s * 0.7} fill={greens[(i + 2) % 3]} />
          </g>
        )
      })}
    </g>
  )
}

// Nagara temple: curvilinear shikhara with amalaka and flag, plus a small mandapa.
export function Temple({ x = 400, y = 270, s = 1, stone = '#d9a35b', line = '#9a6a2c' }: { x?: number; y?: number; s?: number; stone?: string; line?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-60 0 L-60 -40 Q-60 -150 -8 -190 L8 -190 Q60 -150 60 -40 L60 0 Z" fill={stone} stroke={line} strokeWidth="1.5" />
      {[-40, -80, -120, -155].map((yy, i) => (
        <path key={yy} d={`M${-55 + i * 9} ${yy} Q0 ${yy - 8} ${55 - i * 9} ${yy}`} stroke={line} strokeWidth="1.2" fill="none" />
      ))}
      <line x1="0" y1="-185" x2="0" y2="-10" stroke={line} strokeWidth="1" />
      <ellipse cx="0" cy="-194" rx="12" ry="5" fill={stone} stroke={line} strokeWidth="1.2" />
      <path d="M0 -199 L0 -232" stroke={line} strokeWidth="1.6" />
      <path d="M0 -232 L24 -224 L0 -216 Z" fill="#e2552d" />
      <path d="M-150 0 L-150 -50 Q-120 -95 -90 -50 L-90 0 Z M-95 0 L-95 -40 Q-75 -80 -55 -40 L-55 0 Z" fill={stone} stroke={line} strokeWidth="1.2" />
      <rect x="-150" y="-12" width="210" height="12" fill={line} opacity="0.5" />
    </g>
  )
}

export function Grass({ y = 300, seed = 5, color = '#2e5b2a', light = '#5a8a3a' }: { y?: number; seed?: number; color?: string; light?: string }) {
  const r = rng(seed)
  return (
    <g>
      <rect x="0" y={y} width="540" height={340 - y} fill={color} />
      {Array.from({ length: 70 }, (_, i) => {
        const x = i * 8 + r() * 6
        const h = 14 + r() * 26
        return <path key={i} d={`M${x} ${y + 6} Q ${x + (r() - 0.5) * 12} ${y - h / 2} ${x + (r() - 0.5) * 10} ${y - h}`} stroke={i % 3 ? color : light} strokeWidth="2" fill="none" />
      })}
    </g>
  )
}

// Climbing stem of small flowers for the side edges.
export function SideVine({ x, flip = false, top = 120, bottom = 330, flower = '#e88aa5', center = '#fff1c1', stem = '#5a7a3a' }: { x: number; flip?: boolean; top?: number; bottom?: number; flower?: string; center?: string; stem?: string }) {
  const n = 7
  return (
    <g transform={flip ? `translate(${x * 2} 0) scale(-1 1)` : undefined}>
      <path d={`M${x} ${bottom} C ${x + 30} ${(top + bottom) / 2} ${x - 10} ${top + 40} ${x + 20} ${top}`} stroke={stem} strokeWidth="2" fill="none" />
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1)
        const yy = bottom - (bottom - top) * t
        const xx = x + Math.sin(t * Math.PI) * 18 + (i % 2 ? 12 : -4)
        return (
          <g key={i}>
            <ellipse cx={xx - 8} cy={yy + 6} rx="3" ry="7" fill={stem} transform={`rotate(-40 ${xx - 8} ${yy + 6})`} />
            <Flower x={xx} y={yy} r={7 + (i % 3)} n={5} fill={flower} center={center} />
          </g>
        )
      })}
    </g>
  )
}

export function Water({ y = 270, color = '#7fb2c4', line = '#d8ecf2' }: { y?: number; color?: string; line?: string }) {
  return (
    <g>
      <rect x="0" y={y} width="540" height={340 - y} fill={color} />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M${20 + (i % 2) * 40} ${y + 14 + i * 12} q 15 -5 30 0 t 30 0 M${260 + (i % 2) * 30} ${y + 18 + i * 11} q 15 -5 30 0 t 30 0`} stroke={line} strokeWidth="1.4" fill="none" opacity="0.8" />
      ))}
    </g>
  )
}

// Udaipur-style palace skyline: chhatris and domes.
export function Palace({ fill, line, y = 260 }: { fill: string; line: string; y?: number }) {
  const chhatri = (x: number, s: number) => (
    <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-26" y="-60" width="52" height="60" fill={fill} stroke={line} strokeWidth="1.2" />
      {[-16, 0, 16].map((xx) => (
        <path key={xx} d={`M${xx - 6} 0 L${xx - 6} -30 Q${xx} -40 ${xx + 6} -30 L${xx + 6} 0`} fill={line} opacity="0.35" />
      ))}
      <path d="M-30 -60 L30 -60 L24 -68 L-24 -68 Z" fill={fill} stroke={line} strokeWidth="1.2" />
      <path d="M-20 -68 Q0 -110 20 -68 Z" fill={fill} stroke={line} strokeWidth="1.2" />
      <path d="M0 -100 L0 -114" stroke={line} strokeWidth="1.5" />
      <circle cy="-116" r="2.5" fill={line} />
    </g>
  )
  return (
    <g>
      <rect x="20" y={y - 40} width="500" height="40" fill={fill} stroke={line} strokeWidth="1.2" />
      {Array.from({ length: 20 }, (_, i) => (
        <path key={i} d={`M${34 + i * 24} ${y} L${34 + i * 24} ${y - 22} Q${40 + i * 24} ${y - 30} ${46 + i * 24} ${y - 22} L${46 + i * 24} ${y}`} fill={line} opacity="0.3" />
      ))}
      {[80, 170, 270, 370, 460].map((x, i) => chhatri(x, i === 2 ? 1.25 : 0.95))}
    </g>
  )
}

// South Indian gopuram: stacked tiers with a barrel-vault crown.
export function Gopuram({ x = 270, y = 300, s = 1, fill, line }: { x?: number; y?: number; s?: number; fill: string; line: string }) {
  const tiers = 6
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: tiers }, (_, i) => {
        const w = 120 - i * 15
        const yy = -i * 28
        return (
          <g key={i}>
            <rect x={-w / 2} y={yy - 28} width={w} height="28" fill={fill} stroke={line} strokeWidth="1.2" />
            {Array.from({ length: Math.max(2, Math.floor(w / 18)) }, (_, j) => (
              <rect key={j} x={-w / 2 + 6 + j * ((w - 12) / Math.max(2, Math.floor(w / 18)))} y={yy - 22} width="6" height="14" fill={line} opacity="0.45" />
            ))}
          </g>
        )
      })}
      <path d={`M-32 ${-tiers * 28} Q0 ${-tiers * 28 - 34} 32 ${-tiers * 28} Z`} fill={fill} stroke={line} strokeWidth="1.2" />
      {[-18, 0, 18].map((xx) => (
        <path key={xx} d={`M${xx} ${-tiers * 28 - 18} L${xx} ${-tiers * 28 - 34}`} stroke={line} strokeWidth="2" />
      ))}
    </g>
  )
}

export function Mosque({ fill, line, y = 280 }: { fill: string; line: string; y?: number }) {
  const minaret = (x: number) => (
    <g key={x}>
      <rect x={x - 7} y={y - 150} width="14" height="150" fill={fill} stroke={line} strokeWidth="1.2" />
      <rect x={x - 11} y={y - 110} width="22" height="5" fill={line} />
      <path d={`M${x - 8} ${y - 150} Q${x} ${y - 178} ${x + 8} ${y - 150} Z`} fill={fill} stroke={line} strokeWidth="1.2" />
      <path d={`M${x} ${y - 172} L${x} ${y - 186}`} stroke={line} strokeWidth="1.5" />
    </g>
  )
  return (
    <g>
      {minaret(110)}
      {minaret(430)}
      <rect x="150" y={y - 70} width="240" height="70" fill={fill} stroke={line} strokeWidth="1.2" />
      {[190, 230, 270, 310, 350].map((x) => (
        <path key={x} d={`M${x - 12} ${y} L${x - 12} ${y - 34} Q${x} ${y - 52} ${x + 12} ${y - 34} L${x + 12} ${y}`} fill={line} opacity="0.3" />
      ))}
      <path d={`M200 ${y - 70} Q200 ${y - 150} 270 ${y - 160} Q340 ${y - 150} 340 ${y - 70} Z`} fill={fill} stroke={line} strokeWidth="1.4" />
      <path d={`M270 ${y - 160} L270 ${y - 182}`} stroke={line} strokeWidth="2" />
      <path d={`M264 ${y - 192} A9 9 0 1 0 276 ${y - 180} A7 7 0 1 1 264 ${y - 192} Z`} fill={line} />
      <path d={`M160 ${y - 70} Q160 ${y - 104} 190 ${y - 108} Q205 ${y - 100} 205 ${y - 70} Z M335 ${y - 70} Q335 ${y - 100} 350 ${y - 108} Q380 ${y - 104} 380 ${y - 70} Z`} fill={fill} stroke={line} strokeWidth="1.2" />
    </g>
  )
}

// Wedding mandap: four pillars, a draped canopy and kalash on top.
export function Mandap({ fill, line, cloth, y = 300 }: { fill: string; line: string; cloth: string; y?: number }) {
  return (
    <g>
      {[150, 210, 330, 390].map((x) => (
        <g key={x}>
          <rect x={x - 6} y={y - 150} width="12" height="150" fill={fill} stroke={line} strokeWidth="1.2" />
          {[0.25, 0.5, 0.75].map((t) => (
            <rect key={t} x={x - 8} y={y - 150 + 150 * t} width="16" height="5" fill={line} />
          ))}
        </g>
      ))}
      <path d={`M130 ${y - 150} L410 ${y - 150} L380 ${y - 190} L160 ${y - 190} Z`} fill={cloth} stroke={line} strokeWidth="1.2" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${140 + i * 35} ${y - 150} q17.5 18 35 0`} fill={cloth} stroke={line} strokeWidth="1" />
      ))}
      <path d={`M240 ${y - 190} Q270 ${y - 236} 300 ${y - 190} Z`} fill={fill} stroke={line} strokeWidth="1.2" />
      <circle cx="270" cy={y - 232} r="8" fill={line} />
      <path d={`M190 ${y} L350 ${y} L340 ${y - 14} L200 ${y - 14} Z`} fill={line} opacity="0.6" />
    </g>
  )
}

export function Diya({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16 0 Q0 16 16 0 Z" fill="#c0702a" stroke="#7a3f12" strokeWidth="1" />
      <ellipse cy="-8" rx="4" ry="9" fill="#ff9f1c" />
      <ellipse cy="-5" rx="2" ry="5" fill="#ffe08a" />
    </g>
  )
}

export function PeacockFeather({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 L0 -110" stroke="#6b8f3a" strokeWidth="1.6" />
      {Array.from({ length: 14 }, (_, i) => (
        <g key={i}>
          <path d={`M0 ${-30 - i * 5} L${-14 + i * 0.4} ${-44 - i * 5}`} stroke="#4f9a5a" strokeWidth="0.9" />
          <path d={`M0 ${-30 - i * 5} L${14 - i * 0.4} ${-44 - i * 5}`} stroke="#4f9a5a" strokeWidth="0.9" />
        </g>
      ))}
      <ellipse cy="-108" rx="17" ry="22" fill="#2e8b57" />
      <ellipse cy="-106" rx="12" ry="16" fill="#d4af37" />
      <ellipse cy="-104" rx="8" ry="11" fill="#1f5fa8" />
      <ellipse cy="-102" rx="4" ry="6" fill="#0b2545" />
    </g>
  )
}

/* ---------------- sacred emblems (drawn in a 100x100 box) ---------------- */

export function Emblem({ symbol, color, accent, size }: { symbol: SymbolId; color: string; accent: string; size: number | string }) {
  const ring = (
    <>
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.6" fill="none" />
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse key={i} cx="50" cy="9" rx="3" ry="6" fill={accent} opacity="0.85" transform={`rotate(${i * 22.5} 50 50)`} />
      ))}
    </>
  )
  let inner: ReactNode
  if (symbol === 'ganesha')
    inner = (
      <text x="50" y="66" textAnchor="middle" fontSize="46" fill={color} style={{ fontFamily: '"Tiro Devanagari Hindi", serif' }}>
        ॐ
      </text>
    )
  else if (symbol === 'ek-onkar')
    inner = (
      <text x="50" y="68" textAnchor="middle" fontSize="48" fill={color} style={{ fontFamily: '"Tiro Gurmukhi", serif' }}>
        ੴ
      </text>
    )
  else if (symbol === 'radha-krishna')
    inner = (
      <g>
        <g transform="rotate(-28 50 50)">
          <rect x="16" y="47" width="68" height="6" rx="3" fill={color} />
          {[30, 40, 50, 60].map((x) => (
            <circle key={x} cx={x} cy="50" r="1.4" fill={accent} />
          ))}
        </g>
        <g transform="translate(58 82) rotate(18) scale(0.55)">
          <PeacockFeather x={0} y={0} />
        </g>
      </g>
    )
  else if (symbol === 'shiva')
    inner = (
      <g>
        {/* Trishul with a damaru tied below the prongs */}
        <rect x="48" y="30" width="4" height="56" rx="2" fill={color} />
        <path d="M50 14 L54 30 L46 30 Z M34 24 Q34 40 48 42 L48 38 Q38 36 38 24 Z M66 24 Q66 40 52 42 L52 38 Q62 36 62 24 Z" fill={color} />
        <path d="M40 48 L60 48 L52 55 L60 62 L40 62 L48 55 Z" fill={accent} />
      </g>
    )
  else if (symbol === 'balaji')
    inner = (
      <g>
        {/* Namam: white U with a red centre line, between conch and discus */}
        <path d="M38 30 L38 62 Q50 76 62 62 L62 30 L56 30 L56 60 Q50 66 44 60 L44 30 Z" fill="#fffaf0" stroke={color} strokeWidth="1.2" />
        <rect x="48" y="34" width="4" height="30" rx="2" fill="#d32f2f" />
        <g transform="translate(22 46)">
          <circle r="9" fill="none" stroke={color} strokeWidth="2" />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="0" y1="0" x2="9" y2="0" stroke={color} strokeWidth="1.2" transform={`rotate(${i * 45})`} />
          ))}
        </g>
        <path d="M78 38 C 86 40 88 50 82 56 C 78 60 72 58 72 52 C 72 46 76 44 78 38 Z" fill={color} />
      </g>
    )
  else if (symbol === 'jain')
    inner = (
      <g>
        {/* Ahimsa hand: raised palm with the dharma wheel */}
        {[36, 44, 52, 60].map((x, i) => (
          <rect key={x} x={x} y={i === 0 || i === 3 ? 26 : 20} width="7" height="30" rx="3.5" fill={color} />
        ))}
        <rect x="24" y="44" width="7" height="22" rx="3.5" fill={color} transform="rotate(-35 27.5 55)" />
        <path d="M34 46 L68 46 L68 70 Q68 84 51 84 Q34 84 34 70 Z" fill={color} />
        <circle cx="51" cy="64" r="9" fill="none" stroke={accent} strokeWidth="2" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="51" y1="64" x2="51" y2="55" stroke={accent} strokeWidth="1.2" transform={`rotate(${i * 45} 51 64)`} />
        ))}
      </g>
    )
  else if (symbol === 'christian')
    inner = (
      <g>
        <rect x="46" y="18" width="8" height="66" rx="1.5" fill={color} />
        <rect x="30" y="34" width="40" height="8" rx="1.5" fill={color} />
      </g>
    )
  else if (symbol === 'bismillah')
    inner = (
      <g>
        <path d="M58 24 A26 26 0 1 0 58 76 A20 20 0 1 1 58 24 Z" fill={color} />
        <path d="M66 42 L68.5 48 L75 48 L70 52 L72 58 L66 54.5 L60 58 L62 52 L57 48 L63.5 48 Z" fill={accent} />
      </g>
    )
  else
    inner = (
      <g>
        <LotusBloom x={50} y={66} s={1.2} petal={accent} deep={color} />
      </g>
    )
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      {ring}
      {inner}
    </svg>
  )
}

// Small ornamental divider used between text groups.
export function Flourish({ color, width = 160 }: { color: string; width?: number | string }) {
  return (
    <svg viewBox="0 0 160 16" width={width} style={{ display: 'block', margin: '0 auto' }}>
      <path d="M2 8 Q30 0 62 8 M98 8 Q130 0 158 8" stroke={color} strokeWidth="1.2" fill="none" />
      <path d="M80 1 L87 8 L80 15 L73 8 Z" fill={color} />
      <circle cx="66" cy="8" r="2" fill={color} />
      <circle cx="94" cy="8" r="2" fill={color} />
    </svg>
  )
}
