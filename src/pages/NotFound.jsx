import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="text-7xl"
        >
          🍔
        </motion.div>
        <h1 className="mt-6 font-serif text-7xl font-semibold text-flame sm:text-9xl">404</h1>
        <p className="mt-4 text-lg text-muted">Oops — this page got eaten.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-flame px-7 py-3.5 text-sm font-bold text-white hover:bg-flame-deep"
        >
          <ArrowLeft size={16} /> Back home
        </Link>
      </motion.div>
    </section>
  )
}
