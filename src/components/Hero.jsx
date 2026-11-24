import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Flame, Phone, ShoppingBag, Star } from 'lucide-react'
import { images, menu } from '../data/site.js'
import { Counter, Magnetic, RoyalSeal, SmartImage, easing, formatPrice } from './ui.jsx'
import { useScrollSpin } from '../hooks/useRoyalMotion.js'

gsap.registerPlugin(ScrollTrigger)

const rotatingWords = ['Pure magic.', 'Made fresh.', 'Full of flavour.']

export default function Hero() {
  const root = useRef(null)
  const bg = useRef(null)
  const [wordIndex, setWordIndex] = useState(0)
  const special = menu[0]

  useScrollSpin(root, '.hero-stamp-scroll', {
    from: -25,
    to: 140,
    start: 'top top',
    end: 'bottom top',
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        yPercent: 115,
        duration: 1.15,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.15,
      })

      gsap.from('.hero-fade', {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.75,
      })

      gsap.from('.hero-ghost-letter', {
        yPercent: 70,
        opacity: 0,
        duration: 1.15,
        stagger: 0.09,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.to(bg.current, {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.hero-content', {
        y: -70,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '65% top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={root}
      className="force-dark texture relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* background — slow ken-burns + GSAP parallax */}
      <div ref={bg} className="absolute inset-0 -z-10 will-change-transform">
        <SmartImage
          src={images.hero}
          alt="Juicy burger fresh from the grill"
          imgClass="animate-ken-burns h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/65 to-ink/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-transparent to-ink/30" />
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* slow drifting colour orbs — depth without another zoom */}
      <div className="animate-blob pointer-events-none absolute -z-10 -top-32 right-[6%] h-96 w-96 rounded-full bg-flame/25 blur-[110px]" />
      <div className="animate-blob-reverse pointer-events-none absolute -z-10 -bottom-40 left-[18%] h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />

      {/* floating food emojis — always moving */}
      <div className="animate-float pointer-events-none absolute top-[18%] left-[54%] hidden text-4xl opacity-70 lg:block">🍟</div>
      <div className="animate-float pointer-events-none absolute top-[30%] right-[38%] hidden text-3xl opacity-60 [animation-delay:1.2s] lg:block">🔥</div>
      <div className="animate-float pointer-events-none absolute bottom-[22%] left-[44%] hidden text-3xl opacity-60 [animation-delay:2.1s] lg:block">🍔</div>

      {/* editorial side rail */}
      <div className="pointer-events-none absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        <span className="h-16 w-px bg-gradient-to-b from-transparent to-gold/60" />
        <span className="text-[10px] font-semibold tracking-[0.4em] text-cream/35 uppercase [writing-mode:vertical-rl]">
          Lahore · Since 2010
        </span>
        <span className="h-16 w-px bg-gradient-to-t from-transparent to-gold/60" />
      </div>

      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-28 sm:px-8">
        <div className="hero-fade mb-5 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
          <span className="text-[10px] font-bold tracking-[0.34em] text-gold/90 uppercase">
            Est. 2010 · M.Sohail signature
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="hero-fade mb-7 inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-flame/[0.07] px-4 py-2 text-xs font-semibold tracking-widest text-flame uppercase backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-flame" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
          </span>
          Open now · Delivery in 30 mins
        </motion.div>

        {/* brand nameplate — clear, glass-framed, letters appear one by one */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: easing, staggerChildren: 0.07 },
            },
          }}
          className="relative z-20 mb-6 flex w-fit items-center gap-4 overflow-hidden rounded-3xl border border-gold/30 bg-white/[0.055] px-4 py-3 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
        >
          <span className="hero-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
          <span className="relative flex h-12 w-12 items-center justify-center">
            <span className="orbit-spin pointer-events-none absolute -inset-1 rounded-2xl border border-dashed border-gold/60" />
            <img
              src="/logo.svg"
              alt=""
              aria-hidden="true"
              className="relative h-11 w-11 rounded-xl shadow-lg shadow-flame/30"
            />
          </span>
          <span className="flex flex-col">
            <span className="flex">
              {"M.Sohail".split('').map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  variants={{
                    hidden: { opacity: 0, y: 12, filter: 'blur(5px)' },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.5, ease: easing },
                    },
                  }}
                  className="inline-block text-3xl leading-none font-extrabold tracking-[0.1em] text-cream drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)] sm:text-4xl"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } },
              }}
              className="mt-1.5 text-[9px] font-bold tracking-[0.3em] text-gold/80 uppercase"
            >
              Food House · Lahore
            </motion.span>
          </span>
          <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
        </motion.div>

        {/* ghost watermark — fully on-screen now, letter-by-letter reveal */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-16 left-0 -z-10 flex select-none font-serif text-[clamp(5rem,11vw,10rem)] leading-none font-bold whitespace-nowrap text-transparent opacity-50 uppercase [-webkit-text-stroke:1.5px_rgba(245,185,66,0.3)]"
        >
          {"M.Sohail".split('').map((letter, i) => (
            <span key={`${letter}-${i}`} className="hero-ghost-letter inline-block">
              {letter}
            </span>
          ))}
        </span>

        <h1 className="relative z-10 max-w-4xl text-[clamp(3.2rem,10vw,8.5rem)] leading-[0.98] font-extrabold tracking-[-0.05em] uppercase">
          <span className="block overflow-hidden py-1.5">
            <span className="hero-line block text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
              Burgers.
            </span>
          </span>
          <span className="block overflow-hidden py-1.5">
            <span className="hero-line block text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
              Pizza.
            </span>
          </span>
          <span className="block overflow-hidden py-1.5">
            <span className="hero-line flex flex-wrap items-center gap-x-4 gap-y-2 font-serif font-medium normal-case tracking-tight italic">
              <span className="hero-medallion inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-flame/40 bg-flame/10 shadow-lg shadow-flame/20">
                <Flame size={19} className="fill-flame text-flame" />
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 36, rotateX: -50 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -36, rotateX: 50 }}
                  transition={{ duration: 0.55, ease: easing }}
                  className="shimmer-text inline-block"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </h1>

        <p className="hero-fade mt-6 max-w-lg border-l-2 border-gold/40 pl-4 text-base leading-relaxed text-cream/70 sm:text-lg">
          M.Sohail kitchen — smash burgers, wood-fired pizza and all the fast food
          you crave. Fresh, halal and made to be shared.
        </p>

        <div className="hero-fade mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Link
              to="/menu"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-flame-deep via-flame to-flame px-7 py-4 text-sm font-bold text-white shadow-[0_12px_35px_-10px_rgba(255,107,26,0.7)] ring-1 ring-white/20 transition-all duration-300 hover:shadow-[0_16px_45px_-10px_rgba(255,107,26,0.85)] hover:brightness-110"
            >
              Explore the menu
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.22}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-gold/35 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-gold hover:bg-gold/10"
            >
              Book a table
            </Link>
          </Magnetic>
          <a
            href="tel:03129939906"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-2 pr-5 pl-2 text-sm font-semibold text-cream/85 backdrop-blur-xl transition-all duration-300 hover:border-flame/60 hover:text-flame"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-flame/15 text-flame transition-colors group-hover:bg-flame group-hover:text-white">
              <Phone size={15} />
            </span>
            0312 9939906
          </a>
        </div>

        {/* stats — glass panel */}
        <div className="hero-fade mt-12 inline-flex flex-wrap items-stretch rounded-3xl border border-gold/20 bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-white/[0.06] p-1 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          {[
            { to: 20, suffix: '+', label: 'Menu items' },
            { to: 4.9, decimals: 1, label: 'Average rating' },
            { to: 15, suffix: 'k+', label: 'Happy foodies' },
          ].map(({ to, suffix = '', decimals = 0, label }, i) => (
            <div
              key={label}
              style={{ animationDelay: `${0.9 + i * 0.14}s` }}
              className={`hero-stat rounded-2xl px-7 py-5 transition-colors duration-300 hover:bg-white/[0.05] ${
                i > 0 ? 'border-t border-white/10 sm:border-t-0 sm:border-l' : ''
              }`}
            >
              <div className="font-serif text-2xl font-semibold text-gold sm:text-3xl">
                <Counter to={to} decimals={decimals} suffix={suffix} />
              </div>
              <div className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-cream/55 uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* rotating stamp */}
      <div className="hero-stamp-scroll pointer-events-none absolute top-28 right-6 hidden h-40 w-40 will-change-transform lg:block">
        <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
          <defs>
            <path
              id="stamp-circle"
              d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
            />
          </defs>
          <text fill="rgba(255,249,241,.75)" fontSize="8" letterSpacing="2.6">
            <textPath href="#stamp-circle">
              FRESH · HALAL · MADE DAILY · FRESH · HALAL ·
            </textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Flame size={34} className="fill-flame text-flame" />
        </div>
      </div>

      {/* today's special card — whole card is clickable */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ delay: 1.1, duration: 0.9, ease: easing }}
        className="animate-float absolute right-6 bottom-24 hidden w-72 rounded-3xl border border-gold/25 bg-gradient-to-br from-charcoal/90 to-ink/90 p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,1)] backdrop-blur-xl xl:block"
      >
        <RoyalSeal
          monogram="✦"
          caption="TODAY'S SPECIAL · "
          size={76}
          scrollRotate={110}
          className="absolute -top-9 -right-6 hidden text-gold xl:grid"
        />
        <Link to={`/product/${special.id}`} className="group block" aria-label={`View ${special.name}`}>
          <div className="relative h-36 overflow-hidden rounded-2xl">
            <SmartImage
              src={special.image}
              alt={special.name}
              imgClass="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <span className="absolute top-3 left-3 rounded-full bg-flame px-3 py-1.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-lg shadow-flame/30">
              Today's special
            </span>
            <span className="absolute right-3 bottom-3 rounded-full bg-ink/70 px-3 py-1.5 text-sm font-bold text-flame backdrop-blur-md">
              {formatPrice(special.price)}
            </span>
          </div>
          <div className="px-1 pt-4 pb-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-serif text-lg font-semibold transition-colors group-hover:text-gold">
                {special.name}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-colors group-hover:bg-flame group-hover:text-white">
                <ArrowRight size={16} />
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-3">
              <span className="flex items-center gap-1 text-[11px] text-cream/70">
                <Star size={12} className="fill-gold text-gold" /> 4.9 · Bestseller
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-flame">
                <ShoppingBag size={13} /> View dish
              </span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* scroll cue */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-cream/50 uppercase transition-colors hover:text-flame md:flex"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 bg-white/[0.04] p-1 backdrop-blur-sm">
          <span className="h-2 w-1 animate-bounce rounded-full bg-flame" />
        </span>
        Scroll
      </a>
    </section>
  )
}
