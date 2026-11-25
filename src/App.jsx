import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CartToast from './components/CartToast.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import FoodCardsPage from './pages/FoodCardsPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import NotFound from './pages/NotFound.jsx'
import { easing } from './components/ui.jsx'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo(0, 0)
      }
      // route change ke baad GSAP triggers nayi positions pakad lein
      ScrollTrigger.refresh()
    }, 60)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

function IntroLoader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro-loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="force-dark fixed inset-0 z-[100] flex flex-col items-center justify-center bg-flame"
        >
          <motion.img
            src="/logo.svg"
            alt="M.Sohail Food House logo"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            className="h-24 w-24 drop-shadow-xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-5 text-3xl font-extrabold tracking-[0.3em] text-white"
          >
            M.Sohail
          </motion.div>
          <div className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-white/30">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.35, ease: 'easeInOut' }}
              className="h-full w-full origin-left bg-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const [showTop, setShowTop] = useState(false)
  const location = useLocation()

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setShowTop(value > 0.25)
  })

  return (
    <div className="min-h-screen bg-ink text-cream">
      <IntroLoader />
      <ScrollManager />

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 z-[70] h-1 w-full origin-left bg-flame"
      />

      <Navbar />

      <main key={location.pathname} className="overflow-x-clip">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/food-cards" element={<FoodCardsPage />} />
            {/* old review links now land on the product list */}
            <Route path="/reviews" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </main>

      <Footer />
      <CartDrawer />
      <CartToast />

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ y: -4 }}
            className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-flame/40 bg-charcoal/90 text-flame shadow-xl backdrop-blur-sm transition-colors hover:bg-flame hover:text-white"
          >
            <ArrowUp size={19} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
