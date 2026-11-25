import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Crown,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  UserRound,
  Users,
} from 'lucide-react'
import { images } from '../data/site.js'
import {
  GoldFlourish,
  Magnetic,
  Reveal,
  RoundedReveal,
  RoyalSeal,
  SectionHeading,
  SmartImage,
  Stagger,
  StaggerItem,
  easing,
} from './ui.jsx'
import { useRoundedScroll, useScrollSpin } from '../hooks/useRoyalMotion.js'

const details = [
  { icon: MapPin, label: 'Find us', value: '12 Food Street, Main Boulevard, Lahore' },
  {
    icon: Phone,
    label: 'Call us',
    value: <a href="tel:03129939906" className="transition-colors hover:text-flame">0312 9939906</a>,
  },
  { icon: Mail, label: 'Email', value: 'hello@sohailfood.pk' },
  { icon: Clock3, label: 'Opening hours', value: 'Every day · 11:00 AM – 11:00 PM' },
]

const fieldClass =
  'w-full rounded-2xl border border-white/10 bg-white/[0.035] py-4 pr-4 pl-11 text-sm text-cream outline-none transition-all duration-300 placeholder:text-muted/50 focus:border-gold/45 focus:bg-white/[0.065] focus:shadow-[0_0_0_4px_rgba(245,185,66,0.07)]'

const fieldVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)', rotate: -1 },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    rotate: 0,
    transition: { duration: 0.6, ease: easing },
  },
}

function Field({ index, icon: Icon, label, children, iconClass = 'top-1/2 -translate-y-1/2' }) {
  return (
    <motion.label variants={fieldVariants} className="group block">
      <span className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-cream/65 uppercase">
        <span className="font-serif text-[10px] text-gold/80">{String(index + 1).padStart(2, '0')}</span>
        {label}
      </span>
      <span className="relative block">
        <Icon
          size={17}
          className={`pointer-events-none absolute left-4 ${iconClass} text-gold/70 transition-colors duration-300 group-focus-within:text-flame`}
        />
        {children}
        <span className="pointer-events-none absolute inset-x-5 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-gold via-flame to-transparent transition-transform duration-500 group-focus-within:scale-x-100" />
      </span>
    </motion.label>
  )
}

