import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CARD_H, CARD_W } from './card/RoyalMarigold'

// AdSense-ready placeholder. Reserve height so a real ad never shifts layout.
export function AdSlot({ slot, className = '' }: { slot: string; className?: string }) {
  return (
    <div
      data-ad-slot={slot}
      aria-label="Advertisement"
      className={`flex min-h-[100px] items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 text-[11px] uppercase tracking-widest text-stone-400 ${className}`}
    >
      Advertisement
    </div>
  )
}

// Renders a fixed-size card scaled down to fit its container width.
export function ScaledCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / CARD_W)))
    ro.observe(ref.current!)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} className="mx-auto w-full" style={{ maxWidth: CARD_W }}>
      <div style={{ height: CARD_H * scale }}>
        <div className="shadow-xl" style={{ width: CARD_W, height: CARD_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
