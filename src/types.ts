// Single serializable source of truth for an invite. Persisted to localStorage today;
// the same JSON is intended to power a hosted couple microsite in Phase 2.

export type ThemeId = 'royal-marigold' | 'pastel-peach' | 'classic-crimson'
export type AuspiciousHeader = 'ganesh' | 'ikonkar' | 'bismillah' | 'custom' | 'none'
export type EventId = 'haldi' | 'sangeet' | 'reception'
export type PageId = 'cover' | EventId

export interface Person {
  name: string
  parents: string
  grandparents: string
}

export interface EventInfo {
  date: string // ISO yyyy-mm-dd
  time: string // free text, e.g. "Shubh Muhurat 7:45 PM"
  venue: string
  address: string
}

export interface WeddingInviteData {
  version: 1
  themeId: ThemeId
  cover: {
    header: AuspiciousHeader
    customHeader: string
    bride: Person
    groom: Person
    wedding: EventInfo
  }
  events: {
    haldi: EventInfo & { dressCode: string }
    sangeet: EventInfo & { rsvp: string }
    reception: EventInfo & { hosts: string }
  }
  // Event pages in display order; the cover is always page 1.
  pages: { id: EventId; enabled: boolean }[]
}

const emptyEvent = (): EventInfo => ({ date: '', time: '', venue: '', address: '' })
const emptyPerson = (): Person => ({ name: '', parents: '', grandparents: '' })

export const defaultInvite = (themeId: ThemeId = 'royal-marigold'): WeddingInviteData => ({
  version: 1,
  themeId,
  cover: {
    header: 'ganesh',
    customHeader: '',
    bride: emptyPerson(),
    groom: emptyPerson(),
    wedding: emptyEvent(),
  },
  events: {
    haldi: { ...emptyEvent(), dressCode: '' },
    sangeet: { ...emptyEvent(), rsvp: '' },
    reception: { ...emptyEvent(), hosts: '' },
  },
  pages: [
    { id: 'haldi', enabled: true },
    { id: 'sangeet', enabled: true },
    { id: 'reception', enabled: true },
  ],
})

export const sampleInvite = (themeId: ThemeId, pages: WeddingInviteData['pages']): WeddingInviteData => ({
  version: 1,
  themeId,
  cover: {
    header: 'ganesh',
    customHeader: '',
    bride: {
      name: 'Ananya Sharma',
      parents: 'Mr. Rajesh Sharma & Mrs. Sunita Sharma',
      grandparents: 'Late Shri Ramnath Sharma & Smt. Kamla Devi Sharma',
    },
    groom: {
      name: 'Arjun Mehta',
      parents: 'Mr. Vikram Mehta & Mrs. Neeta Mehta',
      grandparents: 'Shri Harish Mehta & Smt. Savitri Mehta',
    },
    wedding: {
      date: '2027-02-14',
      time: 'Shubh Muhurat · 7:45 PM',
      venue: 'The Leela Palace',
      address: 'Lake Pichola, Udaipur, Rajasthan',
    },
  },
  events: {
    haldi: {
      date: '2027-02-12',
      time: '11:00 AM onwards',
      venue: 'Poolside Lawns, The Leela Palace',
      address: 'Udaipur, Rajasthan',
      dressCode: 'Shades of yellow & green',
    },
    sangeet: {
      date: '2027-02-13',
      time: '7:30 PM onwards',
      venue: 'Grand Durbar Hall',
      address: 'The Leela Palace, Udaipur',
      rsvp: 'Rohan Sharma · +91 98765 43210',
    },
    reception: {
      date: '2027-02-15',
      time: '8:00 PM onwards',
      venue: 'Lakeside Terrace',
      address: 'The Leela Palace, Udaipur',
      hosts: 'The Sharma & Mehta Families',
    },
  },
  pages,
})

const STORAGE_KEY = 'shaadidraft:invite'

export function loadInvite(): WeddingInviteData {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (parsed?.version === 1) return parsed
  } catch {
    // corrupt or unavailable storage: fall through to a fresh invite
  }
  return defaultInvite()
}

export function saveInvite(data: WeddingInviteData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // private mode / quota: editing still works, just not persisted
  }
}
