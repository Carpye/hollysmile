"use client"
import { prisma } from "@/lib/prisma"
import { createContext, useContext, useEffect, useState } from "react"

type CartItem = {
  id: string | number
  name: string
  price: number
  stock: number
  image: string | null
}

type CartContextType = {
  cart: CartItem[]
  removeCartItem: (id: string | number) => void
  addCartItem: (id: number) => void
  // Add other cart operations here, e.g., addCartItem, updatestock, etc.
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = "shopping-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const mockCart: CartItem[] = [
    {
      id: "1",
      name: "Koszulka",
      price: 50,
      stock: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Buty",
      price: 150,
      stock: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Bluza",
      price: 200,
      stock: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      name: "Spodnie",
      price: 70,
      stock: 1,
      image: "https://via.placeholder.com/150",
    },
  ]
  const [cart, setCart] = useState<CartItem[]>([])

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize cart from local storage
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    // Update local storage whenever cart changes, but only after initialization
    if (isInitialized) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart, isInitialized])

  const removeCartItem = (id: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }
  const addCartItem = async (id: number) => {
    const weirdItem: CartItem = {
      id: id,
      name: "Koszulka",
      price: 50,
      stock: 1,
      image: "https://via.placeholder.com/150",
    }
    setCart((prevCart) => [...prevCart, weirdItem])
  }

  const value = {
    cart,
    removeCartItem,
    addCartItem,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
