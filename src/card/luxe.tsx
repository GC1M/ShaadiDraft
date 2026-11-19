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
export const noise = (rgb: string, a: number) =>
  `url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27180%27 height=%27180%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix values=%270 0 0 0 ${rgb} 0 0 0 0 ${rgb} 0 0 0 0 ${rgb} 0 0 0 ${a} 0%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url%28%23n%29%27/%3E%3C/svg%3E")`
export const GRAIN = noise('0', 0.05) // cotton paper on light cards
export const GRAIN_LIGHT = noise('1', 0.05) // velvet/silk tooth on dark cards
export const VIGNETTE = 'radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 55%,rgba(0,0,0,.28) 100%)'

/* ---------------- filigree ---------------- */




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

