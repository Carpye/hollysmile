import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

export default function About() {
  return (
    <div className="h-[500px] w-full bg-primary/80 p-8">
      <div className="flex h-full w-full justify-around gap-24 rounded-xl bg-white">
        <div className="flex flex-col justify-center gap-5 p-8">
          <span className="">
            <h6 className="font-semibold text-primary">Nadtytuł</h6>
            <h1 className="text-3xl font-bold">
              Dlaczego szczoteczki HollySmile?
            </h1>
          </span>
          <p>
            Szczoteczki HollySmile zapewniają skuteczne czyszczenie zębów, są
            delikatne dla dziąseł i gwarantują zdrowy uśmiech każdego dnia.
          </p>
          <Button className="w-3/5 shadow-lg" asChild>
            <Link href={"/produkty"}>Zamów już teraz!</Link>
          </Button>
        </div>
        <div className="relative w-full">
          {/* image */}
          <Image src={"/logo.png"} alt="xd" fill />
          <div className="absolute right-5 top-12 flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl bg-[#7945E8] text-white">
            <span className="text-4xl font-bold">1000</span>
            <p className="text-center"> Białych uśmiechów</p>
          </div>
          <div className="absolute top-5 flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-xl bg-[#6C69FD] text-white">
            <span className="text-5xl font-bold">95%</span>
            <p className="text-center"> Zadowolonych klientów</p>
          </div>
          <div className="absolute bottom-5 left-12 flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-xl bg-[#A689F9] text-white">
            <span className="text-3xl font-bold">50%</span>
            <p className="text-center text-sm"> Mniej płytki nazębnej</p>
          </div>
        </div>
      </div>
    </div>
  )
}
