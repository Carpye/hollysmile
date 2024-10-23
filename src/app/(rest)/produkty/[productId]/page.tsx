import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, useCartActions } from "@/components/cart/cart-context"
import { getProductDetails } from "@/actions/cart"
import ProductDetails from "@/components/ProductDetails"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function ProductPage({
  params: { productId },
}: {
  params: { productId: string }
}) {
  const product = await getProductDetails(productId)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-128px)] w-full flex-col items-center gap-8 p-8 md:p-16">
      <div className="flex h-full w-full max-w-7xl flex-col gap-4">
        <Breadcrumb className="">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/produkty">Produkty</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  )
}
