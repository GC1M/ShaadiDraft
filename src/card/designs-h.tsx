import type { ReactNode } from "react";
import type { Design } from "./designs";
import type { Template } from "../templates";
import { GRAIN, GRAIN_LIGHT, VIGNETTE, noise } from "./luxe";

// The luxury set: one large crafted hero per card (gold leaf, zari, mirror work, henna, rangoli dots), two colours and
// one metal, solid ink for every word. Metals here use a short-period foil with a near-white hot stop, so even a
// thin rule reads as metal instead of mustard paint. Every SVG carries its own defs (export clones one card).

const METAL = {
  gold: ["#7a5f1e", "#c49f4d", "#fce9c2", "#deb866", "#947632"],
  silver: ["#5f6469", "#9fa5ac", "#f4f6f8", "#b8bec5", "#767b80"],
  copper: ["#713e17", "#b97340", "#fbcdaf", "#d38b59", "#854e24"],
  brass: ["#855918", "#d39747", "#fee7cc", "#edb161", "#9f6f2d"],
  rose: ["#81574a", "#ce9583", "#fee5dd", "#e9ae9b", "#9c6d5f"],
  antique: ["#6c6434", "#b1a666", "#f1eccc", "#cabf7f", "#847b48"],
  champagne: ["#70614a", "#b6a182", "#f5ead9", "#d0ba9a", "#88785e"],
  // Gold for paper cards: darker, the way foil reads on cream away from a lamp.
  leaf: ["#624800", "#a4802b", "#ecd5a6", "#be9946", "#76590d"],
};
export type Metal = keyof typeof METAL;
export const m = (k: Metal) => `url(#h-${k})`;

export function Defs() {
  return (
    <defs>
      {(Object.keys(METAL) as Metal[]).map((k) => (
        <linearGradient
          key={k}
          id={`h-${k}`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="90"
          y2="60"
          spreadMethod="reflect"
        >
          {METAL[k].map((c, i) => (
            <stop key={i} offset={i / 4} stopColor={c} />
          ))}
        </linearGradient>
      ))}
    </defs>
  );
}

export const Svg = ({ h, children }: { h: number; children: ReactNode }) => (
  <svg viewBox={`0 0 540 ${h}`} width="100%" style={{ display: "block" }}>
    <Defs />
    {children}
  </svg>
);
export const Scene = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 540 340"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMax slice"
    style={{ display: "block" }}
  >
    <Defs />
    {children}
  </svg>
);
export const Frame = ({ h, children }: { h: number; children: ReactNode }) => (
  <svg
    viewBox={`0 0 540 ${h}`}
    width="100%"
    height="100%"
    preserveAspectRatio="none"
    style={{ position: "absolute", inset: 0 }}
  >
    <Defs />
    {children}
  </svg>
);

export const rad = (a: number) => (a * Math.PI) / 180;
export const hash = (i: number) =>
  ((((i * 9301 + 49297) % 233280) + 233280) % 233280) / 233280;
export const ring = (n: number, f: (a: number, i: number) => ReactNode) =>
  Array.from({ length: n }, (_, i) => f((360 / n) * i, i));
// An all-over craft ground: a motif repeated on a grid across the card (rows staggered by half a step).
export const field = (
  h: number,
  step: number,
  f: (x: number, y: number, i: number) => ReactNode,
  stagger = true,
) =>
  Array.from({ length: Math.ceil(h / step) + 1 }, (_, r) =>
    Array.from({ length: Math.ceil(540 / step) + 1 }, (_, c) =>
      f(c * step + (stagger && r % 2 ? step / 2 : 0), r * step, r * 100 + c),
    ),
  );

// Raw silk: long horizontal slubs instead of round paper grain.
export const SLUB = noise("1", 0.06).replace(
  "baseFrequency=%27.85%27",
  "baseFrequency=%27.008 .7%27",
);
export const PAPER_PRESS = "0 1px 0 rgba(255,255,255,.6)";
export const VELVET_PRESS = "0 1px 2px rgba(0,0,0,.5)";

export const cormorant = '"Cormorant Garamond", Georgia, serif';
// Display faces per script, so no card falls back to the app-wide Amita/Arima/Baloo look.
export const SCRIPT: Design["script"] = {
  hi: { title: '"Rozha One"', body: '"Tiro Devanagari Hindi"' },
  mr: { title: '"Rozha One"', body: '"Tiro Devanagari Marathi"' },
  pa: { title: '"Noto Serif Gurmukhi"', body: '"Tiro Gurmukhi"' },
  ta: { title: '"Noto Serif Tamil"', body: '"Noto Serif Tamil"' },
  gu: { title: '"Noto Serif Gujarati"', body: '"Noto Serif Gujarati"' },
};

