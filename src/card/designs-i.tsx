import type { ReactNode } from "react";
import type { Design } from "./designs";
import type { Template } from "../templates";
import { GRAIN, GRAIN_LIGHT, VIGNETTE } from "./luxe";
import {
  Frame,
  PAPER_PRESS,
  SCRIPT,
  Scene,
  Svg,
  VELVET_PRESS,
  cormorant,
  field,
  hash,
  m,
  rad,
  ring,
} from "./designs-h";

// The luxury set, second part: Gujarat, Rajasthan, Nathdwara and Maharashtra textiles and crafts.

/* ------------------------------------------------------------------ */
/* Patola: Patan double-ikat, stepped diamonds with feathered edges.   */

const P_RED = "#b3121f";
const P_INK = "#1c1414";
const P_SAFFRON = "#e8a33a";
const P_GREEN = "#4f9a62";

// One ikat diamond: rows of bars that shift a little, the way resist-dyed threads never quite line up.
function IkatDiamond({
  x,
  y,
  n,
  u,
  fill,
  seed,
}: {
  x: number;
  y: number;
  n: number;
  u: number;
  fill: string;
  seed: number;
}) {
  return (
    <g fill={fill}>
      {Array.from({ length: n * 2 - 1 }, (_, i) => {
        const r = i - (n - 1);
        const w = (n - Math.abs(r)) * u * 2 - u;
        const j = (hash(seed + i) - 0.5) * u * 0.9;
        return (
          <rect
            key={i}
            x={x - w / 2 + j}
            y={y + r * u - u / 2}
            width={w}
            height={u * 0.92}
          />
        );
      })}
    </g>
  );
}

function PatolaBand({ y, h, seed }: { y: number; h: number; seed: number }) {
  const cell = h - 24;
  const cols = Math.ceil(540 / cell) + 1;
  const x0 = (540 - (cols - 1) * cell) / 2;
  return (
    <g>
      <rect x="0" y={y} width="540" height={h} fill={P_RED} />
      {Array.from({ length: cols }, (_, i) => {
        const cx = x0 + i * cell;
        const cy = y + h / 2;
        return (
          <g key={i}>
            <IkatDiamond
              x={cx}
              y={cy}
              n={9}
              u={cell / 18}
              fill={P_INK}
              seed={seed + i * 20}
            />
            <IkatDiamond
              x={cx}
              y={cy}
              n={6}
              u={cell / 18}
              fill={i % 2 ? P_SAFFRON : "#fbf5ea"}
              seed={seed + i * 20 + 9}
            />
            <IkatDiamond
              x={cx}
              y={cy}
              n={3}
              u={cell / 18}
              fill={i % 2 ? P_INK : P_GREEN}
              seed={seed + i * 20 + 15}
            />
            <IkatDiamond
              x={cx + cell / 2}
              y={cy}
              n={3}
              u={cell / 18}
              fill="#fbf5ea"
              seed={seed + i * 20 + 18}
            />
          </g>
        );
      })}
      {/* chevron selvedge on both edges */}
      {[y, y + h - 8].map((yy, k) => (
        <g key={k}>
          <rect x="0" y={yy} width="540" height="8" fill={P_INK} />
          {Array.from({ length: 54 }, (_, i) => (
            <path
              key={i}
              d={`M${i * 10} ${yy + 6} l5 -4 l5 4`}
              fill="none"
              stroke="#fbf5ea"
              strokeWidth="1.2"
            />
          ))}
        </g>
      ))}
    </g>
  );
}

const patola: Design = {
  id: "patola",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 45%,#fbf5ea 0%,#f4e9d4 60%,#e9d8b8 100%)`,
  colors: {
    title: "#2a1210",
    heading: "#4a1a17",
    text: "#2a1f17",
    accent: "#8a6418",
    muted: "#5e5040",
    names: "#8c0f1d",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Jost"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.5 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={108}>
      <PatolaBand y={0} h={96} seed={3} />
    </Svg>
  ),
  Bottom: () => (
    <Scene>
      <PatolaBand y={210} h={130} seed={7} />
      <path d="M40 196 H500" stroke={P_RED} strokeWidth="1" />
      <IkatDiamond x={270} y={196} n={3} u={4} fill={P_RED} seed={1} />
    </Scene>
  ),
  // The sari itself: a faint ikat ground and patola borders down both sides, so the words sit inside the cloth.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <g opacity="0.09">
        {field(h, 56, (x, y, i) => (
          <IkatDiamond key={i} x={x} y={y} n={3} u={4} fill={P_RED} seed={i} />
        ))}
      </g>
      {[0, 516].map((x0) => (
        <g key={x0}>
          <rect x={x0} y="0" width="24" height={h} fill={P_RED} />
          <path d={`M${x0 + 1} 0 V${h} M${x0 + 23} 0 V${h}`} stroke={P_INK} strokeWidth="2" />
          {Array.from({ length: Math.ceil(h / 22) }, (_, i) => (
            <IkatDiamond
              key={i}
              x={x0 + 12}
              y={11 + i * 22}
              n={3}
              u={2.6}
              fill={i % 2 ? P_SAFFRON : "#fbf5ea"}
              seed={x0 + i}
            />
          ))}
        </g>
      ))}
    </Frame>
  ),
  safe: {
    story: { top: 130, bottom: 160, x: 50 },
    print: { top: 104, bottom: 130, x: 44 },
  },
};

