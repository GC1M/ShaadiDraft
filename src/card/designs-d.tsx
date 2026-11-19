import type { Design } from './designs'
import type { Template } from '../templates'

const serif = '"Cormorant Garamond", Georgia, serif'

// Gujarati Sandhya kankotri: the couple's own pink dusk artwork, one painted scene per page,
// with the printed text removed (titles kept) so every language can be typed over it.
// Text band under each page's printed calligraphy title, in story px. Order follows the Gujarati page titles.
// [top, bottom, starting text size]: the original sets each page at its own size.
const SANDHYA_PAGES: [top: number, bottom: number, size: number][] = [[350, 380, 1.3], [295, 320, 1.08], [285, 275, 1.3], [345, 292, 1.3], [272, 310, 1.3], [258, 420, 1.55], [320, 370, 1.3]]
// Other languages: the pages without their Gujarati titles and invocations; text starts below the painted deity.
const SANDHYA_PLAIN_TOP = [145, 270, 240, 275, 255, 205, 200]
const sandhya: Design = {
  id: 'sandhya',
  sky: '#f1c4cf',
  colors: { title: '#3d5a2a', heading: '#3d5a2a', text: '#5b1f3c', accent: '#d0312d', muted: '#7a4560', names: '#7e224a' },
  fonts: { title: '"Pinyon Script"', heading: '"Marcellus"', body: serif, names: '"Pinyon Script"' },
  script: { gu: { title: '"Sandhya Gujarati Bold"', body: '"Sandhya Gujarati"' } },
  tracking: '0.04em',
  type: { body: 0.72, heading: 1.12, names: 2.15, rsvpHeading: 1.3, plainDate: true, lists: 'left', grow: 1.3 },
  ornaments: Object.fromEntries(
    Object.entries({ couple: 2.9, 'swirl-l': 2.6, 'swirl-r': 2.6, hands: 3.4, maps: 2.6 }).map(([k, w]) => [k, { src: `${import.meta.env.BASE_URL}templates/sandhya/${k}.png`, w }]),
  ),
  Top: () => null,
  Bottom: () => null,
  pages: SANDHYA_PAGES.map(([top, bottom, size], i) => ({
    src: `${import.meta.env.BASE_URL}templates/sandhya/${i + 1}.jpg`,
    top,
    bottom,
    size,
    head: true,
    plain: { src: `${import.meta.env.BASE_URL}templates/sandhya/${i + 1}-plain.jpg`, top: SANDHYA_PLAIN_TOP[i] },
  })),
  safe: { story: { top: 160, bottom: 320, x: 14 }, print: { top: 48, bottom: 182, x: 12 } },
}


export const designs: Design[] = [sandhya]

export const templates: Template[] = [
  { id: 'sandhya-kankotri', name: 'Sandhya Pink Dusk Kankotri', design: 'sandhya', lang: 'gu', symbol: 'ganesha', event: 'wedding', also: ['shiva', 'gel-mataji', 'swaminarayan'], featured: true },
]
