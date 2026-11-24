import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Flame, Plus, Star } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { SmartImage, easing, formatPrice, useCursorGlow, useTilt } from './ui.jsx'

/**
 * Cinematic full-bleed food card.
 * Hover: image pushes in, detail panel slides up, cursor glow + 3D tilt.
 * Click anywhere opens the product page.
 */
export default function FoodCard({ item, index = 0 }) {
  const { addItem } = useCart()
  const navigate = useNavigate()
  const { glowProps, glowStyle } = useCursorGlow({ size: 340, opacity: 0.16 })
  const { tiltProps } = useTilt({ max: 7 })

  const open = () => navigate(`/product/${item.id}`)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -12, borderRadius: '2.25rem' }}
      whileTap={{ scale: 0.99 }}
      {...tiltProps}
      style={{ ...tiltProps.style, transformPerspective: 1200 }}
      onPointerMove={(event) => {
        glowProps.onPointerMove(event)
        tiltProps.onPointerMove(event)
      }}
      onPointerLeave={() => {
        glowProps.onPointerLeave()
        tiltProps.onPointerLeave()
      }}
      transition={{ type: 'spring', stiffness: 240, damping: 22, delay: Math.min(index, 8) * 0.05 }}
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter') open()
      }}
      className="force-dark group relative h-[370px] cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink shadow-2xl shadow-black/25 transition-colors duration-500 hover:border-gold/50 sm:h-[400px]"
    >
      {/* pointer-follow light */}
      <motion.div aria-hidden="true" style={glowStyle} className="pointer-events-none absolute inset-0 z-30" />

      <motion.div initial="rest" whileHover="hover" animate="rest" className="absolute inset-0">
        {/* image push-in */}
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.1 } }}
          transition={{ duration: 0.85, ease: easing }}
          className="absolute inset-0"
        >
          <SmartImage src={item.image} alt={item.name} imgClass="h-full w-full object-cover" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_120%,rgba(245,185,66,0.18),transparent_60%)]" />

        {/* top row */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-5">
          <div className="flex flex-col items-start gap-2">
            {item.tag && (
              <span className="rounded-full bg-flame px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg shadow-flame/30">
                {item.tag}
              </span>
            )}
            <span className="rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-gold uppercase backdrop-blur-md">
              {item.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {item.spicy && (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-flame backdrop-blur-md">
                <Flame size={16} className="fill-flame" />
              </span>
            )}
            <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-extrabold text-ink shadow-lg">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>

        {/* faint editorial index — turns a little on hover */}
        <motion.span
          variants={{ rest: { y: '-50%', rotate: 0 }, hover: { y: '-50%', rotate: 12 } }}
          transition={{ duration: 0.6, ease: easing }}
          className="pointer-events-none absolute top-1/2 right-5 font-serif text-7xl leading-none font-bold text-white/10"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        {/* bottom content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <motion.div
            variants={{ rest: { y: 0 }, hover: { y: -5 } }}
            transition={{ duration: 0.4, ease: easing }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="max-w-[80%] font-serif text-[1.6rem] leading-[1.15] font-semibold text-white drop-shadow-lg">
                {item.name}
              </h3>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flame text-white shadow-lg shadow-flame/30">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-cream/75">
              <Star size={13} className="fill-gold text-gold" />
              {item.rating}
              <span className="font-normal text-cream/45">· 120+ reviews</span>
            </div>
          </motion.div>

          {/* slides open on hover */}
          <motion.div
            variants={{ rest: { height: 0, opacity: 0 }, hover: { height: 'auto', opacity: 1 } }}
            transition={{ duration: 0.45, ease: easing }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm leading-relaxed text-cream/75">{item.description}</p>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                addItem(item)
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-flame/15 px-4 py-2.5 text-xs font-bold text-flame ring-1 ring-flame/40 backdrop-blur-sm transition-colors duration-300 hover:bg-flame hover:text-white"
            >
              <Plus size={15} strokeWidth={2.5} /> Add to cart
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  )
}
