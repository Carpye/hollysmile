"use server"

import { ICartItem } from "@/components/cart/cart-context"
import { prisma } from "@/lib/prisma" // Assume this is your database connection
import { Product, Variant } from "@prisma/client"

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

export async function getVariantDetails(id: string) {
  // In a real application, you would fetch this from your database
  const product = await prisma.variant.findUnique({
    where: { id },
    include: {
      product: true,
    },
    // select: { id: true, name: true, price: true },
  })

  if (!product) {
    throw new Error("Variant not found")
  }

  return product
}
export async function getCartDetails(cartItems: ICartItem[]): Promise<{
  items: (Variant & { product: Product; quantity: number; total: number })[];
  total: number;
}> {
  if (cartItems.length === 0) return { items: [], total: 0 }

  const variantIds = cartItems.map((item) => item.variantId)

  // Fetch all products in one query
  const products = await prisma.variant.findMany({
    include: { product: true },
    where: { id: { in: variantIds } },
  })

  // Create a map for easy lookup
  const productMap = new Map(products.map((p) => [p.id, p]))

  // Calculate cart details
  const items = cartItems.map((item) => {
    const product = productMap.get(item.variantId)
    if (!product) throw new Error(`Product with id ${item.id} not found`)
    return {
      ...product,
      quantity: item.quantity,
      total: product.price
        ? product.price * item.quantity
        : product.product.price * item.quantity,
    }
  })

  const total = items.reduce((sum, item) => sum + item.total, 0)

  return { items, total }
}
