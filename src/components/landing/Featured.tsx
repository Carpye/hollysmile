import { prisma } from "@/lib/prisma"
import { ProductCard } from "../products/product-card"
import { Button } from "../ui/button"

export default async function Featured() {
  const products = await prisma.product.findMany({
    take: 3,
  })
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-[30px] py-4 md:gap-8 md:rounded-[60px] md:py-8">
      <div className="flex w-full flex-col items-center justify-center gap-1 px-4 md:gap-2">
        <h3 className="text-sm font-semibold text-primary drop-shadow-lg md:text-base">
          Nasze produkty
        </h3>
        <h1 className="text-center text-3xl font-semibold text-white drop-shadow-xl md:text-5xl">
          Wybrane dla ciebie
        </h1>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {products.map((product: any, index: any) => (
          <div key={index} className="flex justify-center">
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
      <div className="flex w-full justify-center px-4">
        <Button className="w-full bg-[#9D8189] text-background transition-all hover:scale-105 sm:w-auto">
          Sprawdź więcej!
        </Button>
      </div>
    </div>
  )
}
