import { prisma } from "@/lib/prisma"
import { ProductCard } from "../products/product-card"

export default async function Featured() {
  // const products = [
  //   {
  //     id: 1,
  //     image: "next.svg",
  //     name: "szczoteczka",
  //     price: 99.99,
  //     stock: 5,
  //     description: "Opis szczoteczki",
  //   },
  //   {
  //     id: 2,
  //     image: "next.svg",
  //     name: "szczoteczka 2",
  //     price: 89.99,
  //     stock: 3,
  //     description: "Opis szczoteczki",
  //   },
  //   {
  //     id: 3,
  //     image: "next.svg",
  //     name: "szczoteczka 3",
  //     price: 79.99,
  //     stock: 7,
  //     description: "Opis szczoteczki",
  //   },
  // ]

  const products = await prisma.product.findMany({
    take: 3,
  })
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-16 py-16">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="px-2 text-center font-Junge text-5xl font-medium">
          Polecane produkty
        </h1>
        <p className="w-9/12 text-center text-gray-500">
          Szczoteczki HollySmile zapewniają skuteczne czyszczenie zębów, są
          delikatne dla dziąseł i gwarantują zdrowy uśmiech każdego dnia.
        </p>
      </div>
      <div className="relative flex w-full max-w-xs flex-col gap-8 px-4 md:max-w-screen-md md:flex-row 2xl:max-w-screen-xl">
        {products.map((product) => (
          <ProductCard
            key={product.id}
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
