import type { CSSProperties, ReactNode } from 'react'
import type { EventInfo, PageId, WeddingInviteData } from '../types'

// A5 portrait (148 x 210 mm) at 3 px/mm. Export pixelRatio is set in pdf.ts.
export const CARD_W = 444
export const CARD_H = 630

const GOLD = '#b8860b'
const GOLD_LIGHT = '#d9a520'
const MARIGOLD = '#f08a00'
const MARIGOLD_DARK = '#c75b00'
const MAROON = '#7a1f1f'
const LEAF = '#3f7d2c'

export const PAGE_TITLES: Record<PageId, string> = {
  cover: 'Wedding',
  haldi: 'Haldi & Mehendi',
  sangeet: 'Sangeet Night',
  reception: 'Reception',
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return ''
  // Local date constructor: `new Date('2027-02-14')` is UTC and shifts a day west of GMT.
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const firstName = (name: string, fallback: string) => name.trim().split(/\s+/)[0] || fallback

/* ---------- SVG ornaments (no gradients/ids, so duplicate instances never clash) ---------- */

function Toran() {
  const xs = Array.from({ length: 14 }, (_, i) => 22 + i * 30.8)
  return (
    <svg viewBox={`0 0 ${CARD_W} 78`} width={CARD_W} height={78} className="absolute left-0 top-0">
      <path d={`M0 6 Q ${CARD_W / 2} 20 ${CARD_W} 6`} stroke={GOLD} strokeWidth="2.5" fill="none" />
      {xs.map((x, i) => {
        const beads = i % 2 ? 4 : 6
        const top = 6 + 14 * Math.sin((Math.PI * x) / CARD_W) * 0.7
        return (
          <g key={x}>
            <path d={`M${x} ${top} L${x} ${top + beads * 9 + 4}`} stroke={GOLD} strokeWidth="0.8" />
            {Array.from({ length: beads }, (_, j) => (
              <g key={j}>
                <circle cx={x} cy={top + 6 + j * 9} r="4.6" fill={j % 3 === 2 ? GOLD_LIGHT : MARIGOLD} />
                <circle cx={x} cy={top + 6 + j * 9} r="2" fill={MARIGOLD_DARK} />
              </g>
            ))}
            <path
              d={`M${x} ${top + beads * 9 + 3} l-3.5 7 l3.5 3 l3.5 -3 z`}
              fill={i % 2 ? LEAF : MAROON}
            />
            {/* mango leaves between strings */}
            <ellipse cx={x + 15} cy={top + 4} rx="3" ry="8" fill={LEAF} transform={`rotate(-20 ${x + 15} ${top + 4})`} />
          </g>
        )
      })}
    </svg>
  )
}

function Corner({ style }: { style: CSSProperties }) {
  const angles = Array.from({ length: 6 }, (_, i) => 7.5 + i * 15)
  return (
    <svg viewBox="0 0 100 100" width={92} height={92} className="absolute" style={style}>
      {angles.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d="M14 0 Q 30 -8 46 0 Q 30 8 14 0Z" fill={MARIGOLD} opacity="0.9" />
          <ellipse cx="56" cy="0" rx="5" ry="2.6" fill={GOLD_LIGHT} />
          <circle cx="68" cy="0" r="1.6" fill={MAROON} />
        </g>
      ))}
      <path d="M62 0 A62 62 0 0 1 0 62" stroke={GOLD} strokeWidth="1.4" fill="none" />
      <path d="M76 0 A76 76 0 0 1 0 76" stroke={GOLD} strokeWidth="1" strokeDasharray="2 3" fill="none" />
      <circle r="16" fill={MAROON} />
      <circle r="10" fill={GOLD_LIGHT} />
    </svg>
  )
}

