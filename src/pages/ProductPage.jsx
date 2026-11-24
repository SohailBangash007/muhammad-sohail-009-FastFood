import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Flame,
  Leaf,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react'
import { menu } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'
import { useGsapCards } from '../hooks/useGsapCards.js'
import { SectionHeading, SmartImage, Stars, formatPrice } from '../components/ui.jsx'
import CTA from '../components/CTA.jsx'
import NotFound from './NotFound.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function ProductPage() {
  const { id } = useParams()
  const product = menu.find((item) => item.id === Number(id))
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()
  const root = useRef(null)
  const relatedGrid = useRef(null)
  useGsapCards(relatedGrid, { deps: [product?.id] })

  useLayoutEffect(() => {
    if (!product) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.product-image', {
        scale: 0.82,
        rotate: -6,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
        delay: 0.15,
      })
      gsap.from('.product-detail', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.to('.product-image-inner', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [product])

  if (!product) return <NotFound />

  const related = [
    ...menu.filter((item) => item.category === product.category && item.id !== product.id),
    ...menu.filter((item) => item.category !== product.category),
  ].slice(0, 3)

  const perks = [
    { icon: ShieldCheck, label: '100% Halal' },
    { icon: Leaf, label: 'Made fresh' },
    { icon: Truck, label: 'Fast delivery' },
  ]

  return (
    <>
      <section ref={root} className="relative scroll-mt-20 overflow-hidden bg-charcoal/40 pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-flame/[0.07] blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* breadcrumb */}
          <div className="product-detail flex flex-wrap items-center gap-2 text-xs font-semibold tracking-widest text-muted uppercase">
            <Link to="/" className="transition-colors hover:text-flame">Home</Link>
            <ChevronRight size={13} className="text-flame" />
            <Link to="/menu" className="transition-colors hover:text-flame">Menu</Link>
            <ChevronRight size={13} className="text-flame" />
            <span className="text-flame">{product.name}</span>
          </div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* image */}
            <div className="product-image relative">
              <div className="relative h-[380px] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl sm:h-[520px]">
                <SmartImage
                  src={product.image}
                  alt={product.name}
                  imgClass="product-image-inner h-[110%] w-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

                {product.tag && (
                  <span className="absolute top-6 left-6 rounded-full bg-flame px-4 py-2 text-[11px] font-bold tracking-wider text-white uppercase shadow-lg">
                    {product.tag}
                  </span>
                )}
                {product.spicy && (
                  <span className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-flame backdrop-blur-sm">
                    <Flame size={20} className="fill-flame" />
                  </span>
                )}

                <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-white/15 bg-ink/60 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
                  <Star size={14} className="fill-gold text-gold" /> {product.rating} · 120+ reviews
                </div>
              </div>
              <div className="animate-float pointer-events-none absolute -top-5 -right-3 hidden text-5xl sm:block">
                {product.category === 'Pizza' ? '🍕' : product.category === 'Desserts' ? '🍰' : '🍔'}
              </div>
            </div>

            {/* details */}
            <div>
              <div className="product-detail flex items-center gap-3">
                <span className="rounded-full bg-flame/10 px-3 py-1.5 text-[11px] font-bold tracking-widest text-flame uppercase">
                  {product.category}
                </span>
                <Stars rating={product.rating} size={15} />
              </div>

              <h1 className="product-detail mt-5 font-serif text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>

              <p className="product-detail mt-5 max-w-xl text-base leading-relaxed text-muted">
                {product.description}
              </p>

              <div className="product-detail mt-7 flex items-end gap-4">
                <span className="font-serif text-4xl font-semibold text-flame">
                  {formatPrice(product.price)}
                </span>
                <span className="mb-1 text-xs text-muted">per serving · taxes included</span>
              </div>

              <div className="product-detail mt-7 grid grid-cols-3 gap-3">
                {perks.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-ink/60 px-3 py-4 text-center transition-colors hover:border-flame/40"
                  >
                    <Icon size={19} className="text-flame" />
                    <span className="text-[11px] font-semibold text-cream/80">{label}</span>
                  </div>
                ))}
              </div>

              <div className="product-detail mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-white/15 bg-ink/60 p-1.5">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((value) => Math.max(1, value - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-flame/10 hover:text-flame"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((value) => value + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-flame/10 hover:text-flame"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    for (let i = 0; i < qty; i += 1) addItem(product)
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-flame-deep via-flame to-flame px-7 py-4 text-sm font-bold text-white shadow-[0_12px_35px_-10px_rgba(255,107,26,0.7)] ring-1 ring-white/20 transition-all duration-300 hover:brightness-110"
                >
                  <ShoppingBag size={17} /> Add {qty} to cart · {formatPrice(product.price * qty)}
                </motion.button>
              </div>

              <div className="product-detail mt-5 flex flex-wrap items-center gap-5 text-sm">
                <a
                  href="tel:03129939906"
                  className="inline-flex items-center gap-2 font-semibold text-cream transition-colors hover:text-flame"
                >
                  <Phone size={16} className="text-flame" /> Order by call: 0312 9939906
                </a>
                <Link to="/menu" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-flame">
                  <ArrowLeft size={15} /> Back to menu
                </Link>
              </div>

              <div className="product-detail mt-7 flex items-center gap-2 rounded-2xl border border-flame/20 bg-flame/[0.05] px-4 py-3 text-xs text-cream/80">
                <Check size={16} className="shrink-0 text-flame" />
                Free delivery on orders above Rs. 1,500 · Prepared fresh after you order
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related products */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Keep exploring"
            title={<>You might also <span className="font-serif italic text-flame">love these.</span></>}
          />

          <div ref={relatedGrid} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                data-card
                key={item.id}
                to={`/product/${item.id}`}
                className="group block overflow-hidden rounded-3xl border border-white/8 bg-charcoal/50 transition-all duration-500 hover:-translate-y-2 hover:border-flame/40"
              >
                <div className="relative h-52 overflow-hidden">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    imgClass="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-flame px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-bold transition-colors group-hover:text-flame">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted">{formatPrice(item.price)}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flame/10 text-flame transition-all group-hover:bg-flame group-hover:text-white">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
