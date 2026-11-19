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

// The luxury set, third part: Tamil, Punjabi, haldi, black-tie, Nikkah and church cards.

/* ------------------------------------------------------------------ */
/* Kolam: a kambi kolam of interlocking loops round a dot lattice in  */
/* red-oxide kaavi on stone, and a kaavi threshold strip at the top.   */

const KAAVI = "#9a3218";
const RICE = "#fffaf0";

function Kolam({
  x,
  y,
  n,
  s,
  ink,
}: {
  x: number;
  y: number;
  n: number;
  s: number;
  ink: string;
}) {
  const pts: [number, number][] = [];
  for (let i = -n; i <= n; i++)
    for (let j = -n; j <= n; j++)
      if (Math.abs(i) + Math.abs(j) <= n)
        pts.push([(i - j) * (s / 2), (i + j) * (s / 2)]);
  const w = s * 0.74;
  return (
    <g
      transform={`translate(${x} ${y})`}
      fill="none"
      stroke={ink}
      strokeWidth="2.2"
      strokeLinejoin="round"
    >
      {pts.map(([px, py], k) => (
        <rect
          key={k}
          x={px - w / 2}
          y={py - w / 2}
          width={w}
          height={w}
          rx={w * 0.32}
          transform={`rotate(45 ${px} ${py})`}
        />
      ))}
      {pts.map(([px, py], k) => (
        <circle
          key={`d${k}`}
          cx={px}
          cy={py}
          r="2.2"
          fill={ink}
          stroke="none"
        />
      ))}
      {/* petal loops at the four tips */}
      {[0, 90, 180, 270].map((a) => (
        <path
          key={a}
          d={`M${-s * 0.3} ${-n * s * 0.5 - s * 0.2} C${-s * 0.6} ${-n * s * 0.5 - s * 1.3} ${s * 0.6} ${-n * s * 0.5 - s * 1.3} ${s * 0.3} ${-n * s * 0.5 - s * 0.2}`}
          transform={`rotate(${a + 45})`}
        />
      ))}
    </g>
  );
}

const kolam: Design = {
  id: "kolam",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 42%,#f4f2ed 0%,#e9e6de 60%,#dad5c9 100%)`,
  colors: {
    title: "#7a1e0e",
    heading: "#4a2416",
    text: "#2a2016",
    accent: "#8a5a1a",
    muted: "#575047",
    names: "#6e1a0c",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Marcellus"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.5 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={70}>
      <rect x="0" y="0" width="540" height="48" fill={KAAVI} />
      {[52, 58].map((y) => (
        <path
          key={y}
          d={`M0 ${y} H540`}
          stroke={KAAVI}
          strokeWidth={y === 52 ? 3 : 1}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <Kolam key={i} x={22 + i * 45} y={24} n={1} s={14} ink={RICE} />
      ))}
    </Svg>
  ),
  Bottom: () => (
    <Scene>
      <Kolam x={270} y={352} n={8} s={46} ink={KAAVI} />
      <path d="M0 336 H540" stroke={KAAVI} strokeWidth="4" />
    </Scene>
  ),
  // The pulli grid the kolam is drawn on, laid across the whole threshold before the loops go down.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <g fill={KAAVI} opacity="0.2">
        {field(
          h,
          23,
          (x, y, i) => <circle key={i} cx={x - 4} cy={y} r="1.3" />,
          false,
        )}
      </g>
      <path
        d={`M14 58 V${h - 14} M526 58 V${h - 14}`}
        stroke={KAAVI}
        strokeWidth="1.2"
      />
    </Frame>
  ),
  safe: {
    story: { top: 88, bottom: 196, x: 46 },
    print: { top: 72, bottom: 160, x: 40 },
  },
};

/* ------------------------------------------------------------------ */
/* Thanjavur: the raised, gilded gesso mandapa of a Thanjavur painting */
/* (pillars, a cusped arch and ruby cabochons) on emerald lacquer.     */

const EMERALD = "#082a1d";
const RUBY = "#c4162e";
const GESSO = "#4a4320";

const Gem = ({
  x,
  y,
  r,
  c = RUBY,
}: {
  x: number;
  y: number;
  r: number;
  c?: string;
}) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r={r + 1.6}
      fill={m("antique")}
      stroke={GESSO}
      strokeWidth="0.6"
    />
    <circle cx={x} cy={y} r={r} fill={c} />
    <circle
      cx={x - r * 0.35}
      cy={y - r * 0.35}
      r={r * 0.3}
      fill="#ffffff"
      opacity="0.75"
    />
  </g>
);

function Pillar({ x, y0, y1 }: { x: number; y0: number; y1: number }) {
  const w = 34;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y0 + 24}
        width={w}
        height={y1 - y0 - 48}
        fill={m("antique")}
        stroke={GESSO}
        strokeWidth="0.8"
      />
      {[-9, -3, 3, 9].map((d) => (
        <path
          key={d}
          d={`M${x + d} ${y0 + 30} V${y1 - 30}`}
          stroke={GESSO}
          strokeWidth="0.6"
        />
      ))}
      {[0, 1].map((k) => {
        const yy = k ? y1 - 24 : y0;
        return (
          <g key={k}>
            <rect
              x={x - w / 2 - 8}
              y={yy}
              width={w + 16}
              height="10"
              rx="3"
              fill={m("antique")}
              stroke={GESSO}
              strokeWidth="0.8"
            />
            <rect
              x={x - w / 2 - 3}
              y={yy + 10}
              width={w + 6}
              height="14"
              rx="5"
              fill={m("antique")}
              stroke={GESSO}
              strokeWidth="0.8"
            />
          </g>
        );
      })}
      {Array.from({ length: Math.floor((y1 - y0 - 80) / 70) + 1 }, (_, i) => (
        <Gem
          key={i}
          x={x}
          y={y0 + 60 + i * 70}
          r={5}
          c={i % 2 ? "#1f8a5a" : RUBY}
        />
      ))}
    </g>
  );
}

