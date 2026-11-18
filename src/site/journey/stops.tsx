import { EVENTS, PageSwitch, STORY, VENUE, downloadIcs } from '../shared'

// What every 3D walk says, and the HTML that says it: the intro, the four chapters of the couple's story,
// the programme of ceremonies, and the map of places.

const ROMAN = ['I', 'II', 'III', 'IV']
export const placeNames = (first: string, last: string) => [first, ...STORY.map((s) => s.year), 'Celebrations', last]

export function WalkIntro({ show, line }: { show: boolean; line: string }) {
  return (
    <div className="pw-intro" data-show={show || undefined}>
      <p className="font-deva text-lg text-(--ov-zari)">॥ शुभ विवाह ॥</p>
      <h1 className="ov-display mt-3 text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.92]">
        Ananya <i className="ov-amp">&amp;</i> Arjun
      </h1>
      <p className="ov-meta mt-5">20 and 21 November 2027, Udaipur</p>
      <p className="mt-8 text-[15px] text-(--ov-mogra)/80">{line}</p>
      <span aria-hidden className="ov-cue mx-auto mt-5 block" />
    </div>
  )
}

// One chapter: the photograph in an arched frame, the words beside it. Chapters alternate sides.
export function Chapter({ i, show }: { i: number; show: boolean }) {
  const s = STORY[i]
  return (
    <article className={`pw-chapter ${i % 2 ? 'pw-right' : 'pw-left'}`} data-show={show || undefined} inert={!show}>
      <figure className="pw-arch">
        <img src={s.photo.src} srcSet={s.photo.srcSet} sizes="(max-width: 767px) 8rem, 18rem" alt={s.photo.alt} loading="lazy" style={{ objectPosition: s.photo.pos }} />
      </figure>
      <div className="pw-words">
        <p className="ov-meta text-(--ov-zari)">
          Chapter {ROMAN[i]}, {s.year}
        </p>
        <h2 className="ov-display mt-3 text-[clamp(2.1rem,4.2vw,4rem)] leading-[0.95]">{s.title}</h2>
        <p className="mt-4 leading-relaxed text-(--ov-mogra)/85">{s.body}</p>
      </div>
    </article>
  )
}

// The three ceremonies on one printed-programme card.
export function Programme({ show }: { show: boolean }) {
  return (
    <section className="pw-programme" data-show={show || undefined} inert={!show} aria-label="The celebrations">
      <p className="ov-meta text-center text-(--ov-zari)">November 2027, The Leela Palace, Lake Pichola</p>
      <ol className="pw-days">
        {EVENTS.map((e) => (
          <li key={e.id}>
            <img className="pw-medal" src={e.photo.small} alt={e.photo.alt} loading="lazy" style={{ objectPosition: e.photo.pos }} />
            <div>
              <h3 className="ov-display text-[clamp(2rem,3vw,2.6rem)] leading-none">{e.name}</h3>
              <p className="ov-meta mt-3 text-(--ov-zari)">{e.date.replace(/,? \d{4}$/, '')}</p>
              <p className="mt-2 text-[15px] text-(--ov-mogra)">{e.time}</p>
              <p className="pw-note mt-2 text-[14px] leading-relaxed text-(--ov-mogra)/70">{e.note}</p>
              <button type="button" onClick={() => downloadIcs(e)} className="pw-link mt-4">
                Add to calendar
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-7 flex justify-center">
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`} target="_blank" rel="noreferrer" className="ov-press ov-btn-line">
          Get directions
        </a>
      </div>
    </section>
  )
}

export function PlaceMap({ names, here, go }: { names: string[]; here: number; go: (k: number) => void }) {
  return (
    <nav aria-label="Places" className="pw-map">
      <span className="ov-monogram shrink-0" aria-label="Ananya and Arjun">
        A<i>&amp;</i>A
      </span>
      <ol className="flex gap-1 overflow-x-auto">
        {names.map((p, k) => (
          <li key={p}>
            <button type="button" onClick={() => go(k)} aria-current={here === k ? 'step' : undefined} className="pw-place">
              {p}
            </button>
          </li>
        ))}
      </ol>
      <PageSwitch className="hidden shrink-0 lg:block" />
    </nav>
  )
}