/* ------------------------------------------------------------------ */
/* Jain manuscript: a Kalpasutra page, ultramarine and vermilion       */
/* borders, gold lotus roundels and a pair of auspicious elephants.    */

const ULTRA = "#2a3d9e";
const VERMILION = "#c8361f";
const elephant =
  "M6 40 V24 C6 12 16 4 30 4 C40 4 47 8 51 14 C55 19 58 25 58 33 C58 37 56 40 53 40 C53 35 52 30 50 28 L49 40 H43 V31 H19 V40 H13 V31 C10 32 7 36 6 40 Z";

const Lotus = ({
  x,
  y,
  r,
  fill,
  eye,
}: {
  x: number;
  y: number;
  r: number;
  fill: string;
  eye: string;
}) => (
  <g transform={`translate(${x} ${y})`}>
    {ring(8, (a, i) => (
      <path
        key={i}
        d={`M0 0 C${r * 0.3} ${-r * 0.35} ${r * 0.75} ${-r * 0.3} ${r} 0 C${r * 0.75} ${r * 0.3} ${r * 0.3} ${r * 0.35} 0 0 Z`}
        transform={`rotate(${a})`}
        fill={fill}
      />
    ))}
    <circle r={r * 0.28} fill={eye} />
  </g>
);

function Vine({
  x0,
  x1,
  y,
  fill,
}: {
  x0: number;
  x1: number;
  y: number;
  fill: string;
}) {
  const n = Math.floor((x1 - x0) / 24);
  return (
    <g>
      <path
        d={Array.from(
          { length: n },
          (_, i) => `${i ? "" : `M${x0} ${y}`} q6 -8 12 0 q6 8 12 0`,
        ).join(" ")}
        fill="none"
        stroke={fill}
        strokeWidth="1.1"
      />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <ellipse
            cx={x0 + i * 24 + 6}
            cy={y - 7}
            rx="3"
            ry="1.5"
            fill={fill}
            transform={`rotate(-30 ${x0 + i * 24 + 6} ${y - 7})`}
          />
          <ellipse
            cx={x0 + i * 24 + 18}
            cy={y + 7}
            rx="3"
            ry="1.5"
            fill={fill}
            transform={`rotate(-30 ${x0 + i * 24 + 18} ${y + 7})`}
          />
        </g>
      ))}
    </g>
  );
}

const jain: Design = {
  id: "jain-manuscript",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 45%,#fbf6ec 0%,#f3e8d2 60%,#e8d6b4 100%)`,
  colors: {
    title: "#1d2f80",
    heading: "#23264a",
    text: "#2a2218",
    accent: "#8a6418",
    muted: "#5c5040",
    names: "#9a2a14",
  },
  fonts: {
    title: '"Cinzel"',
    heading: '"Cinzel"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.2 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={96}>
      <rect x="0" y="0" width="540" height="76" fill={ULTRA} />
      <rect x="0" y="76" width="540" height="6" fill={VERMILION} />
      <Vine x0={20} x1={520} y={38} fill={m("leaf")} />
      {[90, 270, 450].map((x) => (
        <g key={x}>
          <circle cx={x} cy="38" r="26" fill={VERMILION} />
          <circle
            cx={x}
            cy="38"
            r="26"
            fill="none"
            stroke={m("gold")}
            strokeWidth="2"
          />
          <Lotus x={x} y={38} r={20} fill={m("gold")} eye={VERMILION} />
        </g>
      ))}
    </Svg>
  ),
  Overlay: ({ h }) => (
    <Frame h={h}>
      {[0, 1].map((s) => {
        const x = s ? 540 - 20 : 0;
        return (
          <g key={s}>
            <rect x={x} y="0" width="20" height={h} fill={ULTRA} />
            <rect
              x={s ? x - 4 : 20}
              y="0"
              width="4"
              height={h}
              fill={VERMILION}
            />
            {Array.from({ length: Math.floor(h / 18) }, (_, i) => (
              <circle
                key={i}
                cx={x + 10}
                cy={i * 18 + 9}
                r="2.4"
                fill={m("gold")}
              />
            ))}
          </g>
        );
      })}
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <rect x="0" y="232" width="540" height="6" fill={VERMILION} />
      <rect x="0" y="238" width="540" height="102" fill={ULTRA} />
      <Vine x0={20} x1={520} y={326} fill={m("leaf")} />
      {[0, 1].map((s) => (
        <g key={s} transform={s ? "translate(540 0) scale(-1 1)" : undefined}>
          <g transform="translate(120 252) scale(1.15)">
            <path d={elephant} fill="#fbf6ec" />
            <path d="M18 14 H44 V30 H18 Z" fill={VERMILION} />
            <path d="M18 14 H44" stroke={m("gold")} strokeWidth="1.6" />
            <circle cx="46" cy="14" r="1.4" fill={P_INK} />
          </g>
        </g>
      ))}
      <circle cx="270" cy="282" r="30" fill={VERMILION} />
      <circle
        cx="270"
        cy="282"
        r="30"
        fill="none"
        stroke={m("gold")}
        strokeWidth="2"
      />
      <Lotus x={270} y={282} r={24} fill={m("gold")} eye={VERMILION} />
    </Scene>
  ),
  safe: {
    story: { top: 116, bottom: 124, x: 50 },
    print: { top: 94, bottom: 100, x: 42 },
  },
};

