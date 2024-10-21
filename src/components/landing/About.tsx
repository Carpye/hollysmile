import Image from "next/image"
import { Separator } from "../ui/separator"

export default function About() {
  return (
    <div className="z-50 flex w-full flex-col items-center rounded-[30px] px-3 py-8 sm:rounded-[60px] sm:px-4 sm:py-16 md:items-end md:px-8 lg:px-24">
      <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:grid-rows-4">
        {/* Title Block */}
        <div className="flex h-fit flex-col self-end rounded-2xl bg-background p-4 sm:rounded-3xl sm:p-6">
          <h3 className="w-fit text-center text-sm text-secondary drop-shadow-md sm:text-base md:text-left">
            Poznaj Holly Smile
          </h3>
          <h1 className="w-fit text-center text-2xl font-semibold text-primary drop-shadow-lg sm:text-3xl md:text-left md:text-4xl">
            Dlaczego Holly Smile?
          </h1>
        </div>

        <div className="sm:col-span-2"></div>

        {/* First Text Block */}
        <div className="flex items-center justify-center rounded-2xl bg-background p-3 sm:rounded-3xl sm:p-4">
          <p className="text-base font-medium text-foreground sm:text-lg lg:text-base">
            <span className="font-semibold">Holly Smile </span> to połączenie
            nowoczesnych technologii i dbałości o zdrowie jamy ustnej.
            Wybierając nas, zyskujesz produkty, które są nie tylko skuteczne,
            ale również przyjazne dla środowiska.
          </p>
        </div>

        {/* Main Image */}
        <div className="relative hidden rounded-3xl bg-background p-4 lg:row-span-2 lg:block">
          <div className="relative h-full w-full">
            <Image
              src={"/images/DSCF2532.jpg"}
              fill
              alt="Holly Smile product showcase"
              className="rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>

        {/* First Small Image */}
        <div className="relative h-40 rounded-2xl bg-background p-3 sm:h-56 sm:rounded-3xl sm:p-4">
          <div className="relative h-full w-full">
            <Image
              src={"/assets/bg1.png"}
              fill
              alt="Product feature"
              className="rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>

        {/* Second Small Image */}
        <div className="relative h-40 rounded-2xl bg-background p-3 sm:h-56 sm:rounded-3xl sm:p-4">
          <div className="relative h-full w-full">
            <Image
              src={"/assets/bg3.png"}
              fill
              alt="Product showcase"
              className="rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Second Text Block */}
        <div className="flex items-center justify-center rounded-2xl bg-background p-3 sm:rounded-3xl sm:p-4">
          <p className="text-base font-medium text-foreground sm:text-lg lg:text-base">
            Naszą misją jest dostarczanie najwyższej jakości rozwiązań, które
            sprawiają, że codzienna pielęgnacja zębów staje się przyjemna i
            efektywna. Zaufaj doświadczeniu, innowacjom i trosce, które
            wyróżniają Holly Smile.
          </p>
        </div>

        <div className="col-span-1"></div>

        {/* Stats Block */}
        <div className="col-span-1 flex h-fit flex-col items-center justify-between gap-4 self-start rounded-2xl bg-background px-4 py-6 sm:col-span-2 sm:rounded-3xl sm:px-12 sm:pb-8 sm:pt-12 md:flex-row md:items-start">
          <div className="flex w-min flex-col items-center justify-center gap-1 sm:gap-2">
            <span className="text-3xl font-semibold text-accent-foreground sm:text-4xl lg:text-5xl">
              3000
            </span>
            <p className="text-center text-lg font-semibold sm:text-xl lg:text-2xl">
              Uśmiechniętych klientów
            </p>
          </div>
          <div className="flex w-min flex-col items-center justify-center gap-1 sm:gap-2">
            <span className="text-3xl font-semibold text-accent-foreground sm:text-4xl lg:text-5xl">
              95%
            </span>
            <p className="text-center text-lg font-semibold sm:text-xl lg:text-2xl">
              Pozytywnych opini
            </p>
          </div>
          <div className="flex w-min flex-col items-center justify-center gap-1 sm:gap-2">
            <span className="text-3xl font-semibold text-accent-foreground sm:text-4xl lg:text-5xl">
              10x
            </span>
            <p className="text-center text-lg font-semibold sm:text-xl lg:text-2xl">
              Większa skuteczność
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
