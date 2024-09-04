import Products from "@/components/products/products"
import { prisma } from "@/lib/prisma"
import React from "react"

const ProductsPage = async () => {
  const products = await prisma.product.findMany()
  return (
    <div>
      <Products products={products} />
    </div>
  )
}

export default ProductsPage
