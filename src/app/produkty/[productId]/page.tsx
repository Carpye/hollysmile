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
  const product = await getProductDetails(productId)

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </main>
    </div>
  )
}
