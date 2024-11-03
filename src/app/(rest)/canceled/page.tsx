import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function page() {
  return (
    <div className="flex h-[90vh] items-center justify-center drop-shadow-xl">
      <div className="relative flex w-11/12 flex-col items-center justify-center gap-8 rounded-2xl border border-zinc-200 bg-white p-4 md:w-4/6 md:p-8">
        <div className="relative h-40 w-full p-2 md:h-56 md:p-4">
          <Image src={"/assets/cancel.svg"} fill alt="XD" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-center text-4xl font-semibold text-primary md:text-6xl">
            Płatność anulowana
          </h1>
          <p className="mx-4 text-center md:mx-14">
            Niestety, Twoja płatność nie została zrealizowana. Prosimy o
            sprawdzenie danych płatniczych i spróbowanie ponownie.
          </p>
          <Button
            variant="expandIcon"
            Icon={ArrowLeftIcon}
            iconPlacement="left"
            className=""
            asChild
          >
            <Link href={"/"}>Wroć do sklepu</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
