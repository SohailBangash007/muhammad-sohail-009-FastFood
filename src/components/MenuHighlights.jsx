import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Plus, Sparkles } from 'lucide-react'
import { menu } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'
import { GoldFlourish, Reveal, SectionHeading, SmartImage, Stars, formatPrice } from './ui.jsx'

const picks = [1, 5, 15]
  .map((id) => menu.find((item) => item.id === id))
  .filter(Boolean)

const cardVariants = {
  hidden: { opacity: 0, y: 70, rotate: -3, scale: 0.94 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 20,
      delay: 0.12 + index * 0.12,
    },
  }),
}

function PickCard({ item, index }) {
  const { addItem } = useCart()
  const navigate = useNavigate()
  const open = () => navigate(`/product/${item.id}`)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className="animate-float h-full"
      style={{ animationDelay: `${index * 0.8}s` }}
    >
      <motion.article
        whileHover={{ y: -12 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-gold/25 bg-ink/80 p-3 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-gold/70"
      >
        {/* clickable image */}
        <div
          role="link"
          tabIndex={0}
          onClick={open}
          onKeyDown={(event) => {
            if (event.key === 'Enter') open()
          }}
          className="relative h-64 cursor-pointer overflow-hidden rounded-[1.5rem]"
        >
          <SmartImage
            src={item.image}
            alt={item.name}
            imgClass="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

          <span className="absolute top-4 left-4 rounded-full bg-gold px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-ink uppercase shadow-lg">
            0{index + 1} · {item.tag || 'Royal pick'}
          </span>

          <motion.span
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-gold/70 text-gold"
          >
            <Sparkles size={18} />
          </motion.span>

          <span className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-flame text-white shadow-lg shadow-flame/40 transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="flex flex-1 flex-col px-3 pt-5 pb-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold tracking-[0.22em] text-gold uppercase">
              {item.category}
            </span>
            <Stars rating={item.rating} size={13} />
          </div>

          <h3 className="mt-2 font-serif text-2xl leading-tight font-semibold transition-colors duration-300 group-hover:text-gold">
            <Link to={`/product/${item.id}`}>{item.name}</Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream/60">{item.description}</p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <span className="font-serif text-2xl font-semibold text-flame">{formatPrice(item.price)}</span>
            <motion.button
              type="button"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => addItem(item)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gold px-4 py-2.5 text-xs font-extrabold text-ink shadow-lg shadow-gold/20 transition-colors duration-300 hover:bg-flame hover:text-white"
            >
              <Plus size={14} strokeWidth={3} /> Add
            </motion.button>
          </div>
        </div>

        {/* light sweep on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </motion.article>
    </motion.div>
  )
}

export default function MenuHighlights() {
  return (
    <section className="force-dark texture relative isolate overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-ink via-charcoal to-ink" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-30" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Start here"
          title={
            <>
              Meet the <span className="shimmer-text font-serif italic">royal three.</span>
            </>
          }
          description="First visit, or just can't decide? These are the plates we'd order ourselves — the ones people come back for."
        />
        <GoldFlourish className="mx-auto mt-5 h-4 w-56 text-gold" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {picks.map((item, i) => (
            <PickCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <Reveal delay={0.5}>
          <p className="mt-12 text-center text-xs font-semibold tracking-[0.24em] text-cream/45 uppercase">
            Scroll for the <span className="text-flame">full menu</span> ↓
          </p>
        </Reveal>
      </div>
    </section>
  )
}
