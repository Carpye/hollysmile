import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { CartProvider } from "@/components/cart/cart-context"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Holly Smile",
  description: "Sklep internetowy Holly Smile",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <body className={inter.className}>
        <CartProvider>
          <div className="relative">
            {children}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
