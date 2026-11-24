import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { SmartImage, easing, formatPrice } from './ui.jsx'

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQty,
    clearCart,
    subtotal,
    delivery,
    total,
    count,
  } = useCart()
  const [placed, setPlaced] = useState(false)
  const navigate = useNavigate()

  const close = () => {
    setIsOpen(false)
    setTimeout(() => setPlaced(false), 350)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-charcoal shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-flame/15 text-flame">
                  <ShoppingBag size={19} />
                </span>
                <div>
                  <h2 className="font-serif text-xl font-semibold">Your order</h2>
                  <p className="text-xs text-muted">
                    {placed ? 'Order confirmed' : `${count} ${count === 1 ? 'item' : 'items'} in cart`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-muted transition-colors hover:border-flame hover:text-flame"
              >
                <X size={19} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {placed ? (
                <motion.div
                  key="placed"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: easing }}
                  className="flex flex-1 flex-col items-center justify-center px-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-flame/15 text-flame"
                  >
                    <Check size={38} strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="mt-7 font-serif text-3xl font-semibold">Order placed!</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                    Your food is headed to the kitchen. We'll be in touch shortly with
                    delivery details. Get ready to eat well.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-8 rounded-full bg-flame px-7 py-3 text-sm font-bold text-white hover:bg-flame-deep"
                  >
                    Awesome, thanks!
                  </button>
                </motion.div>
              ) : items.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 flex-col items-center justify-center px-8 text-center"
                >
                  <div className="text-6xl opacity-70">🍔</div>
                  <h3 className="mt-6 font-serif text-2xl font-semibold">Nothing here yet</h3>
                  <p className="mt-2 max-w-xs text-sm text-muted">
                    Your cart is waiting for something delicious. Let's fix that.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      close()
                      navigate('/menu')
                    }}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white hover:bg-flame-deep"
                  >
                    Browse the menu <ArrowRight size={16} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="items"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 flex-col overflow-hidden"
                >
                  <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 rounded-2xl border border-white/8 bg-ink/60 p-3"
                      >
                        <SmartImage
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate text-sm font-bold">{item.name}</h3>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="shrink-0 text-muted transition-colors hover:text-flame"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-flame">
                            {formatPrice(item.price)}
                          </p>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center rounded-full border border-white/12">
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, -1)}
                                aria-label="Decrease quantity"
                                className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:text-flame"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-5 text-center text-xs font-bold">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, 1)}
                                aria-label="Increase quantity"
                                className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:text-flame"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="text-xs font-semibold text-cream/80">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 bg-ink/50 px-6 py-5">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>Delivery</span>
                        <span className={delivery === 0 ? 'text-flame' : ''}>
                          {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="font-serif text-2xl font-semibold text-flame">
                        {formatPrice(total)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPlaced(true)
                        clearCart()
                      }}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-flame py-3.5 text-sm font-bold text-white transition-colors hover:bg-flame-deep"
                    >
                      Place order <ArrowRight size={16} />
                    </button>
                    <p className="mt-3 text-center text-[11px] text-muted">
                      {subtotal >= 1500
                        ? '🎉 You unlocked free delivery!'
                        : `Add ${formatPrice(1500 - subtotal)} more for free delivery`}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
