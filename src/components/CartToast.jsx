import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function CartToast() {
  const { toast, setToast } = useCart()

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.key}
          initial={{ opacity: 0, y: -28, x: '-50%', rotate: -3 }}
          animate={{ opacity: 1, y: 0, x: '-50%', rotate: 0 }}
          exit={{ opacity: 0, y: -18, x: '-50%', rotate: 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          role="status"
          className="force-dark fixed top-24 left-1/2 z-[80] flex w-[min(360px,calc(100vw-2.5rem))] items-center gap-3 overflow-hidden rounded-2xl border border-flame/30 bg-charcoal/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flame text-white">
            <Check size={18} strokeWidth={3} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white">Added to cart</p>
            <p className="truncate text-xs text-muted">{toast.name}</p>
          </div>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setToast(null)}
            className="text-muted transition-colors hover:text-white"
          >
            <X size={16} />
          </button>
          <motion.span
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 2.8, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-flame"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
