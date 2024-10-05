import { prisma } from "@/lib/prisma"
import { ProductCard } from "../products/product-card"

export default async function Featured() {
  const products = await prisma.product.findMany({
    take: 3,
  })

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-16 py-32">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="px-2 text-center font-Junge text-5xl font-medium md:text-6xl">
          Polecane produkty
        </h1>
        <p className="w-10/12 text-center text-lg text-gray-500">
          Szczoteczki HollySmile zapewniają skuteczne czyszczenie zębów, są
          delikatne dla dziąseł i gwarantują zdrowy uśmiech każdego dnia.
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 lg:flex-row xl:gap-12">
        {products.map((product: any, index: any) => (
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
    </div>
  )
}