/* ------------------------------------------------------------------ */
/* Harmandir: the Golden Temple in gold leaf on a night sarovar.       */

const NIGHT = "#0b1430";

function Temple() {
  const arches = (x0: number, y: number, n: number, w: number, hh: number) =>
    Array.from({ length: n }, (_, i) => {
      const x = x0 + i * w + w * 0.18;
      const aw = w * 0.64;
      return (
        <path
          key={i}
          d={`M${x} ${y} V${y - hh * 0.55} Q${x} ${y - hh} ${x + aw / 2} ${y - hh} Q${x + aw} ${y - hh} ${x + aw} ${y - hh * 0.55} V${y} Z`}
          fill={NIGHT}
        />
      );
    });
  const kiosk = (x: number, y: number, s: number) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-7" y="-10" width="14" height="10" fill={m("gold")} />
      <path
        d="M-9 -10 C-9 -20 -3 -24 0 -30 C3 -24 9 -20 9 -10 Z"
        fill={m("gold")}
      />
      <path d="M0 -30 V-36" stroke={m("gold")} strokeWidth="1.2" />
      <path d="M-4 0 V-6 Q0 -9 4 -6 V0 Z" fill={NIGHT} />
    </g>
  );
  return (
    <g>
      {/* causeway */}
      <rect x="0" y="258" width="200" height="10" fill={m("gold")} />
      {Array.from({ length: 17 }, (_, i) => (
        <g key={i}>
          <rect
            x={8 + i * 11.5}
            y="250"
            width="2"
            height="8"
            fill={m("gold")}
          />
          {i % 4 === 0 && (
            <circle cx={9 + i * 11.5} cy="246" r="2.2" fill="#fce9c2" />
          )}
        </g>
      ))}
      <path d="M0 250 H200" stroke={m("gold")} strokeWidth="1" />
      {/* lower storey */}
      <rect x="196" y="204" width="148" height="64" fill={m("gold")} />
      {arches(198, 262, 6, 24, 44)}
      <path
        d="M192 204 H348 M192 198 H348"
        stroke={m("gold")}
        strokeWidth="2"
      />
      {Array.from({ length: 20 }, (_, i) => (
        <rect
          key={i}
          x={193 + i * 7.9}
          y="191"
          width="3"
          height="7"
          fill={m("gold")}
        />
      ))}
      {/* upper storey */}
      <rect x="214" y="166" width="112" height="32" fill={m("gold")} />
      {arches(216, 194, 5, 21.6, 22)}
      <path d="M210 166 H330" stroke={m("gold")} strokeWidth="2" />
      {kiosk(202, 191, 1)}
      {kiosk(338, 191, 1)}
      {kiosk(220, 166, 0.8)}
      {kiosk(320, 166, 0.8)}
      {/* ribbed lotus dome */}
      <path
        d="M232 166 C228 140 252 124 270 100 C288 124 312 140 308 166 Z"
        fill={m("gold")}
      />
      {[-26, -16, -6, 6, 16, 26].map((d) => (
        <path
          key={d}
          d={`M${270 + d * 1.2} 166 Q${270 + d * 0.9} 132 270 102`}
          fill="none"
          stroke="#7a5f1e"
          strokeWidth="0.6"
        />
      ))}
      <path
        d="M234 150 Q270 160 306 150"
        fill="none"
        stroke="#7a5f1e"
        strokeWidth="0.6"
      />
      <path d="M270 100 V78" stroke={m("gold")} strokeWidth="2" />
      <circle cx="270" cy="88" r="3" fill={m("gold")} />
      <path d="M266 80 L270 70 L274 80 Z" fill={m("gold")} />
    </g>
  );
}

