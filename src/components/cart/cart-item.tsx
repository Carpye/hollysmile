"use client"

import Image from "next/image"
import { useCartActions } from "./cart-context"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { CartDetails } from "@/types"
import CartItemQuantitySelector from "./ItemQuantitySelector"
import { Button } from "../ui/button"

export default function CartItem({
  item,
}: {
  item: CartDetails["items"][number]
}) {
  const { removeFromCart } = useCartActions()

  return (
    <div
      key={item.id}
      className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-4"
    >
      <div className="flex gap-4">
        <div className="relative aspect-square w-[128px] overflow-hidden rounded-xl object-cover">
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
            <p className="flex items-center gap-2">Kolor: {item.name}</p>
            <p className="text-gray-600">
              {item.product.price.toFixed(2)} zł / szt.
            </p>
          </div>
          <CartItemQuantitySelector item={item} />
        </div>
      </div>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="flex h-min items-center justify-center rounded-xl bg-background bg-zinc-100 p-2 text-black transition-all hover:bg-red-500/25 hover:text-red-500"
        onClick={() => removeFromCart(item.id)}
      >
        <Trash2 />
      </Button>
    </div>
  )
}
