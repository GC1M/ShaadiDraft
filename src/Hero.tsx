import { Fragment, type CSSProperties } from 'react'
import { PAGES } from './site/pages'

// The gallery's header and hero. vite.config.ts also renders this into index.html at build time, so crawlers get
// the H1 and the page doesn't jump when React mounts. Keep it free of browser-only code.

export const Wordmark = () => (
  <span className="inline-flex items-center gap-2.5 font-display text-2xl italic tracking-tight">
    <img src={`${import.meta.env.BASE_URL}logo-on-dark.svg`} alt="" width="28" height="30" className="-mt-1" />
    ShaadiTemplate{' '}
    <span className="ml-1 font-deva text-base not-italic text-zari">
      <span lang="hi">शादी</span>
    </span>
  </span>
)

export const preview = (id: string) => `templates/previews/${id}.webp`
// Gold line-art mandap, viewBox 1200x820, drawn in stages: platform, pillars, beam, domes,
// drapes, then marigold strings and diyas. Left-hand parts are drawn once and mirrored.
const g = (d: number, dur = 1.6) => ({ '--d': `${d}s`, '--dur': `${dur}s` }) as CSSProperties
const cusps = (n: number, w: number, h: number) => Array(n).fill(`q${w / 2} ${h} ${w} 0`).join(' ')
const Side = () => (
  <>
    <g style={g(0.4)}>
      <path d="M196 760V732H264V760M204 732V718H256V732" pathLength={1} />
      <path d="M212 718V344M248 718V344M212 650H248M212 570H248M212 490H248M212 410H248" pathLength={1} />
      <path d="M230 600l9 10-9 10-9-10zM230 520l9 10-9 10-9-10zM230 440l9 10-9 10-9-10z" pathLength={1} />
      <path d="M212 344Q212 332 202 328H258Q248 332 248 344M194 328V314H266V328" pathLength={1} />
    </g>
    <g style={g(1.5, 1.8)}>
      <path d="M182 288V274H278V288M188 274C178 238 206 214 230 188C254 214 282 238 272 274M230 188V172" pathLength={1} />
      <circle cx="230" cy="166" r="4" pathLength={1} />
    </g>
    <g style={g(2)}>
      <path d="M266 330C318 392 296 470 262 520C296 566 300 640 276 704M282 336C322 400 304 470 270 516" pathLength={1} />
      <circle cx="263" cy="520" r="6" pathLength={1} />
    </g>
    <g style={g(2.5, 1.2)}>
      <path d="M158 314V500M176 314V440" pathLength={1} />
      {[...Array(9)].map((_, i) => <circle key={`a${i}`} cx="158" cy={334 + i * 20} r="6" pathLength={1} />)}
      {[...Array(6)].map((_, i) => <circle key={`b${i}`} cx="176" cy={334 + i * 20} r="5" pathLength={1} />)}
      <path d="M130 748Q150 768 170 748Z" pathLength={1} />
      <path className="flame" d="M150 744Q142 730 150 712Q158 730 150 744Z" />
    </g>
  </>
)
function Mandap() {
  return (
    <svg className="mandap" viewBox="0 0 1200 820" aria-hidden>
      <g style={g(0, 1.4)}>
        <path d="M120 760H1080M90 760H1110V786H90ZM60 786H1140V812H60Z" pathLength={1} />
        <path d={Array.from({ length: 25 }, (_, i) => `M${114 + i * 40} 773l6-6 6 6-6 6z`).join('')} pathLength={1} />
      </g>
      <g style={g(1, 1.4)}>
        <path d="M140 314H1060M140 300H1060V314M140 300V314M128 300V288H1072V300" pathLength={1} />
        <path d={`M264 314${cusps(8, 84, 34)}`} pathLength={1} />
        <path d={Array.from({ length: 7 }, (_, i) => `M${348 + i * 84} 314v12m-4 0h8l-4 10z`).join('')} pathLength={1} />
      </g>
      <g style={g(1.5, 1.8)}>
        <path d={`M420 288V268H780V288M430 268${cusps(10, 34, -16)}`} pathLength={1} />
        <path d="M462 268C440 206 500 168 600 120C700 168 760 206 738 268" pathLength={1} />
        <path d="M434 268C404 196 480 150 600 92C720 150 796 196 766 268M600 92C556 150 532 210 540 268M600 92C644 150 668 210 660 268M600 92V78M586 78Q600 58 614 78ZM600 58V40" pathLength={1} />
        <circle cx="600" cy="34" r="6" pathLength={1} />
      </g>
      <g style={g(2)}>
        <path d="M264 330Q432 398 600 330Q768 398 936 330" pathLength={1} />
      </g>
      <Side />
      <g transform="matrix(-1 0 0 1 1200 0)">
        <Side />
      </g>
    </svg>
  )
}


// The intro (mandap drawing, headline) runs on the prerendered copy. When React replaces it, `elapsed` (ms since
// navigation) shifts every delay back so the animation carries on from the same point instead of restarting.
export function Hero({ draftName, elapsed = 0 }: { draftName?: string | null; elapsed?: number }) {
  return (
    <div className="velvet text-rose" style={{ '--t0': `${-Math.round(elapsed)}ms` } as CSSProperties}>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-6">
        <a href="#" aria-label="ShaadiTemplate home">
          <Wordmark />
        </a>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
          {[['Designs', 'templates/'], ['Guides', 'guides/'], ["A couple's wedding website", PAGES[0][1]]].map(([label, href]) => (
            <a key={href} href={href} className="text-rose/80 underline-offset-[6px] hover:text-rose hover:underline">
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* A gold mandap draws itself, and the headline stands in its opening. */}
      <section className="hero mandap-hero">
        <Mandap />
        <div className="hero-copy">
          <h1 className="intro text-[13px] font-medium uppercase tracking-[0.22em] text-zari" style={{ animationDelay: 'calc(700ms + var(--t0, 0ms))' }}>
            Free Indian wedding invitation maker
          </h1>
          <p className="mt-4 font-display text-[40px] leading-[1.04] tracking-[-0.02em] [text-wrap:balance] sm:text-[56px] lg:text-[64px]">
            {'Invitations as grand as the wedding'.split(' ').map((w, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="intro inline-block" style={{ animationDelay: `calc(${900 + i * 70}ms + var(--t0, 0ms))` }}>
                  {w}
                </span>
              </Fragment>
            ))}
          </p>
          <p className="intro intro-2 mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-rose/85">
            Type your families' names in English or your own script, then download images for WhatsApp or a PDF for the press.
          </p>
          <div className="intro intro-3 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <a href="#templates" className="zari-button shine relative inline-block overflow-hidden rounded-full px-8 py-4 text-[15px] font-medium text-wine-deep">
              Choose a design
            </a>
            {draftName && (
              <a href="#edit" className="text-[15px] text-rose underline decoration-zari/70 underline-offset-[6px] hover:decoration-zari">
                Continue {draftName}
              </a>
            )}
          </div>
          <p className="intro intro-4 mt-6 text-sm text-rose/60">
            Free, with no login. English, <span lang="hi">हिन्दी</span>, <span lang="mr">मराठी</span>, <span lang="gu">ગુજરાતી</span>,{' '}
            <span lang="pa">ਪੰਜਾਬੀ</span> and <span lang="ta">தமிழ்</span>.
          </p>
        </div>
      </section>
    </div>
  )
}
