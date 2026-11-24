import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gallery } from '../../data/site.js'
import { SectionHeading, SmartImage } from '../ui.jsx'
import { useGsapCards } from '../../hooks/useGsapCards.js'

export default function GallerySection() {
  const grid = useRef(null)
  useGsapCards(grid, { stagger: 0.08 })

  return (
    <section className="relative overflow-hidden bg-charcoal/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="A little preview"
          title={
            <>
              Look good. <span className="font-serif italic text-flame">Taste better.</span>
            </>
          }
          description="A peek inside our kitchen, our dining room and, of course, the plates we are famous for."
        />

        <div ref={grid} className="mt-14 grid auto-rows-[190px] grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <Link
              data-card
              key={item.label}
              to={item.to}
              aria-label={`View ${item.label}`}
              className={`group relative block h-full cursor-pointer overflow-hidden rounded-2xl ${item.span || ''}`}
            >
              <SmartImage
                src={item.image}
                alt={item.label}
                imgClass="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute bottom-4 left-4 translate-y-2 text-sm font-bold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-0 sm:opacity-100">
                {item.label}
              </div>
              <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-flame text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                ↗
              </span>
              {i === 0 && (
                <span className="absolute top-5 left-5 rounded-full bg-flame px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase">
                  Most loved
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
