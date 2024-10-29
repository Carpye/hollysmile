import { ProductCard } from "@/components/products/product-card"
import { prisma } from "@/lib/prisma"
import { Product } from "@prisma/client"

export default async function ProductsPage() {
  const products: Product[] = await prisma.product.findMany()
  return (
    <div className="flex min-h-screen flex-col bg-background-secondary bg-[url('/assets/lines-background.svg')] bg-center">
      <main className="container mx-auto flex-grow px-4 py-8">
        <h2 className="mb-8 text-3xl font-bold text-slate-700">
          Nasze produkty
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.mainImage ?? ""}
                stock={product.stock}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
