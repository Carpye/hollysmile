"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { useCart } from "../cart/cart-context"
import { ShoppingBasket, Trash } from "lucide-react"

export function ProductCard({
  id,
  name,
  price,
  quantity,
  image,
  variant = "card",
}: {
  id: string | number
  name: string
  price: number
  quantity: number
  image: string
  variant?: "card" | "list"
}) {
  const { removeCartItem, addCartItem } = useCart()

  if (variant === "list")
    return (
      <div className="flex h-40 gap-4 border">
        <div className="relative h-[150px] w-[400px] object-cover">
          <Image src={image} alt={name} fill />
        </div>
        <div className="p-4">
          <h2>{name}</h2>
          <p>{price}</p>
          <p>{quantity}</p>
          <Button
            size={"icon"}
            variant={"destructive"}
            onClick={() => removeCartItem(id)}
          >
            <Trash />
          </Button>
        </div>
      </div>
    )

  return (
    <div className="flex h-min w-60 gap-4 border">
      <div className="relative h-[150px] w-[150px] object-cover">
        <Image src={image} alt={name} fill />
      </div>
      <div className="p-4">
        <h2>{name}</h2>
        <p>{price}</p>
        <p>{quantity}</p>
        <Button size={"icon"} onClick={() => addCartItem(Number(id))}>
          <ShoppingBasket />
        </Button>
      </div>
    </div>
  )
}