function Corner({ className = '' }) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute h-6 w-6 text-gold/50 ${className}`}
    >
      <path d="M2 20V2H20" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 16V6H16" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
    </svg>
  )
}

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false)
  const root = useRef(null)

  useScrollSpin(root, '.form-orbit', { from: -50, to: 190, start: 'top bottom', end: 'bottom top' })
  useRoundedScroll(root, '.booking-panel', { from: 64, to: 40, start: 'top 92%', end: 'top 35%' })

  return (
    <section id="contact" ref={root} className="relative scroll-mt-20 overflow-x-clip py-28 lg:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-25" />
      <div className="pointer-events-none absolute -top-20 right-[8%] -z-10 h-72 w-72 rounded-full bg-gold/[0.07] blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---------- left: details ---------- */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Reservations"
              title={
                <>
                  Save your seat at <span className="font-serif italic text-flame">the table.</span>
                </>
              }
              description="Planning a dinner, a birthday or just a serious hunger? Book ahead and we'll have your favourite ready when you walk in."
            />

            <GoldFlourish className="mt-6 h-4 w-44 text-gold" />

            <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
              {details.map(({ icon: Icon, label, value }, i) => (
                <StaggerItem key={label}>
                  <motion.div
                    whileHover={{ y: -5, rotate: i % 2 === 0 ? -1.2 : 1.2, borderRadius: '1.6rem' }}
                    transition={{ duration: 0.35, ease: easing }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:border-gold/35"
                  >
                    <span className="absolute top-3 right-4 font-serif text-[10px] text-gold/40">
                      0{i + 1}
                    </span>
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-flame/10 text-flame transition-transform duration-500 group-hover:-rotate-12">
                        <Icon size={18} />
                      </span>
                      <div>
                        <div className="text-[11px] tracking-widest text-muted uppercase">{label}</div>
                        <div className="mt-1 text-sm leading-snug font-medium">{value}</div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>

            <RoundedReveal className="relative mt-9" from={88} to={28}>
              <div className="relative h-56 overflow-hidden rounded-[1.75rem] border border-gold/20 shadow-2xl shadow-black/25">
                <SmartImage
                  src={images.team}
                  alt="Friends enjoying a meal at M.Sohail"
                  imgClass="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="font-serif text-2xl font-semibold">Good food, good company.</div>
                  <div className="mt-1 text-sm text-cream/70">That's the whole idea.</div>
                </div>
              </div>
              <RoyalSeal
                monogram="✦"
                caption="M.SOHAIL · "
                size={94}
                scrollRotate={140}
                className="absolute -top-9 -right-8 hidden text-gold sm:grid"
              />
            </RoundedReveal>
          </div>

          {/* ---------- right: the royal booking form ---------- */}
          <Reveal delay={0.15} y={40}>
            <div className="relative">
              <div className="form-orbit pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full border border-dashed border-gold/20 will-change-transform" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-flame/10 blur-3xl" />

              <RoyalSeal
                monogram="S"
                caption="ROYAL TABLE · "
                size={112}
                scrollRotate={160}
                className="absolute -top-12 -left-10 z-20 hidden text-gold sm:grid"
              />

              <div className="booking-panel force-dark royal-frame relative overflow-hidden rounded-[2.5rem] bg-charcoal/85 p-6 shadow-2xl backdrop-blur-xl sm:p-11">
                <Corner className="top-4 left-4" />
                <Corner className="top-4 right-4 rotate-90" />
                <Corner className="right-4 bottom-4 rotate-180" />
                <Corner className="bottom-4 left-4 -rotate-90" />

                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.55, ease: easing }}
                      className="relative flex min-h-[540px] flex-col items-center justify-center text-center"
                    >
                      <RoyalSeal
                        monogram="✓"
                        caption="RESERVED · "
                        size={128}
                        scrollRotate={120}
                        className="text-gold"
                      />
                      <motion.h3
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6, ease: easing }}
                        className="mt-8 font-serif text-3xl leading-tight font-semibold sm:text-4xl"
                      >
                        You're on the <span className="italic text-gold">list.</span>
                      </motion.h3>
                      <GoldFlourish className="mx-auto mt-5 h-4 w-48 text-gold" />
                      <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
                        Thanks for booking with M.Sohail. Our team will give you a call shortly to
                        confirm your table. See you soon!
                      </p>
                      <motion.button
                        type="button"
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 0 }}
                        onClick={() => setSubmitted(false)}
                        className="mt-8 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
                      >
                        Make another booking
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, y: -14 }}
                      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
                      onSubmit={(event) => {
                        event.preventDefault()
                        setSubmitted(true)
                      }}
                      className="relative"
                    >
                      <motion.div variants={fieldVariants}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-1.5 text-[10px] font-bold tracking-[0.28em] text-gold uppercase">
                          <Crown size={13} /> The royal table
                        </span>
                        <h3 className="mt-5 font-serif text-3xl leading-tight font-semibold sm:text-4xl">
                          Book your table <span className="italic text-gold">in style.</span>
                        </h3>
                        <p className="mt-2 text-sm text-cream/60">
                          A seat, a feast and a little celebrating. It only takes a minute.
                        </p>
                        <GoldFlourish className="mt-5 h-4 w-40 text-gold" />
                      </motion.div>

                      <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        <Field index={0} icon={UserRound} label="Your name">
                          <input required name="name" placeholder="Ahmed Khan" className={fieldClass} />
                        </Field>
                        <Field index={1} icon={Phone} label="Phone number">
                          <input required name="phone" type="tel" placeholder="+92 3xx xxxxxxx" className={fieldClass} />
                        </Field>
                        <Field index={2} icon={CalendarDays} label="Date">
                          <input
                            required
                            name="date"
                            type="date"
                            style={{ colorScheme: 'dark' }}
                            className={fieldClass}
                          />
                        </Field>
                        <Field index={3} icon={Clock3} label="Time">
                          <input
                            required
                            name="time"
                            type="time"
                            style={{ colorScheme: 'dark' }}
                            className={fieldClass}
                          />
                        </Field>
                      </div>

                      <div className="mt-5">
                        <Field index={4} icon={Users} label="Number of guests">
                          <select required name="guests" defaultValue="" className={`${fieldClass} appearance-none`}>
                            <option value="" disabled>
                              Select guests
                            </option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                              <option key={n} value={n}>
                                {n} {n === 1 ? 'person' : 'people'}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gold/70"
                          />
                        </Field>
                      </div>

                      <div className="mt-5">
                        <Field
                          index={5}
                          icon={MessageSquareText}
                          label="Anything we should know?"
                          iconClass="top-5"
                        >
                          <textarea
                            name="notes"
                            rows="3"
                            placeholder="High chair, birthday surprise, spicy food..."
                            className={`${fieldClass} resize-none`}
                          />
                        </Field>
                      </div>

                      <motion.div variants={fieldVariants} className="mt-7">
                        <Magnetic className="w-full">
                          <motion.button
                            type="submit"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                            className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-gold via-[#ffe1a8] to-gold py-4 text-sm font-extrabold tracking-wide text-ink shadow-[0_16px_40px_-14px_rgba(245,185,66,0.8)] ring-1 ring-white/50"
                          >
                            <span className="relative z-10 inline-flex items-center justify-center gap-2">
                              Reserve my table <ArrowRight size={17} />
                            </span>
                            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                          </motion.button>
                        </Magnetic>
                        <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-cream/50">
                          <Check size={12} className="text-gold" /> No payment needed now · We'll confirm by phone
                        </p>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
