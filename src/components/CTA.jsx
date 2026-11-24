import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { Magnetic, Reveal } from './ui.jsx'
import { useScrollSpin } from '../hooks/useRoyalMotion.js'

export default function CTA() {
  const root = useRef(null)

  useScrollSpin(root, '.cta-orbit', { from: 0, to: 200 })

  return (
    <section ref={root} className="force-dark relative isolate overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-flame-deep via-flame to-flame-deep" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />

      {/* always-moving decorations — proof the animations are alive 👀 */}
      <div className="animate-float absolute top-8 left-[12%] hidden text-4xl opacity-70 sm:block">🍔</div>
      <div className="animate-float absolute right-[14%] bottom-8 hidden text-4xl opacity-70 [animation-delay:1.4s] sm:block">🍟</div>
      <div className="animate-spin-slow absolute -top-16 -right-16 h-72 w-72 rounded-full border-[40px] border-white/10" />
      <div className="cta-orbit pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full border border-dashed border-white/25 will-change-transform" />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-serif text-4xl leading-tight font-semibold text-white sm:text-5xl lg:text-6xl">
            Hungry yet? <span className="italic text-white/70">Let's fix that.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/85">
            Your table is waiting, or we can bring the feast to your door. Either way,
            something delicious is about to happen.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-[#ffffff] px-7 py-4 text-sm font-bold text-flame-deep shadow-xl transition-all duration-500 hover:rounded-[1.4rem] hover:bg-cream"
              >
                Order now <ArrowRight size={17} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-4 text-sm font-bold text-white transition-all duration-500 hover:rounded-[1.4rem] hover:bg-white/15"
              >
                <Phone size={16} /> Book a table
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
