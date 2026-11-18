// Luxury kit: metallic foils, paper/silk textures and fine filigree shared by premium designs.
// Gradients use userSpaceOnUse so thin horizontal/vertical strokes still render (objectBoundingBox
// collapses on zero-height lines). Every SVG that uses a foil must include <FoilDefs /> itself, since
// PNG/PDF export clones a single card and can't see defs elsewhere on the page.

export type Foil = 'gold' | 'rose' | 'silver' | 'copper'

const STOPS: Record<Foil, string[]> = {
  gold: ['#6f4f17', '#b8913b', '#f6e3a1', '#d4ae4a', '#8d6a22', '#e8cd7c', '#7a5a1c'],
  rose: ['#7d4339', '#c4887a', '#f8dacd', '#d29a8a', '#8f5348', '#ecbcae', '#80463c'],
  silver: ['#6b6e75', '#b9bcc4', '#ffffff', '#c9ccd3', '#7c7f87', '#e4e6ea', '#696c73'],
  copper: ['#6a2f12', '#b3602f', '#f2b48a', '#c8743f', '#82401c', '#e09a6a', '#6e3214'],
}

export const foil = (f: Foil = 'gold') => `url(#lx-${f})`

export function FoilDefs() {
  return (
    <defs>
      {(Object.keys(STOPS) as Foil[]).map((f) => (
        <linearGradient key={f} id={`lx-${f}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="260" y2="180" spreadMethod="reflect">
          {STOPS[f].map((c, i) => (
            <stop key={i} offset={i / (STOPS[f].length - 1)} stopColor={c} />
          ))}
        </linearGradient>
      ))}
    </defs>
  )
}

// CSS background layers to prepend to a design's `sky`.
// Quotes and parens stay percent-encoded: html-to-image's url() regex otherwise grabs the inner
// url(#n), fetches it, and the export loses the whole background.
const noise = (rgb: string, a: number) =>
  `url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27180%27 height=%27180%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix values=%270 0 0 0 ${rgb} 0 0 0 0 ${rgb} 0 0 0 0 ${rgb} 0 0 0 ${a} 0%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url%28%23n%29%27/%3E%3C/svg%3E")`
export const GRAIN = noise('0', 0.05) // cotton paper on light cards
export const GRAIN_LIGHT = noise('1', 0.05) // velvet/silk tooth on dark cards
export const SHEEN = 'linear-gradient(118deg,rgba(255,255,255,0) 28%,rgba(255,255,255,.13) 44%,rgba(255,255,255,0) 58%,rgba(255,255,255,.07) 74%,rgba(255,255,255,0) 86%)'
export const VIGNETTE = 'radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 55%,rgba(0,0,0,.28) 100%)'

/* ---------------- filigree ---------------- */

// Baroque corner in a 120x120 box, pointing at (0,0). Rotate/flip for other corners.
export function FiligreeCorner({ fill, s = 1 }: { fill: string; s?: number }) {
  return (
    <g transform={`scale(${s})`} fill="none" stroke={fill} strokeLinecap="round">
      <path d="M8 66 C8 34 34 8 66 8" strokeWidth="1.6" />
      <path d="M16 74 C16 42 42 16 74 16" strokeWidth="0.7" />
      <path d="M66 8 C88 8 98 22 88 32 C80 39 70 31 76 24 C80 20 85 23 84 27" strokeWidth="1.4" />
      <path d="M8 66 C8 88 22 98 32 88 C39 80 31 70 24 76 C20 80 23 85 27 84" strokeWidth="1.4" />
      <path d="M74 16 C96 18 112 12 118 4" strokeWidth="0.9" />
      <path d="M16 74 C18 96 12 112 4 118" strokeWidth="0.9" />
      <path d="M22 22 C36 26 46 36 50 50 C36 46 26 36 22 22 Z" fill={fill} stroke="none" />
      <path d="M32 14 C38 5 49 4 54 11 C45 11 38 13 32 14 Z" fill={fill} stroke="none" />
      <path d="M14 32 C5 38 4 49 11 54 C11 45 13 38 14 32 Z" fill={fill} stroke="none" />
      <path d="M40 24 C46 20 52 22 54 27 M24 40 C20 46 22 52 27 54" strokeWidth="0.8" />
      <circle cx="58" cy="58" r="2.6" fill={fill} stroke="none" />
      <circle cx="28" cy="52" r="1.5" fill={fill} stroke="none" />
      <circle cx="52" cy="28" r="1.5" fill={fill} stroke="none" />
      <circle cx="96" cy="10" r="1.4" fill={fill} stroke="none" />
      <circle cx="10" cy="96" r="1.4" fill={fill} stroke="none" />
    </g>
  )
}

// Small cartouche for the middle of a frame edge, centred on (0,0).
export function EdgeJewel({ fill }: { fill: string }) {
  return (
    <g fill="none" stroke={fill} strokeLinecap="round">
      <path d="M0 -9 L9 0 L0 9 L-9 0 Z" fill={fill} stroke="none" />
      <path d="M-12 0 C-22 -10 -34 -8 -36 0 C-34 8 -22 10 -12 0 M12 0 C22 -10 34 -8 36 0 C34 8 22 10 12 0" strokeWidth="1.1" />
      <path d="M-40 0 L-60 0 M40 0 L60 0" strokeWidth="0.8" />
      <circle cx="-64" cy="0" r="1.6" fill={fill} stroke="none" />
      <circle cx="64" cy="0" r="1.6" fill={fill} stroke="none" />
    </g>
  )
}

// Full-card frame: triple rule, filigree corners, edge jewels. h in 540-wide units.
export function LuxeFrame({ h, f = 'gold', inset = 16, corners = true, jewels = true }: { h: number; f?: Foil; inset?: number; corners?: boolean; jewels?: boolean }) {
  const g = foil(f)
  const i2 = inset + 7
  const i3 = inset + 12
  return (
    <svg viewBox={`0 0 540 ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <FoilDefs />
      <rect x={inset} y={inset} width={540 - inset * 2} height={h - inset * 2} stroke={g} strokeWidth="2.4" fill="none" />
      <rect x={i2} y={i2} width={540 - i2 * 2} height={h - i2 * 2} stroke={g} strokeWidth="0.8" fill="none" />
      <rect x={i3} y={i3} width={540 - i3 * 2} height={h - i3 * 2} stroke={g} strokeWidth="0.9" strokeDasharray="0.1 5" strokeLinecap="round" fill="none" />
      {corners &&
        [
          [i2, i2, 1, 1],
          [540 - i2, i2, -1, 1],
          [i2, h - i2, 1, -1],
          [540 - i2, h - i2, -1, -1],
        ].map(([x, y, sx, sy]) => (
          <g key={`${sx}${sy}`} transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
            <FiligreeCorner fill={g} s={0.85} />
          </g>
        ))}
      {jewels && (
        <>
          <g transform={`translate(270 ${inset})`}>
            <EdgeJewel fill={g} />
          </g>
          <g transform={`translate(270 ${h - inset})`}>
            <EdgeJewel fill={g} />
          </g>
        </>
      )}
    </svg>
  )
}

// Lace medallion (rings of petals, dots and fine spokes), centred on (0,0).
export function Lace({ r, fill, petals = 24 }: { r: number; fill: string; petals?: number }) {
  return (
    <g fill="none" stroke={fill}>
      <circle r={r} strokeWidth="1.2" />
      <circle r={r * 0.93} strokeWidth="0.5" />
      {Array.from({ length: petals }, (_, i) => (
        <path key={`p${i}`} d={`M0 ${-r * 0.93} C${r * 0.07} ${-r * 0.8} ${r * 0.05} ${-r * 0.7} 0 ${-r * 0.64} C${-r * 0.05} ${-r * 0.7} ${-r * 0.07} ${-r * 0.8} 0 ${-r * 0.93} Z`} fill={fill} stroke="none" opacity="0.9" transform={`rotate(${(360 / petals) * i})`} />
      ))}
      {Array.from({ length: petals }, (_, i) => (
        <circle key={`d${i}`} cy={-r * 1.07} r={r * 0.022 + 0.6} fill={fill} stroke="none" transform={`rotate(${(360 / petals) * (i + 0.5)})`} />
      ))}
      <circle r={r * 0.58} strokeWidth="0.9" />
      {Array.from({ length: petals / 2 }, (_, i) => (
        <path key={`l${i}`} d={`M0 ${-r * 0.56} Q${r * 0.12} ${-r * 0.4} 0 ${-r * 0.26} Q${-r * 0.12} ${-r * 0.4} 0 ${-r * 0.56}`} strokeWidth="0.8" transform={`rotate(${(720 / petals) * i})`} />
      ))}
      <circle r={r * 0.22} strokeWidth="0.8" />
      <circle r={r * 0.08} fill={fill} stroke="none" />
    </g>
  )
}

// Scatter of hand-applied gold leaf flecks across a w x h box (deterministic).
export function LeafFlecks({ w, h, n = 40, fill, seed = 1 }: { w: number; h: number; n?: number; fill: string; seed?: number }) {
  let s = seed * 9301 + 49297
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  return (
    <g fill={fill}>
      {Array.from({ length: n }, (_, i) => {
        const x = rnd() * w
        const y = rnd() * h
        const k = 0.6 + rnd() * 2.4
        return <path key={i} d={`M${x} ${y} l${k * 1.6} ${-k * 0.6} l${k * 0.7} ${k * 1.3} l${-k * 1.5} ${k * 0.8} Z`} opacity={0.55 + rnd() * 0.45} />
      })}
    </g>
  )
}
