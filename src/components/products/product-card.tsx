"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { useCart } from "../cart/cart-context"
import { ShoppingBasket, Trash } from "lucide-react"
import Link from "next/link"

export function ProductCard({
  id,
  name,
  price,
  stock,
  image,
  variant = "card",
  description,
}: {
  id: string | number
  name: string
  price: number
  stock: number
  image: string
  description?: string
  variant?: "card" | "list"
}) {
  // const { removeCartItem, addCartItem } = useCart()

  if (variant === "list")
    return (
      <div className="flex h-40 gap-4 border">
        <div className="relative h-[150px] w-[400px] object-cover">
          <Image src={image} alt={name} fill />
        </div>
        <div className="p-4">
          <h2>{name}</h2>
          <p>{price}</p>
          <p>{stock}</p>
          <Button
            size={"icon"}
            variant={"destructive"}
            // onClick={() => removeCartItem(id)}
          >
            <Trash />
          </Button>
        </div>
      </div>
    )
  //h-[500px] w-[376px]
  return (
    <Link
      href={`/produkty/${id}`}
      className="relative flex w-full max-w-md flex-col overflow-hidden rounded-xl bg-background p-4 transition-all hover:scale-105 sm:w-96"
    >
      <div className="relative aspect-square h-full w-full object-cover sm:h-80">
        <Image
          alt="Zdjęcie produktu"
          src={image}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="pt-2">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold text-primary">{name}</h1>
          <span className="text-lg font-semibold text-accent-foreground">
            {price} zł
          </span>
        </div>

        <p className="text-xs text-neutral-500">2 warianty</p>
      </div>
    </Link>
  )
}
