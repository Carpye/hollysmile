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
      className="relative flex w-full max-w-md flex-col overflow-hidden rounded-xl border-2 border-primary sm:w-96"
    >
      <div className="relative aspect-square h-full w-full object-cover sm:h-80">
        <Image
          alt="Zdjęcie produktu"
          src={image}
          fill
          className="object-cover"
        />
      </div>
      <div className="relative bottom-0 min-h-20 w-full bg-zinc-100 p-3 px-4">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-pretty text-base text-gray-600">{description}</p>
        <div className="absolute -top-10 right-2 rounded-full bg-primary px-3 py-1 text-base font-medium text-white">
          {price} zł
        </div>
      </div>
    </Link>
  )
}
