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
import { ShoppingCart } from "lucide-react"
import { useCart, useCartActions } from "./cart-context"
import Image from "next/image"
import Link from "next/link"
import { getCartDetails } from "@/actions/cart"

const CartButton = () => {
  const { state } = useCart()
  const { removeFromCart, updateQuantity, clearCart } = useCartActions()
  const [cartDetails, setCartDetails] = useState<any | null>(null)

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
        <Button asChild className="w-full">
          <Link href={"/koszyk"}>Przejdź do koszyka</Link>
        </Button>
      }
      openTrigger={
        <Button variant={"ghost"} size={"icon"}>
          <ShoppingCart className="h-6 w-6" />
        </Button>
      }
      header="Koszyk"
    >
      <div className="">
        <h2 className="mb-4 text-2xl font-bold">Shopping Cart</h2>
        {!cartDetails ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartDetails.items.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">${item.product.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="rounded-l bg-gray-200 px-2 py-1"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-r bg-gray-200 px-2 py-1"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${cartDetails.total.toFixed(2)}</span>
            </div>
            <Button
              onClick={clearCart}
              className="mt-4 w-full bg-red-500 text-white hover:bg-red-600"
            >
              Clear Cart
            </Button>
          </>
        )}
      </div>
    </OpenSheet>
  )
}

function CartItemCard({
  name,
  price,
  stock,
  image,
}: {
  name: string
  price: number
  stock: number
  image: string
}) {
  return (
    <div className="flex justify-between border">
      <div>
        <Image src={image} alt="Zdjęcie produktu" height={256} width={256} />
      </div>
      <div>
        <p>{name}</p>
        <p>{price}</p>
      </div>
      <div>
        <p>{stock}</p>
      </div>
    </div>
  )
}

export default CartButton
