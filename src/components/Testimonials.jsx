import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { testimonials } from '../data/site.js'
import { Reveal, RoyalSeal, SectionHeading, SmartImage, Stars, easing } from './ui.jsx'
import { useScrollSpin } from '../hooks/useRoyalMotion.js'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const root = useRef(null)

  useScrollSpin(root, '.quote-seal', { from: -50, to: 150 })

  const go = (step) => {
    setDirection(step)
    setIndex((current) => (current + step + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(() => go(1), 7000)
    return () => clearInterval(timer)
  }, [])

  const active = testimonials[index]

  return (
    <section id="reviews" ref={root} className="relative scroll-mt-20 overflow-hidden bg-charcoal/40 py-28 lg:py-36">
      <div className="absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/[0.06] blur-3xl" />

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Kind words"
          title={
            <>
              Loved by <span className="font-serif italic text-flame">food people.</span>
            </>
          }
          description="Don't just take our word for it — here's what our regulars have to say."
        />

        <Reveal delay={0.2} className="mt-14">
          <motion.div
            whileHover={{ borderRadius: '2.5rem' }}
            transition={{ duration: 0.5, ease: easing }}
            className="relative rounded-[2rem] border border-white/10 bg-ink/70 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-12"
          >
            <RoyalSeal
              monogram="★"
              caption="LOVED BY FOOD PEOPLE · "
              size={92}
              scrollRotate={130}
              className="quote-seal absolute -top-11 right-6 hidden text-gold/60 md:grid"
            />
            <Quote className="absolute top-8 right-8 text-flame/15" size={80} fill="currentColor" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 50 }}
                transition={{ duration: 0.5, ease: easing }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.28}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1)
                  else if (info.offset.x > 60) go(-1)
                }}
                className="relative z-10 cursor-grab select-none active:cursor-grabbing"
              >
                <Stars rating={active.rating} size={18} className="mb-6" />
                <p className="max-w-3xl font-serif text-2xl leading-relaxed font-medium sm:text-3xl lg:text-[2.1rem]">
                  “{active.quote}”
                </p>

                <div className="mt-9 flex items-center gap-4">
                  <SmartImage
                    src={active.image}
                    alt={active.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-flame/40"
                  />
                  <div>
                    <div className="font-bold">{active.name}</div>
                    <div className="text-sm text-muted">{active.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Reveal>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-all hover:border-flame hover:bg-flame hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show review ${i + 1}`}
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-flame' : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-all hover:border-flame hover:bg-flame hover:text-white"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