const harmandir: Design = {
  id: "harmandir",
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 32%,#1d2c60 0%,#121d45 55%,#060b20 100%)`,
  colors: {
    title: "#f1cc7f",
    heading: "#f1dfbd",
    text: "#eef0f8",
    accent: "#d4af5d",
    muted: "#b9c0d8",
    names: "#f1cc7f",
  },
  fonts: {
    title: '"Cinzel"',
    heading: '"Gloock"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.7 },
  press: VELVET_PRESS,
  cover: { flourish: false },
  // A frieze of the temple's cusped arcade under a hairline, stars above.
  Top: () => (
    <Svg h={74}>
      <path d="M24 22 H516 M24 27 H516" stroke={m("gold")} strokeWidth="0.8" />
      {Array.from({ length: 21 }, (_, i) => {
        const x = 24 + i * 23.4;
        return (
          <path
            key={i}
            d={`M${x} 27 Q${x} 40 ${x + 5} 40 Q${x + 5} 46 ${x + 11.7} 48 Q${x + 18.4} 46 ${x + 18.4} 40 Q${x + 23.4} 40 ${x + 23.4} 27`}
            fill="none"
            stroke={m("gold")}
            strokeWidth="1.3"
          />
        );
      })}
      {Array.from({ length: 21 }, (_, i) => (
        <circle
          key={i}
          cx={24 + i * 23.4 + 11.7}
          cy="53"
          r="1.3"
          fill={m("gold")}
        />
      ))}
    </Svg>
  ),
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect
        x="14"
        y="14"
        width="512"
        height={h - 28}
        fill="none"
        stroke={m("gold")}
        strokeWidth="1.1"
      />
      <rect
        x="19"
        y="19"
        width="502"
        height={h - 38}
        fill="none"
        stroke={m("gold")}
        strokeWidth="0.4"
      />
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <rect
        x="0"
        y="268"
        width="540"
        height="72"
        fill="#050a1c"
        opacity="0.55"
      />
      <g transform="translate(0 536) scale(1 -1)" opacity="0.32">
        <g transform="translate(270 268) scale(1.12) translate(-270 -268)">
          <Temple />
        </g>
      </g>
      {/* ripples break up the reflection */}
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M${hash(i) * 380} ${274 + i * 4.6} h${60 + hash(i + 7) * 140}`}
          stroke="#fce9c2"
          strokeWidth="0.5"
          opacity={0.25 + hash(i + 3) * 0.35}
        />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={`d${i}`}
          d={`M0 ${272 + i * 4.6} H540`}
          stroke="#050a1c"
          strokeWidth="2.2"
          opacity="0.5"
        />
      ))}
      <g transform="translate(270 268) scale(1.12) translate(-270 -268)">
        <Temple />
      </g>
      <path d="M0 268 H540" stroke={m("gold")} strokeWidth="0.8" />
    </Scene>
  ),
  safe: {
    story: { top: 92, bottom: 290, x: 48 },
    print: { top: 74, bottom: 236, x: 40 },
  },
};

/* ------------------------------------------------------------------ */
/* Korvai: arakku-red Kanchipuram silk, a deep zari border with        */
/* temple teeth and a pallu of annam swans, peacock-blue contrast edge.*/

const ARAKKU = "#4a0914";
const TEAL = "#0f6a66";
const tooth = "M0 0 H30 L26 5 H23 L20 12 H18 L15 22 L12 12 H10 L7 5 H4 Z";
const swan =
  "M2 16 C6 22 20 22 25 14 C21 16 17 15 16 11 C15 7 17 3 20 2 C22 1.5 24 2.5 25 4 L28 4.5 L25 6 C23 5 21 5 20 7 C19 10 21 13 24 12 C20 9 12 9 2 16 Z";
const butta =
  "M0 0 C10 -2 16 8 12 18 C9 25 0 28 -4 22 C-7 17 -3 12 2 12 C6 12 6 6 0 0 Z";
const weave = (y0: number, y1: number) =>
  Array.from({ length: Math.floor((y1 - y0) / 2.4) }, (_, i) => (
    <path
      key={i}
      d={`M0 ${y0 + i * 2.4} H540`}
      stroke="#3a2a08"
      strokeWidth="0.35"
      opacity="0.28"
    />
  ));

const korvai: Design = {
  id: "korvai",
  sky: `${SLUB}, ${VIGNETTE}, radial-gradient(ellipse at 50% 42%,#6c1222 0%,#4a0914 55%,#24030a 100%)`,
  colors: {
    title: "#fbbd6e",
    heading: "#fee7cc",
    text: "#f8ede6",
    accent: "#edb161",
    muted: "#dcbcb5",
    names: "#fbbd6e",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Marcellus"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.4 },
  press: VELVET_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={104}>
      <rect x="0" y="0" width="540" height="36" fill={m("brass")} />
      {weave(0, 36)}
      {Array.from({ length: 27 }, (_, i) => (
        <path
          key={i}
          d="M0 0 l5 -5 l5 5 l-5 5 Z"
          transform={`translate(${i * 20 + 5} 18)`}
          fill={ARAKKU}
          opacity="0.85"
        />
      ))}
      <rect x="0" y="36" width="540" height="4" fill={TEAL} />
      <rect x="0" y="40" width="540" height="12" fill={m("brass")} />
      {weave(40, 52)}
      {Array.from({ length: 18 }, (_, i) => (
        <path
          key={i}
          d={tooth}
          transform={`translate(${i * 30} 52)`}
          fill={m("brass")}
        />
      ))}
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={i * 30 + 15} cy="84" r="1.6" fill={m("brass")} />
      ))}
    </Svg>
  ),
  Overlay: ({ h }) => (
    <Frame h={h}>
      {[0, 1].map((s) => {
        const x = s ? 540 - 22 : 0;
        return (
          <g key={s}>
            <rect x={x} y="0" width="22" height={h} fill={m("brass")} />
            <rect x={s ? x - 3 : 22} y="0" width="3" height={h} fill={TEAL} />
            {Array.from({ length: Math.ceil(h / 14) }, (_, i) => (
              <path
                key={i}
                d="M0 0 l4 -4 l4 4 l-4 4 Z"
                transform={`translate(${x + 7} ${i * 14 + 7})`}
                fill={ARAKKU}
                opacity="0.8"
              />
            ))}
          </g>
        );
      })}
    </Frame>
  ),
  // The pallu: teeth rising into a solid zari field with swans and mango buttas woven in red.
  Bottom: () => (
    <Scene>
      {Array.from({ length: 18 }, (_, i) => (
        <path
          key={i}
          d={tooth}
          transform={`translate(${i * 30 + 30} 196) rotate(180)`}
          fill={m("brass")}
        />
      ))}
      <rect x="0" y="196" width="540" height="144" fill={m("brass")} />
      {weave(196, 340)}
      <rect x="0" y="212" width="540" height="3" fill={TEAL} />
      <rect x="0" y="318" width="540" height="3" fill={TEAL} />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i} transform={`translate(${i * 46 + 4} ${236})`}>
          <path
            d={swan}
            fill={ARAKKU}
            transform={i % 2 ? "translate(30 0) scale(-1 1)" : undefined}
          />
        </g>
      ))}
      <path d="M0 266 H540 M0 270 H540" stroke={ARAKKU} strokeWidth="1" />
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={butta}
          transform={`translate(${i * 40 + 18} 280) scale(0.95)`}
          fill={ARAKKU}
        />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={i * 40 + 38} cy="294" r="2" fill={ARAKKU} />
      ))}
    </Scene>
  ),
  safe: {
    story: { top: 120, bottom: 182, x: 46 },
    print: { top: 98, bottom: 150, x: 40 },
  },
};

