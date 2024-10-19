"use client"
import { useEffect, useState } from "react"
import { useCart } from "../cart/cart-context"
import { ProductCard } from "./product-card"
import { getCartDetails } from "@/actions/cart"
import { CartDetails } from "@/types"
import CartItem from "../cart/cart-item"

const ProductsInCart = () => {
  const { state: {items} } = useCart()
  const [products, setProducts] = useState<CartDetails | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getCartDetails(items)
      
      setProducts(products)
    }

    fetchProducts()
  }, [items])



  if (products?.items.length === 0) return <p>Koszyk jest pusty</p>


  return <div>
    Produkty:
    {products?.items.map((item) => (
    <CartItem
      key={item.id}
      item={item}
    />
    ))}
  </div>
  
}

export default ProductsInCart
