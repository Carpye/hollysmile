"use client"

import { CartDetails } from "@/types"
import { useCartActions } from "./cart-context"

export default function CartItemQuantitySelector({
  item,
}: {
  item: CartDetails["items"][number]
}) {
  const { updateQuantity } = useCartActions()

  return (
    <div className="flex w-fit items-center overflow-hidden rounded-lg border border-[#9d8189]">
      <button
        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
        className="rounded-l px-3 py-1 font-medium hover:bg-background-secondary"
        disabled={item.quantity <= 1}
      >
        -
      </button>
      <span className="px-4 py-1">{item.quantity}</span>
      <button
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        className="rounded-r px-3 py-1 font-medium hover:bg-background-secondary"
        disabled={item.quantity >= item.stock}
      >
        +
      </button>
    </div>
  )
}