/* ------------------------------------------------------------------ */
/* Pithi: saffron bandhani panels with tied-dot medallions and mirror  */
/* (abhla) discs, scalloped into a turmeric-cream page.                */

const BANDHANI = "#e07a10";
const B_RED = "#b0122e";

function Bandhani({
  y,
  h,
  edge,
}: {
  y: number;
  h: number;
  edge: "top" | "bottom";
}) {
  const sc = Array.from({ length: 19 }, (_, i) => {
    const x = i * 30;
    return edge === "bottom"
      ? `Q${x + 15} ${y + h + 14} ${x + 30} ${y + h}`
      : `Q${x + 15} ${y - 14} ${x + 30} ${y}`;
  }).join(" ");
  const medallions = [70, 190, 350, 470].map((x) => [x, y + h / 2] as const);
  return (
    <g>
      <rect x="0" y={y} width="540" height={h} fill={BANDHANI} />
      <path d={`M0 ${edge === "bottom" ? y + h : y} ${sc}`} fill={BANDHANI} />
      {/* the all-over tied dot ground */}
      {Array.from({ length: Math.floor(h / 10) }, (_, r) =>
        Array.from({ length: 54 }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * 10 + (r % 2 ? 5 : 0) + 2}
            cy={y + 5 + r * 10}
            r="1.1"
            fill="#fff6e6"
            opacity="0.85"
          />
        )),
      )}
      {medallions.map(([x, yy], k) => (
        <g key={k}>
          <circle cx={x} cy={yy} r={h * 0.36} fill={B_RED} />
          {ring(16, (a, i) => (
            <circle
              key={i}
              cx={x + Math.cos(rad(a)) * h * 0.3}
              cy={yy + Math.sin(rad(a)) * h * 0.3}
              r="1.8"
              fill="#fff6e6"
            />
          ))}
          {ring(10, (a, i) => (
            <circle
              key={i}
              cx={x + Math.cos(rad(a)) * h * 0.19}
              cy={yy + Math.sin(rad(a)) * h * 0.19}
              r="1.5"
              fill="#fff6e6"
            />
          ))}
          <circle
            cx={x}
            cy={yy}
            r={h * 0.1}
            fill={m("silver")}
            stroke="#5f6469"
            strokeWidth="0.6"
          />
          <circle
            cx={x}
            cy={yy}
            r={h * 0.13}
            fill="none"
            stroke="#fff6e6"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </g>
      ))}
      {[130, 270, 410].map((x) => (
        <g key={x}>
          <circle
            cx={x}
            cy={y + h / 2}
            r="7"
            fill={m("silver")}
            stroke="#5f6469"
            strokeWidth="0.6"
          />
          {ring(8, (a, i) => (
            <path
              key={i}
              d="M9 0 l4 -2 l0 4 Z"
              transform={`translate(${x} ${y + h / 2}) rotate(${a})`}
              fill={B_RED}
            />
          ))}
        </g>
      ))}
    </g>
  );
}

const pithi: Design = {
  id: "pithi-bandhani",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 48%,#fdf6e0 0%,#f8e9c2 60%,#efd9a4 100%)`,
  colors: {
    title: "#1d4a2c",
    heading: "#2c3a22",
    text: "#2c1e1a",
    accent: "#6a7078",
    muted: "#5a5236",
    names: "#8a0d26",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Marcellus"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.6 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={132}>
      <Bandhani y={0} h={110} edge="bottom" />
    </Svg>
  ),
  Bottom: () => (
    <Scene>
      <Bandhani y={236} h={104} edge="top" />
    </Scene>
  ),
  // The tie-dyed ground carries on behind the words: chaubundi, four tied dots to a diamond.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <g fill={B_RED} opacity="0.2">
        {field(h, 34, (x, y, i) => (
          <g key={i}>
            {[[0, -3.4], [3.4, 0], [0, 3.4], [-3.4, 0]].map(([dx, dy], k) => (
              <circle key={k} cx={x + dx} cy={y + dy} r="1.4" />
            ))}
          </g>
        ))}
      </g>
    </Frame>
  ),
  safe: {
    story: { top: 142, bottom: 124, x: 44 },
    print: { top: 116, bottom: 100, x: 38 },
  },
};

/* ------------------------------------------------------------------ */
/* Garbo: the perforated earthen lamp of Navratri glowing on an indigo */
/* night, its light thrown out as rings of dots.                       */

const GLOW = "#ff9a3c";

