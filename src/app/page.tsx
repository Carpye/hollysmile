import About from "@/components/landing/About"
import AboutUs from "@/components/landing/AboutUs"
import Featured from "@/components/landing/Featured"
import Hero from "@/components/landing/Hero"

export default function Home() {
  return (
    <main className="">
      <div className="min-h-screen bg-transparent">
        <Hero />
      </div>
      <div className="bg-transparent">
        <About />
      </div>
      <div className="bg-transparent md:min-h-screen">
        <Featured />
      </div>
      <div className="bg-transparent">
        <AboutUs />
      </div>
    </main>
  )
}
