import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Product } from "@prisma/client"
import Image from "next/image"

export default async function ProductsPage() {
  const products: Product[] = await prisma.product.findMany()
  return (
    <div className="flex min-h-screen flex-col bg-neutral-100">
      <main className="container mx-auto flex-grow px-4 py-8">
        <h2 className="mb-8 text-3xl font-bold text-gray-800">
          Nasze produkty
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produkty/${product.id}`}
      key={product.id}
      className="group block transform overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.mainImage ?? ""}
          alt={product.name}
          fill
          className="h-48 w-full transform object-cover transition duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 transition duration-300 group-hover:bg-opacity-20"></div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-8">
          <h3 className="mb-1 text-xl font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-lg font-semibold text-neutral-700">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div
          className="w-full transform rounded bg-[#7088ff] px-4 py-2 text-center text-white transition duration-300 hover:bg-[#5a6cd9] group-hover:translate-y-1 group-hover:shadow-lg"
          aria-hidden="true"
        >
          Zobacz Szczegóły
        </div>
      </div>
    </Link>
  )
}
