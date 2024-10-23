"use client"
import Image from "next/image"
import Link from "next/link"

export function ProductCard({
  id,
  name,
  price,
  stock,
  image,
  description,
}: {
  id: string | number
  name: string
  price: number
  stock: number
  image: string
  description?: string
}) {
  return (
    <Link
      href={`/produkty/${id}`}
      className="group relative flex w-full max-w-[350px] flex-col overflow-hidden rounded-xl bg-background p-3 transition-transform duration-100 hover:scale-110 active:scale-105 md:p-4"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          alt="Zdjęcie produktu"
          src={image}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="pt-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-0">
          <h1 className="line-clamp-2 text-base font-semibold text-primary md:text-lg">
            {name}
          </h1>
          <span className="whitespace-nowrap text-base font-semibold text-accent-foreground md:text-lg">
            {price} zł
          </span>
        </div>
        <p className="text-xs text-neutral-500">2 warianty</p>
      </div>
    </Link>
  )
}
