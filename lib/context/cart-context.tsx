"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem } from "@/app/models/card-item"

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (cupcakeId: number) => void
  updateQuantity: (cupcakeId: number, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  isLoading: boolean
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isLoading])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.cupcakeId === item.cupcakeId)
      if (existing) {
        return prev.map((i) => (i.cupcakeId === item.cupcakeId ? { ...i, quantity: i.quantity + item.quantity } : i))
      }
      return [...prev, item]
    })
  }

  const removeItem = (cupcakeId: number) => {
    setItems((prev) => prev.filter((i) => i.cupcakeId !== cupcakeId))
  }

  const updateQuantity = (cupcakeId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cupcakeId)
      return
    }
    setItems((prev) => prev.map((i) => (i.cupcakeId === cupcakeId ? { ...i, quantity } : i)))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, isLoading }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
