"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const images = [
  "/assets/bg1.png",
  "/assets/bg2.png",
  "/assets/bg3.png",
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
        <div className="relative h-72 w-[588px]">
          <Image
            src={"/assets/logo-white.svg"}
            fill
            alt="heroImg"
            className="drop-shadow-lg"
          />
        </div>
        <h1 className="strong-shadow relative -top-16 text-4xl font-semibold text-white shadow-black drop-shadow-2xl">
          Witamy w naszym sklepie
        </h1>
      </div>
    </div>
  )
}

export default Hero
