import Products from "@/components/products/products-in-cart"
import React from "react"

const CartPage = () => {
  return (
    <div>
      <div>{/* Navigator Indicator */}</div>
      <div className="flex">
        <div className="flex flex-col gap-4">
          <h1>Produkty w koszyku</h1>
          <div className="flex flex-col gap-4">
            <Products />
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  )
}

export default CartPage
