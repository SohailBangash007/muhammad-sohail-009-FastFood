import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Heart, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { images } from '../data/site.js'
import { Reveal, RoyalSeal, SectionHeading, SmartImage, easing } from './ui.jsx'
import { useScrollSpin } from '../hooks/useRoyalMotion.js'

gsap.registerPlugin(ScrollTrigger)

function Counter({ value, suffix = '', label }) {
  const number = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { n: 0 }
      gsap.to(counter, {
        n: value,
        duration: 2,
        ease: 'power2.out',
        snap: { n: 1 },
        scrollTrigger: {
          trigger: number.current,
          start: 'top 88%',
          once: true,
        },
        onUpdate: () => {
          number.current.textContent = `${counter.n}${suffix}`
        },
      })
    }, number)
    return () => ctx.revert()
  }, [value, suffix])

  return (
    <div>
      <div ref={number} className="font-serif text-4xl font-semibold text-flame sm:text-5xl">
        0{suffix}
      </div>
      <div className="mt-1 text-xs tracking-widest text-muted uppercase">{label}</div>
    </div>
  )
}

const promises = [
  { icon: ShieldCheck, title: '100% Halal', text: 'Certified meat, sourced with care.' },
  { icon: Leaf, title: 'Always Fresh', text: 'Cooked to order, never reheated.' },
  { icon: Heart, title: 'Made with Love', text: 'Real recipes, real flavour, every time.' },
]

export default function About() {
  const root = useRef(null)

  useScrollSpin(root, '.about-seal', { from: -80, to: 220 })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-image',
        { clipPath: 'inset(0 0 100% 0)', scale: 1.1 },
        {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: '.about-image', start: 'top 82%', once: true },
        },
      )

      gsap.from('.about-float', {
        scale: 0.75,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.about-image', start: 'top 78%', once: true },
      })

      // soft pill -> tailored frame, driven by the scrollbar
      gsap.fromTo(
        '.about-image',
        { borderRadius: 72, rotate: -2 },
        {
          borderRadius: 28,
          rotate: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-image',
            start: 'top 88%',
            end: 'top 38%',
            scrub: 1,
          },
        },
      )

      gsap.to('.about-image-inner', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={root} className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-flame/5 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        {/* image collage */}
        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="about-image relative h-[440px] overflow-hidden rounded-[2rem] sm:h-[560px]">
            <SmartImage
              src={images.interior}
              alt="Inside M.Sohail restaurant"
              imgClass="about-image-inner h-[115%] w-full object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>

          <div className="about-float absolute -right-2 -bottom-10 hidden h-48 w-44 overflow-hidden rounded-3xl border-[6px] border-ink shadow-2xl sm:block sm:-right-6">
            <SmartImage
              src={images.chef}
              alt="Our chef at work"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="about-float absolute -top-6 -left-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-charcoal/95 px-5 py-4 shadow-2xl backdrop-blur-xl sm:-left-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-flame/15 text-flame">
              <Sparkles size={20} />
            </span>
            <div>
              <div className="text-sm font-bold">Serving since 2010</div>
              <div className="text-xs text-muted">15+ years of flavour</div>
            </div>
          </div>

          <div className="about-float absolute right-6 bottom-24 rounded-xl bg-flame px-4 py-2.5 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-flame/30 sm:right-10">
            Always fresh
          </div>

          <RoyalSeal
            monogram="✦"
            caption="EST 2010 · "
            size={112}
            scrollRotate={200}
            className="about-seal absolute -bottom-12 -left-10 z-20 hidden text-gold sm:grid"
          />
        </div>

        {/* copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Our story"
            title={
              <>
                Where flavour <br />
                meets <span className="font-serif italic text-flame">fire.</span>
              </>
            }
            description="M.Sohail started as a tiny corner grill with one simple idea: great food should never feel ordinary. Today, we're still obsessed with the same thing — the perfect sear, the right spice, and that first bite that makes you close your eyes."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {promises.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={0.06 * i}>
                <motion.div
                  whileHover={{ y: -4, rotate: i % 2 === 0 ? -1 : 1, borderRadius: '1.75rem' }}
                  transition={{ duration: 0.35, ease: easing }}
                  className="group flex gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-gold/40 hover:bg-flame/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-flame/10 text-flame transition-transform duration-500 group-hover:-rotate-12">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-10 border-t border-white/10 pt-8">
            <Counter value={15} suffix="+" label="Years of experience" />
            <Counter value={20} suffix="+" label="Dishes on the menu" />
            <Counter value={15} suffix="k+" label="Happy customers" />
          </div>

          <Reveal delay={0.15}>
            <Link
              to="/menu"
              className="group mt-9 inline-flex items-center gap-3 border-b-2 border-flame pb-1 text-sm font-bold tracking-wide transition-colors hover:text-flame"
            >
              See what we're cooking
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
