import { Mail, Phone, Pin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "./ui/separator"

export default function Footer() {
  return (
    <div className="flex w-full flex-col justify-between gap-2 bg-[#292B37] px-8 pt-4 text-white">
      <div className="flex h-full justify-between px-8">
        <div className="flex h-full flex-col justify-between gap-4 p-4">
          <Image src={"/logo.png"} alt="XD" width={128} height={64} />
          <p className="w-80 font-light">
            Oferujemy innowacyjne szczoteczki do zębów, które dbają o zdrowie i
            piękny uśmiech każdego dnia.
          </p>
        </div>
        <div className="flex gap-24">
          <div className="flex flex-col gap-4 py-2">
            <h1 className="text-lg">Strona Główna</h1>
            <ul className="flex flex-col gap-4 text-primary">
              <Link href={"/"}>Link 1</Link>
              <Link href={"/"}>Link 1</Link>
              <Link href={"/"}>Link 1</Link>
            </ul>
          </div>
          <div className="flex flex-col gap-4 py-2">
            <h1 className="text-lg">Kontakt</h1>
            <ul className="flex flex-col gap-4">
              <span className="flex items-center justify-start gap-2 text-sm text-primary">
                <Phone />
                +48 123 456 789
              </span>
              <span className="flex items-center justify-start gap-2 text-sm text-primary">
                <Mail />
                happysmile@gmail.com
              </span>
              <span className="flex items-center justify-start gap-2 text-sm text-primary">
                <Pin />
                12-345 Szczecin, ul. Cicha
              </span>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <Separator className="bg-slate-500" />
        <div className="flex justify-between p-2 text-slate-500">
          <p>© Holly Smile - 2024 Wszelkie prawa zastrzeżone.</p>
          <p>
            Made with 🔥Passion🔥 by{" "}
            <Link href={"https://github.com/Carpye"}>Kacper</Link> &{" "}
            <Link href={"https://github.com/Verti1234"}>Krzysztof</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
