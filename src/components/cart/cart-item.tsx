"use client"

import Image from "next/image"
import { useCartActions } from "./cart-context"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { CartDetails } from "@/types"

export default function CartItem({
  item,
}: {
  item: CartDetails["items"][number]
}) {
  const { removeFromCart, updateQuantity } = useCartActions()

  console.log("test")

  return (
    <div
      key={item.id}
      className="mb-4 flex items-center justify-between gap-4 border-b pb-4"
    >
      <div className="flex items-center gap-4">
        <div className="relative aspect-square h-[128px] w-[128px] overflow-hidden rounded-xl object-cover">
          <Image
            alt="Zdjęcie produktu"
            src={item.product.mainImage ?? ""}
            fill
          />
        </div>
        <div className="flex flex-col justify-between py-2">
          <div>
            <Link
              href={`/produkty/${item.product.id}`}
              className="hover font-semibold"
            >
              {item.product.name}
            </Link>
            <p className="flex items-center gap-2 text-gray-700">
              Wariant: {item.name}
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
        className="flex !max-w-[40px] grow items-center justify-center rounded-xl bg-neutral-100 p-2 text-black transition-all hover:bg-red-500/25 hover:text-red-500"
        onClick={() => removeFromCart(item.id)}
      >
        <Trash2 />
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
    <div className="mt-2 flex w-fit items-center rounded-lg border">
      <button
        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
        className="rounded-l px-3 py-1 text-2xl font-medium transition-all hover:bg-slate-100"
        disabled={item.quantity <= 1}
      >
        -
      </button>
      <span className="px-4 py-1">{item.quantity}</span>
      <button
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        className="rounded-r px-3 py-1 text-2xl font-medium transition-all hover:bg-slate-100"
        disabled={item.quantity >= item.stock}
      >
        +
      </button>
    </div>
  )
}
