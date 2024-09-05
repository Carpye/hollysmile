"use client"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"

const images = [
  "/assets/grid-background.png",
  "/assets/polkadot-background.png",
  "temporarybg.svg",
]

const Hero = () => {
  const fadePlugin = useRef(Fade())
  const autoplayPlugin = useRef(Autoplay({ delay: 3000 }))

  return (
    <div className="relative h-[calc(100vh-128px)] max-h-[600px] w-full overflow-hidden bg-slate-200">
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
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="h-[600px] max-h-[600px] w-full overflow-hidden"
            >
              <div className="relative flex h-full w-full items-center justify-center bg-slate-500">
                <Image
                  src={image}
                  fill
                  alt={`Image ${index}`}
                  className="zoom-animation object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* <h1 className="absolute left-1/2 top-32 -translate-x-1/2 transform text-center text-3xl">
        Image Hero
      </h1> */}
    </div>
  )
}

export default Hero
