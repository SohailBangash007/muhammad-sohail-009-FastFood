import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Moon, Search, ShoppingBag, Sun, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { menu } from '../data/site.js'
import { filterByQuery } from '../utils/search.js'
import { easing, formatPrice, SmartImage } from './ui.jsx'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Quick Menu', to: '/food-cards' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { count, setIsOpen } = useCart()
  const { theme, toggle } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
    setQuery('')
  }, [location.pathname, location.hash])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, searchOpen])

  const results = useMemo(() => {
    const trimmed = query.trim()
    if (!trimmed) return menu.slice(0, 4)
    return filterByQuery(menu, trimmed).slice(0, 6)
  }, [query])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' && !location.hash
    if (to === '/products') return location.pathname === '/products' || location.pathname === '/reviews'
    return location.pathname === to
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  // At the top the hero is dark in BOTH themes, so the bar must stay readable
  // there. Light theme gets a dark glass bar; dark theme keeps the transparent
  // look. Once scrolled, the bar follows the active theme.
  const atTop = !scrolled && !open && !searchOpen
  const headerTone = atTop
    ? theme === 'light'
      ? 'force-dark border-b border-white/10 bg-ink/80 shadow-lg shadow-black/10 backdrop-blur-xl'
      : 'force-dark border-b border-transparent bg-transparent'
    : theme === 'light'
      ? 'border-b border-cream/10 bg-ink/90 shadow-sm shadow-black/5 backdrop-blur-xl'
      : 'border-b border-white/10 bg-ink/90 shadow-lg shadow-black/20 backdrop-blur-xl'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${headerTone}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3 text-cream" onClick={closeSearch}>
          <img
            src="/logo.svg"
            alt="M.Sohail Food House logo"
            className="h-11 w-11 rounded-xl shadow-lg shadow-flame/30 ring-1 ring-white/20 transition-transform duration-500 group-hover:rotate-12"
          />
          <span className="leading-none">
            <span className="block text-xl font-extrabold tracking-tight">M.Sohail</span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.28em] text-muted">
              BURGERS · PIZZA
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`group relative text-sm font-medium transition-colors ${
                isActive(link.to) ? 'text-cream' : 'text-cream/70 hover:text-cream'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-0.5 bg-gradient-to-r from-flame to-gold transition-all duration-300 group-hover:w-full ${
                  isActive(link.to) ? 'w-full' : 'w-0'
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              setSearchOpen((value) => !value)
              if (searchOpen) setQuery('')
            }}
            aria-label={searchOpen ? 'Close search' : 'Search the menu'}
            aria-expanded={searchOpen}
            className={`flex h-11 w-11 items-center justify-center rounded-full border text-cream transition-all duration-300 hover:-translate-y-0.5 ${
              searchOpen
                ? 'border-flame text-flame'
                : 'border-white/15 hover:border-flame hover:text-flame'
            }`}
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-flame hover:text-flame"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream transition-colors hover:border-flame hover:text-flame"
          >
            <ShoppingBag size={19} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="force-dark absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-flame px-1 text-[10px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link
            to="/contact"
            className="force-dark hidden items-center gap-2 rounded-full bg-flame px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-flame/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-flame-deep hover:shadow-flame/40 sm:inline-flex"
          >
            Book a Table
            <ArrowUpRight size={16} />
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => {
              setSearchOpen(false)
              setOpen((value) => !value)
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* search panel — typo friendly, typo examples shown below */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.28, ease: easing }}
            className="force-dark absolute inset-x-0 top-20 origin-top border-b border-white/10 bg-ink/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          >
            <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
              <div className="relative">
                <Search size={19} className="absolute top-1/2 left-5 -translate-y-1/2 text-flame" />
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search burger, burgger, juice, margreta…"
                  aria-label="Search the menu"
                  className="w-full rounded-full border border-white/15 bg-white/[0.05] py-4 pr-12 pl-12 text-sm text-cream placeholder:text-muted focus:border-flame/60 focus:outline-none"
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

              <p className="mt-4 text-[11px] font-bold tracking-[0.18em] text-cream/50 uppercase">
                {query.trim() ? `${results.length} ${results.length === 1 ? 'match' : 'matches'} for “${query.trim()}”` : 'Popular right now'}
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {results.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    onClick={closeSearch}
                    className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/[0.07]"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <SmartImage
                        src={item.image}
                        alt={item.name}
                        imgClass="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-cream">{item.name}</p>
                      <p className="mt-0.5 text-[11px] text-muted">{item.category}</p>
                    </div>
                    <span className="shrink-0 font-serif text-sm font-semibold text-flame">
                      {formatPrice(item.price)}
                    </span>
                    <ArrowUpRight size={15} className="shrink-0 text-muted transition-colors group-hover:text-gold" />
                  </Link>
                ))}
              </div>

              {query.trim() && results.length === 0 && (
                <div className="mt-4 rounded-2xl border border-dashed border-white/15 py-8 text-center">
                  <div className="text-3xl">🔎</div>
                  <p className="mt-2 text-sm text-muted">Koi dish nahi mila. Try “burger” ya “juice”.</p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
                <Link
                  to={`/food-cards${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`}
                  onClick={closeSearch}
                  className="inline-flex items-center gap-2 text-sm font-bold text-flame transition-opacity hover:opacity-75"
                >
                  View all dishes <ArrowUpRight size={16} />
                </Link>
                <span className="hidden text-[11px] text-cream/40 sm:block">
                  Spelling galti? “burgger”, “juise”, “margreta” — sab chalega.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: easing }}
            className="overflow-hidden border-t border-white/5 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col px-5 py-6 sm:px-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/5 py-4 text-lg font-medium text-cream/80"
                  >
                    {link.label}
                    <ArrowUpRight size={17} className="text-flame" />
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="force-dark mt-6 flex items-center justify-center gap-2 rounded-full bg-flame px-6 py-3.5 text-sm font-semibold text-white"
              >
                Book a Table <ArrowUpRight size={16} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
