import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GoldFlourish, Reveal } from './ui.jsx'
import {
  ArrowRight,
  ArrowUp,
  Check,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Our story', to: '/about' },
      { label: 'Full menu', to: '/menu' },
      { label: 'Quick menu cards', to: '/food-cards' },
      { label: 'All products', to: '/products' },
    ],
  },
  {
    title: 'Cravings',
    links: [
      { label: 'Smash burgers', to: '/menu' },
      { label: 'Wood-fired pizza', to: '/menu' },
      { label: 'Fast food', to: '/menu' },
      { label: 'Desserts', to: '/menu' },
    ],
  },
]

const socials = [Instagram, Facebook, Twitter]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="texture relative overflow-hidden border-t border-gold/25 bg-gradient-to-b from-ink via-charcoal/70 to-ink pt-20 pb-8">
      {/* ambient light + top gold hairline */}
      <div className="animate-blob pointer-events-none absolute -top-44 left-1/4 h-80 w-80 rounded-full bg-flame/[0.07] blur-3xl" />
      <div className="animate-blob-reverse pointer-events-none absolute -right-24 -bottom-44 h-96 w-96 rounded-full bg-gold/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.35fr]">
          {/* brand */}
          <Reveal>
            <div>
              <Link to="/" className="group flex items-center gap-3">
                <img
                  src="/logo.svg"
                  alt="M.Sohail Food House logo"
                  className="h-12 w-12 rounded-2xl shadow-lg shadow-flame/25 ring-1 ring-gold/30 transition-transform duration-500 group-hover:-rotate-6"
                />
                <span>
                  <span className="block text-2xl font-extrabold tracking-tight">M.Sohail</span>
                  <span className="mt-1 block text-[9px] font-semibold tracking-[0.28em] text-gold/80">
                    BURGERS · PIZZA
                  </span>
                </span>
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
                A little corner of flavour by M.Sohail — serving burgers, pizza and fast
                food that makes every day feel like a treat.
              </p>

              <div className="mt-7">
                <p className="text-[10px] font-bold tracking-[0.24em] text-cream/40 uppercase">
                  Follow the flavour
                </p>
                <div className="mt-3 flex gap-2.5">
                  {socials.map((Icon, i) => (
                    <motion.div key={i} whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
                      <Link
                        to="/"
                        aria-label="Social media"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.03] text-muted transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:text-gold"
                      >
                        <Icon size={17} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* link columns */}
          {columns.map((column, i) => (
            <Reveal key={column.title} delay={i * 0.08}>
              <div className="relative pl-4">
                <span className="absolute top-2 left-0 h-4 w-px bg-gradient-to-b from-gold to-transparent" />
                <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide">
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-flame"
                      >
                        <span className="h-px w-0 bg-flame transition-all duration-300 group-hover:w-3" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* newsletter + contact card */}
          <Reveal delay={0.24}>
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-charcoal/80 to-ink/80 p-5 shadow-[0_25px_70px_-35px_rgba(0,0,0,1)]">
              <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-flame/10 blur-2xl" />
              <div className="relative">
                <h3 className="text-sm font-bold tracking-wide">Stay in the loop</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  New dishes, secret deals and good food news. No spam, promise.
                </p>

                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    if (email.trim()) setSubscribed(true)
                  }}
                  className="focus-within:border-flame/70 mt-5 flex items-center gap-2 rounded-full border border-white/12 bg-ink/70 p-1.5 pl-4 transition-colors"
                >
                  {subscribed ? (
                    <span className="flex flex-1 items-center gap-2 text-sm text-flame">
                      <Check size={16} /> You're subscribed!
                    </span>
                  ) : (
                    <>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Your email address"
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                      />
                      <motion.button
                        whileHover={{ rotate: 45 }}
                        type="submit"
                        aria-label="Subscribe"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-flame to-flame-deep text-white shadow-lg shadow-flame/30"
                      >
                        <ArrowRight size={16} />
                      </motion.button>
                    </>
                  )}
                </form>

                <div className="mt-5 space-y-2 border-t border-white/8 pt-4 text-sm text-muted">
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} className="text-flame" />
                    <a href="tel:03129939906" className="transition-colors hover:text-flame">
                      0312 9939906
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={14} className="text-flame" /> hello@msohail.pk
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={14} className="text-flame" /> Lahore, Pakistan
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* signature strip */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <GoldFlourish className="h-4 w-64 text-gold/60" />
          <p className="font-serif text-sm italic text-cream/45">Good food. Good people. Always.</p>
        </div>

        {/* bottom bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} M.Sohail Food House. All rights reserved. Made with 🍔 & love.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/" className="transition-colors hover:text-flame">Privacy Policy</Link>
            <Link to="/" className="transition-colors hover:text-flame">Terms of Service</Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 px-3 py-1.5 font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/10"
            >
              <ArrowUp size={13} /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
