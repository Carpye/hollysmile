"use client"
import { prisma } from "@/lib/prisma"
import { ProductCard } from "../products/product-card"
import { Button } from "../ui/button"
import { TextEffect } from "../motion/TextEffect"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { Product } from "@prisma/client"
import { InView } from "../motion/InView"
import Link from "next/link"

export default function Featured({ products }: { products: Product[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const [haveBeenSeen, setHaveBeenSeen] = useState(false)

  useEffect(() => {
    if (isInView && !haveBeenSeen) {
      setHaveBeenSeen(true)
    }
  }, [isInView, haveBeenSeen])

  return (
    <>
      <div
        className="flex w-full flex-col items-center justify-center gap-1 px-4 md:gap-2"
        ref={ref}
      >
        <TextEffect
          as="h3"
          className="text-sm font-semibold text-background drop-shadow-lg md:text-base"
          per="char"
          preset="fade"
          trigger={haveBeenSeen}
        >
          Nasze produkty
        </TextEffect>
        <TextEffect
          className="text-center text-3xl font-semibold text-white drop-shadow-xl md:text-5xl"
          as="h1"
          per="char"
          preset="fade"
          trigger={haveBeenSeen}
          delay={0.5}
        >
          Wybrane dla ciebie
        </TextEffect>
      </div>
      <InView
        className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px", once: true }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: 0.75,
        }}
      >
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
      </InView>
      <InView
        className="mt-auto flex w-full justify-center self-end px-4"
        transition={{ delay: 0.75 }}
        viewOptions={{ once: true }}
      >
        <Button className="w-full bg-[#9D8189] text-background transition-all hover:scale-105 sm:w-auto">
          <Link href={"/produkty"}>Sprawdź więcej!</Link>
        </Button>
      </InView>
    </>
  )
}
