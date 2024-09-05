import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function About() {
  return (
    <div className="w-full items-center bg-primary/80 px-4 py-20">
      <div className="mx-auto flex h-full w-full max-w-screen-xl justify-between rounded-xl bg-white">
        <div className="flex flex-col items-center justify-center gap-5 p-8 md:max-w-[300px] lg:max-w-[500px]">
          <div>
            <h6 className="text-center font-semibold text-primary md:text-left">
              Nadtytuł
            </h6>
            <h1 className="text-center text-3xl font-bold md:text-left">
              Dlaczego szczoteczki HollySmile?
            </h1>
          </div>
          <p className="text-pretty text-center md:text-left">
            Szczoteczki HollySmile zapewniają skuteczne czyszczenie zębów, są
            delikatne dla dziąseł i gwarantują zdrowy uśmiech każdego dnia.
          </p>
          <Button className="mt-20 w-full max-w-64 shadow-lg" asChild>
            <Link href={"/produkty"}>Zamów już teraz!</Link>
          </Button>
        </div>
        <div className="relative hidden max-w-[600px] flex-grow md:flex">
          <Image alt="Grafika pokazowa" src={"/assets/tooth-image.svg"} fill />
          <InfoBadge
            title="Białych uśmiechów"
            amount="1000"
            className="right-5 top-12"
          />
          <InfoBadge
            title="Zadowolonych klientów"
            amount="95%"
            className="left-0 top-5 h-36 w-36 bg-[#6C69FD]"
          />
          <InfoBadge
            title="Mniej płytki nazębnej"
            amount="50%"
            className="bottom-5 left-12 h-28 w-28 bg-[#A689F9]"
          />
        </div>
      </div>
    </div>
  )
}
//Białych uśmiechów
function InfoBadge({
  title,
  amount,
  className,
}: {
  title: string
  amount: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "absolute flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl bg-[#7945E8] text-white shadow-lg",
        className
      )}
    >
      <span className="text-4xl font-bold">{amount}</span>
      <p className="text-center">{title}</p>
    </div>
  )
}
