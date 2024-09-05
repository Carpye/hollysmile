import { Menu, Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import CartButton from "./cart/open-cart"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="relative mx-auto flex h-[128px] max-w-screen-2xl items-center justify-between bg-white p-8">
      <div className="logo">
        <Image
          src={"/assets/logo-black.png"}
          alt="Logo"
          width={128}
          height={64}
          className="aspect-[2008/853]"
        />
      </div>
      <ul className="absolute-center hidden gap-8 text-xl lg:flex">
        <Link href={"/"}>Strona Główna</Link>
        <Link href={"/produkty"}>Produkty</Link>
        <Link href={"#about-us"}>O nas</Link>
      </ul>
      <div className="hidden gap-8 lg:flex">
        <Button variant={"ghost"} size={"icon"}>
          <Search className="h-6 w-6" />
        </Button>
        <CartButton />
      </div>
      <div className="flex lg:hidden">
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

export default Navbar
