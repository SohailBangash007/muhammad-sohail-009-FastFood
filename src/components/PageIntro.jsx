import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ChevronRight } from 'lucide-react'
import { RoyalSeal, SmartImage } from './ui.jsx'
import { useScrollSpin } from '../hooks/useRoyalMotion.js'

gsap.registerPlugin(ScrollTrigger)

export default function PageIntro({
  eyebrow = 'Welcome to M.Sohail',
  title,
  accent,
  description,
  image,
  crumb = 'About',
}) {
  const root = useRef(null)
  const bg = useRef(null)

  useScrollSpin(root, '.intro-seal', {
    from: -60,
    to: 160,
    start: 'top top',
    end: 'bottom top',
  })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.intro-line', {
        yPercent: 120,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.25,
      })
      gsap.from('.intro-fade', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.6,
      })
      gsap.to(bg.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="force-dark texture relative isolate flex min-h-[68vh] items-end overflow-hidden pt-32 pb-16">
      <div ref={bg} className="absolute inset-0 -z-20 scale-110 will-change-transform">
        <SmartImage src={image} alt="" imgClass="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/50" />

      <RoyalSeal
        monogram="✦"
        caption="M.SOHAIL · "
        size={132}
        scrollRotate={170}
        className="intro-seal pointer-events-none absolute right-8 bottom-16 hidden text-gold/60 lg:grid"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="intro-fade flex items-center gap-2 text-xs font-semibold tracking-widest text-cream/50 uppercase">
          <Link to="/" className="transition-colors hover:text-flame">Home</Link>
          <ChevronRight size={13} className="text-flame" />
          <span className="text-flame">{crumb}</span>
        </div>

        <span className="intro-fade mt-6 inline-block text-xs font-bold tracking-[0.32em] text-flame uppercase">
          {eyebrow}
        </span>

        <h1 className="mt-4 max-w-4xl text-[clamp(2.8rem,8vw,6.8rem)] leading-[0.95] font-extrabold tracking-[-0.04em] uppercase">
          <span className="block overflow-hidden pb-1">
            <span className="intro-line block">{title}</span>
          </span>
          {accent && (
            <span className="block overflow-hidden pb-2">
              <span className="intro-line block font-serif font-medium normal-case tracking-tight text-flame italic">
                {accent}
              </span>
            </span>
          )}
        </h1>

        {description && (
          <p className="intro-fade mt-5 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
            {description}
          </p>
        )}

        <div className="intro-fade mt-10 flex items-center gap-3 text-xs tracking-[0.3em] text-cream/40 uppercase">
          <ArrowDown size={16} className="animate-bounce text-flame" /> Scroll to explore
        </div>
      </div>
    </section>
  )
}
