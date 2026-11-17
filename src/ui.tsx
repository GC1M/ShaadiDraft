import { useEffect, useRef, useState, type ReactNode } from 'react'

// AdSense-ready slot. Renders nothing visible until a real ad is wired in, but keeps its height
// so the ad never shifts layout.
export function AdSlot({ slot, className = '' }: { slot: string; className?: string }) {
  return <div data-ad-slot={slot} aria-hidden className={`min-h-[100px] ${className}`} />
}

// Renders a fixed-size card scaled down to fit its container width (never up).
export function ScaledCard({ w, h, children, className = 'shadow-xl', max = 1 }: { w: number; h: number; children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setScale(Math.min(max, e.contentRect.width / w)))
    ro.observe(ref.current!)
    return () => ro.disconnect()
  }, [w, max])
  return (
    <div ref={ref} className="mx-auto w-full" style={{ maxWidth: w * max }}>
      <div style={{ height: h * scale }}>
        <div className={className} style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function Segmented<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: { id: T; label: ReactNode }[]; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap rounded-full bg-stone-200/70 p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={o.id === value}
          onClick={() => onChange(o.id)}
          className={`rounded-full px-3.5 py-1.5 text-sm transition ${o.id === value ? 'bg-white text-maroon shadow-sm' : 'text-stone-600 hover:text-maroon'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
