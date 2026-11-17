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
  const [options, setOptions] = useState<string[]>([])
  const [active, setActive] = useState(0)
  const on = enabled && lang !== 'en'

  useEffect(() => {
    if (!on || !word) return setOptions([])
    let stale = false
    const t = setTimeout(() => {
      suggest(word, lang)
        .then((list) => !stale && (setOptions(list), setActive(0)))
        .catch(() => !stale && setOptions([])) // offline: the Latin text simply stays
    }, 120)
    return () => {
      stale = true
      clearTimeout(t)
    }
  }, [word, lang, on])


  // Replace the Latin word before the caret with `choice`, then append `suffix`.
  const commit = (choice: string, suffix = '') => {
    const el = ref.current!
    const caret = el.selectionStart ?? value.length
    const start = caret - word.length
    const next = value.slice(0, start) + choice + suffix + value.slice(caret)
    onChange(next)
    setWord('')
    setOptions([])
    const pos = start + choice.length + suffix.length
    setTimeout(() => el.setSelectionRange(pos, pos)) // after React writes the new value
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (!options.length || !word) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a + (e.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length)
    } else if (e.key === ' ' || e.key === ',' || e.key === '.' || e.key === 'Enter' || e.key === 'Tab') {
      if (e.key !== 'Tab') e.preventDefault()
      commit(options[active], e.key === 'Enter' ? (multiline ? '\n' : '') : e.key === 'Tab' ? '' : e.key)
    } else if (e.key === 'Escape') {
      setOptions([])
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
      onChange(v)
      setWord(v.slice(0, selectionStart ?? v.length).match(LATIN_TAIL)?.[0] ?? '')
    },
    onKeyDown,
    onBlur: () => {
      if (options.length && word) commit(options[active])
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