function Garbo() {
  const holes: ReactNode[] = [];
  for (let r = 0; r < 6; r++) {
    const y = 236 + r * 16;
    const half = [44, 62, 72, 74, 68, 54][r];
    const n = Math.floor(half / 9);
    for (let i = -n; i <= n; i++) {
      const x = 270 + i * (half / n) * 0.92;
      holes.push(
        r % 2 ? (
          <path
            key={`${r}-${i}`}
            d={`M${x} ${y - 5} L${x + 4} ${y + 4} L${x - 4} ${y + 4} Z`}
            fill="url(#g-hole)"
          />
        ) : (
          <circle key={`${r}-${i}`} cx={x} cy={y} r="3.6" fill="url(#g-hole)" />
        ),
      );
    }
  }
  return (
    <g transform="translate(270 340) scale(1.22) translate(-270 -340)">
      <defs>
        <radialGradient id="g-glow">
          <stop offset="0" stopColor={GLOW} stopOpacity="0.55" />
          <stop offset="1" stopColor={GLOW} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g-hole">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="1" stopColor={GLOW} />
        </radialGradient>
      </defs>
      <circle cx="270" cy="270" r="150" fill="url(#g-glow)" />
      {ring(36, (a, i) => (
        <circle
          key={i}
          cx={270 + Math.cos(rad(a)) * (128 + (i % 2) * 14)}
          cy={270 + Math.sin(rad(a)) * (128 + (i % 2) * 14)}
          r={i % 2 ? 1.6 : 2.4}
          fill={GLOW}
          opacity="0.8"
        />
      ))}
      {ring(24, (a, i) => (
        <circle
          key={i}
          cx={270 + Math.cos(rad(a + 7)) * 172}
          cy={270 + Math.sin(rad(a + 7)) * 172}
          r="1.4"
          fill="#ffd9a8"
          opacity="0.6"
        />
      ))}
      {/* the pot */}
      <path
        d="M226 222 C188 244 186 316 222 336 H318 C354 316 352 244 314 222 Z"
        fill={m("copper")}
      />
      <path d="M232 206 H308 L314 222 H226 Z" fill={m("copper")} />
      <rect x="226" y="200" width="88" height="7" rx="3" fill={m("brass")} />
      <path
        d="M200 270 H340 M196 300 H344"
        stroke="#713e17"
        strokeWidth="0.8"
        opacity="0.6"
      />
      {holes}
      {/* the lamp on top */}
      <path
        d="M254 200 Q270 210 286 200 Q282 192 270 192 Q258 192 254 200 Z"
        fill={m("brass")}
      />
      <path
        d="M270 192 C262 182 264 168 270 156 C276 168 278 182 270 192 Z"
        fill={GLOW}
      />
      <path
        d="M270 190 C266 184 267 176 270 168 C273 176 274 184 270 190 Z"
        fill="#fff3c4"
      />
    </g>
  );
}

