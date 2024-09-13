// "use client"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, useCartActions } from "@/components/cart/cart-context"
import { getProductDetails } from "@/actions/cart"
import ProductDetails from "@/components/ProductDetails"

export default async function ProductPage({
  params: { productId },
}: {
  params: { productId: string }
}) {
  // const product = {
  //   id: "1",
  //   name: "Classic T-Shirt",
  //   price: 29.99,
  //   description:
  //     "Our classic t-shirt is a wardrobe essential. Made from 100% organic cotton, it's soft, comfortable, and perfect for everyday wear. The versatile design pairs well with any outfit, making it a go-to choice for any casual occasion.",
  //   colors: [
  //     { name: "White", hex: "#FFFFFF" },
  //     { name: "Black", hex: "#000000" },
  //     { name: "Navy", hex: "#000080" },
  //   ],
  //   images: [
  //     "/placeholder.svg?height=600&width=400",
  //     "/placeholder.svg?height=600&width=400",
  //     "/placeholder.svg?height=600&width=400",
  //     "/placeholder.svg?height=600&width=400",
  //   ],
  //   sizes: ["XS", "S", "M", "L", "XL"],
  // }

  const product = await getProductDetails(productId)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#7088ff] p-4 text-white shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">MyShop</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </main>
    </div>
  )
}
