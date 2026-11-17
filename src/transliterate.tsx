import { useEffect, useRef, useState, type InputHTMLAttributes, type KeyboardEvent } from 'react'
import type { Lang } from './types'

// Phonetic typing: "krupa" -> "કૃપા". Uses Google Input Tools (the engine behind Gboard's
// transliteration). Only the word being typed is sent, never the rest of the invite.
// ponytail: unofficial endpoint; if it goes away, swap in @indic-transliteration/sanscript (rule-based).
const cache = new Map<string, string[]>()

async function suggest(word: string, lang: Lang): Promise<string[]> {
  const key = `${lang}:${word.toLowerCase()}`
  const hit = cache.get(key)
  if (hit) return hit
  const url = `https://inputtools.google.com/request?text=${encodeURIComponent(word)}&itc=${lang}-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8`
  const res = await fetch(url)
  const json = await res.json()
  const list: string[] = json?.[0] === 'SUCCESS' ? (json[1]?.[0]?.[1] ?? []) : []
  cache.set(key, list)
  return list
}

const LATIN_TAIL = /[A-Za-z]+$/

// Kankotris in these scripts print native numerals (૨૨/૧૧/૨૦૨૬), matching the sample text.
// Hindi, Punjabi and Tamil samples use 0-9, so those stay as typed.
const ZERO: Partial<Record<Lang, number>> = { gu: 0x0ae6, mr: 0x0966 }
const nativeDigits = (v: string, lang: Lang) => {
  const z = ZERO[lang]
  return z ? v.replace(/[0-9]/g, (d) => String.fromCharCode(z + +d)) : v
}

type Props = Omit<InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, 'onChange' | 'value'> & {
  value: string
  onChange: (v: string) => void
  lang: Lang
  enabled?: boolean // false = plain input (English card, or user turned phonetic typing off)
  multiline?: boolean
  rows?: number
}

export function TransliterateInput({ value, onChange, lang, enabled = true, multiline, className, ...rest }: Props) {
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null)
  const [word, setWord] = useState('') // Latin word just before the caret
  // Suggestions remember which word they belong to, so a fast typist never gets the list for "krup" on "krupa".
  const [sugg, setSugg] = useState<{ word: string; list: string[] }>({ word: '', list: [] })
  const [active, setActive] = useState(0)
  const on = enabled && lang !== 'en'
  const options = on && word && sugg.word === word ? sugg.list : []
  // Latest text, updated as soon as we write it so async conversions never act on a stale copy.
  const latest = useRef({ value, onChange })
  latest.current = { value, onChange }
  const write = (v: string) => {
    latest.current.value = v
    latest.current.onChange(v)
  }

  useEffect(() => {
    if (!on || !word) return
    let stale = false
    const t = setTimeout(() => {
      suggest(word, lang)
        .then((list) => !stale && (setSugg({ word, list }), setActive(0)))
        .catch(() => {}) // offline: the Latin text simply stays
    }, 120)
    return () => {
      stale = true
      clearTimeout(t)
    }
  }, [word, lang, on])

  // Replace the Latin word before the caret with `choice`, then append `suffix`.
  const commit = (choice: string, suffix = '') => {
    const el = ref.current!
    const v = latest.current.value
    const caret = el.selectionStart ?? v.length
    const start = caret - word.length
    write(v.slice(0, start) + choice + suffix + v.slice(caret))
    setWord('')
    const pos = start + choice.length + suffix.length
    setTimeout(() => el.setSelectionRange(pos, pos)) // after React writes the new value
  }

  // A word was finished before its suggestions arrived (fast typing, or an Android keyboard that
  // sends no key events): swap in the top suggestion once it lands, if the word is still there.
  const convertLater = (start: number, latin: string) =>
    suggest(latin, lang).then(([top]) => {
      const v = latest.current.value
      if (!top || v.slice(start, start + latin.length) !== latin) return
      const el = ref.current
      const caret = el?.selectionStart ?? v.length
      write(v.slice(0, start) + top + v.slice(start + latin.length))
      const pos = caret > start ? caret + top.length - latin.length : caret
      if (el && document.activeElement === el) setTimeout(() => el.setSelectionRange(pos, pos))
    }, () => {}) // offline: the Latin word stays

  const onKeyDown = (e: KeyboardEvent) => {
    if (!on || !word) return
    if (e.key === 'Escape') return setWord('') // keep the English word
    const finish = e.key === ' ' || e.key === ',' || e.key === '.' || e.key === 'Enter' || e.key === 'Tab'
    if (!options.length) {
      // Space, comma, full stop and a textarea Enter type a character and convert in onChange.
      // A single-line Enter or a Tab types nothing, so convert here.
      if ((e.key === 'Enter' && !multiline) || e.key === 'Tab') {
        convertLater((ref.current!.selectionStart ?? 0) - word.length, word)
        setWord('')
      }
      return
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a + (e.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length)
    } else if (finish) {
      if (e.key !== 'Tab') e.preventDefault()
      commit(options[active], e.key === 'Enter' ? (multiline ? '\n' : '') : e.key === 'Tab' ? '' : e.key)
    }
  }

  const shared = {
    ref,
    value,
    className,
    onChange: (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
      const el = e.target
      const { selectionStart } = el
      const v = on ? nativeDigits(el.value, lang) : el.value
      if (v !== el.value) {
        // Same length, so the caret stays put.
        el.value = v
        el.setSelectionRange(selectionStart, selectionStart)
      }
      const caret = selectionStart ?? v.length
      const typed = v.length === latest.current.value.length + 1 ? v[caret - 1] : ''
      write(v)
      // The Latin word just got a space or punctuation after it: convert it.
      const start = caret - 1 - word.length
      if (on && word && /[\s,.!?]/.test(typed) && v.slice(start, caret - 1) === word) convertLater(start, word)
      setWord(v.slice(0, caret).match(LATIN_TAIL)?.[0] ?? '')
    },
    onKeyDown,
    onBlur: () => {
      if (options.length) commit(options[active])
      else if (on && word) convertLater((ref.current!.selectionStart ?? 0) - word.length, word)
      setWord('')
    },
    lang: on ? lang : undefined,
    autoComplete: 'off',
    spellCheck: !on,
    ...rest,
  }

  return (
    <div className="relative">
      {multiline ? <textarea {...shared} /> : <input {...shared} />}
      {on && word && options.length > 0 && (
        <ul
          role="listbox"
          aria-label="Suggestions"
          className="absolute left-0 right-0 z-30 mt-1 flex flex-wrap gap-1 rounded-lg bg-white p-1.5 shadow-lg ring-1 ring-stone-200"
        >
          {options.map((o, i) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                // mousedown so the input's blur doesn't fire first and commit the wrong word
                onMouseDown={(e) => {
                  e.preventDefault()
                  commit(o)
                }}
                className={`rounded-md px-3 py-1.5 text-base ${i === active ? 'bg-maroon text-white' : 'text-stone-800 hover:bg-stone-100'}`}
              >
                {o}
              </button>
            </li>
          ))}
          <li className="ml-auto self-center px-2 text-xs text-stone-500">Space to accept · Esc keeps “{word}”</li>
        </ul>
      )}
    </div>
  )
}
