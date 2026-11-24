import { useRef } from 'react'
import { Flame, Heart, Leaf } from 'lucide-react'
import { values } from '../../data/site.js'
import { SectionHeading } from '../ui.jsx'
import { useGsapCards } from '../../hooks/useGsapCards.js'

const icons = { leaf: Leaf, flame: Flame, heart: Heart }

export default function ValuesSection() {
  const grid = useRef(null)
  useGsapCards(grid)

  return (
    <section className="relative overflow-hidden bg-charcoal/40 py-24 lg:py-32">
      <div className="absolute top-10 -right-32 h-80 w-80 rounded-full bg-flame/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we believe"
          title={
            <>
              Three things we <span className="font-serif italic text-flame">never compromise.</span>
            </>
          }
          description="Anybody can cook a burger. It takes a little more care to make people feel at home while they eat it."
        />

        <div ref={grid} className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map(({ number, title, text, icon }) => {
            const Icon = icons[icon]
            return (
              <div
                data-card
                key={number}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-white/8 bg-ink/70 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-flame/40"
              >
                <div className="absolute -right-4 -bottom-10 font-serif text-[9rem] leading-none font-bold text-white/[0.03] transition-colors duration-500 group-hover:text-flame/[0.07]">
                  {number}
                </div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-flame/10 text-flame transition-all duration-500 group-hover:scale-110 group-hover:bg-flame group-hover:text-white">
                  <Icon size={28} />
                </div>
                <h3 className="relative mt-8 text-xl font-bold">{title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted">{text}</p>
                <div className="relative mt-7 h-0.5 w-12 bg-flame transition-all duration-500 group-hover:w-full" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
