import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Product } from "@prisma/client"

export default async function ProductsPage() {
  const products: Product[] = await prisma.product.findMany()
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <main className="container mx-auto flex-grow px-4 py-8">
        <h2 className="mb-8 text-3xl font-bold text-gray-800">
          Nasze produkty
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <Link
              href={`/produkty/${product.id}`}
              key={product.id}
              className="group block transform overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.mainImage ?? ""}
                  alt={product.name}
                  className="h-48 w-full transform object-cover transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 transition duration-300 group-hover:bg-opacity-20"></div>
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="mb-4 text-gray-600">
                  ${product.price.toFixed(2)}
                </p>
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
          ))}
        </div>
      </main>
    </div>
  )
}
