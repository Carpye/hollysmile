"use client"
import { prisma } from "@/lib/prisma"
import { Product } from "@prisma/client"
import React from "react"
import { ProductCard } from "./product-card"

const Products = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image ?? ""}
          id={product.id}
          quantity={1}
          variant="card"
        />
      ))}
    </div>
  )
}

export default Products
