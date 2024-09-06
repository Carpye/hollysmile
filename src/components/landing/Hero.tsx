"use client"
import { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"

const images = [
  "/assets/grid-background.png",
  "/assets/polkadot-background.png",
  "temporarybg.svg",
]

const Hero = () => {
  const fadePlugin = useRef(Fade())
  const autoplayPlugin = useRef(Autoplay({ delay: 3000 }))

  return (
    <div className="relative h-[calc(100vh-128px)] max-h-[600px] w-full overflow-hidden">
      <Carousel
        opts={{
          loop: true,
          align: "center",
          dragFree: false,
          watchDrag: false,
        }}
        plugins={[fadePlugin.current, autoplayPlugin.current]}
      >
        <CarouselContent>
          {images.map((image, index) => {
            const divRef = useRef<HTMLDivElement>(null)

            return (
              <CarouselItem
                key={index}
                className="h-[600px] max-h-[600px] w-full overflow-hidden"
              >
                <motion.div
                  ref={divRef}
                  className="relative flex h-full w-full items-center justify-center"
                  onViewportEnter={() => {
                    console.log(`Image ${index} entered viewport`)
                    if (divRef.current) {
                      divRef.current.classList.add("zoom-animation")
                    }
                  }}
                  onViewportLeave={() => {
                    if (divRef.current) {
                      divRef.current.classList.remove("zoom-animation")
                    }
                  }}
                >
                  <Image
                    src={image}
                    fill
                    alt={`Image ${index}`}
                    className="zoom-animation object-cover"
                  />
                </motion.div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 transform flex-col items-center justify-end gap-8">
        <h1 className="flex flex-col text-center text-5xl font-semibold">
          Zadbaj o swój piękny <span className="text-primary">Uśmiech</span>
        </h1>
        <p className="flex w-4/5 flex-col items-center justify-center text-center text-zinc-500">
          Piękny uśmiech zaczyna się od najlepszych szczoteczek – odkryj naszą
          wyjątkową ofertę w <span className="text-primary">Holly Smile!</span>
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <Button className="shadow-xl">Zobacz naszą ofertę!</Button>
          <ChevronDown className="animate-bounce" />
        </div>
      </div>
    </div>
  )
}

export default Hero
