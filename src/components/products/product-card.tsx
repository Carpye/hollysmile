"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { useCart } from "../cart/cart-context"
import { Trash } from "lucide-react"

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
  const { removeCartItem } = useCart()
  if (variant === "list")
    return (
      <div className="flex gap-4 border">
        <div className="object-cover w-[500px] h-[150px] relative">
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
    <div className="flex gap-4 border w-60">
      <div className="object-cover w-[150px] h-[150px] relative">
        <Image src={image} alt={name} fill />
      </div>
      <div className="p-4">
        <h2>{name}</h2>
        <p>{price}</p>
        <p>{quantity}</p>
      </div>
    </div>
  )
}