function Mandala({ size, opacity = 1, className = '' }: { size: number; opacity?: number; className?: string }) {
  const rings = [
    { n: 8, r: 22, rx: 10, ry: 5, fill: MAROON },
    { n: 16, r: 44, rx: 12, ry: 4.5, fill: MARIGOLD },
    { n: 24, r: 70, rx: 10, ry: 3.2, fill: GOLD_LIGHT },
  ]
  return (
    <svg viewBox="-100 -100 200 200" width={size} height={size} style={{ opacity }} className={className}>
      <circle r="92" stroke={GOLD} strokeWidth="1.5" fill="none" />
      <circle r="86" stroke={GOLD} strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
      {rings.map(({ n, r, rx, ry, fill }) =>
        Array.from({ length: n }, (_, i) => (
          <ellipse key={`${r}-${i}`} cx={r} cy="0" rx={rx} ry={ry} fill={fill} transform={`rotate(${(360 / n) * i})`} />
        )),
      )}
      <circle r="56" stroke={GOLD} strokeWidth="1" fill="none" />
      <circle r="10" fill={GOLD} />
      <circle r="5" fill={MAROON} />
    </svg>
  )
}

function LotusDivider() {
  return (
    <svg viewBox="0 0 160 28" width={160} height={28} className="mx-auto">
      <line x1="0" y1="22" x2="52" y2="22" stroke={GOLD} strokeWidth="1" />
      <line x1="108" y1="22" x2="160" y2="22" stroke={GOLD} strokeWidth="1" />
      <circle cx="48" cy="22" r="2" fill={MARIGOLD} />
      <circle cx="112" cy="22" r="2" fill={MARIGOLD} />
      {[-60, -30, 0, 30, 60].map((a) => (
        <ellipse key={a} cx="80" cy="12" rx="4.5" ry="10" fill={a ? MARIGOLD : MAROON} transform={`rotate(${a} 80 22)`} />
      ))}
      <path d="M66 23 Q80 30 94 23" stroke={GOLD} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

/* ---------- Layout pieces ---------- */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative overflow-hidden font-serif"
      style={{
        width: CARD_W,
        height: CARD_H,
        color: '#3b2314',
        background: 'radial-gradient(ellipse at 50% 40%, #fffaf0 0%, #fdf0d5 60%, #f7deb0 100%)',
      }}
    >
      <div className="absolute" style={{ inset: 12, border: `2px solid ${GOLD}` }} />
      <div className="absolute" style={{ inset: 18, border: `1px solid ${GOLD}` }} />
      <Corner style={{ left: 0, bottom: 0, transform: 'scaleY(-1)' }} />
      <Corner style={{ right: 0, bottom: 0, transform: 'scale(-1,-1)' }} />
      <Toran />
      <div className="absolute inset-x-0 flex flex-col items-center text-center" style={{ top: 84, bottom: 40, padding: '0 44px' }}>
        {children}
      </div>
    </div>
  )
}

function Header({ data }: { data: WeddingInviteData }) {
  const { header, customHeader } = data.cover
  if (header === 'none') return null
  if (header === 'ganesh')
    return (
      <p className="font-deva text-[17px]" style={{ color: MAROON }}>
        ॥ श्री गणेशाय नमः ॥
      </p>
    )
  if (header === 'ikonkar')
    return (
      <p className="text-[26px] leading-none" style={{ color: MAROON }}>
        ੴ <span className="font-display align-middle text-[11px] tracking-[0.25em]">IK ONKAR</span>
      </p>
    )
  if (header === 'bismillah')
    return (
      <p className="text-[19px]" style={{ color: MAROON }} dir="rtl">
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </p>
    )
  return customHeader.trim() ? (
    <p className="font-display text-[13px] tracking-[0.2em]" style={{ color: MAROON }}>
      {customHeader}
    </p>
  ) : null
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-[9.5px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>
      {children}
    </p>
  )
}

function Name({ children }: { children: ReactNode }) {
  return (
    <p className="font-script text-[40px] leading-[1.15]" style={{ color: MARIGOLD_DARK }}>
      {children}
    </p>
  )
}

