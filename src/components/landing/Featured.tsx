import { ProductCard } from "../products/product-card"

export default function Featured() {
  const products = [
    {
      id: 1,
      image: "next.svg",
      name: "szczoteczka",
      price: 99.99,
      quantity: 5,
    },
    {
      id: 2,
      image: "next.svg",
      name: "szczoteczka 2",
      price: 89.99,
      quantity: 3,
    },
    {
      id: 3,
      image: "next.svg",
      name: "szczoteczka 3",
      price: 79.99,
      quantity: 7,
    },
  ]
  return (
    <div className="flex w-full flex-col items-center justify-center gap-16 py-16">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="px-2 text-center font-Junge text-5xl font-medium">
          Polecane produkty
        </h1>
        <p className="w-9/12 text-center text-gray-500">
          Szczoteczki HollySmile zapewniają skuteczne czyszczenie zębów, są
          delikatne dla dziąseł i gwarantują zdrowy uśmiech każdego dnia.
        </p>
      </div>
      <div className="flex flex-col gap-8 px-4 md:flex-row">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            variant="list"
          />
        ))}
      </div>
    </div>
  )
}
