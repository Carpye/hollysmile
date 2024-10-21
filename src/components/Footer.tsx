import { Mail, Phone, Pin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "./ui/separator"

export default function Footer() {
  return (
    <div className="relative z-10 w-full bg-foreground px-4 pt-4 text-white sm:px-8">
      <div className="ite flex flex-col justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 py-4 md:items-start">
          <div className="relative flex h-20 w-full">
            <Image src={"/assets/logo-white.svg"} alt="XD" fill />
          </div>

          <p className="relative -top-2 flex w-full max-w-96 justify-center text-center font-light text-[#9D8189] md:text-left lg:w-72 lg:max-w-xs">
            Oferujemy innowacyjne szczoteczki do zębów, które dbają o zdrowie i
            piękny uśmiech każdego dnia.
          </p>
        </div>
        <div className="flex gap-8 sm:gap-16 md:gap-12">
          <div className="flex flex-col gap-4 py-2">
            <h1 className="text-lg text-background">Strona Główna</h1>
            <ul className="flex flex-col gap-4 text-base text-[#9D8189]">
              <Link href={"/"}>Przykładowy link</Link>
              <Link href={"/"}>Produkty</Link>
              <Link href={"/"}>O nas</Link>
            </ul>
          </div>
          <div className="flex flex-col gap-4 py-2">
            <h1 className="text-lg text-background">Kontakt</h1>
            <ul className="flex flex-col gap-4 text-base text-[#9D8189]">
              <span className="flex items-center justify-start gap-2">
                <Phone size={16} />
                +48 123 456 789
              </span>
              <span className="flex items-center justify-start gap-2">
                <Mail size={16} />
                happysmile@gmail.com
              </span>
              <span className="flex items-center justify-start gap-2">
                <Pin size={16} />
                12-345 Szczecin, ul. Cicha
              </span>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-4">
        <Separator className="bg-neutral-600" />
        <div className="flex justify-between gap-4 p-2 text-xs text-neutral-600 sm:text-sm">
          <p>© Holly Smile - 2024 Wszelkie prawa zastrzeżone.</p>
          <p className="text-right">
            Made with ✨Passion✨ by{" "}
            <Link href={"https://github.com/Carpye"} className="underline">
              Kacper Kozłowski
            </Link>{" "}
            &{" "}
            <Link href={"https://github.com/Verti1234"} className="underline">
              Krzysztof Godyń
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
