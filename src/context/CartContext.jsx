import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const toastKey = useRef(0)

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const found = prev.find((entry) => entry.id === item.id)
      if (found) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry,
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
    setIsOpen(true)
    toastKey.current += 1
    setToast({ key: toastKey.current, name: item.name })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2800)
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id))
  }, [])

  const updateQty = useCallback((id, delta) => {
    setItems((prev) =>
      prev
        .map((entry) =>
          entry.id === id ? { ...entry, qty: entry.qty + delta } : entry,
        )
        .filter((entry) => entry.qty > 0),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  )

  const delivery = subtotal === 0 || subtotal >= 1500 ? 0 : 99
  const total = subtotal + delivery

  const value = {
    items,
    isOpen,
    setIsOpen,
    toast,
    setToast,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    count,
    subtotal,
    delivery,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider')
  }
  return context
}
