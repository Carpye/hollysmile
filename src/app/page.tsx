import BackgroundSlider from "@/components/background-slider"
import About from "@/components/landing/About"
import AboutUs from "@/components/landing/AboutUs"
import Featured from "@/components/landing/Featured"
import Hero from "@/components/landing/Hero"

export default function Home() {
  return (
    <div className="relative">
      {/* Div ze zdjęciami w tle */}
      <div className="fixed left-0 top-0 z-0 h-screen w-full">
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
        <div className="min-h-screen bg-transparent">
          <Featured />
        </div>
        <div className="min-h-screen bg-transparent">{/* <AboutUs /> */}</div>
      </main>
    </div>
  )
}
