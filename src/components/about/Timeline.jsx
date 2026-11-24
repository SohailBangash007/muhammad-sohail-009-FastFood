import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '../../data/site.js'
import { SectionHeading } from '../ui.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 72%',
            end: 'bottom 75%',
            scrub: 1,
          },
        },
      )

      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: i % 2 === 0 ? -70 : 70,
          y: 25,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-24 lg:py-32">
      <div ref={root} className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The journey"
          title={
            <>
              From one grill to <span className="font-serif italic text-flame">your table.</span>
            </>
          }
          description="A few milestones from a story that is still being written — one delicious plate at a time."
        />

        <div className="relative mt-16">
          <div className="absolute top-0 bottom-0 left-[11px] w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <div className="timeline-fill h-full w-full origin-top bg-gradient-to-b from-flame via-flame to-gold" />
          </div>

          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`timeline-item relative mb-10 pl-14 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'
              }`}
            >
              <span
                className={`absolute top-6 left-[5px] h-3 w-3 rounded-full bg-flame ring-[5px] ring-ink md:left-auto ${
                  i % 2 === 0 ? 'md:-right-[6px]' : 'md:-left-[6px]'
                }`}
              />
              <div className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-flame/40 hover:bg-flame/[0.04]">
                <div className="font-serif text-3xl font-semibold text-flame">{item.year}</div>
                <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
