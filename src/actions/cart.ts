"use server"

import { prisma } from "@/lib/prisma" // Assume this is your database connection

export async function getProductDetails(id: string) {
  // In a real application, you would fetch this from your database
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: true,
    },
    // select: { id: true, name: true, price: true },
  })

  if (!product) {
    throw new Error("Product not found")
  }

  return product
}

export async function getCartDetails(
  cartItems: { id: string; quantity: number }[]
) {
  const productIds = cartItems.map((item) => item.id)

  // Fetch all products in one query
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true, price: true },
  })

  // Create a map for easy lookup
  const productMap = new Map(products.map((p) => [p.id, p]))

  // Calculate cart details
  const items = cartItems.map((item) => {
    const product = productMap.get(item.id)
    if (!product) throw new Error(`Product with id ${item.id} not found`)
    return {
      ...product,
      quantity: item.quantity,
      total: product.price * item.quantity,
    }
  })

  const total = items.reduce((sum, item) => sum + item.total, 0)

  return { items, total }
}
