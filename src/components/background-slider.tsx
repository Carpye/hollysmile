"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function BackgroundSlider() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = ["/assets/bg1.png", "/assets/bg2.png", "/assets/bg3.png"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Framer Motion variants for the slide and ken burns effects
  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1,
    },
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1.1,
      transition: {
        opacity: { duration: 0.5 },
        scale: { duration: 5, ease: "easeInOut" },
      },
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      scale: 1.1,
      transition: {
        opacity: { duration: 0.5 },
      },
    },
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence initial={true}>
        <motion.div
          key={currentImage}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute left-0 top-0 h-full w-full"
        >
          <Image
            src={images[currentImage]}
            alt={`Slide ${currentImage}`}
            fill
            className="object-cover object-center"
            priority
            blurDataURL={images[currentImage]}
            placeholder="blur"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
