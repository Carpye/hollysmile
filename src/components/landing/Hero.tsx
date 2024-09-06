"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const images = [
  "/assets/grid-background.png",
  "/assets/polkadot-background.png",
  "/temporarybg.svg",
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(images.length)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      setCurrentSlide(0)
    }, 100)
  }, [])
  return (
    <div className="relative h-screen max-h-[600px] w-full overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`Slide ${index}`}
          fill
          className={cn(
            "slide object-cover",
            currentSlide == index ? "active" : ""
          )}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-end gap-8 px-2 sm:w-3/4 lg:w-1/2">
        <h1 className="flex flex-col text-center text-4xl font-semibold sm:text-5xl xl:text-6xl">
          Zadbaj o swój piękny <span className="text-primary">Uśmiech</span>
        </h1>
        <p className="flex w-3/4 flex-col items-center justify-center text-center text-zinc-500">
          Piękny uśmiech zaczyna się od najlepszych szczoteczek – odkryj naszą
          wyjątkową ofertę w <span className="text-primary">Holly Smile!</span>
        </p>
      </div>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform flex-col items-center justify-center gap-4">
        <Button className="shadow-xl" size={"lg"}>
          Zobacz naszą ofertę!
        </Button>
        <ChevronDown className="z-50 h-12 w-12 animate-bounce text-neutral-700" />
      </div>
    </div>
  )
}

export default Hero
