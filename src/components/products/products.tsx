"use client"
import { prisma } from "@/lib/prisma"
import { Product } from "@prisma/client"
import React from "react"
import { ProductCard } from "./product-card"

const Products = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid auto-rows-min grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image ?? ""}
          id={product.id}
          stock={1}
          variant="card"
        />
      ))}
    </div>
  )
}

export default Products