/* ------------------------------------------------------------------ */
/* Aaina: a jharokha arch built of hand-cut mirror facets on velvet.   */

const VELVET = "#1a0824";
const MIRROR = ["#5f6469", "#8e949b", "#b8bec5", "#d9dde2", "#f4f6f8"];

// Cut mirror reflects the room, so the shards carry its colours: the plum velvet, the gilt, the lamps.
// Mostly mid silver and plum, some gilt, a rare near-white glint.
const SHARDS = [
  "#4a2a5e", "#6b4a80", "#3a1d4c", "#8e949b", "#b8bec5", "#9a8fa8",
  "#c49f4d", "#8a6a2a", "#d9dde2", "#5f6469", "#7a5c8e", "#f8f4ff",
];
// A mosaic band between two parallel edges. Each cell is broken at an off-centre point into four shards of
// different size and angle, set in dark lead, the way hand-cut sheesh mahal glass never repeats.
function Mosaic({
  inner,
  outer,
  seed,
}: {
  inner: [number, number][];
  outer: [number, number][];
  seed: number;
}) {
  const pick = (k: number) => {
    const r = hash(k);
    return SHARDS[r > 0.97 ? 11 : Math.floor(hash(k * 7 + 3) * 11)];
  };
  return (
    <g stroke="#0c0410" strokeWidth="0.7" strokeLinejoin="round">
      {inner.slice(1).map((d, i) => {
        const a = inner[i];
        const b = outer[i];
        const c = outer[i + 1];
        const u = 0.2 + hash(seed + i * 5) * 0.6;
        const v = 0.2 + hash(seed + i * 5 + 1) * 0.6;
        const lerp = (p: [number, number], q: [number, number], t: number) =>
          [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t] as [number, number];
        const P = lerp(lerp(a, d, u), lerp(b, c, u), v);
        const quad = [a, b, c, d];
        return (
          <g key={i}>
            {quad.map((q, k) => {
              const r = quad[(k + 1) % 4];
              return (
                <polygon
                  key={k}
                  points={`${q.join(" ")} ${r.join(" ")} ${P.join(" ")}`}
                  fill={pick(seed * 31 + i * 4 + k)}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
const Glint = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <path
    d={`M${x} ${y - s} L${x + s * 0.18} ${y - s * 0.18} L${x + s} ${y} L${x + s * 0.18} ${y + s * 0.18} L${x} ${y + s} L${x - s * 0.18} ${y + s * 0.18} L${x - s} ${y} L${x - s * 0.18} ${y - s * 0.18} Z`}
    fill="#ffffff"
  />
);
// A sheesh mahal medallion: rounded mirror petals set in gilt plaster, each piece edged in dark lead,
// around a convex centre mirror. Rounded cuts and gold between them, so it reads as inlay, not frost.
function Rosette({
  x,
  y,
  r,
  seed,
}: {
  x: number;
  y: number;
  r: number;
  seed: number;
}) {
  const petal = (a: number, l: number, w: number) => {
    const [c, s] = [Math.cos(rad(a)), Math.sin(rad(a))];
    const tip = [x + c * l, y + s * l];
    const side = (k: number) => [
      x + c * l * 0.45 - s * w * k,
      y + s * l * 0.45 + c * w * k,
    ];
    const [l1, l2] = [side(1), side(-1)];
    return `M${x + c * r * 0.3} ${y + s * r * 0.3} Q${l1[0]} ${l1[1]} ${tip[0]} ${tip[1]} Q${l2[0]} ${l2[1]} ${x + c * r * 0.3} ${y + s * r * 0.3} Z`;
  };
  return (
    <g stroke="#0c0410" strokeWidth={Math.max(0.6, r * 0.05)}>
      <circle cx={x} cy={y} r={r * 1.18} fill={m("gold")} />
      {ring(8, (a, i) => (
        <path
          key={i}
          d={petal(a - 90, r * 1.05, r * 0.42)}
          fill={MIRROR[1 + Math.floor(hash(seed + i) * 4)]}
        />
      ))}
      {ring(8, (a, i) => (
        <circle
          key={`d${i}`}
          cx={x + Math.cos(rad(a - 67.5)) * r * 0.86}
          cy={y + Math.sin(rad(a - 67.5)) * r * 0.86}
          r={r * 0.13}
          fill={MIRROR[Math.floor(hash(seed + i + 9) * 3)]}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.34} fill={MIRROR[2]} />
      <path
        d={`M${x - r * 0.2} ${y - r * 0.08} A${r * 0.22} ${r * 0.22} 0 0 1 ${x + r * 0.06} ${y - r * 0.22}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth={Math.max(0.6, r * 0.06)}
        strokeLinecap="round"
      />
    </g>
  );
}

function Jharokha({ h }: { h: number }) {
  // Centre line of the left half of the arch: an ogee from the spring point to a pointed apex.
  const B: [number, number][] = [
    [31, 250],
    [31, 150],
    [170, 142],
    [270, 58],
  ];
  const at = (t: number): [number, number] => {
    const u = 1 - t;
    const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    return [
      k.reduce((s, w, i) => s + w * B[i][0], 0),
      k.reduce((s, w, i) => s + w * B[i][1], 0),
    ];
  };
  const N = 34;
  const W = 15;
  const pts = Array.from({ length: N + 1 }, (_, i) => at(i / N));
  const off = (sign: number) =>
    pts.map((p, i) => {
      const q = pts[Math.min(i + 1, N)];
      const o = pts[Math.max(i - 1, 0)];
      const dx = q[0] - o[0];
      const dy = q[1] - o[1];
      const l = Math.hypot(dx, dy);
      return [
        +(p[0] + (dy / l) * W * sign).toFixed(1),
        +(p[1] - (dx / l) * W * sign).toFixed(1),
      ] as [number, number];
    });
  const archIn = off(-1);
  const archOut = off(1);
  // Straight jambs from the spring point down to the sill.
  const rows = Math.max(4, Math.round((h - 64 - 250) / 16));
  const jambIn = Array.from(
    { length: rows + 1 },
    (_, i) => [46, 250 + ((h - 64 - 250) * i) / rows] as [number, number],
  );
  const jambOut = jambIn.map(([, y]) => [16, y] as [number, number]);
  const sillIn = Array.from(
    { length: 33 },
    (_, i) => [16 + (508 * i) / 32, h - 64] as [number, number],
  );
  const sillOut = sillIn.map(([x]) => [x, h - 16] as [number, number]);
  const mirror = (ps: [number, number][]) =>
    ps.map(([x, y]) => [540 - x, y] as [number, number]);
  const edge = (ps: [number, number][]) =>
    `M${ps.map((p) => p.join(" ")).join(" L")}`;
  return (
    <g>
      <Mosaic inner={archIn} outer={archOut} seed={1} />
      <Mosaic inner={mirror(archIn)} outer={mirror(archOut)} seed={101} />
      <Mosaic inner={jambIn} outer={jambOut} seed={201} />
      <Mosaic inner={mirror(jambIn)} outer={mirror(jambOut)} seed={301} />
      <Mosaic inner={sillIn} outer={sillOut} seed={401} />
      {[archIn, archOut, mirror(archIn), mirror(archOut)].map((e, i) => (
        <path
          key={i}
          d={edge(e)}
          fill="none"
          stroke={m("silver")}
          strokeWidth="1.3"
        />
      ))}
      <path
        d={`M46 250 V${h - 64} H494 V250 M16 250 V${h - 16} H524 V250`}
        fill="none"
        stroke={m("silver")}
        strokeWidth="1.3"
      />
      {/* spandrels and apex */}
      <Rosette x={64} y={74} r={18} seed={11} />
      <Rosette x={476} y={74} r={18} seed={21} />
      <Rosette x={120} y={44} r={10} seed={31} />
      <Rosette x={420} y={44} r={10} seed={41} />
      <Rosette x={30} y={140} r={9} seed={51} />
      <Rosette x={510} y={140} r={9} seed={61} />
      <path d="M270 12 L275 21 L270 30 L265 21 Z" fill={m("silver")} />
      <Rosette x={270} y={38} r={7} seed={71} />
      {[
        [86, 175, 7],
        [454, 175, 7],
        [270, 64, 9],
        [31, 420, 6],
        [509, 560, 6],
        [180, 720 * (h / 960), 5],
        [380, h - 40, 7],
        [140, h - 40, 5],
      ].map(([x, y, s], i) => (
        <Glint key={i} x={x} y={y} s={s} />
      ))}
    </g>
  );
}

const aaina: Design = {
  id: "aaina",
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 40%,#3c2052 0%,#230f31 58%,#0d0318 100%)`,
  colors: {
    title: "#e8ecf1",
    heading: "#dbe2e9",
    text: "#f0ecf5",
    accent: "#b9c3cd",
    muted: "#c6bcd0",
    names: "#e8ecf1",
  },
  fonts: {
    title: '"Bodoni Moda"',
    heading: '"Bodoni Moda"',
    body: cormorant,
    names: '"Bodoni Moda"',
  },
  script: SCRIPT,
  type: { title: 2.5 },
  press: VELVET_PRESS,
  Top: () => null,
  Overlay: ({ h }) => (
    <Frame h={h}>
      <Jharokha h={h} />
    </Frame>
  ),
  Bottom: () => null,
  safe: {
    story: { top: 126, bottom: 78, x: 60 },
    print: { top: 104, bottom: 64, x: 52 },
  },
};

/* ------------------------------------------------------------------ */
/* Mehndi Jaal: a henna mandala drawn line by line in three weights,  */
/* rising from the top and bottom edges, copper hairline frame.       */

const HENNA = "#7a3b1c";

function Mandala({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      fill="none"
      stroke={HENNA}
      strokeLinecap="round"
    >
      <circle r="10" strokeWidth="2.2" />
      <circle r="3" fill={HENNA} stroke="none" />
      {ring(8, (a, i) => (
        <path
          key={i}
          d="M12 0 C18 -6 26 -4 30 0 C26 4 18 6 12 0 Z"
          transform={`rotate(${a})`}
          strokeWidth="1.3"
        />
      ))}
      <circle r="36" strokeWidth="2.2" />
      {ring(60, (a, i) => (
        <circle
          key={i}
          cx={Math.cos(rad(a)) * 42}
          cy={Math.sin(rad(a)) * 42}
          r="1.1"
          fill={HENNA}
          stroke="none"
        />
      ))}
      {ring(12, (a, i) => (
        <g key={i} transform={`rotate(${a})`}>
          <path
            d="M48 0 C68 -20 96 -14 108 0 C96 14 68 20 48 0 Z"
            strokeWidth="2.2"
            fill="#e7b293"
            fillOpacity="0.45"
          />
          <path
            d="M58 0 C72 -10 90 -8 98 0 C90 8 72 10 58 0 Z"
            strokeWidth="1.3"
          />
          <path d="M62 0 H94" strokeWidth="0.7" />
          {[66, 72, 78, 84, 90].map((r) => (
            <path
              key={r}
              d={`M${r} -${(r - 58) * 0.28} V${(r - 58) * 0.28}`}
              strokeWidth="0.7"
            />
          ))}
        </g>
      ))}
      {ring(12, (a, i) => (
        <path
          key={i}
          d="M44 0 Q76 -26 106 -10"
          transform={`rotate(${a + 15})`}
          strokeWidth="0.7"
        />
      ))}
      <circle r="114" strokeWidth="2.2" />
      <circle r="120" strokeWidth="0.7" />
      {ring(24, (a, i) => (
        <g key={i} transform={`rotate(${a})`}>
          <path
            d="M126 0 C136 -11 156 -9 162 0 C156 9 136 11 126 0 Z"
            strokeWidth="1.3"
            fill="#e7b293"
            fillOpacity="0.35"
          />
          <circle cx="142" r="2" fill={HENNA} stroke="none" />
        </g>
      ))}
      {ring(72, (a, i) => (
        <path
          key={i}
          d="M164 0 H172"
          transform={`rotate(${a + 2.5})`}
          strokeWidth="0.7"
        />
      ))}
      {ring(36, (a, i) => (
        <path
          key={i}
          d={`M${Math.cos(rad(a)) * 172} ${Math.sin(rad(a)) * 172} A9 9 0 0 1 ${Math.cos(rad(a + 10)) * 172} ${Math.sin(rad(a + 10)) * 172}`}
          strokeWidth="2.2"
        />
      ))}
      {ring(36, (a, i) => (
        <g key={i} fill={HENNA} stroke="none">
          <circle
            cx={Math.cos(rad(a + 5)) * 190}
            cy={Math.sin(rad(a + 5)) * 190}
            r="2.2"
          />
          <circle
            cx={Math.cos(rad(a + 5)) * 199}
            cy={Math.sin(rad(a + 5)) * 199}
            r="1.2"
          />
        </g>
      ))}
    </g>
  );
}

const mehndiJaal: Design = {
  id: "mehndi-jaal",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 45%,#fbede4 0%,#f7dfd1 60%,#eecbb8 100%)`,
  colors: {
    title: "#6b2f0c",
    heading: "#4d2d0a",
    text: "#2e2019",
    accent: "#8e5949",
    muted: "#645147",
    names: "#5e2a08",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Gloock"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 3, names: 2.3, body: 0.95 },
  press: PAPER_PRESS,
  cover: { emblem: false, flourish: false },
  Top: () => (
    <Svg h={196}>
      <Mandala x={270} y={-14} s={1} />
    </Svg>
  ),
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect
        x="14"
        y="14"
        width="512"
        height={h - 28}
        fill="none"
        stroke={m("copper")}
        strokeWidth="1"
      />
      {[0, 1].map((s) =>
        Array.from({ length: Math.floor((h - 40) / 9) }, (_, i) => (
          <circle
            key={`${s}-${i}`}
            cx={s ? 520 : 20}
            cy={20 + i * 9}
            r="0.9"
            fill={HENNA}
          />
        )),
      )}
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <Mandala x={270} y={356} s={0.72} />
    </Scene>
  ),
  safe: {
    story: { top: 196, bottom: 160, x: 50 },
    print: { top: 164, bottom: 132, x: 42 },
  },
};

/* ------------------------------------------------------------------ */
/* Thipka: a Maharashtrian dot rangoli in kumkum, haldi and leaf green */
/* poured over its own dot grid, half risen from the bottom edge.      */

const KUMKUM = "#b0172b";
const HALDI = "#e3a01a";
const LEAF = "#2f5f2a";
const MARIGOLD = "#e2721b";

function Rangoli({ x, y }: { x: number; y: number }) {
  const dot = (a: number, r: number, k: number, c: string, s = 2.2) => (
    <circle
      key={k}
      cx={Math.cos(rad(a)) * r}
      cy={Math.sin(rad(a)) * r}
      r={s}
      fill={c}
    />
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* the thipka grid the pattern is drawn on */}
      {Array.from({ length: 23 }, (_, i) =>
        Array.from({ length: 23 }, (_, j) => {
          const px = (i - 11) * 18;
          const py = (j - 11) * 18;
          return Math.hypot(px, py) < 205 ? (
            <circle
              key={`${i}-${j}`}
              cx={px}
              cy={py}
              r="1.1"
              fill="#8a6d3f"
              opacity="0.45"
            />
          ) : null;
        }),
      )}
      {ring(16, (a, i) => (
        <path
          key={i}
          d="M108 0 C126 -16 150 -12 162 0 C150 12 126 16 108 0 Z"
          transform={`rotate(${a + 11.25})`}
          fill={i % 2 ? HALDI : MARIGOLD}
        />
      ))}
      {ring(16, (a, i) => (
        <path
          key={i}
          d="M118 0 C130 -6 144 -5 150 0 C144 5 130 6 118 0 Z"
          transform={`rotate(${a + 11.25})`}
          fill={LEAF}
        />
      ))}
      {ring(8, (a, i) => (
        <g key={i} transform={`rotate(${a})`}>
          <path
            d="M34 0 C56 -34 92 -28 110 0 C92 28 56 34 34 0 Z"
            fill={KUMKUM}
          />
          <path
            d="M48 0 C62 -14 82 -12 94 0 C82 12 62 14 48 0 Z"
            fill={HALDI}
          />
          <circle cx="70" r="4" fill={KUMKUM} />
        </g>
      ))}
      {ring(8, (a, i) => (
        <path
          key={i}
          d="M40 0 C60 -10 80 -10 96 0 C80 10 60 10 40 0 Z"
          transform={`rotate(${a + 22.5})`}
          fill={LEAF}
          opacity="0.9"
        />
      ))}
      <circle r="34" fill={HALDI} />
      <circle r="22" fill={KUMKUM} />
      <circle r="9" fill={HALDI} />
      {ring(16, (a, i) => dot(a, 28, i, "#fffaf0", 1.8))}
      {ring(48, (a, i) => dot(a, 172, i, i % 2 ? KUMKUM : HALDI, 2.6))}
      {ring(48, (a, i) => dot(a + 3.75, 182, i, LEAF, 1.6))}
      {ring(24, (a, i) => (
        <g key={i} transform={`rotate(${a})`}>
          <circle cx="194" r="3.4" fill={KUMKUM} />
          <circle cx="204" r="2" fill={HALDI} />
          <circle cx="211" r="1.2" fill={KUMKUM} />
        </g>
      ))}
      {/* powder scatter at every petal edge */}
      {Array.from({ length: 260 }, (_, i) => {
        const a = hash(i) * 360;
        const r = 30 + hash(i + 999) * 160;
        return (
          <circle
            key={`p${i}`}
            cx={Math.cos(rad(a)) * r}
            cy={Math.sin(rad(a)) * r}
            r={0.5 + hash(i + 77) * 0.7}
            fill={[KUMKUM, HALDI, "#fffaf0"][i % 3]}
            opacity="0.55"
          />
        );
      })}
    </g>
  );
}

const thipka: Design = {
  id: "thipka",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 38%,#fdf7e6 0%,#f7ebcc 60%,#eedcb0 100%)`,
  colors: {
    title: "#8a0018",
    heading: "#542524",
    text: "#2a2316",
    accent: "#985521",
    muted: "#5d5442",
    names: "#7c0015",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Jost"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.6 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  // A border of small four-petal dot motifs, the way a rangoli edge is laid along a threshold.
  Top: () => (
    <Svg h={70}>
      <path d="M0 14 H540" stroke={KUMKUM} strokeWidth="2.4" />
      <path d="M0 20 H540" stroke={HALDI} strokeWidth="1.4" />
      {Array.from({ length: 15 }, (_, i) => {
        const cx = 18 + i * 36;
        return (
          <g key={i} transform={`translate(${cx} 40)`}>
            {ring(4, (a, k) => (
              <path
                key={k}
                d="M3 0 C6 -6 12 -6 14 0 C12 6 6 6 3 0 Z"
                transform={`rotate(${a + 45})`}
                fill={k % 2 ? HALDI : KUMKUM}
              />
            ))}
            <circle r="2.4" fill={LEAF} />
            <circle cx="18" r="1.6" fill={LEAF} />
          </g>
        );
      })}
      {Array.from({ length: 54 }, (_, i) => (
        <circle
          key={i}
          cx={5 + i * 10}
          cy="60"
          r="1.4"
          fill={i % 2 ? KUMKUM : HALDI}
        />
      ))}
    </Svg>
  ),
  Bottom: () => (
    <Scene>
      <Rangoli x={270} y={366} />
    </Scene>
  ),
  safe: {
    story: { top: 84, bottom: 176, x: 46 },
    print: { top: 68, bottom: 150, x: 38 },
  },
};

export const designs: Design[] = [harmandir, korvai, aaina, mehndiJaal, thipka];

export const templates: Template[] = [
  {
    id: "harmandir-gold-leaf",
    name: "Harmandir Gold Leaf",
    design: "harmandir",
    lang: "pa",
    symbol: "ek-onkar",
    event: "wedding",
  },
  {
    id: "korvai-silk",
    name: "Korvai Silk Zari",
    design: "korvai",
    lang: "ta",
    symbol: "balaji",
    event: "wedding",
  },
  {
    id: "aaina-mahal",
    name: "Aaina Mahal Mirror Work",
    design: "aaina",
    lang: "hi",
    symbol: "ganesha",
    event: "reception",
  },
  {
    id: "mehndi-jaal",
    name: "Mehndi Jaal Henna Lace",
    design: "mehndi-jaal",
    lang: "en",
    symbol: "floral",
    event: "mehendi",
  },
  {
    id: "thipka-rangoli",
    name: "Thipka Rangoli Haldi",
    design: "thipka",
    lang: "mr",
    symbol: "ganesha",
    event: "haldi",
  },
];
