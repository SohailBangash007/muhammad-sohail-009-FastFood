import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { categories, menu } from '../data/site.js'
import { filterByQuery } from '../utils/search.js'
import { Reveal, SectionHeading } from './ui.jsx'
import FoodCard from './FoodCard.jsx'

export default function Menu() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const inCategory = active === 'All' ? menu : menu.filter((item) => item.category === active)
    return filterByQuery(inCategory, query)
  }, [active, query])

  return (
    <section id="menu" className="relative scroll-mt-20 bg-charcoal/40 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The menu"
          title={
            <>
              Something for <span className="font-serif italic text-flame">every craving.</span>
            </>
          }
          description="From smashed patties to stone-baked pizza — every dish is made to order with the good stuff. Hover a card to peek inside, tap it for the full story."
        />

        {/* search — typo friendly (burgger, margreta, juice…) */}
        <Reveal delay={0.15} className="mt-10">
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search size={18} className="absolute top-1/2 left-5 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search burgers, pizza, rolls, juice…"
                aria-label="Search the menu"
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-4 pr-12 pl-12 text-sm text-cream placeholder:text-muted focus:border-flame/50 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery('')}
                  className="absolute top-1/2 right-5 -translate-y-1/2 text-muted transition-colors hover:text-flame"
                >
                  <X size={17} />
                </button>
              )}
            </div>
            {query && (
              <p className="mt-3 text-center text-xs text-muted">
                {visible.length} {visible.length === 1 ? 'match' : 'matches'} for “{query}”
              </p>
            )}
          </div>
        </Reveal>

        {/* filters */}
        <Reveal delay={0.2} className="mt-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:justify-center">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active === category ? 'text-white' : 'text-muted hover:text-cream'
                }`}
              >
                {active === category && (
                  <motion.span
                    layoutId="active-category"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-flame shadow-lg shadow-flame/25"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* cinematic cards */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <FoodCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/15 py-16 text-center">
            <div className="text-5xl">🔎</div>
            <h3 className="mt-5 font-serif text-2xl font-semibold">Nothing matched “{query}”.</h3>
            <p className="mt-2 text-sm text-muted">Try another dish name or clear the filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setActive('All')
              }}
              className="mt-6 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-flame-deep"
            >
              Show everything
            </button>
          </div>
        )}

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-sm text-muted">
            All prices in PKR · <span className="text-flame">Free delivery</span> on orders above Rs. 1,500
          </p>
        </Reveal>
      </div>
    </section>
  )
}
