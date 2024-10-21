"use client"
import { Menu } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import CartButton from "./cart/open-cart"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import React from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative z-10 mx-auto flex h-[128px] max-w-screen-2xl items-center justify-between p-8 text-white">
      <div className="logo">
        <Image
          src={"/assets/logo-white.svg"}
          alt="Logo"
          width={128}
          height={64}
          className="aspect-[2008/853]"
        />
      </div>
      <ul className="absolute-center hidden gap-8 text-xl lg:flex">
        <Link href={"/"}>Strona Główna</Link>
        <Link href={"/produkty"}>Produkty</Link>
        <Link href={"/#about-us"}>O nas</Link>
      </ul>
      <div className="flex gap-4">
        <CartButton />
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="mt-12 flex flex-col">
                <div className="space-y-4">
                  <Link
                    href="/"
                    className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/produkty"
                    className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Produkty
                  </Link>
                  <Link
                    href="/#about-us"
                    className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    O nas
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

export default Navbar