const garbo: Design = {
  id: "garbo",
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 40%,#2a1f5c 0%,#1a1340 58%,#0a0720 100%)`,
  colors: {
    title: "#ffb98a",
    heading: "#ffe6d6",
    text: "#f2eef8",
    accent: "#f5ab77",
    muted: "#c4bcd8",
    names: "#ffb98a",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Marcellus"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.7 },
  press: VELVET_PRESS,
  cover: { flourish: false },
  // Bunting of small copper triangles with mirror dots, strung across the top.
  Top: () => (
    <Svg h={64}>
      <path
        d="M0 10 Q135 30 270 12 Q405 30 540 10"
        fill="none"
        stroke={m("copper")}
        strokeWidth="1"
      />
      {Array.from({ length: 20 }, (_, i) => {
        const x = 14 + i * 27;
        const t = (x % 270) / 270;
        const y = 10 + Math.sin(t * Math.PI) * 10 + (x > 270 ? 1 : 1);
        return (
          <g key={i}>
            <path
              d={`M${x - 9} ${y} L${x + 9} ${y} L${x} ${y + 22} Z`}
              fill={i % 2 ? m("copper") : m("brass")}
            />
            <circle cx={x} cy={y + 7} r="2.2" fill={m("silver")} />
          </g>
        );
      })}
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
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <Garbo />
    </Scene>
  ),
  safe: {
    story: { top: 74, bottom: 196, x: 46 },
    print: { top: 60, bottom: 166, x: 40 },
  },
};

/* ------------------------------------------------------------------ */
/* Gota Patti: rose-gold ribbon leaves appliqued on rani-pink silk:    */
/* scalloped lace edges and sprays rising from the corners.            */

const RANI = "#8a1048";
const gotaLeaf = "M0 0 C6 -6 15 -6 22 0 C15 6 6 6 0 0 Z";

// A spray of gota leaves along a quadratic stem from (x0,y0) through (cx,cy) to (x1,y1).
function Spray({ p }: { p: [number, number, number, number, number, number] }) {
  const [x0, y0, cx, cy, x1, y1] = p;
  const at = (t: number) => [
    (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1,
    (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1,
  ];
  const tan = (t: number) =>
    Math.atan2(
      2 * (1 - t) * (cy - y0) + 2 * t * (y1 - cy),
      2 * (1 - t) * (cx - x0) + 2 * t * (x1 - cx),
    ) *
    (180 / Math.PI);
  return (
    <g>
      <path
        d={`M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}`}
        fill="none"
        stroke={m("rose")}
        strokeWidth="1.6"
      />
      {Array.from({ length: 14 }, (_, i) => {
        const t = 0.08 + i * 0.065;
        const [x, y] = at(t);
        const a = tan(t) + (i % 2 ? 50 : -50);
        const s = 1.25 - t * 0.6;
        return (
          <g
            key={i}
            transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}
          >
            <path d={gotaLeaf} fill={m("rose")} />
            <path d="M2 0 H20" stroke={RANI} strokeWidth="0.6" opacity="0.6" />
          </g>
        );
      })}
      {[0.3, 0.6, 0.9].map((t) => {
        const [x, y] = at(t);
        return (
          <g key={t} transform={`translate(${x} ${y})`}>
            {ring(6, (a, i) => (
              <path
                key={i}
                d="M0 0 C3 -4 8 -4 10 0 C8 4 3 4 0 0 Z"
                transform={`rotate(${a})`}
                fill={m("gold")}
              />
            ))}
            <circle r="2.4" fill="#f4f6f8" />
          </g>
        );
      })}
      <circle cx={x1} cy={y1} r="3" fill={m("rose")} />
    </g>
  );
}
const Scallops = ({ y, down }: { y: number; down: boolean }) => (
  <g>
    <rect
      x="0"
      y={down ? y - 12 : y}
      width="540"
      height="12"
      fill={m("rose")}
    />
    {Array.from({ length: 27 }, (_, i) => (
      <g key={i}>
        <path
          d={`M${i * 20} ${y} a10 10 0 0 ${down ? 0 : 1} 20 0`}
          fill={m("rose")}
        />
        <circle
          cx={i * 20 + 10}
          cy={down ? y + 5 : y - 5}
          r="1.6"
          fill={RANI}
        />
      </g>
    ))}
    <path
      d={`M0 ${down ? y - 6 : y + 6} H540`}
      stroke={RANI}
      strokeWidth="0.8"
      strokeDasharray="3 3"
    />
  </g>
);

const gota: Design = {
  id: "gota-patti",
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 42%,#9c1452 0%,${RANI} 58%,#5a0a30 100%)`,
  colors: {
    title: "#ffe3b8",
    heading: "#fee5dd",
    text: "#f8eef3",
    accent: "#e9ae9b",
    muted: "#dcbccb",
    names: "#f7baa7",
  },
  fonts: {
    title: '"Bodoni Moda"',
    heading: '"Marcellus"',
    body: cormorant,
    names: '"Bodoni Moda"',
  },
  script: SCRIPT,
  type: { title: 2.4, names: 2.2 },
  press: VELVET_PRESS,
  Top: () => (
    <Svg h={150}>
      <Scallops y={12} down={true} />
      <Spray p={[0, 30, 40, 110, 150, 120]} />
      <Spray p={[540, 30, 500, 110, 390, 120]} />
    </Svg>
  ),
  Bottom: () => (
    <Scene>
      <Spray p={[0, 330, 30, 210, 170, 200]} />
      <Spray p={[540, 330, 510, 210, 370, 200]} />
      <Scallops y={328} down={false} />
    </Scene>
  ),
  safe: {
    story: { top: 124, bottom: 128, x: 44 },
    print: { top: 100, bottom: 104, x: 38 },
  },
};

/* ------------------------------------------------------------------ */
/* Pichhwai: the Nathdwara lotus pond painted on cloth, pink lotuses  */
/* and broad leaves standing out of deep blue water.                   */

const LOTUS = "#d9628e";
const LOTUS_IN = "#f3b6cb";
const POND = "#2a4f8a";
const LEAF_G = "#4f8a55";

function Flower({ x, y, s }: { x: number; y: number; s: number }) {
  const petal = "M0 0 C-9 -14 -7 -32 0 -42 C7 -32 9 -14 0 0 Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 V60" stroke="#2f5f2a" strokeWidth="3" />
      {[-70, -45, 45, 70].map((a) => (
        <path
          key={a}
          d={petal}
          transform={`rotate(${a})`}
          fill={LOTUS}
          stroke="#8a1449"
          strokeWidth="0.6"
        />
      ))}
      {[-22, 22].map((a) => (
        <path
          key={a}
          d={petal}
          transform={`rotate(${a}) scale(0.95)`}
          fill={LOTUS_IN}
          stroke="#8a1449"
          strokeWidth="0.6"
        />
      ))}
      <path
        d={petal}
        transform="scale(1.05)"
        fill={LOTUS}
        stroke="#8a1449"
        strokeWidth="0.6"
      />
      <path d="M0 -6 V-34" stroke="#8a1449" strokeWidth="0.5" />
      <ellipse cx="0" cy="-2" rx="9" ry="4" fill={m("leaf")} />
    </g>
  );
}
const Bud = ({
  x,
  y,
  s,
  r,
}: {
  x: number;
  y: number;
  s: number;
  r: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M0 0 V50" stroke="#2f5f2a" strokeWidth="2.5" />
    <path
      d="M0 0 C-10 -12 -8 -26 0 -34 C8 -26 10 -12 0 0 Z"
      fill={LOTUS}
      stroke="#8a1449"
      strokeWidth="0.6"
    />
  </g>
);
const Pad = ({
  x,
  y,
  rx,
  ry,
}: {
  x: number;
  y: number;
  rx: number;
  ry: number;
}) => (
  <g>
    <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={LEAF_G} />
    <ellipse cx={x} cy={y - 1.5} rx={rx * 0.92} ry={ry * 0.8} fill="#6aa66a" />
    {ring(14, (a, i) => (
      <path
        key={i}
        d={`M${x} ${y} L${x + Math.cos(rad(a)) * rx * 0.9} ${y + Math.sin(rad(a)) * ry * 0.75}`}
        stroke={LEAF_G}
        strokeWidth="0.7"
      />
    ))}
    <path
      d={`M${x} ${y} L${x + rx * 0.95} ${y - ry * 0.15} L${x + rx * 0.9} ${y + ry * 0.2} Z`}
      fill={POND}
    />
  </g>
);

const pichhwai: Design = {
  id: "pichhwai",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 40%,#f1f5ea 0%,#e5ecd9 60%,#d4dfc4 100%)`,
  colors: {
    title: "#8a1449",
    heading: "#24402f",
    text: "#1f2620",
    accent: "#7a6420",
    muted: "#4d5a4a",
    names: "#7a1040",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Marcellus"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.5, names: 2.3 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  // A hanging garland of lotus buds and gold beads, as on a pichhwai's top border.
  Top: () => (
    <Svg h={84}>
      <rect x="0" y="0" width="540" height="14" fill={POND} />
      <path d="M0 14 H540" stroke={m("leaf")} strokeWidth="2" />
      {Array.from({ length: 13 }, (_, i) => {
        const x = 20 + i * 41.6;
        const len = 22 + (i % 2) * 14;
        return (
          <g key={i}>
            <path
              d={`M${x} 16 V${16 + len}`}
              stroke={m("leaf")}
              strokeWidth="1"
            />
            {[0.33, 0.66].map((t) => (
              <circle
                key={t}
                cx={x}
                cy={16 + len * t}
                r="1.8"
                fill={m("leaf")}
              />
            ))}
            <path
              d={`M${x} ${16 + len} c-5 6 -5 14 0 20 c5 -6 5 -14 0 -20 Z`}
              fill={LOTUS}
            />
          </g>
        );
      })}
    </Svg>
  ),
  Bottom: () => (
    <Scene>
      <path d="M0 212 Q135 204 270 212 T540 212 V340 H0 Z" fill={POND} />
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          d={`M${hash(i) * 460} ${226 + i * 7} q12 -4 24 0 t24 0`}
          fill="none"
          stroke="#9ab8e0"
          strokeWidth="0.8"
          opacity="0.6"
        />
      ))}
      <Pad x={90} y={300} rx={70} ry={20} />
      <Pad x={430} y={292} rx={78} ry={22} />
      <Pad x={270} y={326} rx={60} ry={16} />
      <Pad x={20} y={250} rx={40} ry={11} />
      <Pad x={520} y={240} rx={42} ry={11} />
      <Bud x={176} y={262} s={1} r={-10} />
      <Bud x={372} y={258} s={0.9} r={12} />
      <Flower x={120} y={240} s={1.15} />
      <Flower x={270} y={250} s={1.35} />
      <Flower x={420} y={236} s={1.1} />
      <Bud x={60} y={226} s={0.7} r={-18} />
      <Bud x={490} y={222} s={0.7} r={16} />
    </Scene>
  ),
  Overlay: ({ h }) => (
    <Frame h={h}>
      <rect
        x="14"
        y="14"
        width="512"
        height={h - 28}
        fill="none"
        stroke={m("leaf")}
        strokeWidth="1"
      />
    </Frame>
  ),
  safe: {
    story: { top: 92, bottom: 212, x: 46 },
    print: { top: 74, bottom: 176, x: 40 },
  },
};

