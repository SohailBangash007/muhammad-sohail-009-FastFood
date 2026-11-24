import { useEffect, useId, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Star } from 'lucide-react'
import { useRoundedScroll, useScrollSpin } from '../hooks/useRoyalMotion.js'

export const easing = [0.22, 1, 0.36, 1]

export function SmartImage({ src, alt = '', className = '', imgClass = '', ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-charcoal-light via-charcoal to-ink ${className} ${imgClass}`}
        aria-label={alt}
        {...rest}
      >
        <span className="text-5xl opacity-60">🍽️</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} ${imgClass}`}
      {...rest}
    />
  )
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 55,
  duration = 0.85,
  once = true,
  amount = 0.2,
  ...rest
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)', scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easing }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* Staggered group: wrap children in <StaggerItem> */
export function Stagger({ children, className = '', delay = 0, amount = 0.15 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 55, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.8, ease: easing },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const centered = align === 'center'

  return (
    <div
      className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.32em] text-flame">
              <span className="h-px w-8 bg-gradient-to-r from-flame to-gold" />
              {eyebrow}
            </span>
          </Reveal>
          <div className={`mt-3 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-gold/60" />
            <motion.span
              aria-hidden="true"
              initial={{ rotate: 45, opacity: 0, scale: 0.4 }}
              whileInView={{ rotate: 225, opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, ease: easing }}
              className="h-1.5 w-1.5 border border-gold/80"
            />
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </>
      )}
      <WipeReveal delay={0.08}>
        <h2 className="mt-4 font-serif text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </WipeReveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-base leading-relaxed text-muted sm:text-lg ${centered ? 'mx-auto max-w-xl' : ''}`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export function Stars({ rating = 5, size = 14, className = '' }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(rating)
              ? 'fill-gold text-gold'
              : 'fill-transparent text-white/25'
          }
        />
      ))}
    </div>
  )
}

export function formatPrice(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

/* ---------- MORE MOTION (not just scaling) ---------- */

/** Button that springs towards the cursor — magnetic pull, no zoom. */
export function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        rawX.set((event.clientX - rect.left - rect.width / 2) * strength)
        rawY.set((event.clientY - rect.top - rect.height / 2) * strength)
      }}
      onPointerLeave={() => {
        rawX.set(0)
        rawY.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Numbers that roll up when scrolled into view. */
export function Counter({ to, decimals = 0, suffix = '', prefix = '', duration = 1.8, delay = 0.9 }) {
  const value = useMotionValue(0)
  const [display, setDisplay] = useState((0).toFixed(decimals))

  useEffect(() => {
    const controls = animate(value, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [to, decimals, duration, delay, value])

  return (
    <span className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/** Text/blocks that get "wiped" open left-to-right instead of zooming. */
export function WipeReveal({ children, className = '', delay = 0, duration = 0.95 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className={className}>
      {/* observe the outer wrapper — a fully clipped child can never intersect */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.35, y: 14 }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1, y: 0 } : undefined}
        transition={{ duration, delay, ease: easing }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Radial light that follows the pointer over a card. */
export function useCursorGlow({ size = 300, color = '255, 107, 26', opacity = 0.14 } = {}) {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgba(${color}, ${opacity}), transparent 68%)`

  return {
    glowProps: {
      onPointerMove: (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set(event.clientX - rect.left)
        y.set(event.clientY - rect.top)
      },
      onPointerLeave: () => {
        x.set(-1000)
        y.set(-1000)
      },
    },
    glowStyle: { background },
  }
}

/* ---------- ROYAL MOTION KIT ---------- */

/** Pointer tilt with springs — subtle rotation, never a cheap scale-only hover. */
export function useTilt({ max = 8 } = {}) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.5 })
  const rotateY = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.5 })

  return {
    tiltProps: {
      style: { rotateX, rotateY, transformPerspective: 1100 },
      onPointerMove: (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        rawY.set(px * max * 2)
        rawX.set(-py * max * 2)
      },
      onPointerLeave: () => {
        rawX.set(0)
        rawY.set(0)
      },
    },
  }
}

/**
 * An ornate gold wax-seal. The ring spins with scroll (GSAP) while the inner
 * dashed ring keeps its own slow rotation — pure royal motion, no zoom.
 */
export function RoyalSeal({
  monogram = 'S',
  caption = "M.SOHAIL · EST 2010 · ",
  size = 104,
  className = '',
  scrollRotate = 200,
}) {
  const ref = useRef(null)
  const pathId = `seal-${useId().replace(/:/g, '')}`

  useScrollSpin(ref, '.seal-ring', {
    from: -35,
    to: scrollRotate,
    start: 'top bottom',
    end: 'bottom top',
  })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`pointer-events-none relative grid place-items-center text-gold ${className}`}
    >
      <svg className="seal-ring absolute inset-0 h-full w-full will-change-transform" viewBox="0 0 100 100">
        <defs>
          <path id={pathId} d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
        </defs>
        <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
        <text fill="currentColor" fontSize="7.5" letterSpacing="2.1" fontWeight="700">
          <textPath href={`#${pathId}`}>{caption.repeat(2)}</textPath>
        </text>
      </svg>
      <span
        className="animate-seal-spin absolute inset-[19%] rounded-full border border-dashed"
        style={{ borderColor: 'currentColor', opacity: 0.4 }}
      />
      <span
        style={{ fontSize: size * 0.32 }}
        className="relative font-serif leading-none font-semibold drop-shadow-[0_0_14px_rgba(245,185,66,0.45)]"
      >
        {monogram}
      </span>
      <span
        style={{ fontSize: Math.max(6, size * 0.065) }}
        className="absolute bottom-[16%] font-bold tracking-[0.22em] opacity-80"
      >
        ROYAL
      </span>
    </div>
  )
}

/** Scroll-driven corner rounding — soft at first, sharply tailored by the time you reach it. */
export function RoundedReveal({ children, className = '', from = 76, to = 26, rotate = -3 }) {
  const ref = useRef(null)

  useRoundedScroll(ref, '.rounded-morph', { from, to, rotate })

  return (
    <div ref={ref} className={className}>
      <div className="rounded-morph h-full will-change-transform">{children}</div>
    </div>
  )
}

/** Draws a thin gold flourish with a spinning diamond at its heart. */
export function GoldFlourish({ className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <svg ref={ref} viewBox="0 0 160 16" fill="none" aria-hidden="true" className={className}>
      <motion.path
        d="M2 8 H54 M106 8 H158"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.7 } : undefined}
        transition={{ duration: 1, ease: easing }}
      />
      <motion.path
        d="M80 1 L87 8 L80 15 L73 8 Z"
        stroke="currentColor"
        strokeWidth="1"
        style={{ transformOrigin: '80px 8px' }}
        initial={{ rotate: -120, scale: 0, opacity: 0 }}
        animate={inView ? { rotate: 0, scale: 1, opacity: 1 } : undefined}
        transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.3 }}
      />
      <motion.circle
        cx="80"
        cy="8"
        r="1.6"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ delay: 0.6 }}
      />
    </svg>
  )
}
