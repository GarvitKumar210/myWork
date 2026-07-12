import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'shoply-cart-v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const api = useMemo(() => {
    function addItem(product, { color, size, qty = 1 } = {}) {
      setItems((prev) => {
        const key = `${product.id}-${color ?? ''}-${size ?? ''}`
        const existing = prev.find((i) => i.key === key)
        if (existing) {
          return prev.map((i) =>
            i.key === key ? { ...i, qty: i.qty + qty } : i,
          )
        }
        return [
          ...prev,
          {
            key,
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            color: color ?? product.colors?.[0] ?? null,
            size: size ?? product.sizes?.[0] ?? null,
            qty,
          },
        ]
      })
    }

    function updateQty(key, qty) {
      setItems((prev) =>
        prev
          .map((i) => (i.key === key ? { ...i, qty: Math.max(0, qty) } : i))
          .filter((i) => i.qty > 0),
      )
    }

    function removeItem(key) {
      setItems((prev) => prev.filter((i) => i.key !== key))
    }

    function clear() {
      setItems([])
    }

    return { addItem, updateQty, removeItem, clear }
  }, [])

  const count = items.reduce((n, i) => n + i.qty, 0)
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, count, subtotal, ...api }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
