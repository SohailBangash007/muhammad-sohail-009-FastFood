import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import PageIntro from '../components/PageIntro.jsx'
import CTA from '../components/CTA.jsx'
import FoodCard from '../components/FoodCard.jsx'
import { Reveal, SectionHeading } from '../components/ui.jsx'
import { categories, images, menu } from '../data/site.js'
import { matchesSearch } from '../utils/search.js'

const sortOptions = [
  { value: 'popular', label: 'Most popular' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
]

export default function ProductsPage() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('popular')

  const products = useMemo(() => {
    const filtered = menu.filter((item) => {
      const matchesCategory = active === 'All' || item.category === active
      return matchesCategory && matchesSearch(item, query)
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return b.rating - a.rating || b.price - a.price
    })
  }, [active, query, sort])

  const reset = () => {
    setActive('All')
    setQuery('')
    setSort('popular')
  }

  return (
    <>
      <PageIntro
        crumb="Products"
        eyebrow="Order online"
        title="Our"
        accent="products."
        description="Every dish from our kitchen, in one place. Search, filter and tap any product for the full story — or add it straight to your cart."
        image={images.hero}
      />

      <section id="products" className="relative scroll-mt-20 bg-charcoal/40 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The full range"
            title={
              <>
                Pick your <span className="font-serif italic text-flame">favourite.</span>
              </>
            }
            description={`${menu.length} fresh dishes, made to order. Hover to peek, tap a card to see details, reviews and add-ons.`}
          />

          {/* controls */}
          <Reveal delay={0.15} className="mt-12">
            <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-ink/50 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1 lg:max-w-sm">
                <Search size={17} className="absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search burgers, pizza, rolls, juice…"
                  aria-label="Search products"
                  className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pr-10 pl-11 text-sm text-cream placeholder:text-muted focus:border-flame/50 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery('')}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-muted transition-colors hover:text-flame"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActive(category)}
                    className={`relative shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition-colors ${
                      active === category ? 'text-white' : 'text-muted hover:text-cream'
                    }`}
                  >
                    {active === category && (
                      <motion.span
                        layoutId="active-product-category"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-flame shadow-lg shadow-flame/20"
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 lg:shrink-0">
                <SlidersHorizontal size={16} className="text-muted" />
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  aria-label="Sort products"
                  className="cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-cream focus:border-flame/50 focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-charcoal text-cream">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 flex items-center justify-between text-xs font-semibold tracking-widest text-muted uppercase">
            <span>
              Showing <span className="text-flame">{products.length}</span> of {menu.length} products
            </span>
            {(active !== 'All' || query || sort !== 'popular') && (
              <button type="button" onClick={reset} className="text-flame transition-opacity hover:opacity-70">
                Clear filters
              </button>
            )}
          </div>

          <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {products.map((item, i) => (
                <FoodCard key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {products.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-3xl border border-dashed border-white/15 py-20 text-center"
            >
              <div className="text-5xl">🍽️</div>
              <h3 className="mt-5 font-serif text-2xl font-semibold">Nothing matched that search.</h3>
              <p className="mt-2 text-sm text-muted">Try another dish name or reset the filters.</p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-flame-deep"
              >
                Show all products
              </button>
            </motion.div>
          )}

          <p className="mt-12 text-center text-sm text-muted">
            All prices in PKR · <span className="text-flame">Free delivery</span> on orders above Rs. 1,500
          </p>
        </div>
      </section>

      <CTA />
    </>
  )
}
