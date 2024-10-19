import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CircleCheckBig, Icon, Shield, Stars } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Separator } from "../ui/separator"

export default function About() {
  return (
    <div className="z-50 flex w-full flex-col items-center rounded-[60px] bg-[url('/assets/bgAboutUs.svg')] px-4 py-16 pb-12 md:items-end md:px-8 lg:px-24">
      <div className="flex w-full flex-col">
        <h3 className="text-center text-base text-secondary drop-shadow-md md:text-left">
          Poznaj Holly Smile
        </h3>
        <h1 className="text-center text-5xl font-semibold text-primary drop-shadow-lg md:text-left">
          Dlaczego Holly Smile?
        </h1>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
        <div className="flex items-center justify-center">
          <p className="text-lg font-medium text-foreground md:text-base lg:text-lg">
            <span className="font-semibold">Holly Smile </span> to połączenie
            nowoczesnych technologii i dbałości o zdrowie jamy ustnej.
            Wybierając nas, zyskujesz produkty, które są nie tylko skuteczne,
            ale również przyjazne dla środowiska.
          </p>
        </div>
        <div className="relative hidden md:row-span-2 md:block">
          <Image
            src={"/images/DSCF2532.jpg"}
            fill
            alt=""
            className="rounded-xl object-cover shadow-xl"
          />
        </div>
        <div className="relative h-56">
          <Image
            src={"/assets/bg1.png"}
            fill
            alt=""
            className="rounded-xl object-cover shadow-xl"
          />
        </div>

        <div className="relative order-4 h-56 md:order-none">
          <Image
            src={"/assets/bg3.png"}
            fill
            alt=""
            className="rounded-xl object-cover shadow-lg"
          />
        </div>
        <div className="order-3 flex items-center justify-center md:order-none">
          <p className="text-lg font-medium text-foreground md:text-base lg:text-lg">
            Naszą misją jest dostarczanie najwyższej jakości rozwiązań, które
            sprawiają, że codzienna pielęgnacja zębów staje się przyjemna i
            efektywna. Zaufaj doświadczeniu, innowacjom i trosce, które
            wyróżniają Holly Smile.
          </p>
        </div>
      </div>
      <div className="flex w-4/6 flex-col items-center justify-between gap-4 pt-12 md:flex-row md:items-start">
        <div className="flex w-min flex-col items-center justify-center gap-2">
          <span className="text-5xl font-semibold text-accent-foreground">
            3000
          </span>
          <p className="text-center text-2xl font-semibold">
            Uśmiechniętych klientów
          </p>
        </div>
        <div className="flex w-min flex-col items-center justify-center gap-2">
          <span className="text-5xl font-semibold text-accent-foreground">
            95%
          </span>
          <p className="text-center text-2xl font-semibold">
            Pozytywnych opini
          </p>
        </div>
        <div className="flex w-min flex-col items-center justify-center gap-2">
          <span className="text-5xl font-semibold text-accent-foreground">
            10x
          </span>
          <p className="text-center text-2xl font-semibold">
            Większa skuteczność
          </p>
        </div>
      </div>
      <Separator className="mt-4 w-full rounded-full bg-[#9D8189] py-[2px] md:w-4/6" />
    </div>
  )
}
