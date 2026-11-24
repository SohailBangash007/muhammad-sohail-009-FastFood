import { useRef } from 'react'
import { team } from '../../data/site.js'
import { SectionHeading, SmartImage } from '../ui.jsx'
import { useGsapCards } from '../../hooks/useGsapCards.js'

export default function TeamSection() {
  const grid = useRef(null)
  useGsapCards(grid)

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The people"
          title={
            <>
              Meet the crew behind <span className="font-serif italic text-flame">the magic.</span>
            </>
          }
          description="Good food comes from good people. Here are a few faces you'll meet when you come by."
        />

        <div ref={grid} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person) => (
            <div
              data-card
              key={person.name}
              className="group relative h-full overflow-hidden rounded-[2rem] border border-white/8 bg-charcoal/50"
            >
              <div className="relative h-80 overflow-hidden">
                <SmartImage
                  src={person.image}
                  alt={person.name}
                  imgClass="h-full w-full object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <span className="absolute top-5 right-5 rounded-full bg-flame px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase opacity-0 transition-all duration-500 group-hover:opacity-100">
                  M.Sohail crew
                </span>
              </div>
              <div className="relative -mt-12 px-7 pb-8">
                <h3 className="font-serif text-2xl font-semibold">{person.name}</h3>
                <p className="mt-1 text-xs font-bold tracking-widest text-flame uppercase">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
