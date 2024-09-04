import Products from "@/components/products/products"
import { prisma } from "@/lib/prisma"
import React from "react"

const ProductsPage = async () => {
  const products = await prisma.product.findMany()
  return (
    <div className="mt-32 flex h-screen w-full">
      <div className="h-screen w-1/4 bg-slate-200"> sidebar</div>
      <div className="flex w-3/4 justify-center">
        <Products products={products} />
      </div>
    </div>
  )
}

export default ProductsPage
