import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Clock3, Flame, Sparkles } from 'lucide-react'
import { images, menu } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'
import { Reveal, RoyalSeal, SmartImage, easing, formatPrice } from './ui.jsx'
import { useScrollSpin } from '../hooks/useRoyalMotion.js'

gsap.registerPlugin(ScrollTrigger)

export default function Signature() {
  const root = useRef(null)
  const bg = useRef(null)
  const dishRef = useRef(null)
  const { addItem } = useCart()
  const dish = menu.find((item) => item.id === 5)

  useScrollSpin(dishRef, '.dish-seal', { from: -90, to: 180 })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="force-dark texture relative isolate overflow-hidden">
      <div ref={bg} className="absolute inset-0 -z-20 scale-110 will-change-transform">
        <SmartImage src={images.signature} alt="Signature margherita pizza" imgClass="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-36">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold tracking-[0.25em] text-gold uppercase">
              <Sparkles size={14} /> Chef's signature
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">
              The pizza people <span className="italic text-flame">come back for.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
              Hand-stretched dough, sweet tomato sauce, fresh mozzarella and basil —
              baked in our stone oven until the crust is crisp and golden. One slice
              and you'll know why it's our most-loved dish.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium backdrop-blur-sm">
                <Clock3 size={14} className="text-flame" /> Dough rested 2 hours
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium backdrop-blur-sm">
                <Flame size={14} className="text-flame" /> Medium spicy
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium backdrop-blur-sm">
                <Sparkles size={14} className="text-flame" /> Serves 2
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <motion.div whileHover={{ x: 5 }}>
              <Link
                to="/menu"
                className="group mt-9 inline-flex items-center gap-3 text-sm font-bold text-flame"
              >
                Explore the full menu
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </Reveal>
        </div>

        <div ref={dishRef} className="relative justify-self-end">
          <RoyalSeal
            monogram="✦"
            caption="CHEF'S SIGNATURE · "
            size={100}
            scrollRotate={190}
            className="dish-seal absolute -top-10 -left-8 z-20 hidden text-gold sm:grid"
          />
          <Reveal delay={0.2} y={50}>
            <motion.div
              whileHover={{ y: -8, borderRadius: '2.5rem' }}
              transition={{ duration: 0.35, ease: easing }}
              className="w-full max-w-md rounded-[2rem] border border-white/15 bg-ink/70 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl"
            >
            <Link to={`/product/${dish.id}`} className="group relative block h-64 overflow-hidden rounded-[1.4rem]">
              <SmartImage
                src={dish.image}
                alt={dish.name}
                imgClass="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute top-4 left-4 rounded-full bg-flame px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
                Bestseller
              </span>
              <span className="absolute right-4 bottom-4 rounded-full bg-flame px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase opacity-0 transition-opacity group-hover:opacity-100">
                View product →
              </span>
            </Link>
            <div className="px-3 pt-5 pb-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link to={`/product/${dish.id}`} className="font-serif text-2xl font-semibold transition-colors hover:text-flame">
                    {dish.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted">with fresh basil & salad</p>
                </div>
                <span className="font-serif text-2xl font-semibold text-flame">
                  {formatPrice(dish.price)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => addItem(dish)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-flame py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-flame-deep active:scale-[0.98]"
              >
                Order this dish <ArrowRight size={16} />
              </button>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
