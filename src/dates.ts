import type { Lang } from './types'

// Indian day-first date formats for the card's "Date & day" line.
export const DATE_FORMATS = ['dd/mm/yyyy', 'dd-mm-yyyy', 'dd.mm.yyyy', 'dd month yyyy'] as const
export type DateFormat = (typeof DATE_FORMATS)[number]

// Native digits where the sample text uses them.
const DIGITS: Partial<Record<Lang, string>> = { gu: 'gujr', mr: 'deva' }

// Some browsers ship no Punjabi calendar names (they print "M12", "Wed"), so Punjabi carries its own.
const PA_DAYS = ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁੱਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨੀਵਾਰ']
const PA_MONTHS = ['ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ']

// iso: "2026-12-02" from <input type="date">. Weekday wording follows each language's samples.
export function formatDate(iso: string, fmt: DateFormat, lang: Lang): string {
  const d = new Date(`${iso}T00:00:00Z`)
  const loc = `${lang}-IN-u-nu-${DIGITS[lang] ?? 'latn'}`
  const part = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(loc, { timeZone: 'UTC', ...o }).format(d)
  const day = part({ day: '2-digit' })
  const year = part({ year: 'numeric' })
  const date =
    fmt === 'dd month yyyy' ? `${day} ${lang === 'pa' ? PA_MONTHS[d.getUTCMonth()] : part({ month: 'long' })} ${year}` : [day, part({ month: '2-digit' }), year].join(fmt[2])
  const weekday = lang === 'pa' ? PA_DAYS[d.getUTCDay()] : part({ weekday: 'long' })
  if (lang === 'gu') return `તા. ${date} ને ${weekday}`
  if (lang === 'pa' || lang === 'ta') return `${date}, ${weekday}`
  return `${weekday}, ${date}`
}
