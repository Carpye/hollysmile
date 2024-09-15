import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.product.create({
    data: {
      name: "Koszulka",
      price: 50,
      mainImage: "https://via.placeholder.com/150",
      stock: 10,
      description: "Koszulka z nadrukiem",
    },
  })

  await prisma.product.create({
    data: {
      name: "Spodnie",
      price: 70,
      mainImage: "https://via.placeholder.com/150",
      stock: 5,
      description: "Spodnie dresowe",
    },
  })

  await prisma.product.create({
    data: {
      name: "Buty",
      price: 150,
      mainImage: "https://via.placeholder.com/150",
      stock: 3,
      description: "Buty sportowe",
    },
  })

  await prisma.product.create({
    data: {
      name: "Bluza",
      price: 200,
      mainImage: "https://via.placeholder.com/150",
      stock: 7,
      description: "Bluza z kapturem",
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
