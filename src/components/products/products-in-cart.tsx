"use client"
import { useCart } from "../cart/cart-context"
import { ProductCard } from "./product-card"

const ProductsInCart = () => {
  const { cart } = useCart()

  if (cart.length === 0) return <p>Koszyk jest pusty</p>

  return cart.map((item) => (
    <ProductCard
      key={item.id}
      name={item.name}
      price={item.price}
      stock={item.stock}
      image={item.image ?? ""}
      id={item.id}
    />
  ))
}

export default ProductsInCart
