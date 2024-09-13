"use client"
import Image from "next/image"
import React, { useState } from "react"
import { useCartActions } from "./cart/cart-context"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { Prisma, Product } from "@prisma/client"

const ProductDetails = ({
  product,
}: {
  product: Product & { variants: { color: string }[]; images: string[] }
}) => {
  const [selectedColor, setSelectedColor] = useState(product.variants[0].color)
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

  const { addToCart } = useCartActions()
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative">
        <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={product.images[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="h-full w-full object-cover object-center"
          />
        </div>
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

      <div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          {product.name}
        </h1>
        <p className="mb-6 text-2xl font-semibold text-gray-700">
          ${product.price.toFixed(2)}
        </p>
        <p className="mb-6 text-gray-600">{product.description}</p>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Color</h2>
          <div className="flex space-x-2">
            {product.variants.map((variant) => (
              <button
                key={variant.color}
                onClick={() => setSelectedColor(variant.color)}
                className={`h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7088ff] focus:ring-offset-2 ${
                  selectedColor === variant.color ? "ring-2 ring-[#7088ff]" : ""
                }`}
                style={{ backgroundColor: variant.color }}
                aria-label={`Select ${variant.color} color`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Selected: {selectedColor}
          </p>
        </div>

        <Button
          className="w-full rounded-md bg-[#7088ff] px-6 py-3 font-semibold text-white hover:bg-[#5a6cd9]"
          onClick={() => addToCart(product.id)}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductDetails
