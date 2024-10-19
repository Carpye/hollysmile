"use client"

import Image from "next/image"
import { useCartActions } from "./cart-context"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { CartDetails } from "@/types"

export default function CartItem({ item }: { item: CartDetails["items"][number] }) {
    const { removeFromCart, updateQuantity } = useCartActions()
  
    return (
      <div
        key={item.id}
        className="mb-4 flex justify-between border-b pb-4 gap-4"
      >
        <div className="flex gap-4">
          <div className="relative aspect-square w-[128px] overflow-hidden rounded-xl object-cover">
            <Image alt="Zdjęcie produktu" src={item.product.mainImage ?? ""} fill />
          </div>
          <div className="flex flex-col justify-between py-2">
            <div>
              <Link href={`/produkty/${item.product.id}`} className="font-semibold hover">{item.product.name}</Link>
              <p className="flex items-center gap-2">Wariant: {item.name} 
              
              </p>
              <p className="text-gray-600">
                {item.product.price.toFixed(2)} zł / szt.
              </p>
            </div>
            <CartItemQuantitySelector
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
        <button
          className="flex grow items-center justify-center rounded-xl bg-red-500/25 p-2 !max-w-[40px]"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="text-red-500" />
        </button>
      </div>
    )
  }
  
  function CartItemQuantitySelector({
    item,
    updateQuantity,
    removeFromCart,
  }: {
    item: CartDetails["items"][number]
    updateQuantity: (id: string, quantity: number) => void
    removeFromCart: (id: string) => void
  }) {
    return (
      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          className="rounded-l bg-gray-200 px-2 py-1"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="rounded-r bg-gray-200 px-2 py-1"
          disabled={item.quantity >= item.stock}
        >
          +
        </button>
      </div>
    )
  }
  