function Mandapa({ h }: { h: number }) {
  const spring = 210;
  const cx = 270;
  const rx = 234;
  const ry = 140;
  const N = 13;
  // Cusps: small inward arcs between points on an ellipse.
  const p = (t: number) =>
    [cx - Math.cos(t) * rx, spring - Math.sin(t) * ry] as const;
  const cusps = Array.from({ length: N }, (_, i) => {
    const [x0, y0] = p((i / N) * Math.PI);
    const [x1, y1] = p(((i + 1) / N) * Math.PI);
    return `${i ? "" : `M${x0.toFixed(1)} ${y0.toFixed(1)}`} A16 16 0 0 0 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }).join(" ");
  return (
    <g>
      <path
        d={`M${cx - rx} ${spring} A${rx} ${ry} 0 0 1 ${cx + rx} ${spring}`}
        fill="none"
        stroke={m("antique")}
        strokeWidth="18"
      />
      <path
        d={`M${cx - rx} ${spring} A${rx} ${ry} 0 0 1 ${cx + rx} ${spring}`}
        fill="none"
        stroke={GESSO}
        strokeWidth="0.8"
        transform={`translate(0 9)`}
        opacity="0.7"
      />
      <path d={cusps} fill="none" stroke={m("antique")} strokeWidth="3" />
      {Array.from({ length: N + 1 }, (_, i) => {
        const [x, y] = p((i / N) * Math.PI);
        return <Gem key={i} x={x} y={y} r={3.6} c={i % 2 ? "#1f8a5a" : RUBY} />;
      })}
      {/* finial */}
      <path
        d={`M${cx - 18} ${spring - ry - 6} Q${cx} ${spring - ry - 40} ${cx + 18} ${spring - ry - 6} Z`}
        fill={m("antique")}
        stroke={GESSO}
        strokeWidth="0.8"
      />
      <Gem x={cx} y={spring - ry - 18} r={5} />
      <Pillar x={36} y0={spring} y1={h - 56} />
      <Pillar x={504} y0={spring} y1={h - 56} />
      <rect
        x="10"
        y={h - 56}
        width="520"
        height="42"
        fill={m("antique")}
        stroke={GESSO}
        strokeWidth="0.8"
      />
      <rect
        x="10"
        y={h - 56}
        width="520"
        height="6"
        fill={GESSO}
        opacity="0.35"
      />
      {Array.from({ length: 16 }, (_, i) => (
        <Gem
          key={i}
          x={38 + i * 31}
          y={h - 33}
          r={4}
          c={i % 2 ? "#1f8a5a" : RUBY}
        />
      ))}
      {/* pearls hanging inside the arch */}
      {Array.from({ length: 11 }, (_, i) => {
        const [x, y] = p(((i + 1) / 12) * Math.PI);
        return <circle key={i} cx={x} cy={y + 22} r="2.2" fill="#f4f6f8" />;
      })}
    </g>
  );
}

const thanjavur: Design = {
  id: "thanjavur",
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 45%,#0f3a2a 0%,${EMERALD} 58%,#02140c 100%)`,
  colors: {
    title: "#d7cc8b",
    heading: "#f1eccc",
    text: "#ecf3ee",
    accent: "#cabf7f",
    muted: "#b3cbbd",
    names: "#d7cc8b",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Cinzel"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.4 },
  press: VELVET_PRESS,
  Top: () => null,
  Overlay: ({ h }) => (
    <Frame h={h}>
      <Mandapa h={h} />
    </Frame>
  ),
  Bottom: () => null,
  safe: {
    story: { top: 120, bottom: 70, x: 66 },
    print: { top: 98, bottom: 58, x: 56 },
  },
};

/* ------------------------------------------------------------------ */
/* Phulkari: a bagh of darned silk diamonds, golden floss with magenta */
/* and white hearts, so dense the rust khaddar shows only as a grid.   */

const KHADDAR = "#6e2a12"; // rust khaddar, hand-spun and madder-dyed
const FLOSS = ["#f2b630", "#d6337a", "#f6efe2"];

// Stitches fill a triangle with lines parallel to its outer edge (from apex a toward edge b-c).
function Stitch({
  a,
  b,
  c,
  color,
  step = 2.6,
}: {
  a: [number, number];
  b: [number, number];
  c: [number, number];
  color: string;
  step?: number;
}) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const n = Math.floor(len / step);
  const d = Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / n;
    return `M${(a[0] + (b[0] - a[0]) * t).toFixed(1)} ${(a[1] + (b[1] - a[1]) * t).toFixed(1)} L${(a[0] + (c[0] - a[0]) * t).toFixed(1)} ${(a[1] + (c[1] - a[1]) * t).toFixed(1)}`;
  }).join("");
  return <path d={d} stroke={color} strokeWidth="1.3" />;
}

