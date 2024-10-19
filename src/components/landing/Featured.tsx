import { prisma } from "@/lib/prisma"
import { ProductCard } from "../products/product-card"
import { Button } from "../ui/button"

export default async function Featured() {
  const products = await prisma.product.findMany({
    take: 3,
  })
  const repeatedProducts = Array(6).fill(products).flat().slice(0, 6)

  return (
    <div className="bg-background-secondary flex w-full flex-col items-center justify-center gap-8 rounded-[60px] py-8">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h3 className="text-base font-semibold text-primary drop-shadow-lg">
          Nasze produkty
        </h3>
        <h1 className="text-5xl font-semibold text-white drop-shadow-xl">
          Wybrane dla ciebie
        </h1>
      </div>
      <div className="grid-row-2 grid grid-cols-3 gap-6">
        {repeatedProducts.map((product: any, index: any) => (
          <ProductCard
            key={index}
            id={product.id}
            image={product.mainImage ?? ""}
            name={product.name}
            price={product.price}
            stock={product.stock}
            description={product.description ?? "Opis produktu"}
          />
        ))}
      </div>
      <div className="flex w-full justify-center">
        <Button className="bg-[#9D8189] text-background transition-all hover:scale-105">
          Sprawdź więcej!
        </Button>
      </div>
    </div>
  )
}