/* ------------------------------------------------------------------ */
/* Choodi: a bride's set of bangles seen from above, rings of lac red, */
/* green glass, kundan gold and purple, half risen from the bottom.    */

const BANGLES: [number, string, boolean][] = [
  [96, "#b8162c", false],
  [108, "#46a05c", false],
  [122, "gold", true],
  [136, "#b8162c", false],
  [146, "#5a2a7a", false],
  [158, "#b8162c", false],
  [172, "gold", true],
  [186, "#46a05c", false],
  [198, "#b8162c", false],
  [212, "gold", true],
];

function Bangles({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {BANGLES.map(([r, c, kundan], i) => (
        <g key={i}>
          <circle
            r={r}
            fill="none"
            stroke={kundan ? m("gold") : c}
            strokeWidth={kundan ? 12 : 9}
          />
          {!kundan && (
            <circle
              r={r - 2}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              opacity="0.35"
            />
          )}
          {kundan &&
            ring(Math.round(r / 4), (a, k) => (
              <circle
                key={k}
                cx={Math.cos(rad(a)) * r}
                cy={Math.sin(rad(a)) * r}
                r="2.6"
                fill={k % 3 ? "#f4f6f8" : k % 2 ? "#b8162c" : "#46a05c"}
                stroke="#624800"
                strokeWidth="0.5"
              />
            ))}
        </g>
      ))}
    </g>
  );
}

