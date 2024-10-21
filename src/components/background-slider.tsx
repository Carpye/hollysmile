"use client"

import { useEffect, useState } from "react"

// Komponent do wyświetlania zmieniających się zdjęć
export default function BackgroundSlider() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = ["/assets/bg1.png", "/assets/bg2.png", "/assets/bg3.png"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000) // Zmiana co 5 sekund

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full w-full">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute left-0 top-0 h-full w-full transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
    </div>
  )
}
