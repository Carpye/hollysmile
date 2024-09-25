"use client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { useCartActions } from "./cart/cart-context"
import {
  ChevronLeft,
  ChevronRight,
  MinusIcon,
  PlusIcon,
  ShoppingBasket,
} from "lucide-react"
import { Input } from "./ui/input"
import { Product, Variant } from "@prisma/client"
import Image from "next/image"

export default function ProductDetails({
  product,
}: {
  product: Product & { variants: Variant[]; images: string[] }
}) {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  const { addToCart } = useCartActions()

  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0]
  )
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    )
  }
  useEffect(() => {
    console.log(product.images[currentImageIndex])
  }, [currentImageIndex, product.images])

  return (
    <div className="flex w-full flex-col items-start justify-around md:items-center lg:flex-row lg:items-start lg:justify-center lg:gap-16">
      <div className="relative aspect-square h-3/4 w-full sm:h-[464px] md:h-3/4 lg:h-full">
        <Image
          src={product.images[currentImageIndex] ?? "/placeholder.svg"}
          fill
          alt={`${product.name} - Image ${currentImageIndex + 1}`}
          className="rounded-xl object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
        <div className="mt-4 flex justify-center">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`mx-1 h-3 w-3 rounded-full ${
                index === currentImageIndex ? "bg-[#7088ff]" : "bg-gray-300"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-start">
        <h1 className="w-full py-4 text-2xl font-semibold sm:text-3xl md:text-4xl lg:pt-0">
          {product.name}
        </h1>
        <Separator className="" />
        <div className="flex flex-col items-start justify-around md:flex-row md:justify-start md:gap-8 lg:flex-col">
          <div className="flex w-full flex-col items-start justify-start py-4 md:w-5/12 lg:w-full lg:flex-col lg:py-0">
            <p className="pb-4 text-neutral-700 lg:py-4">
              {product.description}
            </p>
            <span className="rounded-3xl bg-primary p-2 px-3 text-xl font-medium text-white">
              ${product.price.toFixed(2)}
            </span>
            <div className="my-2 md:my-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Kolor
              </h2>
              <div className="flex space-x-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.color}
                    onClick={() => setSelectedVariant(variant)}
                    data-selected={variant.id === selectedVariant.id}
                    className={`h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7088ff] focus:ring-offset-2 ${
                      variant.id === selectedVariant.id
                        ? "ring-2 ring-[#7088ff]"
                        : ""
                    }`}
                    style={{ backgroundColor: variant.color }}
                    aria-label={`Select ${variant.color} color`}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Wybrany kolor: {selectedVariant.name}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-start justify-start pb-6">
            <h2 className="flex items-center justify-between py-2 text-2xl font-medium md:pt-4 lg:pt-2">
              Szczegóły produktu
            </h2>
            <Separator />
            <ul className="flex list-inside list-disc flex-col gap-4 pt-2">
              <li>Czas pracy: Do 10 dni na jednym ładowaniu.</li>
              <li>Wodoszczelność: IPX7 – odporna na działanie wody.</li>
              <li>Trzy tryby czyszczenia: Codzienny, wrażliwy, Wybielanie</li>
              <li>
                Ekran LED: Wyraźny ekran z wskaźnikami trybu i poziomu baterii.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex w-full flex-col-reverse items-center justify-center gap-4 p-4 sm:flex-row sm:justify-start sm:px-0">
          <Button
            className="xs:w-[340px] w-full gap-2 rounded-xl px-4 py-6 text-xl shadow-xl sm:w-auto"
            onClick={() => addToCart(product.id, selectedVariant.id)}
          >
            <ShoppingBasket /> Dodaj do koszyka
          </Button>

          <div className="xs:w-[340px] flex w-full items-center justify-between rounded-xl border sm:w-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-xl"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              max="99"
              className="w-14 rounded-none border-0 text-center text-xl font-medium [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Math.min(99, parseInt(e.target.value) || 1))
                )
              }
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-xl"
              onClick={incrementQuantity}
              disabled={quantity >= 99}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
