import BackgroundSlider from "@/components/background-slider"
import About from "@/components/landing/About"
import AboutUs from "@/components/landing/AboutUs"
import Featured from "@/components/landing/Featured"
import Hero from "@/components/landing/Hero"
import Navbar from "@/components/Navbar"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 3,
  })

  return (
    <>
      <Navbar type="transparent" />
      <div className="relative">
        {/* Div ze zdjęciami w tle */}
        <div className="fixed left-0 top-0 z-0 h-screen w-full bg-[#c2a374]">
          <BackgroundSlider />
        </div>
        {/* Główna zawartość */}
        <main className="relative z-10">
          <div className="min-h-screen bg-transparent">
            <Hero />
          </div>
          <div className="min-h-screen bg-transparent">
            <About />
          </div>
          <div className="flex min-h-screen w-full flex-col items-center gap-24 bg-transparent py-24">
            <Featured products={products} />
          </div>
          <div className="grid min-h-screen place-items-center bg-transparent">
            <AboutUs />
          </div>
        </main>
      </div>
    </>
  )
}
