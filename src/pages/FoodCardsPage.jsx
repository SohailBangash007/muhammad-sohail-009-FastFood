import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Plus, Search, Sparkles, Star, X } from 'lucide-react'
import PageIntro from '../components/PageIntro.jsx'
import CTA from '../components/CTA.jsx'
import { categories, images, menu } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'
import { filterByQuery } from '../utils/search.js'
import {
  GoldFlourish,
  Reveal,
  SectionHeading,
  SmartImage,
  easing,
  formatPrice,
  useCursorGlow,
  useTilt,
} from '../components/ui.jsx'

/* Cards get "dealt" in from alternating sides with a wipe — no zoom. */
const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? -52 : 52,
    clipPath: 'inset(0 100% 0 0 round 1.4rem)',
  }),
  show: (index) => ({
    opacity: 1,
    x: 0,
    clipPath: 'inset(0 0% 0 0 round 1.4rem)',
    transition: {
      type: 'spring',
      stiffness: 170,
      damping: 22,
      delay: 0.12 + Math.min(index, 14) * 0.05,
    },
  }),
  exit: {
    opacity: 0,
    x: 34,
    clipPath: 'inset(0 0 0 100% round 1.4rem)',
    transition: { duration: 0.25 },
  },
}

function MiniCard({ item, index }) {
  const { addItem } = useCart()
  const { tiltProps } = useTilt({ max: 7 })
  const { glowProps, glowStyle } = useCursorGlow({ size: 240, opacity: 0.16 })

  return (
    <motion.article
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={tiltProps.style}
      onPointerMove={(event) => {
        tiltProps.onPointerMove(event)
        glowProps.onPointerMove(event)
      }}
      onPointerLeave={() => {
        tiltProps.onPointerLeave()
        glowProps.onPointerLeave()
      }}
      className="mini-card group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-charcoal/60 p-2.5 shadow-lg shadow-black/20 transition-colors duration-500 hover:border-gold/60"
    >
      <motion.div aria-hidden="true" style={glowStyle} className="pointer-events-none absolute inset-0 z-20" />

      {/* compact food image */}
      <Link
        to={`/product/${item.id}`}
        className="relative block h-32 overflow-hidden rounded-[1rem] sm:h-36"
        aria-label={`View ${item.name}`}
      >
        <SmartImage
          src={item.image}
          alt={item.name}
          imgClass="absolute -left-8 h-full w-[calc(100%+4rem)] object-cover transition-transform duration-[900ms] ease-out group-hover:translate-x-8"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        {/* one-shot foil pass on hover */}
        <span className="foil-once pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <span className="absolute bottom-2 left-2 font-mono text-[10px] font-bold tracking-widest text-gold/80 transition-transform duration-500 group-hover:-translate-y-1">
          {String(index + 1).padStart(2, '0')}
        </span>

        {item.tag && (
          <span className="absolute top-2 left-2 rounded-full bg-flame px-2 py-1 text-[9px] font-extrabold tracking-wider text-white uppercase shadow-md">
            {item.tag}
          </span>
        )}
        <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2 py-1 text-[10px] font-bold text-gold backdrop-blur-sm">
          <Star size={10} className="fill-gold text-gold" /> {item.rating}
        </span>
        <span className="absolute right-2 top-2 flex h-7 w-7 translate-x-1 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowUpRight size={14} />
        </span>
      </Link>

      {/* small details */}
      <div className="relative z-10 px-1.5 pt-3 pb-1">
        <p className="text-[9px] font-bold tracking-[0.18em] text-gold uppercase">{item.category}</p>
        <h3 className="mt-1 truncate font-serif text-base leading-tight font-semibold transition-colors duration-300 group-hover:text-gold">
          {item.name}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-serif text-lg font-semibold text-flame">{formatPrice(item.price)}</span>
          <motion.button
            type="button"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(item)}
            aria-label={`Add ${item.name} to cart`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/40 transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            <Plus size={15} strokeWidth={3} />
          </motion.button>
        </div>
      </div>

      {/* gold border that draws itself around the card on hover */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute inset-0 z-30 h-full w-full"
      >
        <rect
          className="card-trace"
          x="0.8"
          y="0.8"
          width="98.4"
          height="98.4"
          rx="5"
          pathLength="1"
          strokeDasharray="1"
          stroke="#f5b942"
          strokeWidth="0.9"
        />
      </svg>

      <span className="pointer-events-none absolute inset-x-4 bottom-0 z-10 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  )
}

export default function FoodCardsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [active, setActive] = useState('All')

  // Navbar search links here with ?q=… so the search carries over.
  const query = searchParams.get('q') || ''
  const setQuery = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('q', value)
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  const visible = useMemo(() => {
    const inCategory = active === 'All' ? menu : menu.filter((item) => item.category === active)
    return filterByQuery(inCategory, query)
  }, [active, query])

  return (
    <>
      <PageIntro
        crumb="Quick Menu"
        eyebrow="Small cards, big cravings"
        title="Everything,"
        accent="at a glance."
        description="A compact, animated card wall of every dish we serve. Pick a category, search with a typo if you like — image and price, right up front."
        image={images.hero}
      />

      <section id="food-cards" className="force-dark relative isolate overflow-hidden py-20 lg:py-28">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-20" />
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-flame/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The card wall"
            title={
              <>
                Small plates, <span className="shimmer-text font-serif italic">quick picks.</span>
              </>
            }
            description="Hover a card, tap to see the full story, or hit + to add it to your cart."
          />
          <GoldFlourish className="mx-auto mt-5 h-4 w-48 text-gold" />

          {/* ALL mini cards live inside ONE beautifully framed parent card */}
          <div className="relative isolate mt-12">
            {/* soft outer halo — kept outside the reveal clip */}
            <div className="pointer-events-none absolute -inset-3 rounded-[3rem] bg-gradient-to-r from-flame/30 via-gold/20 to-flame/30 opacity-60 blur-2xl" />

            {/* the panel opens like a curtain — no zoom */}
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 2.5rem)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 2.5rem)' }}
              transition={{ duration: 1.05, ease: easing }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-flame/20 to-gold/30 p-[2px] shadow-[0_45px_110px_-45px_rgba(0,0,0,1)]">
                {/* travelling gold light around the frame */}
                <div className="premium-orbit orbit-spin pointer-events-none absolute inset-[-160%]" />

                {/* inner surface */}
                <div className="premium-panel relative overflow-hidden rounded-[2.48rem] border border-white/10 bg-ink/90 px-4 py-7 sm:px-8 sm:py-9">
                  {/* texture, ambient light and top gold line */}
                  <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.14]" />
                  <div className="animate-drift-x pointer-events-none absolute -top-24 left-6 h-56 w-56 rounded-full bg-flame/10 blur-3xl" />
                  <div className="animate-drift-y pointer-events-none absolute -right-16 -bottom-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
                  <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                  {/* foil passes once when the panel is hovered */}
                  <div className="foil-once pointer-events-none absolute inset-y-0 -left-1/3 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

                  {/* engraved corners draw themselves in */}
                  {[
                    { pos: 'top-4 left-4 rounded-tl-xl border-t border-l', x: -14, y: -14 },
                    { pos: 'top-4 right-4 rounded-tr-xl border-t border-r', x: 14, y: -14 },
                    { pos: 'bottom-4 left-4 rounded-bl-xl border-b border-l', x: -14, y: 14 },
                    { pos: 'bottom-4 right-4 rounded-br-xl border-b border-r', x: 14, y: 14 },
                  ].map((corner, i) => (
                    <motion.span
                      key={corner.pos}
                      initial={{ opacity: 0, x: corner.x, y: corner.y }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ delay: 0.75 + i * 0.08, duration: 0.6, ease: easing }}
                      className={`pointer-events-none absolute h-8 w-8 border-gold/45 ${corner.pos}`}
                    />
                  ))}

                  {/* parent card header */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-6">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-flame to-flame-deep shadow-lg shadow-flame/30">
                        <span className="orbit-spin pointer-events-none absolute -inset-1 rounded-3xl border border-dashed border-gold/60" />
                        <Sparkles size={20} className="text-white" />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.22em] text-gold uppercase">
                          The collection
                        </p>
                        <h2 className="font-serif text-xl font-semibold sm:text-2xl">
                          Pick your craving
                        </h2>
                      </div>
                    </div>
                    <motion.span
                      animate={{ opacity: [1, 0.65, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold text-gold"
                    >
                      {visible.length} {visible.length === 1 ? 'dish' : 'dishes'}
                    </motion.span>
                  </div>

                  {/* search */}
                  <div className="relative z-10 mx-auto mt-6 max-w-lg">
                    <div className="relative">
                      <Search size={17} className="absolute top-1/2 left-5 -translate-y-1/2 text-muted" />
                      <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search burger, burgger, juice, margreta…"
                        aria-label="Search dishes"
                        className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3.5 pr-12 pl-12 text-sm text-cream placeholder:text-muted focus:border-flame/50 focus:outline-none"
                      />
                      {query && (
                        <button
                          type="button"
                          aria-label="Clear search"
                          onClick={() => setQuery('')}
                          className="absolute top-1/2 right-5 -translate-y-1/2 text-muted transition-colors hover:text-flame"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    {query && (
                      <p className="mt-2 text-center text-xs text-muted">
                        {visible.length} {visible.length === 1 ? 'match' : 'matches'} for “{query}”
                      </p>
                    )}
                  </div>

                  {/* category tabs */}
                  <div className="relative z-10 mt-5">
                    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:justify-center">
                      {categories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setActive(category)}
                          className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                            active === category ? 'text-ink' : 'text-muted hover:text-cream'
                          }`}
                        >
                          {active === category && (
                            <motion.span
                              layoutId="food-card-tab"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              className="absolute inset-0 rounded-full bg-gold shadow-lg shadow-gold/25"
                            />
                          )}
                          <span className="relative z-10 inline-flex items-center gap-1.5">
                            {active === category && <Sparkles size={12} />}
                            {category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* the small animated cards — all inside this parent */}
                  <motion.div
                    layout
                    className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } } }}
                  >
                    <AnimatePresence mode="popLayout">
                      {visible.map((item, i) => (
                        <MiniCard key={item.id} item={item} index={i} />
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {visible.length === 0 && (
                    <div className="relative z-10 mt-6 rounded-3xl border border-dashed border-white/15 py-16 text-center">
                      <div className="text-5xl">🔎</div>
                      <h3 className="mt-5 font-serif text-2xl font-semibold">Nothing matched “{query}”.</h3>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery('')
                          setActive('All')
                        }}
                        className="mt-6 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-flame-deep"
                      >
                        Show all dishes
                      </button>
                    </div>
                  )}

                  {/* parent card footer */}
                  <div className="relative z-10 mt-8 border-t border-white/8 pt-5">
                    <p className="text-center text-xs font-semibold tracking-[0.24em] text-cream/45 uppercase">
                      {visible.length} dishes ·{' '}
                      <Link to="/products" className="text-flame transition-opacity hover:opacity-70">
                        Full product list →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