function When({ info, fallbackTime }: { info: EventInfo; fallbackTime: string }) {
  return (
    <div className="space-y-0.5">
      <p className="font-display text-[13px] font-bold tracking-[0.12em]" style={{ color: MAROON }}>
        {formatDate(info.date) || 'Date to be announced'}
      </p>
      <p className="text-[15px] font-semibold">{info.time || fallbackTime}</p>
      <p className="pt-1.5 text-[16px] font-semibold" style={{ color: MAROON }}>
        {info.venue || 'Venue'}
      </p>
      {info.address && <p className="text-[13.5px] italic">{info.address}</p>}
    </div>
  )
}

/* ---------- Pages ---------- */

function Cover({ data }: { data: WeddingInviteData }) {
  const { bride, groom, wedding } = data.cover
  const grandparents = [bride.grandparents, groom.grandparents].filter(Boolean)
  return (
    <Frame>
      <Mandala size={300} opacity={0.07} className="absolute left-1/2 top-[160px] -translate-x-1/2" />
      <div className="relative flex h-full flex-col items-center justify-between">
        <div className="space-y-1.5">
          <Header data={data} />
          {grandparents.length > 0 && (
            <div className="pt-1">
              <Label>With the blessings of</Label>
              {grandparents.map((g) => (
                <p key={g} className="text-[12.5px] italic leading-snug">
                  {g}
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-[14px] italic">request the honour of your presence at the wedding of</p>
          <Name>{bride.name || "Bride's Name"}</Name>
          {bride.parents && <p className="text-[12.5px]">daughter of {bride.parents}</p>}
          <p className="font-script my-0.5 text-[28px] leading-none" style={{ color: GOLD }}>
            with
          </p>
          <Name>{groom.name || "Groom's Name"}</Name>
          {groom.parents && <p className="text-[12.5px]">son of {groom.parents}</p>}
        </div>

        <div className="space-y-2">
          <LotusDivider />
          <When info={wedding} fallbackTime="Muhurat time" />
        </div>
      </div>
    </Frame>
  )
}

const EVENT_COPY = {
  haldi: { blurb: 'Join us for a morning of turmeric, henna & laughter', extraLabel: 'Dress Code' },
  sangeet: { blurb: 'An evening of music, dance & celebration', extraLabel: 'RSVP' },
  reception: { blurb: 'Celebrate the newlyweds with dinner & blessings', extraLabel: 'Hosted by' },
} as const

function EventPage({ data, id }: { data: WeddingInviteData; id: 'haldi' | 'sangeet' | 'reception' }) {
  const info = data.events[id]
  const extra = id === 'haldi' ? data.events.haldi.dressCode : id === 'sangeet' ? data.events.sangeet.rsvp : data.events.reception.hosts
  const couple = `${firstName(data.cover.bride.name, 'Bride')} & ${firstName(data.cover.groom.name, 'Groom')}`
  return (
    <Frame>
      <div className="flex h-full flex-col items-center justify-between">
        <Mandala size={110} />
        <div className="space-y-1">
          <p className="font-display text-[26px] font-bold tracking-[0.08em]" style={{ color: MAROON }}>
            {PAGE_TITLES[id]}
          </p>
          <p className="font-script text-[34px] leading-tight" style={{ color: MARIGOLD_DARK }}>
            {couple}
          </p>
          <p className="text-[14.5px] italic">{EVENT_COPY[id].blurb}</p>
        </div>
        <div className="space-y-2">
          <LotusDivider />
          <When info={info} fallbackTime="Time" />
        </div>
        <div className="min-h-[44px]">
          {extra && (
            <>
              <Label>{EVENT_COPY[id].extraLabel}</Label>
              <p className="text-[14.5px] font-semibold">{extra}</p>
            </>
          )}
        </div>
      </div>
    </Frame>
  )
}

export function RoyalMarigoldPage({ data, page }: { data: WeddingInviteData; page: PageId }) {
  return page === 'cover' ? <Cover data={data} /> : <EventPage data={data} id={page} />
}
