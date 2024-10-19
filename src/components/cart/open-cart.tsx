"use client"
import React, { useEffect, useState } from "react"
import {
  OpenSheet,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Button } from "../ui/button"
import { ShoppingCart, Trash2 } from "lucide-react"
import { useCart, useCartActions, ICartItem } from "./cart-context"
import Image from "next/image"
import Link from "next/link"
import { getCartDetails } from "@/actions/cart"
import { Product, Variant } from "@prisma/client"
import { CartDetails } from "@/types"
import CartItem from "./cart-item"

const CartButton = () => {
  const { state } = useCart()
  const { removeFromCart, updateQuantity, clearCart } = useCartActions()
  const [cartDetails, setCartDetails] = useState<CartDetails | null>(null)

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (state.items.length > 0) {
        const details = await getCartDetails(state.items)
        setCartDetails(details)
      } else {
        setCartDetails(null)
      }
    }

    fetchCartDetails()
  }, [state.items])

  return (
    <OpenSheet
      closeTrigger={
        <Button asChild className="relative -bottom-10 w-full">
          <Link href={"/koszyk"}>Przejdź do koszyka</Link>
        </Button>
      }
      openTrigger={
        <Button variant={"ghost"} size={"icon"}>
          <ShoppingCart className="h-6 w-6" />
        </Button>
      }
      header=""
    >
      <div className="">
        <h2 className="mb-4 text-2xl font-bold">Twój koszyk</h2>
        {!cartDetails ? (
          <p>Twój koszyk jest pusty.</p>
        ) : (
          <>
            {cartDetails.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold">Razem:</span>
              <span className="font-bold">
                {cartDetails.total.toFixed(2)} zł
              </span>
            </div>
            <Button
              onClick={clearCart}
              className="mt-4 w-full border border-neutral-200 bg-neutral-100 text-black hover:border-none hover:bg-red-600 hover:text-white"
            >
              Wyczyść cały koszyk
            </Button>
          </>
        )}
      </div>
      <SheetClose></SheetClose>
    </OpenSheet>
  )
}

export default CartButton
