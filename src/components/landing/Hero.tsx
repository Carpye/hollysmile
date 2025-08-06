"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const images = [
  "/assets/bg1.webp",
  "/assets/bg2.webp",
  "/assets/bg3.webp",
  "/assets/bg4.png",
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
    <div className="relative h-[calc(100vh-128px)] w-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 flex w-full max-w-[95vw] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-end gap-8 px-2 sm:w-3/4 lg:w-1/2">
        <div className="relative h-32 w-64 sm:h-48 sm:w-96 md:h-60 md:w-[400px] lg:h-72 lg:w-[588px]">
          <Image
            src={"/assets/logo-white.svg"}
            fill
            alt="heroImg"
            className="object-contain drop-shadow-lg"
            priority
            sizes="(max-width: 640px) 256px, (max-width: 1024px) 400px, 588px"
          />
        </div>
        <h1 className="strong-shadow relative -top-8 text-2xl font-semibold text-white shadow-black drop-shadow-2xl sm:-top-12 sm:text-3xl md:-top-14 md:text-4xl lg:-top-16">
          Witamy w naszym sklepie
        </h1>
      </div>
    </div>
  )
}

export default Hero
