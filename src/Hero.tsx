import { PAGES } from './site/pages'

// The gallery's header and hero. vite.config.ts also renders this into index.html at build time (with intro on),
// so crawlers get the H1 and the page doesn't jump when React mounts. Keep it free of browser-only code.

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
const HERO = ['royal-udaipur', 'gulabi-kankotri', 'kanchipuram']

// intro: play the cards' entrance animation (only the prerendered copy does, so it doesn't replay on mount).
export function Hero({ draftName, intro = false }: { draftName?: string | null; intro?: boolean }) {
  return (
    <div className="velvet text-rose">
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

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-6 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-14">
        <div className="min-w-0">
          <h1 className="text-[13px] font-medium uppercase tracking-[0.22em] text-zari">Free Indian wedding invitation maker</h1>
          <p className="mt-4 font-display text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[68px] lg:text-[80px]">Invitations as grand as the wedding</p>
          <p className="mt-8 max-w-md text-[18px] leading-relaxed text-rose/85">
            Type your families' names in English or your own script, then download images for WhatsApp or a PDF for the press.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#templates" className="zari-button inline-block rounded-full px-8 py-4 text-[15px] font-medium text-wine-deep">
              Choose a design
            </a>
            {draftName && (
              <a href="#edit" className="text-[15px] text-rose underline decoration-zari/70 underline-offset-[6px] hover:decoration-zari">
                Continue {draftName}
              </a>
            )}
          </div>
          <p className="mt-8 text-sm text-rose/60">
            Free, with no login. English, <span lang="hi">हिन्दी</span>, <span lang="mr">मराठी</span>, <span lang="gu">ગુજરાતી</span>,{' '}
            <span lang="pa">ਪੰਜਾਬੀ</span> and <span lang="ta">தமிழ்</span>.
          </p>
        </div>
        <div className="relative order-first mx-auto h-[320px] w-full max-w-[460px] sm:h-[470px] lg:order-none" aria-hidden>
          {HERO.map((id, i) => (
            <div
              key={id}
              className={`${intro ? 'hero-card ' : ''}absolute top-2 w-[46%]`}
              style={{ left: `${3 + i * 24}%`, rotate: `${(i - 1) * 7}deg`, zIndex: i === 1 ? 2 : 1, animationDelay: intro ? `${i * 120}ms` : undefined }}
            >
              <img src={preview(id)} width={540} height={960} alt="" fetchPriority={i === 1 ? 'high' : 'auto'} className="h-auto w-full shadow-[0_30px_60px_-14px_rgba(10,0,4,0.75)]" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
