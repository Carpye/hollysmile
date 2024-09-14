"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { useCart } from "./cart/cart-context"
import { MinusIcon, PlusIcon, ShoppingBasket } from "lucide-react"
import { Input } from "./ui/input"
import { Product } from "@prisma/client"
import Image from "next/image"

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  const { addCartItem } = useCart()

  const testProduct = {
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#000080" },
    ],
  }
  const [selectedColor, setSelectedColor] = useState(testProduct.colors[0].hex)
  return (
    <div className="flex w-full flex-col items-start justify-around md:items-center lg:flex-row lg:items-start lg:justify-center lg:gap-16">
      <div className="relative aspect-square h-3/4 w-full sm:h-[464px] md:h-3/4 lg:h-full">
        <Image
          src={product.mainImage ?? "/placeholder.svg"}
          fill
          alt={"placeholder Img"}
          className="rounded-xl object-cover"
        />
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
              {`${product.price} zł`}
            </span>
            <div className="my-2 md:my-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Kolor
              </h2>
              <div className="flex space-x-2">
                {testProduct.colors.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedColor(variant.hex)}
                    className={`h-8 w-8 rounded-full ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7088ff] focus:ring-offset-2 ${
                      selectedColor === variant.hex
                        ? "ring-2 ring-[#7088ff]"
                        : ""
                    }`}
                    style={{ backgroundColor: variant.hex }}
                    aria-label={`Select ${variant.name} color`}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Wybrany motyw: {selectedColor}
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
            onClick={() => addCartItem(Number(product.id))}
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
