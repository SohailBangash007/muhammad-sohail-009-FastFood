import { useRef } from 'react'
import { Bike, Flame, ShieldCheck, Wallet } from 'lucide-react'
import { SectionHeading } from './ui.jsx'
import { useGsapCards } from '../hooks/useGsapCards.js'

const features = [
  {
    icon: Flame,
    number: '01',
    title: 'Cooked over real fire',
    text: 'Our grill runs hot and our chefs know exactly when to pull it off. That smoky char? You can taste it.',
  },
  {
    icon: ShieldCheck,
    number: '02',
    title: 'Certified halal',
    text: 'Every cut we serve is 100% halal and sourced from trusted local suppliers. No shortcuts, ever.',
  },
  {
    icon: Bike,
    number: '03',
    title: 'Fast, hot delivery',
    text: 'Packed the moment it leaves the kitchen so it reaches you hot, fresh and exactly how we made it.',
  },
  {
    icon: Wallet,
    number: '04',
    title: 'Honest prices',
    text: 'Generous portions, fair prices and free delivery on bigger orders. Great food should be for everyone.',
  },
]

export default function Features() {
  const grid = useRef(null)
  useGsapCards(grid)

  return (
    <section className="relative py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why M.Sohail"
          title={
            <>
              More than a meal. <span className="font-serif italic text-flame">An experience.</span>
            </>
          }
          description="Good food is the starting point. Here's what keeps people coming back for more."
        />

        <div ref={grid} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, number, title, text }) => (
            <div
              data-card
              key={title}
              className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/8 bg-gradient-to-b from-white/[0.05] to-transparent p-7 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40"
            >
              {/* light sweep across the card on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* outlined editorial number */}
              <span className="pointer-events-none absolute -top-5 right-3 font-serif text-[7.5rem] leading-none font-bold text-transparent [-webkit-text-stroke:1px_rgba(245,185,66,0.18)]">
                {number}
              </span>

              <div className="relative flex h-14 w-14 -rotate-6 items-center justify-center rounded-2xl bg-gradient-to-br from-flame to-flame-deep text-white shadow-lg shadow-flame/25 transition-transform duration-500 group-hover:rotate-0">
                <Icon size={24} />
              </div>

              <h3 className="relative mt-9 text-lg font-bold">{title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted">{text}</p>

              <div className="relative mt-7 h-px w-full overflow-hidden bg-white/10">
                <span className="block h-full w-10 bg-gradient-to-r from-flame to-gold transition-all duration-700 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
