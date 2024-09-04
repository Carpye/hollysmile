import { Menu, Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import CartButton from "./cart/open-cart"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex justify-between p-8 bg-white relative items-center">
      <div className="logo">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={128}
          height={64}
          className="aspect-[2008/853]"
        />
      </div>
      <ul className="gap-8 absolute-center text-xl hidden lg:flex">
        <Link href={"/"}>Strona Główna</Link>
        <Link href={"/produkty"}>Produkty</Link>
        <Link href={"/o-nas"}>O nas</Link>
      </ul>
      <div className="hidden lg:flex gap-8">
        <Button variant={"ghost"} size={"icon"}>
          <Search className="w-6 h-6" />
        </Button>
        <CartButton />
      </div>
      <div className="flex lg:hidden">
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}

export default Navbar