function Bagh({ y, rows }: { y: number; rows: number }) {
  const s = 27;
  const out = [];
  for (let r = 0; r < rows; r++)
    for (let c = -1; c < 11; c++) {
      const cx = c * s * 2 + (r % 2 ? s : 0) + 18;
      const cy = y + r * s + s;
      const D = (k: number): [number, number][] => [
        [cx, cy - k],
        [cx + k, cy],
        [cx, cy + k],
        [cx - k, cy],
      ];
      const o = D(s - 2);
      const i = D((s - 2) * 0.48);
      const ctr: [number, number] = [cx, cy];
      const heart = FLOSS[(r + c + 9) % 2 ? 1 : 2];
      out.push(
        <g key={`${r}-${c}`}>
          {[0, 1, 2, 3].map((q) => (
            <Stitch
              key={q}
              a={ctr}
              b={o[q]}
              c={o[(q + 1) % 4]}
              color={FLOSS[0]}
            />
          ))}
          {[0, 1, 2, 3].map((q) => (
            <Stitch
              key={`i${q}`}
              a={i[q]}
              b={ctr}
              c={i[(q + 1) % 4]}
              color={heart}
              step={2.2}
            />
          ))}
        </g>,
      );
    }
  return <g>{out}</g>;
}

const phulkari: Design = {
  id: "phulkari",
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 45%,#7a2e14 0%,${KHADDAR} 58%,#3a1206 100%)`,
  colors: {
    title: "#ffd36b",
    heading: "#f8e2b0",
    text: "#f8eee6",
    accent: "#f0b442",
    muted: "#dcbfae",
    names: "#ffd36b",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Jost"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.8 },
  press: VELVET_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={128}>
      <Bagh y={-27} rows={5} />
      <path
        d="M0 122 H540"
        stroke={FLOSS[0]}
        strokeWidth="1.2"
        strokeDasharray="5 3"
      />
    </Svg>
  ),
  Bottom: () => (
    <Scene>
      <path
        d="M0 202 H540"
        stroke={FLOSS[0]}
        strokeWidth="1.2"
        strokeDasharray="5 3"
      />
      <Bagh y={190} rows={6} />
    </Scene>
  ),
  // The darning carries on across the cloth: small satin-stitch diamonds in gold floss.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <g stroke={FLOSS[0]} strokeWidth="1.1" opacity="0.2" strokeLinecap="round">
        {field(h, 38, (x, y, i) => (
          <path
            key={i}
            d={`M${x - 2} ${y - 6} h4 M${x - 5} ${y - 3} h10 M${x - 7} ${y} h14 M${x - 5} ${y + 3} h10 M${x - 2} ${y + 6} h4`}
          />
        ))}
      </g>
    </Frame>
  ),
  safe: {
    story: { top: 142, bottom: 150, x: 44 },
    print: { top: 114, bottom: 120, x: 38 },
  },
};

/* ------------------------------------------------------------------ */
/* Kalire: gold bridal kalire hanging from a kara across the top, the  */
/* way they hang from the bride's chooda, on champagne paper.         */

const CHOODA = "#a4122a";

function Kalira({ x, len }: { x: number; len: number }) {
  const domes = [0.3, 0.62];
  return (
    <g>
      <path d={`M${x} 16 V${16 + len}`} stroke={m("leaf")} strokeWidth="1" />
      {Array.from({ length: Math.floor(len / 9) }, (_, i) => (
        <circle key={i} cx={x} cy={20 + i * 9} r="1.6" fill={m("leaf")} />
      ))}
      {domes.map((t, k) => {
        const y = 16 + len * t;
        const w = 14 + k * 4;
        return (
          <g key={k}>
            <path
              d={`M${x - w} ${y + 10} Q${x} ${y - 12} ${x + w} ${y + 10} Z`}
              fill={m("leaf")}
            />
            {Array.from({ length: 5 }, (_, i) => (
              <circle
                key={i}
                cx={x - w + (i * w) / 2}
                cy={y + 13}
                r="1.8"
                fill="#fbf6ee"
                stroke="#a4802b"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 3 }, (_, i) => (
              <path
                key={i}
                d={`M${x - w * 0.7 + i * w * 0.7} ${y + 15} v${8 + (i % 2) * 4}`}
                stroke={m("leaf")}
                strokeWidth="0.8"
              />
            ))}
          </g>
        );
      })}
      <path
        d={`M${x} ${16 + len} c-10 8 -10 22 0 30 c10 -8 10 -22 0 -30 Z`}
        fill={m("leaf")}
      />
      <circle cx={x} cy={16 + len + 16} r="3.2" fill={CHOODA} />
    </g>
  );
}

