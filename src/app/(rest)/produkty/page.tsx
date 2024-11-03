import { ProductCard } from "@/components/products/product-card"
import { prisma } from "@/lib/prisma"
import { Product } from "@prisma/client"
import Image from "next/image"

export default async function ProductsPage() {
  const products: Product[] = await prisma.product.findMany() // bg-[#fffbf9
  return (
    <div className="flex min-h-screen flex-col bg-stone-900">
      <div className="relative h-72 w-full">
        <Image
          src={"/assets/bg1.png"}
          alt="image"
          fill
          className="object-cover"
        />
        <h2 className="absolute bottom-4 left-6 text-4xl font-bold text-white sm:text-6xl">
          Nasze produkty
        </h2>
      </div>
      <main className="container mx-auto flex-grow px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                image={product.mainImage ?? ""}
                name={product.name}
                price={product.price}
                stock={product.stock}
                description={product.description ?? "Opis produktu"}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
