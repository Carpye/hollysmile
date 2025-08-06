"use client"
import { Product, Variant } from "@/../prisma/generated/client"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  MinusIcon,
  PlusIcon,
  ShoppingBasket,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useCart, useCartActions } from "./cart/cart-context"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import OptimizedImage from "./OptimizedImage"

export default function ProductDetails({
  product,
}: {
  product: Product & { variants: Variant[]; images: string[] }
}) {
  const [quantity, setQuantity] = useState(1)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  )
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 })

  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0]
  )
  const incrementQuantity = () =>
    setQuantity((prev) => Math.min(prev + 1, selectedVariant.stock))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  const { addToCart } = useCartActions()
  const {
    state: { items: cartItems },
  } = useCart()

  console.log(cartItems)

  const currentVariantQuantityInCart =
    cartItems.find(
      (item) =>
        item.productId === product.id && item.variantId === selectedVariant.id
    )?.quantity ?? 0

  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth
      const clientWidth = carouselRef.current.clientWidth
      setDragConstraints({ right: 0, left: -(scrollWidth - clientWidth) })
    }
  }, [])

  const changeImage = (newIndex: number, direction: "left" | "right") => {
    if (currentImageIndex === newIndex) return
    setSlideDirection(direction)
    setCurrentImageIndex(newIndex)
  }

  const nextImage = () => {
    const newIndex =
      currentImageIndex === product.images.length - 1
        ? 0
        : currentImageIndex + 1
    changeImage(newIndex, "right")
  }

  const prevImage = () => {
    const newIndex =
      currentImageIndex === 0
        ? product.images.length - 1
        : currentImageIndex - 1
    changeImage(newIndex, "left")
  }

  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "right" ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      zIndex: 0,
      x: direction === "right" ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <div className="flex w-full flex-col items-start justify-around md:items-center lg:flex-row lg:items-start lg:justify-center lg:gap-16">
      <div className="w-full lg:max-w-2xl">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <AnimatePresence initial={false} custom={slideDirection}>
            <motion.div
              key={currentImageIndex}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute h-full w-full bg-neutral-100"
              style={{
                willChange: "opacity, transform",
                backfaceVisibility: "hidden",
              }}
            >
              <OptimizedImage
                src={product.images[currentImageIndex] ?? "/placeholder.svg"}
                fill
                priority
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Now with higher z-index */}
          <div className="absolute inset-0 z-10 flex items-center justify-between px-4">
            <motion.button
              whileHover={{ scale: 1.1, marginLeft: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevImage}
              className="rounded-full bg-accent-foreground p-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, marginRight: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextImage}
              className="rounded-full bg-accent-foreground p-2"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Thumbnail Slider */}
        <motion.div
          ref={carouselRef}
          className="mt-4 flex gap-2 overflow-hidden pb-2"
        >
          <motion.div
            drag="x"
            dragConstraints={dragConstraints}
            className="flex gap-2"
          >
            {product.images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const direction = index > currentImageIndex ? "right" : "left"
                  changeImage(index, direction)
                }}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  index === currentImageIndex
                    ? "border-accebg- opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  draggable={false}
                  src={image}
                  fill
                  sizes="80px"
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover"
                  quality={60}
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Dots indicator */}
        <div className="mt-4 flex justify-center gap-2">
          {product.images.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                const direction = index > currentImageIndex ? "right" : "left"
                changeImage(index, direction)
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? "w-4 bg-[#9D8189]"
                  : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Rest of the component */}
      <div className="flex w-full flex-col items-start justify-start">
        <h1 className="w-full py-4 text-2xl font-semibold sm:text-3xl md:text-4xl lg:pt-0">
          {product.name}
        </h1>
        <Separator className="bg-accent-foreground" />
        <div className="flex flex-col items-start justify-around md:flex-row md:justify-start md:gap-8 lg:flex-col">
          <div className="flex w-full max-w-full flex-col items-start justify-start truncate py-4 lg:w-full lg:flex-col lg:py-0">
            <p className="text-wrap break-words pb-4 text-neutral-700 lg:py-4">
              {product.description}
            </p>
            <span className="rounded-3xl p-2 px-0 text-3xl font-bold">
              {product.price.toFixed(2)} zł
            </span>
            <div className="my-2 md:my-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Kolor
              </h2>
              <div className="ml-1 flex space-x-2">
                {product.variants.map((variant) => (
                  <motion.button
                    key={variant.color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedVariant(variant)}
                    data-selected={variant.id === selectedVariant.id}
                    className={`h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9D8189] focus:ring-offset-2 ${
                      variant.id === selectedVariant.id
                        ? "ring-2 ring-[#9D8189]"
                        : ""
                    }`}
                    style={{ backgroundColor: variant.color }}
                    aria-label={`Select ${variant.color} color`}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Wybrany kolor: {selectedVariant.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col-reverse items-center justify-center gap-4 p-4 sm:flex-row sm:justify-start sm:px-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="xs:w-[340px] flex w-full items-center justify-center gap-2 rounded-xl bg-[#9D8189] px-4 py-6 text-xl text-white shadow-xl sm:w-auto"
            onClick={() => addToCart(product.id, selectedVariant.id, quantity)}
            disabled={selectedVariant.stock - currentVariantQuantityInCart <= 0}
          >
            <ShoppingBasket /> Dodaj do koszyka
          </motion.button>

          <div className="xs:w-[340px] flex w-full items-center justify-between gap-2 rounded-xl border-2 border-[#9d8189] sm:w-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-xl hover:bg-background-secondary"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-4 w-4 text-[#9d8189]" />
            </Button>
            <span className="rounded-lg px-4 py-2 text-[#9d8189]">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-xl hover:bg-background-secondary"
              onClick={incrementQuantity}
              disabled={
                quantity >= selectedVariant.stock - currentVariantQuantityInCart
              }
            >
              <PlusIcon className="h-4 w-4 text-[#9d8189]" />
            </Button>
          </div>
          {selectedVariant.stock <= 10 && (
            <p className="text-sm text-gray-500">
              Pozostało {selectedVariant.stock} sztuk
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