const kalire: Design = {
  id: "kalire",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 45%,#fbf6ee 0%,#f3e9da 60%,#e7d7bf 100%)`,
  colors: {
    title: "#7c1020",
    heading: "#4a2a1a",
    text: "#2a2018",
    accent: "#7e5e0a",
    muted: "#5c4e40",
    names: "#6e0e1c",
  },
  fonts: {
    title: '"Bodoni Moda"',
    heading: '"Marcellus"',
    body: cormorant,
    names: '"Bodoni Moda"',
  },
  script: SCRIPT,
  type: { title: 2.4 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={200}>
      <rect x="0" y="4" width="540" height="12" fill={m("leaf")} />
      {Array.from({ length: 27 }, (_, i) => (
        <circle
          key={i}
          cx={10 + i * 20}
          cy="10"
          r="2.6"
          fill={i % 2 ? CHOODA : "#fbf6ee"}
        />
      ))}
      {[34, 92, 150, 210, 270, 330, 390, 448, 506].map((x) => (
        <Kalira key={x} x={x} len={64 + (Math.abs(x - 270) / 236) * 76} />
      ))}
    </Svg>
  ),
  // The chunni the kalire fall onto: a fine net of gold sitara.
  Overlay: ({ h }) => (
    <Frame h={h}>
      <g opacity="0.5">
        {field(h, 30, (x, y, i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill={m("leaf")} />
        ))}
      </g>
    </Frame>
  ),
  // The chooda itself, side-on along the arm: red and ivory bangles with a kundan pair in the middle.
  Bottom: () => (
    <Scene>
      <path d="M0 206 H540" stroke={m("leaf")} strokeWidth="1.4" />
      {Array.from({ length: 41 }, (_, i) => {
        const x = 10 + i * 13;
        const mid = Math.abs(i - 20);
        const kundan = mid === 2;
        const c = kundan ? m("leaf") : i % 3 === 1 ? "#f6eedd" : CHOODA;
        const ry = 52 - mid * 0.35;
        return (
          <g key={i}>
            <ellipse cx={x} cy={276} rx="8" ry={ry} fill="none" stroke={c} strokeWidth={kundan ? 7 : 6} />
            <path
              d={`M${x - 5} ${276 - ry * 0.7} Q${x - 9} 276 ${x - 5} ${276 + ry * 0.7}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.9"
              opacity={c === CHOODA ? 0.45 : 0.2}
            />
            {kundan &&
              Array.from({ length: 7 }, (_, k) => (
                <circle
                  key={k}
                  cx={x - 7.5}
                  cy={276 - ry * 0.75 + (k * ry * 1.5) / 6}
                  r="2.2"
                  fill={k % 2 ? "#f4f6f8" : CHOODA}
                  stroke="#624800"
                  strokeWidth="0.4"
                />
              ))}
          </g>
        );
      })}
    </Scene>
  ),
  safe: {
    story: { top: 196, bottom: 148, x: 46 },
    print: { top: 164, bottom: 112, x: 40 },
  },
};

/* ------------------------------------------------------------------ */
/* Genda: marigold garlands swagged across the top, strands of heads   */
/* down both sides, and a brass urli of turmeric paste below.          */

const MARIGOLD_O = "#f08a1c";
const MARIGOLD_Y = "#f6b62e";
const MANGO = "#3f7a35";

const Genda = ({
  x,
  y,
  r,
  c,
}: {
  x: number;
  y: number;
  r: number;
  c: string;
}) => (
  <g>
    {ring(12, (a, i) => (
      <circle
        key={i}
        cx={x + Math.cos(rad(a)) * r * 0.62}
        cy={y + Math.sin(rad(a)) * r * 0.62}
        r={r * 0.42}
        fill={c}
        stroke="#b8560a"
        strokeWidth="0.5"
      />
    ))}
    {ring(8, (a, i) => (
      <circle
        key={`i${i}`}
        cx={x + Math.cos(rad(a + 20)) * r * 0.3}
        cy={y + Math.sin(rad(a + 20)) * r * 0.3}
        r={r * 0.32}
        fill={c === MARIGOLD_O ? MARIGOLD_Y : MARIGOLD_O}
        stroke="#b8560a"
        strokeWidth="0.4"
      />
    ))}
    <circle cx={x} cy={y} r={r * 0.2} fill="#c0560a" />
  </g>
);
const Mango = ({
  x,
  y,
  a,
  s = 1,
}: {
  x: number;
  y: number;
  a: number;
  s?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <path d="M0 0 C6 8 6 26 0 38 C-6 26 -6 8 0 0 Z" fill={MANGO} />
    <path d="M0 2 V34" stroke="#25521f" strokeWidth="0.6" />
  </g>
);
function Swag({
  x0,
  x1,
  y,
  sag,
}: {
  x0: number;
  x1: number;
  y: number;
  sag: number;
}) {
  const n = Math.floor((x1 - x0) / 15);
  return (
    <g>
      {Array.from({ length: n + 1 }, (_, i) => {
        const t = i / n;
        return (
          <Genda
            key={i}
            x={x0 + (x1 - x0) * t}
            y={y + 4 * sag * t * (1 - t)}
            r={9}
            c={i % 2 ? MARIGOLD_Y : MARIGOLD_O}
          />
        );
      })}
    </g>
  );
}

const genda: Design = {
  id: "genda",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 45%,#fbf8e2 0%,#f3edc6 60%,#e6dca8 100%)`,
  colors: {
    title: "#8a3200",
    heading: "#4a2a06",
    text: "#262214",
    accent: "#8f5d04",
    muted: "#575440",
    names: "#7a2c00",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Jost"',
    body: cormorant,
    names: '"Gloock"',
  },
  script: SCRIPT,
  type: { title: 2.6, names: 2.4 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={120}>
      {[0, 180, 360].map((x) => (
        <Swag key={x} x0={x} x1={x + 180} y={12} sag={58} />
      ))}
      {[0, 180, 360, 540].map((x) => (
        <g key={x}>
          {[-24, 0, 24].map((a) => (
            <Mango key={a} x={x} y={14} a={a} s={0.9} />
          ))}
          <Genda x={x} y={14} r={14} c={MARIGOLD_O} />
        </g>
      ))}
    </Svg>
  ),
  Overlay: ({ h }) => (
    <Frame h={h}>
      {[24, 516].map((x) =>
        Array.from({ length: Math.floor((h - 160) / 21) }, (_, i) => (
          <g key={`${x}-${i}`}>
            <Genda
              x={x}
              y={60 + i * 21}
              r={8.5}
              c={i % 2 ? MARIGOLD_Y : MARIGOLD_O}
            />
            {i % 3 === 2 && (
              <rect
                x={x - 3}
                y={60 + i * 21 + 9}
                width="6"
                height="3"
                fill="#b81d24"
              />
            )}
          </g>
        )),
      )}
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      {Array.from({ length: 22 }, (_, i) => (
        <Mango
          key={`l${i}`}
          x={i * 26 + hash(i) * 8}
          y={310 - hash(i + 3) * 10}
          a={-60 + hash(i + 5) * 120}
          s={0.8}
        />
      ))}
      {Array.from({ length: 30 }, (_, i) => (
        <Genda
          key={i}
          x={i * 19 + hash(i + 9) * 6}
          y={326 + hash(i + 1) * 10}
          r={10}
          c={i % 2 ? MARIGOLD_Y : MARIGOLD_O}
        />
      ))}
      {/* brass urli with haldi */}
      <ellipse cx="270" cy="276" rx="64" ry="12" fill="#e3a01a" />
      <path
        d="M206 276 Q210 318 270 320 Q330 318 334 276 Z"
        fill={m("brass")}
      />
      <ellipse
        cx="270"
        cy="276"
        rx="64"
        ry="12"
        fill="none"
        stroke={m("brass")}
        strokeWidth="3"
      />
      <ellipse cx="262" cy="273" rx="40" ry="6" fill="#f6c84a" />
    </Scene>
  ),
  safe: {
    story: { top: 116, bottom: 136, x: 50 },
    print: { top: 94, bottom: 110, x: 44 },
  },
};

/* ------------------------------------------------------------------ */
/* Deco: a black-tie save the date, a champagne sunburst fan rising   */
/* from the bottom and a stepped crown at the top.                     */

function Fan() {
  return (
    <g>
      {ring(36, (a, i) => {
        if (a < 180) return null;
        const a0 = rad(a);
        const a1 = rad(a + 5);
        const r0 = 54;
        const r1 = i % 2 ? 236 : 200;
        return (
          <path
            key={i}
            d={`M${270 + Math.cos(a0) * r0} ${340 + Math.sin(a0) * r0} L${270 + Math.cos(a0) * r1} ${340 + Math.sin(a0) * r1} L${270 + Math.cos(a1) * r1} ${340 + Math.sin(a1) * r1} L${270 + Math.cos(a1) * r0} ${340 + Math.sin(a1) * r0} Z`}
            fill={m("champagne")}
            opacity={i % 2 ? 1 : 0.55}
          />
        );
      })}
      {[54, 62, 120, 126].map((r) => (
        <path
          key={r}
          d={`M${270 - r} 340 A${r} ${r} 0 0 1 ${270 + r} 340`}
          fill="none"
          stroke={m("champagne")}
          strokeWidth={r % 2 ? 1 : 2}
        />
      ))}
      <path d="M216 340 A54 54 0 0 1 324 340 Z" fill="#16140f" />
      {ring(12, (a, i) =>
        a >= 180 ? (
          <circle
            key={i}
            cx={270 + Math.cos(rad(a + 7.5)) * 38}
            cy={340 + Math.sin(rad(a + 7.5)) * 38}
            r="2"
            fill={m("champagne")}
          />
        ) : null,
      )}
    </g>
  );
}

const deco: Design = {
  id: "deco",
  sky: `${GRAIN_LIGHT}, ${VIGNETTE}, radial-gradient(ellipse at 50% 42%,#24211c 0%,#16140f 58%,#080706 100%)`,
  colors: {
    title: "#e8d4ad",
    heading: "#efe3c9",
    text: "#f3efe7",
    accent: "#cbb48a",
    muted: "#c3bba9",
    names: "#e8d4ad",
  },
  fonts: {
    title: '"Cinzel"',
    heading: '"Jost"',
    body: '"Jost", sans-serif',
    names: '"Bodoni Moda"',
  },
  script: SCRIPT,
  type: { title: 3, body: 0.84, names: 2.3 },
  press: VELVET_PRESS,
  cover: { flourish: false },
  Top: () => (
    <Svg h={92}>
      {[
        [230, 310, 70],
        [242, 298, 58],
        [254, 286, 46],
        [266, 274, 34],
      ].map(([a, b, y]) => (
        <path
          key={y}
          d={`M40 ${y + 6} H${a} V${y} H${b} V${y + 6} H500`}
          fill="none"
          stroke={m("champagne")}
          strokeWidth="1"
        />
      ))}
      <path d="M270 16 L275 24 L270 32 L265 24 Z" fill={m("champagne")} />
    </Svg>
  ),
  Overlay: ({ h }) => {
    const step = (x: number, y: number, sx: number, sy: number) =>
      `M${x} ${y + sy * 30} V${y + sy * 12} H${x + sx * 12} V${y} H${x + sx * 30}`;
    return (
      <Frame h={h}>
        <rect
          x="18"
          y="18"
          width="504"
          height={h - 36}
          fill="none"
          stroke={m("champagne")}
          strokeWidth="1"
        />
        {[
          [26, 26, 1, 1],
          [514, 26, -1, 1],
          [26, h - 26, 1, -1],
          [514, h - 26, -1, -1],
        ].map(([x, y, sx, sy], i) => (
          <path
            key={i}
            d={step(x, y, sx, sy)}
            fill="none"
            stroke={m("champagne")}
            strokeWidth="1.4"
          />
        ))}
      </Frame>
    );
  },
  Bottom: () => (
    <Scene>
      <Fan />
    </Scene>
  ),
  safe: {
    story: { top: 100, bottom: 250, x: 56 },
    print: { top: 82, bottom: 200, x: 48 },
  },
};

/* ------------------------------------------------------------------ */
/* Nikkah: Mughal pietra dura, a vase of tulips and irises inlaid in   */
/* lapis, carnelian and malachite in a cusped niche of white marble.  */

const LAPIS = "#2a4a9a";
const CARNELIAN = "#b8442a";
const MALACHITE = "#2f7a5a";
const INLAY = "#1f2128";

const Tulip = ({
  x,
  y,
  a,
  c,
  s = 1,
}: {
  x: number;
  y: number;
  a: number;
  c: string;
  s?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <path
      d="M0 0 C-10 -2 -12 -18 -8 -26 L-3 -18 L0 -28 L3 -18 L8 -26 C12 -18 10 -2 0 0 Z"
      fill={c}
      stroke={INLAY}
      strokeWidth="0.8"
    />
  </g>
);
const Leaf = ({
  x,
  y,
  a,
  s = 1,
}: {
  x: number;
  y: number;
  a: number;
  s?: number;
}) => (
  <path
    d="M0 0 C8 -10 10 -30 4 -44 C-4 -30 -8 -12 0 0 Z"
    transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}
    fill={MALACHITE}
    stroke={INLAY}
    strokeWidth="0.8"
  />
);
const InlayFlower = ({ x, y, s = 1, turn = false }: { x: number; y: number; s?: number; turn?: boolean }) => (
  <g transform={`translate(${x} ${y}) rotate(${turn ? 90 : 0}) scale(${s}) translate(${-x} ${-y})`}>
    {ring(5, (a, i) => (
      <ellipse
        key={i}
        cx={x + Math.cos(rad(a - 90)) * 4}
        cy={y + Math.sin(rad(a - 90)) * 4}
        rx="3.2"
        ry="2"
        transform={`rotate(${a - 90} ${x + Math.cos(rad(a - 90)) * 4} ${y + Math.sin(rad(a - 90)) * 4})`}
        fill={CARNELIAN}
        stroke={INLAY}
        strokeWidth="0.4"
      />
    ))}
    <circle cx={x} cy={y} r="1.6" fill={m("leaf")} />
    <path
      d={`M${x - 14} ${y} q4 -4 8 0 M${x + 6} ${y} q4 4 8 0`}
      stroke={MALACHITE}
      strokeWidth="1.6"
      fill="none"
    />
  </g>
);

// Grey veins drifting through white marble, drawn in story units and stretched to the card's height.
const VEINS = [
  "M-20 150 C110 120 170 270 300 236 S460 300 560 252",
  "M-20 560 C100 500 190 600 330 520 S470 500 560 560",
  "M70 -10 C110 120 50 250 150 400",
  "M440 330 C400 450 480 560 420 700 S470 900 430 980",
  "M-20 820 C80 790 140 860 240 830",
];
const VEIN_FINE = [
  "M170 214 C200 250 190 300 230 330",
  "M330 520 C350 470 400 460 420 420",
  "M110 250 C150 260 170 300 210 310",
  "M455 600 C500 620 520 600 560 640",
];
const InlayBorder = ({ h }: { h: number }) => {
  const step = 42;
  const across = Array.from({ length: 12 }, (_, i) => 39 + i * ((462) / 11));
  const down = Array.from({ length: Math.floor((h - 78) / step) + 1 }, (_, i) => 39 + i * ((h - 78) / Math.floor((h - 78) / step)));
  return (
    <g>
      <path
        d={`M12 12 H528 V${h - 12} H12 Z M30 30 V${h - 30} H510 V30 Z`}
        fill={INLAY}
        fillRule="evenodd"
      />
      <rect x="15" y="15" width="510" height={h - 30} fill="none" stroke={m("leaf")} strokeWidth="0.8" />
      <rect x="34" y="34" width="472" height={h - 68} fill="none" stroke={m("leaf")} strokeWidth="1" />
      {across.map((x) => [21, h - 21].map((y) => <InlayFlower key={`${x}-${y}`} x={x} y={y} s={0.7} />))}
      {down.slice(1, -1).map((y) => [21, 519].map((x) => <InlayFlower key={`${x}-${y}`} x={x} y={y} s={0.7} turn />))}
    </g>
  );
};

const nikkah: Design = {
  id: "pietra-dura",
  // White marble: a pale stone ground; the grey veins are drawn in the Overlay.
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 42%,#f6f5f2 0%,#ecebe6 60%,#dcdad3 100%)`,
  colors: {
    title: "#14523c",
    heading: "#1f3a30",
    text: "#1f2128",
    accent: "#7a6420",
    muted: "#4f5462",
    names: "#183268",
  },
  fonts: {
    title: '"Marcellus"',
    heading: '"Marcellus"',
    body: cormorant,
    names: '"Bodoni Moda"',
  },
  script: SCRIPT,
  type: { title: 2.3 },
  press: PAPER_PRESS,
  cover: { flourish: false },
  Top: () => <Svg h={40}>{null}</Svg>,
  Overlay: ({ h }) => (
    <Frame h={h}>
      <g transform={`scale(1 ${h / 960})`} fill="none" stroke="#8d8a82" strokeLinecap="round">
        {VEINS.map((d) => (
          <path key={d} d={d} strokeWidth="1.3" opacity="0.32" vectorEffect="non-scaling-stroke" />
        ))}
        {VEIN_FINE.map((d) => (
          <path key={d} d={d} strokeWidth="0.7" opacity="0.26" vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <InlayBorder h={h} />
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      {/* the niche: black inlay spandrels around a cusped arch of white marble */}
      <rect x="164" y="92" width="212" height="244" fill={INLAY} />
      <rect x="168" y="96" width="204" height="240" fill="none" stroke={m("leaf")} strokeWidth="0.8" />
      <path
        d="M180 336 V204 Q180 166 212 152 Q238 141 248 128 Q262 122 270 104 Q278 122 292 128 Q302 141 328 152 Q360 166 360 204 V336 Z"
        fill="#eeece6"
      />
      <path
        d="M186 336 V206 Q186 172 216 158 Q241 147 251 135 Q264 129 270 114 Q276 129 289 135 Q299 147 324 158 Q354 172 354 206 V336"
        fill="none"
        stroke={m("leaf")}
        strokeWidth="1"
      />
      <InlayFlower x={190} y={118} s={0.8} />
      <InlayFlower x={350} y={118} s={0.8} />
      <g transform="translate(270 336) scale(1.15) translate(-270 -336)">
        {/* vase */}
        <path
          d="M248 334 C232 324 236 300 254 294 L250 284 H290 L286 294 C304 300 308 324 292 334 Z"
          fill={LAPIS}
          stroke={INLAY}
          strokeWidth="1"
        />
        <path d="M252 284 H288" stroke={m("leaf")} strokeWidth="2" />
        <path d="M244 314 H296" stroke={m("leaf")} strokeWidth="0.8" />
        {/* stems, leaves and flowers */}
        <path
          d="M270 284 V176 M266 284 Q244 240 226 214 M274 284 Q296 240 314 214 M268 284 Q256 254 238 252 M272 284 Q284 254 302 252"
          fill="none"
          stroke={MALACHITE}
          strokeWidth="1.6"
        />
        <Leaf x={262} y={270} a={-40} s={0.8} />
        <Leaf x={278} y={270} a={40} s={0.8} />
        <Leaf x={252} y={236} a={-60} s={0.6} />
        <Leaf x={288} y={236} a={60} s={0.6} />
        <Tulip x={270} y={180} a={0} c={CARNELIAN} s={1.2} />
        <Tulip x={226} y={216} a={-24} c={LAPIS} />
        <Tulip x={314} y={216} a={24} c={LAPIS} />
        <Tulip x={238} y={254} a={-60} c={CARNELIAN} s={0.8} />
        <Tulip x={302} y={254} a={60} c={CARNELIAN} s={0.8} />
      </g>
      <InlayFlower x={110} y={290} />
      <InlayFlower x={430} y={290} />
    </Scene>
  ),
  safe: {
    story: { top: 76, bottom: 250, x: 50 },
    print: { top: 62, bottom: 206, x: 44 },
  },
};

/* ------------------------------------------------------------------ */
/* Rose window: a gothic rose of ruby and sapphire glass in gold-leaf */
/* tracery, a cross at its heart, on pale mist.                        */

const RUBY_G = "#b8273a";
const SAPPHIRE = "#2a5aa8";
const AMBER = "#e3a33a";
const LEAD = "#2b2f45";

function Rose({ x, y, r }: { x: number; y: number; r: number }) {
  const lancet = `M${r * 0.3} 0 C${r * 0.45} ${-r * 0.1} ${r * 0.75} ${-r * 0.12} ${r * 0.86} 0 C${r * 0.75} ${r * 0.12} ${r * 0.45} ${r * 0.1} ${r * 0.3} 0 Z`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r * 1.06} fill={LEAD} />
      <circle r={r} fill="#dfe6f0" />
      {ring(12, (a, i) => (
        <g key={i} transform={`rotate(${a})`}>
          <path
            d={lancet}
            fill={i % 2 ? SAPPHIRE : RUBY_G}
            stroke={LEAD}
            strokeWidth="1.4"
          />
          <path
            d={`M${r * 0.42} 0 H${r * 0.78}`}
            stroke={LEAD}
            strokeWidth="0.8"
          />
          <circle cx={r * 0.62} r={r * 0.03} fill={AMBER} />
        </g>
      ))}
      {ring(24, (a, i) => (
        <circle
          key={i}
          cx={Math.cos(rad(a + 7.5)) * r * 0.92}
          cy={Math.sin(rad(a + 7.5)) * r * 0.92}
          r={r * 0.06}
          fill={i % 2 ? AMBER : SAPPHIRE}
          stroke={LEAD}
          strokeWidth="1"
        />
      ))}
      {ring(12, (a, i) => (
        <path
          key={i}
          d={`M${r * 0.3} 0 L${r * 0.86} 0`}
          transform={`rotate(${a + 15})`}
          stroke={m("leaf")}
          strokeWidth="1.6"
        />
      ))}
      <circle r={r * 1.03} fill="none" stroke={m("leaf")} strokeWidth="3" />
      <circle r={r * 0.86} fill="none" stroke={m("leaf")} strokeWidth="1.6" />
      <circle
        r={r * 0.3}
        fill={SAPPHIRE}
        stroke={m("leaf")}
        strokeWidth="2.4"
      />
      <path
        d={`M0 ${-r * 0.2} V${r * 0.2} M${-r * 0.12} ${-r * 0.06} H${r * 0.12}`}
        stroke={m("leaf")}
        strokeWidth={r * 0.05}
        strokeLinecap="round"
      />
    </g>
  );
}

const rose: Design = {
  id: "rose-window",
  sky: `${GRAIN}, radial-gradient(ellipse at 50% 30%,#f3f5f8 0%,#e7ebf0 60%,#d6dce4 100%)`,
  colors: {
    title: "#2a3566",
    heading: "#2b2f45",
    text: "#1e2129",
    accent: "#7e6418",
    muted: "#4f5566",
    names: "#253060",
  },
  fonts: {
    title: '"Gloock"',
    heading: '"Cinzel"',
    body: cormorant,
    names: '"Pinyon Script"',
  },
  script: SCRIPT,
  type: { title: 2.4, names: 2.5 },
  press: PAPER_PRESS,
  cover: { emblem: false, flourish: false },
  Top: () => (
    <Svg h={240}>
      <Rose x={270} y={124} r={104} />
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
      <rect
        x="20"
        y="20"
        width="500"
        height={h - 40}
        fill="none"
        stroke={m("leaf")}
        strokeWidth="0.4"
      />
    </Frame>
  ),
  Bottom: () => (
    <Scene>
      <path d="M200 310 H340" stroke={m("leaf")} strokeWidth="0.8" />
      <path
        d="M270 300 V320 M264 306 H276"
        stroke={m("leaf")}
        strokeWidth="1.4"
      />
    </Scene>
  ),
  safe: {
    story: { top: 246, bottom: 64, x: 50 },
    print: { top: 206, bottom: 52, x: 42 },
  },
};

export const designs: Design[] = [
  kolam,
  thanjavur,
  phulkari,
  kalire,
  genda,
  deco,
  nikkah,
  rose,
];

export const templates: Template[] = [
  {
    id: "kolam-nischayathartham",
    name: "Kolam Kaavi Nischayathartham",
    design: "kolam",
    lang: "ta",
    symbol: "balaji",
    event: "ring",
  },
  {
    id: "thanjavur-gilt",
    name: "Thanjavur Gilt Mandapa",
    design: "thanjavur",
    lang: "ta",
    symbol: "balaji",
    event: "reception",
  },
  {
    id: "phulkari-bagh",
    name: "Phulkari Bagh Mehndi",
    design: "phulkari",
    lang: "pa",
    symbol: "floral",
    event: "mehendi",
  },
  {
    id: "kalire-chunni",
    name: "Kalire Gold Chunni",
    design: "kalire",
    lang: "pa",
    symbol: "ek-onkar",
    event: "ring",
  },
  {
    id: "genda-haldi",
    name: "Genda Marigold Haldi",
    design: "genda",
    lang: "en",
    symbol: "floral",
    event: "haldi",
  },
  {
    id: "deco-black-tie",
    name: "Deco Black Tie Save the Date",
    design: "deco",
    lang: "en",
    symbol: "floral",
    event: "save-the-date",
  },
  {
    id: "pietra-dura-walima",
    name: "Pietra Dura Nikkah & Walima",
    design: "pietra-dura",
    lang: "en",
    symbol: "bismillah",
    event: "reception",
    override: {
      title: "Walima Reception",
      hostLine:
        "Mr. & Mrs. Imran Khan and Mr. & Mrs. Salim Siddiqui request the pleasure of your company at the Walima of",
      bride: ["Zoya", "D/o Mrs. Rukhsar & Mr. Imran Khan"],
      groom: ["Ayaan", "S/o Mrs. Farah & Mr. Salim Siddiqui"],
      joiner: "&",
      rsvp: "Khan & Siddiqui Families\n+91 98765 43210",
    },
  },
  {
    id: "rose-window-wedding",
    name: "Rose Window Church Wedding",
    design: "rose-window",
    lang: "en",
    symbol: "christian",
    event: "wedding",
    // A church wedding: nuptial mass and reception instead of baraat and pheras.
    override: {
      title: "Holy Matrimony",
      hostLine:
        "Mrs. Grace & Mr. Thomas D'Souza request the honour of your presence at the marriage of their daughter",
      bride: ["Anita", "D/o Mrs. Grace & Mr. Thomas D'Souza"],
      groom: ["Joel", "S/o Mrs. Mary & Mr. Peter Fernandes"],
      time: "Nuptial Mass at 4:00 PM",
      venue: "St. Andrew's Church",
      address: "Hill Road, Bandra West, Mumbai",
      rsvp: "D'Souza & Fernandes Families\n+91 98765 43210",
      functions: {
        title: "Before the Big Day",
        sections: [
          [
            "Bridal Shower",
            "Friday, 19/11/2027\n6:00 PM\nHosted by the bridesmaids\nAt the bride's home, Bandra",
          ],
          [
            "Roce",
            "Saturday, 20/11/2027\n4:00 PM\nCoconut milk blessing for the bride and groom\nAt both family homes",
          ],
          [
            "A note from the little ones",
            "The bells will ring and we will carry the rings,\nour aunt is getting married, come early and sing with us!\n- Aaron, Tanya, Ryan, Mia",
          ],
        ],
      },
      ceremonies: {
        title: "The Wedding Day",
        sections: [
          ["Nuptial Mass", "Sunday, 21/11/2027\n4:00 PM\nSt. Andrew's Church"],
          ["Reception", "7:30 PM\nToast, cake and first dance"],
          [
            "Dinner and Dance",
            "8:30 PM onwards\nYou are invited *with family*",
          ],
          ["Reception Venue", "Taj Lands End\nBandstand, Bandra West, Mumbai"],
        ],
      },
      letter: {
        title: "With Joy",
        body: "Dear friends and family,\nWith thanks to God for His many blessings,\nwe joyfully invite you to the marriage of our daughter\n*Anita*\nwith\n*Joel*\nson of Mrs. Mary & Mr. Peter Fernandes,\non Sunday, 21/11/2027.\nPlease join us in prayer and celebration.",
      },
      family: {
        title: "With Love From",
        sections: [
          [
            "The families",
            "Mr. Thomas D'Souza\nMr. Joseph D'Souza\nMr. Peter Fernandes\nMr. Francis Fernandes",
          ],
          ["Grandparents", "Mrs. Rosy & Mr. Anthony D'Souza"],
          [
            "Bridesmaids and best man",
            "Ms. Sonia Pereira\nMs. Leah Rodrigues\nMr. Kevin Fernandes",
          ],
        ],
      },
      message: {
        title: "A Digital Invitation",
        body: "Please accept this digital card as our personal invitation.\nKindly reply *OK* once you have read it.\n*The D'Souza Family*\nwelcomes you with love.",
      },
    },
  },
];
