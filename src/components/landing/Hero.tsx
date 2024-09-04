import React from "react"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative h-[calc(100vh-128px)] w-full bg-slate-200">
      <Image src={"temporarybg.svg"} fill alt="XD" />
      <h1 className="absolute left-1/2 top-32 -translate-x-1/2 transform text-center text-3xl">
        Image Hero
      </h1>
    </div>
  )
}

export default Hero