// Bangles stacked on a tray, seen from above at an angle: whole rings, a soft shadow, two loose ones beside,
// and kundan bangles set with white and ruby stones in gold collets.
const Ring = ({
  y,
  rx,
  ry,
  c,
  kundan,
  cx = 270,
}: {
  y: number;
  rx: number;
  ry: number;
  c: string;
  kundan: boolean;
  cx?: number;
}) => (
  <g>
    <ellipse
      cx={cx}
      cy={y}
      rx={rx}
      ry={ry}
      fill="none"
      stroke={kundan ? m("gold") : c}
      strokeWidth={kundan ? 9 : 7}
    />
    <path
      d={`M${cx - rx + 2} ${y - 2} A${rx} ${ry} 0 0 1 ${cx + rx - 2} ${y - 2}`}
      fill="none"
      stroke="#ffffff"
      strokeWidth="1"
      opacity={kundan ? 0.25 : 0.45}
    />
    {kundan &&
      Array.from({ length: 15 }, (_, k) => {
        const a = Math.PI * ((k + 0.5) / 15);
        const x = cx - Math.cos(a) * rx;
        const yy = y + Math.sin(a) * ry;
        return (
          <g key={k}>
            <circle cx={x} cy={yy} r="4.2" fill={m("gold")} stroke="#624800" strokeWidth="0.5" />
            <circle cx={x} cy={yy} r="2.8" fill={k % 3 ? "#f4f6f8" : "#b8162c"} />
            <circle cx={x - 0.9} cy={yy - 0.9} r="0.8" fill="#ffffff" />
          </g>
        );
      })}
  </g>
);
function Stack() {
  const order = BANGLES.slice(0, 9);
  return (
    <g>
      <ellipse cx="270" cy="314" rx="150" ry="20" fill="#3e2440" opacity="0.14" />
      <ellipse cx="96" cy="324" rx="66" ry="10" fill="#3e2440" opacity="0.12" />
      <ellipse cx="444" cy="324" rx="66" ry="10" fill="#3e2440" opacity="0.12" />
      <Ring cx={96} y={318} rx={58} ry={11} c="#b8162c" kundan={false} />
      <Ring cx={444} y={318} rx={58} ry={11} c="gold" kundan />
      {order.map(([, c, kundan], i) => (
        <Ring key={i} y={296 - i * 9} rx={128} ry={24} c={c} kundan={kundan} />
      ))}
    </g>
  );
}

const choodi: Design = {
  id: "choodi",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 40%,#f6f2f8 0%,#ece4f0 60%,#ddd1e4 100%)`,
  colors: {
    title: "#6b0f3a",
    heading: "#3e2440",
    text: "#251d27",
    accent: "#8a6418",
    muted: "#574a5a",
    names: "#5e0d33",
  },
  fonts: {
    title: '"Bodoni Moda"',
    heading: '"Jost"',
    body: cormorant,
    names: '"Bodoni Moda"',
  },
  script: SCRIPT,
  type: { title: 3, names: 2.2 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={60}>
      <path d="M40 30 H230 M310 30 H500" stroke={m("leaf")} strokeWidth="1" />
      <g transform="translate(270 30) scale(0.11)">
        <Bangles x={0} y={0} />
      </g>
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
        stroke={m("leaf")}
        strokeWidth="1"
      />
      {/* a string of glass bangle beads inside the gold rule */}
      {(() => {
        const cols = ["#b8162c", "#46a05c", "#5a2a7a", "#c49f4d"];
        const across = Array.from({ length: 50 }, (_, i) => 24 + i * 10);
        const down = Array.from({ length: Math.floor((h - 48) / 10) + 1 }, (_, i) => 24 + i * 10);
        return [
          ...across.flatMap((x, i) => [[x, 24, i], [x, h - 24, i + 1]]),
          ...down.flatMap((y, i) => [[24, y, i + 2], [516, y, i + 3]]),
        ].map(([x, y, i], k) => (
          <circle key={k} cx={x} cy={y} r="2.2" fill={cols[i % 4]} opacity="0.75" />
        ));
      })()}
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <Stack />
    </Scene>
  ),
  safe: {
    story: { top: 76, bottom: 196, x: 50 },
    print: { top: 62, bottom: 168, x: 42 },
  },
};

/* ------------------------------------------------------------------ */
/* Paithani: a magenta pallu woven with gold peacocks and lotuses      */
/* between peacock-green bands, a vine border along the top.           */

