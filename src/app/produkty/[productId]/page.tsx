import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductDetails from "@/components/ProductDetails"
import { prisma } from "@/lib/prisma"
import { Product } from "@prisma/client"

const Page = async ({ params }: { params: { productId: string } }) => {
  const product: Product | null = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
  })

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-8 p-8 md:p-16">
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

export default Page
