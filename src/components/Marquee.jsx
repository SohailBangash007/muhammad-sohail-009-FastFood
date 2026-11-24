import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const words = [
  'Juicy Smash Burgers',
  'Wood-Fired Pizza',
  'Crispy Fast Food',
  '100% Halal',
  'Made Fresh Daily',
]

export default function Marquee() {
  const track = useRef(null)

  useLayoutEffect(() => {
    const animation = gsap.to(track.current, {
      xPercent: -50,
      duration: 26,
      ease: 'none',
      repeat: -1,
    })
    return () => animation.kill()
  }, [])

  return (
    <div className="force-dark overflow-hidden border-y border-flame-deep/30 bg-flame py-4">
      <div ref={track} className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {words.map((word) => (
              <span key={word} className="flex items-center">
                <span className="px-6 text-sm font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap sm:text-base">
                  {word}
                </span>
                <span className="animate-spin-slow inline-block text-xl text-white/70">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