const MAGENTA = "#b0127a";
const PEACOCK_G = "#22a083";
const peacock = {
  body: "M20 34 C20 24 28 20 34 22 C38 14 40 8 44 6 C47 5 49 8 47 10 C45 12 44 16 44 22 C46 28 42 36 34 38 C28 40 22 38 20 34 Z",
  tail: "M22 34 C8 26 -4 34 -8 46 C2 42 14 46 26 40 Z",
  beak: "M47 7 L53 8.5 L47 10 Z",
};
const Peacock = ({
  x,
  y,
  s,
  flip,
}: {
  x: number;
  y: number;
  s: number;
  flip?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d={peacock.tail} fill={m("gold")} />
    {[0, 1, 2].map((i) => (
      <circle
        key={i}
        cx={-2 + i * 8}
        cy={40 - i * 2}
        r="2.2"
        fill={PEACOCK_G}
      />
    ))}
    <path d={peacock.body} fill={m("gold")} />
    <path d={peacock.beak} fill={m("gold")} />
    <circle cx="44.5" cy="8.5" r="1" fill={MAGENTA} />
    {[-14, 0, 14].map((a) => (
      <g key={a} transform={`translate(44 6) rotate(${a})`}>
        <path d="M0 0 V-8" stroke={m("gold")} strokeWidth="0.8" />
        <circle cy="-9" r="1.2" fill={m("gold")} />
      </g>
    ))}
    <path d="M30 38 V46 M36 38 V46" stroke={m("gold")} strokeWidth="1.2" />
  </g>
);

const paithani: Design = {
  id: "paithani",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 42%,#fbf3ea 0%,#f5e5d6 60%,#ead2bd 100%)`,
  colors: {
    title: "#8a0f5a",
    heading: "#3f2333",
    text: "#2a1e1c",
    accent: "#8a6418",
    muted: "#5d4b45",
    names: "#7a0d4f",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Cinzel"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.5 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={62}>
      <rect x="0" y="0" width="540" height="10" fill={MAGENTA} />
      <rect x="0" y="10" width="540" height="34" fill={PEACOCK_G} />
      <path
        d={Array.from(
          { length: 23 },
          (_, i) => `${i ? "" : "M0 27"} q6 -10 12 0 q6 10 12 0`,
        ).join(" ")}
        fill="none"
        stroke={m("gold")}
        strokeWidth="1.4"
      />
      {Array.from({ length: 23 }, (_, i) => (
        <circle key={i} cx={i * 24 + 6} cy="19" r="2" fill={m("gold")} />
      ))}
      <rect x="0" y="44" width="540" height="4" fill={m("gold")} />
      <rect x="0" y="48" width="540" height="4" fill={MAGENTA} />
    </Svg>
  ),
  Bottom: () => (
    <Scene>
      <rect x="0" y="200" width="540" height="4" fill={MAGENTA} />
      <rect x="0" y="204" width="540" height="10" fill={PEACOCK_G} />
      <rect x="0" y="214" width="540" height="3" fill={m("gold")} />
      <rect x="0" y="217" width="540" height="123" fill={MAGENTA} />
      {/* gold zari stripes in the pallu ground */}
      {Array.from({ length: 30 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${219 + i * 4} H540`}
          stroke="#d4569f"
          strokeWidth="0.5"
          opacity="0.5"
        />
      ))}
      {[0, 1, 2].map((k) => {
        const cx = 90 + k * 180;
        return (
          <g key={k}>
            <Peacock x={cx - 74} y={232} s={1.25} />
            <Peacock x={cx + 74} y={232} s={1.25} flip />
            <g transform={`translate(${cx} 266)`}>
              {[-50, -25, 0, 25, 50].map((a) => (
                <path
                  key={a}
                  d="M0 0 C-6 -10 -5 -22 0 -30 C5 -22 6 -10 0 0 Z"
                  transform={`rotate(${a})`}
                  fill={m("gold")}
                />
              ))}
              <path d="M-14 4 H14" stroke={m("gold")} strokeWidth="2" />
            </g>
          </g>
        );
      })}
      <rect x="0" y="300" width="540" height="3" fill={m("gold")} />
      <rect x="0" y="303" width="540" height="8" fill={PEACOCK_G} />
      {Array.from({ length: 27 }, (_, i) => (
        <path
          key={i}
          d={`M${i * 20 + 10} 314 l6 10 l-6 10 l-6 -10 Z`}
          fill={m("gold")}
        />
      ))}
    </Scene>
  ),
  // Asharfi buttis, gold coins woven all over the body of the sari.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <g opacity="0.42">
        {field(h, 48, (x, y, i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3.4" fill={m("leaf")} />
            <circle cx={x} cy={y} r="1.3" fill={MAGENTA} />
          </g>
        ))}
      </g>
      <path
        d={`M14 52 V${h - 150} M526 52 V${h - 150}`}
        stroke={MAGENTA}
        strokeWidth="1.2"
      />
    </Frame>
  ),
  safe: {
    story: { top: 82, bottom: 176, x: 46 },
    print: { top: 66, bottom: 150, x: 40 },
  },
};

export const designs: Design[] = [
  patola,
  jain,
  pithi,
  garbo,
  gota,
  pichhwai,
  choodi,
  paithani,
];

export const templates: Template[] = [
  {
    id: "patola-sagai",
    name: "Patola Ikat Sagai",
    design: "patola",
    lang: "gu",
    symbol: "ganesha",
    event: "ring",
  },
  {
    id: "jain-kalpasutra",
    name: "Jain Kalpasutra Lagna Patrika",
    design: "jain-manuscript",
    lang: "gu",
    symbol: "jain",
    event: "wedding",
  },
  {
    id: "pithi-bandhani",
    name: "Pithi Bandhani Mirror Work",
    design: "pithi-bandhani",
    lang: "gu",
    symbol: "ganesha",
    event: "haldi",
  },
  {
    id: "garbo-navratri",
    name: "Garbo Lamp Raas Night",
    design: "garbo",
    lang: "gu",
    symbol: "ganesha",
    event: "sangeet",
  },
  {
    id: "gota-patti",
    name: "Gota Patti Rani Pink",
    design: "gota-patti",
    lang: "hi",
    symbol: "ganesha",
    event: "wedding",
  },
  {
    id: "pichhwai-lotus",
    name: "Pichhwai Lotus Pond",
    design: "pichhwai",
    lang: "hi",
    symbol: "radha-krishna",
    event: "sangeet",
  },
  {
    id: "choodi-save-the-date",
    name: "Choodi Bangle Save the Date",
    design: "choodi",
    lang: "hi",
    symbol: "ganesha",
    event: "save-the-date",
  },
  {
    id: "paithani-peacock",
    name: "Paithani Peacock Pallu",
    design: "paithani",
    lang: "mr",
    symbol: "ganesha",
    event: "wedding",
  },
];
