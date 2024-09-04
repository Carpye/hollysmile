import About from "@/components/landing/About"
import AboutUs from "@/components/landing/AboutUs"
import Featured from "@/components/landing/Featured"
import Hero from "@/components/landing/Hero"

export default function Home() {
  return (
    <main>
      <Hero />
      <Featured />
      <About />
      <AboutUs />
    </main>
  )
}
